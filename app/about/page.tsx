import Footer from "@/components/sections/Footer";
import AboutPage from "@/components/pages/AboutPage";
import Navbar2 from "@/components/Navbar2";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Bexley Publishing — Our Story, Team & Mission",
    description:
        "Since 2012, Bexley Publishing has empowered authors worldwide. Meet the expert writers, editors, designers, and marketers behind your book's success.",
};

export default function About() {
    return (
        <>
            <Navbar2 />

            <AboutPage />

            <Footer />
        </>
    );
}