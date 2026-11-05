"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    Palette, ArrowRight, CheckCircle2, BookOpen, Type, Droplets,
    Layers, Eye, Sword, Heart, Rocket, Briefcase, Baby, GraduationCap,
    Phone, Minus, Plus, Sparkles, PenLine, Maximize, ScanSearch, Paintbrush,
    FileText
} from "lucide-react";
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

const psychologyElements = [
    { icon: Type, title: "THE POWER OF TYPOGRAPHY", desc: "Fonts communicate personality before a single sentence is read. Every typeface choice helps shape the reader's expectations." },
    { icon: Droplets, title: "COLORS THAT CREATE EMOTION", desc: "Color influences mood, genre perception, and buying behavior. The right palette helps attract the right audience." },
    { icon: Eye, title: "DESIGN THAT GUIDES THE EYE", desc: "A strong cover directs attention naturally, helping readers notice the title, imagery, and key selling elements in seconds." },
    { icon: Layers, title: "GENRE EXPECTATIONS MATTER", desc: "Readers look for familiar visual cues. We help your book fit the market without blending into the crowd." },
];

const genreDesigns = [
    { icon: Sword, title: "MYSTERY & THRILLER", desc: "Bold typography, dramatic imagery, and tension-filled designs that create intrigue before the first chapter begins.", accent: "from-red-900/20 to-black/40" },
    { icon: Heart, title: "ROMANCE", desc: "Elegant visuals, emotional warmth, and inviting design elements that capture connection, chemistry, and emotion.", accent: "from-pink-800/20 to-rose-950/40" },
    { icon: Rocket, title: "SCIENCE FICTION", desc: "Futuristic aesthetics, imaginative visuals, and designs that instantly suggest discovery, possibility, and adventure.", accent: "from-blue-900/20 to-cyan-950/40" },
    { icon: Briefcase, title: "BUSINESS & NONFICTION", desc: "Clean layouts, confident typography, and professional design that builds authority and credibility.", accent: "from-amber-900/20 to-yellow-950/40" },
    { icon: Baby, title: "CHILDREN'S BOOKS", desc: "Colorful, playful, and full of personality, designed to spark curiosity in young readers and parents alike.", accent: "from-green-800/20 to-emerald-950/40" },
    { icon: GraduationCap, title: "MEMOIRS & BIOGRAPHIES", desc: "Authentic, personal designs that reflect the unique story behind the person and the journey they share.", accent: "from-stone-700/20 to-neutral-900/40" },
];

const processSteps = [
    { step: "01", title: "DISCOVERY & STRATEGY", desc: "We learn about your book, audience, genre, and publishing goals before a single design concept is created.", icon: ScanSearch },
    { step: "02", title: "CONCEPT CREATION", desc: "Our designers develop multiple creative directions, each offering a unique visual approach for your consideration.", icon: Paintbrush },
    { step: "03", title: "DESIGN REFINEMENT", desc: "The selected concept is carefully refined through typography, color adjustments, layout improvements, and final details.", icon: PenLine },
    { step: "04", title: "FINAL FILE DELIVERY", desc: "You receive professionally prepared files for print, eBook publishing, online marketplaces, and promotional use.", icon: Maximize },
];

const faqs = [
    { q: "How many design concepts will I receive?", a: "We provide multiple design directions so you can explore different creative approaches before selecting a final concept." },
    { q: "Can you use custom artwork or illustrations?", a: "Yes. We can work with stock imagery, custom illustrations, licensed artwork, or a combination of creative assets." },
    { q: "Will my cover meet publishing platform requirements?", a: "Absolutely. We prepare files according to industry specifications for major print and eBook publishing platforms." },
    { q: "What's included in a full cover design?", a: "Front cover, spine, back cover, and files prepared for both print and digital publishing." },
    { q: "Can you redesign an existing cover?", a: "Yes. We regularly help authors refresh outdated covers or reposition books for new audiences." },
    { q: "Will I own the final cover design?", a: "Yes. Upon project completion, you'll receive the finalized design files according to the project agreement." },
];

