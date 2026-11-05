"use client";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Shield, MessageCircle, Send } from "lucide-react";
import ContactForm from "@/components/Contact-form";
import { contactPageTheme } from "@/components/contactFormThemes";

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

const floatingIcon = {
    initial: { y: 0, rotate: 0 },
    animate: {
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
    },
};

const CONTACTS = [
    { icon: Phone, label: "Call Us", value: "(279) 777-0380", href: "tel:2797770380" },
    { icon: Mail, label: "Email Us", value: "info@bexleypublishing.com", href: "mailto:info@bexleypublishing.com" },
    { icon: MapPin, label: "Headquarters", value: "2390 Fruitridge Rd, Sacramento, CA 95822", href: "#" },
];

export default function ContactPage() {
    const formRef = useRef<HTMLDivElement>(null);
    const formInView = useInView(formRef, { once: true, margin: "-100px" });

    return (
        <main className="w-full overflow-hidden font-['Raleway',Arial,sans-serif]">

            {/* ── HERO ── */}
            <section className="relative w-full h-screen flex items-center justify-center bg-[#05070f] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/images/Left-Section_bg.webp')] bg-[length:40px_40px]" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#e8391d] opacity-[0.15] rounded-full blur-[200px] pointer-events-none" />

                <motion.div variants={floatingIcon} initial="initial" animate="animate" className="absolute top-[20%] left-[15%] text-white/10 hidden lg:block">
                    <Phone size={60} />
                </motion.div>
                <motion.div variants={floatingIcon} initial="initial" animate="animate" transition={{ delay: 1 }} className="absolute bottom-[25%] right-[15%] text-white/10 hidden lg:block">
                    <Mail size={70} />
                </motion.div>
                <motion.div variants={floatingIcon} initial="initial" animate="animate" transition={{ delay: 2 }} className="absolute top-[30%] right-[25%] text-white/10 hidden lg:block">
                    <MessageCircle size={50} />
                </motion.div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <span className="w-8 h-[2px] bg-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Get In Touch</span>
                        <span className="w-8 h-[2px] bg-[#e8391d]" />
                    </motion.div>

                    <motion.h1
                        variants={maskReveal}
                        initial="hidden"
                        animate="visible"
                        className="font-black text-white uppercase leading-[0.95] mb-8 text-[length:clamp(2.5rem,6vw,4rem)]"
                    >
                        HAVE A STORY TO TELL? <br /><span className="text-[#e8391d]">LET&apos;S TALK.</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-white/60 leading-[1.85] max-w-2xl mx-auto mb-10 text-[length:clamp(0.9rem,1.1vw,1.05rem)]"
                    >
                        Your story deserves to be told. Let&apos;s bring it to life with professional publishing solutions
                        designed to captivate readers and maximize its potential.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 backdrop-blur-sm"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                        </span>
                        <span className="text-white/70 text-sm font-semibold">
                            Average response time: <span className="text-white">Under 2 hours</span>
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* ── FORM SECTION ── */}
            <section ref={formRef} className="relative w-full bg-[#05070f] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:30px_30px]" />

                <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-start">

                        {/* Left: Info */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={formInView ? "visible" : "hidden"}
                            className="sticky top-32"
                        >
                            <motion.h2
                                variants={fadeUp}
                                className="font-black text-white uppercase leading-tight mb-6 text-[length:clamp(2rem,4vw,3rem)]"
                            >
                                TAKE THE FIRST STEP TOWARD PUBLISHING <br />
                                <span className="text-[#e8391d]">SUCCESS TODAY.</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="text-white/50 leading-[1.85] mb-12 text-[0.95rem]">
                                Call or email us to connect with our team to discuss your book, explore your options, and take
                                the next step toward publishing success.
                            </motion.p>

                            <motion.div variants={staggerContainer} className="flex flex-col gap-6 mb-16">
                                {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                                    <motion.a key={label} href={href} variants={fadeUp} className="flex items-center gap-5 group cursor-pointer">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#e8391d] group-hover:border-[#e8391d] transition-all duration-300">
                                            <Icon size={20} className="text-white/60 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <p className="text-white/[0.35] text-[10px] uppercase tracking-widest font-bold mb-1">{label}</p>
                                            <p className="text-white font-bold text-[15px] group-hover:text-[#e8391d] transition-colors">{value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>

                            {/* Trust Badges */}
                            <motion.div variants={fadeUp} className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-white/50 text-[13px]">
                                    <Shield size={16} className="text-[#e8391d]" /> 100% Confidential &amp; NDA Protected
                                </div>
                                <div className="flex items-center gap-3 text-white/50 text-[13px]">
                                    <Clock size={16} className="text-[#e8391d]" /> Free Consultation - No Obligations
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right: Glassmorphism Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={formInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.8, ease: smoothEase }}
                            className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl shadow-black/50"
                        >
                            {/* Top red gradient line */}
                            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#e8391d] to-transparent" />

                            <h3 className="font-black text-white uppercase text-2xl mb-2">GET YOUR FREE PROPOSAL</h3>
                            <p className="text-white/40 text-[13px] mb-10">
                                Complete this form for a customized plan for your project. Our team will contact you within 24 hours.
                            </p>

                            {/* Name, email, phone, message → CRM, then redirects to /thank-you */}
                            <ContactForm
                                theme={contactPageTheme}
                                formLocation="Contact Page"
                                submitLabel={<>Send My Request <Send size={16} /></>}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="relative w-full bg-[#e8391d] py-28 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/images/Left-Section_bg.webp')] bg-[length:40px_40px]" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center px-8 relative z-10"
                >
                    <h2 className="font-black text-white uppercase leading-tight mb-6 text-[length:clamp(2.5rem,5vw,4rem)]">
                        TODAY IS YOUR TIME.<br />MAKE IT COUNT.
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Having a story to tell means nothing if it never reaches your readers. A great story deserves to be
                        shared. Let us get your story into readers&apos; hands.
                    </p>
                    <a
                        href="tel:2797770380"
                        className="inline-flex items-center gap-3 bg-black text-white font-black uppercase tracking-widest px-10 py-5 rounded-xl text-[14px] cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#e8391d] hover:gap-[14px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] active:scale-95"
                    >
                        Call Us Now <Phone size={18} />
                    </a>
                </motion.div>
            </section>
        </main>
    );
}