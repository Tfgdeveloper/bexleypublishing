"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen, Mail, PenTool, Palette, Rocket, BarChart, FileText } from "lucide-react";
import HeroButtons from "../HeroButton";
import QuoteModal from "../Quotemodal";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const maskReveal: Variants = {
    hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 40 },
    visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, transition: { duration: 1, ease: smoothEase } },
};



const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: smoothEase } },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const categories = [
    { label: "All Posts", value: "all", icon: BookOpen },
    { label: "Writing", value: "writing", icon: PenTool },
    { label: "Publishing", value: "publishing", icon: Rocket },
    { label: "Marketing", value: "marketing", icon: BarChart },
    { label: "Design", value: "design", icon: Palette },
];

const posts = [
    {
        id: 1, category: "publishing", tag: "Publishing", tagColor: "#e8391d",
        title: "How to Get Your Book Published in 2026: A Step-by-Step Guide",
        excerpt: "Navigating the publishing world doesn't have to be overwhelming. Whether you're pursuing traditional or self-publishing, this guide breaks down every step from manuscript to marketplace.",
        date: "May 1, 2026", readTime: "5 min", image: "/images/Blogs/01.webp", featured: true,
    },
    {
        id: 2, category: "writing", tag: "Writing", tagColor: "#1a6e3c",
        title: "10 Ghostwriting Secrets Professional Authors Swear By",
        excerpt: "The best ghostwriters disappear into your voice. Here's what separates the pros from the rest.",
        date: "Apr 18, 2026", readTime: "4 min", image: "/images/Blogs/02.jpg", featured: false,
    },
    {
        id: 3, category: "marketing", tag: "Marketing", tagColor: "#1a3a6e",
        title: "Book Marketing in the Age of Social Media: What Actually Works",
        excerpt: "With thousands of books published daily, targeted strategy is everything. We break down what drives real results.",
        date: "Apr 5, 2026", readTime: "6 min", image: "/images/Blogs/03.jpg", featured: false,
    },
    {
        id: 4, category: "design", tag: "Design", tagColor: "#7c3aed",
        title: "Why Your Book Cover Can Make or Break Your Sales",
        excerpt: "Readers absolutely judge books by their covers. An expert cover designer explains what makes them reach for a book.",
        date: "Mar 22, 2026", readTime: "3 min", image: "/images/Blogs/04.jpg", featured: false,
    },
    {
        id: 5, category: "writing", tag: "Writing", tagColor: "#1a6e3c",
        title: "The Art of Character Development: Crafting Memorable Protagonists",
        excerpt: "Great stories are defined by great characters. Learn how to build protagonists that readers care about deeply.",
        date: "Mar 10, 2026", readTime: "7 min", image: "/images/Blogs/05.jpeg", featured: false,
    },
    {
        id: 6, category: "publishing", tag: "Publishing", tagColor: "#e8391d",
        title: "Amazon KDP vs. IngramSpark: Which is Right for You?",
        excerpt: "A detailed comparison of the two giant publishing platforms to help you decide where to distribute your next book.",
        date: "Feb 28, 2026", readTime: "5 min", image: "/images/Blogs/06.jpg", featured: false,
    },
    {
        id: 7, category: "marketing", tag: "Marketing", tagColor: "#1a3a6e",
        title: "Pre-Order Strategies to Guarantee a Bestseller Launch",
        excerpt: "The pre-order phase is crucial. Here’s how to build momentum before your book even hits the shelves.",
        date: "Feb 15, 2026", readTime: "4 min", image: "/images/Blogs/07.webp", featured: false,
    },
];

