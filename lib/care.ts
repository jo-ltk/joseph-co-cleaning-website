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

export const careServices = [
  {
    title: "Registered Nurses",
    text: "Qualified nursing professionals supporting high standards of patient care.",
  },
  {
    title: "Healthcare Assistants",
    text: "Supporting patients with daily care while maintaining compassion, professionalism and respect.",
  },
  {
    title: "Support Workers",
    text: "Providing practical and emotional support to individuals who need assistance.",
  },
  {
    title: "Domestic Assistants",
    text: "Reliable support for care environments.",
  },
  {
    title: "Kitchen Assistants",
    text: "Reliable kitchen and catering support for healthcare environments.",
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
    image: {
      src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
      alt: "Official documents being reviewed on a desk",
    },
  },
  {
    title: "NMC registration verification where applicable",
    category: "Screening",
    overview:
      "Where applicable, we verify live NMC registration so registered nurses are current, pin-checked and eligible to practise.",
    image: {
      src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
      alt: "Registered nurse in professional uniform",
    },
  },
  {
    title: "Reference checks",
    category: "Screening",
    overview:
      "Professional references are taken and reviewed so recent performance, reliability and conduct are confirmed before we send staff.",
    image: {
      src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
      alt: "Two professionals in a reference discussion",
    },
  },
  {
    title: "Employment history checks",
    category: "Screening",
    overview:
      "We review employment history and close gaps so facilities receive a clear, consistent picture of a candidate’s working record.",
    image: {
      src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
      alt: "Employment paperwork and a laptop on a desk",
    },
  },
  {
    title: "Mandatory training",
    category: "Training",
    overview:
      "Core mandatory training is confirmed before deployment, so staff arrive ready for the expectations of a regulated care setting.",
    image: {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
      alt: "Healthcare professionals in a training session",
    },
  },
  {
    title: "Safeguarding training",
    category: "Training",
    overview:
      "Safeguarding training is required so staff understand how to recognise, report and respond to risk around vulnerable people.",
    image: {
      src: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
      alt: "Carer supporting an older person in a calm setting",
    },
  },
  {
    title: "Infection control training",
    category: "Training",
    overview:
      "Infection prevention training is checked so hygiene practice, PPE use and outbreak-ready habits are in place from day one.",
    image: {
      src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
      alt: "Clinical hygiene supplies used in infection control",
    },
  },
  {
    title: "Competency assessments",
    category: "Quality",
    overview:
      "Role-appropriate competency is assessed so the person we send can work safely within the duties of the placement.",
    image: {
      src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e975?auto=format&fit=crop&w=1200&q=80",
      alt: "Clinician reviewing notes during an assessment",
    },
  },
  {
    title: "CPD monitoring",
    category: "Quality",
    overview:
      "Continuing professional development is monitored so skills stay current and staff keep building on their practice.",
    image: {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      alt: "Clinician reviewing professional development notes",
    },
  },
  {
    title: "Appropriate insurance coverage",
    category: "Cover",
    overview:
      "Appropriate insurance is in place around placements, giving facilities an extra layer of confidence in every booking.",
    image: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      alt: "Professional reviewing coverage documents",
    },
  },
] as const;

export const careImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1800&q=80",
    alt: "Healthcare professional supporting an elderly patient in a calm care setting",
  },
  facility: {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
    alt: "Modern healthcare facility corridor with natural light",
  },
  nurse: {
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=80",
    alt: "Registered nurse in professional uniform",
  },
  why: {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    alt: "Clinician reviewing patient notes with a colleague",
  },
  videoPoster: {
    src: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1800&q=80",
    alt: "Care worker walking with an elderly resident",
  },
  recruitment: {
    src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80",
    alt: "Healthcare professionals collaborating in a care environment",
  },
  apply: {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    alt: "Nurse providing attentive care in a residential setting",
  },
} as const;

export const careVideo = {
  src: "https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_25fps.mp4",
  poster: careImages.videoPoster.src,
};

export const whatsappUrl = (message: string) =>
  `https://wa.me/${careBrand.whatsapp}?text=${encodeURIComponent(message)}`;

export const mapsEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(careBrand.mapQuery)}&z=16&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(careBrand.mapQuery)}`;
