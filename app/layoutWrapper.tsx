"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // routes where header/footer should be hidden
    const hideLayout = pathname === "/login" || pathname === "/signup";

    return (
        <>
            {!hideLayout && <Header />}
            {children}
            {!hideLayout && <Footer />}
        </>
    );
}
