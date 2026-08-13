"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center bg-navy-950 py-20">
      <Container className="flex justify-center">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-300">
            Something went wrong
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-white sm:text-3xl">
            We hit a snag
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Our live availability service is temporarily unavailable. Please try again in a moment.
          </p>
          <Button
            type="button"
            onClick={reset}
            size="lg"
            icon={<RefreshCw className="h-4 w-4" />}
            className="mt-8 w-full justify-center"
          >
            Try Again
          </Button>
        </div>
      </Container>
    </section>
  );
}
