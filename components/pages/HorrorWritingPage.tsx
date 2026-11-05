"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    Skull, ArrowRight, CheckCircle2, Ghost, Brain, Eye,
    BookOpen, PenTool, Minus, Plus, Phone, Users, Home, Droplets, Wind,
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

const subGenres = [
    { icon: Ghost, title: "PSYCHOLOGICAL HORROR", desc: "Focusing on the mental, emotional, and psychological states to frighten, disturb, or unsettle readers." },
    { icon: Brain, title: "SUPERNATURAL HORROR", desc: "Including stories that have elements beyond scientific understanding, often involving gods, demons, or ghosts." },
    { icon: Droplets, title: "SLASHER HORROR", desc: "Characterized by a violent psychopath hunting and killing a sequence of victims in a terrifying manner." },
    { icon: Eye, title: "COSMIC HORROR", desc: "Exploring unknown entities, ancient powers, madness, and humanity’s fear of the universe." },
];

const dreadSteps = [
    { num: "01", title: "DARK ATMOSPHERE", desc: "Build haunting settings filled with tension, mystery, fear, and emotional unease that grip readers instantly.", icon: Home, color: "#94a3b8" },
    { num: "02", title: "PSYCHOLOGICAL HORROR", desc: "Create disturbing emotional experiences that slowly intensify fear, paranoia, suspense, and unforgettable psychological tension.", icon: Wind, color: "#a78bfa" },
    { num: "03", title: "MONSTERS & CREATURES", desc: "Design terrifying creatures, supernatural forces, and chilling villains that leave lasting fear in every scene.", icon: Droplets, color: "#e8391d" },
    { num: "04", title: "SUSPENSE THAT LASTS", desc: "Keep readers constantly anxious with unpredictable twists, escalating danger, emotional stakes, and terrifying story progression.", icon: Skull, color: "#f87171" },
];

const processSteps = [
    { step: "01", title: "IDEA TO OUTLINE", desc: "Share your horror concept while we plan structure, characters, suspense, and terrifying story direction.", icon: Brain },
    { step: "02", title: "WRITING & EDITING", desc: "Professional horror writers create gripping chapters, then polish every scene through detailed editing processes.", icon: Wind },
    { step: "03", title: "DESIGN & FORMATTING", desc: "Dark visuals, premium formatting, striking covers, and professional layouts make your horror book unforgettable.", icon: Eye },
    { step: "04", title: "PUBLISHING & MARKETING", desc: "Publish confidently with complete distribution, promotion, and marketing strategies designed for horror audiences.", icon: Skull },
];

const faqs = [
    { q: "How do you write horror that actually scares people?", a: "We focus on suspense, emotions, and fear of the unknown to keep readers uneasy long after finishing the story." },
    { q: "What is the difference between Terror and Horror?", a: "Terror builds fear and anticipation, while horror shows the disturbing truth that creates shock, discomfort, and emotional reaction." },
    { q: "How much gore is too much gore?", a: "Too much gore can overwhelm readers. Strong horror balances violence with suspense, emotion, tension, and meaningful storytelling moments." },
    { q: "Can you write horror that is more atmospheric than violent?", a: "Absolutely. We create dark, unsettling atmospheres using tension, mystery, isolation, and psychological fear instead of graphic violence alone." },
    { q: "How do you make the setting feel like a character?", a: "We give settings emotion, history, mood, and influence, making every location feel alive, haunting, and deeply connected emotionally." },
];

