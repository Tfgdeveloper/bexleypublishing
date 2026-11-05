"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/Aboutsection";
import StickyProposal from "@/components/Stickyproposal";
import FeaturedWork from "@/components/sections/Featuredwork";
import Brandingsection from "@/components/sections/Brandingsection";
import Faqsection from "@/components/sections/Faqsection";
import Blogsection from "@/components/sections/Blogsection";
import Contactsection from "@/components/sections/Contactsection";
import Newslettersection from "@/components/sections/Newslettersection";
import Footer from "@/components/sections/Footer";

export default function Home() {

    return (
        <main>
            <Navbar />

            <HeroSection />

            <AboutSection />

            <Brandingsection />

            <FeaturedWork />

            <Blogsection />

            <Faqsection />

            <Contactsection />

            <Newslettersection />

            <Footer />
        </main>
    );
}