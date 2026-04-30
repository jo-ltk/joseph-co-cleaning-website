"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "./ui/Button";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    label: "Domestic",
    title: "Domestic Cleaning",
    description: "Exceptional cleaning for your private sanctuary. We provide a bespoke service that respects your home and your time, ensuring a pristine environment for you and your family.",
    benefits: ["Regular Weekly/Bi-weekly Visits", "Vetted & Trusted Professionals", "Customized Cleaning Checklists", "Eco-Friendly Products Used"],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    cta: "/services/domestic-cleaning"
  },
  {
    label: "Commercial",
    title: "Commercial Cleaning",
    description: "Project a professional image with a spotless workspace. Our commercial teams handle offices, retail spaces, and corporate environments with unmatched efficiency.",
    benefits: ["Flexible After-Hours Service", "High-Traffic Area Sanitation", "Professional-Grade Equipment", "Consistent Quality Standards"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    cta: "/services/commercial-cleaning"
  },
  {
    label: "Industrial",
    title: "Industrial Cleaning",
    description: "Specialized cleaning solutions for demanding environments. From warehouses to manufacturing facilities, we ensure safety and compliance through rigorous cleaning protocols.",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Heavy-Duty Equipment", "Safety & Compliance Focused", "Warehouse & Factory Expertise", "Debris & Grease Removal"],
    cta: "/services/industrial-cleaning"
  },
{
    label: "Tenancy",
    title: "End of Tenancy Cleaning",
    description: "Secure your deposit with our comprehensive move-out cleaning. We follow strict agency-approved checklists to ensure every corner meets professional standards.",
    benefits: ["Deposit-Back Guarantee", "Full Interior Deep Clean", "Appliance & Window Cleaning", "Fast 24-Hour Turnaround"],
    // UPDATED: Reliable high-resolution image of a sparkling clean modern interior.
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
    cta: "/services/end-of-tenancy-cleaning"
},
  {
    label: "Deep Clean",
    title: "Deep Cleaning",
    description: "For when your property needs more than just a surface clean. Our deep cleaning service targets hidden dirt and grime in often-overlooked areas.",
    benefits: ["Intensive Scrubbing & Sanitize", "Nook & Cranny Focus", "Upholstery & Carpet Care", "One-Off Restoration Clean"],
    image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=1200&auto=format&fit=crop",
    cta: "/services/deep-cleaning"
  },
  {
    label: "Construction",
    title: "After Builders Cleaning",
    description: "Removing the post-construction dust and debris to reveal your new space. We provide a detailed finish that makes your property ready for immediate occupancy.",
    benefits: ["Fine Dust Removal", "Paint & Plaster Spot Cleaning", "Internal Window Cleaning", "Quick & Efficient Team"],
    image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=1200&auto=format&fit=crop",
    cta: "/services/after-builders-cleaning"
  },
  {
    label: "Outdoor",
    title: "Garden & Exterior Care",
    description: "Premium maintenance for your home's exterior. From patio pressure washing to garden seasonal tidying, we ensure your outdoor spaces match the standard of your interiors.",
    image: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Patio & Driveway Pressure Washing", "Garden Leaf & Debris Cleanup", "Seasonal Lawn & Border Tidy", "Small Exterior Surface Cleaning"],
    cta: "/contact?source=Detailed Services&service=Garden & Exterior Care"
  }
];

export default function DetailedServices() {
  return (
    <section className="bg-[#f5f5f3] py-20 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20">
        <div className="flex flex-col gap-32 md:gap-48">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}
            >
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-1/2"
              >
                <div className="relative aspect-[4/5] md:aspect-[1.2/1] overflow-hidden rounded-sm shadow-2xl bg-zinc-200">
                  <Image 
                    src={service.image}
                    alt={`${service.title} by Joseph and Co professional cleaners`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                    // For troubleshooting specific image loading if needed
                    unoptimized={service.label === "Outdoor"} 
                    className="object-cover transition-transform duration-1000 hover:scale-110"
                  />
                </div>
              </motion.div>

              <div className="w-full lg:w-1/2">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
                >
                  {service.label}
                </motion.span>
                <ScrollReveal
                  as="h3"
                  containerClassName="text-2xl md:text-4xl leading-[1.1] text-aztec font-medium tracking-tight mb-6"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {service.title}
                </ScrollReveal>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xanadu text-lg md:text-xl leading-relaxed font-medium mb-8 max-w-xl"
                >
                  {service.description}
                </motion.p>

                <ul className="flex flex-col gap-4 mb-12">
                  {service.benefits.map((benefit, bIndex) => (
                    <motion.li 
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + (bIndex * 0.05) }}
                      className="flex items-center gap-4 text-aztec/90 font-medium"
                    >
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-pine-green" />
                      <span className="text-base md:text-lg tracking-tight">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <ButtonLink href={service.cta} variant="primary" className="px-8">
                    View Service
                  </ButtonLink>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}