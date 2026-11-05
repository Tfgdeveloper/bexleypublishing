"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    Wand2, ArrowRight, CheckCircle2, ScrollText, Castle, Flame,
    BookOpen, PenTool, Minus, Plus, Phone, Users, Map, Sparkles, Shield,
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
    { icon: Castle, title: "Magical Storytelling", desc: "We create imaginative fantasy adventures children stay emotionally connected with from beginning to end." },
    { icon: Flame, title: "Enchanting Worlds", desc: "Our writers build magical kingdoms, creatures, and settings designed to spark young imaginations instantly." },
    { icon: Wand2, title: "Memorable Characters", desc: "We develop lovable heroes and meaningful friendships children genuinely care about throughout every magical journey." },
    { icon: ScrollText, title: "Imagination-Led Writing", desc: "Every story is crafted to inspire curiosity, creativity, wonder, and unforgettable reading experiences for children." },
];

const magicMatrix = [
    { title: "EPIC FANTASY", desc: "Ancient kingdoms. Political conflict. Legendary battles. Massive worlds layered with history, power struggles, and unforgettable quests.", icon: Sparkles, color: "#fbbf24" },
    { title: "DARK FANTASY", desc: "Haunting settings, morally grey characters, dangerous magic, and emotionally intense storytelling that leave a lasting impact.", icon: Shield, color: "#60a5fa" },
    { title: "ROMANTASY", desc: "Slow-burning tension, emotional chemistry, forbidden relationships, and fantasy worlds readers fall completely into.", icon: Flame, color: "#f87171" },
    { title: "URBAN FANTASY", desc: "Modern settings infused with supernatural danger, hidden societies, fast-paced conflict, and gripping twists.", icon: Wand2, color: "#a78bfa" },
];

const processSteps = [
    { step: "01", title: "STORY CONCEPT & DIRECTION", desc: "We take your raw concept and shape it into a clear, emotionally engaging fantasy narrative with strong themes, structure, and momentum.", icon: Map },
    { step: "02", title: "WORLD & MAGIC BUILDING", desc: "From kingdoms and cultures to history, religion, politics, and magic systems, we create immersive worlds readers can vividly imagine.", icon: ScrollText },
    { step: "03", title: "CHARACTER & PLOT DEVELOPMENT", desc: "Great fantasy is always character-driven. We develop layered protagonists, believable motivations, meaningful flaws, and story arcs readers genuinely care about.", icon: Wand2 },
    { step: "04", title: "EDITING & POLISHING", desc: "Every chapter is carefully refined for pacing, consistency, dialogue, continuity, emotional impact, and overall reading experience.", icon: PenTool },
];

const faqs = [
    { q: "What’s The Difference Between Hard And Soft Fantasy Systems?", a: "Hard systems follow structured rules, while soft systems feel mysterious, flexible, and open to interpretation throughout the story." },
    { q: "How Do You Avoid Overloading Readers with World Details?", a: "We naturally reveal worldbuilding through character experiences, dialogue, conflict, and storytelling instead of lengthy explanations or unnecessary detail." },
    { q: "Can You Create Custom Maps for Fantasy Stories?", a: "Yes, we help design detailed fantasy maps supporting your world’s geography, kingdoms, cultures, and overall story progression beautifully." },
    { q: "How Do You Prevent Fantasy Plot Inconsistencies?", a: "We carefully manage timelines, story rules, character continuity, and world logic to maintain consistency throughout your entire fantasy narrative." },
    { q: "Can You Write Long Fantasy Book Series?", a: "Absolutely. We develop connected fantasy series featuring evolving characters, layered conflicts, immersive worlds, and long-term story progression across books." },
];

