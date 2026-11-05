"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    Building2, ArrowRight, CheckCircle2, BookOpen, Globe, Truck,
    ShieldCheck, DollarSign, Rocket, Scale, Store, Library,
    Phone, Minus, Plus, Sparkles, FileText, BadgeCheck, PenTool, X
} from "lucide-react";
import HeroButtons from "../HeroButton";
import QuoteModal from "../Quotemodal";

// Safe TS Easing
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// --- Animation Variants ---
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

// --- Data ---
const publishingPaths = [
    {
        title: "Traditional Publishing",
        subtitle: "The long road many authors know all too well.",
        icon: Building2,
        features: [
            { text: "Finding agents and submitting proposals", good: false },
            { text: "Lengthy review and approval processes", good: false },
            { text: "Limited creative control", good: false },
            { text: "Smaller royalty percentages", good: false },
            { text: "Long publication timelines", good: false },
        ],
        tag: "Gatekept"
    },
    {
        title: "Independent Publishing",
        subtitle: "A faster, more flexible approach built around the author.",
        icon: Rocket,
        features: [
            { text: "Publish on your schedule", good: true },
            { text: "Maintain creative control", good: true },
            { text: "Keep a larger share of royalties", good: true },
            { text: "Reach readers faster", good: true },
            { text: "Retain ownership of your work", good: true },
        ],
        tag: "Empowered"
    },
];

const distributionNetwork = [
    { icon: Store, title: "Publishing Platforms", desc: "Make your book available through the world's largest online bookstores in print and digital formats." },
    { icon: Globe, title: "Expanded Retail Distribution", desc: "Reach bookstores, online retailers, libraries, and educational institutions through established distribution networks." },
    { icon: BookOpen, title: "Digital Bookstores", desc: "Connect with readers through leading eBook platforms and international digital marketplaces." },
    { icon: Library, title: "Print-On-Demand Services", desc: "Books are printed when ordered, eliminating storage costs and inventory management." },
    { icon: Sparkles, title: "Library & Educational Access", desc: "Increase discoverability through library and academic distribution channels." },
    { icon: Truck, title: "Global Availability", desc: "Give readers access to your book across multiple countries and regions." },
];

const processSteps = [
    { step: "01", title: "PUBLISHING SETUP", desc: "We prepare essential publishing elements, including ISBN registration, metadata, and platform configuration.", icon: BadgeCheck },
    { step: "02", title: "BOOK PREPARATION", desc: "Your manuscript is professionally formatted and prepared for both print and digital publication.", icon: FileText },
    { step: "03", title: "DISTRIBUTION CONFIGURATION", desc: "We set up your book across selected publishing and distribution platforms for maximum availability.", icon: Globe },
    { step: "04", title: "LAUNCH & SUPPORT", desc: "Once published, your book becomes available to readers while we provide guidance for updates and future editions.", icon: DollarSign },
];

const faqs = [
    { q: "Will I Retain Ownership Of My Book?", a: "Yes. You keep ownership of your book, copyright, creative content, and publishing rights throughout the entire process." },
    { q: "How Will I Receive My Royalties?", a: "Royalties are paid directly through the publishing platforms, giving you full visibility into your book sales." },
    { q: "Should I Publish Through Amazon Or IngramSpark?", a: "Amazon offers strong online reach, while IngramSpark expands distribution to bookstores, libraries, and additional retailers." },
    { q: "Can My Book Be Available In Bookstores?", a: "Yes. Expanded distribution can make your book available for bookstore orders, library systems, and retail networks." },
    { q: "What Does Print-On-Demand Mean?", a: "Books are printed only when purchased, eliminating inventory costs, storage concerns, and large upfront printing expenses." },
    { q: "How Long Does It Take To Publish A Book?", a: "Most projects can be prepared and published within several weeks, depending on formatting, approvals, and distribution requirements." },
];