export default function BookCoverDesignPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);


    return (
        <main className="w-full overflow-hidden" style={{ fontFamily: "'Raleway', Arial, sans-serif" }}>

            {/* ═══ SECTION 1: CINEMATIC SERVICE HERO ═══ */}
            <section className="relative w-full h-screen flex items-center justify-center bg-[#05070f] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#e8391d] opacity-10 rounded-full blur-[180px] pointer-events-none" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center justify-center gap-3 mb-6">
                        <Palette size={16} className="text-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Book Cover Design</span>
                    </motion.div>

                    <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="font-black text-white uppercase leading-[0.95] mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                        BEFORE READERS READ A WORD,  <br /><span className="text-[#e8391d]">THEY SEE THE COVER.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-white/60 leading-[1.85] max-w-2xl mx-auto mb-10" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                        Your cover makes a promise. It tells readers what kind of journey they're about to take, what emotions they'll experience, and whether your book deserves their attention. Readers judge books by their covers, and we design covers that don't just look impressive, it sparks curiosity. Let us build trust and give readers a reason to click, pick up, or buy.
                    </motion.p>

                    <HeroButtons />
                </div>
            </section>

            {/* ═══ SECTION 2: SERVICE OVERVIEW ═══ */}
            <section id="overview" ref={overviewRef} className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />

                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="flex flex-col">
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Overview</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}>
                            DESIGNED TO CATCH EYES. <br /><span className="text-[#e8391d]">CREATED TO WIN READERS.</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-5" style={{ fontSize: "0.95rem" }}>
                            A great book cover combines creative design with strategic thinking to capture attention and spark interest. It communicates exactly who the book is for.
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-8" style={{ fontSize: "0.95rem" }}>
                            Our designers study your genre, audience, and marketplace to create covers that feel professional, memorable, and perfectly positioned alongside today's bestsellers. The goal isn't simply to make your book look good. It's to make readers want to know what's inside.
                        </motion.p>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                            {["Multiple Strategic Design Concepts", "Genre & Market Research Included", "Complete Print & eBook Cover Package", "Revisions Included for Final Refinement"].map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 group">
                                    <CheckCircle2 size={18} className="text-[#e8391d] shrink-0" />
                                    <span className="text-black/80 font-semibold text-[14px]">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="relative hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20" style={{ aspectRatio: "4/5" }}>
                            <Image src="/images/Services/DesignMarketing/book-cover-design/01.webp" alt="Book Cover Design Service" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/20 -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* ═══ SECTION 3: THE SCIENCE OF THE SHELF (UNIQUE) ═══ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-16 overflow-hidden">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <Sparkles size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Strategic Design</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            WHAT MAKES A GREAT <span className="text-[#e8391d]">COVER WORK?</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-white/40 mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
                            Readers make decisions quickly. The right design helps your book stand out while immediately feeling familiar to its target audience.
                        </motion.p>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {psychologyElements.map(({ icon: Icon, title, desc }) => (
                            <motion.div key={title} variants={fadeUp} className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-[#e8391d]/50 transition-all duration-500 group cursor-default relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[#e8391d]/5 rounded-bl-[100px] transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-xl bg-[#e8391d]/10 flex items-center justify-center mb-6 group-hover:bg-[#e8391d] transition-colors duration-300">
                                        <Icon size={26} className="text-[#e8391d] group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="font-black text-white uppercase text-lg mb-3 tracking-wide">{title}</h3>
                                    <p className="text-white/50 text-[14px] leading-relaxed">{desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══ SECTION 4: GENRE-PERFECT DESIGN (UNIQUE) ═══ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
                    <div className="text-center mb-16">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <BookOpen size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Genre Fluency</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            DESIGNED FOR THE READERS <span className="text-[#e8391d]">YOU WANT TO REACH</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-gray-400 mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
                            Every genre speaks a different visual language. We make sure your cover speaks it fluently.
                        </motion.p>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {genreDesigns.map(({ icon: Icon, title, desc, accent }) => (
                            <motion.div key={title} variants={fadeUp} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/5 hover:border-[#e8391d]/30 transition-all duration-500 group cursor-default">
                                <div className={`h-2 w-full bg-gradient-to-r ${accent}`} />
                                <div className="p-8">
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="w-12 h-12 rounded-xl bg-[#e8391d]/10 flex items-center justify-center group-hover:bg-[#e8391d] transition-colors duration-300">
                                            <Icon size={22} className="text-[#e8391d] group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <h3 className="font-black text-black uppercase text-lg tracking-wide">{title}</h3>
                                    </div>
                                    <p className="text-gray-500 text-[14px] leading-relaxed">{desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══ SECTION 5: DESIGN PROCESS ═══ */}
            <section className="relative w-full bg-[#111] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            HOW YOUR COVER <span className="text-[#e8391d]">COMES TO LIFE</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
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

            {/* ═══ SECTION 6: WHY CHOOSE OUR DESIGNERS ═══ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "1/1" }}>
                            <Image src="/images/Services/DesignMarketing/book-cover-design/02.jpg" alt="Book Cover Designers" fill className="object-cover" />
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
                            WHY AUTHORS TRUST US <br /><span className="text-[#e8391d]">WITH THEIR COVERS</span>
                        </motion.h2>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-5">
                            {[
                                "Research Before Design — We study your market before creating concepts, ensuring every design decision has purpose.",
                                "Multiple Creative Directions — You receive options, allowing you to choose the approach that best represents your book.",
                                "Print & Digital Ready — Every cover is prepared for both physical books and online storefronts.",
                                "Designed For Real-World Sales — We balance creativity with reader expectations to create covers that work in competitive marketplaces.",
                                "Attention To Every Detail — Typography, color, imagery, composition, and spacing are carefully considered from start to finish."
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

            {/* ═══ SECTION 7: SERVICE FAQS ═══ */}
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

            {/* ═══ SECTION 8: MASSIVE CTA ═══ */}
            <section className="relative w-full bg-[#e8391d] py-28 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center px-8 relative z-10">
                    <h2 className="font-black text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                        YOUR BOOK GETS ONE CHANCE TO MAKE A FIRST IMPRESSION
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Give your book its best chance to stand out with a cover that captures attention, reflects your story, and attracts the right readers.
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
                            <Phone size={16} /> SPEAK WITH OUR TEAM
                        </motion.a>
                    </div>
                </motion.div>
            </section>
            <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />
        </main>
    );
}