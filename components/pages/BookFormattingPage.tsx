"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    BookType, ArrowRight, CheckCircle2, BookOpen, Ruler, Type,
    AlignJustify, MoveVertical, TextCursorInput, Printer, Phone,
    Minus, Plus, Sparkles, FileCheck, Palette, Scan, Maximize, BoxSelect,
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

const typesettingDetails = [
    { icon: TextCursorInput, title: "CHAPTER OPENINGS THAT FEEL PROFESSIONAL", desc: "Well-designed chapter pages create a strong first impression and give every new section room to breathe." },
    { icon: AlignJustify, title: "CLEANER TEXT, BETTER READABILITY", desc: "Balanced spacing and proper text alignment help pages look organized and easy on the eyes." },
    { icon: MoveVertical, title: "SMOOTH PAGE FLOW", desc: "We eliminate awkward line breaks and spacing issues that can interrupt the reading experience." },
    { icon: Type, title: "THOUGHTFUL TYPOGRAPHY", desc: "Fonts are carefully selected to match your book's style while keeping readability front and center." },
    { icon: Maximize, title: "BALANCED PAGE LAYOUTS", desc: "Margins, spacing, and page structure are adjusted to create a comfortable reading experience." },
    { icon: Palette, title: "CONSISTENT HEADERS & PAGE NUMBERS", desc: "Book titles, author names, chapter references, and page numbers are placed with consistency throughout." },
];

const trimSizes = [
    { size: '5.08" × 7.87"', label: "MASS MARKET PAPERBACK", desc: "A compact format commonly used for thrillers, romance, science fiction, and other fast-paced fiction titles.", w: "w-12", h: "h-[74px]" },
    { size: '5.5" × 8.5"', label: "TRADE PAPERBACK", desc: "One of the most popular sizes for novels, offering a comfortable balance between readability and portability.", w: "w-14", h: "h-[86px]" },
    { size: '6" × 9"', label: "NONFICTION STANDARD", desc: "A professional format widely used for business books, memoirs, self-help titles, and educational content.", w: "w-16", h: "h-[96px]" },
    { size: '8.5" × 8.5"', label: "SQUARE FORMAT", desc: "Well suited for children's books, photography collections, gift books, and highly visual publications.", w: "w-[72px]", h: "h-[72px]" },
    { size: '8.5" × 11"', label: "WORKBOOK & EDUCATIONAL", desc: "Ideal for manuals, textbooks, workbooks, journals, and content that requires additional writing space.", w: "w-20", h: "h-[104px]" },
    { size: '', label: "CUSTOM SIZES AVAILABLE", desc: "Need something different? We can format your book to meet custom printing specifications and publishing requirements.", w: "w-20", h: "h-[104px]" },
];

const processSteps = [
    { step: "01", title: "PLANNING THE LAYOUT", desc: "We establish the formatting style, typography, trim size, and design elements that best suit your book.", icon: Palette },
    { step: "02", title: "INTERIOR FORMATTING", desc: "Your manuscript is professionally formatted with clean chapter layouts, balanced spacing, and consistent page design.", icon: BookType },
    { step: "03", title: "REVIEW & REFINEMENT", desc: "You receive a formatted proof for review, allowing us to fine-tune details before final delivery.", icon: Scan },
    { step: "04", title: "FINAL FILE PREPARATION", desc: "We deliver publication-ready files optimized for print-on-demand services, publishers, and digital distribution platforms.", icon: Printer },
];

const faqs = [
    { q: "What's The Difference Between Book Formatting and Typesetting?", a: "Formatting organizes the manuscript structure, while typesetting focuses on page design, readability, spacing, and visual presentation." },
    { q: "How Do I Choose the Right Book Size?", a: "The ideal trim size depends on your genre, audience, content type, and preferred reading experience." },
    { q: "Will My Files Meet Publishing Platform Requirements?", a: "Yes, we prepare files according to industry standards for major print-on-demand and publishing platforms." },
    { q: "Can You Format Books with Images and Visual Content?", a: "Absolutely. We format images, charts, tables, captions, and illustrations while maintaining consistency and readability." },
    { q: "Can I Have Input on the Book's Design?", a: "Yes, you can share preferences for fonts, styling, and overall presentation before formatting begins." },
    { q: "What Files Will I Receive?", a: "You'll receive publication-ready files prepared for print production, digital publishing, and online distribution." },
];

