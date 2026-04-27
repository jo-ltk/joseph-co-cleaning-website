"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  UserCircle, 
  Cookie, 
  Files, 
  ArrowsLeftRight, 
  ClockClockwise, 
  ChatCircleText,
  EnvelopeSimple,
  Phone,
  MapPin
} from "@phosphor-icons/react/dist/ssr";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import { ButtonLink } from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";

const sections = [
  {
    id: "introduction",
    title: "Introduction and Scope",
    icon: ShieldCheck,
    content: (
      <>
        <p>
          At Joseph & Co Cleaning Services Ltd ("we", "us", "our"), we are committed to protecting and respecting your privacy. This policy explains how we collect, use, and protect your personal data when you visit our website, enquire about our services, or enter into a service agreement with us.
        </p>
        <p className="mt-4">
          This policy applies to all visitors to our website, prospective clients, and current customers across our service regions, including Somerset, Devon, Gloucestershire, and Bristol.
        </p>
      </>
    )
  },
  {
    id: "controller",
    title: "Data Controller Details",
    icon: UserCircle,
    content: (
      <>
        <p>
          For the purposes of the UK General Data Protection Regulation (UK GDPR), the data controller is:
        </p>
        <div className="mt-6 space-y-4 rounded-2xl bg-white/50 p-6 border border-pine-green/10">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine-green text-yellow-green">
              <ShieldCheck size={20} weight="fill" />
            </div>
            <div>
              <p className="font-medium text-aztec">Joseph & Co Cleaning Services Ltd</p>
              <p className="text-sm text-xanadu">Registered in England & Wales</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin size={20} className="text-pine-green mt-1" />
            <p className="text-sm text-xanadu">TA6 4HW, 32 Willow Man Road, UK</p>
          </div>
          <div className="flex items-start gap-4">
            <EnvelopeSimple size={20} className="text-pine-green mt-1" />
            <p className="text-sm text-xanadu">JosephandCol.t.d@outlook.com</p>
          </div>
          <div className="flex items-start gap-4">
            <Phone size={20} className="text-pine-green mt-1" />
            <p className="text-sm text-xanadu">+44 7787857305</p>
          </div>
        </div>
      </>
    )
  },
  {
    id: "collection",
    title: "Information We Collect",
    icon: Files,
    content: (
      <>
        <p>We collect and process the following data to provide our premium cleaning services:</p>
        <ul className="mt-6 space-y-4">
          <li className="flex gap-4">
            <div className="h-1.5 w-1.5 mt-2 rounded-full bg-yellow-green shrink-0" />
            <div>
              <strong className="text-aztec block">Identity & Contact Data</strong>
              <span className="text-xanadu text-sm">Full name, billing address, service address, email address, and telephone numbers.</span>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="h-1.5 w-1.5 mt-2 rounded-full bg-yellow-green shrink-0" />
            <div>
              <strong className="text-aztec block">Property & Service Data</strong>
              <span className="text-xanadu text-sm">Address of the property to be cleaned, property size, presence of pets, alarm codes, key locations, and specific cleaning instructions or preferences.</span>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="h-1.5 w-1.5 mt-2 rounded-full bg-yellow-green shrink-0" />
            <div>
              <strong className="text-aztec block">Financial Data</strong>
              <span className="text-xanadu text-sm">Bank account and payment card details (processed securely via our payment partners; we do not store full card numbers on our local systems).</span>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="h-1.5 w-1.5 mt-2 rounded-full bg-yellow-green shrink-0" />
            <div>
              <strong className="text-aztec block">Technical & Usage Data</strong>
              <span className="text-xanadu text-sm">IP address, browser type, time zone setting, and information about how you use our website.</span>
            </div>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    icon: ArrowsLeftRight,
    content: (
      <div className="space-y-4">
        <p>We use your data for the following essential business purposes:</p>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="rounded-xl border border-aztec/5 bg-white p-5 shadow-sm">
            <p className="font-medium text-aztec mb-2">Service Delivery</p>
            <p className="text-sm text-xanadu leading-relaxed">To process your booking, schedule our teams, and gain access to your property.</p>
          </div>
          <div className="rounded-xl border border-aztec/5 bg-white p-5 shadow-sm">
            <p className="font-medium text-aztec mb-2">Communication</p>
            <p className="text-sm text-xanadu leading-relaxed">To provide quotes, booking confirmations, and updates via email, phone, or WhatsApp.</p>
          </div>
          <div className="rounded-xl border border-aztec/5 bg-white p-5 shadow-sm">
            <p className="font-medium text-aztec mb-2">Business Operations</p>
            <p className="text-sm text-xanadu leading-relaxed">For invoicing, payment processing, and internal record-keeping.</p>
          </div>
          <div className="rounded-xl border border-aztec/5 bg-white p-5 shadow-sm">
            <p className="font-medium text-aztec mb-2">Marketing</p>
            <p className="text-sm text-xanadu leading-relaxed">To send you updates about our services (where you have opted in to receive such communications).</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "basis",
    title: "Legal Basis for Processing",
    icon: ShieldCheck,
    content: (
      <>
        <p>Under the UK GDPR, we rely on the following lawful bases for processing your data:</p>
        <ul className="mt-6 space-y-4 text-sm text-xanadu">
          <li><strong>Contractual Necessity:</strong> To fulfill our agreement to provide cleaning services to you.</li>
          <li><strong>Legitimate Interests:</strong> For the efficient management of our business, including customer service and service improvements.</li>
          <li><strong>Legal Obligation:</strong> To comply with financial and tax reporting requirements.</li>
          <li><strong>Consent:</strong> Where you have explicitly agreed to receive marketing communications.</li>
        </ul>
      </>
    )
  },
  {
    id: "sharing",
    title: "Data Sharing and Third Parties",
    icon: ArrowsLeftRight,
    content: (
      <>
        <p>We do not sell your personal data. We may share your information with trusted third parties only as necessary:</p>
        <ul className="mt-6 space-y-4 text-sm text-xanadu">
          <li className="flex items-start gap-3">
            <CheckCircleIcon />
            <span><strong>Service Personnel:</strong> Our vetted cleaning teams and sub-contractors who require your address and access details to perform the service.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon />
            <span><strong>Technology Partners:</strong> IT and communication providers including Resend (for email delivery) and WhatsApp (for operational messaging).</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon />
            <span><strong>Payment Processors:</strong> Secure financial services to handle your transactions safely.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon />
            <span><strong>Legal Authorities:</strong> If required by law or to protect our rights and property.</span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "retention",
    title: "Data Retention Periods",
    icon: ClockClockwise,
    content: (
      <>
        <p>We keep your personal data only as long as necessary:</p>
        <ul className="mt-6 space-y-4 text-sm text-xanadu">
          <li><strong>Client Records:</strong> For the duration of our service relationship and for 6 years thereafter to comply with HMRC requirements.</li>
          <li><strong>Enquiries:</strong> Where a booking does not proceed, we retain your details for up to 2 years to facilitate future scheduling.</li>
          <li><strong>Marketing Data:</strong> Until you withdraw your consent or request deletion.</li>
        </ul>
      </>
    )
  },
  {
    id: "cookies",
    title: "Cookies and Analytics",
    icon: Cookie,
    content: (
      <>
        <p>Our website uses cookies to enhance your browsing experience and analyze our traffic. Cookies are small text files stored on your device.</p>
        <p className="mt-4">
          We use essential cookies for website functionality and analytical cookies (such as Google Analytics) to understand how visitors interact with our site. You can manage your cookie preferences through your browser settings.
        </p>
      </>
    )
  },
  {
    id: "security",
    title: "Security of Data",
    icon: Lock,
    content: (
      <>
        <p>
          We implement robust technical and organizational measures to secure your data. This includes encrypted communications, secure data storage, and strict access controls for our staff.
        </p>
        <p className="mt-4">
          Property access details (keys/codes) are handled with extreme care. Keys are never labeled with your full address and are stored in secure locations when not in use.
        </p>
      </>
    )
  },
  {
    id: "rights",
    title: "Your GDPR Rights",
    icon: Files,
    content: (
      <>
        <p>Under UK data protection law, you have rights including:</p>
        <div className="mt-6 grid gap-3 text-sm text-xanadu">
          <p>• <strong>The right to access:</strong> Request copies of your personal data.</p>
          <p>• <strong>The right to rectification:</strong> Request that we correct inaccurate or incomplete information.</p>
          <p>• <strong>The right to erasure:</strong> Request that we delete your personal data under certain conditions.</p>
          <p>• <strong>The right to restrict processing:</strong> Request that we limit how we use your data.</p>
          <p>• <strong>The right to data portability:</strong> Request the transfer of your data to another organization.</p>
        </div>
        <p className="mt-6">
          To exercise any of these rights, please contact us using the details below.
        </p>
      </>
    )
  }
];

function CheckCircleIcon() {
  return (
    <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-yellow-green/20 flex items-center justify-center">
      <div className="h-1.5 w-1.5 rounded-full bg-pine-green" />
    </div>
  );
}

export default function PrivacyPolicyPage() {
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
              Trust & Transparency
            </span>
            <ScrollReveal
              as="h1"
              enableBlur={true}
              blurStrength={10}
              containerClassName="text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
            >
              Privacy Policy
            </ScrollReveal>
            <p className="mt-8 text-lg text-white/60 md:text-xl">
              Last updated: April 27, 2026. How Joseph & Co Cleaning Services Ltd handles and protects your personal information.
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
              {sections.map((section) => (
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

          <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
            
            {/* Sticky Sidebar Navigation (Desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-2">
                <p className="mb-6 text-xs font-bold uppercase tracking-widest text-xanadu/60 px-4">
                  Sections
                </p>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-xanadu transition-all hover:bg-white hover:text-aztec hover:shadow-sm"
                  >
                    <section.icon size={18} className="transition-colors group-hover:text-pine-green" />
                    {section.title}
                  </a>
                ))}
              </div>
            </aside>

            {/* Policy Content */}
            <div className="space-y-16 md:space-y-24">
              {sections.map((section, index) => (
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

              {/* Contact Sub-section */}
              <motion.section
                id="contact"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[32px] bg-aztec p-6 md:p-12 text-white shadow-2xl relative overflow-hidden scroll-mt-24"
              >
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-yellow-green/5 to-transparent" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-medium md:text-3xl mb-6">Contacting Us About Privacy</h2>
                  <p className="text-white/60 mb-8 max-w-2xl text-base md:text-lg">
                    If you have any questions about this Privacy Policy or our treatment of your personal data, please reach out to our privacy officer.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <ButtonLink href="mailto:JosephandCol.t.d@outlook.com" variant="primary" className="w-full sm:w-fit text-center">
                      Email Privacy Officer
                    </ButtonLink>
                    <ButtonLink href="/contact" variant="secondary" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-fit text-center">
                      General Enquiries
                    </ButtonLink>
                  </div>
                </div>
              </motion.section>
            </div>

          </div>
        </div>
      </section>

      {/* Final Reassurance CTA */}
      <section className="bg-white py-20 md:py-32 border-t border-aztec/5">
        <div className="container mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20 text-center">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="text-3xl font-medium text-aztec md:text-5xl mb-8"
            >
              Excellence built on trust.
            </ScrollReveal>
            <p className="text-lg text-xanadu mb-12">
              Your security and privacy are as important to us as the quality of our clean. We are here to support you at every step of your Joseph & Co journey.
            </p>
            <div className="btn-pair justify-center">
              <ButtonLink href="/contact" variant="primary">Book Your Quote</ButtonLink>
              <IconButton href="/contact" size="md" aria-label="Book your quote" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
