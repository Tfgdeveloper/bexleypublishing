import Navbar2 from "@/components/Navbar2";
import { Metadata } from "next";
import Reviewpage from "@/components/pages/Reviewpage";
import Footer from "@/components/sections/Footer";


export const metadata: Metadata = {
    title: "Client Reviews | Bexley Publishing Author Stories",
    description:
        "Read honest reviews from authors who trusted Bexley Publishing with ghostwriting, editing, cover design, publishing, and marketing for their books.",
};

export default function About() {
    return (
        <>
            <Navbar2 />

            <Reviewpage />

            <Footer />
        </>
    );
}