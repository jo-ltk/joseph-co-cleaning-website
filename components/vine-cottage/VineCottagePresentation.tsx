"use client";

import Image from "next/image";
import {
  CookingPot,
  MapPin,
  Path,
  Tree,
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
  experience:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
  lifestyleMorning:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
  lifestyleFire:
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
  lifestyleGarden:
    "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=85",
  garden: "/images/vine-cottage/orchard-01.png",
  location:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85",
};

const nearby = [
  { icon: Path, title: "Village walks", note: "Lanes & footpaths" },
  { icon: Wine, title: "Local tables", note: "Pubs & farm shops" },
  { icon: MapPin, title: "Day trips", note: "Bath · Sherborne" },
  { icon: CookingPot, title: "Slow mornings", note: "Kitchen & garden" },
] as const;

const reviews = [
  {
    quote: "We felt we had the countryside entirely to ourselves.",
    name: "Eleanor M.",
    stay: "Weekend escape",
  },
  {
    quote: "Quiet luxury — the kind you notice in the details.",
    name: "James & Claire",
    stay: "Family stay",
  },
  {
    quote: "Historic character without sacrificing comfort.",
    name: "Sophie R.",
    stay: "Long weekend",
  },
] as const;

const navLinks = [
  { href: "#floor-plan", label: "Plan" },
  { href: "#experience", label: "Stay" },
  { href: "#highlights", label: "Spaces" },
  { href: "#enquire", label: "Enquire" },
] as const;

export default function VineCottagePresentation() {
  const reduceMotion = useReducedMotion();
  const rootRef = usePresentationAnimations(reduceMotion);

  return (
    <main ref={rootRef} className="bg-wild-sand text-aztec">
      <nav className={styles.pageNav} aria-label="Vine Cottage">
        <a href="#top" className={styles.pageNavBrand}>
          Vine Cottage
        </a>
        <div className={styles.pageNavLinks}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.pageNavLink}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>

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
            <div className={styles.heroCtas} data-hero-item>
              <a href="#floor-plan" className={styles.heroCtaPrimary}>
                View floor plan
              </a>
              <a href="#enquire" className={styles.heroCtaGhost}>
                Enquire to stay
              </a>
            </div>
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
          <div className="mb-10 max-w-xl md:mb-14">
            <SectionLabel>Lifestyle</SectionLabel>
            <SectionHeading>A weekend, imagined.</SectionHeading>
          </div>
          <div className={styles.lifestyleGrid} data-reveal-group>
            {[
              { src: images.lifestyleMorning, caption: "Morning coffee" },
              { src: images.lifestyleFire, caption: "Fireplace evenings" },
              { src: images.lifestyleGarden, caption: "Golden-hour garden" },
            ].map((item) => (
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
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className={styles.lifestyleCaption}>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Garden */}
      <section className={styles.sectionCool}>
        <SplitImageSection image={images.garden} alt="English cottage garden">
          <SectionLabel>Garden &amp; Orchard</SectionLabel>
          <SectionHeading>0.67 acres to breathe.</SectionHeading>
          <SectionLead>Lawn games, orchard shade, evening air.</SectionLead>
          <p className={styles.iconLine} data-body-reveal>
            <Tree size={22} weight="light" aria-hidden="true" />
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
          </div>
          <div className={styles.highlightRow} data-reveal-group>
            {nearby.map(({ icon: Icon, title, note }) => (
              <article
                key={title}
                className={styles.highlightChip}
                data-reveal-item
                data-hover-card
              >
                <Icon size={28} weight="light" className="text-pine-green" aria-hidden="true" />
                <div>
                  <h3 className={styles.highlightTitle}>{title}</h3>
                  <p className={styles.highlightNote}>{note}</p>
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Reviews */}
      <section className={`${styles.sectionWarm} py-20 md:py-28`}>
        <SectionContainer>
          <div className="mb-10 max-w-xl md:mb-14">
            <SectionLabel>Guest words</SectionLabel>
            <SectionHeading>Quiet praise.</SectionHeading>
          </div>
          <div className={styles.reviewGrid} data-reveal-group>
            {reviews.map((review) => (
              <blockquote
                key={review.name}
                className={styles.reviewCard}
                data-reveal-item
                data-hover-card
              >
                <p className={styles.reviewQuote}>&ldquo;{review.quote}&rdquo;</p>
                <footer className={styles.reviewMeta}>
                  <cite className={styles.reviewName}>{review.name}</cite>
                  <span>{review.stay}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Booking CTA */}
      <section id="enquire" className={`${styles.ctaBand} py-20 md:py-28`}>
        <SectionContainer className={styles.sectionInner}>
          <div className="mx-auto max-w-2xl text-center" data-reveal-group>
            <SectionLabel variant="dark">Stay</SectionLabel>
            <h2
              className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-6xl"
              data-reveal-item
            >
              Ready for Somerset stillness?
            </h2>
            <p
              className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
              data-body-reveal
            >
              Enquire privately. We respond with care.
            </p>
            <a
              href="mailto:hello@josephco.uk?subject=Vine%20Cottage%20enquiry"
              className={styles.ctaButton}
              data-reveal-item
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
