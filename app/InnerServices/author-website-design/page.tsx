import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import AuthorWebsiteDesignPage from "@/components/pages/AuthorWebsiteDesignPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Author Website Design Services — Bexley Publishing",
    description: "Build your author brand online with a professional website from Bexley Publishing. Custom-designed author sites that showcase your books and grow your readership.",
};

export default function AuthorWebsiteDesign() {
    return (
        <>
            <Navbar2 />
            <AuthorWebsiteDesignPage />
            <Footer />
        </>
    );
}