"use client";

import {
  Baby,
  BookOpen,
  Briefcase,
  Compass,
  Handshake,
  Heart,
  HouseLine,
  MapPin,
  Sparkle,
  Target,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";

import {
  SectionContainer,
  SectionHeading,
  SectionLabel,
  SectionLead,
  styles,
} from "@/components/vine-cottage/PresentationComponents";

const pillars: {
  icon: Icon;
  label: string;
  title: string;
  description: string;
}[] = [
  {
    icon: BookOpen,
    label: "Our Story",
    title: "A hospitality vision.",
    description:
      "Joseph & Co imagines Vine Cottage as a living countryside house — not a hotel, not a party venue.",
  },
  {
    icon: Target,
    label: "Our Mission",
    title: "Celebrate the cottage.",
    description:
      "Protect its Grade II* character while creating exceptional stays guests will remember.",
  },
  {
    icon: Compass,
    label: "Our Vision",
    title: "Quiet luxury, elevated.",
    description:
      "Boutique serviced accommodation where heritage, atmosphere, and care meet in one place.",
  },
  {
    icon: Heart,
    label: "Our Values",
    title: "Respect. Restraint. Warmth.",
    description:
      "Sympathetic styling only — reversible, respectful, and always true to the historic fabric.",
  },
  {
    icon: HouseLine,
    label: "Our Service",
    title: "Hotel-standard care.",
    description:
      "Serviced accommodation with thoughtful preparation, quiet attention, and a home-like welcome.",
  },
  {
    icon: UsersThree,
    label: "Our Guests",
    title: "People who linger.",
    description:
      "Couples, families, friends, creatives, and small business teams seeking calm, not crowds.",
  },
  {
    icon: Handshake,
    label: "Our Commitment",
    title: "Heritage protected.",
    description:
      "Every proposal respects the listed building — comfort rises; the cottage itself remains true.",
  },
  {
    icon: MapPin,
    label: "Why this property",
    title: "Scale, setting, soul.",
    description:
      "Four bedrooms, generous gardens, stone barns, and Queen Camel peace — built for intimate stays.",
  },
];

type Audience = {
  icon: Icon;
  bestFor: string;
  title: string;
  description: string;
};

const audiences: Audience[] = [
  {
    icon: Heart,
    bestFor: "Best for",
    title: "Couples",
    description:
      "Private, unhurried escapes — space to disconnect, cook slowly, and reclaim quiet time together.",
  },
  {
    icon: Baby,
    bestFor: "Best for",
    title: "Families",
    description:
      "Four bedrooms and generous living for multi-generational weekends that feel like home.",
  },
  {
    icon: UsersThree,
    bestFor: "Best for",
    title: "Friends' retreats",
    description:
      "A shared countryside house — kitchen table, garden evenings, and memories made slowly.",
  },
  {
    icon: Briefcase,
    bestFor: "Best for",
    title: "Business & corporate",
    description:
      "Offsite strategy days, leadership away-days, and small team retreats — calm focus without hotel conference rooms.",
  },
  {
    icon: Sparkle,
    bestFor: "Best for",
    title: "Wellness retreats",
    description:
      "Sauna, hot tub, and orchard air for restorative pauses between countryside walks.",
  },
  {
    icon: BookOpen,
    bestFor: "Best for",
    title: "Creatives",
    description:
      "Writers, makers, and thinkers who need room to work — with countryside quiet as the only deadline.",
  },
];

export default function PerfectForSection() {
  return (
    <section id="perfect-for" className={`${styles.sectionMesh} py-20 md:py-28`}>
      <SectionContainer className={styles.sectionInner}>
        <div className="mb-10 max-w-2xl md:mb-14" data-reveal-group>
          <SectionLabel>Perfect For</SectionLabel>
          <SectionHeading>Who will stay at Vine Cottage.</SectionHeading>
          <SectionLead>
            Boutique{" "}
            <strong className={styles.perfectAccent}>serviced accommodation</strong> —
            intimate countryside stays shaped around the people who will truly love this house.
          </SectionLead>
        </div>

        <div className={styles.pillarGrid} data-reveal-group>
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.label}
                className={styles.pillarCard}
                data-reveal-item
                data-hover-card
              >
                <div className={styles.pillarTop}>
                  <span className={styles.pillarIcon} aria-hidden="true">
                    <Icon size={22} weight="light" />
                  </span>
                  <span className={styles.pillarLabel}>{pillar.label}</span>
                </div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.description}</p>
              </article>
            );
          })}
        </div>

        <div className={styles.audienceIntro} data-reveal-group>
          <p className={styles.audienceEyebrow} data-reveal-item>
            Best suited for
          </p>
          <h3 className={styles.audienceHeading} data-reveal-item>
            Guests who seek quiet luxury.
          </h3>
          <p className={styles.audienceLead} data-body-reveal>
            Designed for intimate stays — never for volume, never for spectacle.
          </p>
        </div>

        <div className={styles.audienceGrid} data-reveal-group>
          {audiences.map((item, index) => {
            const Icon = item.icon;
            const number = String(index + 1).padStart(2, "0");

            return (
              <article
                key={item.title}
                className={styles.audienceCard}
                data-reveal-item
                data-hover-card
                style={{ ["--audience-delay" as string]: `${index * 0.2}s` }}
              >
                <div className={styles.audienceCardGlow} aria-hidden="true" />
                <div className={styles.audienceCardTop}>
                  <span className={styles.audienceBestFor}>{item.bestFor}</span>
                  <span className={styles.audienceNumber}>{number}</span>
                </div>
                <div className={styles.audienceIconWrap} aria-hidden="true">
                  <span className={styles.audienceIcon}>
                    <Icon size={26} weight="light" />
                  </span>
                </div>
                <h3 className={styles.audienceTitle}>{item.title}</h3>
                <p className={styles.audienceDesc}>{item.description}</p>
              </article>
            );
          })}
        </div>

        <p className={styles.perfectMore} data-body-reveal>
          <span className={styles.perfectMoreLabel}>And more&hellip;</span>
          Book clubs, quiet birthdays, sabbaticals, and many other intimate stays —
          if it fits the cottage, it belongs here.
        </p>
      </SectionContainer>
    </section>
  );
}
