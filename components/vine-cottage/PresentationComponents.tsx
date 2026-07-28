"use client";

import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

import ScrollReveal from "@/components/ScrollReveal";

import styles from "./vine-cottage.module.css";

const containerClass = "mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20";

export function SectionContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${containerClass} ${className}`}>{children}</div>;
}

export function SectionLabel({
  children,
  variant = "light",
}: {
  children: ReactNode;
  variant?: "light" | "dark";
}) {
  const variantClass = variant === "dark" ? styles.sectionLabelDark : styles.sectionLabel;

  return (
    <span className={styles.sectionLabelShell}>
      <span className={variantClass} data-section-label>
        <span className={styles.sectionLabelDot} aria-hidden="true" />
        {children}
      </span>
    </span>
  );
}

export function SectionHeading({
  children,
  className = "text-4xl leading-[1.08] font-medium tracking-tight md:text-6xl lg:text-[4.25rem]",
}: {
  children: string;
  className?: string;
}) {
  return (
    <ScrollReveal as="h2" containerClassName={className}>
      {children}
    </ScrollReveal>
  );
}

export function SectionLead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`${styles.sectionLead} ${className}`} data-body-reveal>
      {children}
    </p>
  );
}

export function LightFeatureCard({
  icon: IconComponent,
  title,
  description,
}: {
  icon: Icon;
  title: string;
  description: string;
}) {
  return (
    <article className={styles.lightCard} data-hover-card data-reveal-item>
      <div className={styles.lightCardIcon}>
        <IconComponent size={26} weight="light" aria-hidden="true" />
      </div>
      <h3 className={styles.lightCardTitle}>{title}</h3>
      <p className={styles.lightCardDesc}>{description}</p>
    </article>
  );
}

export function DarkFeatureCard({
  icon: IconComponent,
  title,
  description,
}: {
  icon: Icon;
  title: string;
  description: string;
}) {
  return (
    <article className={styles.darkCard} data-reveal-item>
      <div className={styles.darkCardGlow} aria-hidden="true" />
      <IconComponent
        size={34}
        weight="light"
        className={styles.darkCardIcon}
        aria-hidden="true"
      />
      <h3 className={styles.darkCardTitle}>{title}</h3>
      <p className={styles.darkCardDesc}>{description}</p>
    </article>
  );
}

export function MissionCard({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <article className={styles.darkCard} data-reveal-item>
      <div className={styles.darkCardGlow} aria-hidden="true" />
      <p className={styles.missionLabel}>{label}</p>
      <h3 className={styles.missionTitle}>{title}</h3>
      <p className={styles.missionDesc}>{description}</p>
    </article>
  );
}

export function MilestoneRow({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className={styles.milestoneRow} data-milestone data-hover-card>
      <p className={styles.milestoneNumber}>{number}</p>
      <h3 className={styles.milestoneTitle}>{title}</h3>
      <p className={styles.milestoneDesc}>{description}</p>
    </article>
  );
}

export function CommitmentItem({ children }: { children: string }) {
  return (
    <div className={styles.commitmentItem} data-reveal-item data-hover-card>
      <span className={styles.commitmentCheck} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor">
          <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      </span>
      <span className={styles.commitmentText}>{children}</span>
    </div>
  );
}

export function SplitImageSection({
  image,
  alt,
  children,
  imagePosition = "left",
  contentClassName = "",
}: {
  image: string;
  alt: string;
  children: ReactNode;
  imagePosition?: "left" | "right";
  contentClassName?: string;
}) {
  const imageBlock = (
    <div className={styles.splitImageWrap}>
      <img
        src={image}
        alt={alt}
        className={styles.splitImage}
        data-parallax="0.12"
      />
      <div className={styles.splitImageOverlay} aria-hidden="true" />
    </div>
  );

  const contentBlock = (
    <div className={`${styles.splitContent} ${contentClassName}`}>{children}</div>
  );

  return (
    <div className={styles.splitSection}>
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {contentBlock}
        </>
      ) : (
        <>
          {contentBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className={styles.pullQuote} data-body-reveal>
      <span className={styles.pullQuoteMark} aria-hidden="true">
        &ldquo;
      </span>
      <p className={styles.pullQuoteText}>{children}</p>
    </blockquote>
  );
}

export function StatsStrip({
  stats,
}: {
  stats: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <div className={styles.statsStrip}>
      {stats.map(([value, label]) => (
        <div key={label} className={styles.statItem} data-stat>
          <p className={styles.statValue}>{value}</p>
          <p className={styles.statLabel}>{label}</p>
        </div>
      ))}
    </div>
  );
}

export { styles };
