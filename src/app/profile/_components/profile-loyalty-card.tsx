export function ProfileLoyaltyCard() {
  return (
    <aside className="rounded-3xl border border-border-ash bg-card p-5 shadow-sm md:p-6 lg:p-7">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-header-blue md:text-xl">
          Loyalty Status
        </h2>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-ash text-icon-ash hover:bg-accent-blue"
          aria-label="More options"
        >
          <span className="block h-0.5 w-0.5 rounded-full bg-icon-ash shadow-[0_4px_0_0_rgba(148,163,184,1),0_-4px_0_0_rgba(148,163,184,1)]" />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <LoyaltyMetricCard
          label="Current Balance"
          value="9200 Points"
          tone="primary"
        />
        <LoyaltyMetricCard
          label="Lifetime Earned"
          value="9200 Points"
          tone="gold"
        />
        <LoyaltyMetricCard
          label="Lifetime Redeem"
          value="9200 Points"
          tone="success"
        />
      </div>

      <div className="mt-5 rounded-2xl border border-border-ash bg-accent-blue/70 px-4 py-3 text-xs text-text-ash md:px-5 md:text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-main-green" />
          <p>
            <span className="font-semibold text-header-blue">520 Points</span>{" "}
            will expire by <span className="font-semibold">30th April 2026</span>
          </p>
        </div>
      </div>
    </aside>
  );
}

type LoyaltyMetricCardProps = {
  label: string;
  value: string;
  tone: "primary" | "gold" | "success";
};

function LoyaltyMetricCard({ label, value, tone }: LoyaltyMetricCardProps) {
  const toneClasses: Record<
    LoyaltyMetricCardProps["tone"],
    { container: string; badge: string }
  > = {
    primary: {
      container: "bg-header-blue text-white",
      badge: "bg-white/10 text-white",
    },
    gold: {
      container: "bg-gold text-header-blue",
      badge: "bg-white/20 text-header-blue",
    },
    success: {
      container: "bg-main-green text-white",
      badge: "bg-white/10 text-white",
    },
  };

  const { container, badge } = toneClasses[tone];

  return (
    <div
      className={`flex items-center justify-between rounded-2xl px-4 py-4 text-sm shadow-sm md:px-5 md:py-4.5 ${container}`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium opacity-90 md:text-sm">
          {label}
        </span>
        <span className="text-base font-semibold md:text-lg">{value}</span>
      </div>
      <span
        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium md:text-xs ${badge}`}
      >
        Loyalty
      </span>
    </div>
  );
}

