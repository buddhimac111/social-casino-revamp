export function ProfileAboutCard() {
  return (
    <div className="rounded-3xl border border-border-ash bg-card p-5 shadow-sm md:p-6 lg:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-header-blue md:text-xl">
            About Me
          </h2>
        </div>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-ash text-icon-ash hover:bg-accent-blue"
          aria-label="More options"
        >
          <span className="block h-0.5 w-0.5 rounded-full bg-icon-ash shadow-[0_4px_0_0_rgba(148,163,184,1),0_-4px_0_0_rgba(148,163,184,1)]" />
        </button>
      </div>

      <div className="mt-5 rounded-full bg-accent-blue/80 p-1 text-xs font-semibold text-text-ash md:text-sm">
        <div className="grid grid-cols-4 gap-1">
          <TabPill label="Text" active />
          <TabPill label="Photo" />
          <TabPill label="Video" />
          <TabPill label="Voice" />
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-border-ash bg-accent-blue/40 p-4 text-xs text-text-ash md:p-5 md:text-sm lg:text-[15px]">
        <p className="leading-relaxed">
          Hi there! 👋 I&apos;m Iddhi Dassanayake, an AI enthusiast. When I&apos;m
          not crunching numbers or optimizing algorithms, you can find me
          staring at the sky. Lorem ipsum dolor sit amet consectetur
          adipiscing, elit mattis porta hendrerit eget parturient fusce,
          egestas netus habitasse iaculis aliquam. Natoque nostra laoreet
          aptent ornare nisi cubilia condimentum integer sem.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <SocialPill label="@iddhidassanayake" platform="whatsapp" />
        <SocialPill label="@iddhidassanayake" platform="telegram" />
        <SocialPill label="@iddhidassanayake" platform="instagram" />
        <SocialPill label="+94 12 345 6789" platform="phone" />
      </div>
    </div>
  );
}

type TabPillProps = {
  label: string;
  active?: boolean;
};

function TabPill({ label, active }: TabPillProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full px-3 py-2 transition-colors ${
        active
          ? "bg-main-green text-white shadow-sm"
          : "text-text-ash hover:bg-accent-blue"
      }`}
    >
      {label}
    </button>
  );
}

type SocialPillProps = {
  label: string;
  platform: "whatsapp" | "telegram" | "instagram" | "phone";
};

function SocialPill({ label, platform }: SocialPillProps) {
  const platformColorMap: Record<SocialPillProps["platform"], string> = {
    whatsapp: "bg-main-green/10 text-main-green",
    telegram: "bg-header-blue/5 text-header-blue",
    instagram: "bg-red/5 text-red",
    phone: "bg-main-green/10 text-main-green",
  };

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-border-ash bg-card px-3 py-2 text-xs font-medium text-text-ash shadow-sm md:px-4 md:text-sm"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-semibold ${platformColorMap[platform]}`}
      >
        {platform === "phone" ? "📞" : "@"}
      </span>
      <span>{label}</span>
    </button>
  );
}

