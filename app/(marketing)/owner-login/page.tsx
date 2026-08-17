import type { Metadata } from "next";
import { ArrowUpRight, LineChart, LockKeyhole, ReceiptText } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

export const metadata: Metadata = {
  title: "Owner Login | Rentico Dubai",
  description: "Access your Rentico owner portal to track bookings, revenue and property performance.",
};

const perks = [
  { icon: LineChart, label: "Real-time booking & revenue reporting" },
  { icon: ReceiptText, label: "Monthly owner statements" },
  { icon: LockKeyhole, label: "Secure, dedicated portal access" },
];

export default function OwnerLoginPage() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden border-b border-white/10 bg-navy-950 py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <Container className="relative flex justify-center">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-300">
            <LockKeyhole className="h-3.5 w-3.5" />
            Owner Portal
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-white sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Log in to your dedicated owner portal to view bookings, occupancy and revenue for your property.
          </p>

          <ul className="mt-8 flex flex-col gap-3 text-left">
            {perks.map((p) => (
              <li
                key={p.label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white/80 backdrop-blur-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-300">
                  <p.icon className="h-4 w-4" />
                </span>
                {p.label}
              </li>
            ))}
          </ul>

          <Button
            href="http://renticodubai.guestyowners.com"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            icon={<ArrowUpRight className="h-4 w-4" />}
            className="mt-8 w-full justify-center"
          >
            Continue to Owner Portal
          </Button>

          <p className="mt-4 text-xs text-white/40">
            Not a partner yet?{" "}
            <a href="/become-a-partner" className="text-orange-300 hover:underline">
              List your property
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
