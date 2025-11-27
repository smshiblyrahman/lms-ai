"use client";

import dynamic from "next/dynamic";

const SanityAppProvider = dynamic(
  () => import("@/components/SanityAppProvider"),
  { ssr: false, loading: () => <div>Loading Sanity App...</div> },
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <SanityAppProvider>{children}</SanityAppProvider>;
}
