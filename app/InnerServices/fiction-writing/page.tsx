// app/services/fiction-writing/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import FictionWritingPage from "@/components/pages/FictionWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fiction Writing Services — Bexley Publishing",
    description:
        "Bring your fictional world to life with Bexley Publishing. Expert fiction writers craft engaging plots, rich characters, and immersive stories across all sub-genres.",
};

export default function FictionWriting() {
    return (
        <>
            <Navbar2 />

            <FictionWritingPage />

            <Footer />
        </>
    );
}