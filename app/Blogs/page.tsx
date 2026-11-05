import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/sections/Footer";
import BlogsPage from "@/components/pages/BlogsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publishing Insights & Author Tips — Bexley Blog",
  description:
    "Get expert advice on writing, publishing, book marketing, and cover design. Bexley Publishing's blog delivers actionable strategies for authors at every stage.",
};

export default function Blogs() {
  return (
    <>
      <Navbar2 />

      <BlogsPage />

      <Footer />
    </>
  );
}