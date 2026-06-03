import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EasterEgg } from "@/components/EasterEgg";

export function ContactSection() {
  return (
    <section id="contact" className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper>
          <h2 className="text-3xl md:text-4xl font-bold text-light-100 mb-8">
            Contact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <span className="text-accent-400 text-xl">📞</span>
              <div className="flex flex-col">
                <a
                  href="tel:+959423911746"
                  className="text-light-300 hover:text-accent-400 transition-colors"
                >
                  +959423911746
                </a>
                <a
                  href="tel:+660990430410"
                  className="text-light-300 hover:text-accent-400 transition-colors"
                >
                  0990430410 (Thailand)
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-accent-400 text-xl">✉️</span>
              <a
                href="mailto:nhn.pain@gmail.com"
                className="text-light-300 hover:text-accent-400 transition-colors"
              >
                nhn.pain@gmail.com
              </a>
              <EasterEgg id="contact-email" className="text-xs" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-accent-400 text-xl">💻</span>
              <div className="flex flex-col">
                <a
                  href="https://github.com/black10000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-300 hover:text-accent-400 transition-colors"
                >
                  github.com/black10000
                </a>
                <a
                  href="https://gitlab.com/black10000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-300 hover:text-accent-400 transition-colors"
                >
                  gitlab.com/black10000
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-accent-400 text-xl">📍</span>
              <span className="text-light-300">
                92/20 Alley - Suphaphong 1, Nong Bon, Prawet, Bangkok
                <EasterEgg id="contact-location" className="ml-1 text-xs" />
              </span>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
