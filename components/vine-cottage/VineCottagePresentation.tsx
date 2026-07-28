"use client";

import { useReducedMotion } from "framer-motion";
import {
  Airplane,
  Briefcase,
  Buildings,
  Car,
  ChatsCircle,
  Church,
  Flower,
  Gear,
  Handshake,
  HardHat,
  Heart,
  House,
  HouseLine,
  Key,
  MapPin,
  MoonStars,
  PaintBrush,
  Shield,
  ShieldCheck,
  Sparkle,
  Star,
  Sun,
  Tree,
  Truck,
  Users,
  Gift,
  Wine,
} from "@phosphor-icons/react";

import GallerySection from "@/components/vine-cottage/GallerySection";
import PartnershipFooter from "@/components/vine-cottage/PartnershipFooter";
import {
  CommitmentItem,
  DarkFeatureCard,
  LightFeatureCard,
  MilestoneRow,
  MissionCard,
  PullQuote,
  SectionContainer,
  SectionHeading,
  SectionLabel,
  SectionLead,
  SplitImageSection,
  StatsStrip,
  styles,
} from "@/components/vine-cottage/PresentationComponents";
import { usePresentationAnimations } from "@/components/vine-cottage/usePresentationAnimations";

const images = {
  hero: "/images/vine-cottage/vine-cottage-hero.png",
  vision:
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85",
  about:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
};

const highlights = [
  [Church, "Historic Cottage", "15th century character"],
  [MoonStars, "4 Bedrooms", "Space to slow down"],
  [Buildings, "Stone Barn", "A distinctive arrival"],
  [Flower, "Private Garden", "0.67 acres to enjoy"],
  [Tree, "Orchard", "A sense of season"],
  [Car, "Private Driveway", "Easy, private access"],
  [House, "Peaceful Village", "Queen Camel, Somerset"],
  [MapPin, "Excellent Location", "Connected countryside"],
] as const;

const experiences = [
  [Users, "Family Escapes", "Long lunches, lawn games and unhurried time together."],
  [Briefcase, "Remote Working", "A restorative base for focused weeks away from the city."],
  [Buildings, "Corporate Stay", "A considered countryside alternative for small teams."],
  [Heart, "NHS Accommodation", "Comfortable, calm stays designed around demanding schedules."],
  [Wine, "Weekend Retreat", "A memorable setting for friends, food and local discovery."],
  [Tree, "Countryside Relaxation", "A place to reset, with Somerset on the doorstep."],
] as const;

const storyMilestones = [
  [
    "01",
    "Founded with purpose",
    "Joseph & Co was founded to give landlords complete confidence in the management of their properties.",
  ],
  [
    "02",
    "Built on experience",
    "Our background spans cleaning, removals and property services—bringing practical expertise to every partnership.",
  ],
  [
    "03",
    "Hotel-quality standards",
    "We apply the same meticulous care found in luxury hospitality to every serviced accommodation.",
  ],
  [
    "04",
    "Long-term approach",
    "We believe in sustainable management, not short-term gains—protecting your investment for years to come.",
  ],
] as const;

const values = [
  [Briefcase, "Professionalism", "Every interaction reflects the highest standards of conduct and care."],
  [Handshake, "Trust", "Transparency and reliability form the foundation of every landlord relationship."],
  [Star, "Excellence", "We pursue exceptional outcomes in every detail of property management."],
  [Heart, "Respect", "For your property, your neighbours and every guest who stays."],
  [ChatsCircle, "Communication", "Clear, timely updates so you are always informed and confident."],
  [Shield, "Property Protection", "Safeguarding your asset with diligence, discretion and proactive care."],
] as const;

const guests = [
  [Briefcase, "Business Professionals", "Executives and consultants seeking a refined base away from the city."],
  [Buildings, "Corporate Clients", "Companies requiring quality accommodation for teams and visiting staff."],
  [Heart, "NHS Staff", "Healthcare professionals needing comfortable, reliable stays near their placements."],
  [HardHat, "Contractors", "Tradespeople and project teams working on extended regional assignments."],
  [Users, "Relocating Families", "Families in transition who need space, comfort and a sense of home."],
  [ShieldCheck, "Insurance Guests", "Guests placed through insurance providers who expect hotel-standard care."],
  [Airplane, "Executive Travellers", "Discerning travellers who value privacy, quality and a memorable setting."],
  [Gift, "Small Events", "Intimate gatherings and private celebrations suited to a peaceful countryside setting."],
  [Sun, "Staycation Guests", "Couples and families seeking a premium countryside escape without leaving the region."],
] as const;

const services = [
  [House, "Luxury Serviced Accommodation", "Premium short-stay experiences managed to hotel standards."],
  [Buildings, "Corporate Lets", "Reliable, professional accommodation for business travellers and teams."],
  [Sparkle, "Commercial Cleaning", "Immaculate workspaces maintained to the highest professional standards."],
  [HouseLine, "Domestic Cleaning", "Bespoke home care delivered with discretion and attention to detail."],
  [Key, "End of Tenancy Cleaning", "Comprehensive move-out cleaning that meets agency-approved standards."],
  [Briefcase, "Property Services", "Property management support, letting services, and coordinated move-in/move-out care."],
  [Truck, "House Removals", "Careful, efficient relocations handled by experienced professionals."],
  [PaintBrush, "Property Preparation", "Presentation-ready properties prepared for guests or new tenancies."],
  [Gear, "Maintenance Coordination", "Prompt reporting and coordination of repairs to protect your asset."],
] as const;