export default function BlogsPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const gridRef = useRef<HTMLDivElement>(null);
    const gridInView = useInView(gridRef, { once: true, margin: "-80px" });
    const [quoteModal, setQuoteModal] = useState(false);

    const featuredPost = posts.find(p => p.featured);
    const filteredPosts = posts.filter(p => !p.featured && (activeCategory === "all" || p.category === activeCategory));

    return (
        <main className="w-full overflow-hidden" style={{ fontFamily: "'Raleway', Arial, sans-serif" }}>

            {/* ═══  SECTION 1: CINEMATIC BLOG HERO ═══ */}
            <section className="relative w-full h-screen flex items-center justify-center bg-[#05070f] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />
                <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-[#e8391d] opacity-10 rounded-full blur-[180px] pointer-events-none" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center justify-center gap-3 mb-6">
                        <span className="w-8 h-[2px] bg-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">The Author's Hub</span>
                        <span className="w-8 h-[2px] bg-[#e8391d]" />
                    </motion.div>

                    <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="font-black text-white uppercase leading-[0.95] mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
                        PUBLISHING <br /><span className="text-[#e8391d]">INSIGHTS.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-white/60 leading-[1.85] max-w-2xl mx-auto" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                        Expert advice, industry trends, and actionable strategies to help you write, publish, and market your book successfully.
                    </motion.p>

                    <HeroButtons />
                </div>
            </section>

            {/* ═══  SECTION 2: FEATURED POST ═══ */}
            {featuredPost && (
                <section className="relative w-full bg-[#faf9f7] pt-32 pb-16 overflow-hidden">
                    <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />

                    <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Featured Article</span>
                        </motion.div>

                        <motion.a
                            href="#"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: smoothEase }}
                            className="group relative block rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500"
                            style={{ minHeight: "500px" }}
                        >
                            <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="absolute top-8 left-8">
                                <span className="font-black uppercase tracking-widest text-[10px] text-white px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20" style={{ background: `${featuredPost.tagColor}cc` }}>
                                    {featuredPost.tag}
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-10">
                                <div className="flex items-center gap-4 text-white/50 text-[12px] font-semibold mb-4">
                                    <span>{featuredPost.date}</span>
                                    <span>·</span>
                                    <span className="flex items-center gap-1"><Clock size={11} /> {featuredPost.readTime} read</span>
                                </div>
                                <h2 className="font-black text-white uppercase leading-[1.15] mb-4 group-hover:text-[#e8391d] transition-colors duration-300" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
                                    {featuredPost.title}
                                </h2>
                                <p className="text-white/65 leading-relaxed max-w-2xl" style={{ fontSize: "0.95rem" }}>
                                    {featuredPost.excerpt}
                                </p>
                            </div>
                        </motion.a>
                    </div>
                </section>
            )}

            {/* ═══  SECTION 3: FILTERS & ANIMATED GRID ═══ */}
            <section ref={gridRef} className="relative w-full bg-[#faf9f7] py-16 pb-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16">

                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-3 mb-12">
                        {categories.map(({ label, value, icon: Icon }) => (
                            <button
                                key={value}
                                onClick={() => setActiveCategory(value)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-300 border ${activeCategory === value
                                    ? "bg-[#e8391d] text-white border-[#e8391d] shadow-lg shadow-[#e8391d]/20"
                                    : "bg-transparent text-black/60 border-gray-300 hover:border-[#e8391d] hover:text-[#e8391d]"
                                    }`}
                            >
                                <Icon size={12} /> {label}
                            </button>
                        ))}
                    </motion.div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, ease: smoothEase }}
                                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#e8391d]/30 hover:shadow-xl transition-all duration-500 cursor-pointer"
                                >
                                    <div className="relative w-full aspect-video overflow-hidden">
                                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                        <div className="absolute top-4 left-4">
                                            <span className="font-black uppercase tracking-widest text-[9px] text-white px-2.5 py-1 rounded-full" style={{ background: post.tagColor }}>
                                                {post.tag}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col flex-1 p-6">
                                        <div className="flex items-center gap-3 text-gray-400 text-[11px] font-semibold mb-3">
                                            <span>{post.date}</span>
                                            <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                                        </div>
                                        <h3 className="font-black text-black uppercase leading-snug mb-3 group-hover:text-[#e8391d] transition-colors duration-300" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}>
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3 flex-1 mb-4">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-2 text-[#e8391d] font-bold uppercase tracking-widest text-[11px] group-hover:gap-3 transition-all duration-300 mt-auto">
                                            Read More <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ═══  SECTION 4: NEWSLETTER SUBSCRIPTION ═══ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e8391d] opacity-10 rounded-full blur-[150px] pointer-events-none" />

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center px-8 relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Mail size={20} className="text-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Newsletter</span>
                    </div>
                    <h2 className="font-black text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                        STAY AHEAD OF THE <span className="text-[#e8391d]">CURVE.</span>
                    </h2>
                    <p className="text-white/60 leading-[1.85] mb-10" style={{ fontSize: "0.95rem" }}>
                        Join 5,000+ authors receiving our weekly insights on writing, publishing, and marketing. No spam, just actionable advice.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 bg-white/5 border border-white/15 text-white placeholder-white/35 px-6 py-4 rounded-xl focus:outline-none focus:border-[#e8391d] focus:bg-white/10 transition-all duration-300 text-[14px]"
                            required
                        />
                        <motion.button
                            type="submit"
                            whileHover={{ backgroundColor: "#c0271a", boxShadow: "0 10px 30px rgba(232, 57, 29, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#e8391d] text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl text-[12px] cursor-pointer transition-all whitespace-nowrap"
                        >
                            Subscribe
                        </motion.button>
                    </form>
                </motion.div>
            </section>

            {/* ═══ SECTION 5: MASSIVE CTA ═══ */}
            <section className="relative w-full bg-[#e8391d] py-28 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center px-8 relative z-10">
                    <h2 className="font-black text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                        READY TO WRITE YOUR STORY?
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Reading about success is great. Living it is better. Let’s publish your book and make it the next big read.
                    </p>
                    <button
                        type="button"
                        style={{ backgroundColor: "#fff", color: "#e8391d", gap: "14px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
                        className="inline-flex items-center gap-3 bg-black text-white font-black uppercase tracking-widest px-10 py-5 rounded-xl text-[14px] cursor-pointer transition-all duration-300"
                        onClick={() => setQuoteModal(true)}
                    >
                        <FileText size={16} />
                        Start Your Book
                    </button>
                </motion.div>

                <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />
            </section>

        </main >
    );
}