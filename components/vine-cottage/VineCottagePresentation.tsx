"use client";

import {
  Baby,
  BookOpen,
  Briefcase,
  CastleTurret,
  Champagne,
  Church,
  Compass,
  ForkKnife,
  Heart,
  Laptop,
  Mountains,
  Path,
  Sparkle,
  TreeEvergreen,
  Users,
  UsersThree,
  Wine,
} from "@phosphor-icons/react";

import FloorPlanSection from "@/components/vine-cottage/FloorPlanSection";
import HighlightsSection from "@/components/vine-cottage/HighlightsSection";
import LifestyleSection from "@/components/vine-cottage/LifestyleSection";
import {
  LightFeatureCard,
  SectionContainer,
  SectionHeading,
  SectionLabel,
  SectionLead,
  SplitImageSection,
  StatsStrip,
  styles,
} from "@/components/vine-cottage/PresentationComponents";
import { usePresentationAnimations } from "@/components/vine-cottage/usePresentationAnimations";
import { useReducedMotion } from "framer-motion";

const images = {
  hero: "/images/vine-cottage/vine-cottage-hero.png",
  vision: "/images/vine-cottage/experience-01.png",
  location: "/images/vine-cottage/location-01.png",
  heritage: "/images/vine-cottage/front-garden-01.png",
};

const propertyHighlights = [
  ["Grade II*", "Listed"],
  ["15th C.", "Origins"],
  ["0.67 acres", "Gardens"],
  ["4", "Bedrooms"],
  ["Stone barns", "Outbuildings"],
  ["Queen Camel", "Somerset"],
] as const;

const perfectFor = [
  {
    icon: Heart,
    title: "Couples",
    description: "Private, unhurried stays with space to truly disconnect.",
  },
  {
    icon: Baby,
    title: "Families",
    description: "Four bedrooms and generous living for multi-generational weekends.",
  },
  {
    icon: UsersThree,
    title: "Friends' retreats",
    description: "A shared countryside house — kitchen table, garden, and long evenings.",
  },
  {
    icon: Briefcase,
    title: "Small corporate retreats",
    description: "Strategy days in calm surroundings, away from hotel conference rooms.",
  },
  {
    icon: Laptop,
    title: "Remote professionals",
    description: "Quiet focus by day; orchard stillness when the laptop closes.",
  },
  {
    icon: Sparkle,
    title: "Wellness escapes",
    description: "Sauna, hot tub, and garden air for restorative countryside pauses.",
  },
  {
    icon: Users,
    title: "International visitors",
    description: "An authentic Somerset cottage with hotel-standard care.",
  },
  {
    icon: Champagne,
    title: "Anniversary escapes",
    description: "Milestone weekends held gently — just the two of you, and the cottage.",
  },
  {
    icon: BookOpen,
    title: "Writers & creatives",
    description: "Room to think, write, and make — with countryside quiet as the only deadline.",
  },
] as const;

const occasions = [
  "Family gatherings",
  "Anniversary weekends",
  "Birthday celebrations",
  "Friends' reunions",
  "Quiet Christmas holidays",
  "Easter breaks",
  "Team strategy retreats",
  "Book clubs",
] as const;

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
    note: "Sparkford's celebrated collection — a bright afternoon for curious minds.",
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

