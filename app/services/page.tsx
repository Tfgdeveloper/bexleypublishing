import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import ServicesPage from "@/components/pages/ServicesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Publishing Services — Writing, Editing, Design & More",
    description:
        "Explore Bexley Publishing's full range: ghostwriting, editing, cover design, book formatting, publishing, and global distribution on 40+ platforms.",
};

export default function Services() {
    return (
        <>
            <Navbar2 />

            <ServicesPage />

            <Footer />
        </>
    );
}