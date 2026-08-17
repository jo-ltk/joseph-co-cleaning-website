import type { Metadata } from "next";

import CareApplyForm from "@/components/care/CareApplyForm";
import CareApplyIntro from "@/components/care/CareApplyIntro";
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
    <section className="care-apply">
      <div className="care-apply-board">
        <CareApplyIntro />
        <div className="care-apply-form-col">
          <CareApplyForm />
        </div>
      </div>
    </section>
  );
}
