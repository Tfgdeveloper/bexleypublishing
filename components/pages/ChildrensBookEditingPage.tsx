"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    Sparkles, ArrowRight, CheckCircle2, BookOpen, Baby, Palette,
    Volume2, PenLine, Eye, Users, FileText, Phone, Minus, Plus,
    Search, ShieldCheck, BookMarked, Type, Clock, BookX, Rocket
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
const ageCategories = [
    { icon: Baby, title: "Board Books", age: "Ages 0–3", desc: "Simple concepts, playful repetition, and language designed for the earliest readers and listeners.", wordCount: "0–100 words" },
    { icon: BookMarked, title: "Picture Books", age: "Ages 3–8", desc: "Stories that balance text and illustrations while creating memorable moments children want to revisit.", wordCount: "100–1,000 words" },
    { icon: BookOpen, title: "Early Readers", age: "Ages 6–9", desc: "Clear vocabulary, manageable chapters, and engaging stories that help build reading confidence.", wordCount: "2,000–8,000 words" },
    { icon: Rocket, title: "Middle Grade", age: "Ages 8–12", desc: "Character-driven adventures, meaningful themes, and stories that respect young readers' intelligence.", wordCount: "20,000–55,000 words" },
];

const readAloudChecks = [
    { icon: Volume2, title: "READ-ALOUD RHYTHM", desc: "We smooth out awkward wording, improve flow, and create language that's enjoyable to read aloud." },
    { icon: BookOpen, title: "PAGE-TURN MOMENTUM", desc: "Every page should create curiosity, excitement, laughter, or anticipation for what's next." },
    { icon: Eye, title: "SPACE FOR ILLUSTRATIONS", desc: "We help ensure the text works alongside the artwork instead of competing with it." },
    { icon: Type, title: "AGE-APPROPRIATE VOCABULARY", desc: "Language should challenge young readers without confusing or overwhelming them." },
    { icon: Clock, title: "ATTENTION-SPAN FRIENDLY PACING", desc: "We trim unnecessary detours and keep the story moving at the right speed." },
    { icon: BookX, title: "SENSITIVITY & INCLUSION REVIEW", desc: "We identify potential concerns and help create stories that feel welcoming and thoughtful." },
];

const processSteps = [
    { step: "01", title: "READER AGE ASSESSMENT", desc: "We evaluate your manuscript based on the intended age group, reading level, vocabulary, and story expectations.", icon: Search },
    { step: "02", title: "STORY DEVELOPMENT REVIEW", desc: "Characters, pacing, emotional moments, structure, and overall storytelling receive a detailed evaluation.", icon: PenLine },
    { step: "03", title: "READ-ALOUD POLISH", desc: "We refine rhythm, sentence flow, word choice, and readability for young listeners and readers.", icon: Volume2 },
    { step: "04", title: "FINAL REVIEW", desc: "The manuscript receives a final quality check for consistency, age suitability, and overall reader experience.", icon: ShieldCheck },
];

const faqs = [
    { q: "Can you edit rhyming children's books?", a: "Yes. We review both rhyme and rhythm to ensure the story reads naturally." },
    { q: "Do you review illustration notes?", a: "Absolutely. We help ensure text and artwork work together effectively." },
    { q: "Why is children's book editing so detailed?", a: "Because every word, sentence, and page turn plays a larger role in the reading experience." },
    { q: "Can you help reduce my word count?", a: "Yes. We identify areas that can be tightened without weakening the story." },
    { q: "What is a sensitivity review?", a: "It's a review of themes, language, and representation to identify potential concerns." },
    { q: "Do you work with self-published authors?", a: "Yes. We regularly help independent authors prepare children's books for publication." },
];

