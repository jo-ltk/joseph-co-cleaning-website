import { WarningCircle } from "@phosphor-icons/react/dist/ssr";

type Props = {
  variant: "empty" | "error";
  message: string;
};

export default function LatestUpdatesStates({ variant, message }: Props) {
  const isError = variant === "error";

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[28px] border px-6 py-14 text-center md:rounded-[36px] md:px-10 md:py-16 ${
        isError
          ? "border-white/15 bg-white/5"
          : "border-white/10 bg-white/[0.03]"
      }`}
      role={isError ? "alert" : "status"}
    >
      {isError && (
        <WarningCircle
          size={36}
          weight="duotone"
          className="mb-4 text-yellow-green"
          aria-hidden
        />
      )}
      <p
        className="max-w-md text-sm leading-relaxed text-white/75 md:text-base"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {message}
      </p>
    </div>
  );
}
