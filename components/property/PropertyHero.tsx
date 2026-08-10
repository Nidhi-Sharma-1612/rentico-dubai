import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Star } from "lucide-react";
import Container from "@/components/shared/Container";
import { Property } from "@/lib/types";

export default function PropertyHero({ property }: { property: Property }) {
  return (
    <section className="relative flex h-[60vh] min-h-[440px] max-h-[620px] items-end overflow-hidden bg-navy-950">
      <Image
        src={property.image}
        alt={property.name}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/40 to-navy-950/10" />

      <Container className="relative flex flex-col gap-4 pb-10">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/book-your-stay" className="hover:text-white">
            Book Your Stay
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/85">{property.name}</span>
        </nav>

        <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {property.name}
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/85">
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
            {property.rating}
            <span className="text-white/60">({property.reviewCount} reviews)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-orange-400" />
            {property.area}
          </span>
        </div>
      </Container>
    </section>
  );
}
