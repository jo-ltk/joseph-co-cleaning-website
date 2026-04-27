"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CaretRight, 
  CaretLeft, 
  House, 
  Buildings, 
  Sparkle, 
  Door, 
  MapPin, 
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle,
  Calculator,
  NavigationArrow,
  Spinner
} from "@phosphor-icons/react";
import Button from "../ui/Button";

const services = [
  { id: "domestic", label: "Domestic Cleaning", icon: <House size={24} />, description: "Regular home maintenance" },
  { id: "commercial", label: "Commercial Cleaning", icon: <Buildings size={24} />, description: "Office & retail spaces" },
  { id: "deep", label: "Deep Cleaning", icon: <Sparkle size={24} />, description: "Intensive seasonal refresh" },
  { id: "tenancy", label: "End of Tenancy", icon: <Door size={24} />, description: "Moving in or out" },
];

const propertySizes = [
  { id: "studio", label: "Studio / 1 Bed", rooms: 1 },
  { id: "small", label: "2-3 Bedrooms", rooms: 3 },
  { id: "medium", label: "4 Bedrooms", rooms: 4 },
  { id: "large", label: "5+ Bedrooms", rooms: 6 },
];

const frequencies = [
  { id: "one-off", label: "One-off", description: "Single visit" },
  { id: "weekly", label: "Weekly", description: "Save 15%" },
  { id: "fortnightly", label: "Fortnightly", description: "Save 10%" },
  { id: "monthly", label: "Monthly", description: "Save 5%" },
];

