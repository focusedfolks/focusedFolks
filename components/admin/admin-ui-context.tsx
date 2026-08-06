"use client";

import { createContext, useContext, useMemo, useState } from "react";

type AdminUiContextValue = {
  search: string;
  setSearch: (value: string) => void;
};

const AdminUiContext = createContext<AdminUiContextValue | null>(null);

export function AdminUiProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const value = useMemo(() => ({ search, setSearch }), [search]);
  return <AdminUiContext.Provider value={value}>{children}</AdminUiContext.Provider>;
}

export function useAdminUi() {
  const ctx = useContext(AdminUiContext);
  if (!ctx) {
    return { search: "", setSearch: () => {} };
  }
  return ctx;
}
