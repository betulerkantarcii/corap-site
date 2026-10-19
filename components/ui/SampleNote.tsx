import { useTranslations } from "next-intl";

/** Small dashed tag marking placeholder copy that the owner still needs to replace. */
export function SampleNote({ className = "" }: { className?: string }) {
  const t = useTranslations("About");
  return (
    <span
      className={`inline-block rounded-full border-2 border-dashed border-caramel-ink px-3 py-0.5 text-xs font-semibold text-caramel-ink ${className}`}
    >
      {t("sample")}
    </span>
  );
}
