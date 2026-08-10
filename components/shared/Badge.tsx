import { ReactNode } from "react";

export default function Badge({
  children,
  tone = "orange",
}: {
  children: ReactNode;
  tone?: "orange" | "navy" | "white";
}) {
  const tones = {
    orange: "bg-orange-500 text-white",
    navy: "bg-navy-900 text-white",
    white: "bg-white text-navy-900 shadow-sm",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
