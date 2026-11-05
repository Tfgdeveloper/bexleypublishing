import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import BookProofReadingPage from "@/components/pages/BookProofReadingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Professional Book Proofreading Services — Bexley",
    description: "Publish a flawless book with Bexley's proofreading service. Our editors catch every grammar, spelling, and punctuation error before your manuscript goes live.",
};

export default function BookProofReading() {
    return (
        <>
            <Navbar2 />
            <BookProofReadingPage />
            <Footer />
        </>
    );
}