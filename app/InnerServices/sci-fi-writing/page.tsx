// app/services/sci-fi-writing/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import SciFiWritingPage from "@/components/pages/SciFiWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Science Fiction Writing Services — Bexley Publishing",
    description:
        "Launch your sci-fi book with Bexley Publishing. Our genre specialists craft futuristic worlds, compelling characters, and imaginative storylines readers will love.",
};

export default function SciFiWriting() {
    return (
        <>
            <Navbar2 />

            <SciFiWritingPage />

            <Footer />
        </>
    );
}