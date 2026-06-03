"use client";

import { ReactNode } from "react";
import { EasterEggProvider } from "@/context/EasterEggContext";
import { EggProgressHUD } from "@/components/EggProgressHUD";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <EasterEggProvider>
      {children}
      <EggProgressHUD />
    </EasterEggProvider>
  );
}
