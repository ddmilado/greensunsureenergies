export default function StoreLoading() {
  return (
    <div className="min-h-screen bg-[var(--ink-950)] px-4 pt-40 md:px-8 md:pt-48">
      <div className="mx-auto max-w-7xl">
        <div className="h-4 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="mt-4 h-12 w-96 animate-pulse rounded-2xl bg-white/10" />
        <div className="mt-5 h-6 w-72 animate-pulse rounded-xl bg-white/8" />

        <div className="mt-16 grid gap-8 lg:grid-cols-[220px_1fr]">
          <div className="grid gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 animate-pulse rounded-xl bg-white/8" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="overflow-hidden rounded-[2rem] bg-[var(--shell)] p-1.5">
                <div className="aspect-square animate-pulse rounded-[1.6rem] bg-[var(--mist)]" />
                <div className="p-4">
                  <div className="h-5 w-3/4 animate-pulse rounded-lg bg-[var(--mist)]" />
                  <div className="mt-1 h-3 w-1/3 animate-pulse rounded-md bg-[var(--mist)]" />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="h-6 w-20 animate-pulse rounded-lg bg-[var(--mist)]" />
                    <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--mist)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
