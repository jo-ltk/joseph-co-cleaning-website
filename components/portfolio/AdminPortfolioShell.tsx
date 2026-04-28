"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CaretDown,
  CheckCircle,
  CloudArrowUp,
  Eye,
  ImageSquare,
  MapPin,
  NotePencil,
  Plus,
  SealCheck,
  SignOut,
  Sparkle,
  Trash,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";

import { logoutAction } from "@/app/actions/auth";
import {
  approveLandlordReviewAction,
  deleteLandlordReviewAction,
  deletePortfolioAction,
  savePortfolioAction,
} from "@/app/actions/portfolio";
import Navbar from "@/components/Navbar";
import Button, { ButtonLink } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import {
  getPortfolioAfterImage,
  getPortfolioBeforeImage,
  getPortfolioDetailImages,
} from "@/lib/portfolio-helpers";
import type {
  AdminPortfolioSnapshot,
  PortfolioAsset,
  PortfolioMetric,
  PortfolioMutationInput,
  PortfolioRecord,
  ReviewRecord,
} from "@/types/portfolio";

type PortfolioFormValues = PortfolioMutationInput;
type UploadKind = "cover" | "before" | "after" | "detail";
type AdminPortfolioShellProps = {
  initialPortfolios: PortfolioRecord[];
  initialReviews: ReviewRecord[];
  source: AdminPortfolioSnapshot["source"];
  databaseReady: boolean;
  uploadReady: boolean;
};

const inputClassName =
  "h-[56px] w-full border-0 border-b border-aztec/14 bg-transparent px-0 text-base font-medium tracking-tight text-aztec outline-none transition duration-300 placeholder:text-xanadu/65 focus:border-pine-green";

function emptyMetric(): PortfolioMetric {
  return {
    label: "",
    value: "",
  };
}

function buildBlankForm(): PortfolioFormValues {
  return {
    title: "",
    description: "",
    serviceType: "",
    location: "",
    completionDate: "",
    turnaroundTime: "",
    resultSummary: "",
    metrics: [emptyMetric()],
    featured: false,
    coverImage: null,
    beforeImage: null,
    afterImage: null,
    detailGallery: [],
  };
}

function toFormValues(portfolio: PortfolioRecord | null): PortfolioFormValues {
  if (!portfolio) {
    return buildBlankForm();
  }

  return {
    id: portfolio.id,
    title: portfolio.title,
    description: portfolio.description,
    serviceType: portfolio.serviceType,
    location: portfolio.location,
    completionDate: portfolio.completionDate.slice(0, 10),
    turnaroundTime: portfolio.turnaroundTime,
    resultSummary: portfolio.resultSummary,
    metrics: portfolio.metrics.length ? portfolio.metrics : [emptyMetric()],
    featured: portfolio.featured,
    coverImage: portfolio.coverImage,
    beforeImage: getPortfolioBeforeImage(portfolio),
    afterImage: getPortfolioAfterImage(portfolio),
    detailGallery: getPortfolioDetailImages(portfolio),
  };
}

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

function AdminField({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-pine-green">
        {label}
      </span>
      {children}
      {hint ? <p className="mt-3 text-sm leading-relaxed text-xanadu">{hint}</p> : null}
    </label>
  );
}

