"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    BookOpen, ArrowRight, CheckCircle2, BarChart3, Lightbulb, Heart,
    PenTool, Minus, Plus, Phone, Users, Search, Brain, Target, TrendingUp,
    FileText
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
const bookTypes = [
    { icon: BarChart3, title: "MEMOIR", desc: "Personal accounts of the author’s life, often highlighting specific themes or experiences." },
    { icon: Lightbulb, title: "HISTORY", desc: "Explores events, eras, and social contexts using primary and secondary sources." },
    { icon: Brain, title: "PHILOSOPHY", desc: "Examines fundamental questions about existence, knowledge, and ethics. " },
    { icon: Heart, title: "PERSONAL ESSAY", desc: "Short, reflective works that explore personal experiences or opinions." },
];

const authoritySteps = [
    { step: "01", title: "REAL BOOKS", desc: "Turn your ideas into professionally written nonfiction books readers genuinely connect with.", icon: Brain },
    { step: "02", title: "SAVE TIME", desc: "Skip the stress of writing alone while experts handle research, structure, and storytelling.", icon: Target },
    { step: "03", title: "STRONGER IMPACT", desc: "Build credibility with engaging nonfiction writing designed to leave lasting impressions on readers.", icon: Search },
    { step: "04", title: "EASY PROCESS", desc: "Enjoy a smooth collaborative experience with attentive writers guiding your project from start to finish.", icon: TrendingUp },
];

const processSteps = [
    { step: "01", title: "CONSULTATION, STRATEGY & RESEARCH", desc: "Begin with a free consultation, then let us research your ideas, audience, goals, and materials to shape the perfect writing strategy.", icon: Target },
    { step: "02", title: "A COMPLETE TEAM BEHIND YOUR BOOK", desc: "Every expert, from ghostwriters and strategists to line and copy editors, works together to perfect your manuscript.", icon: BookOpen },
    { step: "03", title: "WRITING, REVISIONS & READER FEEDBACK", desc: "Get your ideas written, refined, edited, and tested with real readers to ensure clarity, quality, engagement, and audience connection.", icon: PenTool },
    { step: "04", title: "FINAL EDITING & QUALITY REVIEW", desc: "Professional line, sensitivity, and copy editing refine your manuscript for clarity, accuracy, and consistency, making it publishing-ready.", icon: CheckCircle2 },
];

const faqs = [
    { q: "Do I need to be a well-known expert to write a non-fiction book?", a: "No. Strong ideas, experiences, knowledge, or unique perspectives matter more than fame when creating an engaging non-fiction book readers value." },
    { q: "What makes a non-fiction book successful?", a: "A successful non-fiction book combines authenticity, clarity, valuable insights, engaging storytelling, and meaningful content readers emotionally connect with and remember." },
    { q: "How do you organize a book when I have so many ideas?", a: "We organize your ideas into clear chapters, themes, and narratives, creating structure while preserving your unique voice, message, and vision." },
    { q: "Do I need to do all the research myself?", a: "No. Our writing team assists with research, fact-checking, organization, and development to strengthen your book’s accuracy, depth, and overall quality." },
    { q: "How is non-fiction writing different from memoir writing?", a: "Non-fiction focuses broadly on facts, ideas, or expertise, while memoir writing centers specifically on personal experiences, emotions, memories, and life stories." },
];

