// app/services/memoir-writing/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import MemoirWritingPage from "@/components/pages/MemoirWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Memoir & Biography Writing Services — Bexley Publishing",
    description:
        "Tell your life story with authenticity and depth. Bexley Publishing's memoir writers capture your experiences and craft a compelling narrative readers will cherish.",
};

export default function MemoirWriting() {
    return (
        <>
            <Navbar2 />

            <MemoirWritingPage />

            <Footer />
        </>
    );
}