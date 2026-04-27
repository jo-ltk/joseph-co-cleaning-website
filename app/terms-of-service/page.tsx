"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Quotes, 
  CalendarCheck, 
  CreditCard, 
  Clock, 
  WarningCircle, 
  HouseLine, 
  ThumbsUp, 
  ShieldCheck, 
  Key, 
  PawPrint, 
  HardHat, 
  Lightning, 
  UsersThree, 
  PencilLine,
  PhoneCall
} from "@phosphor-icons/react/dist/ssr";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import { ButtonLink } from "../../components/ui/Button";

const tosSections = [
  {
    id: "agreement",
    title: "Agreement to Terms",
    icon: FileText,
    content: (
      <>
        <p>
          These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("customer", "you") and Joseph & Co Cleaning Services Ltd ("company", "we", "us", "our"), concerning your access to and use of our cleaning services.
        </p>
        <p className="mt-4">
          By booking a service with Joseph & Co, you acknowledge that you have read, understood, and agree to be bound by these terms in their entirety.
        </p>
      </>
    )
  },
  {
    id: "quotations",
    title: "Quotations and Scope of Work",
    icon: Quotes,
    content: (
      <>
        <p>All quotations are provided based on the information supplied by the customer. We reserve the right to amend the quotation if the actual condition of the property differs significantly from the description provided.</p>
        <ul className="mt-6 space-y-3 text-sm text-xanadu">
          <li className="flex items-start gap-3">
            <CheckBullet />
            <span>Quotations are valid for 30 days from the date of issue.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckBullet />
            <span>We reserve the right to conduct a site survey before finalising a quote for complex or large-scale projects.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckBullet />
            <span>The scope of work is strictly limited to the tasks specified in the booking confirmation. Any additional tasks requested on the day may incur extra charges.</span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "booking",
    title: "Booking Confirmation",
    icon: CalendarCheck,
    content: (
      <p>
        A booking is considered confirmed only once you receive a written confirmation email from Joseph & Co. For certain services, a non-refundable deposit may be required to secure your appointment.
      </p>
    )
  },
  {
    id: "payment",
    title: "Payment Terms",
    icon: CreditCard,
    content: (
      <>
        <p>We take pride in our transparent and efficient billing process.</p>
        <ul className="mt-6 space-y-4">
          <li className="rounded-xl bg-white/50 p-5 border border-pine-green/5">
            <strong className="text-aztec block mb-1">Due Date</strong>
            <p className="text-sm text-xanadu">Invoices are issued upon completion of the service and are due on receipt. All payments must be settled within 24 hours of the clean unless otherwise agreed in writing.</p>
          </li>
          <li className="rounded-xl bg-white/50 p-5 border border-pine-green/5">
            <strong className="text-aztec block mb-1">Methods</strong>
            <p className="text-sm text-xanadu">We accept payments via Bank Transfer (BACS) or secure online payment links. We do not accept cash payments for security reasons.</p>
          </li>
          <li className="rounded-xl bg-white/50 p-5 border border-pine-green/5">
            <strong className="text-aztec block mb-1">Late Payments</strong>
            <p className="text-sm text-xanadu">Late payments may incur a fixed administration fee of £25 plus statutory interest at 8% above the Bank of England base rate.</p>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "cancellation",
    title: "Cancellation & Rescheduling",
    icon: Clock,
    content: (
      <div className="space-y-4">
        <p>We understand that plans change. To manage our schedules fairly, we apply the following policy:</p>
        <div className="grid gap-4 md:grid-cols-3 mt-4">
          <div className="rounded-xl border border-aztec/5 bg-white p-5 text-center">
            <p className="font-bold text-pine-green text-xl mb-1">48h+</p>
            <p className="text-xs uppercase tracking-widest text-xanadu font-semibold mb-3">Notice</p>
            <p className="text-sm text-aztec font-medium">No Charge</p>
          </div>
          <div className="rounded-xl border border-aztec/5 bg-white p-5 text-center">
            <p className="font-bold text-yellow-green text-xl mb-1">24h - 48h</p>
            <p className="text-xs uppercase tracking-widest text-xanadu font-semibold mb-3">Notice</p>
            <p className="text-sm text-aztec font-medium">50% Fee</p>
          </div>
          <div className="rounded-xl border border-aztec/5 bg-white p-5 text-center">
            <p className="font-bold text-red-800 text-xl mb-1">&lt; 24h</p>
            <p className="text-xs uppercase tracking-widest text-xanadu font-semibold mb-3">Notice</p>
            <p className="text-sm text-aztec font-medium">100% Fee</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "wasted-journey",
    title: "Access Failure / Wasted Journey",
    icon: WarningCircle,
    content: (
      <p>
        If our team arrives at the property and is unable to gain access (e.g., keys do not work, alarm codes incorrect, or nobody is present to let them in), a <strong>100% Wasted Journey Fee</strong> will be charged. Our teams operate on strict schedules, and an access failure prevents us from serving other clients.
      </p>
    )
  },
  {
    id: "responsibilities",
    title: "Customer Responsibilities",
    icon: HouseLine,
    content: (
      <>
        <p>To ensure the best possible results, the customer is responsible for:</p>
        <ul className="mt-6 space-y-3 text-sm text-xanadu">
          <li className="flex items-start gap-3">
            <CheckBullet />
            <span>Providing uninterrupted access to the property at the scheduled time.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckBullet />
            <span>Ensuring a supply of running water and electricity.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckBullet />
            <span>Removing significant clutter from surfaces to allow for effective cleaning.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckBullet />
            <span>Securing any fragile, valuable, or sentimental items.</span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "satisfaction",
    title: "Satisfaction & Re-clean Policy",
    icon: ThumbsUp,
    content: (
      <p>
        If you are not 100% satisfied with any aspect of our service, you must notify us within <strong>24 hours</strong> of the clean. We will investigate your claim and, if justified, we will return to rectify the specific issues within <strong>48 hours</strong> at no additional cost. We do not offer refunds; our policy is to rectify and ensure excellence.
      </p>
    )
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: ShieldCheck,
    content: (
      <>
        <p>While we handle your property with the utmost care, our liability is limited as follows:</p>
        <ul className="mt-6 space-y-4 text-sm text-xanadu">
          <li>• Our total liability for any single incident is capped at the price paid for that specific service visit.</li>
          <li>• We carry Public Liability Insurance up to £1,000,000.</li>
          <li>• We are not liable for pre-existing damage, wear and tear, or damage caused by faulty fixtures and fittings.</li>
          <li>• We are not liable for indirect or consequential loss.</li>
        </ul>
      </>
    )
  },
  {
    id: "damages",
    title: "Damages and Claims Procedure",
    icon: WarningCircle,
    content: (
      <p>
        Any damage must be reported to Joseph & Co within <strong>24 hours</strong> of completion of the service. We reserve the right to inspect the damage before any claim is processed. We will, at our discretion, repair or replace the item with one of similar age and condition.
      </p>
    )
  },
  {
    id: "key-holding",
    title: "Key Holding Limitation",
    icon: Key,
    content: (
      <p>
        Joseph & Co takes key security seriously. Keys are stored in a secure location and are never tagged with your property address. In the event of a lost key, our liability is limited strictly to the cost of cutting a replacement key or, where necessary, replacing the specific lock barrel. We are not liable for full house re-keying.
      </p>
    )
  },
  {
    id: "biohazard",
    title: "Pet and Biohazard Refusal",
    icon: PawPrint,
    content: (
      <p>
        For the safety of our staff, we reserve the right to refuse service or leave the property immediately if we encounter aggressive pets, excessive animal waste, or biohazardous materials (including bodily fluids, needles, or mould) that were not disclosed at the time of booking. Full service fees will still apply in these instances.
      </p>
    )
  },
  {
    id: "safety",
    title: "Site Safety (Commercial/Industrial)",
    icon: HardHat,
    content: (
      <p>
        For commercial and industrial sites, the customer must ensure that the site is safe for our teams to work. This includes providing any site-specific PPE requirements, induction training, and ensuring compliance with relevant Health & Safety regulations. We reserve the right to pause work if we deem the environment unsafe.
      </p>
    )
  },
  {
    id: "force-majeure",
    title: "Force Majeure",
    icon: Lightning,
    content: (
      <p>
        Joseph & Co shall not be liable for any failure or delay in performing its obligations under this agreement where such failure or delay results from any cause that is beyond our reasonable control, including but not limited to: power failure, internet service provider failure, industrial action, civil unrest, fire, flood, storms, earthquakes, acts of terrorism, acts of war, governmental action or any other event that is beyond the control of the party in question.
      </p>
    )
  },
  {
    id: "non-solicitation",
    title: "Non-Solicitation",
    icon: UsersThree,
    content: (
      <p>
        The customer agrees not to directly or indirectly engage, employ, or contract with any Joseph & Co personnel (cleaners or staff) for a period of <strong>24 months</strong> following the termination of this agreement. Should the customer breach this clause, a referral fee of £2,000 per person will be payable immediately to Joseph & Co.
      </p>
    )
  },
  {
    id: "amendments",
    title: "Amendments to Terms",
    icon: PencilLine,
    content: (
      <p>
        We reserve the right to update or modify these Terms of Service at any time without prior notice. The version of the terms in force at the time of your booking will apply to that specific service.
      </p>
    )
  }
];

function CheckBullet() {
  return (
    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-green" />
  );
}

export default function TermsOfServicePage() {
  return (
    <main className="bg-[#f5f5f3]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-aztec pt-32 pb-20 text-white md:pt-48 md:pb-32">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-yellow-green/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-pine-green/10 blur-[120px]" />
        
        <div className="container mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-yellow-green">
              Operational Standards
            </span>
            <ScrollReveal
              as="h1"
              enableBlur={true}
              blurStrength={10}
              containerClassName="text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
            >
              Terms of Service
            </ScrollReveal>
            <p className="mt-8 text-lg text-white/60 md:text-xl">
              Professional clarity and protection for Joseph & Co and our valued clients. Last updated: April 27, 2026.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-32">
        <div className="container mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20">
          
          {/* Mobile Quick Navigation */}
          <div className="mb-12 lg:hidden">
            <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-widest text-xanadu/60">
              Jump to section
            </p>
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5">
              {tosSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="whitespace-nowrap rounded-full border border-aztec/10 bg-white px-5 py-2.5 text-xs font-semibold text-aztec transition-colors active:bg-pine-green active:text-white"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
            
            {/* Sticky Sidebar Navigation (Desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 max-h-[70vh] overflow-y-auto pr-4 scrollbar-hide">
                <p className="mb-6 text-xs font-bold uppercase tracking-widest text-xanadu/60 px-4">
                  Framework
                </p>
                <div className="space-y-1">
                  {tosSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-xanadu transition-all hover:bg-white hover:text-aztec hover:shadow-sm"
                    >
                      <section.icon size={18} className="transition-colors group-hover:text-pine-green" />
                      <span className="truncate">{section.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Terms Content */}
            <div className="space-y-16 md:space-y-24">
              {tosSections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.05 }}
                  className="relative scroll-mt-24"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-white shadow-sm border border-aztec/5">
                      <section.icon size={20} className="text-pine-green md:hidden" />
                      <section.icon size={24} className="text-pine-green hidden md:block" />
                    </div>
                    <h2 className="text-xl font-medium tracking-tight text-aztec md:text-3xl">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-base leading-relaxed text-xanadu md:text-lg max-w-3xl lg:pl-16">
                    {section.content}
                  </div>
                </motion.section>
              ))}

              {/* Final Contact Section */}
              <motion.section
                id="contact"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[32px] bg-white p-6 md:p-12 shadow-[0_30px_80px_rgba(17,32,37,0.08)] border border-aztec/5 relative overflow-hidden scroll-mt-24"
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="max-w-xl">
                    <h2 className="text-2xl font-medium md:text-3xl text-aztec mb-4">Questions about our terms?</h2>
                    <p className="text-xanadu text-base md:text-lg">
                      We believe in clear communication. If any clause requires further clarification, our team is happy to discuss it before your booking.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <ButtonLink href="/contact" variant="primary" className="flex items-center justify-center gap-3 w-full sm:w-fit">
                      <PhoneCall size={20} weight="fill" />
                      Contact Team
                    </ButtonLink>
                    <p className="text-center text-[0.6rem] font-bold uppercase tracking-widest text-xanadu">
                      Joseph & Co Cleaning Ltd
                    </p>
                  </div>
                </div>
              </motion.section>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
