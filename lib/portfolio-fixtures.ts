import type { PortfolioRecord, ReviewRecord } from "@/types/portfolio";

const now = "2026-04-28T00:00:00.000Z";

export const samplePortfolios: PortfolioRecord[] = [
  {
    id: "sample-clarendon-house",
    title: "Clarendon House Turnaround",
    slug: "clarendon-house-turnaround",
    description:
      "A furnished landlord handover that needed dust extraction, stain treatment, appliance detailing, and a premium reset before new tenants arrived. Joseph & Co rebuilt the presentation room by room, focusing on reflective surfaces, bathroom polish, and a calmer first impression from the moment the door opened.",
    coverImage: {
      url: "/clean-space-living-room.jpg",
      alt: "Clarendon House living room reset",
      kind: "cover",
    },
    galleryImages: [
      {
        url: "/images/before.png",
        alt: "Clarendon House living room before the reset",
        kind: "before",
      },
      {
        url: "/images/after.png",
        alt: "Clarendon House living room after the reset",
        kind: "after",
      },
      {
        url: "/images/story-transformation.png",
        alt: "Clarendon House bedroom finishing detail",
        kind: "detail",
      },
      {
        url: "/images/trust-finish.png",
        alt: "Clarendon House quality assurance finish",
        kind: "detail",
      },
    ],
    serviceType: "End Of Tenancy Cleaning",
    location: "Taunton, Somerset",
    completionDate: "2026-03-18T00:00:00.000Z",
    turnaroundTime: "19 hours from key release to final sign-off",
    resultSummary:
      "Ready for landlord photography, inventory sign-off, and a same-week tenant handover without remedial cleaning.",
    metrics: [
      { label: "Rooms reset", value: "8 spaces" },
      { label: "Inventory issues cleared", value: "14 notes resolved" },
      { label: "Handover window", value: "Next-day ready" },
    ],
    featured: true,
    createdAt: now,
  },
  {
    id: "sample-merchant-yard",
    title: "Merchant Yard Communal Recovery",
    slug: "merchant-yard-communal-recovery",
    description:
      "A communal stairwell and shared reception area had fallen below presentation standard after contractor traffic and weathered footfall. The team restored entrance glass, stair nosings, skirting detail, and bin-store hygiene so residents and visiting landlords returned to a better-managed arrival experience.",
    coverImage: {
      url: "/images/gallery-hero.png",
      alt: "Merchant Yard communal entry detail",
      kind: "cover",
    },
    galleryImages: [
      {
        url: "/images/before2.png",
        alt: "Merchant Yard reception before restorative cleaning",
        kind: "before",
      },
      {
        url: "/images/after2.png",
        alt: "Merchant Yard reception after restorative cleaning",
        kind: "after",
      },
      {
        url: "/equipment-vacuum-cleaning.jpg",
        alt: "Merchant Yard machine detailing in progress",
        kind: "detail",
      },
      {
        url: "/images/about-story.png",
        alt: "Merchant Yard staircase finish after recovery clean",
        kind: "detail",
      },
    ],
    serviceType: "Commercial Cleaning",
    location: "Bristol",
    completionDate: "2026-02-11T00:00:00.000Z",
    turnaroundTime: "2 evening visits across one tenancy gap",
    resultSummary:
      "Shared areas restored to a brighter, better-managed standard with fewer follow-up maintenance complaints.",
    metrics: [
      { label: "Blocks covered", value: "3 entrances" },
      { label: "Repeat complaints", value: "-72%" },
      { label: "Evening access", value: "Out-of-hours delivered" },
    ],
    featured: false,
    createdAt: now,
  },
  {
    id: "sample-riverside-mews",
    title: "Riverside Mews Builder Dust Reset",
    slug: "riverside-mews-builder-dust-reset",
    description:
      "After finishing trades left fine construction dust across wardrobes, glazed doors, fittings, and hard floors, Joseph & Co carried out a builders clean designed for handover photography and owner inspection. The sequence prioritised high-level dusting, washdown passes, and a precise final polish on touchpoints.",
    coverImage: {
      url: "/images/hero-bg-new.png",
      alt: "Riverside Mews builder clean reveal",
      kind: "cover",
    },
    galleryImages: [
      {
        url: "/images/before.png",
        alt: "Riverside Mews dust build-up before final clean",
        kind: "before",
      },
      {
        url: "/images/after2.png",
        alt: "Riverside Mews polished reveal after final clean",
        kind: "after",
      },
      {
        url: "/images/about-hero.png",
        alt: "Riverside Mews glazing and finish inspection",
        kind: "detail",
      },
      {
        url: "/images/team-stats.png",
        alt: "Riverside Mews finishing team on inspection",
        kind: "detail",
      },
    ],
    serviceType: "After Builders Cleaning",
    location: "Exeter, Devon",
    completionDate: "2026-01-24T00:00:00.000Z",
    turnaroundTime: "Single-day site handover clean",
    resultSummary:
      "Construction residue removed, visual finish elevated, and the property handed back ready for photographs and snag-free walkthroughs.",
    metrics: [
      { label: "Dust extraction passes", value: "4-stage process" },
      { label: "Snag-ready finish", value: "100% walkthrough ready" },
      { label: "Team size", value: "5 specialists" },
    ],
    featured: true,
    createdAt: now,
  },
];

export const sampleReviews: ReviewRecord[] = [
  {
    id: "sample-review-1",
    portfolioId: "sample-clarendon-house",
    landlordName: "Harriet Cole",
    company: "Cole Residential Lettings",
    rating: 5,
    comment:
      "Joseph & Co turned the property around in less than a day and saved us a return visit from the inventory clerk. The finish looked premium, not rushed.",
    approved: true,
    createdAt: now,
    portfolioTitle: "Clarendon House Turnaround",
    portfolioSlug: "clarendon-house-turnaround",
  },
  {
    id: "sample-review-2",
    portfolioId: "sample-merchant-yard",
    landlordName: "James Halden",
    company: "Merchant Yard Management",
    rating: 5,
    comment:
      "The communal areas felt neglected before the visit. Afterwards they looked managed again, and resident feedback changed almost immediately.",
    approved: true,
    createdAt: now,
    portfolioTitle: "Merchant Yard Communal Recovery",
    portfolioSlug: "merchant-yard-communal-recovery",
  },
  {
    id: "sample-review-3",
    portfolioId: "sample-riverside-mews",
    landlordName: "Olivia Byrne",
    company: "Byrne Property Group",
    rating: 5,
    comment:
      "We needed a builders clean that would stand up to close inspection. Joseph & Co delivered a crisp, polished handover with no chasing afterwards.",
    approved: true,
    createdAt: now,
    portfolioTitle: "Riverside Mews Builder Dust Reset",
    portfolioSlug: "riverside-mews-builder-dust-reset",
  },
];
