"use client";

import { useRef, useState } from "react";
import { AlertCircle, Calendar, CircleCheck, Minus, Phone, Plus, Users } from "lucide-react";
import Button from "@/components/shared/Button";
import DateRangePicker from "@/components/shared/DateRangePicker";
import { formatShort } from "@/lib/calendar";
import { DEFAULT_GUESTS, isPropertyAvailable } from "@/lib/booking";
import { Property } from "@/lib/types";

interface PropertySidebarBookingProps {
  property: Property;
  initialCheckIn?: Date | null;
  initialCheckOut?: Date | null;
  initialGuests?: number;
}

export default function PropertySidebarBooking({
  property,
  initialCheckIn = null,
  initialCheckOut = null,
  initialGuests = DEFAULT_GUESTS,
}: PropertySidebarBookingProps) {
  const datesAnchorRef = useRef<HTMLButtonElement>(null);
  const [datesOpen, setDatesOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<Date | null>(initialCheckOut);
  const [guests, setGuests] = useState(Math.min(initialGuests, property.maxGuests));
  const [requested, setRequested] = useState(false);

  const hasFullRange = Boolean(checkIn && checkOut);
  const available = isPropertyAvailable(property, checkIn, checkOut);
  const blocked = hasFullRange && !available;

  const dateFieldClass =
    "flex flex-col gap-1 rounded-xl border border-navy-900/10 px-4 py-2.5 text-left transition-colors hover:border-orange-300";

  // Placeholder until the Guesty checkout/payment flow lands — stays on
  // this page and just confirms the request instead of redirecting.
  const handleBookNow = () => setRequested(true);

  return (
    <div className="sticky top-28 flex flex-col gap-5 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-lg shadow-navy-950/5">
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-extrabold text-navy-900">
          {property.currency} {property.pricePerNight}
        </span>
        <span className="text-sm text-navy-900/50">/ night</span>
      </div>

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
        disabled={blocked || requested}
        className="w-full justify-center"
        onClick={handleBookNow}
      >
        {blocked ? "Unavailable for These Dates" : requested ? "Request Sent" : "Book Now"}
      </Button>

      {requested ? (
        <p className="flex items-start gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
          <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Thanks! Our team will reach out to confirm your stay. Online payment is coming soon.
        </p>
      ) : (
        <p className="text-center text-xs text-navy-900/45">You won&apos;t be charged yet</p>
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
