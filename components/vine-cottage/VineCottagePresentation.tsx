"use client";

import Image from "next/image";
import {
  CastleTurret,
  Church,
  Compass,
  ForkKnife,
  Mountains,
  Path,
  TreeEvergreen,
  Wine,
} from "@phosphor-icons/react";

import FloorPlanSection from "@/components/vine-cottage/FloorPlanSection";
import HighlightsSection from "@/components/vine-cottage/HighlightsSection";
import PartnershipFooter from "@/components/vine-cottage/PartnershipFooter";
import {
  SectionContainer,
  SectionHeading,
  SectionLabel,
  SectionLead,
  SplitImageSection,
  styles,
} from "@/components/vine-cottage/PresentationComponents";
import { usePresentationAnimations } from "@/components/vine-cottage/usePresentationAnimations";
import { useReducedMotion } from "framer-motion";

const images = {
  hero: "/images/vine-cottage/vine-cottage-hero.png",
  experience: "/images/vine-cottage/experience-01.png",
  lifestyleMorning: "/images/vine-cottage/lifestyle-morning.png",
  lifestyleFire: "/images/vine-cottage/lifestyle-fire.png",
  lifestyleGarden: "/images/vine-cottage/lifestyle-garden.png",
  garden: "/images/vine-cottage/orchard-01.png",
  location: "/images/vine-cottage/location-01.png",
};

const nearby = [
  {
    icon: CastleTurret,
    title: "Cadbury Castle",
    distance: "5 min",
    note: "Iron Age ramparts and wide Somerset skies — a quiet climb with Camelot lore in the grass.",
    featured: true,
  },
  {
    icon: Compass,
    title: "Haynes Motor Museum",
    distance: "8 min",
    note: "Sparkford’s celebrated collection — a bright afternoon for curious minds.",
    featured: true,
  },
  {
    icon: Path,
    title: "Village lanes",
    distance: "On foot",
    note: "Hedgerow footpaths and quiet loops from the cottage gate.",
  },
  {
    icon: Wine,
    title: "Pubs & farm shops",
    distance: "Nearby",
    note: "Local tables, seasonal produce, and a glass after dusk.",
  },
  {
    icon: Church,
    title: "Sherborne",
    distance: "20 min",
    note: "Abbey stone, bookshops, and a handsome market town pace.",
  },
  {
    icon: Mountains,
    title: "Glastonbury Tor",
    distance: "35 min",
    note: "A landmark climb with levels stretching to the horizon.",
  },
  {
    icon: TreeEvergreen,
    title: "Lytes Cary Manor",
    distance: "15 min",
    note: "National Trust gardens and a Tudor house in soft light.",
  },
  {
    icon: ForkKnife,
    title: "Bath",
    distance: "45 min",
    note: "Roman baths, crescents, and a full day of Georgian splendour.",
  },
] as const;

const quietLuxuries = [
  {
    title: "Hotel care, cottage soul",
    note: "Joseph & Co standards in a private historic home — every detail considered, never institutional.",
  },
  {
    title: "Wellness beyond the barn",
    note: "Cube sauna and cedar hot tub for slow evenings under Somerset sky.",
  },
  {
    title: "Space to truly gather",
    note: "Four bedrooms and generous living — family reunions without compromise.",
  },
  {
    title: "0.67 acres of stillness",
    note: "Orchard air, garden light, and room to breathe between village and countryside.",
  },
  {
    title: "Heritage, held gently",
    note: "Character protected, comfort elevated — history you can live in, not look at.",
  },
  {
    title: "Close to everything quiet",
    note: "Village walks from the gate; Bath, Sherborne and Glastonbury when you want the wider world.",
  },
] as const;

