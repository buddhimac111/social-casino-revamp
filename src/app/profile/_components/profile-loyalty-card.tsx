import type { ComponentType } from "react";
import { ChartLine, Clock, EllipsisVertical, Gift, Wallet } from "lucide-react";

type LoyaltyMetricTone = "primary" | "gold" | "success";

type LoyaltyMetric = {
  id: string;
  label: string;
  value: string;
  tone: LoyaltyMetricTone;
  icon: ComponentType<{ className?: string }>;
};

const loyaltyMetrics: LoyaltyMetric[] = [
  {
    id: "current-balance",
    label: "Current Balance",
    value: "9200 Points",
    tone: "primary",
    icon: Wallet,
  },
  {
    id: "lifetime-earned",
    label: "Lifetime Earned",
    value: "9200 Points",
    tone: "gold",
    icon: ChartLine,
  },
  {
    id: "lifetime-redeem",
    label: "Lifetime Redeem",
    value: "9200 Points",
    tone: "success",
    icon: Gift,
  },
];

export function ProfileLoyaltyCard() {
  return (
    <aside className="rounded-3xl border border-border-ash bg-card p-5 shadow-sm md:p-0">
      <div className="flex items-start justify-between gap-3 px-6 py-4">
        <h2 className="text-lg font-semibold text-header-blue md:text-xl">
          Loyalty Status
        </h2>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-icon-ash hover:bg-accent-blue/60"
          aria-label="More options"
        >
          <EllipsisVertical className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div className="h-px bg-border-ash" />

      {/* Web / desktop layout (stacked cards) */}
      <div className="mt-5 hidden px-6 space-y-3 md:block md:space-y-4">
        {loyaltyMetrics.map((metric) => (
          <LoyaltyMetricCard key={metric.id} {...metric} variant="stacked" />
        ))}
      </div>

      {/* Mobile layout (compact horizontal cards) */}
      <div className="mt-4 md:hidden">
        <div className="rounded-3xl bg-accent-blue/70 px-3 py-4">
          <div className="grid grid-cols-3 gap-3">
            {loyaltyMetrics.map((metric) => (
              <LoyaltyMetricCard key={metric.id} {...metric} variant="compact" />
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-white px-3 py-3 text-[11px] text-text-ash shadow-sm">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full bg-accent-blue/80 text-main-green">
                <Clock className="size-3.5" aria-hidden="true" />
              </span>
              <p>
                <span className="font-semibold text-main-green">520 Points</span>{" "}
                will expire by{" "}
                <span className="font-semibold text-header-blue">
                  30th April 2026
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 h-px bg-border-ash" />

      {/* Web / desktop expiry notice */}
      <div className="mx-6 my-4 hidden rounded-xl border border-border-ash px-4 py-3 text-xs text-text-ash shadow-sm md:block md:px-5 md:text-sm">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-text text-text-ash">
            <Clock className="size-6" aria-hidden="true" />
          </span>
          <p>
            <span className="font-semibold text-main-green">520 Points</span>{" "}
            will expire by{" "}
            <span className="font-semibold">
              30th April 2026
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
}

type LoyaltyMetricCardProps = LoyaltyMetric & {
  variant: "stacked" | "compact";
};

function LoyaltyMetricCard({
  label,
  value,
  tone,
  icon: Icon,
  variant,
}: LoyaltyMetricCardProps) {
  const toneHeaderBg: Record<LoyaltyMetricTone, string> = {
    primary: "bg-header-blue",
    gold: "bg-gold",
    success: "bg-main-green",
  };

  const isCompact = variant === "compact";
  const headerBg = toneHeaderBg[tone];

  return (
    <div className="overflow-hidden rounded-2xl border border-border-ash bg-white shadow-sm">
      <div
        className={`flex items-center justify-center gap-2.5 ${headerBg} ${isCompact ? "px-3 py-2.5" : "px-4 py-3"
          }`}
      >
        <span className="grid size-8 place-items-center rounded-xl bg-white/10">
          <Icon className="size-4 text-white" aria-hidden="true" />
        </span>
        <span
          className={`font-medium text-white ${isCompact ? "text-[11px]" : "text-sm"
            }`}
        >
          {label}
        </span>
      </div>
      <div
        className={`${isCompact ? "px-3 py-2.5" : "px-4 py-3"} text-center`}
      >
        <p
          className={`font-semibold text-text-ash ${isCompact ? "text-xs" : "text-base"
            }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
