import Image from "next/image";
import CustomButton from "@/components/common/CustomButton";
import { StatPill } from "./profile-stat-pill";

export function ProfileBannerMobile() {
  return (
    <section className="block overflow-hidden rounded-3xl border border-border-ash bg-card shadow-sm lg:hidden">
      <div className="relative h-[180px]">
        <Image
          src="/media/banner.jpeg"
          alt="Profile banner"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-transparent" />
      </div>
      <div className="-mt-16 flex flex-col items-center rounded-3xl bg-card px-3 pb-5 pt-5 shadow-md">
        <div className="flex flex-col items-center">
          <div className="relative -mt-16 mb-3">
            <div className="rounded-full border-4 border-card bg-card shadow-md">
              <Image
                src="/media/profile_sample_1.jpg"
                alt="Profile avatar"
                width={130}
                height={130}
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-lg font-semibold leading-tight text-header-blue">
            Iddhi Dassanayake
          </h1>
          <p className="text-xs font-medium text-text-ash">
            @iddhikumarA.social
          </p>
          <p className="mt-1 text-xs font-medium text-text-ash">
            Together We Stand Strong
          </p>
        </div>

        <div className="mt-4 flex w-full flex-col items-center gap-3">
          <div className="flex w-full flex-wrap items-center justify-center gap-3">
            <StatPill label="Followers" value="12.7K" />
            <StatPill label="Following" value="221" />
            <StatPill label="Posts" value="54" />
          </div>
          <div className="flex w-full flex-wrap justify-center gap-3">
            <CustomButton
              text="Edit Profile"
              variant="bordered"
              additionalTailwindClass="h-10 min-w-[140px] px-6 text-sm"
            />
            <CustomButton
              text="Invite & Earn"
              variant="full"
              additionalTailwindClass="h-10 min-w-[140px] px-6 text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

