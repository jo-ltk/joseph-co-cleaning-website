import { Suspense } from "react";

import LatestUpdatesGrid from "@/components/latest-updates/LatestUpdatesGrid";
import LatestUpdatesSkeleton from "@/components/latest-updates/LatestUpdatesSkeleton";
import LatestUpdatesStates from "@/components/latest-updates/LatestUpdatesStates";
import LatestUpdatesIntro from "@/components/latest-updates/LatestUpdatesIntro";
import {
  getLatestInstagramMedia,
  instagramStatusLabel,
} from "@/lib/instagram-service";

async function LatestUpdatesContent() {
  const result = await getLatestInstagramMedia();
  const showGrid = result.status === "success" && result.items.length > 0;
  const stateVariant =
    result.status === "error" ? "error" : ("empty" as const);
  const stateMessage =
    result.errorMessage ??
    instagramStatusLabel(
      result.status === "error"
        ? "error"
        : result.status === "not_configured"
          ? "not_configured"
          : "empty",
    );

  return (
    <section
      id="behind-the-build"
      className="scroll-mt-24 bg-aztec py-16 md:py-24 px-5 md:px-10 lg:px-20 text-white"
    >
      <div className="mx-auto max-w-[1450px]">
        <LatestUpdatesIntro />

        {showGrid ? (
          <LatestUpdatesGrid items={result.items} />
        ) : (
          <LatestUpdatesStates variant={stateVariant} message={stateMessage} />
        )}
      </div>
    </section>
  );
}

export default function LatestUpdatesSection() {
  return (
    <Suspense fallback={<LatestUpdatesSkeleton />}>
      <LatestUpdatesContent />
    </Suspense>
  );
}
