"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    Film, ArrowRight, CheckCircle2, Tv, Video, Clapperboard,
    BookOpen, PenTool, Minus, Plus, Phone, Users, Sparkles, LayoutGrid, Eye,
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
const scriptTypes = [
    { icon: Film, title: "BIG-SCREEN FILM SCRIPTS", desc: "Feature-length stories with emotional depth, engaging pacing, and scenes designed to leave a lasting impact on audiences." },
    { icon: Tv, title: "BINGE-WORTHY SERIES WRITING", desc: "Episode-driven storytelling with connected plotlines, memorable characters, and strong momentum viewers keep coming back for." },
    { icon: Video, title: "SHORT SCRIPTS WITH BIG IMPACT", desc: "Powerful short-form storytelling that delivers emotion, meaning, and a strong audience connection without wasting a single scene." },
    { icon: Clapperboard, title: "FUN & IMAGINATIVE CHILDREN’S SCRIPTS", desc: "Engaging stories written to entertain younger audiences through creativity, emotion, adventure, and meaningful storytelling moments." },
];

const architectureSteps = [
    { num: "01", title: "THE MOMENT EVERYTHING CHANGES", desc: "The event that disrupts the character’s normal life and pulls them into the heart of the story.", color: "#f87171" },
    { num: "02", title: "THE TURNING POINT", desc: "A major shift that raises the pressure, changes direction, and forces the character to face bigger challenges.", color: "#fbbf24" },
    { num: "03", title: "THE BREAKING POINT", desc: "The emotional low point where everything feels lost, pushing the character toward change and final decisions.", color: "#60a5fa" },
    { num: "04", title: "THE FINAL PAYOFF", desc: "The climax where conflict reaches its peak, followed by a satisfying ending that gives the story emotional closure.", color: "#4ade80" },
];

const processSteps = [
    { step: "01", title: "STARTING WITH YOUR STORY VISION", desc: "We shape your concept into a clear story direction with structure, purpose, and engaging narrative flow from beginning to end.", icon: Sparkles },
    { step: "02", title: "BUILDING CHARACTERS PEOPLE REMEMBER", desc: "Our writers create believable personalities, emotional depth, and dialogue that sounds natural instead of forced or unrealistic.", icon: LayoutGrid },
    { step: "03", title: "KEEPING EVERY SCENE MOVING", desc: "We focus on pacing, scene progression, and emotional momentum to keep audiences fully invested throughout the script.", icon: Eye },
    { step: "04", title: "POLISHING EVERY FINAL DETAIL", desc: "From formatting and transitions to dialogue refinement and scene balance, we carefully polish every part of your script.", icon: PenTool },
];

const faqs = [
    { q: "Do I Need Professional Software To Write A Script?", a: "Not necessarily. We deliver properly formatted scripts, so you can focus entirely on developing your story and creative vision." },
    { q: "How Is A Script Different From A Novel?", a: "Scripts focus on visual storytelling, dialogue, and scenes, while books explore detailed narration, thoughts, and descriptive storytelling depth." },
    { q: "What’s The Ideal Length For A Feature Film Script?", a: "Most feature film scripts typically range between ninety and one hundred twenty pages depending on genre, pacing, and story complexity." },
    { q: "Can You Create A Series Bible With The Pilot Script?", a: "Yes, we develop detailed series bibles covering characters, worldbuilding, future episodes, and long-term story direction alongside your pilot." },
    { q: "How Do You Make Dialogue Feel Natural On Screen?", a: "We write conversations that sound human, emotionally grounded, character-specific, and realistic without feeling forced, stiff, or overly dramatic." },
];

