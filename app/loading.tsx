export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--paper)]">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--brand-blue)] [animation-delay:0ms]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--energy-cyan)] [animation-delay:120ms]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--solar-lime)] [animation-delay:240ms]" />
      </div>
    </div>
  );
}
