import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import PortfolioPage from "@/components/pages/PortfolioPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Published Books Portfolio — Bexley Publishing",
    description:
        "Browse Bexley Publishing's portfolio of bestselling titles across fiction, non-fiction, children's books, sci-fi, and faith genres. Your book could be next.",
};

export default function Portfolio() {
    return (
        <>
            <Navbar2 />

            <PortfolioPage />

            <Footer />
        </>
    );
}