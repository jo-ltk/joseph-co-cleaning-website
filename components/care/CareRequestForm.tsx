"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { X } from "@phosphor-icons/react/dist/ssr";

import { submitStaffRequest } from "@/app/actions/care";
import { facilityTypes, staffingNeeds } from "@/lib/care";

export default function CareRequestForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  function close() {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setError("");
    }, 280);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const result = await submitStaffRequest({
      name: String(data.get("name") || ""),
      organisation: String(data.get("organisation") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      facilityType: String(data.get("facilityType") || ""),
      staffingNeed: String(data.get("staffingNeed") || ""),
      message: String(data.get("message") || ""),
    });
    setPending(false);
    if (!result.success) {
      setError(result.error || "Unable to send your request.");
      return;
    }
    setSuccess(true);
    form.reset();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[var(--cc-navy)]/55 p-0 sm:items-center sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="staff-request-title"
            className="max-h-[92vh] w-full overflow-y-auto bg-[var(--cc-paper)] p-6 sm:max-w-[640px] sm:p-8"
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="care-eyebrow">Facilities</p>
                <h2 id="staff-request-title" className="mt-3 text-3xl">
                  Request Staff
                </h2>
                <p className="mt-2 max-w-md text-sm">
                  Tell us what your facility needs and our team will help you find the right staffing solution.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center border border-[var(--cc-line)]"
                aria-label="Close request form"
              >
                <X size={18} />
              </button>
            </div>

            {success ? (
              <div className="border border-[var(--cc-line)] bg-[var(--cc-white)] p-6">
                <h3 className="text-2xl">Request received</h3>
                <p className="mt-3">
                  Thank you. A member of the Care Connect team will be in touch to discuss your staffing requirements.
                </p>
                <button
                  type="button"
                  className="care-btn care-btn-primary mt-6"
                  onClick={close}
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
                <label className="care-field">
                  <span>Name</span>
                  <input className="care-input" name="name" required autoComplete="name" />
                </label>
                <label className="care-field">
                  <span>Organisation</span>
                  <input className="care-input" name="organisation" required />
                </label>
                <label className="care-field">
                  <span>Email</span>
                  <input className="care-input" name="email" type="email" required autoComplete="email" />
                </label>
                <label className="care-field">
                  <span>Phone</span>
                  <input className="care-input" name="phone" type="tel" required autoComplete="tel" />
                </label>
                <label className="care-field">
                  <span>Type of Facility</span>
                  <select className="care-select" name="facilityType" required defaultValue="">
                    <option value="" disabled>
                      Select type
                    </option>
                    {facilityTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </label>
                <label className="care-field">
                  <span>Staffing Requirement</span>
                  <select className="care-select" name="staffingNeed" required defaultValue="">
                    <option value="" disabled>
                      Select requirement
                    </option>
                    {staffingNeeds.map((need) => (
                      <option key={need}>{need}</option>
                    ))}
                  </select>
                </label>
                <label className="care-field sm:col-span-2">
                  <span>Message</span>
                  <textarea className="care-textarea" name="message" rows={4} />
                </label>
                {error ? <p className="care-error sm:col-span-2">{error}</p> : null}
                <div className="sm:col-span-2">
                  <button className="care-btn care-btn-primary w-full sm:w-auto" disabled={pending}>
                    {pending ? "Sending…" : "Request Staff"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
