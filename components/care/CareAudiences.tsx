"use client";

import Image from "next/image";
import Link from "next/link";

import { careImages } from "@/lib/care";
import CareReveal, { CareStagger } from "./CareReveal";
import { useCareUi } from "./CareUi";

const audiences = [
  {
    id: "homes",
    title: "Reliable staff, when you need them.",
    copy: "Qualified healthcare professionals for planned rotas, urgent cover and ongoing care.",
    image: careImages.facility,
    cta: "Find Staff",
    href: null,
  },
  {
    id: "professionals",
    title: "Your skills, the right opportunity.",
    copy: "Join our network of healthcare professionals and work with trusted providers.",
    image: careImages.nurse,
    cta: "Join Our Team",
    href: "/care/apply",
  },
] as const;

function AudienceMark() {
  return (
    <span className="care-audience-mark" aria-hidden>
      <span className="care-audience-mark-circle" />
      <span className="care-audience-mark-square" />
    </span>
  );
}

export default function CareAudiences() {
  const { openRequest } = useCareUi();

  return (
    <section id="facilities" className="care-audiences scroll-mt-24">
      <div className="care-wrap">
        <CareReveal className="care-audiences-intro">
          <p className="care-eyebrow">Two audiences. One standard.</p>
          <h2>Staffing that serves both sides of care.</h2>
        </CareReveal>

        <CareStagger className="care-audiences-split">
          {audiences.map((audience, index) => {
            const cta =
              audience.href ? (
                <Link href={audience.href} className="care-audience-foot">
                  {audience.cta}
                </Link>
              ) : (
                <button type="button" onClick={openRequest} className="care-audience-foot">
                  {audience.cta}
                </button>
              );

            return (
              <article
                key={audience.id}
                className={`care-audience-frame${index === 1 ? " care-audience-frame--flip" : ""}`}
                data-care-item
              >
                <div className="care-audience-photo">
                  <Image
                    src={audience.image.src}
                    alt={audience.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="care-audience-copycard">
                  <AudienceMark />
                  <div className="care-audience-copycard-main">
                    <h3>{audience.title}</h3>
                    <p>{audience.copy}</p>
                  </div>
                  {cta}
                </div>
              </article>
            );
          })}
        </CareStagger>
      </div>
    </section>
  );
}