const commitments = [
  "Reliable rent payments",
  "Professional communication",
  "Regular inspections",
  "Hotel-standard cleaning",
  "Prompt maintenance reporting",
  "Respect for neighbours",
  "Respect for your property",
  "Long-term partnership",
] as const;

const whyVineCottage = [
  [
    "01",
    "Historic Character",
    "A Grade II Listed home with an authentic sense of place that guests cannot find elsewhere.",
  ],
  [
    "02",
    "0.67 Acres",
    "Generous private grounds offering garden, orchard and barn—a rare canvas for memorable stays.",
  ],
  [
    "03",
    "Stone Barns",
    "Distinctive outbuildings that add character and create a remarkable arrival experience.",
  ],
  [
    "04",
    "Four Bedrooms",
    "Spacious accommodation suited to families, corporate groups and longer stays.",
  ],
  [
    "05",
    "Peaceful Countryside",
    "A tranquil Somerset village setting that invites guests to slow down and unwind.",
  ],
  [
    "06",
    "Large Family Accommodation",
    "Room to gather, work and relax—ideal for multi-generational and extended stays.",
  ],
  [
    "07",
    "Excellent Road Connections",
    "Somerset countryside with easy access to Bath, Sherborne, Glastonbury and the A303.",
  ],
  [
    "08",
    "Unique Experience",
    "A hospitality offering that cannot be replicated in a new-build—a stay with a story.",
  ],
] as const;

const propertyStats = [
  ["15th", "Century origins"],
  ["4", "Bedrooms"],
  ["0.67", "Acres of grounds"],
  ["Grade II", "Listed property"],
] as const;

