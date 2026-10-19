import type { CSSProperties } from "react";
import { SockPawsMark } from "@/components/ui/Logo";
import { PawPrint } from "@/components/ui/PawPrint";

// Runs during HTML parsing, before the loader paints: repeat visitors get
// html[data-seen] and the loader is hidden by CSS without ever showing.
const MARK_SEEN = `try{var k="corap-seen";if(localStorage.getItem(k))document.documentElement.setAttribute("data-seen","");localStorage.setItem(k,"1")}catch(e){}`;

/**
 * First-visit intro: two sock paws walk across leaving pink prints, then the
 * wordmark appears; the overlay fades out by ~1.4s. Pure CSS — it dismisses
 * itself even if JavaScript fails. Hidden for reduced motion and repeat visits.
 */
export function Loader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: MARK_SEEN }} />
      <div className="corap-loader section-night" aria-hidden="true">
        <div className="loader-track">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <PawPrint
              key={i}
              className="loader-print"
              style={{ "--i": i, "--y": i % 2 ? "54%" : "16%" } as CSSProperties}
            />
          ))}
          <div className="loader-walker">
            <SockPawsMark className="h-full w-auto" />
          </div>
        </div>
        <p className="loader-word font-display">
          <span className="block text-4xl font-semibold sm:text-5xl">The House Cat</span>
          <span className="block text-2xl font-medium text-bean-pink sm:text-3xl">Çorap</span>
        </p>
      </div>
    </>
  );
}
