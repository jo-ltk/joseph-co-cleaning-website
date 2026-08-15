"use client";

import Image from "next/image";
import Link from "next/link";

import { careImages } from "@/lib/care";
import CareReveal from "./CareReveal";

export default function CareRecruitmentCta() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <Image
        src={careImages.recruitment.src}
        alt={careImages.recruitment.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[var(--cc-navy)]/72" />
      <div className="care-wrap relative z-10 max-w-2xl text-white">
        <CareReveal>
          <p className="mb-4 block text-sm font-semibold uppercase tracking-widest text-white/70">Join the team</p>
          <h2 className="text-2xl font-medium leading-[1.1] tracking-tight text-white md:text-4xl">
            Ready for Your Next Opportunity?
          </h2>
          <p className="mt-4 text-lg font-medium leading-relaxed !text-white/75 md:text-xl">
            Join the Care Connect team and become part of a network of skilled healthcare professionals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/care/apply" className="care-btn care-btn-light">
              Join Our Team
            </Link>
            <Link href="/care/apply#cv" className="care-btn care-btn-ghost">
              Upload Your CV
            </Link>
          </div>
        </CareReveal>
      </div>
    </section>
  );
}
