import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import ScriptWritingPage from "@/components/pages/ScriptWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Screenplay & Script Writing Services — Bexley Publishing",
    description: "Turn your ideas into powerful screenplays and scripts with Bexley Publishing. Our writers deliver professionally structured scripts ready for production or publishing.",
};

export default function ScriptWriting() {
    return (
        <>
            <Navbar2 />

            <ScriptWritingPage />

            <Footer />
        </>
    );
}