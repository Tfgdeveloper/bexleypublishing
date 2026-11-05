import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import BookPublishingPage from "@/components/pages/BookPublishingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Publishing Services — Publish Globally with Bexley",
    description: "Publish your book on Amazon, Barnes & Noble, Ingram, and 40+ global platforms with Bexley Publishing. Full-service support from manuscript to marketplace, guaranteed.",
};

export default function BookPublishing() {
    return (
        <>
            <Navbar2 />
            <BookPublishingPage />
            <Footer />
        </>
    );
}