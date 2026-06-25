// src/components/layout/ChromeFrame.tsx
"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { subscribeChrome, getChromeHidden } from "@/lib/three/chromeStore";

/** Fades the global navbar/footer out while the 3D hero owns the screen. */
export default function ChromeFrame({ children }: { children: ReactNode }) {
  const hidden = useSyncExternalStore(subscribeChrome, getChromeHidden, () => false);
  return (
    <div className={`transition-opacity duration-500 ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      {children}
    </div>
  );
}
