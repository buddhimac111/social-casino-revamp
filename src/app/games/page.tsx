import MainLayout from "@/layouts/MainLayout";


export default function Games() {
    return (
      <MainLayout>
        <section className="rounded-3xl border border-border-ash bg-background p-6 md:p-8">
          <h1 className="text-2xl font-bold text-header-blue md:text-3xl">Games</h1>
          <p className="mt-2 text-text-ash">Games page </p>
        </section>
      </MainLayout>
    );
  }