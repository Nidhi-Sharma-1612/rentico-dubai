"use server";

import {
  createInstantChargeReservation,
  createReservationQuote,
  getDiscount,
  getPaymentProvider,
  getRatePlanId,
  GuestyQuoteError,
} from "@/lib/guesty/bookingApi";

type ActionResult<T> = { success: true; data: T } | { success: false; error: string };

export async function getPaymentProviderAction(listingId: string): Promise<ActionResult<{ providerAccountId: string }>> {
  try {
    const provider = await getPaymentProvider(listingId);
    return { success: true, data: { providerAccountId: provider.providerAccountId } };
  } catch (err) {
    console.error("getPaymentProviderAction failed:", err);
    return { success: false, error: "We couldn't start checkout right now. Please try again shortly." };
  }
}

export interface QuoteSummary {
  quoteId: string;
  ratePlanId: string;
  currency: string;
  subTotal: number;
  taxes: number;
  fees: number;
  total: number;
  /** Minimum nights required for this specific check-in date, if Guesty reported one. */
  minNights?: number;
  /** Any channel promotion (e.g. Guesty's "Website" discount) already reflected in `subTotal`/`total` above. */
  discount?: { amount: number; percent: number };
}

export async function getQuoteAction(params: {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
}): Promise<ActionResult<QuoteSummary>> {
  try {
    const quote = await createReservationQuote({
      listingId: params.listingId,
      checkInDateLocalized: params.checkIn,
      checkOutDateLocalized: params.checkOut,
      guestsCount: params.guestsCount,
    });

    const ratePlan = quote.rates?.ratePlans?.[0];
    const ratePlanId = ratePlan ? getRatePlanId(ratePlan) : undefined;
    if (!ratePlan || !ratePlanId) {
      throw new Error("Quote response had no usable rate plan");
    }

    // Guesty's `subTotalPrice` already includes `totalFees` (confirmed live:
    // fareAccommodationAdjusted + fareCleaning === subTotalPrice exactly) —
    // adding fees again double-counts the cleaning fee. Subtotal/fees are
    // split back out here only so the UI can show them as separate line
    // items; `total` uses each figure exactly once.
    const money = ratePlan.ratePlan.money ?? {};
    const subTotal = money.fareAccommodationAdjusted ?? money.fareAccommodation ?? 0;
    const fees = money.totalFees ?? 0;
    const taxes = money.totalTaxes ?? 0;
    const total = subTotal + fees + taxes;

    return {
      success: true,
      data: {
        quoteId: quote._id,
        ratePlanId,
        currency: money.currency ?? "AED",
        subTotal,
        taxes,
        fees,
        total,
        minNights: ratePlan.days?.[0]?.minNights,
        discount: getDiscount(money),
      },
    };
  } catch (err) {
    console.error("getQuoteAction failed:", err);
    if (err instanceof GuestyQuoteError && err.minNightsViolation) {
      return {
        success: false,
        error: "This stay is shorter than the minimum required for these dates. Try selecting a longer date range.",
      };
    }
    return { success: false, error: "We couldn't calculate pricing for these dates. Please try again." };
  }
}

export async function createInstantChargeReservationAction(params: {
  quoteId: string;
  ratePlanId: string;
  guest: { firstName: string; lastName: string; email: string; phone?: string };
  confirmationToken: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}): Promise<ActionResult<{ reservationId: string }>> {
  if (!params.acceptedTerms || !params.acceptedPrivacy) {
    return { success: false, error: "Please accept the terms and privacy policy to continue." };
  }

  try {
    const result = await createInstantChargeReservation({
      quoteId: params.quoteId,
      ratePlanId: params.ratePlanId,
      guest: params.guest,
      confirmationToken: params.confirmationToken,
      policy: {
        termsAndConditions: { isAccepted: params.acceptedTerms },
        privacy: { isAccepted: params.acceptedPrivacy },
      },
    });

    if (result.payment?.status === "PENDING_AUTH") {
      // 3D Secure follow-up isn't implemented — see the note on
      // createInstantChargeReservation for why. No reservation is
      // confirmed at this point (the charge hasn't completed), so it's
      // safe to just ask the guest to try a different card.
      return {
        success: false,
        error:
          "Your card requires additional verification that we can't complete online yet. Please try a different card, or contact us to complete this booking.",
      };
    }

    if (result.payment?.error) {
      return {
        success: false,
        error: result.payment.processorError?.message ?? "Your card was declined. Please check your details or try a different card.",
      };
    }

    return { success: true, data: { reservationId: result.reservation._id } };
  } catch (err) {
    console.error("createInstantChargeReservationAction failed:", err);
    return {
      success: false,
      error: "We couldn't process your payment. Please check your card details and try again, or contact us for help.",
    };
  }
}
