import CareAudiences from "@/components/care/CareAudiences";
import CareCompliance from "@/components/care/CareCompliance";
import CareContact from "@/components/care/CareContact";
import CareFacilityCta from "@/components/care/CareFacilityCta";
import CareHero from "@/components/care/CareHero";
import CareHowItWorks from "@/components/care/CareHowItWorks";
import CareRecruitmentCta from "@/components/care/CareRecruitmentCta";
import CareServices from "@/components/care/CareServices";
import CareSocialProof from "@/components/care/CareSocialProof";
import CareStats from "@/components/care/CareStats";
import CareVideo from "@/components/care/CareVideo";
import CareWhy from "@/components/care/CareWhy";

export default function CarePage() {
  return (
    <>
      <CareHero />
      <CareStats />
      <CareAudiences />
      <CareServices />
      <CareWhy />
      <CareCompliance />
      <CareVideo />
      <CareHowItWorks />
      <CareSocialProof />
      <CareRecruitmentCta />
      <CareFacilityCta />
      <CareContact />
    </>
  );
}
