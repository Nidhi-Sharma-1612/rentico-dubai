"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { addMonths, daysInMonth, formatShort, isPastDate, isSameDay, monthLabel } from "@/lib/calendar";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

interface SingleDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

export default function SingleDatePicker({
  value,
  onChange,
  placeholder = "Select a date",
  className,
}: SingleDatePickerProps) {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [baseMonth, setBaseMonth] = useState(() => value ?? new Date());

  useLayoutEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = 296;
      const left = Math.max(16, Math.min(rect.left, window.innerWidth - width - 16));
      setPosition({ top: rect.bottom + 8, left });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;

    const handlePointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popoverRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const total = daysInMonth(baseMonth);
  const firstOffset = (new Date(baseMonth.getFullYear(), baseMonth.getMonth(), 1).getDay() + 6) % 7;
  const cells: (Date | null)[] = [
    ...Array(firstOffset).fill(null),
    ...Array.from({ length: total }, (_, i) => new Date(baseMonth.getFullYear(), baseMonth.getMonth(), i + 1)),
  ];
  const today = new Date();

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-left text-sm outline-none transition-colors",
          open ? "border-orange-500" : "hover:border-navy-900/25",
          className
        )}
      >
        <Calendar className="h-4 w-4 shrink-0 text-orange-500" />
        <span className={value ? "text-navy-900" : "text-navy-900/35"}>
          {value ? formatShort(value) : placeholder}
        </span>
      </button>

      {open &&
        createPortal(
          <div
            ref={popoverRef}
            role="dialog"
            aria-label="Choose a date"
            style={{ top: position.top, left: position.left, width: 296 }}
            className="fixed z-110 flex flex-col rounded-2xl border border-navy-900/8 bg-white p-3.5 shadow-2xl shadow-navy-950/20"
          >
            <div className="mb-1 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setBaseMonth((m) => addMonths(m, -1))}
                aria-label="Previous month"
                className="flex h-7 w-7 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-sm font-bold text-navy-900">{monthLabel(baseMonth)}</p>
              <button
                type="button"
                onClick={() => setBaseMonth((m) => addMonths(m, 1))}
                aria-label="Next month"
                className="flex h-7 w-7 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center">
              {WEEKDAYS.map((d) => (
                <span key={d} className="text-[9px] font-semibold text-navy-900/40">
                  {d}
                </span>
              ))}
              {cells.map((date, i) => {
                if (!date) return <span key={`blank-${i}`} />;

                const disabled = isPastDate(date);
                const isSelected = isSameDay(date, value);
                const isToday = isSameDay(date, today);

                return (
                  <div key={date.toISOString()} className="flex items-center justify-center py-0.5">
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        onChange(date);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors",
                        disabled && "cursor-not-allowed text-navy-900/25 line-through",
                        !disabled && !isSelected && "text-navy-900 hover:bg-orange-100",
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
          </div>,
          document.body
        )}
    </>
  );
}
