import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Welcome from "@/components/home/Welcome";
import Properties from "@/components/home/Properties";
import Amenities from "@/components/home/Amenities";
import PartnerCTA from "@/components/home/PartnerCTA";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <TrustBar />
      <Properties />
      <Amenities />
      <PartnerCTA />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
