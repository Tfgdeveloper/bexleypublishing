import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import HorrorWritingPage from "@/components/pages/HorrorWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Horror Book Writing Services — Bexley Publishing",
    description: "Terrify readers with expert horror writing from Bexley Publishing. Our specialists craft gripping, atmosphere-rich stories across all horror sub-genres.",
};

export default function HorrorWriting() {
    return (
        <>
            <Navbar2 />

            <HorrorWritingPage />

            <Footer />
        </>
    );
}