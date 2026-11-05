import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import ChildrensBookPage from "@/components/pages/ChildrensBookPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Children's Book Writing Services — Bexley Publishing",
    description:
        "Create magical children's books with Bexley Publishing. Our writers craft imaginative, age-appropriate stories that spark creativity and inspire young readers.",
};

export default function ChildrensBookWriting() {
    return (
        <>
            <Navbar2 />

            <ChildrensBookPage />

            <Footer />
        </>
    );
}