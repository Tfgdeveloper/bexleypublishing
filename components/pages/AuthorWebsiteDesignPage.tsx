"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    Globe, ArrowRight, CheckCircle2, BookOpen, Mail, Newspaper,
    CalendarDays, ShoppingCart, Users, Search, MousePointerClick,
    Layout, Server, Phone, Minus, Plus, Sparkles, PenTool, ShieldCheck, Gauge,
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

// --- Data ---
const authorFeatures = [
    { icon: BookOpen, title: "BOOK PAGES THAT SELL", desc: "Dedicated pages for every title, complete with cover images, book descriptions, reviews, and retailer links." },
    { icon: Mail, title: "EMAIL LIST GROWTH", desc: "Simple, effective signup opportunities that help you stay connected with readers long after they leave your site." },
    { icon: Newspaper, title: "MEDIA & PRESS RESOURCES", desc: "Professional author bios, downloadable photos, and media information ready for interviews, podcasts, and events." },
    { icon: CalendarDays, title: "EVENTS & APPEARANCES", desc: "Keep readers informed about book launches, signings, speaking engagements, and upcoming appearances." },
];

const readerFunnel = [
    { icon: Search, title: "DISCOVER", desc: "Help readers find you through search-friendly pages and content that increases your online visibility." },
    { icon: MousePointerClick, title: "CONNECT", desc: "Encourage visitors to join your mailing list, follow your journey, and engage with your work." },
    { icon: ShoppingCart, title: "BUY", desc: "Guide interested readers directly to your books through clear calls-to-action and strategically placed purchase links." },
    { icon: Users, title: "RETURN", desc: "Give readers reasons to come back through updates, events, new releases, and exclusive content." },
];

const processSteps = [
    { step: "01", title: "PLANNING & STRATEGY", desc: "We start by understanding your books, audience, goals, and the experience you want visitors to have.", icon: Layout },
    { step: "02", title: "CUSTOM DESIGN", desc: "Your website is designed around your author brand, creating a look and feel that reflects your work.", icon: PenTool },
    { step: "03", title: "DEVELOPMENT & INTEGRATION", desc: "We build your website, connect essential tools, and ensure everything works seamlessly together.", icon: Server },
    { step: "04", title: "LAUNCH & OPTIMIZATION", desc: "Before launch, we test performance, optimize speed, and ensure your site is ready for readers.", icon: Globe },
];

const faqs = [
    { q: "What platform will my website be built on?", a: "We build on reliable, user-friendly platforms that make future updates simple." },
    { q: "Can I sell books directly from my website?", a: "Yes. We can integrate direct purchasing options and online store functionality." },
    { q: "Will I own my website and domain?", a: "Absolutely. Everything belongs to you." },
    { q: "Will my website work on mobile devices?", a: "Yes. Every website is designed to perform seamlessly on phones, tablets, and desktops." },
    { q: "How easy is it to add new books?", a: "Very easy. We'll show you how to update your site whenever new titles are released." }
];

