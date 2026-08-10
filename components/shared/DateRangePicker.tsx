"use client";

import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import {
  addMonths,
  daysInMonth,
  isDateUnavailable,
  isPastDate,
  isSameDay,
  monthLabel,
} from "@/lib/calendar";

interface DateRangePickerProps {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
  onClose: () => void;
}

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default function DateRangePicker({
  open,
  anchorRef,
  checkIn,
  checkOut,
  onChange,
  onClose,
}: DateRangePickerProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number; maxHeight?: number }>({
    top: 0,
    left: 0,
  });
  const [baseMonth, setBaseMonth] = useState(() => addMonths(checkIn ?? new Date(), 0));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  useLayoutEffect(() => {
    if (!open) return;

    const margin = 12;

    const updatePosition = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      const popoverEl = popoverRef.current;
      if (!rect || !popoverEl) return;

      const width = Math.min(window.innerWidth - 32, 600);
      const left = Math.max(16, Math.min(rect.left, window.innerWidth - width - 16));

      const spaceBelow = window.innerHeight - rect.bottom - margin;

      const top = rect.bottom + margin;
      const maxHeight = Math.max(spaceBelow, 240);

      setPosition({ top, left, maxHeight });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, anchorRef]);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popoverRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      onClose();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  const handleDayClick = (date: Date) => {
    if (isPastDate(date) || isDateUnavailable(date)) return;
    if (!checkIn || checkOut) {
      onChange(date, null);
    } else if (date <= checkIn) {
      onChange(date, null);
    } else {
      onChange(checkIn, date);
    }
  };

  const renderMonth = (monthDate: Date) => {
    const total = daysInMonth(monthDate);
    const firstOffset = (new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay() + 6) % 7;
    const cells: (Date | null)[] = [
      ...Array(firstOffset).fill(null),
      ...Array.from({ length: total }, (_, i) => new Date(monthDate.getFullYear(), monthDate.getMonth(), i + 1)),
    ];
    const today = new Date();
    const rangeEnd = checkOut ?? hoverDate;

    return (
      <div className="flex-1">
        <p className="mb-1 text-center text-xs font-bold text-navy-900 sm:text-sm">{monthLabel(monthDate)}</p>
        <div className="grid grid-cols-7 text-center">
          {WEEKDAYS.map((d) => (
            <span key={d} className="text-[9px] font-semibold text-navy-900/40">
              {d}
            </span>
          ))}
          {cells.map((date, i) => {
            if (!date) return <span key={`blank-${i}`} />;

            const disabled = isPastDate(date) || isDateUnavailable(date);
            const isSelected = isSameDay(date, checkIn) || isSameDay(date, checkOut);
            const inRange =
              !!checkIn && !!rangeEnd && date > checkIn && date < rangeEnd && !isSelected;
            const isToday = isSameDay(date, today);

            return (
              <div key={date.toISOString()} className="flex items-center justify-center">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => handleDayClick(date)}
                  onMouseEnter={() => setHoverDate(date)}
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-[11px] transition-colors sm:h-7 sm:w-7 sm:text-xs",
                    disabled && "cursor-not-allowed text-navy-900/25 line-through",
                    !disabled && !isSelected && !inRange && "text-navy-900 hover:bg-orange-100",
                    !disabled && inRange && "bg-orange-50 text-navy-900",
                    isSelected && "bg-orange-500 font-bold text-white",
                    isToday && !isSelected && !disabled && "ring-1 ring-orange-400"
                  )}
                >
                  {date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Choose check-in and check-out dates"
      style={{
        top: position.top,
        left: position.left,
        width: "min(92vw, 600px)",
        maxHeight: position.maxHeight,
      }}
      className="fixed z-70 flex flex-col overflow-y-auto rounded-2xl border border-navy-900/8 bg-white p-2.5 shadow-2xl shadow-navy-950/20 sm:p-3.5"
    >
      <div className="mb-0.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setBaseMonth((m) => addMonths(m, -1))}
          className="flex h-6 w-6 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setBaseMonth((m) => addMonths(m, 1))}
          className="flex h-6 w-6 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
        {renderMonth(baseMonth)}
        <div className="hidden sm:block">{renderMonth(addMonths(baseMonth, 1))}</div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 border-t border-navy-900/8 pt-2">
        <button
          type="button"
          onClick={() => onChange(null, null)}
          className="text-sm font-semibold text-navy-900/60 transition-colors hover:text-navy-900"
        >
          Clear dates
        </button>
        <Button type="button" size="md" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>,
    document.body
  );
}
