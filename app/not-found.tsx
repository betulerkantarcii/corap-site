import Link from "next/link";
import "./globals.css";

// Fallback for paths outside /tr and /en (e.g. a missing file). Localized 404 lives in app/[locale].
export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="section-night grid min-h-dvh place-items-center p-6 text-center">
        <div>
          <h1 className="text-4xl font-semibold">Çorap stole this page</h1>
          <p className="mt-6">
            <Link href="/" className="text-bean-pink underline underline-offset-4">
              Take me home
            </Link>
          </p>
        </div>
      </body>
    </html>
  );
}