export default function BookPublishingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);

    return (
        <main className="w-full overflow-hidden" style={{ fontFamily: "'Raleway', Arial, sans-serif" }}>

            {/* ════════════════════════════════════════════
                SECTION 1: CINEMATIC SERVICE HERO
            ════════════════════════════════════════════ */}
            <section className="relative w-full h-screen flex items-center justify-center bg-[#05070f] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#e8391d] opacity-10 rounded-full blur-[180px] pointer-events-none" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center justify-center gap-3 mb-6">
                        <Rocket size={16} className="text-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Book Publishing Services</span>
                    </motion.div>

                    <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="font-black text-white uppercase leading-[0.95] mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                        TAKE YOUR BOOK FROM <br /><span className="text-[#e8391d]">MANUSCRIPT TO MARKET.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-white/60 leading-[1.85] max-w-2xl mx-auto mb-10" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                        We help authors publish professionally with the tools, support, and distribution needed to make their books available worldwide
                    </motion.p>

                    <HeroButtons />
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 2: SERVICE OVERVIEW
            ════════════════════════════════════════════ */}
            <section id="overview" ref={overviewRef} className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />

                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="flex flex-col">
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Overview</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}>
                            PUBLISH WITH CONFIDENCE. <br /><span className="text-[#e8391d]">KEEP CONTROL.</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-5" style={{ fontSize: "0.95rem" }}>
                            You put the work into writing the book. You should be the one deciding how it's published, where it's sold, and how it's presented to readers.
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-8" style={{ fontSize: "0.95rem" }}>
                            Our publishing service handles the technical and administrative side of publishing, allowing you to focus on what matters most: your book. From ISBN registration and copyright setup to formatting, distribution, and print-on-demand configuration, we prepare your book for a professional launch across major publishing platforms.
                        </motion.p>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                            {["Full Ownership of Your Book", "ISBN & Publishing Setup Included", "Worldwide Print & eBook Distribution", "No Inventory or Bulk Printing Required"].map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 group">
                                    <CheckCircle2 size={18} className="text-[#e8391d] shrink-0" />
                                    <span className="text-black/80 font-semibold text-[14px]">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="relative hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20" style={{ aspectRatio: "4/5" }}>
                            <Image src="/images/Services/EditingPublishing/book-publishing/01.jpg" alt="Book Publishing Service" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/20 -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 3: YOUR PUBLISHING PATH (UNIQUE)
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-16 overflow-hidden">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <Scale size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">The Clear Choice</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            TWO PATHS TO PUBLICATION. <br /> <span className="text-[#e8391d]">ONE CLEAR ADVANTAGE.</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {publishingPaths.map(({ title, subtitle, icon: Icon, features, tag }) => (
                            <motion.div key={title} variants={fadeUp} className={`rounded-2xl p-8 border relative overflow-hidden transition-all duration-500 ${tag === "Empowered"
                                ? "bg-[#e8391d]/5 border-[#e8391d]/50 hover:border-[#e8391d]"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20"
                                }`}>
                                {/* Tag */}
                                <div className="absolute top-4 right-4">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${tag === "Empowered" ? "bg-[#e8391d] text-white" : "bg-white/10 text-white/30"
                                        }`}>
                                        {tag}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${tag === "Empowered" ? "bg-[#e8391d]" : "bg-white/10"
                                        }`}>
                                        <Icon size={26} className={tag === "Empowered" ? "text-white" : "text-white/40"} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-white uppercase text-lg tracking-wide">{title}</h3>
                                        <p className="text-white/30 font-semibold text-[12px] uppercase tracking-widest">{subtitle}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {features.map(({ text, good }) => (
                                        <div key={text} className="flex items-start gap-3">
                                            {good ? (
                                                <CheckCircle2 size={18} className="text-[#e8391d] shrink-0 mt-0.5" />
                                            ) : (
                                                <X size={18} className="text-white/20 shrink-0 mt-0.5" />
                                            )}
                                            <span className={`text-[14px] leading-relaxed ${good ? "text-white/80" : "text-white/30"}`}>{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 4: GLOBAL DISTRIBUTION NETWORK (UNIQUE)
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
                    <div className="text-center mb-16">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <Globe size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Worldwide Reach</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            REACH READERS <span className="text-[#e8391d]">AROUND THE WORLD</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-gray-400 mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
                            Your book deserves more than a single storefront. We help make it available across major retail, digital, and distribution channels.
                        </motion.p>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {distributionNetwork.map(({ icon: Icon, title, desc }) => (
                            <motion.div key={title} variants={fadeUp} className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#e8391d]/40 hover:shadow-xl hover:shadow-[#e8391d]/5 transition-all duration-500 group cursor-default">
                                <div className="w-12 h-12 rounded-xl bg-[#e8391d]/10 flex items-center justify-center mb-6 group-hover:bg-[#e8391d] transition-colors duration-300">
                                    <Icon size={22} className="text-[#e8391d] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="font-black text-black uppercase text-lg mb-2 tracking-wide">{title}</h3>
                                <p className="text-gray-500 text-[14px] leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 5: PUBLISHING PROCESS
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#111] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            HOW WE HELP YOU <span className="text-[#e8391d]">PUBLISH</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connecting line */}
                        <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-white/10 z-0" />

                        {processSteps.map(({ step, title, desc, icon: Icon }) => (
                            <motion.div key={step} variants={fadeUp} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-[#e8391d] flex items-center justify-center mb-6 shadow-lg shadow-[#e8391d]/20 border-4 border-[#111]">
                                    <Icon size={24} className="text-white" />
                                </div>
                                <span className="text-[#e8391d] font-black text-sm tracking-widest mb-2">{step}</span>
                                <h3 className="font-black text-white uppercase text-lg mb-3 tracking-wide">{title}</h3>
                                <p className="text-white/40 text-[14px] leading-relaxed max-w-[250px]">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 6: WHY CHOOSE OUR PUBLISHING
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "1/1" }}>
                            <Image src="/images/Services/EditingPublishing/book-publishing/02.jpg" alt="Book Publishing Team" fill className="object-cover" />
                            <div className="absolute inset-0 bg-[#e8391d]/20 mix-blend-multiply" />
                        </div>
                        <div className="absolute -bottom-5 -right-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/25 -z-0" />

                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Why Bexley Publishing</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-10" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                            WHY AUTHORS CHOOSE <br /><span className="text-[#e8391d]">BEXLEY PUBLISHING </span>
                        </motion.h2>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-5">
                            {[
                                "YOU STAY IN CONTROL — Your book remains yours. You make the decisions while we provide the publishing support.",
                                "BUILT FOR MODERN AUTHORS — A streamlined publishing process designed for today's independent publishing landscape.",
                                "PROFESSIONAL FROM START TO FINISH — Every stage is handled with attention to quality, presentation, and publishing standards.",
                                "WIDER READER ACCESS — Your book becomes available through channels readers already trust and use every day.",
                                "SUPPORT BEYOND PUBLICATION — Publishing is only the beginning. We're here to help as your book continues reaching new readers."
                            ].map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-start gap-4 group">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-[#e8391d]/10 flex items-center justify-center shrink-0 group-hover:bg-[#e8391d] transition-colors duration-300">
                                        <CheckCircle2 size={14} className="text-[#e8391d] group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="text-gray-500 text-[15px] leading-relaxed">{item}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 7: SERVICE FAQS
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="max-w-[900px] mx-auto px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            FREQUENTLY ASKED <span className="text-[#e8391d]">QUESTIONS</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-4">
                        {faqs.map(({ q, a }, i) => (
                            <motion.div key={i} variants={fadeUp} className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-[#e8391d]/40 transition-colors duration-300">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left group cursor-pointer">
                                    <span className="font-bold text-white text-[15px] pr-4">{q}</span>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? "bg-[#e8391d] text-white" : "bg-white/10 text-white/40"}`}>
                                        {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                    </div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {openFaq === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }} className="overflow-hidden">
                                            <div className="px-6 pb-6 text-white/50 text-[14px] leading-relaxed">
                                                {a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 8: MASSIVE CTA
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#e8391d] py-28 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center px-8 relative z-10">
                    <h2 className="font-black text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                        YOUR BOOK IS READY. NOW LET'S PUBLISH IT.
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Let us help you prepare, publish, and distribute your book professionally so readers can finally discover it.
                    </p>
                    <div className="flex flex-wrap justify-center gap-5">
                        <button
                            type="button"
                            style={{ backgroundColor: "#fff", color: "#e8391d", gap: "14px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
                            className="inline-flex items-center gap-3 bg-black text-white font-black uppercase tracking-widest px-10 py-5 rounded-xl text-[14px] cursor-pointer transition-all duration-300"
                            onClick={() => setQuoteModal(true)}
                        >
                            <FileText size={16} />
                            GET A FREE QUOTE
                        </button>
                        <motion.a href="tel:2797770380" whileHover={{ gap: "14px" }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-3 border-2 border-white text-white font-black uppercase tracking-widest px-10 py-5 rounded-xl text-[14px] cursor-pointer transition-all duration-300">
                            <Phone size={16} /> START YOUR PUBLISHING JOURNEY
                        </motion.a>
                    </div>
                </motion.div>
            </section>
            <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />

        </main>
    );
}