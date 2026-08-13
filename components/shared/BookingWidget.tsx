"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Search, Users, ChevronDown } from "lucide-react";
import DateRangePicker from "@/components/shared/DateRangePicker";
import { formatShort } from "@/lib/calendar";
import { buildBookingQuery, DEFAULT_GUESTS } from "@/lib/booking";

const selectInputClass =
  "w-full min-w-0 truncate appearance-none bg-transparent pr-5 text-sm font-semibold text-navy-900 outline-none";

const dateFieldClass = "flex w-full flex-col gap-1 rounded-xl px-4 py-2.5 text-left lg:px-6";

interface BookingWidgetProps {
  className?: string;
  /** Dates where the whole portfolio is booked out. */
  unavailableDates?: string[];
  initialCheckIn?: Date | null;
  initialCheckOut?: Date | null;
  initialGuests?: number;
}

export default function BookingWidget({
  className = "",
  unavailableDates,
  initialCheckIn = null,
  initialCheckOut = null,
  initialGuests = DEFAULT_GUESTS,
}: BookingWidgetProps) {
  const router = useRouter();
  const datesAnchorRef = useRef<HTMLButtonElement>(null);
  const [datesOpen, setDatesOpen] = useState(false);
  const unavailableSet = unavailableDates ? new Set(unavailableDates) : undefined;
  const [checkIn, setCheckIn] = useState<Date | null>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<Date | null>(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const query = buildBookingQuery({ checkIn, checkOut, guests });
        router.push(`/book-your-stay?${query}`);
      }}
      className={`grid w-full grid-cols-2 gap-3 rounded-2xl bg-white p-3 shadow-2xl shadow-navy-950/20 lg:grid-cols-[1.3fr_1fr_1fr_0.9fr_auto] lg:items-stretch lg:gap-0 lg:divide-x lg:divide-navy-900/8 lg:rounded-full lg:p-2 ${className}`}
    >
      <div className="flex flex-col gap-1 rounded-xl px-4 py-2.5 text-left lg:px-6">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy-900/50">
          <MapPin className="h-3.5 w-3.5 text-orange-500" />
          Destination
        </span>
        <span className="truncate text-sm font-semibold text-navy-900">Dubai</span>
      </div>

      <button
        ref={datesAnchorRef}
        type="button"
        onClick={() => setDatesOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={datesOpen}
        className={`${dateFieldClass} ${datesOpen ? "bg-orange-50/60" : ""}`}
      >
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy-900/50">
          <Calendar className="h-3.5 w-3.5 text-orange-500" />
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
        className={`${dateFieldClass} ${datesOpen ? "bg-orange-50/60" : ""}`}
      >
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy-900/50">
          <Calendar className="h-3.5 w-3.5 text-orange-500" />
          Check-out
        </span>
        <span className={`truncate text-sm font-semibold ${checkOut ? "text-navy-900" : "text-navy-900/35"}`}>
          {checkOut ? formatShort(checkOut) : "Add date"}
        </span>
      </button>

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

      <label className="flex flex-col gap-1 rounded-xl px-4 py-2.5 text-left lg:px-6">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy-900/50">
          <Users className="h-3.5 w-3.5 text-orange-500" />
          Guests
        </span>
        <span className="relative">
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className={selectInputClass}
            aria-label="Number of guests"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} guest{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-navy-900/40" />
        </span>
      </label>

      <div className="col-span-2 flex items-center p-1 lg:col-span-1 lg:pl-2">
        <button
          type="submit"
          aria-label="Search stays"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-600 lg:w-auto"
        >
          <Search className="h-4 w-4" />
          <span className="lg:hidden">Search Stays</span>
        </button>
      </div>
    </form>
  );
}
