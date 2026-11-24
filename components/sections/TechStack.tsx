import { TechPills } from "@/components/ui/TechPills";

export function TechStack() {
  return (
    <section className="px-5 py-5" aria-labelledby="techstack-heading">
      <h2
        id="techstack-heading"
        className="mb-3 text-center text-[11.5px] font-semibold tracking-wide text-foreground"
      >
        TECH STACK
      </h2>

      <TechPills className="mx-auto max-w-[640px]" />
    </section>
  );
}