export default function VineCottagePresentation() {
  const reduceMotion = useReducedMotion();
  const rootRef = usePresentationAnimations(reduceMotion);

  return (
    <main ref={rootRef} className="bg-wild-sand text-aztec">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Vine Cottage introduction">
        <img
          src={images.hero}
          alt="Countryside cottage surrounded by mature greenery"
          className={styles.heroImage}
          data-hero-image
          data-parallax="0.08"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroGradient} aria-hidden="true" />
        <div className={styles.heroGrain} aria-hidden="true" />

        <div className={styles.heroContent}>
          <div className="max-w-4xl">
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
              className="mt-5 text-2xl font-medium leading-[1.1] tracking-tight md:text-4xl"
              data-hero-item
            >
              Luxury Countryside Retreat
            </p>
            <p
              className="mt-7 max-w-xl text-base leading-relaxed text-white/78 md:text-lg"
              data-hero-item
            >
              A considered vision for transforming a remarkable historic cottage into an
              exceptional short-stay destination—preserving its heritage while elevating every
              moment of the guest experience.
            </p>
          </div>
        </div>

      </section>

      {/* ── Vision ─────────────────────────────────────────────────────────── */}
      <section id="vision" className={styles.sectionCool}>
        <SplitImageSection image={images.vision} alt="Warm cottage sitting room">
          <SectionLabel>Our Vision for Vine Cottage</SectionLabel>
          <SectionHeading>Honour the past. Create an exceptional stay.</SectionHeading>
          <SectionLead>
            Vine Cottage already has the ingredients guests remember: age, texture, privacy and
            a genuine connection to the Somerset landscape. The opportunity is to curate these
            qualities into a refined, welcoming hospitality experience.
          </SectionLead>
        </SplitImageSection>
      </section>

      {/* ── Property Highlights ────────────────────────────────────────────── */}
      <section className={`${styles.sectionWarm} ${styles.sectionMesh} py-20 md:py-28`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-12 max-w-2xl md:mb-16">
            <SectionLabel>Property Highlights</SectionLabel>
            <SectionHeading>A rare canvas for memorable stays.</SectionHeading>
            <StatsStrip stats={propertyStats} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {highlights.map(([Icon, title, description]) => (
              <LightFeatureCard
                key={title}
                icon={Icon}
                title={title}
                description={description}
              />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── Guest Experience ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <SectionContainer>
          <div className="mb-12 max-w-3xl md:mb-16">
            <SectionLabel>Guest Experience</SectionLabel>
            <SectionHeading>Designed around how guests want to feel.</SectionHeading>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {experiences.map(([Icon, title, description]) => (
              <DarkFeatureCard
                key={title}
                icon={Icon}
                title={title}
                description={description}
              />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section className={styles.sectionWarm}>
        <SplitImageSection
          image={images.about}
          alt="Professionally managed luxury property"
          imagePosition="right"
        >
          <SectionLabel>About Joseph &amp; Co</SectionLabel>
          <SectionHeading>Professional management. Luxury hospitality.</SectionHeading>
          <SectionLead>
            Joseph &amp; Co Property Ltd is a UK property company specialising in professionally
            managed serviced accommodation and property solutions.
          </SectionLead>
          <SectionLead className="!mt-5">
            We focus on quality, professional management and luxury hospitality—building
            long-term landlord partnerships founded on trust, transparency and exceptional
            standards.
          </SectionLead>
        </SplitImageSection>
      </section>

      {/* ── Our Story ──────────────────────────────────────────────────────── */}
      <section className={`${styles.sectionMesh} py-20 md:py-32`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-12 max-w-3xl md:mb-16">
            <SectionLabel>Our Story</SectionLabel>
            <SectionHeading>Built on experience. Driven by trust.</SectionHeading>
          </div>
          <div className={styles.timeline}>
            {storyMilestones.map(([number, title, description]) => (
              <MilestoneRow
                key={title}
                number={number}
                title={title}
                description={description}
              />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── Mission & Vision ───────────────────────────────────────────────── */}
      <section className={`${styles.sectionWarm} ${styles.sectionMesh} py-20 md:py-32`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-12 max-w-3xl md:mb-16">
            <SectionLabel>Our Mission &amp; Vision</SectionLabel>
            <SectionHeading>Purpose and ambition, clearly defined.</SectionHeading>
          </div>
          <div className="grid gap-5 md:grid-cols-2" data-reveal-group>
            <MissionCard
              label="Mission"
              title="Luxury accommodation. Protected investments."
              description="Provide luxury serviced accommodation with hotel-quality standards while protecting every landlord's investment."
            />
            <MissionCard
              label="Vision"
              title="Trusted. Exceptional. Enduring."
              description="Become one of the UK's most trusted serviced accommodation providers through exceptional guest experiences and long-term partnerships."
            />
          </div>
        </SectionContainer>
      </section>

      {/* ── Values ─────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <SectionContainer>
          <div className="mb-12 max-w-2xl md:mb-16">
            <SectionLabel>Our Values</SectionLabel>
            <SectionHeading>The principles behind everything we do.</SectionHeading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {values.map(([Icon, title, description]) => (
              <LightFeatureCard
                key={title}
                icon={Icon}
                title={title}
                description={description}
              />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── Our Guests ─────────────────────────────────────────────────────── */}
      <section className={`${styles.sectionWarm} ${styles.sectionMesh} py-20 md:py-32`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-12 max-w-4xl md:mb-16">
            <SectionLabel>Our Guests</SectionLabel>
            <SectionHeading>Curated for discerning audiences.</SectionHeading>

            <div className={styles.introBlock}>
              <div>
                <SectionLead className="!mt-0">
                  Vine Cottage has the space, character and setting to welcome a wide range of
                  guests—corporate travellers, relocating families, small private events, NHS
                  professionals and countryside explorers alike.
                </SectionLead>
                <SectionLead className="!mt-5">
                  Every booking is carefully reviewed to ensure the right fit, maintaining
                  standards, protecting your investment and preserving the property&apos;s historic
                  character.
                </SectionLead>
              </div>
              <PullQuote>
                That versatility means consistent demand across every season—we can do so much
                with a property of this calibre.
              </PullQuote>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {guests.map(([Icon, title, description]) => (
              <DarkFeatureCard
                key={title}
                icon={Icon}
                title={title}
                description={description}
              />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── Services ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <SectionContainer>
          <div className="mb-12 max-w-2xl md:mb-16">
            <SectionLabel>Our Services</SectionLabel>
            <SectionHeading>Comprehensive property solutions.</SectionHeading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {services.map(([Icon, title, description]) => (
              <LightFeatureCard
                key={title}
                icon={Icon}
                title={title}
                description={description}
              />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── Commitment ─────────────────────────────────────────────────────── */}
      <section className={`${styles.sectionWarm} ${styles.sectionMesh} py-20 md:py-32`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mb-12 max-w-3xl md:mb-16">
            <SectionLabel>Our Commitment</SectionLabel>
            <SectionHeading>What you can expect from us.</SectionHeading>
          </div>
          <div className={styles.commitmentGrid} data-reveal-group>
            {commitments.map((item) => (
              <CommitmentItem key={item}>{item}</CommitmentItem>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── Why Vine Cottage ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <SectionContainer>
          <div className="mb-12 max-w-3xl md:mb-16">
            <SectionLabel>Why Vine Cottage</SectionLabel>
            <SectionHeading>
              The perfect canvas for luxury serviced accommodation.
            </SectionHeading>
            <SectionLead>
              Vine Cottage possesses every quality needed for exceptional short-stay
              hospitality—a rare combination of historic character, generous grounds and a
              peaceful Somerset setting.
            </SectionLead>
          </div>
          <div className={styles.timeline}>
            {whyVineCottage.map(([number, title, description]) => (
              <MilestoneRow
                key={title}
                number={number}
                title={title}
                description={description}
              />
            ))}
          </div>
        </SectionContainer>
      </section>

      <GallerySection />
      <PartnershipFooter />
    </main>
  );
}
