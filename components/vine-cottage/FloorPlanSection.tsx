"use client";

import {
  SectionHeading,
  SectionLabel,
  SectionLead,
  styles,
} from "@/components/vine-cottage/PresentationComponents";
import StickerPeel from "@/components/vine-cottage/StickerPeel";

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
          First floor, ground floor and barn — approx. 337.7 sqm of Grade II
          character.
        </SectionLead>
      </div>

      <div className={styles.floorPlanImageStage}>
        <div className={styles.floorPlanPeelBoard} data-floor-plan>
          <StickerPeel
            imageSrc={FLOOR_PLAN}
            alt="Vine Cottage floor plans — first floor, ground floor and outbuilding"
            rotate={0.8}
            enablePeel={false}
            draggable={false}
            shadowIntensity={0.42}
            lightingIntensity={0.07}
            shadowColor="#112025"
            lightingColor="#f6f6f6"
            className={styles.floorPlanPeel}
          />
        </div>
      </div>
    </section>
  );
}
