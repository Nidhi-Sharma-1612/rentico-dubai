"use client";

import Container from "@/components/shared/Container";
import { usePartnerAudience } from "@/components/partner/PartnerAudienceContext";

const audiences = [
  { title: "Brokers & agents", description: "Refer owners, earn per unit", value: "Broker or agent" },
  { title: "Developers & portfolios", description: "Bulk units, handover to revenue", value: "Developer" },
] as const;

export default function AudienceToggle() {
  const { relationship, setRelationship } = usePartnerAudience();

  return (
    <div className="relative z-10 -mt-10 sm:-mt-12">
      <Container>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-1.5 rounded-2xl bg-white p-1.5 shadow-2xl sm:grid-cols-2">
          {audiences.map((a) => {
            const active = relationship === a.value;
            return (
              <button
                key={a.title}
                type="button"
                aria-pressed={active}
                onClick={() => setRelationship(a.value)}
                className={`rounded-xl px-6 py-5 text-left transition-colors duration-300 ${
                  active ? "bg-navy-900" : "bg-white hover:bg-navy-50/60"
                }`}
              >
                <p className={`text-base font-bold ${active ? "text-white" : "text-navy-900"}`}>{a.title}</p>
                <p className={`mt-0.5 text-sm ${active ? "text-white/60" : "text-navy-900/50"}`}>{a.description}</p>
              </button>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