export default function AuthorWebsiteDesignPage() {
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
                        <Globe size={16} className="text-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Author Website Design</span>
                    </motion.div>

                    <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="font-black text-white uppercase leading-[0.95] mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                        YOUR ONLINE HOME. <br /><span className="text-[#e8391d]">BUILT FOR READERS.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-white/60 leading-[1.85] max-w-2xl mx-auto mb-10" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                        Your website is the one place where your books, your story, and your brand live together under your control. Whether someone discovers you today or five years from now, your website should make a lasting impression and give readers a reason to stay connected.
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
                            NOT JUST A WEBSITE. <br /><span className="text-[#e8391d]">A PLACE READERS RETURN TO.</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-5" style={{ fontSize: "0.95rem" }}>
                            Many author websites do little more than exist. A headshot. A short bio. A few links. Then nothing. A great author website does much more. It introduces your books, grows your audience, builds credibility, and helps turn first-time visitors into long-term readers.
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-8" style={{ fontSize: "0.95rem" }}>
                            We create custom author websites designed around your goals, your audience, and your books, giving readers a professional destination they'll actually want to explore.
                        </motion.p>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                            {["Fully Custom Design", "Mobile-Friendly & Fast Loading", "Email List Integration", "Built for Visibility & Growth"].map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 group">
                                    <CheckCircle2 size={18} className="text-[#e8391d] shrink-0" />
                                    <span className="text-black/80 font-semibold text-[14px]">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="relative hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20" style={{ aspectRatio: "4/5" }}>
                            <Image src="/images/Services/DesignMarketing/author-website-design/01.jpg" alt="Author Website Design Service" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/20 -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* ═══ SECTION 3: ESSENTIAL AUTHOR FEATURES ═══ */}
            <section className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-16 overflow-hidden">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
                            <Sparkles size={16} className="text-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Author-Specific</span>
                        </motion.div>
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            EVERYTHING AN AUTHOR WEBSITE <span className="text-[#e8391d]">SHOULD HAVE</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-white/40 mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
                            Your website should do more than look good. It should support your career.
                        </motion.p>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {authorFeatures.map(({ icon: Icon, title, desc }) => (
                            <motion.div key={title} variants={fadeUp} className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-[#e8391d]/50 transition-all duration-500 group cursor-default relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[#e8391d]/5 rounded-bl-[100px] transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none" />
                                <div className="relative z-10 flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-xl bg-[#e8391d]/10 flex items-center justify-center shrink-0 group-hover:bg-[#e8391d] transition-colors duration-300">
                                        <Icon size={26} className="text-[#e8391d] group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-white uppercase text-lg mb-3 tracking-wide">{title}</h3>
                                        <p className="text-white/50 text-[14px] leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══  SECTION 4: THE READER FUNNEL ═══ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-[2px] bg-[#e8391d]" />
                                <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Conversion Strategy</span>
                            </motion.div>

                            <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                                TURN VISITORS INTO <br /><span className="text-[#e8391d]">READERS</span>
                            </motion.h2>

                            <motion.p variants={fadeUp} className="text-gray-500 leading-[1.85] mb-10" style={{ fontSize: "0.95rem" }}>
                                Getting traffic is only half the battle. The real goal is building relationships.
                            </motion.p>

                            <motion.div variants={staggerContainer} className="flex flex-col gap-5">
                                {readerFunnel.map(({ icon: Icon, title, desc }, index) => (
                                    <motion.div key={title} variants={fadeUp} className="flex items-start gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="mt-1 w-8 h-8 rounded-lg bg-[#e8391d]/10 flex items-center justify-center shrink-0 group-hover:bg-[#e8391d] transition-colors duration-300">
                                                <Icon size={16} className="text-[#e8391d] group-hover:text-white transition-colors" />
                                            </div>
                                            {index < readerFunnel.length - 1 && (
                                                <div className="w-[2px] h-6 bg-gray-200 mt-1" />
                                            )}
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
                                <Image src="/images/Services/DesignMarketing/author-website-design/02.jpg" alt="Website Conversion Strategy" fill className="object-cover" />
                                <div className="absolute inset-0 bg-[#e8391d]/20 mix-blend-multiply" />
                            </div>
                            <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/25 -z-0" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══  SECTION 5: DESIGN & DEVELOPMENT PROCESS ═══ */}
            <section className="relative w-full bg-[#111] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-black text-white uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                            OUR WEBSITE DESIGN <span className="text-[#e8391d]">PROCESS</span>
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

            {/* ═══ SECTION 6: WHY CHOOSE OUR WEB TEAM ═══ */}
            <section className="relative w-full bg-[#faf9f7] py-32 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "1/1" }}>
                            <Image src="/images/Services/DesignMarketing/author-website-design/03.webp" alt="Author Website Team" fill className="object-cover" />
                            <div className="absolute inset-0 bg-[#e8391d]/20 mix-blend-multiply" />
                        </div>
                        <div className="absolute -bottom-5 -right-5 w-full h-full rounded-3xl border-[3px] border-[#e8391d]/25 -z-0" />

                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-[#e8391d]" />
                            <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">WHY AUTHORS CHOOSE US</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-black text-black uppercase leading-[1.05] mb-10" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                            WEBSITES BUILT FOR THE BUSINESS OF <br /><span className="text-[#e8391d]">BEING AN AUTHOR.</span>
                        </motion.h2>

                        <motion.div variants={staggerContainer} className="flex flex-col gap-5">
                            {[
                                "Designed Specifically for Authors — We understand books, readers, launches, and long-term audience building.",
                                "Fast, Responsive Performance — Your website loads quickly and works beautifully across desktop, tablet, and mobile devices.",
                                "Complete Ownership — You maintain full control of your website, content, domain, and assets.",
                                "Marketing-Ready from Day One — Email list growth, book promotion, and discoverability are built into the foundation.",
                                "Easy To Update — Add books, blog posts, events, and news whenever you need without technical headaches."
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

            {/* ═══  SECTION 7: SERVICE FAQS ═══ */}
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
                        READY TO GIVE YOUR READERS A PLACE
                        TO FIND YOU?
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Your books deserve more than a social media profile. Let's create a professional online presence that showcases your work, grows your audience, and supports your author journey for years to come.
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