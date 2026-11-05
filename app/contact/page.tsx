// app/contact/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import ContactPage from "@/components/pages/ContactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Bexley Publishing — Get a Free Book Proposal",
    description:
        "Ready to publish your book? Contact Bexley Publishing today for a free proposal. We respond within 24 hours. 100% confidential, NDA-protected consultations.",
};

export default function Contact() {
    return (
        <>
            <Navbar2 />

            <ContactPage />

            <Footer />
        </>
    );
}