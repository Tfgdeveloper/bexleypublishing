// app/services/fantasy-writing/page.tsx
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import FantasyWritingPage from "@/components/pages/FantasyWritingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fantasy Book Writing Services — Bexley Publishing",
    description: "Build extraordinary worlds with Bexley Publishing's fantasy writing service. From epic quests to magical realms, our writers craft immersive, unforgettable tales.",
};

export default function FantasyWriting() {
  return (
    <>
      <Navbar2 />
      
      <FantasyWritingPage />
      
      <Footer />
    </>
  );
}