export default function ChildrensBookEditingPage() {
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
                        <Sparkles size={16} className="text-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Children's Book Editing</span>
                    </motion.div>

                    <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="font-black text-white uppercase leading-[0.95] mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                        STORIES KIDS WANT TO <br /><span className="text-[#e8391d]">HEAR AGAIN</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-white/60 leading-[1.85] max-w-2xl mx-auto mb-10" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                        Children may be small, but they're tough critics. If a story drags, they'll lose interest. If the language feels awkward, they'll tune out. If the magic isn't there, they'll move on. Our children's book editors help shape stories that capture attention, spark imagination, and keep young readers turning pages, asking questions, and coming back for "just one more read."
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
                            BUILT FOR YOUNG READERS. <br /><span className="text-[#e8391d]">EDITED FOR BIG IMPACT.</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-5" style={{ fontSize: "0.95rem" }}>
                            Editing a children's book requires a completely different approach than editing for adults. Every word matters. Every page turn matters. Every sentence needs to sound natural when read aloud.
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-8" style={{ fontSize: "0.95rem" }}>
                            From initial concepts to final polish, we help strengthen your story while ensuring it connects with the age group it's written for.
                        </motion.p>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                            {["Age-Appropriate Language", "Read-Aloud Flow & Rhythm", "Story Structure & Pacing", "Inclusive & Reader-Friendly Review"].map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 group">
                                    <CheckCircle2 size={18} className="text-[#e8391d] shrink-0" />
                                    <span className="text-black/80 font-semibold text-[14px]">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="relative hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20" style={{ aspectRatio: "4/5" }}>
                            <Image src="/images/Services/EditingPublishing/children-s-book-editing/01.jpg" alt="Children's Book Editing Service" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/20 -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 3: AGE-SPECIFIC EXPERTISE (UNIQUE)
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-16 overflow-hidden">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <Baby size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">One Size Does Not Fit All</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            DIFFERENT AGES. <span className="text-[#e8391d]">DIFFERENT RULES.</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-white/40 mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
                            A toddler, a new reader, and a middle-grade reader don't experience stories the same way. That's why every manuscript is edited with its audience in mind.
                        </motion.p>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ageCategories.map(({ icon: Icon, title, age, desc, wordCount }) => (
                            <motion.div key={title} variants={fadeUp} className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-[#e8391d]/50 transition-all duration-500 group cursor-default relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[#e8391d]/5 rounded-bl-[100px] transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-5 flex-wrap">
                                        <div className="w-14 h-14 rounded-xl bg-[#e8391d]/10 flex items-center justify-center group-hover:bg-[#e8391d] transition-colors duration-300">
                                            <Icon size={26} className="text-[#e8391d] group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <span className="bg-[#e8391d]/10 text-[#e8391d] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{age}</span>
                                    </div>
                                    <h3 className="font-black text-white uppercase text-lg mb-2 tracking-wide">{title}</h3>
                                    <p className="text-white/50 text-[14px] leading-relaxed mb-4">{desc}</p>
                                    <span className="inline-block bg-white/[0.05] border border-white/10 text-white/30 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{wordCount}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 4: THE READ-ALOUD TEST (UNIQUE)
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-[2px] bg-[#e8391d]" />
                                <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">The Critical Test</span>
                            </motion.div>

                            <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                                THE ULTIMATE TEST: <br /><span className="text-[#e8391d]">READ IT OUT LOUD</span>
                            </motion.h2>

                            <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-10" style={{ fontSize: "0.95rem" }}>
                                CChildren's books aren't just read. They're performed. At bedtime. In classrooms. On couches. For the fifteenth time this week. If a sentence feels clunky when spoken, children notice. Parents notice too.
                            </motion.p>

                            <motion.div variants={staggerContainer} className="flex flex-col gap-5">
                                {readAloudChecks.slice(0, 3).map(({ icon: Icon, title, desc }) => (
                                    <motion.div key={title} variants={fadeUp} className="flex items-start gap-4 group">
                                        <div className="mt-1 w-8 h-8 rounded-lg bg-[#e8391d]/10 flex items-center justify-center shrink-0 group-hover:bg-[#e8391d] transition-colors duration-300">
                                            <Icon size={16} className="text-[#e8391d] group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-black font-bold text-[15px] mb-1">{title}</p>
                                            <p className="text-gray-400 text-[14px] leading-relaxed">{desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative hidden lg:block">
                            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "1/1" }}>
                                <Image src="/images/Services/EditingPublishing/children-s-book-editing/02.jpg" alt="Children Reading" fill className="object-cover" />
                                <div className="absolute inset-0 bg-[#e8391d]/20 mix-blend-multiply" />
                            </div>
                            <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/25 -z-0" />
                        </motion.div>
                    </div>

                    {/* Remaining Read-Aloud Checks */}
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        {readAloudChecks.slice(3).map(({ icon: Icon, title, desc }) => (
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
                SECTION 5: EDITING PROCESS
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#111] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            OUR CHILDREN'S BOOK EDITING<span className="text-[#e8391d]">PROCESS</span>
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
                SECTION 6: WHY CHOOSE OUR CHILDREN'S EDITORS
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "1/1" }}>
                            <Image src="/images/Services/EditingPublishing/children-s-book-editing/03.jpg" alt="Children's Book Editors" fill className="object-cover" />
                            <div className="absolute inset-0 bg-[#e8391d]/20 mix-blend-multiply" />
                        </div>
                        <div className="absolute -bottom-5 -right-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/25 -z-0" />
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Why Bexley?</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-10" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                            WHY AUTHORS TRUST US WITH <br /><span className="text-[#e8391d]">CHILDREN'S STORIES</span>
                        </motion.h2>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-5">
                            {[
                                "Understanding Young Readers — Different ages respond to different storytelling techniques, and we know how to edit for each stage.",
                                "Thinking Beyond Word Count — A shorter book isn't necessarily easier to write. Every word carries more responsibility.",
                                "Respecting The Role of Illustrations — Great children's books leave room for artwork to help tell the Story.",
                                "Loving Rhythm & Readability — Stories should feel smooth, natural, and enjoyable when spoken aloud.",
                                "Keeping The Fun in The Story — Educational messages matter, but entertainment always comes first."
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
                        LET'S POLISH YOUR STORY UNTIL IT SPARKLES
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Great ideas deserve great execution. We'll help refine every word, strengthen every page, and bring out the best in your manuscript.
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