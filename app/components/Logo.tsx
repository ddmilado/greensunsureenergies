import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/assets/greensunsure-logo-Cf3zECsy.jpeg"
        alt=""
        width={40}
        height={40}
        className="size-9 shrink-0 rounded-full object-cover sm:size-10"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-white">
          Green Sunsure
        </span>
        <span className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--solar-lime)] sm:block">
          Energy Solution
        </span>
      </span>
    </span>
  );
}
