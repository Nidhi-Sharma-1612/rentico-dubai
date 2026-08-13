"use client";

import { FormEvent, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import {
  createInstantChargeReservationAction,
  getPaymentProviderAction,
  QuoteSummary,
} from "@/app/properties/[slug]/actions";
import { Property } from "@/lib/types";
import { formatShort } from "@/lib/calendar";

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

interface BookingCheckoutModalProps {
  open: boolean;
  onClose: () => void;
  property: Property;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  /** Already fetched by PropertySidebarBooking as soon as dates were picked — reused here, not re-fetched. */
  quote: QuoteSummary;
}

export default function BookingCheckoutModal(props: BookingCheckoutModalProps) {
  const mounted = useMounted();
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {props.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) props.onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Complete booking for ${props.property.name}`}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={props.onClose}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy-900/50 transition-colors hover:bg-navy-900/5 hover:text-navy-900"
            >
              <X className="h-5 w-5" />
            </button>

            <CheckoutBody {...props} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

type LoadState =
  | { step: "loading" }
  | { step: "error"; message: string }
  | { step: "ready"; stripePromise: Promise<Stripe | null> };

function CheckoutBody({ property, checkIn, checkOut, quote, onClose }: BookingCheckoutModalProps) {
  const [state, setState] = useState<LoadState>({ step: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const providerResult = await getPaymentProviderAction(property.id);
      if (cancelled) return;

      if (!providerResult.success) {
        setState({ step: "error", message: providerResult.error });
        return;
      }

      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!publishableKey) {
        setState({ step: "error", message: "Payment is not configured yet. Please contact us to book." });
        return;
      }

      setState({
        step: "ready",
        // Guesty's Stripe Tokenization Flow uses the connected host's own
        // publishable key directly — this key is already scoped to that
        // account, so no `stripeAccount` platform-Connect param here.
        stripePromise: loadStripe(publishableKey),
      });
    }

    load();
    return () => {
      cancelled = true;
    };
    // Re-running this effect is keyed to the modal's mount, not to prop identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.step === "loading") {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <p className="text-sm text-navy-900/60">Preparing your booking…</p>
      </div>
    );
  }

  if (state.step === "error") {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="max-w-sm text-sm text-navy-900/70">{state.message}</p>
      </div>
    );
  }

  return (
    <Elements
      stripe={state.stripePromise}
      options={{
        // Deferred payment flow: no PaymentIntent/clientSecret yet — Guesty
        // creates and charges that server-side when we hand it the
        // ConfirmationToken this generates. Amount is in the smallest
        // currency unit (fils for AED), matching Stripe's convention.
        mode: "payment",
        amount: Math.round(quote.total * 100),
        currency: quote.currency.toLowerCase(),
      }}
    >
      <CheckoutForm property={property} checkIn={checkIn} checkOut={checkOut} quote={quote} onClose={onClose} />
    </Elements>
  );
}

const inputClass =
  "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

function CheckoutForm({
  property,
  checkIn,
  checkOut,
  quote,
  onClose,
}: {
  property: Property;
  checkIn: Date;
  checkOut: Date;
  quote: QuoteSummary;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reservationId, setReservationId] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => Boolean(firstName && lastName && email && acceptedTerms && acceptedPrivacy && stripe && elements),
    [firstName, lastName, email, acceptedTerms, acceptedPrivacy, stripe, elements]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || submitting) return;

    setSubmitting(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Please check your card details and try again.");
      setSubmitting(false);
      return;
    }

    const { confirmationToken, error: tokenError } = await stripe.createConfirmationToken({
      elements,
      params: { payment_method_data: { billing_details: { name: `${firstName} ${lastName}`, email } } },
    });

    if (tokenError || !confirmationToken) {
      setError(tokenError?.message ?? "We couldn't process your card. Please check the details and try again.");
      setSubmitting(false);
      return;
    }

    const result = await createInstantChargeReservationAction({
      quoteId: quote.quoteId,
      ratePlanId: quote.ratePlanId,
      guest: { firstName, lastName, email, phone: phone || undefined },
      confirmationToken: confirmationToken.id,
      acceptedTerms,
      acceptedPrivacy,
    });

    setSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setReservationId(result.data.reservationId);
  };

  if (reservationId) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-orange-500" />
        <h3 className="text-lg font-bold text-navy-900">Booking confirmed</h3>
        <p className="max-w-sm text-sm text-navy-900/60">
          Your stay at {property.name} is confirmed. A confirmation email is on its way — reservation{" "}
          <span className="font-mono text-navy-900/80">{reservationId}</span>.
        </p>
        <button type="button" onClick={onClose} className="mt-2 text-sm font-semibold text-orange-600 hover:underline">
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-navy-900 sm:text-2xl">Complete your booking</h2>
        <p className="mt-1 text-sm text-navy-900/55">
          {property.name} · {formatShort(checkIn)} – {formatShort(checkOut)}
        </p>
      </div>

      <div className="flex flex-col gap-1.5 rounded-xl border border-navy-900/8 bg-navy-50/50 p-4 text-sm">
        <div className="flex items-center justify-between text-navy-900/70">
          <span>Subtotal</span>
          <span>
            {quote.currency} {(quote.subTotal + (quote.discount?.amount ?? 0)).toFixed(2)}
          </span>
        </div>
        {quote.discount && (
          <div className="flex items-center justify-between text-emerald-600">
            <span>Discount ({quote.discount.percent}%)</span>
            <span>
              −{quote.currency} {quote.discount.amount.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between text-navy-900/70">
          <span>Fees</span>
          <span>
            {quote.currency} {quote.fees.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between text-navy-900/70">
          <span>Taxes</span>
          <span>
            {quote.currency} {quote.taxes.toFixed(2)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between border-t border-navy-900/10 pt-2 text-base font-bold text-navy-900">
          <span>Total</span>
          <span>
            {quote.currency} {quote.total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          required
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={inputClass}
        />
        <input
          required
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={inputClass}
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="rounded-xl border border-navy-900/12 px-4 py-3.5">
        <PaymentElement options={{ fields: { billingDetails: { name: "never", email: "never" } } }} />
      </div>

      <div className="flex flex-col gap-2 text-sm text-navy-900/70">
        <label className="flex items-start gap-2.5">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-navy-900/25 text-orange-500 focus:ring-orange-500"
          />
          I agree to the{" "}
          <a href="/terms-conditions" target="_blank" className="font-semibold text-orange-600 hover:underline">
            Terms &amp; Conditions
          </a>
        </label>
        <label className="flex items-start gap-2.5">
          <input
            type="checkbox"
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-navy-900/25 text-orange-500 focus:ring-orange-500"
          />
          I agree to the{" "}
          <a href="/privacy-policy" target="_blank" className="font-semibold text-orange-600 hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Processing…" : `Pay ${quote.currency} ${quote.total.toFixed(2)}`}
      </button>
    </form>
  );
}
