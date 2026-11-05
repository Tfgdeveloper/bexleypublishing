import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import BookMarketingPage from "@/components/pages/BookMarketingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Marketing Services — Bexley Publishing",
    description: "Reach more readers with Bexley Publishing's book marketing services. From social media promotion to targeted campaigns, we help your book gain visibility and sell more.",
};

export default function BookMarketing() {
    return (
        <>
            <Navbar2 />
            <BookMarketingPage />
            <Footer />
        </>
    );
}