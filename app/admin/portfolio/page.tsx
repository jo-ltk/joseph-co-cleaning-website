import type { Metadata } from "next";

import AdminPortfolioShell from "@/components/portfolio/AdminPortfolioShell";
import { getAdminPortfolioSnapshot } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio Admin | Joseph.co",
  description: "Hidden Joseph & Co portfolio publishing and review moderation panel.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPortfolioPage() {
  const snapshot = await getAdminPortfolioSnapshot();

  return (
    <AdminPortfolioShell
      initialPortfolios={snapshot.portfolios}
      initialReviews={snapshot.reviews}
      source={snapshot.source}
      databaseReady={snapshot.databaseReady}
      uploadReady={snapshot.uploadReady}
    />
  );
}
