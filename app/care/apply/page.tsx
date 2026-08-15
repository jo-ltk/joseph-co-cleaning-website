import type { Metadata } from "next";
import Image from "next/image";

import CareApplyForm from "@/components/care/CareApplyForm";
import { careImages } from "@/lib/care";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Join Care Connect | Healthcare Jobs & Recruitment",
  },
  description:
    "Apply to join Care Connect. We're looking for skilled and compassionate healthcare professionals to join our growing network.",
  alternates: { canonical: `${siteUrl}/care/apply` },
};

export default function CareApplyPage() {
  return (
    <section className="pb-24 pt-10 md:pb-28 md:pt-16">
      <div className="care-wrap grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="care-eyebrow">Join our team</p>
          <h1 className="mt-4 text-4xl md:text-6xl">Build Your Career With Care Connect</h1>
          <p className="mt-5 max-w-md text-lg">
            We&apos;re looking for skilled and compassionate healthcare professionals to join our growing network.
          </p>
          <div className="relative mt-10 hidden min-h-[360px] overflow-hidden lg:block">
            <Image
              src={careImages.apply.src}
              alt={careImages.apply.alt}
              fill
              priority
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </div>
        <CareApplyForm />
      </div>
    </section>
  );
}
