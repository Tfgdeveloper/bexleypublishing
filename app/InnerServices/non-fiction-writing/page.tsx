// app/services/non-fiction-writing/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import NonFictionWritingPage from "@/components/pages/NonFictionWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Non-Fiction Book Writing Services — Bexley Publishing",
    description: "Establish your authority with a professionally written non-fiction book. Bexley Publishing's writers transform your expertise into a compelling, market-ready title.",
};

export default function NonFictionWriting() {
    return (
        <>
            <Navbar2 />

            <NonFictionWritingPage />

            <Footer />
        </>
    );
}