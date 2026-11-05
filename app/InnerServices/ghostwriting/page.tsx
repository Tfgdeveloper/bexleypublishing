// app/services/ghostwriting/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import GhostwritingPage from "@/components/pages/GhostwritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Confidential Ghostwriting Services — Bexley Publishing",
    description:
        "Bexley's 100% confidential ghostwriting service turns your ideas into publish-ready books. Your name, your voice, your rights — expertly written by our pro team.",
};

export default function Ghostwriting() {
    return (
        <>
            <Navbar2 />

            <GhostwritingPage />

            <Footer />
        </>
    );
}