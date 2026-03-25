"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextValue {
    open: boolean;
    toggle: () => void;
    close: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
    open: false,
    toggle: () => {},
    close: () => {},
});

// Custom hook for consuming sidebar context
export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
    children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen((prev) => !prev);
    const close = () => setOpen(false);

    return (
        <SidebarContext.Provider value={{ open, toggle, close }}>
            {children}
        </SidebarContext.Provider>
    );
}