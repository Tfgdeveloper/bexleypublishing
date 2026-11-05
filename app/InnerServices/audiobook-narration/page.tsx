import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import AudiobookNarrationPage from "@/components/pages/AudiobookNarrationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Audiobook Narration Services — Bexley Publishing",
    description: "Reach listeners everywhere with Bexley Publishing's audiobook narration service. Professional voice artists bring your book to life for all major audio platforms.",
};

export default function AudiobookNarration() {
    return (
        <>
            <Navbar2 />
            <AudiobookNarrationPage />
            <Footer />
        </>
    );
}