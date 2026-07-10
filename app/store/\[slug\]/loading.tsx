export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-[var(--paper)] px-4 pt-36 md:px-8 md:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="h-4 w-48 animate-pulse rounded-full bg-[var(--line)]" />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-[2.5rem] bg-[var(--mist)]" />
          <div>
            <div className="h-8 w-3/4 animate-pulse rounded-2xl bg-[var(--mist)]" />
            <div className="mt-2 h-4 w-1/3 animate-pulse rounded-xl bg-[var(--mist)]" />
            <div className="mt-6 h-10 w-32 animate-pulse rounded-2xl bg-[var(--mist)]" />
            <div className="mt-6 space-y-3">
              <div className="h-4 animate-pulse rounded-xl bg-[var(--mist)]" />
              <div className="h-4 w-11/12 animate-pulse rounded-xl bg-[var(--mist)]" />
              <div className="h-4 w-3/4 animate-pulse rounded-xl bg-[var(--mist)]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
