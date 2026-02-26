import Image from "next/image";
import CustomButton from "@/components/common/CustomButton";
import { StatPill } from "./profile-stat-pill";

export function ProfileBannerDesktop() {
  return (
    <section className="hidden overflow-hidden rounded-3xl border border-border-ash bg-card shadow-sm md:block">
      <div className="relative h-[200px] lg:h-[210px]">
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
      <div className="-mt-16 flex rounded-3xl bg-card px-6 pb-6 pt-6 shadow-md lg:px-8">
        <div className="flex flex-1 items-center gap-6">
          <div className="relative -mt-14 shrink-0">
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

          <div className="mt-12 flex flex-col text-header-blue">
            <h1 className="text-xl font-semibold leading-tight lg:text-2xl">
              Iddhi Dassanayake
            </h1>
            <p className="text-sm font-medium text-text-ash">
              @iddhikumarA.social
            </p>
            <p className="mt-1 text-sm font-medium text-text-ash">
              Together We Stand Strong
            </p>
          </div>
        </div>

        <div className="mt-0 flex flex-1 flex-col items-end gap-3 md:max-w-[380px]">
          <div className="flex w-full flex-wrap items-center justify-end gap-3">
            <StatPill label="Followers" value="12.7K" />
            <StatPill label="Following" value="221" />
            <StatPill label="Posts" value="54" />
          </div>
          <div className="flex w-full flex-wrap justify-end gap-3">
            <CustomButton
              text="Edit Profile"
              variant="bordered"
              additionalTailwindClass="h-10 min-w-[170px] px-6 text-sm"
            />
            <CustomButton
              text="Invite & Earn"
              variant="full"
              additionalTailwindClass="h-10 min-w-[170px] px-6 text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

