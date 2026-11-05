// app/services/book-writing/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import BookWritingPage from "@/components/pages/BookWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Professional Book Writing Services — Bexley Publishing",
    description:
        "Hire expert book writers at Bexley Publishing. 50+ certified ghostwriters across all genres — fiction, nonfiction, romance, thriller, and more. Your voice, your book.",
};

export default function BookWriting() {
    return (
        <>
            <Navbar2 />

            <BookWritingPage />

            <Footer />
        </>
    );
}