import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost-dark";

const variants: Record<Variant, string> = {
  // night text on pink = 11.3:1
  primary: "bg-bean-pink text-night hover:bg-bean-pink-deep",
  secondary: "border-2 border-current text-sock-white hover:bg-sock-white hover:text-night",
  "ghost-dark":
    "border-2 border-tabby-brown text-tabby-brown hover:bg-tabby-brown hover:text-sock-white",
};

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

/** Internal link styled as a toe-bean button (squishes on press). */
export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`bean-press inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-base font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
