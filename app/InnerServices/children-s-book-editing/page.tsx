import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import ChildrensBookEditingPage from "@/components/pages/ChildrensBookEditingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Children's Book Editing Services — Bexley Publishing",
    description: "Perfect your children's book with Bexley's specialized editing. We refine language, pacing, and age-appropriateness so your story resonates with young readers.",
};

export default function ChildrensBookEditing() {
    return (
        <>
            <Navbar2 />
            <ChildrensBookEditingPage />
            <Footer />
        </>
    );
}