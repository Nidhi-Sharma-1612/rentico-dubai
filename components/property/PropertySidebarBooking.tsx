"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, Calendar, Loader2, Minus, Phone, Plus, Users } from "lucide-react";
import Button from "@/components/shared/Button";
import DateRangePicker from "@/components/shared/DateRangePicker";
import BookingCheckoutModal from "@/components/property/BookingCheckoutModal";
import { getQuoteAction, QuoteSummary } from "@/app/properties/[slug]/actions";
import { formatShort, toDateParam } from "@/lib/calendar";
import { DEFAULT_GUESTS } from "@/lib/booking";
import { Property } from "@/lib/types";

interface PropertySidebarBookingProps {
  property: Property;
  /** Real unavailable dates (YYYY-MM-DD) from Guesty for the fetched booking window. */
  unavailableDates: string[];
  initialCheckIn?: Date | null;
  initialCheckOut?: Date | null;
  initialGuests?: number;
}

type QuoteState =
  | { step: "idle" }
  | { step: "loading" }
  | { step: "error"; message: string }
  | { step: "ready"; quote: QuoteSummary };

export default function PropertySidebarBooking({
  property,
  unavailableDates,
  initialCheckIn = null,
  initialCheckOut = null,
  initialGuests = DEFAULT_GUESTS,
}: PropertySidebarBookingProps) {
  const datesAnchorRef = useRef<HTMLButtonElement>(null);
  const [datesOpen, setDatesOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<Date | null>(initialCheckOut);
  const [guests, setGuests] = useState(Math.min(initialGuests, property.maxGuests));
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quoteState, setQuoteState] = useState<QuoteState>({ step: "idle" });
  // Which [checkIn, checkOut, guests] combination `quoteState` was resolved
  // for — compared against the current selection to derive "loading"
  // without ever setting it synchronously inside the effect below.
  const [quotedFor, setQuotedFor] = useState<string | null>(null);

  const unavailableSet = useMemo(() => new Set(unavailableDates), [unavailableDates]);

  const blocked = useMemo(() => {
    if (!checkIn || !checkOut) return false;
    const cursor = new Date(checkIn);
    while (cursor < checkOut) {
      if (unavailableSet.has(toDateParam(cursor))) return true;
      cursor.setDate(cursor.getDate() + 1);
    }
    return false;
  }, [checkIn, checkOut, unavailableSet]);

  const hasFullRange = Boolean(checkIn && checkOut);

  // Fetches the real price + minimum-nights requirement for these exact
  // dates as soon as they're picked, rather than waiting until the guest
  // opens checkout — so the sidebar always shows what it actually takes
  // to book this stay, not just a flat per-night estimate.
  const selectionKey =
    checkIn && checkOut ? `${toDateParam(checkIn)}_${toDateParam(checkOut)}_${guests}` : null;

  useEffect(() => {
    // Nothing to fetch — effectiveQuoteState below falls back to "idle"
    // for this case without needing a reset here.
    if (!checkIn || !checkOut || blocked || !selectionKey) return;

    let cancelled = false;
    const key = selectionKey;

    getQuoteAction({
      listingId: property.id,
      checkIn: toDateParam(checkIn),
      checkOut: toDateParam(checkOut),
      guestsCount: guests,
    }).then((result) => {
      if (cancelled) return;
      setQuoteState(result.success ? { step: "ready", quote: result.data } : { step: "error", message: result.error });
      setQuotedFor(key);
    });

    return () => {
      cancelled = true;
    };
  }, [property.id, checkIn, checkOut, guests, blocked, selectionKey]);

  // Falls back to idle when there's nothing to show, and to a derived
  // "loading" state whenever the current selection hasn't resolved yet —
  // never set directly, so the effect above never sets state synchronously.
  const effectiveQuoteState: QuoteState =
    !checkIn || !checkOut || blocked
      ? { step: "idle" }
      : selectionKey !== quotedFor
        ? { step: "loading" }
        : quoteState;

  const dateFieldClass =
    "flex flex-col gap-1 rounded-xl border border-navy-900/10 px-4 py-2.5 text-left transition-colors hover:border-orange-300";

  const canBook = effectiveQuoteState.step === "ready";

  const buttonLabel = !hasFullRange
    ? "Select Dates to Book"
    : blocked
      ? "Unavailable for These Dates"
      : effectiveQuoteState.step === "loading"
        ? "Checking availability…"
        : effectiveQuoteState.step === "error"
          ? "Unavailable for These Dates"
          : "Book Now";

  return (
    <div className="sticky top-28 flex flex-col gap-5 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-lg shadow-navy-950/5">
      {effectiveQuoteState.step === "ready" ? (
        <div className="flex flex-col gap-1.5 rounded-xl border border-navy-900/8 bg-navy-50/50 p-4 text-sm">
          <div className="flex items-center justify-between text-navy-900/70">
            <span>Subtotal</span>
            <span>
              {effectiveQuoteState.quote.currency}{" "}
              {(effectiveQuoteState.quote.subTotal + (effectiveQuoteState.quote.discount?.amount ?? 0)).toFixed(2)}
            </span>
          </div>
          {effectiveQuoteState.quote.discount && (
            <div className="flex items-center justify-between text-emerald-600">
              <span>Discount ({effectiveQuoteState.quote.discount.percent}%)</span>
              <span>
                −{effectiveQuoteState.quote.currency} {effectiveQuoteState.quote.discount.amount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between text-navy-900/70">
            <span>Fees</span>
            <span>
              {effectiveQuoteState.quote.currency} {effectiveQuoteState.quote.fees.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-navy-900/70">
            <span>Taxes</span>
            <span>
              {effectiveQuoteState.quote.currency} {effectiveQuoteState.quote.taxes.toFixed(2)}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between border-t border-navy-900/10 pt-2 text-base font-bold text-navy-900">
            <span>Total</span>
            <span>
              {effectiveQuoteState.quote.currency} {effectiveQuoteState.quote.total.toFixed(2)}
            </span>
          </div>
          {effectiveQuoteState.quote.minNights !== undefined && effectiveQuoteState.quote.minNights > 1 && (
            <p className="mt-1 text-xs text-navy-900/50">Minimum stay for this check-in date: {effectiveQuoteState.quote.minNights} nights</p>
          )}
        </div>
      ) : (
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold text-navy-900">
            {property.currency} {property.pricePerNight}
          </span>
          <span className="text-sm text-navy-900/50">/ night</span>
          {effectiveQuoteState.step === "loading" && (
            <Loader2 className="ml-1 h-3.5 w-3.5 animate-spin text-navy-900/30" />
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          ref={datesAnchorRef}
          type="button"
          onClick={() => setDatesOpen((v) => !v)}
          aria-haspopup="dialog"
          aria-expanded={datesOpen}
          className={dateFieldClass}
        >
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-navy-900/50">
            <Calendar className="h-3 w-3 text-orange-500" />
            Check-in
          </span>
          <span className={`truncate text-sm font-semibold ${checkIn ? "text-navy-900" : "text-navy-900/35"}`}>
            {checkIn ? formatShort(checkIn) : "Add date"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setDatesOpen((v) => !v)}
          aria-haspopup="dialog"
          aria-expanded={datesOpen}
          className={dateFieldClass}
        >
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-navy-900/50">
            <Calendar className="h-3 w-3 text-orange-500" />
            Check-out
          </span>
          <span className={`truncate text-sm font-semibold ${checkOut ? "text-navy-900" : "text-navy-900/35"}`}>
            {checkOut ? formatShort(checkOut) : "Add date"}
          </span>
        </button>
      </div>

      <DateRangePicker
        open={datesOpen}
        anchorRef={datesAnchorRef}
        checkIn={checkIn}
        checkOut={checkOut}
        unavailableDates={unavailableSet}
        onChange={(nextCheckIn, nextCheckOut) => {
          setCheckIn(nextCheckIn);
          setCheckOut(nextCheckOut);
        }}
        onClose={() => setDatesOpen(false)}
      />

      {blocked && (
        <p className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          This property isn&apos;t available for the selected dates. Try a different range.
        </p>
      )}

      {!blocked && effectiveQuoteState.step === "error" && (
        <p className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {effectiveQuoteState.message}
        </p>
      )}

      <div className="flex items-center justify-between rounded-xl border border-navy-900/10 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-navy-900">
          <Users className="h-4 w-4 text-orange-500" />
          Guests
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            disabled={guests <= 1}
            aria-label="Decrease guests"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-colors hover:bg-orange-50 disabled:opacity-30"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-4 text-center text-sm font-semibold text-navy-900">{guests}</span>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(property.maxGuests, g + 1))}
            disabled={guests >= property.maxGuests}
            aria-label="Increase guests"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-colors hover:bg-orange-50 disabled:opacity-30"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <Button
        size="lg"
        disabled={!canBook}
        className="w-full justify-center"
        onClick={() => setCheckoutOpen(true)}
      >
        {buttonLabel}
      </Button>

      <p className="text-center text-xs text-navy-900/45">Secure payment, powered by Stripe</p>

      {checkIn && checkOut && effectiveQuoteState.step === "ready" && (
        <BookingCheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          property={property}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          quote={effectiveQuoteState.quote}
        />
      )}

      <div className="flex items-center justify-center gap-2 border-t border-navy-900/8 pt-4 text-sm text-navy-900/60">
        <Phone className="h-4 w-4 text-orange-500" />
        <a href="tel:+971521460222" className="hover:text-navy-900">
          +971-52 146 0222
        </a>
      </div>
    </div>
  );
}
