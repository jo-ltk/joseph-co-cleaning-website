"use client";

import Image from "next/image";

import {
  SectionHeading,
  SectionLabel,
  SectionLead,
  styles,
} from "@/components/vine-cottage/PresentationComponents";

const FLOOR_PLAN = "/images/vine-cottage/floor-plan.png";

export default function FloorPlanSection() {
  return (
    <section
      id="floor-plan"
      className={styles.floorPlanFullscreen}
      aria-label="Vine Cottage floor plan"
    >
      <div className={styles.floorPlanIntro}>
        <SectionLabel>Floor Plan</SectionLabel>
        <SectionHeading>Spaces arranged for unhurried living.</SectionHeading>
        <SectionLead>
          First floor, ground floor and barn — approx. 337.7 sqm of Grade II character.
        </SectionLead>
      </div>

      <div className={styles.floorPlanImageStage}>
        <Image
          src={FLOOR_PLAN}
          alt="Vine Cottage floor plans — first floor, ground floor and outbuilding"
          width={2000}
          height={1400}
          priority
          sizes="100vw"
          className={styles.floorPlanFullscreenImage}
        />
      </div>
    </section>
  );
}
