import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import BookFormattingPage from "@/components/pages/BookFormattingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Formatting Services — Bexley Publishing",
    description: "Get your book print- and digital-ready with Bexley's expert formatting. We create polished interior layouts for Amazon , IngramSpark, and 40+ publishing platforms.",
};

export default function BookFormatting() {
    return (
        <>
            <Navbar2 />
            <BookFormattingPage />
            <Footer />
        </>
    );
}