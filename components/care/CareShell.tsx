"use client";

import { useState } from "react";

import CareFooter from "./CareFooter";
import CareMobileDock from "./CareMobileDock";
import CareNavbar from "./CareNavbar";
import CareRequestForm from "./CareRequestForm";
import { CareUiProvider } from "./CareUi";

export default function CareShell({ children }: { children: React.ReactNode }) {
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <CareUiProvider value={{ openRequest: () => setRequestOpen(true) }}>
      <CareNavbar />
      {children}
      <CareFooter />
      <CareMobileDock />
      <CareRequestForm open={requestOpen} onClose={() => setRequestOpen(false)} />
    </CareUiProvider>
  );
}