export default function NonFictionWritingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);


    return (
        <main className="w-full overflow-hidden" style={{ fontFamily: "'Raleway', Arial, sans-serif" }}>

            {/* ════════════════════════════════════════════
                SECTION 1: CINEMATIC NON-FICTION HERO
            ════════════════════════════════════════════ */}
            <section className="relative w-full min-h-screen flex items-center justify-center bg-[#05070f] overflow-hidden pt-28 pb-12">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#e8391d] opacity-10 rounded-full blur-[200px] pointer-events-none" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center justify-center gap-3 mb-6">
                        <BarChart3 size={16} className="text-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Non-Fiction Writing Services</span>
                    </motion.div>

                    <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="font-black text-white uppercase leading-[0.95] mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                        TELL A BIGGER, BOLDER STORY WITH OUR <br /><span className="text-[#e8391d]">NON-FICTION WRITING SERVICE.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-white/60 leading-[1.85] max-w-2xl mx-auto mb-10" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                        Our professional non-fiction writing service lets you tell a more over-the-top, incredible story in a non-fiction form—start your story today.
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
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">REAL STORIES. REAL IMPACT.</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}>
                            NARRATIVE NON-FICTION, <span className="text-[#e8391d]">REIMAGINED YOUR WAY.</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-5" style={{ fontSize: "0.95rem" }}>
                            Most authors, when writing from their memories and their life stories, gloss over things and leave out the difficult parts. Writing a memoir, biography, or personal essay requires the truth to be integrated as we remember it. A non-fiction story requires honesty and candor, helping authors achieve an authentic voice that allows readers to connect with their writing.
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-8" style={{ fontSize: "0.95rem" }}>
                            The American cookie-cutter format of narrative non-fiction is gripping, but it’s quite formulaic. And we don’t follow it. Instead, we take the basic tenets of narrative non-fiction and adapt them to the kind of storytelling modern readers love. Our writers let you tell your story in a different way.
                        </motion.p>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                            {["Authentic Human Storytelling", "Modern Reader-Focused Writing", "Honest & Emotion-Driven Narratives", "Beyond Formulaic Non-Fiction"].map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 group">
                                    <CheckCircle2 size={18} className="text-[#e8391d] shrink-0" />
                                    <span className="text-black/80 font-semibold text-[14px]">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="relative hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20" style={{ aspectRatio: "4/5" }}>
                            <Image src="/images/Services/WritingServices/non-fiction-writing/01.png" alt="Non-Fiction Writing Service" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/20 -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 3: UNIQUE - THE AUTHORITY BLUEPRINT
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

                <div className="max-w-[1100px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-20 overflow-hidden">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <TrendingUp size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">The Blueprint</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            WHAT YOU GET <span className="text-[#e8391d]">WITH US</span>
                        </motion.h2>
                    </div>

                    {/* Blueprint Steps with Connecting Lines */}
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-0 relative">

                        {authoritySteps.map(({ step, title, desc, icon: Icon }, i) => (
                            <motion.div key={step} variants={fadeUp} className="relative flex items-start gap-8 pb-12 last:pb-0">
                                {/* Left Node & Line */}
                                <div className="relative flex flex-col items-center shrink-0">
                                    <div className="w-14 h-14 rounded-full bg-[#e8391d] flex items-center justify-center shadow-lg shadow-[#e8391d]/30 border-4 border-[#05070f] z-10">
                                        <Icon size={22} className="text-white" />
                                    </div>
                                    {/* Vertical connecting line */}
                                    {i < authoritySteps.length - 1 && (
                                        <div className="absolute top-14 bottom-0 w-[2px] bg-white/10" />
                                    )}
                                </div>

                                {/* Right Content */}
                                <div className="pt-2 pb-6">
                                    <span className="text-[#e8391d] font-black text-sm tracking-widest mb-1 block">{step}</span>
                                    <h3 className="font-black text-white uppercase text-xl mb-2 tracking-wide">{title}</h3>
                                    <p className="text-white/50 text-[14px] leading-relaxed max-w-md">{desc}</p>
                                </div>
                            </motion.div>
                        ))}

                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 4: NON-FICTION CATEGORIES
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
                    <div className="text-center mb-16 overflow-hidden">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            WE MASTER ALL POPULAR <span className="text-[#e8391d]">NONFICTION GENRES</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bookTypes.map(({ icon: Icon, title, desc }) => (
                            <motion.div key={title} variants={fadeUp} className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#e8391d]/50 hover:shadow-xl transition-all duration-500 group cursor-default flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-xl bg-[#e8391d]/10 flex items-center justify-center shrink-0 group-hover:bg-[#e8391d] transition-colors duration-300">
                                    <Icon size={26} className="text-[#e8391d] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <h3 className="font-black text-black uppercase text-lg mb-2 tracking-wide">{title}</h3>
                                    <p className="text-gray-500 text-[14px] leading-relaxed">{desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 5: THE WRITING PROCESS
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#111] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "1/1" }}>
                            <Image src="/images/Services/WritingServices/non-fiction-writing/02.jpg" alt="Non-Fiction Researchers" fill className="object-cover" />
                            <div className="absolute inset-0 bg-[#e8391d]/20 mix-blend-multiply" />
                        </div>
                        <div className="absolute -bottom-5 -right-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/25 -z-0" />
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Our Process</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-white uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                            CUSTOMIZED WRITING PROCESS <br /><span className="text-[#e8391d]">BUILT AROUND YOUR GOALS.</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-white/60 leading-[1.85] mb-10" style={{ fontSize: "0.95rem" }}>
                            We have built a customized writing process for non-fiction projects that transforms your ideas into compelling, professionally crafted books.
                        </motion.p>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-8">
                            {processSteps.map(({ step, title, desc, icon: Icon }) => (
                                <motion.div key={step} variants={fadeUp} className="flex gap-5 items-start group">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#e8391d] group-hover:border-[#e8391d] transition-colors duration-300">
                                        <Icon size={20} className="text-white/60 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white uppercase tracking-wider mb-1">{step} — {title}</h4>
                                        <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 6: WHY CHOOSE OUR STRATEGISTS
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            WHY CHOOSE <span className="text-[#e8391d]">BEXLEY PUBLISHING</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "TURN MEMORIES INTO POWERFUL BOOKS", desc: "Because we transform your life experiences and ideas into compelling, professionally written nonfiction books and unforgettable stories readers remember." },
                            { title: "SIMPLE PROCESS, PROFESSIONAL RESULTS", desc: "Because we guide your project from idea development to polished final delivery, giving you an easy, collaborative writing experience." },
                            { title: "EVERYTHING YOUR BOOK NEEDS", desc: "Because we ensure timely communication, expert storytelling, error-free editing, affordable pricing, and high-quality nonfiction writing tailored to your publishing goals." },
                        ].map(({ title, desc }) => (
                            <motion.div key={title} variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center hover:border-[#e8391d]/50 transition-colors duration-500">
                                <h3 className="font-black text-white uppercase text-lg mb-3 tracking-wide">{title}</h3>
                                <p className="text-white/50 text-[14px] leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 7: SERVICE FAQS
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[900px] mx-auto px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-black uppercase leading-none" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            FREQUENTLY ASKED <span className="text-[#e8391d]">QUESTIONS</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-4">
                        {faqs.map(({ q, a }, i) => (
                            <motion.div key={i} variants={fadeUp} className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-[#e8391d]/30 transition-colors duration-300">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left group cursor-pointer">
                                    <span className="font-bold text-black text-[15px] pr-4">{q}</span>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? "bg-[#e8391d] text-white" : "bg-gray-100 text-black/50"}`}>
                                        {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                    </div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {openFaq === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }} className="overflow-hidden">
                                            <div className="px-6 pb-6 text-gray-500 text-[14px] leading-relaxed">
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
                        READY TO TURN MEMORIES INTO MASTERPIECES?
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Let us empower your readers with real insights and ensure the beauty of realism in writing.
                    </p>
                    <div className="flex flex-wrap justify-center gap-5">
                        <button
                            type="button"
                            style={{ backgroundColor: "#fff", color: "#e8391d", gap: "14px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
                            className="inline-flex items-center gap-3 bg-black text-white font-black uppercase tracking-widest px-10 py-5 rounded-xl text-[14px] cursor-pointer transition-all duration-300"
                            onClick={() => setQuoteModal(true)}
                        >
                            <FileText size={16} />
                            Start Your Book
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