export default function InstantEstimateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationStatus, setLocationStatus] = useState<"idle" | "detecting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    service: "",
    propertySize: "",
    frequency: "one-off",
    urgency: "normal",
    location: "",
    name: "",
    email: "",
  });

  const totalSteps = 5;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const updateData = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleUseLocation = async () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    setIsDetecting(true);
    setLocationStatus("detecting");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Using Nominatim (OpenStreetMap) for free reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          );
          const data = await response.json();
          
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.suburb || data.address.village || "";
            const postcode = data.address.postcode || "";
            const area = data.address.neighbourhood || data.address.suburb || "";
            
            const locationString = [postcode, area, city].filter(Boolean).join(", ");
            
            updateData({ location: locationString });
            setLocationStatus("success");
            
            // Reset status after a few seconds
            setTimeout(() => setLocationStatus("idle"), 3000);
          } else {
            setLocationStatus("error");
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          setLocationStatus("error");
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationStatus("error");
        setIsDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset after animation
      setTimeout(() => setStep(1), 300);
    }
  }, [isOpen]);

  const calculateEstimate = () => {
    let base = 50;
    if (formData.service === "commercial") base = 120;
    if (formData.service === "deep") base = 150;
    if (formData.service === "tenancy") base = 180;

    const multipliers = {
      studio: 1,
      small: 1.5,
      medium: 2.2,
      large: 3.5,
    };

    const multiplier = multipliers[formData.propertySize as keyof typeof multipliers] || 1;

    const min = Math.round(base * multiplier);
    const max = Math.round(min * 1.25);

    return { min, max };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#120f0c]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full h-full sm:h-auto max-w-2xl overflow-hidden rounded-none sm:rounded-[32px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 sm:px-8 py-5 sm:py-6 shrink-0">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-aztec">Instant Estimate</h3>
                <p className="text-xs sm:text-sm text-xanadu">Step {step} of {totalSteps}</p>
              </div>
              <button 
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-aztec transition-colors hover:bg-gray-100"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-gray-50">
              <motion.div 
                className="h-full bg-yellow-green"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 sm:py-10">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-aztec">What service do you need?</h4>
                      <p className="text-sm sm:text-base text-xanadu">Select the type of cleaning that fits your needs.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => { updateData({ service: s.id }); nextStep(); }}
                          className={`flex items-start gap-3 sm:gap-4 rounded-2xl border-2 p-4 sm:p-5 text-left transition-all hover:border-yellow-green hover:bg-yellow-green/5 ${formData.service === s.id ? "border-yellow-green bg-yellow-green/5" : "border-gray-100"}`}
                        >
                          <div className={`rounded-xl p-2.5 sm:p-3 shrink-0 ${formData.service === s.id ? "bg-yellow-green text-aztec" : "bg-gray-50 text-xanadu"}`}>
                            {s.icon}
                          </div>
                          <div>
                            <div className="font-bold text-aztec text-sm sm:text-base">{s.label}</div>
                            <div className="text-xs sm:text-sm text-xanadu leading-tight sm:leading-normal">{s.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-aztec">How large is the property?</h4>
                      <p className="text-sm sm:text-base text-xanadu">This helps us estimate the time required.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                      {propertySizes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => { updateData({ propertySize: s.id }); nextStep(); }}
                          className={`flex items-center justify-between rounded-2xl border-2 p-4 sm:p-5 text-left transition-all hover:border-yellow-green hover:bg-yellow-green/5 ${formData.propertySize === s.id ? "border-yellow-green bg-yellow-green/5" : "border-gray-100"}`}
                        >
                          <span className="font-bold text-aztec text-sm sm:text-base">{s.label}</span>
                          <CaretRight size={20} weight="bold" className="text-xanadu" />
                        </button>
                      ))}
                    </div>
                    <button onClick={prevStep} className="flex items-center gap-2 text-sm font-bold text-xanadu hover:text-aztec py-2">
                      <CaretLeft size={16} weight="bold" /> Back
                    </button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-aztec">How often should we clean?</h4>
                      <p className="text-sm sm:text-base text-xanadu">Frequency affects the long-term price.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                      {frequencies.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => { updateData({ frequency: f.id }); nextStep(); }}
                          className={`flex items-start gap-4 rounded-2xl border-2 p-4 sm:p-5 text-left transition-all hover:border-yellow-green hover:bg-yellow-green/5 ${formData.frequency === f.id ? "border-yellow-green bg-yellow-green/5" : "border-gray-100"}`}
                        >
                          <div className="flex-1">
                            <div className="font-bold text-aztec text-sm sm:text-base">{f.label}</div>
                            <div className="text-xs sm:text-sm text-xanadu">{f.description}</div>
                          </div>
                          {formData.frequency === f.id && <CheckCircle size={24} weight="fill" className="text-yellow-green" />}
                        </button>
                      ))}
                    </div>
                    <button onClick={prevStep} className="flex items-center gap-2 text-sm font-bold text-xanadu hover:text-aztec py-2">
                      <CaretLeft size={16} weight="bold" /> Back
                    </button>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-aztec">Where are you located?</h4>
                      <p className="text-sm sm:text-base text-xanadu">We'll verify if we cover your area.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="relative">
                        <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-xanadu" />
                        <input 
                          type="text" 
                          placeholder="Postcode or Area"
                          className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 py-4 pl-12 pr-4 text-aztec outline-none transition-all placeholder:text-xanadu/60 focus:border-yellow-green focus:bg-white text-sm sm:text-base"
                          value={formData.location}
                          onChange={(e) => {
                            updateData({ location: e.target.value });
                            if (locationStatus === "success") setLocationStatus("idle");
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between px-2">
                        <button
                          onClick={handleUseLocation}
                          disabled={isDetecting}
                          type="button"
                          className={`group flex items-center gap-2 text-xs font-bold transition-all ${
                            locationStatus === "success" 
                              ? "text-yellow-green" 
                              : locationStatus === "error"
                              ? "text-red-400"
                              : "text-xanadu hover:text-aztec"
                          }`}
                        >
                          {isDetecting ? (
                            <Spinner size={16} className="animate-spin" />
                          ) : locationStatus === "success" ? (
                            <CheckCircle size={16} weight="fill" />
                          ) : (
                            <NavigationArrow size={16} weight="bold" className="transition-transform group-hover:rotate-12" />
                          )}
                          <span>
                            {isDetecting 
                              ? "Detecting area..." 
                              : locationStatus === "success" 
                              ? "Current area detected" 
                              : locationStatus === "error"
                              ? "Detection failed"
                              : "Use Current Location"}
                          </span>
                        </button>
                        
                        {locationStatus === "idle" && !isDetecting && (
                          <span className="text-[10px] uppercase tracking-widest text-xanadu/40 font-bold">Smart Autofill</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <input 
                          type="text" 
                          placeholder="Your Name"
                          className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 py-4 px-4 text-aztec outline-none transition-all placeholder:text-xanadu/60 focus:border-yellow-green focus:bg-white text-sm sm:text-base"
                          value={formData.name}
                          onChange={(e) => updateData({ name: e.target.value })}
                        />
                        <input 
                          type="email" 
                          placeholder="Email Address"
                          className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 py-4 px-4 text-aztec outline-none transition-all placeholder:text-xanadu/60 focus:border-yellow-green focus:bg-white text-sm sm:text-base"
                          value={formData.email}
                          onChange={(e) => updateData({ email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <button onClick={prevStep} className="flex items-center justify-center gap-2 text-sm font-bold text-xanadu hover:text-aztec py-3">
                        <CaretLeft size={16} weight="bold" /> Back
                      </button>
                      <button 
                        disabled={!formData.location || !formData.name || !formData.email}
                        onClick={nextStep}
                        className="flex items-center justify-center gap-2 rounded-full bg-aztec px-8 py-4 font-bold text-white transition-all hover:bg-aztec/90 disabled:opacity-50 text-sm sm:text-base"
                      >
                        Calculate Estimate <ArrowRight size={18} weight="bold" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-6 rounded-full bg-yellow-green/20 p-6 text-yellow-green">
                      <Calculator size={48} weight="duotone" />
                    </div>
                    <h4 className="text-xl font-bold text-xanadu">Your Instant Estimate</h4>
                    <div className="my-4 flex items-baseline justify-center gap-1 sm:gap-2">
                      <span className="text-3xl sm:text-4xl font-bold text-aztec">£{calculateEstimate().min}</span>
                      <span className="text-xl sm:text-2xl text-xanadu">—</span>
                      <span className="text-3xl sm:text-4xl font-bold text-aztec">£{calculateEstimate().max}</span>
                    </div>
                    <p className="max-w-md text-sm sm:text-base text-xanadu px-4">
                      This is an approximate range based on your inputs. For a fixed quote, we recommend a brief site visit or a phone consultation.
                    </p>
                    
                    <div className="mt-8 sm:mt-10 flex flex-col w-full gap-3 px-4 sm:px-0">
                      <Button 
                        as={Link}
                        href={`/contact?source=Instant Estimate&service=${formData.service}&location=${formData.location}&name=${formData.name}&email=${formData.email}`}
                        variant="primary" 
                        className="w-full py-4 text-base sm:text-lg shadow-xl"
                        onClick={onClose}
                      >
                        Confirm & Book Quote
                      </Button>
                      <button 
                        onClick={onClose}
                        className="py-3 text-sm font-bold text-xanadu hover:text-aztec transition-colors"
                      >
                        Maybe Later
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
