"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export const RELATIONSHIP_OPTIONS = ["Broker or agent", "Developer", "Portfolio owner"] as const;
export type Relationship = (typeof RELATIONSHIP_OPTIONS)[number];

type PartnerAudienceContextValue = {
  relationship: Relationship;
  setRelationship: (r: Relationship) => void;
};

const PartnerAudienceContext = createContext<PartnerAudienceContextValue | null>(null);

export function PartnerAudienceProvider({ children }: { children: ReactNode }) {
  const [relationship, setRelationship] = useState<Relationship>("Broker or agent");
  return (
    <PartnerAudienceContext.Provider value={{ relationship, setRelationship }}>
      {children}
    </PartnerAudienceContext.Provider>
  );
}

export function usePartnerAudience() {
  const ctx = useContext(PartnerAudienceContext);
  if (!ctx) throw new Error("usePartnerAudience must be used within PartnerAudienceProvider");
  return ctx;
}
