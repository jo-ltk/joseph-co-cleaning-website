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
  "Enhanced DBS checks",
  "NMC registration verification where applicable",
  "Reference checks",
  "Employment history checks",
  "Mandatory training",
  "Safeguarding training",
  "Infection control training",
  "Competency assessments",
  "CPD monitoring",
  "Appropriate insurance coverage",
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
