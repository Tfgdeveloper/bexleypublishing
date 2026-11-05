"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const LAST_PAGE_KEY = "bexley:lastPage";

export default function RouteTracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname || pathname.startsWith("/thank-you")) return;
        try {
            sessionStorage.setItem(LAST_PAGE_KEY, pathname + window.location.search);
        } catch {
        }
    }, [pathname]);

    return null;
}