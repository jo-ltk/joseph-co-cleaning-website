"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle,
  CloudArrowUp,
  FilePdf,
  FileText,
  SpinnerGap,
  Trash,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";

import { carePositions } from "@/lib/care";
import CareButton from "./CareButton";

const accept =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CareApplyForm() {
  const reduce = useReducedMotion();
  const fileInputId = useId();
  const dropHintId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  function clearFile() {
    setFile(null);
    setFileError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function takeFile(next: File | undefined) {
    if (!next) return;
    const okType = /\.(pdf|doc|docx)$/i.test(next.name);
    if (!okType) {
      const message = "Please upload a PDF, DOC or DOCX file.";
      setFileError(message);
      setError(message);
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (next.size > 4.5 * 1024 * 1024) {
      const message = "CV must be 4.5MB or smaller.";
      setFileError(message);
      setError(message);
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setFileError("");
    setError("");
    setFile(next);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      const message = "Please attach your CV before submitting.";
      setFileError(message);
      setError(message);
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
        setError(
          payload?.error ||
            "We couldn't send your application. Your details are still here — please try again.",
        );
        return;
      }
      setSuccess(true);
      form.reset();
      clearFile();
    } catch {
      setError("We couldn't send your application. Your details are still here — please try again.");
    } finally {
      setPending(false);
    }
  }

  const dropState = pending
    ? "is-busy"
    : fileError
      ? "is-error"
      : dragOver
        ? "is-over"
        : file
          ? "is-ready"
          : "";

  const FileIcon = file && /\.pdf$/i.test(file.name) ? FilePdf : FileText;

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div
          key="success"
          className="care-apply-success"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="status"
        >
          <CheckCircle size={40} weight="fill" className="care-apply-success-icon" />
          <h2>Application submitted successfully</h2>
          <p>We&apos;ll be in touch soon.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          className="care-apply-form"
          onSubmit={onSubmit}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="care-apply-form-head">
            <p className="care-eyebrow">Application</p>
            <h2>Tell us about you</h2>
            <p>Complete the details below and attach your CV. We typically review applications within a few working days.</p>
          </div>

          <fieldset className="care-fieldset care-apply-section">
            <legend className="care-legend">
              <span>01</span>
              Personal Details
            </legend>
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

          <fieldset className="care-fieldset care-apply-section">
            <legend className="care-legend">
              <span>02</span>
              Professional Details
            </legend>
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
                <span>Short Professional Summary</span>
                <textarea className="care-textarea" name="summary" rows={4} />
              </label>
            </div>
          </fieldset>

          <fieldset id="cv" className="care-fieldset care-apply-section scroll-mt-28">
            <legend className="care-legend">
              <span>03</span>
              CV / Resume Upload
            </legend>
            <div
              className={`care-dropzone ${dropState}`}
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

              {file ? (
                <div className="care-dropzone-file">
                  <span className="care-dropzone-icon" aria-hidden>
                    {pending ? <SpinnerGap size={28} className="care-spin" /> : <FileIcon size={28} weight="duotone" />}
                  </span>
                  <div className="care-dropzone-file-copy">
                    <p className="care-dropzone-title">{pending ? "Uploading your CV…" : file.name}</p>
                    <p id={dropHintId} className="care-dropzone-meta">
                      {pending ? "Please wait while we send your application." : `${formatBytes(file.size)} · PDF, DOC, DOCX · max 4.5MB`}
                    </p>
                  </div>
                  {pending ? null : (
                    <div className="care-dropzone-actions">
                      <CareButton variant="ghost" onClick={() => fileRef.current?.click()}>
                        Replace
                      </CareButton>
                      <button type="button" className="care-dropzone-remove" onClick={clearFile} aria-label="Remove selected file">
                        <Trash size={18} weight="bold" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <span className="care-dropzone-icon" aria-hidden>
                    {fileError ? <WarningCircle size={32} weight="fill" /> : <CloudArrowUp size={32} weight="duotone" />}
                  </span>
                  <p className="care-dropzone-title">
                    {dragOver ? "Drop your CV here" : fileError ? "Unable to attach this file" : "Drag and drop your CV"}
                  </p>
                  <p id={dropHintId} className="care-dropzone-meta">
                    PDF, DOC, DOCX · maximum 4.5MB
                  </p>
                  <CareButton
                    variant="ghost"
                    className="mt-5"
                    onClick={() => fileRef.current?.click()}
                    aria-describedby={dropHintId}
                    icon={<CloudArrowUp size={16} weight="bold" />}
                  >
                    Choose File
                  </CareButton>
                </>
              )}
            </div>
          </fieldset>

          <label className="care-apply-consent">
            <input type="checkbox" name="consent" required />
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

          <CareButton type="submit" className="w-full sm:w-auto" disabled={pending} hideIcon={pending}>
            {pending ? "Submitting…" : "Join Our Team"}
          </CareButton>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
