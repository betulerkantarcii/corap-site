// The real <html>/<body> live in app/[locale]/layout.tsx so `lang` can follow the language.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