export default function HorrorWritingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);

    return (
        <main className="w-full overflow-hidden" style={{ fontFamily: "'Raleway', Arial, sans-serif" }}>

            <section className="relative w-full min-h-screen flex items-center justify-center bg-[#05070f] overflow-hidden pt-28 pb-12">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#e8391d] opacity-10 rounded-full blur-[200px] pointer-events-none" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center justify-center gap-3 mb-6">
                        <Skull size={16} className="text-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Horror Writing Services</span>
                    </motion.div>

                    <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="font-black text-white uppercase leading-[0.95] mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                        CRAFT TENSION, DREAD, AND SUSPENSE TO <br /><span className="text-[#e8391d]">PROVOKE AN EMOTIONAL REACTION</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-white/60 leading-[1.85] max-w-2xl mx-auto mb-10" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                        Came up with your horror concept? Let our horror writers bring your story to life, thrilling readers with frightening ideas and vivid imagery!
                    </motion.p>

                    <HeroButtons />
                </div>
            </section>

            <section id="overview" ref={overviewRef} className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />

                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="flex flex-col">
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Masters of Dread</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}>
                            HOME TO THE GREATEST <span className="text-[#e8391d]">HORROR FICTION WRITERS.</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-5" style={{ fontSize: "0.95rem" }}>
                            Writing horror effectively requires an author to understand the core elements of this popular genre and develop a bone-chilling craft. Instead of just a genre, it is a category with various subgenres, each with its own unique characteristics. A horror story or drama requires atmosphere and suspense, achieved through psychological manipulation and the 'uncanny valley', helping authors evoke dread and tension. 
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-8" style={{ fontSize: "0.95rem" }}>
                            Horror writers at Bexley Publishing focus on all fear factors that resonate with readers, whether it's logical or biological. If you need to develop a unique premise to serve as the foundation for your horror story or write from scratch, let us know. 
                        </motion.p>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                            {["Fear-Driven Story Development ", "Psychological Fear & Suspense ", "Unique Horror Concept Development ", "Dark Atmosphere & Tension Building"].map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 group">
                                    <CheckCircle2 size={18} className="text-[#e8391d] shrink-0" />
                                    <span className="text-black/80 font-semibold text-[14px]">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="relative hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20" style={{ aspectRatio: "4/5" }}>
                            <Image src="/images/Services/WritingServices/horror-writing/01.jpg" alt="Horror Writing Service" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/20 -z-10" />
                    </motion.div>
                </div>
            </section>

            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

                <div className="max-w-[1100px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-20 overflow-hidden">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <Eye size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">The Framework</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            FEAR BUILT <span className="text-[#e8391d]">WITH PURPOSE</span>
                        </motion.h2>
                        <p className="text-white/40 max-w-lg mx-auto mt-4 text-[14px] leading-relaxed">We write in a way that keeps readers disturbed long after every chapter ends by crafting suspense, tension, atmosphere, and psychological terror.</p>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-12 relative">
                        <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />

                        {dreadSteps.map(({ num, title, desc, icon: Icon, color }, i) => (
                            <motion.div key={num} variants={fadeUp} className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                <div className={`hidden lg:block flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <h3 className="font-black text-white uppercase text-2xl mb-2">{title}</h3>
                                    <p className="text-white/50 text-[14px] leading-relaxed">{desc}</p>
                                </div>

                                <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-[#05070f]" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}40` }}>
                                    <Icon size={20} className="text-white" />
                                </div>

                                <div className="flex-1 lg:hidden">
                                    <h3 className="font-black text-white uppercase text-xl mb-1">{title}</h3>
                                    <p className="text-white/50 text-[13px] leading-relaxed">{desc}</p>
                                </div>

                                <div className="hidden lg:block flex-1"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
                    <div className="text-center mb-16 overflow-hidden">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            WE COVER EVERY MAJOR <span className="text-[#e8391d]">HORROR SUBGENRE</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {subGenres.map(({ icon: Icon, title, desc }) => (
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

            <section className="relative w-full bg-[#111] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Our Process</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-white uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                            OUR HORROR <br /><span className="text-[#e8391d]">WRITING PROCESS</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-white/60 leading-[1.85] mb-10" style={{ fontSize: "0.95rem" }}>
                            We follow a strategic process for horror writing that helps our writers evoke fear, terror, and dread in readers.
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

                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative hidden lg:block">
                        <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "1/1" }}>
                            <Image src="/images/Services/WritingServices/horror-writing/02.jpg" alt="Horror Writers" fill className="object-cover" />
                            <div className="absolute inset-0 bg-[#e8391d]/20 mix-blend-multiply" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/25 -z-0" />
                    </motion.div>
                </div>
            </section>

            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            WHY CHOOSE <span className="text-[#e8391d]">BEXLEY PUBLISHING</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "CLIENT SATISFACTION GUARANTEED", desc: "We revise, polish, deliver quickly, and ensure every horror manuscript exceeds expectations completely." },
                            { title: "FAST, PROFESSIONAL, ORIGINAL", desc: "Receive plagiarism-free horror writing delivered quickly with expert editing and professional quality assurance." },
                            { title: "COMPLETE QUALITY & SUPPORT", desc: "From revisions to final delivery, we provide reliable support and premium horror writing services." },
                        ].map(({ title, desc }) => (
                            <motion.div key={title} variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center hover:border-[#e8391d]/50 transition-colors duration-500">
                                <h3 className="font-black text-white uppercase text-lg mb-3 tracking-wide">{title}</h3>
                                <p className="text-white/50 text-[14px] leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

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

            <section className="relative w-full bg-[#e8391d] py-28 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center px-8 relative z-10">
                    <h2 className="font-black text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                        LET'S WRITE SOMETHING TERRIFYING.
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Your nightmare deserves to be shared with the world. Let's build the dread and write the horror that keeps readers up all night.
                    </p>
                    <div className="flex flex-wrap justify-center gap-5">
                        <button
                            type="button"
                            style={{ backgroundColor: "#fff", color: "#e8391d", gap: "14px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
                            className="inline-flex items-center gap-3  font-black uppercase tracking-widest px-10 py-5 rounded-xl text-[14px] cursor-pointer transition-all duration-300"
                            onClick={() => setQuoteModal(true)}
                        >
                            <FileText size={16} />
                            Start Your Horror Book
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