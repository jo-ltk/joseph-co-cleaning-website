"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle, UploadSimple } from "@phosphor-icons/react/dist/ssr";

import { carePositions } from "@/lib/care";

const accept = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export default function CareApplyForm() {
  const reduce = useReducedMotion();
  const fileInputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  function takeFile(next: File | undefined) {
    if (!next) return;
    const okType = /\.(pdf|doc|docx)$/i.test(next.name);
    if (!okType) {
      setError("Please upload a PDF, DOC or DOCX file.");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (next.size > 4.5 * 1024 * 1024) {
      setError("CV must be 4.5MB or smaller.");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setError("");
    setFile(next);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Please attach your CV before submitting.");
      return;
    }
    setPending(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("cv", file);
    data.set("consent", data.get("consent") ? "true" : "false");

    try {
      const response = await fetch("/api/care/apply", {
        method: "POST",
        body: data,
      });
      const payload = (await response.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;
      if (!response.ok || !payload?.success) {
        setError(payload?.error || "Unable to submit your application.");
        return;
      }
      setSuccess(true);
      form.reset();
      setFile(null);
    } catch {
      setError("Unable to submit your application. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div
          key="success"
          className="border border-[var(--cc-line)] bg-[var(--cc-white)] p-8 md:p-12"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
        >
          <CheckCircle size={36} className="text-[var(--cc-blue)]" />
          <h2 className="mt-5 text-4xl">Application Received</h2>
          <p className="mt-4 max-w-xl">
            Thank you. Our team will review your application and contact you if there is a suitable opportunity.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          className="grid gap-10"
          onSubmit={onSubmit}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <fieldset className="care-fieldset">
            <legend className="care-legend">Personal Details</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="care-field">
                <span>Full Name</span>
                <input className="care-input" name="fullName" required autoComplete="name" />
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
                <span>Location</span>
                <input className="care-input" name="location" required autoComplete="address-level2" />
              </label>
            </div>
          </fieldset>

          <fieldset className="care-fieldset">
            <legend className="care-legend">Professional Details</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="care-field">
                <span>Position</span>
                <select className="care-select" name="position" required defaultValue="">
                  <option value="" disabled>
                    Select a role
                  </option>
                  {carePositions.map((position) => (
                    <option key={position}>{position}</option>
                  ))}
                </select>
              </label>
              <label className="care-field">
                <span>Years of Experience</span>
                <input className="care-input" name="experience" required placeholder="e.g. 4" />
              </label>
              <label className="care-field sm:col-span-2">
                <span>Short professional summary</span>
                <textarea className="care-textarea" name="summary" rows={4} />
              </label>
            </div>
          </fieldset>

          <fieldset id="cv" className="care-fieldset scroll-mt-28">
            <legend className="care-legend">CV</legend>
            <div
              className={`flex min-h-[220px] flex-col items-center justify-center border border-dashed p-8 text-center transition ${
                dragOver ? "border-[var(--cc-navy)] bg-[var(--cc-white)]" : "border-[var(--cc-line-strong)] bg-[var(--cc-cream)]/50"
              }`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragOver(false);
                takeFile(event.dataTransfer.files[0]);
              }}
            >
              <UploadSimple size={28} className="text-[var(--cc-blue)]" aria-hidden />
              <p className="mt-4 text-lg font-medium !text-[var(--cc-navy)]">Upload your CV</p>
              <p className="mt-1 text-sm">PDF, DOC or DOCX · max 4.5MB</p>
              <input
                id={fileInputId}
                ref={fileRef}
                className="sr-only"
                type="file"
                accept={accept}
                tabIndex={-1}
                aria-hidden="true"
                onChange={(event) => takeFile(event.target.files?.[0])}
              />
              <button
                type="button"
                className="care-btn care-btn-secondary mt-5"
                onClick={() => fileRef.current?.click()}
              >
                Choose File
              </button>
              <p className="mt-4 text-sm font-semibold !text-[var(--cc-navy)]" aria-live="polite">
                {file ? `Selected: ${file.name}` : "No file selected"}
              </p>
            </div>
          </fieldset>

          <label className="flex items-start gap-3 text-sm text-[var(--cc-ink)]">
            <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0" />
            <span>
              I confirm that the information provided is accurate and I consent to Care Connect contacting me regarding
              employment opportunities.
            </span>
          </label>

          {error ? (
            <p className="care-error" role="alert">
              {error}
            </p>
          ) : null}

          <button className="care-btn care-btn-primary w-full sm:w-auto" disabled={pending}>
            {pending ? "Submitting…" : "Submit Application"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
