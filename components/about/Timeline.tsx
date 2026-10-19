import { useLocale } from "next-intl";
import { PawPrint } from "@/components/ui/PawPrint";
import { Reveal } from "@/components/ui/Reveal";
import { dayInTheLife } from "@/content/about";

/** "A day in the life": a yarn-thread line with paw-print stops, alternating sides on wide screens. */
export function Timeline() {
  const locale = useLocale() as "tr" | "en";

  return (
    <ol className="relative mx-auto max-w-3xl">
      {/* the thread */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-5 w-0.5 border-l-[3px] border-dotted border-bean-pink-deep md:left-1/2 md:-translate-x-1/2"
      />
      {dayInTheLife.map((item, i) => (
        <li
          key={item.time}
          className="relative mb-10 pl-14 md:mb-6 md:grid md:grid-cols-2 md:gap-14 md:pl-0"
        >
          <span
            aria-hidden="true"
            className="absolute top-1 left-1 grid h-9 w-9 place-items-center rounded-full bg-sock-white text-bean-pink-deep ring-2 ring-bean-pink-deep md:left-1/2 md:-translate-x-1/2"
          >
            <PawPrint className="h-5 w-5" />
          </span>
          <Reveal className={i % 2 ? "md:col-start-2" : "md:col-start-1 md:text-right"} delay={60}>
            <p className="font-display text-sm font-semibold tracking-widest text-caramel-ink">
              <time>{item.time}</time>
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-tabby-spot">{item.title[locale]}</h3>
            <p className="mt-1 text-tabby-brown">{item.text[locale]}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
