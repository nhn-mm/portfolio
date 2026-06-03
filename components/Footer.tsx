import { EasterEgg } from "@/components/EasterEgg";

export function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-light-400 border-t border-dark-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} Naing Htet Naing. All rights reserved.
          <EasterEgg id="footer" className="ml-1 text-xs" />
        </p>
      </div>
    </footer>
  );
}
