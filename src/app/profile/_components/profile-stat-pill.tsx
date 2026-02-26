type StatPillProps = {
  label: string;
  value: string;
  className?: string;
};

export function StatPill({ label, value, className }: StatPillProps) {
  return (
    <div
      className={`inline-flex min-w-[90px] flex-col items-center justify-center rounded-xl bg-card/95 px-3 py-2 text-center text-xs font-medium text-header-blue shadow-sm ring-1 ring-border-ash/70 backdrop-blur-sm md:min-w-[110px] md:px-4 md:py-2.5 md:text-sm ${className ?? ""}`}
    >
      <span className="text-base text-main-green font-bold md:text-lg">
        {value}
      </span>
      <span className="mt-0.5 text-[11px] text-text-ash md:text-xs">
        {label}
      </span>
    </div>
  );
}

