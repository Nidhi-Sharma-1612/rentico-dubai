import SectionHeading from "@/components/shared/SectionHeading";
import PropertyCard from "@/components/shared/PropertyCard";
import Container from "@/components/shared/Container";
import { Property } from "@/lib/types";

export default function SimilarProperties({
  properties,
  searchQuery,
}: {
  properties: Property[];
  searchQuery?: string;
}) {
  if (properties.length === 0) return null;

  return (
    <section className="bg-navy-50/40 py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Keep Exploring"
          title="Our other properties"
          align="center"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} searchQuery={searchQuery} />
          ))}
        </div>
      </Container>
    </section>
  );
}