export default function VineCottagePresentation() {
  const reduceMotion = useReducedMotion();
  const rootRef = usePresentationAnimations(reduceMotion);

  return (
    <main ref={rootRef} className="bg-wild-sand text-aztec" data-vine-cottage>
      {/* 1. Hero */}
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
              A Grade II* listed retreat for unhurried countryside stays.
            </p>
          </div>
        </div>
      </section>

      <FloorPlanSection />

      {/* 2. Our Vision */}
      <section id="vision" className={styles.sectionCool}>
        <SplitImageSection image={images.vision} alt="Light-filled cottage interior">
          <SectionLabel>Our Vision</SectionLabel>
          <SectionHeading>Celebrate the cottage. Elevate the stay.</SectionHeading>
          <SectionLead>
            Every concept respects the heritage of Vine Cottage and focuses on guest
            experience rather than structural change — styling, care, and atmosphere
            that honour Grade II* character while creating a luxury countryside retreat.
          </SectionLead>
        </SplitImageSection>
      </section>

      {/* 3. Our Design Vision */}
      <HighlightsSection />

      {/* 4. Lifestyle */}
      <LifestyleSection />

      {/* 5. Property Highlights */}
      <section id="highlights" className={`${styles.sectionWarm} py-20 md:py-28`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-10 max-w-xl md:mb-14" data-reveal-group>
            <SectionLabel>Property Highlights</SectionLabel>
            <SectionHeading>The facts that matter.</SectionHeading>
            <SectionLead>
              A historic Somerset cottage with the scale, setting, and character for
              an exceptional private retreat.
            </SectionLead>
          </div>
          <StatsStrip
            stats={propertyHighlights.map(([value, label]) => [value, label] as const)}
          />
        </SectionContainer>
      </section>

      {/* 6. Perfect For */}
      <section id="perfect-for" className={`${styles.sectionMesh} py-20 md:py-28`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-10 max-w-xl md:mb-14">
            <SectionLabel>Perfect For</SectionLabel>
            <SectionHeading>Guests who seek quiet luxury.</SectionHeading>
            <SectionLead>
              Designed for intimate stays — never for volume, never for spectacle.
            </SectionLead>
          </div>
          <div className={styles.perfectGrid} data-reveal-group>
            {perfectFor.map((item) => (
              <LightFeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
          <p className={styles.perfectMore} data-body-reveal>
            <span className={styles.perfectMoreLabel}>And more&hellip;</span>
            Book clubs, quiet birthdays, sabbaticals, and many other intimate stays —
            if it fits the cottage, it belongs here.
          </p>
        </SectionContainer>
      </section>

      {/* 7. Ideal Occasions */}
      <section id="occasions" className={`${styles.sectionCool} py-20 md:py-28`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-10 max-w-xl md:mb-12">
            <SectionLabel>Ideal Occasions</SectionLabel>
            <SectionHeading>Small-scale, beautifully held.</SectionHeading>
            <SectionLead>
              Moments that fit the cottage — intimate gatherings, not large events.
            </SectionLead>
          </div>
          <ul className={styles.occasionGrid} data-reveal-group>
            {occasions.map((item) => (
              <li key={item} className={styles.occasionItem} data-reveal-item>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.occasionNote} data-body-reveal>
            Not intended for weddings, large parties, or high-volume events.
          </p>
        </SectionContainer>
      </section>

      {/* 8. Nearby Somerset */}
      <section id="location" className={styles.sectionWarm}>
        <SplitImageSection
          image={images.location}
          alt="Somerset countryside landscape"
          imagePosition="right"
        >
          <SectionLabel>Nearby Somerset</SectionLabel>
          <SectionHeading>Queen Camel, and beyond.</SectionHeading>
          <SectionLead>
            Village peace with Bath, Sherborne and the A303 within easy reach.
          </SectionLead>
        </SplitImageSection>
      </section>

      <section className={`${styles.sectionMesh} py-20 md:py-28`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-10 max-w-xl md:mb-14">
            <SectionLabel>Beyond the Gate</SectionLabel>
            <SectionHeading>Places worth the slow drive.</SectionHeading>
            <SectionLead>
              Walks from the door, museums minutes away, and day trips that reward an
              unhurried pace.
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
                    isFeatured
                      ? `${styles.nearbyCard} ${styles.nearbyFeatured}`
                      : styles.nearbyCard
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

      {/* 9. Preserving Heritage */}
      <section id="heritage" className={styles.sectionCool}>
        <SplitImageSection
          image={images.heritage}
          alt="Front garden and historic façade of Vine Cottage"
        >
          <SectionLabel>Preserving Heritage</SectionLabel>
          <SectionHeading>Sympathetic, reversible, respectful.</SectionHeading>
          <SectionLead>
            Every proposal respects the Grade II* listed character and focuses on
            reversible, sympathetic styling rather than altering the historic fabric.
            Comfort and atmosphere rise; the cottage itself remains true.
          </SectionLead>
        </SplitImageSection>
      </section>

      {/* 10. Thank You card */}
      <section
        id="thank-you"
        className={styles.closingBand}
        aria-label="Thank you and presented by Joseph & Co"
      >
        <SectionContainer className={styles.sectionInner}>
          <article className={styles.thankCard} data-reveal-group>
            <header className={styles.thankCardHeader}>
              <SectionLabel variant="dark">Closing</SectionLabel>
              <h2 className={styles.thankCardTitle} data-reveal-item>
                Thank You
              </h2>
              <p className={styles.thankCardQuote} data-body-reveal>
                Thank you for taking the time to explore our vision for Vine Cottage. Our
                ambition is to celebrate its remarkable history while creating an
                exceptional countryside retreat that future guests will remember.
              </p>
            </header>

            <div className={styles.thankCardRule} aria-hidden="true" data-reveal-item />

            <footer className={styles.thankCardFooter} data-reveal-item>
              <div className={styles.thankCardPresented}>
                <p className={styles.thankCardPresentedLabel}>Presented by</p>
                <h3 className={styles.closingBrand}>Joseph &amp; Co</h3>
                <p className={styles.closingBrandNote}>
                  Hotel-standard care for a historic Somerset cottage — heritage protected,
                  guests welcomed.
                </p>
              </div>
              <div className={styles.closingContact}>
                <p className={styles.closingEntity}>Property Ltd</p>
                <a
                  href="mailto:hello@josephco.uk?subject=Vine%20Cottage%20enquiry"
                  className={styles.closingEmail}
                >
                  hello@josephco.uk
                </a>
              </div>
            </footer>
          </article>
        </SectionContainer>
      </section>
    </main>
  );
}
