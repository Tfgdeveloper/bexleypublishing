import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import BookCoverDesignPage from "@/components/pages/BookCoverDesignPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Cover Design Services — Bexley Publishing",
    description: "Make a lasting first impression with a stunning book cover from Bexley Publishing. Our designers create conversion-focused covers that stand out in any marketplace.",
};

export default function BookCoverDesign() {
    return (
        <>
            <Navbar2 />
            <BookCoverDesignPage />
            <Footer />
        </>
    );
}