export default function FantasyWritingPage() {
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
                        <Wand2 size={16} className="text-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Fantasy Writing Services</span>
                    </motion.div>

                    <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="font-black text-white uppercase leading-[0.95] mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                        BUILD A FANTASY WORLD READERS <br /><span className="text-[#e8391d]">GET LOST IN</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-white/60 leading-[1.85] max-w-2xl mx-auto mb-10" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                        Our fantasy writing team creates immersive stories packed with magic, betrayal, unforgettable heroes, dangerous kingdoms, and the kind of emotional tension readers obsess over long after the final chapter.
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
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">World-Building Architects</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}>
                            YOUR STORY DESERVES MORE THAN <span className="text-[#e8391d]">COOKIE-CUTTER FANTASY.</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-5" style={{ fontSize: "0.95rem" }}>
                            Most fantasy stories fade into the background. Same kingdoms. Same chosen one. Same recycled tropes wrapped in different covers. But the fantasy stories readers truly remember? <br />
                            They feel alive. The worlds breathe. The characters make messy decisions. The politics feel dangerous. The magic comes with consequences. And every chapter pulls readers deeper into something they never want to leave. That is exactly what our fantasy writing service is built to create.
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-8" style={{ fontSize: "0.95rem" }}>
                            Whether you have a rough idea, scattered notes, or an entire universe living in your head, our experienced fantasy writers help transform your vision into a compelling manuscript readers can emotionally connect with from beginning to end. We create stories with depth. Stories with atmosphere. Stories that feel personal, cinematic, and impossible to forget.
                        </motion.p>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                            {["Rich Worldbuilding That Feels Real", "Emotionally Complex Characters", "Powerful Magic Systems", "High-Stakes Storytelling Readers Devour"].map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 group">
                                    <CheckCircle2 size={18} className="text-[#e8391d] shrink-0" />
                                    <span className="text-black/80 font-semibold text-[14px]">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="relative hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20" style={{ aspectRatio: "4/5" }}>
                            <Image src="/images/Services/WritingServices/fantasy-writing/01.jpg" alt="Fantasy Writing Service" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/20 -z-10" />
                    </motion.div>
                </div>
            </section>

            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

                <div className="max-w-[1000px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-20 overflow-hidden">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <Wand2 size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Magic Architecture</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            FANTASY GENRES <span className="text-[#e8391d]">WE BRING TO LIFE</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-[#e8391d]/20 shadow-[0_0_80px_rgba(30,64,175,0.15)] pointer-events-none" />

                        {magicMatrix.map(({ title, desc, icon: Icon, color }) => (
                            <motion.div
                                key={title}
                                variants={fadeUp}
                                className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 group cursor-default backdrop-blur-sm"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ backgroundColor: color }} />

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                                        <Icon size={18} className="shrink-0" style={{ color: color }} />
                                    </div>
                                    <h3 className="font-black text-white uppercase text-lg tracking-wide">{title}</h3>
                                </div>
                                <p className="text-white/50 text-[14px] leading-relaxed pl-14">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
                    <div className="text-center mb-16 overflow-hidden">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            CHILDREN’S FANTASY STORIES <span className="text-[#e8391d]">FILLED WITH MAGIC</span>
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
                            HOW WE TURN YOUR IDEA INTO AN <br /><span className="text-[#e8391d]">UNFORGETTABLE FANTASY STORY</span>
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
                            <Image src="/images/Services/WritingServices/fantasy-writing/02.jpg" alt="Fantasy World Builders" fill className="object-cover" />
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
                            WHY AUTHORS TRUST BEXLEY <br /> <span className="text-[#e8391d]">PUBLISHING FOR FANTASY WRITING</span>
                        </motion.h2>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: "STORIES THAT FEEL HUMAN", desc: "The strongest fantasy stories are never just about magic. They are about people. And we focus on this." },
                            { title: "BUILDING WORLDS WITH DEPTH", desc: "We focus on creating immersive environments with believable politics, social structures, histories, cultures, and systems. We make your world feel authentic." },
                            { title: "UNDERSTAND MODERN FANTASY READERS", desc: "Today’s fantasy audience wants more than spectacle. We balance cinematic worldbuilding with intimate character moments to keep readers emotionally invested." },
                            { title: "CREATING SOMETHING ORIGINAL", desc: "We help shape stories that feel unique to you instead of sounding like every other fantasy novel sitting on the shelf." },
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
                        KEEP YOUR STORY CONSISTENT FROM START TO FINISH
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Magic systems, timelines, political structures, character arcs, lore consistency, pacing...Our team ensures everything works together smoothly to create a polished reading experience readers can fully lose themselves in.
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