import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import BookEditingPage from "@/components/pages/BookEditingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Professional Book Editing Services — Bexley Publishing",
    description: "Elevate your manuscript with Bexley Publishing's expert editing. We offer developmental, line, and copy editing to sharpen structure, clarity, and overall readability.",
};

export default function BookEditing() {
    return (
        <>
            <Navbar2 />
            <BookEditingPage />
            <Footer />
        </>
    );
}