// app/services/historical-writing/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import HistoricalWritingPage from "@/components/pages/HistoricalWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Historical Book Writing Services — Bexley Publishing",
    description:
        "Bring history to life with Bexley Publishing. Our historical writers combine rigorous research with compelling storytelling to create accurate, engaging narratives.",
};
export default function HistoricalWriting() {
    return (
        <>
            <Navbar2 />

            <HistoricalWritingPage />

            <Footer />
        </>
    );
}