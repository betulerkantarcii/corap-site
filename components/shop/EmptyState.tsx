"use client";

import { useTranslations } from "next-intl";
import { Corap } from "@/components/mascot/Corap";
import { SockIcon } from "@/components/ui/icons";

/** No results: Çorap peeking over the edge, holding up an empty sock. */
export function EmptyState({ onClear }: { onClear: () => void }) {
  const t = useTranslations("Shop");
  return (
    <div className="flex flex-col items-center px-4 py-12 text-center" role="status">
      <div className="relative w-64">
        <Corap pose="peek" mood="sleepy" lookAt="cursor" className="w-full" />
        <SockIcon className="absolute -right-6 bottom-2 h-16 w-16 rotate-12" />
        <div className="h-2 rounded-full bg-tabby-brown/30" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-tabby-spot">{t("emptyTitle")}</h2>
      <p className="mt-2 max-w-sm text-tabby-brown">{t("emptyBody")}</p>
      <button
        type="button"
        onClick={onClear}
        className="bean-press mt-6 min-h-11 rounded-full border-2 border-tabby-brown px-5 font-display font-semibold text-tabby-brown hover:bg-tabby-brown hover:text-sock-white"
      >
        {t("clearFilters")}
      </button>
    </div>
  );
}
