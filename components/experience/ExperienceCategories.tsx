"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Car, Compass, Flower2, PartyPopper, Route, Ticket, UtensilsCrossed, Zap } from "lucide-react";
import Container from "@/components/shared/Container";

const categories = [
  {
    number: "01",
    icon: Car,
    category: "Transportation",
    title: "Arrival, Handled",
    description:
      "First impressions start on the tarmac. Chauffeured cars, private jets, helicopter transfers, or something with more horsepower — your Dubai starts exactly the way you pictured it, from the moment you land.",
    image: "https://images.unsplash.com/photo-1568954264787-80157b74c5f3?q=80&w=1400&auto=format&fit=crop",
    alt: "Chauffeured luxury car ready for airport arrival",
  },
  {
    number: "02",
    icon: Compass,
    category: "Signature Experiences",
    title: "Dubai, Up Close",
    description:
      "The moments people fly here for. A yacht at golden hour. A table at the restaurant everyone's talking about. Access that usually takes connections — we already have them.",
    image: "https://images.unsplash.com/photo-1770273886464-54794e10e845?q=80&w=1400&auto=format&fit=crop",
    alt: "Yacht sailing past the Dubai skyline at sunset",
  },
  {
    number: "03",
    icon: PartyPopper,
    category: "Celebrations",
    title: "Moments That Deserve More",
    description:
      "A proposal on a yacht at sunset. A birthday no one forgets. A wedding that feels like Dubai, not a banquet hall. Tell us the occasion — we'll build the setting, the details, the surprise, all of it.",
    image: "https://images.unsplash.com/photo-1761963503451-e064fea6a2b5?q=80&w=1400&auto=format&fit=crop",
    alt: "Proposal setup with a floral arch at sunset",
  },
  {
    number: "04",
    icon: Zap,
    category: "Adventure",
    title: "Chase the Rush",
    description:
      "Skydive over Palm Jumeirah and watch the whole city unfold beneath you. Tear across the dunes in a buggy. Jet ski the coastline. If it gets your heart rate up, we've got a way in.",
    image: "https://images.unsplash.com/photo-1659221876406-31a3746f41b9?q=80&w=1400&auto=format&fit=crop",
    alt: "Skydiver in freefall over the coastline",
  },
  {
    number: "05",
    icon: UtensilsCrossed,
    category: "Dining & Entertainment",
    title: "Taste the City",
    description:
      "A private chef for your last night. A reservation that's usually booked out for weeks. Dubai's food scene, opened up — no guesswork, no waiting.",
    image: "https://images.unsplash.com/photo-1761095596765-c8abe01d3aea?q=80&w=1400&auto=format&fit=crop",
    alt: "Private chef plating a dish",
  },
  {
    number: "06",
    icon: Flower2,
    category: "Wellness & Beauty",
    title: "Recharge",
    description:
      "In-villa spa, personal training, private yoga at sunrise. Recovery on your schedule, wherever you're staying.",
    image: "https://images.unsplash.com/photo-1671211085251-c49156a49621?q=80&w=1400&auto=format&fit=crop",
    alt: "Sunrise yoga session on the beach",
  },
  {
    number: "07",
    icon: Route,
    category: "Custom Itineraries",
    title: "Built Around You",
    description:
      'Tell us who\'s coming and what they\'re into — we\'ll lay out the days so you\'re not the one googling "things to do in Dubai" at midnight.',
    image: "https://images.unsplash.com/photo-1758272133483-281d50324455?q=80&w=1400&auto=format&fit=crop",
    alt: "Friends planning their trip together on a rooftop",
  },
  {
    number: "08",
    icon: Ticket,
    category: "VIP Event Access",
    title: "Front Row",
    description:
      "F1 weekends, concerts, festivals — skip the queue and the guesswork. We handle the tickets, the hospitality, the logistics.",
    image: "https://images.unsplash.com/photo-1683645899605-6e485b817261?q=80&w=1400&auto=format&fit=crop",
    alt: "Crowd at a grandstand watching a race",
  },
];

export default function ExperienceCategories() {
  return (
    <div className="flex flex-col">
      {categories.map((item, i) => {
        const textBlock = (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                {item.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl lg:text-4xl">
              {item.title}
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-navy-900/60 sm:text-lg">{item.description}</p>
          </motion.div>
        );

        const imageBlock = (
          <motion.div
            key="image"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-navy-900 backdrop-blur-sm">
              {item.number}
            </span>
          </motion.div>
        );

        return (
          <section key={item.number} className={i % 2 === 0 ? "py-20 sm:py-24" : "bg-navy-50/40 py-20 sm:py-24"}>
            <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {i % 2 === 0 ? (
                <>
                  {textBlock}
                  {imageBlock}
                </>
              ) : (
                <>
                  {imageBlock}
                  {textBlock}
                </>
              )}
            </Container>
          </section>
        );
      })}
    </div>
  );
}
