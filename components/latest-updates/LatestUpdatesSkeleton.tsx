export default function LatestUpdatesSkeleton() {
  return (
    <section
      className="bg-aztec py-16 md:py-24 px-5 md:px-10 lg:px-20"
      aria-busy="true"
      aria-label="Loading latest highlights"
    >
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-10 md:mb-14 max-w-2xl space-y-4">
          <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
          <div className="h-10 w-full max-w-lg animate-pulse rounded bg-white/10" />
          <div className="h-5 w-full max-w-md animate-pulse rounded bg-white/8" />
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl bg-white/8 animate-pulse ${
                index === 0 ? "col-span-2 row-span-2 aspect-[4/5] md:aspect-auto md:min-h-[420px]" : "aspect-[4/5]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
