// app/services/seo-content-writing/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import SEOContentWritingPage from "@/components/pages/SEOContentWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SEO Content Writing Services — Bexley Publishing",
    description:
        "Drive traffic and build authority with Bexley's SEO content writing. We craft keyword-optimized, reader-friendly content designed to rank and convert effectively.",
};

export default function SEOContentWriting() {
    return (
        <>
            <Navbar2 />

            <SEOContentWritingPage />

            <Footer />
        </>
    );
}