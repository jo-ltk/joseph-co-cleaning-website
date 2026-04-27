"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  CaretDown,
  ChatCircleText,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
  SealCheck,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ScrollReveal from "../../components/ScrollReveal";
import Button, { ButtonLink } from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";

const directContacts = [
  {
    label: "Call Julia Joseph",
    value: "+44 7787 857305",
    href: "tel:+447787857305",
    note: "Booking support and first response",
    icon: Phone,
  },
  {
    label: "Call Dickson Joseph",
    value: "+44 7570 421556",
    href: "tel:+447570421556",
    note: "Site details and service guidance",
    icon: Phone,
  },
  {
    label: "Email The Team",
    value: "JosephandCol.t.d@outlook.com",
    href: "mailto:JosephandCol.t.d@outlook.com",
    note: "Share photos, access notes, or a full brief",
    icon: EnvelopeSimple,
  },
];

const serviceOptions = [
  "Domestic Cleaning",
  "Commercial Cleaning",
  "Industrial Cleaning",
  "Deep Cleaning",
  "After Builders Cleaning",
  "End Of Tenancy Cleaning",
];

const reassuranceItems = [
  {
    title: "Fast, Helpful Replies",
    body: "A real person will help shape the right clean, timing, and next step for your property.",
    icon: Clock,
  },
  {
    title: "Trusted Local Coverage",
    body: "Serving Somerset, Devon, Gloucestershire, and Bristol with reliable, professional cleaning support.",
    icon: MapPin,
  },
  {
    title: "Clear Quote Process",
    body: "Send the essentials, add photos if helpful, and we will guide you toward the right service.",
    icon: SealCheck,
  },
];

const helpSnippets = [
  {
    question: "Not sure which service you need?",
    answer: "Tell us what has changed in the space and what result you want. We will recommend the most suitable clean.",
  },
  {
    question: "Need urgent support?",
    answer: "Call Julia or Dickson directly for the quickest route to availability, timing, and booking guidance.",
  },
  {
    question: "Can you cover larger properties?",
    answer: "Yes. Share your location, property type, and access details so we can plan the right team and schedule.",
  },
];

function MotionEyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${light ? "text-yellow-green" : "text-pine-green"} mb-4 block text-sm font-semibold uppercase tracking-widest`}
    >
      {children}
    </motion.span>
  );
}

function ContactField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`group block ${className ?? ""}`}>
      <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-pine-green">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClassName =
  "h-[56px] w-full border-0 border-b border-aztec/15 bg-transparent px-0 text-base font-medium tracking-tight text-aztec outline-none transition duration-300 placeholder:text-xanadu/70 focus:border-pine-green";

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedService, setSelectedService] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Form states for pre-filling
  const [prefilledData, setPrefilledData] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
  });

  // Read initial data from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const serviceQuery = searchParams.get("service");
    const nameQuery = searchParams.get("name");
    const emailQuery = searchParams.get("email");
    const locationQuery = searchParams.get("location");
    
    if (serviceQuery) {
      const matched = serviceOptions.find(s => s.toLowerCase().includes(serviceQuery.toLowerCase()));
      if (matched) setSelectedService(matched);
      else setSelectedService(serviceQuery);
    }

    setPrefilledData({
      name: nameQuery || "",
      email: emailQuery || "",
      location: locationQuery || "",
      message: searchParams.get("source") === "Instant Estimate" 
        ? `Hi, I just used your Instant Estimate tool and got a range for my ${serviceQuery || "cleaning"} project. Looking forward to a formal quote.`
        : "",
    });
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      location: formData.get("location") as string,
      preferredDate: formData.get("preferredDate") as string,
      message: formData.get("message") as string,
      leadSource: window.location.search ? new URLSearchParams(window.location.search).get("source") || "Contact Page" : "Contact Page",
    };

    try {
      // Import dynamically to avoid top-level issues if any
      const { submitBooking } = await import("../actions/booking");
      const result = await submitBooking(data);

      if (result.success) {
        setSuccess(true);
        if (result.whatsappUrl) {
          setWhatsappUrl(result.whatsappUrl);
        }
      } else {
        setError(result.error || "Failed to submit request.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative bg-[#120f0c] text-aztec">
      <Navbar />

      <section className="relative flex h-[70vh] min-h-[500px] items-end overflow-hidden bg-[#7b8078] text-white md:min-h-[600px]">
        <motion.div
          className="absolute inset-0"
          style={shouldReduceMotion ? undefined : { y: backgroundY, scale: backgroundScale }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/images/hero-bg-new.png")' }}
          />
          <div className="absolute inset-0 bg-black/25 md:bg-transparent md:bg-gradient-to-t md:from-black/50 md:via-transparent md:to-black/20" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 md:hidden">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {["0%", "25%", "50%", "75%", "100%"].map((line) => (
            <div key={line} className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/18" style={{ left: line }} />
          ))}
        </div>

        <motion.div
          className="relative z-10 mx-auto w-full max-w-[1920px] px-6 pb-4 md:px-10 md:pb-5 lg:px-20"
          style={shouldReduceMotion ? undefined : { y: contentY }}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="max-w-[850px]"
            >
              <ScrollReveal
                as="h1"
                enableBlur
                blurStrength={10}
                containerClassName="text-balance text-4xl md:text-6xl lg:text-[80px] leading-[1.0] tracking-tight font-medium text-white max-w-[800px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Let us help plan your spotless space.
              </ScrollReveal>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="hidden pb-2 md:block"
            >
              <div
                className="cursor-default text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Contact
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
          <div>
            <MotionEyebrow>Booking Assistance</MotionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur
              blurStrength={8}
              containerClassName="mb-6 max-w-2xl text-2xl md:text-4xl leading-[1.1] font-medium tracking-tight text-aztec"
            >
              A clear route from enquiry to a carefully finished clean.
            </ScrollReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl text-lg font-medium leading-relaxed text-xanadu md:text-xl"
          >
            Whether you need a home reset, a commercial routine, an industrial clean, or post-build detail work, Joseph & Co will help you choose the right service and respond with practical next steps.
          </motion.p>
        </div>
      </section>

      <section className="bg-[#f5f5f3] px-5 py-16 md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-6 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-6 shadow-sm md:p-10 lg:col-span-7"
          >
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <MotionEyebrow>Tell Us What You Need</MotionEyebrow>
                <h2 className="text-2xl font-medium leading-[1.1] tracking-tight text-aztec md:text-4xl">
                  Request a quote
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-xanadu">
                <Sparkle size={18} className="text-pine-green" weight="fill" />
                <span>Reliable Support</span>
              </div>
            </div>

            <form className="grid gap-8 md:grid-cols-2" onSubmit={handleSubmit}>
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="md:col-span-2 flex flex-col items-center justify-center bg-yellow-green/5 border border-yellow-green/20 p-8 md:p-12 text-center rounded-2xl"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-green text-aztec shadow-xl shadow-yellow-green/20">
                    <SealCheck size={40} weight="fill" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-medium text-aztec mb-3">
                    Inquiry Received
                  </h3>
                  <p className="text-xanadu text-lg max-w-md mb-10 leading-relaxed">
                    Thank you, {prefilledData.name || "there"}. We've received your details and are preparing your quote.
                  </p>
                  
                  {whatsappUrl && (
                    <div className="w-full max-w-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-xanadu mb-4">
                        Want a response in minutes?
                      </p>
                      <motion.a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-5 font-bold rounded-full shadow-md transition-all hover:bg-[#20bd5a] hover:shadow-lg"
                      >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        <span>Fast-Track via WhatsApp</span>
                      </motion.a>
                      <p className="mt-4 text-xs text-xanadu/60 italic">
                        Highly recommended for urgent service requests
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <>
                  <ContactField label="Name">
                    <input className={inputClassName} name="name" placeholder="Your name" type="text" defaultValue={prefilledData.name} required />
                  </ContactField>
                  <ContactField label="Phone">
                    <input className={inputClassName} name="phone" placeholder="+44..." type="tel" required />
                  </ContactField>
                  <ContactField label="Email">
                    <input className={inputClassName} name="email" placeholder="you@example.com" type="email" defaultValue={prefilledData.email} required />
                  </ContactField>
                  <ContactField label="Service Needed">
                    <div className="relative">
                      <input type="hidden" name="service" value={selectedService} />
                      <button
                        type="button"
                        onClick={() => setServiceOpen((open) => !open)}
                        className={`flex h-[56px] w-full items-center justify-between border-0 border-b bg-transparent px-0 text-left text-base font-medium tracking-tight outline-none transition duration-300 ${
                          serviceOpen ? "border-pine-green text-aztec" : "border-aztec/15 text-aztec"
                        }`}
                        aria-haspopup="listbox"
                        aria-expanded={serviceOpen}
                      >
                        <span className={selectedService ? "text-aztec" : "text-xanadu/70"}>
                          {selectedService || "Select a service"}
                        </span>
                        <CaretDown
                          size={18}
                          className={`text-pine-green transition duration-300 ${serviceOpen ? "rotate-180" : ""}`}
                          weight="bold"
                        />
                      </button>

                      {serviceOpen ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-0 right-0 top-[64px] z-20 overflow-hidden bg-white shadow-[0_24px_70px_rgba(0,0,0,0.14)] ring-1 ring-aztec/10"
                          role="listbox"
                        >
                          {serviceOptions.map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => {
                                setSelectedService(service);
                                setServiceOpen(false);
                              }}
                              className={`flex w-full items-center justify-between px-5 py-4 text-left text-base font-medium tracking-tight transition duration-300 ${
                                selectedService === service
                                  ? "bg-yellow-green text-aztec"
                                  : "text-aztec hover:bg-[#f5f5f3]"
                              }`}
                              role="option"
                              aria-selected={selectedService === service}
                            >
                              <span>{service}</span>
                              {selectedService === service ? (
                                <Sparkle size={16} className="text-pine-green" weight="fill" />
                              ) : null}
                            </button>
                          ))}
                        </motion.div>
                      ) : null}
                    </div>
                  </ContactField>
                  <ContactField label="Location">
                    <input className={inputClassName} name="location" placeholder="Town, postcode, or area" type="text" defaultValue={prefilledData.location} />
                  </ContactField>
                  <ContactField label="Preferred Date">
                    <input className={inputClassName} name="preferredDate" placeholder="e.g. Next Monday" type="text" />
                  </ContactField>
                  <ContactField label="Message" className="md:col-span-2">
                    <textarea
                      className="min-h-[150px] w-full resize-y border-0 border-b border-aztec/15 bg-transparent px-0 py-4 text-base font-medium tracking-tight text-aztec outline-none transition duration-300 placeholder:text-xanadu/70 focus:border-pine-green"
                      name="message"
                      placeholder="Tell us about the property, timing, access, and anything you would like us to pay special attention to."
                      defaultValue={prefilledData.message}
                    />
                  </ContactField>

                  {error && (
                    <div className="md:col-span-2 text-red-600 text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
                    <p className="max-w-md text-base leading-relaxed text-xanadu">
                      For the fastest quote, include your location, preferred date, and any access notes.
                    </p>
                    <motion.div whileHover={isSubmitting ? {} : { y: -2 }} whileTap={isSubmitting ? {} : { scale: 0.98 }}>
                      <Button type="submit" variant="primary" className="w-full px-10 md:w-auto disabled:opacity-70 disabled:cursor-not-allowed" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Enquiry"}
                      </Button>
                    </motion.div>
                  </div>
                </>
              )}
            </form>
          </motion.div>

          <div className="grid gap-4 lg:col-span-5">
            {directContacts.map((contact, index) => {
              const Icon = contact.icon;

              return (
                <motion.a
                  key={contact.value}
                  href={contact.href}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex min-h-[150px] items-end justify-between gap-6 overflow-hidden bg-aztec p-6 text-yellow-green transition duration-300 hover:bg-[#172b31] md:p-10"
                >
                  <div>
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-green text-aztec transition duration-300 group-hover:translate-x-1">
                      <Icon size={22} weight="duotone" />
                    </div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-green/55">{contact.label}</p>
                    <h3 className="text-xl font-medium leading-[1.1] tracking-tight text-yellow-green md:text-2xl">
                      {contact.value}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-yellow-green/65">{contact.note}</p>
                  </div>
                  <ArrowUpRight size={22} className="shrink-0 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" weight="bold" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[460px] overflow-hidden bg-[#d9d9d2] lg:col-span-6"
          >
            <Image
              src="/clean-space-living-room.jpg"
              alt="Spotless living room prepared by Joseph and Co"
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c]/52 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-10 md:left-10 md:right-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-green">Coverage</p>
              <h3 className="max-w-lg text-xl font-medium leading-[1.1] tracking-tight md:text-2xl">
                Somerset, Devon, Gloucestershire, and Bristol.
              </h3>
            </div>
          </motion.div>

          <div className="lg:col-span-6">
            <MotionEyebrow>Visit Or Write</MotionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur
              blurStrength={8}
              containerClassName="mb-6 max-w-2xl text-2xl md:text-4xl leading-[1.1] font-medium tracking-tight text-aztec"
            >
              Local, reachable, and ready to help.
            </ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="mb-10 grid gap-4"
            >
              <a
                href="mailto:JosephandCol.t.d@outlook.com"
                className="flex items-center gap-4 border-b border-aztec/10 pb-5 text-lg font-medium tracking-tight text-aztec transition hover:text-pine-green"
              >
                <EnvelopeSimple size={22} className="text-pine-green" weight="duotone" />
                <span>JosephandCol.t.d@outlook.com</span>
              </a>
              <div className="flex items-start gap-4 border-b border-aztec/10 pb-5 text-lg font-medium tracking-tight text-aztec">
                <MapPin size={22} className="mt-1 shrink-0 text-pine-green" weight="duotone" />
                <span>TA6 4HW 32 Willow Man Road</span>
              </div>
              <div className="flex items-start gap-4 border-b border-aztec/10 pb-5 text-lg font-medium tracking-tight text-aztec">
                <ChatCircleText size={22} className="mt-1 shrink-0 text-pine-green" weight="duotone" />
                <span>Helpful response, clear availability, and service guidance before you book.</span>
              </div>
            </motion.div>
            <div className="btn-pair">
              <ButtonLink href="tel:+447787857305" variant="primary" className="px-8">
                Call Now
              </ButtonLink>
              <IconButton href="mailto:JosephandCol.t.d@outlook.com" aria-label="Email Joseph and Co" size="md" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f3] px-5 py-16 md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <MotionEyebrow>Contact Help</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={8}
                containerClassName="text-2xl md:text-4xl leading-[1.1] font-medium tracking-tight text-aztec"
              >
                Small details that make quoting easier.
              </ScrollReveal>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-sm text-base leading-relaxed text-xanadu md:text-lg"
            >
              The more context you share, the more accurate and useful the first response can be.
            </motion.p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {helpSnippets.map((item, index) => (
              <motion.article
                key={item.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-sm md:p-10"
              >
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-pine-green">0{index + 1}</p>
                <h3 className="mb-4 text-xl font-medium leading-[1.1] tracking-tight text-aztec md:text-2xl">
                  {item.question}
                </h3>
                <p className="text-base leading-relaxed text-xanadu">{item.answer}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#120f0c] px-5 py-20 text-white md:px-10 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 grid gap-4 md:mb-16 lg:grid-cols-3">
            {reassuranceItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className="border border-white/10 p-6 md:p-8"
                >
                  <Icon size={28} className="mb-8 text-yellow-green" weight="duotone" />
                  <h3 className="mb-4 text-xl font-medium leading-[1.1] tracking-tight text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/65">{item.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <MotionEyebrow light>Ready When You Are</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={10}
                containerClassName="max-w-[980px] text-balance text-4xl md:text-6xl lg:text-7xl leading-[1.05] font-medium tracking-tight text-white"
              >
                Start with a call, a message, or a few project details.
              </ScrollReveal>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:pb-2"
            >
              <p className="mb-8 text-lg font-medium leading-relaxed text-white/68 md:text-xl">
                We will help you turn the enquiry into a clear plan for a cleaner, calmer, better-presented space.
              </p>
              <div className="btn-pair">
                <ButtonLink href="tel:+447787857305" variant="primary" className="px-8">
                  Call Julia
                </ButtonLink>
                <IconButton href="tel:+447570421556" aria-label="Call Dickson Joseph" size="md" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
