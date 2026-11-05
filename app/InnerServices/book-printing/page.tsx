import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import BookPrintingPage from "@/components/pages/BookPrintingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Printing Services — Bexley Publishing",
    description: "Print professional-quality paperbacks and hardcovers with Bexley Publishing. High-quality print-on-demand and bulk printing options with global distribution support.",
};

export default function BookPrinting() {
    return (
        <>
            <Navbar2 />
            <BookPrintingPage />
            <Footer />
        </>
    );
}