export default function ScriptWritingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);

    return (
        <main className="w-full overflow-hidden" style={{ fontFamily: "'Raleway', Arial, sans-serif" }}>

            {/* ════════════════════════════════════════════
                SECTION 1: CINEMATIC SCRIPTWRITING HERO
            ════════════════════════════════════════════ */}
            <section className="relative w-full min-h-screen flex items-center justify-center bg-[#05070f] overflow-hidden pt-28 pb-12">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#e8391d] opacity-10 rounded-full blur-[200px] pointer-events-none" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center justify-center gap-3 mb-6">
                        <Clapperboard size={16} className="text-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Scriptwriting Services</span>
                    </motion.div>

                    <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="font-black text-white uppercase leading-[0.95] mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                        GIVE YOUR STORY A SCRIPT PEOPLE <br /><span className="text-[#e8391d]">CAN’T STOP WATCHING</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-white/60 leading-[1.85] max-w-2xl mx-auto mb-10" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                        Our script writing team creates powerful stories with natural dialogue, strong pacing, emotional scenes, and characters audiences connect with instantly.
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
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Visual Storytelling</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}>
                            YOUR IDEA DESERVES MORE THAN A <span className="text-[#e8391d]">BASIC SCRIPT</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-5" style={{ fontSize: "0.95rem" }}>
                            Anyone can write scenes. But writing a script people actually feel connected to? That takes structure. Emotion. Timing. And storytelling that keeps every moment moving forward.
                            <br />
                            The best scripts make audiences care about the characters, stay invested in the conflict, and remember the story long after it ends. That is exactly what our script writing service is built to deliver.
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-8" style={{ fontSize: "0.95rem" }}>
                            Whether you have a rough idea, unfinished draft, or complete vision, our writers help shape your concept into a polished script designed for impact, flow, and audience engagement.
                        </motion.p>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                            {["Smooth Scene Progression", "Realistic Character Dialogue", "Strong Emotional Moments", "Storytelling Built to Hold Attention"].map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 group">
                                    <CheckCircle2 size={18} className="text-[#e8391d] shrink-0" />
                                    <span className="text-black/80 font-semibold text-[14px]">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="relative hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20" style={{ aspectRatio: "4/5" }}>
                            <Image src="/images/Services/WritingServices/script-writing/01.jpg" alt="Scriptwriting Service" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/20 -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 3: UNIQUE - SCREENPLAY ARCHITECTURE
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

                <div className="max-w-[1100px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-20 overflow-hidden">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <LayoutGrid size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">The Blueprint</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            THE STORY FRAMEWORK BEHIND <br /> <span className="text-[#e8391d]">GREAT SCREENPLAYS</span>
                        </motion.h2>
                        <p className="text-white/40 max-w-lg mx-auto mt-4 text-[14px] leading-relaxed">Every strong script needs a structure that keeps audiences emotionally invested from the opening scene to the final moment.</p>
                    </div>

                    {/* Horizontal Structure Flow */}
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-white/10 z-0" />

                        {architectureSteps.map(({ num, title, desc, color }) => (
                            <motion.div
                                key={title}
                                variants={fadeUp}
                                className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 group cursor-default backdrop-blur-sm z-10 text-center"
                            >
                                {/* Top Accent Dot */}
                                <div className="w-5 h-5 rounded-full mx-auto mb-6 border-4 border-[#05070f]" style={{ backgroundColor: color }} />

                                <span className="text-[11px] font-bold uppercase tracking-widest mb-2 block" style={{ color: color }}>{num}</span>
                                <h3 className="font-black text-white uppercase text-xl mb-3 tracking-wide">{title}</h3>
                                <p className="text-white/50 text-[13px] leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 4: SCRIPT CATEGORIES
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
                    <div className="text-center mb-16 overflow-hidden">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            SCRIPTS WE <span className="text-[#e8391d]">BRING TO LIFE</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {scriptTypes.map(({ icon: Icon, title, desc }) => (
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
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Our Process</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-white uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                            HOW WE TURN IDEAS INTO POWERFUL <br /><span className="text-[#e8391d]">SCRIPTS.</span>
                        </motion.h2>

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
                            <Image src="/images/Services/WritingServices/script-writing/02.jpg" alt="Scriptwriters" fill className="object-cover" />
                            <div className="absolute inset-0 bg-[#e8391d]/20 mix-blend-multiply" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/25 -z-0" />
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 6: WHY CHOOSE OUR SCREENWRITERS
            ════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                            WHY CREATORS TRUST BEXLEY PUBLISHING <span className="text-[#e8391d]">FOR SCRIPT WRITING</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: "STORIES PEOPLE FEEL CONNECTED TO", desc: "We create tension, emotion, connection, and moments audiences genuinely care about from start to finish." },
                            { title: "DIALOGUE THAT SOUNDS REAL", desc: "We write dialogue that feels natural, emotional, and true to every character and situation." },
                            { title: "SCENES THAT FEEL VISUAL ON THE PAGE", desc: "We create scenes readers can clearly picture while reading." },
                            { title: "STRUCTURE THAT KEEPS ATTENTION", desc: "Our writers build scripts with smooth pacing and strong narrative flow that keep stories engaging throughout." },
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
                        LET’S BUILD A STORY AUDIENCES STAY INVESTED IN
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Our team is ready to help bring your story to life with cinematic writing designed for the screen.
                    </p>
                    <div className="flex flex-wrap justify-center gap-5">
                        <button
                            type="button"
                            style={{ backgroundColor: "#fff", color: "#e8391d", gap: "14px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
                            className="inline-flex items-center gap-3  font-black uppercase tracking-widest px-10 py-5 rounded-xl text-[14px] cursor-pointer transition-all duration-300"
                            onClick={() => setQuoteModal(true)}
                        >
                            <FileText size={16} />
                            Start Your Script
                        </button>
                        <motion.a href="tel:2797770380" whileHover={{ gap: "14px" }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-3 border-2 border-white text-white font-black uppercase tracking-widest px-10 py-5 rounded-xl text-[14px] cursor-pointer transition-all duration-300">
                            <Phone size={16} /> TALK TO OUR SCRIPT WRITING TEAM
                        </motion.a>
                    </div>
                </motion.div>
            </section>

            <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />

        </main>
    );
}