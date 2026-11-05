import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import EbookCreationPage from "@/components/pages/EbookCreationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ebook Creation Services — Bexley Publishing",
    description: "Convert your manuscript into a professionally formatted ebook with Bexley Publishing. We create EPUB, MOBI, and PDF files optimized for all major reading platforms.",
};

export default function EbookCreation() {
    return (
        <>
            <Navbar2 />
            <EbookCreationPage />
            <Footer />
        </>
    );
}