export const careBrand = {
  name: "Care Connect",
  tagline: "Trusted Healthcare Staffing Solutions",
  description:
    "Trusted healthcare staffing solutions connecting skilled professionals with healthcare facilities across the UK.",
  phoneDisplay: "0333 358 4646",
  phoneTel: "+443333584646",
  email: "admin@ccltds.co.uk",
  address: "1 Malin Hill, Nottingham, NG1 1JQ, United Kingdom",
  whatsapp: "443333584646",
  mapQuery: "1 Malin Hill, Nottingham, NG1 1JQ, United Kingdom",
} as const;

export const careStats = [
  { value: 5000, suffix: "+", label: "Qualified Nurses" },
  { value: 500, suffix: "+", label: "Partner Facilities" },
  { value: 24, suffix: "/7", label: "Support Available" },
  { value: 15, suffix: "+", label: "Years Experience" },
] as const;

export const carePhotos = {
  companionship: {
    src: "/care/photos/companionship.jpg",
    alt: "Carer and resident sharing a joyful moment together",
  },
  nurseResident: {
    src: "/care/photos/nurse-resident.jpg",
    alt: "Nurse supporting an elderly resident in a wheelchair",
  },
  nurseBriefing: {
    src: "/care/photos/nurse-briefing.jpg",
    alt: "Healthcare professional briefing residents with a tablet",
  },
  kitchen: {
    src: "/care/photos/kitchen-community.jpg",
    alt: "Residents preparing food together in a community kitchen",
  },
  lounge: {
    src: "/care/photos/residents-lounge.jpg",
    alt: "Residents laughing together in a sunlit lounge",
  },
  together: {
    src: "/care/photos/residents-together.jpg",
    alt: "Residents socialising in a care home living room",
  },
} as const;

export const careServices = [
  {
    title: "Registered Nurses",
    text: "Qualified nursing professionals supporting high standards of patient care.",
    applyHref: "/care/apply",
    applyLabel: "Apply as a Registered Nurse",
  },
  {
    title: "Healthcare Assistants",
    text: "Supporting patients with daily care while maintaining compassion, professionalism and respect.",
    applyHref: "/care/apply",
    applyLabel: "Apply as a Healthcare Assistant",
  },
  {
    title: "Support Workers",
    text: "Providing practical and emotional support to individuals who need assistance.",
    applyHref: "/care/apply",
    applyLabel: "Apply as a Support Worker",
  },
  {
    title: "Domestic Assistants",
    text: "Reliable support for care environments.",
    applyHref: "/care/apply",
    applyLabel: "Apply as a Domestic Assistant",
  },
  {
    title: "Kitchen Assistants",
    text: "Reliable kitchen and catering support for healthcare environments.",
    applyHref: "/care/apply",
    applyLabel: "Apply as a Kitchen Assistant",
  },
] as const;

export const carePositions = [
  "Registered Nurse",
  "Healthcare Assistant",
  "Support Worker",
  "Domestic Assistant",
  "Kitchen Assistant",
  "Other",
] as const;

export const facilityTypes = [
  "Care Home",
  "Nursing Home",
  "Hospital",
  "Supported Living",
  "Domiciliary Care",
  "Other Healthcare Provider",
] as const;

export const staffingNeeds = [
  "Planned staffing",
  "Urgent cover",
  "Ongoing care needs",
  "Mixed / not sure",
] as const;

export const complianceItems = [
  {
    title: "Enhanced DBS checks",
    category: "Screening",
    overview:
      "Every candidate completes an Enhanced DBS check before placement, so facilities can be confident in who is arriving on shift.",
    href: "https://www.gov.uk/government/organisations/disclosure-and-barring-service",
    linkLabel: "GOV.UK · Disclosure and Barring Service",
  },
  {
    title: "NMC registration verification where applicable",
    category: "Screening",
    overview:
      "Where applicable, we verify live NMC registration so registered nurses are current, pin-checked and eligible to practise.",
    href: "https://www.nmc.org.uk/registration/search-the-register/",
    linkLabel: "NMC · Search the register",
  },
  {
    title: "Reference checks",
    category: "Screening",
    overview:
      "Professional references are taken and reviewed so recent performance, reliability and conduct are confirmed before we send staff.",
    href: "https://www.cqc.org.uk/guidance-regulation/providers/regulations-service-providers-and-managers/health-and-social-care-act-2008-regulated-activities-regulations-2014/regulation-19",
    linkLabel: "CQC · Fit and proper persons",
  },
  {
    title: "Employment history checks",
    category: "Screening",
    overview:
      "We review employment history and close gaps so facilities receive a clear, consistent picture of a candidate’s working record.",
    href: "https://www.cqc.org.uk/guidance-providers/regulations-enforcement/regulation-19-fit-proper-persons-employed",
    linkLabel: "CQC · Regulation 19",
  },
  {
    title: "Mandatory training",
    category: "Training",
    overview:
      "Core mandatory training is confirmed before deployment, so staff arrive ready for the expectations of a regulated care setting.",
    href: "https://www.skillsforcare.org.uk/Developing-your-workforce/Care-Certificate/Care-Certificate.aspx",
    linkLabel: "Skills for Care · Care Certificate",
  },
  {
    title: "Safeguarding training",
    category: "Training",
    overview:
      "Safeguarding training is required so staff understand how to recognise, report and respond to risk around vulnerable people.",
    href: "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance",
    linkLabel: "GOV.UK · Care Act safeguarding",
  },
  {
    title: "Infection control training",
    category: "Training",
    overview:
      "Infection prevention training is checked so hygiene practice, PPE use and outbreak-ready habits are in place from day one.",
    href: "https://www.gov.uk/government/publications/infection-prevention-and-control-in-adult-social-care-settings",
    linkLabel: "GOV.UK · Infection prevention",
  },
  {
    title: "Competency assessments",
    category: "Quality",
    overview:
      "Role-appropriate competency is assessed so the person we send can work safely within the duties of the placement.",
    href: "https://www.skillsforcare.org.uk/",
    linkLabel: "Skills for Care",
  },
  {
    title: "CPD monitoring",
    category: "Quality",
    overview:
      "Continuing professional development is monitored so skills stay current and staff keep building on their practice.",
    href: "https://www.nmc.org.uk/revalidation/",
    linkLabel: "NMC · Revalidation",
  },
  {
    title: "Appropriate insurance coverage",
    category: "Cover",
    overview:
      "Appropriate insurance is in place around placements, giving facilities an extra layer of confidence in every booking.",
    href: "https://www.gov.uk/employers-liability-insurance",
    linkLabel: "GOV.UK · Employers’ liability",
  },
] as const;

export const careImages = {
  hero: carePhotos.nurseResident,
  facility: {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
    alt: "Modern healthcare facility corridor with natural light",
  },
  nurse: {
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=80",
    alt: "Registered nurse in professional uniform",
  },
  why: carePhotos.companionship,
  videoPoster: carePhotos.nurseResident,
  recruitment: carePhotos.lounge,
  apply: carePhotos.companionship,
} as const;

export const careVideo = {
  src: "https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_25fps.mp4",
  poster: careImages.videoPoster.src,
};

export const whatsappUrl = (message: string) =>
  `https://wa.me/${careBrand.whatsapp}?text=${encodeURIComponent(message)}`;

export const mapsEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(careBrand.mapQuery)}&z=16&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(careBrand.mapQuery)}`;
