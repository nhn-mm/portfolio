import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EasterEgg } from "@/components/EasterEgg";

export function AboutSection() {
  return (
    <section id="about" className="pt-12 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper>
          <h2 className="text-3xl md:text-4xl font-bold text-light-100 mb-8">
            About Me
          </h2>

          <p className="text-light-300 text-lg leading-relaxed mb-8">
            I am a Senior Software Engineer with extensive experience building
            scalable web and mobile applications. I specialize in React, Next.js,
            React Native, and Golang, with a strong focus on delivering clean,
            maintainable code and intuitive user experiences. I enjoy solving
            complex problems and collaborating with cross-functional teams to
            ship high-quality products. <EasterEgg id="about" className="text-xs" />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-light-100 mb-2">
                Education
              </h3>
              <p className="text-light-300">B.C.Sc.</p>
              <p className="text-light-400">Magway Computer University</p>
              <p className="text-light-400">2011 - 2017</p>
            </div>

            <div className="bg-dark-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-light-100 mb-2">
                Location
              </h3>
              <p className="text-light-300">92/20 Alley - Suphaphong 1, Nong Bon, Prawet, Bangkok</p>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
