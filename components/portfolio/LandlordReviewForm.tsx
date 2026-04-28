"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Sparkle, Star } from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import { submitLandlordReviewAction } from "@/app/actions/portfolio";

type ReviewFormValues = {
  landlordName: string;
  company: string;
  rating: number;
  comment: string;
};

const inputClassName =
  "h-[56px] w-full border-0 border-b border-white/14 bg-transparent px-0 text-base font-medium tracking-tight text-white outline-none transition duration-300 placeholder:text-white/45 focus:border-yellow-green";

export default function LandlordReviewForm({
  portfolioId,
}: {
  portfolioId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: {
      landlordName: "",
      company: "",
      rating: 5,
      comment: "",
    },
  });

  const selectedRating = watch("rating");

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const result = await submitLandlordReviewAction({
        portfolioId,
        ...values,
      });

      if (!result.success) {
        toast.error("Review not submitted", {
          description: result.message,
        });
        return;
      }

      toast.success("Review sent for moderation", {
        description: "Joseph & Co will review it before publishing.",
      });
      reset({
        landlordName: "",
        company: "",
        rating: 5,
        comment: "",
      });
    });
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={onSubmit}
      className="border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
    >
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Landlord Review
          </p>
          <h3 className="text-xl font-medium leading-[1.1] tracking-tight text-white md:text-2xl">
            Add your handover note.
          </h3>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/50">
          <Sparkle size={16} className="text-yellow-green" weight="fill" />
          Moderated before publishing
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <label className="block">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Landlord Name
          </span>
          <input
            {...register("landlordName", {
              required: "Landlord name is required.",
              minLength: {
                value: 2,
                message: "Please enter at least 2 characters.",
              },
            })}
            className={inputClassName}
            placeholder="Your name"
          />
          {errors.landlordName ? (
            <p className="mt-3 text-sm font-medium text-[#ffb6a6]">
              {errors.landlordName.message}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Company
          </span>
          <input
            {...register("company", {
              required: "Company name is required.",
            })}
            className={inputClassName}
            placeholder="Lettings or property company"
          />
          {errors.company ? (
            <p className="mt-3 text-sm font-medium text-[#ffb6a6]">
              {errors.company.message}
            </p>
          ) : null}
        </label>

        <div className="md:col-span-2">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Rating
          </span>
          <div className="grid grid-cols-5 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.button
                key={rating}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setValue("rating", rating, { shouldValidate: true })}
                className={`inline-flex h-12 items-center justify-center gap-2 border text-xs font-semibold uppercase tracking-widest transition duration-300 sm:min-w-[76px] sm:px-4 sm:text-sm ${
                  selectedRating === rating
                    ? "border-yellow-green bg-yellow-green text-aztec"
                    : "border-white/12 bg-transparent text-white/75 hover:border-yellow-green/50 hover:text-white"
                }`}
              >
                <Star size={16} weight={selectedRating >= rating ? "fill" : "regular"} />
                <span className={rating > 5 ? "hidden sm:inline" : ""}>{rating}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <label className="block md:col-span-2">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Comment
          </span>
          <textarea
            {...register("comment", {
              required: "A review comment is required.",
              minLength: {
                value: 20,
                message: "Please add a little more detail to the review.",
              },
            })}
            className="min-h-[160px] w-full resize-y border-0 border-b border-white/14 bg-transparent px-0 py-4 text-base font-medium tracking-tight text-white outline-none transition duration-300 placeholder:text-white/45 focus:border-yellow-green"
            placeholder="How did the result feel at handover, inspection, or tenant ready stage?"
          />
          {errors.comment ? (
            <p className="mt-3 text-sm font-medium text-[#ffb6a6]">
              {errors.comment.message}
            </p>
          ) : null}
        </label>
      </div>

      <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-base leading-relaxed text-white/58">
          Reviews are stored privately first, then approved before they appear in the public testimonial section.
        </p>
        <motion.div whileHover={isPending ? {} : { y: -2 }} whileTap={isPending ? {} : { scale: 0.98 }}>
          <Button
            type="submit"
            variant="primary"
            className="w-full px-8 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
            disabled={isPending}
          >
            {isPending ? "Submitting Review..." : "Submit Review"}
          </Button>
        </motion.div>
      </div>
    </motion.form>
  );
}
