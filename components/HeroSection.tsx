import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EasterEgg } from "@/components/EasterEgg";

export function HeroSection() {
  return (
    <section id="hero" className="pt-24 pb-12 flex items-center justify-center">
      <ScrollAnimationWrapper className="text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-light-100 mb-4">
          Naing Htet Naing
        </h1>
        <p className="text-xl md:text-2xl text-light-400">
          Senior Software Engineer<EasterEgg id="hero" className="ml-1 text-xs" />
        </p>
      </ScrollAnimationWrapper>
    </section>
  );
}
