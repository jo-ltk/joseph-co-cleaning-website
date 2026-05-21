import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PortfolioLoading() {
  return (
    <main className="relative min-h-screen bg-[#120f0c]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <div className="mb-12 h-4 w-40 animate-pulse rounded bg-white/10" />
        <div className="mb-6 h-16 max-w-2xl animate-pulse rounded bg-white/10" />
        <div className="mb-16 h-6 max-w-xl animate-pulse rounded bg-white/5" />
        <div className="grid gap-8 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden border border-white/10 bg-white/5"
            >
              <div className="aspect-[16/10] animate-pulse bg-white/10" />
              <div className="space-y-4 p-8">
                <div className="h-4 w-1/3 animate-pulse rounded bg-white/10" />
                <div className="h-8 w-2/3 animate-pulse rounded bg-white/10" />
                <div className="h-16 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
