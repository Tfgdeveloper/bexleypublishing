// app/services/mystery-writing/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import MysteryWritingPage from "@/components/pages/MysteryWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mystery & Thriller Writing Services — Bexley Publishing",
    description:
        "Grip readers from page one with Bexley Publishing's mystery writing services. Our specialists craft suspenseful plots and compelling twists that keep readers hooked.",
};

export default function MysteryWriting() {
    return (
        <>
            <Navbar2 />

            <MysteryWritingPage />

            <Footer />
        </>
    );
}