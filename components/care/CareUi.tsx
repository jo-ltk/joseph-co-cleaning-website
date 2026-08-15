"use client";

import { createContext, useContext } from "react";

type CareUiValue = {
  openRequest: () => void;
};

const CareUiContext = createContext<CareUiValue>({
  openRequest: () => {},
});

export function CareUiProvider({
  value,
  children,
}: {
  value: CareUiValue;
  children: React.ReactNode;
}) {
  return <CareUiContext.Provider value={value}>{children}</CareUiContext.Provider>;
}

export function useCareUi() {
  return useContext(CareUiContext);
}