export default function VineCottagePresentation() {
  const reduceMotion = useReducedMotion();
  const rootRef = usePresentationAnimations(reduceMotion);

  return (
    <main ref={rootRef} className="bg-wild-sand text-aztec" data-vine-cottage>
      {/* Hero */}
      <section id="top" className={styles.hero} aria-label="Vine Cottage introduction">
        <img
          src={images.hero}
          alt="Vine Cottage among mature greenery in Somerset"
          className={styles.heroImage}
          data-hero-image
          data-parallax="0.08"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroGradient} aria-hidden="true" />
        <div className={styles.heroGrain} aria-hidden="true" />

        <div className={styles.heroContent}>
          <div className="max-w-3xl">
            <p className={styles.heroEyebrow} data-hero-item>
              Queen Camel, Somerset
            </p>
            <h1
              className="text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl md:text-8xl lg:text-9xl"
              data-hero-item
            >
              Vine Cottage
            </h1>
            <p
              className="mt-5 max-w-md text-lg font-medium leading-snug tracking-tight text-white/85 md:text-2xl"
              data-hero-item
            >
              A Grade II listed retreat for unhurried countryside stays.
            </p>
          </div>
        </div>
      </section>

      <FloorPlanSection />

      {/* Property Experience */}
      <section id="experience" className={styles.sectionCool}>
        <SplitImageSection image={images.experience} alt="Light-filled cottage interior">
          <SectionLabel>The Experience</SectionLabel>
          <SectionHeading>Arrive. Soften. Stay.</SectionHeading>
          <SectionLead>
            Stone, linen, orchard light — a cottage made for weekends that linger.
          </SectionLead>
        </SplitImageSection>
      </section>

      <HighlightsSection />

      {/* Luxury Lifestyle — visual story strip */}
      <section className={`${styles.sectionMesh} py-20 md:py-28`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-10 max-w-3xl md:mb-14">
            <SectionLabel>Lifestyle</SectionLabel>
            <SectionHeading>A weekend, imagined.</SectionHeading>
          </div>
        </SectionContainer>
        <div className={styles.lifestyleBleed}>
          <div className={styles.lifestyleGrid} data-reveal-group>
            {[
              {
                src: images.lifestyleMorning,
                caption: "Morning coffee",
                note: "Slow start by the window",
              },
              {
                src: images.lifestyleFire,
                caption: "Fireplace evenings",
                note: "Warm light, long talks",
              },
              {
                src: images.lifestyleGarden,
                caption: "Golden-hour garden",
                note: "Orchard air at dusk",
              },
            ].map((item, index) => (
              <figure
                key={item.caption}
                className={styles.lifestyleCard}
                data-reveal-item
                data-hover-card
              >
                <div className={styles.lifestyleImage}>
                  <Image
                    src={item.src}
                    alt={item.caption}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 768px) 90vw, 34vw"
                    className={styles.lifestyleImg}
                    data-image-parallax="7"
                  />
                  <div className={styles.lifestyleShade} aria-hidden="true" />
                </div>
                <figcaption className={styles.lifestyleCaption}>
                  <span className={styles.lifestyleIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.lifestyleCaptionText}>
                    <span className={styles.lifestyleTitle}>{item.caption}</span>
                    <span className={styles.lifestyleNote}>{item.note}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Garden */}
      <section className={styles.sectionCool}>
        <SplitImageSection image={images.garden} alt="English cottage garden">
          <SectionLabel>Garden &amp; Orchard</SectionLabel>
          <SectionHeading>0.67 acres to breathe.</SectionHeading>
          <SectionLead>Lawn games, orchard shade, evening air.</SectionLead>
          <p className={styles.iconLine} data-body-reveal>
            <TreeEvergreen size={22} weight="light" aria-hidden="true" />
            Private · seasonal · still
          </p>
        </SplitImageSection>
      </section>

      {/* Location */}
      <section id="location" className={styles.sectionWarm}>
        <SplitImageSection
          image={images.location}
          alt="Somerset countryside landscape"
          imagePosition="right"
        >
          <SectionLabel>Location</SectionLabel>
          <SectionHeading>Queen Camel, Somerset.</SectionHeading>
          <SectionLead>
            Village peace with Bath, Sherborne and the A303 within easy reach.
          </SectionLead>
        </SplitImageSection>
      </section>

      {/* Nearby */}
      <section className={`${styles.sectionMesh} py-20 md:py-28`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-10 max-w-xl md:mb-14">
            <SectionLabel>Nearby</SectionLabel>
            <SectionHeading>Beyond the gate.</SectionHeading>
            <SectionLead>
              Walks from the door, museums minutes away, and day trips that reward a slow drive.
            </SectionLead>
          </div>
          <div className={styles.nearbyGrid} data-reveal-group>
            {nearby.map((place) => {
              const Icon = place.icon;
              const isFeatured = "featured" in place && place.featured;

              return (
              <article
                key={place.title}
                className={
                  isFeatured ? `${styles.nearbyCard} ${styles.nearbyFeatured}` : styles.nearbyCard
                }
                data-reveal-item
                data-hover-card
              >
                <div className={styles.nearbyTop}>
                  <span className={styles.nearbyIcon} aria-hidden="true">
                    <Icon size={26} weight="light" />
                  </span>
                  <span className={styles.nearbyDistance}>{place.distance}</span>
                </div>
                <h3 className={styles.nearbyTitle}>{place.title}</h3>
                <p className={styles.nearbyNote}>{place.note}</p>
              </article>
              );
            })}
          </div>
        </SectionContainer>
      </section>

      {/* Quiet luxuries */}
      <section className={`${styles.sectionWarm} py-20 md:py-28`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-12 max-w-xl md:mb-16">
            <SectionLabel>Signature</SectionLabel>
            <SectionHeading>Quiet luxuries.</SectionHeading>
            <SectionLead>
              The points that make Vine Cottage feel rare — crafted for guests who notice the difference.
            </SectionLead>
          </div>
          <div className={styles.luxuryGrid} data-reveal-group>
            {quietLuxuries.map((item, index) => (
              <article
                key={item.title}
                className={styles.luxuryItem}
                data-reveal-item
                data-hover-card
              >
                <span className={styles.luxuryIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.luxuryCopy}>
                  <h3 className={styles.luxuryTitle}>{item.title}</h3>
                  <p className={styles.luxuryNote}>{item.note}</p>
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Booking CTA */}
      <section id="enquire" className={`${styles.ctaBand} py-12 md:py-16`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mx-auto max-w-2xl text-center" data-reveal-group>
            <SectionLabel variant="dark">Stay</SectionLabel>
            <h2
              className="mt-3 text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl"
              data-reveal-item
            >
              Ready for Somerset stillness?
            </h2>
            <p
              className="mx-auto mt-3 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
              data-body-reveal
            >
              Enquire privately. We respond with care.
            </p>
            <a
              href="mailto:hello@josephco.uk?subject=Vine%20Cottage%20enquiry"
              className={styles.ctaButton}
              data-reveal-item
              data-hover-cta
            >
              Enquire to stay
            </a>
          </div>
        </SectionContainer>
      </section>

      <PartnershipFooter />
    </main>
  );
}
