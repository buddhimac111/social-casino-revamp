import Image from "next/image";
import CustomButton from "@/components/common/CustomButton";

export function ProfileBanner() {
  return (
    <section className="overflow-hidden rounded-3xl border border-border-ash bg-card shadow-sm">
      <div className="relative h-[170px] md:h-[200px] lg:h-[210px]">
        <Image
          src="/media/banner.jpeg"
          alt="Profile banner"
          fill
          priority
          sizes="(min-width: 1024px) 1040px, 100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-black/5 to-transparent" />
      </div>
      <div className="-mt-14 rounded-3xl bg-card px-5 pb-5 pt-5 shadow-md md:-mt-16 md:flex md:items-center md:justify-between md:px-6 md:pb-6 md:pt-6 lg:px-8">
        <div className="flex flex-1 items-center gap-4 md:gap-6">
          <div className="relative -mt-12 shrink-0 md:-mt-14">
            <div className="rounded-full border-4 border-card bg-card shadow-md">
              <Image
                src="/media/profile_sample_1.jpg"
                alt="Profile avatar"
                width={170}
                height={170}
                className="rounded-full object-cover"
              />
            </div>

          </div>

          <div className="flex flex-col text-header-blue mt-12">
            <h1 className="text-lg font-semibold leading-tight md:text-xl lg:text-2xl">
              Iddhi Dassanayake
            </h1>
            <p className="text-xs font-medium text-text-ash md:text-sm">
              @iddhikumarA.social
            </p>
            <p className="mt-1 text-xs font-medium text-text-ash md:text-sm">
              Together We Stand Strong
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col items-stretch gap-3 md:mt-0 md:max-w-[380px] md:items-end">
          <div className="flex w-full flex-wrap items-center justify-start gap-3 md:justify-end">
            <StatPill label="Followers" value="12.7K" />
            <StatPill label="Following" value="221" />
            <StatPill
              label="Posts"
              value="54"
              className="hidden sm:flex"
            />
          </div>
          <div className="flex w-full flex-wrap justify-start gap-3 md:justify-end">
            <CustomButton
              text="Edit Profile"
              variant="bordered"
              additionalTailwindClass="h-10 min-w-[96px] md:min-w-[170px] px-6 text-sm"
            />
            <CustomButton
              text="Invite & Earn"
              variant="full"
              additionalTailwindClass="h-10 min-w-[96px] md:min-w-[170px] px-6 text-sm"
            />
          </div>
        </div>
      </div>

    </section>
  );
}

type StatPillProps = {
  label: string;
  value: string;
  className?: string;
};

function StatPill({ label, value, className }: StatPillProps) {
  return (
    <div
      className={`inline-flex min-w-[96px] flex-col items-center justify-center rounded-xl bg-card/95 px-3 py-2 text-center text-xs font-medium text-header-blue shadow-sm ring-1 ring-border-ash/70 backdrop-blur-sm md:min-w-[110px] md:px-4 md:py-2.5 md:text-sm ${className ?? ""}`}
    >
      <span className="text-base text-main-green font-bold md:text-lg">{value}</span>
      <span className="mt-0.5 text-[11px] text-text-ash md:text-xs">
        {label}
      </span>
    </div>
  );
}