function UploadSurface({
  title,
  description,
  kind,
  multiple = false,
  assets,
  uploading,
  disabled,
  onUpload,
  onRemove,
}: {
  title: string;
  description: string;
  kind: UploadKind;
  multiple?: boolean;
  assets: PortfolioAsset[];
  uploading: boolean;
  disabled: boolean;
  onUpload: (kind: UploadKind, event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: (assetIndex: number) => void;
}) {
  const inputId = `portfolio-upload-${kind}`;

  return (
    <div className="border border-aztec/10 bg-[#f5f5f3] p-5 md:p-6">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-pine-green">
            {title}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-xanadu">
            {description}
          </p>
        </div>
        <label
          htmlFor={inputId}
          className={`inline-flex h-12 items-center justify-center gap-2 border px-5 text-sm font-semibold uppercase tracking-widest transition ${
            disabled
              ? "cursor-not-allowed border-aztec/10 bg-white/50 text-xanadu/55"
              : "cursor-pointer border-aztec/10 bg-white text-aztec hover:border-pine-green hover:text-pine-green"
          }`}
        >
          <CloudArrowUp size={16} weight="bold" />
          <span>{uploading ? "Uploading..." : multiple ? "Add Images" : "Upload Image"}</span>
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="sr-only"
          disabled={disabled || uploading}
          onChange={(event) => onUpload(kind, event)}
        />
      </div>

      {assets.length ? (
        <div className={`grid gap-3 ${multiple ? "sm:grid-cols-2" : ""}`}>
          {assets.map((asset, index) => (
            <div key={`${asset.url}-${index}`} className="overflow-hidden border border-aztec/10 bg-white">
              <div className="relative aspect-[16/10]">
                <Image src={asset.url} alt={asset.alt} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-pine-green">
                    {asset.kind}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-xanadu">{asset.alt}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  disabled={disabled}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-aztec/10 text-aztec transition hover:border-[#c76754] hover:text-[#c76754] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={`Remove ${title.toLowerCase()}`}
                >
                  <Trash size={16} weight="bold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[160px] items-center justify-center border border-dashed border-aztec/12 bg-white/50 p-6 text-center">
          <div>
            <ImageSquare size={28} className="mx-auto mb-4 text-pine-green" weight="duotone" />
            <p className="text-sm font-semibold uppercase tracking-widest text-aztec">
              No image uploaded yet
            </p>
            <p className="mt-3 text-sm leading-relaxed text-xanadu">
              {multiple
                ? "Upload one or more supporting visuals for the story sequence."
                : "Upload a single image to anchor this part of the case study."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBanner({
  databaseReady,
  uploadReady,
  source,
}: {
  databaseReady: boolean;
  uploadReady: boolean;
  source: AdminPortfolioSnapshot["source"];
}) {
  const isDemoMode = !databaseReady || source === "sample";
  const isConnectedButEmpty = databaseReady && source === "sample";

  if (!isDemoMode && uploadReady) {
    return (
      <div className="border border-white/10 bg-white/5 p-5 text-white/72 md:p-6">
        <div className="flex items-start gap-4">
          <CheckCircle size={20} className="mt-1 text-yellow-green" weight="fill" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-yellow-green">
              Live Content Ready
            </p>
            <p className="mt-3 text-base leading-relaxed">
              MongoDB and Cloudinary are connected, so new case studies, uploads, and moderated reviews can publish directly from this panel.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[#7e4033] bg-[#231613] p-5 text-white/72 md:p-6">
      <div className="flex items-start gap-4">
        <WarningCircle size={20} className="mt-1 text-[#f2b27a]" weight="fill" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f2b27a]">
            {isConnectedButEmpty ? "Archive Preview" : "Demo Mode"}
          </p>
          <p className="mt-3 text-base leading-relaxed">
            {isConnectedButEmpty
              ? "MongoDB is connected, but there are no live portfolio records yet, so the panel is showing the handcrafted sample archive until the first project is published."
              : "This panel is fully built, but the workspace is still using placeholder infrastructure. Add a real `MONGODB_URI` to enable publishing and moderation, and real Cloudinary keys to enable live uploads."}
          </p>
          {!uploadReady ? (
            <p className="mt-3 text-sm leading-relaxed text-white/56">
              Cloudinary uploads are currently disabled, so the upload surfaces are preview-only until the cloud name and live credentials are added.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function AdminPortfolioShell({
  initialPortfolios,
  initialReviews,
  source,
  databaseReady,
  uploadReady,
}: AdminPortfolioShellProps) {
  const router = useRouter();
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(
    initialPortfolios[0]?.id ?? null,
  );
  const [uploadingKind, setUploadingKind] = useState<UploadKind | null>(null);
  const [isSaving, startSaveTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isModerating, startModerationTransition] = useTransition();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  const selectedPortfolio = useMemo(
    () =>
      initialPortfolios.find((portfolio) => portfolio.id === selectedPortfolioId) ?? null,
    [initialPortfolios, selectedPortfolioId],
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<PortfolioFormValues>({
    defaultValues: toFormValues(selectedPortfolio),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "metrics",
  });

  const coverImage = watch("coverImage");
  const beforeImage = watch("beforeImage");
  const afterImage = watch("afterImage");
  const detailGallery = watch("detailGallery");
  const isFeatured = watch("featured");

  const pendingReviews = initialReviews.filter((review) => !review.approved);
  const writeDisabled = !databaseReady;

  useEffect(() => {
    reset(toFormValues(selectedPortfolio));
  }, [selectedPortfolio, reset]);

  const clearForm = () => {
    setSelectedPortfolioId(null);
    reset(buildBlankForm());
  };

  const handleUpload = async (kind: UploadKind, event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (!files.length) {
      return;
    }

    if (!uploadReady) {
      toast.error("Uploads unavailable", {
        description: "Add real Cloudinary credentials to enable live image uploads.",
      });
      return;
    }

    setUploadingKind(kind);

    try {
      const formData = new FormData();
      formData.append("kind", kind);
      files.forEach((file) => formData.append("files", file));

      const response = await fetch("/api/uploads/portfolio", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Image upload failed.");
      }

      const uploadedAssets = payload.assets as PortfolioAsset[];

      if (kind === "cover") {
        setValue("coverImage", uploadedAssets[0], { shouldDirty: true });
      } else if (kind === "before") {
        setValue("beforeImage", uploadedAssets[0], { shouldDirty: true });
      } else if (kind === "after") {
        setValue("afterImage", uploadedAssets[0], { shouldDirty: true });
      } else {
        setValue("detailGallery", [...getValues("detailGallery"), ...uploadedAssets], {
          shouldDirty: true,
        });
      }

      toast.success("Image uploaded", {
        description: "The asset is ready to be saved into the case study.",
      });
    } catch (error) {
      toast.error("Upload failed", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setUploadingKind(null);
    }
  };

  const onSubmit = handleSubmit((values) => {
    if (writeDisabled) {
      toast.error("Publishing disabled", {
        description: "Add a real MongoDB connection string to save portfolio content.",
      });
      return;
    }

    startSaveTransition(async () => {
      const result = await savePortfolioAction(values);

      if (!result.success || !result.data) {
        toast.error("Case study not saved", {
          description: result.message,
        });
        return;
      }

      toast.success("Case study saved", {
        description: result.message,
      });
      setSelectedPortfolioId(result.data.id);
      reset(toFormValues(result.data));
      router.refresh();
    });
  });

  const handleDeletePortfolio = (portfolio: PortfolioRecord) => {
    if (writeDisabled) {
      toast.error("Deletion disabled", {
        description: "Add a real MongoDB connection string to delete live content.",
      });
      return;
    }

    const confirmed = window.confirm(`Delete "${portfolio.title}"? This will also remove its reviews.`);

    if (!confirmed) {
      return;
    }

    startDeleteTransition(async () => {
      const result = await deletePortfolioAction(portfolio.id);

      if (!result.success) {
        toast.error("Delete failed", {
          description: result.message,
        });
        return;
      }

      toast.success("Case study deleted", {
        description: result.message,
      });

      if (selectedPortfolioId === portfolio.id) {
        clearForm();
      }

      router.refresh();
    });
  };

  const handleApproveReview = (review: ReviewRecord) => {
    if (writeDisabled) {
      toast.error("Moderation disabled", {
        description: "Add a real MongoDB connection string to moderate live reviews.",
      });
      return;
    }

    startModerationTransition(async () => {
      const result = await approveLandlordReviewAction(review.id);

      if (!result.success) {
        toast.error("Approval failed", {
          description: result.message,
        });
        return;
      }

      toast.success("Review approved", {
        description: result.message,
      });
      router.refresh();
    });
  };

  const handleDeleteReview = (review: ReviewRecord) => {
    if (writeDisabled) {
      toast.error("Moderation disabled", {
        description: "Add a real MongoDB connection string to moderate live reviews.",
      });
      return;
    }

    const confirmed = window.confirm(`Delete the review from ${review.landlordName}?`);

    if (!confirmed) {
      return;
    }

    startModerationTransition(async () => {
      const result = await deleteLandlordReviewAction(review.id);

      if (!result.success) {
        toast.error("Delete failed", {
          description: result.message,
        });
        return;
      }

      toast.success("Review deleted", {
        description: result.message,
      });
      router.refresh();
    });
  };

  return (
    <main className="min-h-screen bg-[#120f0c] text-white">
      <Navbar isAdmin onLogout={logoutAction} />
      <section className="border-b border-white/8 px-5 pb-10 pt-24 md:px-10 md:pb-14 md:pt-28 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="max-w-[880px]">
            <MotionEyebrow light>Hidden Portfolio Admin</MotionEyebrow>
            <h1 className="max-w-[780px] text-balance text-3xl font-medium leading-[1.0] tracking-tight text-white md:text-6xl lg:text-[76px]">
              Joseph & Co proof-of-work publishing and landlord review moderation.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/68 md:text-xl">
              Create cinematic case studies, attach handover imagery, and control exactly which landlord trust signals appear in the public portfolio.
            </p>
          </div>

          <div className="grid gap-3">
            {[
              { label: "Projects", value: String(initialPortfolios.length).padStart(2, "0") },
              { label: "Pending reviews", value: String(pendingReviews.length).padStart(2, "0") },
              { label: "Approved reviews", value: String(initialReviews.filter((review) => review.approved).length).padStart(2, "0") },
            ].map((item) => (
              <div key={item.label} className="border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
                <p className="mb-2 text-3xl font-medium leading-[1.05] tracking-tight text-white md:text-4xl">
                  {item.value}
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[1450px]">
          <StatusBanner databaseReady={databaseReady} uploadReady={uploadReady} source={source} />
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-aztec md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-[minmax(0,1.08fr)_380px] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border border-aztec/10 bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.06)] md:p-10"
          >
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <MotionEyebrow>{selectedPortfolio ? "Edit Project" : "Create Project"}</MotionEyebrow>
                <h2 className="text-xl font-medium leading-[1.1] tracking-tight text-aztec md:text-4xl">
                  {selectedPortfolio ? selectedPortfolio.title : "Build a new case study"}
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={clearForm}
                  className="inline-flex h-12 items-center justify-center gap-2 border border-aztec/10 px-5 text-sm font-semibold uppercase tracking-widest text-aztec transition hover:border-pine-green hover:text-pine-green"
                >
                  <Plus size={16} weight="bold" />
                  New
                </button>
                {selectedPortfolio ? (
                  <Link
                    href={`/portfolio/${selectedPortfolio.slug}`}
                    target="_blank"
                    className="inline-flex h-12 items-center justify-center gap-2 border border-aztec/10 px-5 text-sm font-semibold uppercase tracking-widest text-aztec transition hover:border-pine-green hover:text-pine-green"
                  >
                    <Eye size={16} weight="bold" />
                    Preview
                  </Link>
                ) : null}
              </div>
            </div>

            <form onSubmit={onSubmit} className="grid gap-8">
              <div className="grid gap-8 md:grid-cols-2">
                <AdminField label="Project title">
                  <input
                    {...register("title", { required: "Project title is required." })}
                    className={inputClassName}
                    placeholder="Clarendon House Turnaround"
                  />
                  {errors.title ? (
                    <p className="mt-3 text-sm font-medium text-[#c76754]">{errors.title.message}</p>
                  ) : null}
                </AdminField>

                <AdminField label="Service type">
                  <input
                    {...register("serviceType", { required: "Service type is required." })}
                    className={inputClassName}
                    placeholder="End Of Tenancy Cleaning"
                  />
                  {errors.serviceType ? (
                    <p className="mt-3 text-sm font-medium text-[#c76754]">
                      {errors.serviceType.message}
                    </p>
                  ) : null}
                </AdminField>

                <AdminField label="Location">
                  <input
                    {...register("location", { required: "Location is required." })}
                    className={inputClassName}
                    placeholder="Taunton, Somerset"
                  />
                  {errors.location ? (
                    <p className="mt-3 text-sm font-medium text-[#c76754]">{errors.location.message}</p>
                  ) : null}
                </AdminField>

                <AdminField label="Completion date">
                  <input
                    {...register("completionDate", { required: "Completion date is required." })}
                    type="date"
                    className={inputClassName}
                  />
                  {errors.completionDate ? (
                    <p className="mt-3 text-sm font-medium text-[#c76754]">
                      {errors.completionDate.message}
                    </p>
                  ) : null}
                </AdminField>

                <AdminField label="Turnaround time" hint="Example: 19 hours from key release to final sign-off">
                  <input
                    {...register("turnaroundTime", { required: "Turnaround time is required." })}
                    className={inputClassName}
                    placeholder="Single-day site handover clean"
                  />
                  {errors.turnaroundTime ? (
                    <p className="mt-3 text-sm font-medium text-[#c76754]">
                      {errors.turnaroundTime.message}
                    </p>
                  ) : null}
                </AdminField>

                <AdminField label="Featured placement" hint="Featured projects can lead the public archive.">
                  <button
                    type="button"
                    onClick={() => setValue("featured", !isFeatured, { shouldDirty: true })}
                    className={`inline-flex h-12 items-center gap-3 border px-5 text-sm font-semibold uppercase tracking-widest transition ${
                      isFeatured
                        ? "border-pine-green bg-pine-green text-white"
                        : "border-aztec/10 bg-[#f5f5f3] text-aztec hover:border-pine-green hover:text-pine-green"
                    }`}
                  >
                    <SealCheck size={16} weight="bold" />
                    <span>{isFeatured ? "Featured project" : "Standard project"}</span>
                  </button>
                </AdminField>
              </div>

              <AdminField label="Detailed work description">
                <textarea
                  {...register("description", { required: "Project description is required." })}
                  className="min-h-[180px] w-full resize-y border-0 border-b border-aztec/14 bg-transparent px-0 py-4 text-base font-medium tracking-tight text-aztec outline-none transition duration-300 placeholder:text-xanadu/65 focus:border-pine-green"
                  placeholder="Describe the site condition, the work sequence, and how the finish was achieved."
                />
                {errors.description ? (
                  <p className="mt-3 text-sm font-medium text-[#c76754]">{errors.description.message}</p>
                ) : null}
              </AdminField>

              <AdminField label="Result summary">
                <textarea
                  {...register("resultSummary", { required: "Result summary is required." })}
                  className="min-h-[120px] w-full resize-y border-0 border-b border-aztec/14 bg-transparent px-0 py-4 text-base font-medium tracking-tight text-aztec outline-none transition duration-300 placeholder:text-xanadu/65 focus:border-pine-green"
                  placeholder="Summarise the landlord-ready outcome and what changed for the client."
                />
                {errors.resultSummary ? (
                  <p className="mt-3 text-sm font-medium text-[#c76754]">
                    {errors.resultSummary.message}
                  </p>
                ) : null}
              </AdminField>

              <div className="grid gap-8 lg:grid-cols-2">
                <UploadSurface
                  title="Cover image"
                  description="The lead visual for the portfolio grid and case study hero."
                  kind="cover"
                  assets={coverImage ? [coverImage] : []}
                  uploading={uploadingKind === "cover"}
                  disabled={!uploadReady}
                  onUpload={handleUpload}
                  onRemove={() => setValue("coverImage", null, { shouldDirty: true })}
                />
                <UploadSurface
                  title="Before image"
                  description="Use this for the slider's left-hand comparison state."
                  kind="before"
                  assets={beforeImage ? [beforeImage] : []}
                  uploading={uploadingKind === "before"}
                  disabled={!uploadReady}
                  onUpload={handleUpload}
                  onRemove={() => setValue("beforeImage", null, { shouldDirty: true })}
                />
                <UploadSurface
                  title="After image"
                  description="Use this for the slider's right-hand comparison state."
                  kind="after"
                  assets={afterImage ? [afterImage] : []}
                  uploading={uploadingKind === "after"}
                  disabled={!uploadReady}
                  onUpload={handleUpload}
                  onRemove={() => setValue("afterImage", null, { shouldDirty: true })}
                />
                <UploadSurface
                  title="Supporting gallery"
                  description="Upload additional detail imagery to support the story sequence."
                  kind="detail"
                  multiple
                  assets={detailGallery}
                  uploading={uploadingKind === "detail"}
                  disabled={!uploadReady}
                  onUpload={handleUpload}
                  onRemove={(assetIndex) =>
                    setValue(
                      "detailGallery",
                      detailGallery.filter((_, index) => index !== assetIndex),
                      { shouldDirty: true },
                    )
                  }
                />
              </div>

              <div className="border border-aztec/10 bg-[#f5f5f3] p-5 md:p-6">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-pine-green">
                      Metrics
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-xanadu">
                      Add the proof points that should appear on the public case study page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => append(emptyMetric())}
                    className="inline-flex h-12 items-center justify-center gap-2 border border-aztec/10 bg-white px-5 text-sm font-semibold uppercase tracking-widest text-aztec transition hover:border-pine-green hover:text-pine-green"
                  >
                    <Plus size={16} weight="bold" />
                    Add Metric
                  </button>
                </div>

                <div className="grid gap-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                      <input
                        {...register(`metrics.${index}.label` as const)}
                        className={inputClassName}
                        placeholder="Metric label"
                      />
                      <input
                        {...register(`metrics.${index}.value` as const)}
                        className={inputClassName}
                        placeholder="Metric value"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (fields.length === 1) {
                            setValue("metrics", [emptyMetric()], { shouldDirty: true });
                            return;
                          }

                          remove(index);
                        }}
                        className="inline-flex h-12 w-12 items-center justify-center self-end border border-aztec/10 text-aztec transition hover:border-[#c76754] hover:text-[#c76754]"
                        aria-label="Remove metric"
                      >
                        <Trash size={16} weight="bold" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="max-w-xl text-sm leading-relaxed text-xanadu md:text-base">
                  Slugs are generated automatically from the project title, and any replaced Cloudinary assets are cleaned up when the record is saved or deleted.
                </p>
                <motion.div 
                  className="sticky bottom-4 z-30 mt-4 md:relative md:bottom-auto md:z-auto md:mt-0"
                  whileHover={writeDisabled || isSaving ? {} : { y: -2 }} 
                  whileTap={writeDisabled || isSaving ? {} : { scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full px-8 shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:w-auto md:shadow-none"
                    disabled={writeDisabled || isSaving}
                  >
                    {isSaving ? "Saving Case Study..." : selectedPortfolio ? "Update Case Study" : "Publish Case Study"}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>

          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="border border-aztec/10 bg-[#f5f5f3] p-6 md:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <MotionEyebrow>Project Library</MotionEyebrow>
                  <h2 className="text-xl font-medium leading-[1.1] tracking-tight text-aztec md:text-3xl">
                    Existing portfolio cases
                  </h2>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-aztec/10 text-aztec md:hidden"
                >
                  <CaretDown size={20} className={`transition-transform duration-300 ${isLibraryOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-xanadu md:text-base">
                Select a case study to edit it, preview the live route, or remove it entirely.
              </p>
            </motion.div>

            <div className={`${!isLibraryOpen ? "hidden md:grid" : "grid"} gap-4`}>
              {initialPortfolios.length ? (
                initialPortfolios.map((portfolio, index) => {
                  const isSelected = portfolio.id === selectedPortfolioId;

                return (
                  <motion.article
                    key={portfolio.id}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, delay: index * 0.05 }}
                    className={`overflow-hidden border transition ${
                      isSelected
                        ? "border-pine-green bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
                        : "border-aztec/10 bg-white"
                    }`}
                  >
                    <div className="relative aspect-[16/10]">
                      <Image src={portfolio.coverImage.url} alt={portfolio.coverImage.alt} fill className="object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold uppercase tracking-widest text-pine-green">
                          {portfolio.serviceType}
                        </p>
                        {portfolio.featured ? (
                          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-aztec">
                            <Sparkle size={14} className="text-pine-green" weight="fill" />
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <h3 className="text-xl font-medium leading-[1.1] tracking-tight text-aztec">
                        {portfolio.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-xanadu">
                        <MapPin size={14} className="text-pine-green" weight="fill" />
                        <span>{portfolio.location}</span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-xanadu">
                        {portfolio.resultSummary}
                      </p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-xanadu">
                        Completed {format(new Date(portfolio.completionDate), "dd MMM yyyy")}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPortfolioId(portfolio.id)}
                          className="inline-flex h-11 items-center justify-center gap-2 border border-aztec/10 text-sm font-semibold uppercase tracking-widest text-aztec transition hover:border-pine-green hover:text-pine-green"
                        >
                          <NotePencil size={16} weight="bold" />
                          Edit
                        </button>
                        <Link
                          href={`/portfolio/${portfolio.slug}`}
                          target="_blank"
                          className="inline-flex h-11 items-center justify-center gap-2 border border-aztec/10 text-sm font-semibold uppercase tracking-widest text-aztec transition hover:border-pine-green hover:text-pine-green"
                        >
                          <ArrowUpRight size={16} weight="bold" />
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeletePortfolio(portfolio)}
                          disabled={writeDisabled || isDeleting}
                          className="inline-flex h-11 items-center justify-center gap-2 border border-aztec/10 text-sm font-semibold uppercase tracking-widest text-[#8c4536] transition hover:border-[#c76754] hover:text-[#c76754] disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2"
                        >
                          <Trash size={16} weight="bold" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            ) : (
              <div className="border border-aztec/10 bg-white p-6 text-base leading-relaxed text-xanadu md:p-8">
                No portfolio cases exist yet. Use the form to publish the first one.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

      <section className="px-5 py-20 md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="flex w-full items-center justify-between">
              <div className="max-w-2xl">
                <MotionEyebrow light>Review Moderation</MotionEyebrow>
                <h2 className="text-xl font-medium leading-[1.1] tracking-tight text-white md:text-4xl">
                  Approve only the landlord reviews you want connected to each project.
                </h2>
              </div>
              <button 
                type="button"
                onClick={() => setIsReviewsOpen(!isReviewsOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
              >
                <CaretDown size={20} className={`transition-transform duration-300 ${isReviewsOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          <div className={`${!isReviewsOpen ? "hidden md:grid" : "grid"} gap-4`}>
            {initialReviews.length ? (
              initialReviews.map((review, index) => (
                <motion.article
                  key={review.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, delay: index * 0.05 }}
                  className="border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                            review.approved
                              ? "bg-yellow-green text-aztec"
                              : "border border-white/12 bg-transparent text-white/62"
                          }`}
                        >
                          {review.approved ? (
                            <CheckCircle size={14} weight="fill" />
                          ) : (
                            <WarningCircle size={14} weight="fill" />
                          )}
                          {review.approved ? "Approved" : "Awaiting approval"}
                        </span>
                        {review.portfolioTitle ? (
                          <span className="text-sm font-semibold uppercase tracking-widest text-yellow-green">
                            {review.portfolioTitle}
                          </span>
                        ) : null}
                      </div>
                      <p className="mb-5 text-lg font-medium leading-relaxed tracking-tight text-white md:text-xl">
                        {review.comment}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-widest text-white/50">
                        <span className="text-yellow-green">{review.landlordName}</span>
                        <span>{review.company}</span>
                        <span>{format(new Date(review.createdAt), "dd MMM yyyy")}</span>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:w-[320px]">
                      <button
                        type="button"
                        onClick={() => handleApproveReview(review)}
                        disabled={writeDisabled || isModerating || review.approved}
                        className="inline-flex h-11 items-center justify-center gap-2 border border-yellow-green/25 bg-yellow-green text-sm font-semibold uppercase tracking-widest text-aztec transition hover:bg-[#b9f53a] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <CheckCircle size={16} weight="bold" />
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(review)}
                        disabled={writeDisabled || isModerating}
                        className="inline-flex h-11 items-center justify-center gap-2 border border-white/12 text-sm font-semibold uppercase tracking-widest text-white transition hover:border-[#c76754] hover:text-[#f6c1b6] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash size={16} weight="bold" />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="border border-white/10 bg-white/5 p-6 text-base leading-relaxed text-white/60 md:p-8">
                Review submissions will appear here once landlords start sending feedback from portfolio detail pages.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