export default function BookFormattingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);

    return (
        <main className="w-full overflow-hidden" style={{ fontFamily: "'Raleway', Arial, sans-serif" }}>

            {/* ════ SECTION 1: CINEMATIC SERVICE HERO ═════ */}
            <section className="relative w-full h-screen flex items-center justify-center bg-[#05070f] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#e8391d] opacity-10 rounded-full blur-[180px] pointer-events-none" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center justify-center gap-3 mb-6">
                        <BookType size={16} className="text-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Book Formatting & Typesetting</span>
                    </motion.div>

                    <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="font-black text-white uppercase leading-[0.95] mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                        YOUR BOOK SHOULD LOOK AS <br /><span className="text-[#e8391d]">PROFESSIONAL AS IT READS</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-white/60 leading-[1.85] max-w-2xl mx-auto mb-10" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                        Our book formatting service prepares your manuscript for both print and digital publishing with clean layouts, professional typesetting, and industry-standard formatting that helps your book stand out for all the right reasons.
                    </motion.p>

                    <HeroButtons />
                </div>
            </section>

            {/* ════ SECTION 2: SERVICE OVERVIEW ════ */}
            <section id="overview" ref={overviewRef} className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />

                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="flex flex-col">
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Overview</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}>
                            GREAT BOOKS DESERVE MORE THAN <br /><span className="text-[#e8391d]">BASIC FORMATTING</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-5" style={{ fontSize: "0.95rem" }}>
                            A well-written book can lose its impact when the formatting feels inconsistent, cluttered, or difficult to read. Professional formatting brings everything together, creating a smooth reading experience that helps readers stay focused on your words, not layout distractions.
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-8" style={{ fontSize: "0.95rem" }}>
                            Our book formatting service prepares your manuscript for both print and digital publishing. From typography and chapter design to eBook conversion and print-ready files, we ensure every page looks polished, professional, and ready for publication.
                        </motion.p>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                            {["Print & eBook Formatting", "Professional Typesetting", "Publishing Platform Compatibility", "Reader-Friendly Layout Design"].map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 group">
                                    <CheckCircle2 size={18} className="text-[#e8391d] shrink-0" />
                                    <span className="text-black/80 font-semibold text-[14px]">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="relative hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20" style={{ aspectRatio: "4/5" }}>
                            <Image src="/images/Services/EditingPublishing/book-formatting/01.jpg" alt="Book Formatting Service" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/20 -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* ════ SECTION 3: THE ART OF TYPESETTING (UNIQUE) ════ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-16 overflow-hidden">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <Ruler size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Precision Details</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            DETAILS READERS MAY NOT NOTICE <br /> <span className="text-[#e8391d]">BUT THEY ALWAYS FEEL</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-white/40 mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
                            Professional formatting is more than placing words on a page. It's the small details that make a book feel polished, comfortable, and professionally published.
                        </motion.p>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {typesettingDetails.map(({ icon: Icon, title, desc }) => (
                            <motion.div key={title} variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-[#e8391d]/50 transition-all duration-500 group cursor-default relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[#e8391d]/5 rounded-bl-[100px] transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-[#e8391d]/10 flex items-center justify-center mb-6 group-hover:bg-[#e8391d] transition-colors duration-300">
                                        <Icon size={22} className="text-[#e8391d] group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="font-black text-white uppercase text-lg mb-2 tracking-wide">{title}</h3>
                                    <p className="text-white/50 text-[14px] leading-relaxed">{desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════ SECTION 4: CHOOSE YOUR TRIM SIZE (UNIQUE) ════ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
                    <div className="text-center mb-16">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <BoxSelect size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Book Dimensions</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            FIND THE SIZE THAT FITS <span className="text-[#e8391d]">YOUR BOOK BEST</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-gray-400 mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
                            Different books call for different formats. We help you choose the right trim size based on your genre, audience, and publishing goals.
                        </motion.p>
                    </div>

                    {/* Drop shadow centered container */}
                    <div className="bg-white rounded-3xl shadow-2xl shadow-black/10 p-8 md:p-10">
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trimSizes.map(({ size, label, desc, w, h }) => (
                                <motion.div key={label} variants={fadeUp} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#e8391d]/40 hover:shadow-xl hover:shadow-[#e8391d]/5 transition-all duration-500 group cursor-default flex flex-col items-center text-center">
                                    <div className="flex items-end justify-center mb-6 h-[120px]">
                                        <div className={`${w} ${h} bg-gray-100 border-2 border-gray-300 rounded-sm group-hover:border-[#e8391d] group-hover:bg-[#e8391d]/5 transition-all duration-300 flex flex-col p-1.5`}>
                                            <div className="w-full h-1 bg-gray-300 group-hover:bg-[#e8391d]/40 rounded-full mb-1" />
                                            <div className="w-3/4 h-0.5 bg-gray-200 group-hover:bg-[#e8391d]/20 rounded-full mb-1" />
                                            <div className="flex-1 grid grid-cols-2 gap-0.5">
                                                <div className="space-y-0.5">
                                                    <div className="w-full h-0.5 bg-gray-200 rounded-full" />
                                                    <div className="w-full h-0.5 bg-gray-200 rounded-full" />
                                                    <div className="w-full h-0.5 bg-gray-200 rounded-full" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="w-full h-0.5 bg-gray-200 rounded-full" />
                                                    <div className="w-full h-0.5 bg-gray-200 rounded-full" />
                                                    <div className="w-full h-0.5 bg-gray-200 rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[#e8391d] font-black text-[13px] tracking-widest mb-1">{size}</span>
                                    <h3 className="font-black text-black uppercase text-sm mb-2 tracking-wide">{label}</h3>
                                    <p className="text-gray-400 text-[12px] leading-relaxed">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ════ SECTION 5: FORMATTING PROCESS ════ */}
            <section className="relative w-full bg-[#111] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            HOW WE SHAPE YOUR MANUSCRIPT INTO A <br /><span className="text-[#e8391d]">PROFESSIONAL BOOK</span>
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

            {/* ════ SECTION 6: WHY CHOOSE OUR FORMATTERS ════ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "1/1" }}>
                            <Image src="/images/Services/EditingPublishing/book-formatting/02.jpg" alt="Book Formatting Team" fill className="object-cover" />
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
                            WHY AUTHORS TRUST OUR  <br /><span className="text-[#e8391d]">FORMATTING TEAM</span>
                        </motion.h2>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-5">
                            {[
                                "Reader-Focused Design — Every page is structured to improve readability and reduce distractions.",
                                "Publishing Industry Standards — Formatting follows professional publishing conventions used across modern print and digital books.",
                                "Attention To Every Detail — Spacing, typography, page flow, chapter styling, and navigation are carefully reviewed.",
                                "Flexible Formatting Solutions — From simple novels to image-heavy publications, we adapt layouts to fit the needs of each project.",
                                "Ready For Publication — Your files arrive prepared for publishing, distribution, and reader delivery."
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

            {/* ════ SECTION 7: SERVICE FAQS ═════ */}
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

            {/* ════ SECTION 8: MASSIVE CTA ════ */}
            <section className="relative w-full bg-[#e8391d] py-28 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center px-8 relative z-10">
                    <h2 className="font-black text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                        GIVE YOUR BOOK THE PROFESSIONAL FINISH IT DESERVES
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Let us create a polished, publication-ready layout that looks professional, reads effortlessly, and is ready for both print and digital readers.
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
                            <Phone size={16} /> Call Us Now
                        </motion.a>
                    </div>
                </motion.div>
            </section>
            <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />
        </main>
    );
}