import { notFound } from "next/navigation";

// Any unknown path under /tr or /en renders the localized not-found page.
export default function CatchAll() {
  notFound();
}
