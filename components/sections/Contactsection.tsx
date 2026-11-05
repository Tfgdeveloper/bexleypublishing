"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";
import { Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import ContactForm from "@/components/Contact-form";
import { contactSectionTheme } from "@/components/contactFormThemes";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const maskReveal: Variants = {
    hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 30 },
    visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, transition: { duration: 0.8, ease: smoothEase } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: smoothEase } },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cls = {
    section: `relative w-full min-h-screen overflow-hidden font-['Raleway',Arial,sans-serif]
        max-[900px]:min-h-0`,

    bg: "absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform",
    overlay: "absolute inset-0 bg-black/[0.78]",
    stripe: "absolute top-0 left-0 bottom-0 w-1 bg-[#e8391d] z-20 origin-top min-[2400px]:w-[6px]",

    grid: `relative z-10 grid grid-cols-2 min-h-screen
        max-[900px]:grid-cols-1 max-[900px]:min-h-0`,

    left: `flex flex-col justify-center px-20 py-24
        min-[2400px]:p-40
        min-[1800px]:max-[2399px]:px-[120px] min-[1800px]:max-[2399px]:py-[130px]
        min-[1400px]:max-[1799px]:px-24 min-[1400px]:max-[1799px]:py-[100px]
        min-[901px]:max-[1199px]:px-[52px] min-[901px]:max-[1199px]:py-20
        max-[900px]:justify-start max-[900px]:pt-20 max-[900px]:px-10 max-[900px]:pb-12
        max-[768px]:pt-16 max-[768px]:px-8 max-[768px]:pb-10
        max-[640px]:pt-14 max-[640px]:px-5 max-[640px]:pb-9
        max-[480px]:pt-12 max-[480px]:px-4 max-[480px]:pb-8
        max-[380px]:pt-10 max-[380px]:px-[14px] max-[380px]:pb-7
        max-[320px]:pt-8 max-[320px]:px-3 max-[320px]:pb-6`,

    marker: `flex items-center gap-3 mb-10
        min-[2400px]:mb-16 min-[2400px]:gap-5
        min-[1800px]:max-[2399px]:mb-[52px]
        min-[901px]:max-[1199px]:mb-8
        max-[768px]:mb-7 max-[640px]:mb-6 max-[640px]:gap-[10px]`,
    markerLine: "block w-8 h-[2px] bg-[#e8391d] shrink-0",
    markerText: `text-[#e8391d] font-black text-[11px] uppercase tracking-[0.28em]
        min-[2400px]:text-[14px] min-[1800px]:max-[2399px]:text-[13px] max-[640px]:text-[9px]`,

    heading: `font-black text-white uppercase leading-none mb-8 text-[length:clamp(2.5rem,4vw,4.2rem)]
        min-[2400px]:text-[length:clamp(3.5rem,4.2vw,6.5rem)] min-[2400px]:mb-[52px]
        min-[1800px]:max-[2399px]:text-[length:clamp(3rem,3.8vw,5.5rem)] min-[1800px]:max-[2399px]:mb-11
        min-[1400px]:max-[1799px]:text-[length:clamp(2.6rem,3.5vw,4.8rem)]
        min-[901px]:max-[1199px]:text-[length:clamp(2rem,3.5vw,3.4rem)]
        max-[900px]:text-[length:clamp(2.2rem,5.5vw,3.4rem)]
        max-[768px]:text-[length:clamp(1.9rem,6vw,3rem)] max-[768px]:mb-6
        max-[640px]:text-[length:clamp(1.7rem,7.5vw,2.5rem)] max-[640px]:mb-5
        max-[480px]:text-[length:clamp(1.5rem,8vw,2.2rem)]
        max-[380px]:text-[1.4rem] max-[320px]:text-[1.25rem]`,
    accent: "text-[#e8391d]",

    subtext: `text-white/[0.55] leading-[1.85] mb-12 max-w-[380px] text-[1.05rem]
        min-[2400px]:text-[1.5rem] min-[2400px]:max-w-[620px] min-[2400px]:mb-[72px]
        min-[1800px]:max-[2399px]:text-[1.3rem] min-[1800px]:max-[2399px]:max-w-[500px] min-[1800px]:max-[2399px]:mb-[60px]
        min-[1400px]:max-[1799px]:text-[1.1rem] min-[1400px]:max-[1799px]:max-w-[420px]
        min-[901px]:max-[1199px]:text-[0.95rem] min-[901px]:max-[1199px]:max-w-[340px] min-[901px]:max-[1199px]:mb-9
        max-[900px]:max-w-full
        max-[768px]:text-[0.9rem] max-[768px]:mb-9
        max-[640px]:text-[0.875rem] max-[640px]:mb-7
        max-[480px]:text-[0.84rem] max-[380px]:text-[0.8rem]`,

    contacts: `flex flex-col gap-5 mb-12
        min-[2400px]:gap-8 min-[2400px]:mb-[72px]
        min-[1800px]:max-[2399px]:gap-7 min-[1800px]:max-[2399px]:mb-[60px]
        min-[901px]:max-[1199px]:gap-4 min-[901px]:max-[1199px]:mb-9
        max-[768px]:gap-4 max-[768px]:mb-9
        max-[640px]:gap-[14px] max-[640px]:mb-7`,
    contactLink: "group flex items-center gap-4 no-underline",
    contactIcon: `w-12 h-12 rounded-full shrink-0 flex items-center justify-center
        bg-[rgba(232,57,29,0.15)] border border-[rgba(232,57,29,0.3)] text-[#e8391d]
        transition-colors duration-300 group-hover:bg-[#e8391d] group-hover:text-white
        min-[2400px]:w-[68px] min-[2400px]:h-[68px]
        min-[1800px]:max-[2399px]:w-[58px] min-[1800px]:max-[2399px]:h-[58px]
        min-[901px]:max-[1199px]:w-[42px] min-[901px]:max-[1199px]:h-[42px]
        max-[640px]:w-10 max-[640px]:h-10
        max-[480px]:w-9 max-[480px]:h-9
        max-[320px]:w-8 max-[320px]:h-8`,
    contactLabel: `text-white/[0.35] text-[10px] font-black uppercase tracking-[0.2em]
        min-[2400px]:text-[12px] max-[640px]:text-[9px]`,
    contactValue: `text-white font-bold text-[14px] mt-[2px]
        min-[2400px]:text-[18px] min-[1800px]:max-[2399px]:text-[16px]
        min-[901px]:max-[1199px]:text-[13px] max-[640px]:text-[13px]
        max-[380px]:text-[12px] max-[320px]:text-[11px]`,

    bullets: `flex flex-col gap-3
        min-[2400px]:gap-[18px] min-[901px]:max-[1199px]:gap-[10px] max-[640px]:gap-[10px]`,
    bullet: "flex items-center gap-3",
    bulletText: `text-white/60 text-[13px]
        min-[2400px]:text-[17px] min-[1800px]:max-[2399px]:text-[15px]
        min-[901px]:max-[1199px]:text-[12px] max-[640px]:text-[12px] max-[380px]:text-[11px]`,

    right: `flex items-center px-16 py-20
        min-[2400px]:p-[140px]
        min-[1800px]:max-[2399px]:px-[100px] min-[1800px]:max-[2399px]:py-[110px]
        min-[1400px]:max-[1799px]:p-20
        min-[901px]:max-[1199px]:px-11 min-[901px]:max-[1199px]:py-16
        max-[900px]:items-stretch max-[900px]:pt-0 max-[900px]:px-10 max-[900px]:pb-20
        max-[768px]:px-8 max-[768px]:pb-16
        max-[640px]:px-5 max-[640px]:pb-14
        max-[480px]:px-4 max-[480px]:pb-12
        max-[380px]:px-[14px] max-[380px]:pb-11
        max-[320px]:px-3 max-[320px]:pb-10`,

    card: `w-full bg-white/[0.06] backdrop-blur-[8px] border border-white/10 rounded-[24px] p-10
        shadow-[0_32px_64px_rgba(0,0,0,0.3)]
        min-[2400px]:p-16 min-[2400px]:rounded-[36px]
        min-[1800px]:max-[2399px]:p-[52px] min-[1800px]:max-[2399px]:rounded-[30px]
        min-[1400px]:max-[1799px]:p-11
        min-[901px]:max-[1199px]:p-8 min-[901px]:max-[1199px]:rounded-[20px]
        max-[768px]:p-7 max-[768px]:rounded-[18px]
        max-[640px]:p-6 max-[640px]:rounded-[16px]
        max-[480px]:p-5 max-[480px]:rounded-[14px]
        max-[380px]:p-4 max-[380px]:rounded-[12px]
        max-[320px]:p-[14px]`,
    formTitle: `font-black text-white uppercase leading-[1.2] mb-2 text-[length:clamp(1.5rem,2.5vw,2rem)]
        min-[2400px]:text-[length:clamp(2.2rem,2.5vw,3.5rem)] min-[2400px]:mb-[14px]
        min-[1800px]:max-[2399px]:text-[length:clamp(2rem,2.2vw,3rem)]
        min-[1400px]:max-[1799px]:text-[length:clamp(1.7rem,2.2vw,2.4rem)]
        min-[901px]:max-[1199px]:text-[length:clamp(1.4rem,2vw,1.8rem)]
        max-[768px]:text-[length:clamp(1.4rem,5vw,1.9rem)]
        max-[640px]:text-[length:clamp(1.3rem,6vw,1.7rem)]
        max-[480px]:text-[length:clamp(1.2rem,6.5vw,1.6rem)]
        max-[380px]:text-[1.2rem] max-[320px]:text-[1.1rem]`,
    formSub: `text-white/40 text-[13px] mb-8
        min-[2400px]:text-[17px] min-[2400px]:mb-[52px]
        min-[1800px]:max-[2399px]:text-[15px] min-[1800px]:max-[2399px]:mb-11
        min-[901px]:max-[1199px]:text-[12px] min-[901px]:max-[1199px]:mb-6
        max-[640px]:text-[12px] max-[640px]:mb-5 max-[380px]:text-[11px]`,
};

const CONTACTS = [
    { icon: Phone, label: "Phone", value: "(279) 777-0380", href: "tel:2797770380" },
    { icon: Mail, label: "Email", value: "info@bexleypublishing.com", href: "mailto:info@bexleypublishing.com" },
];

const BULLETS = [
    "Free initial consultation",
    "100% confidential & NDA protected",
    "Dedicated project manager assigned",
];

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <section ref={sectionRef} className={cls.section}>
            {/* Parallax BG */}
            <motion.div
                className={cls.bg}
                style={{ y: bgY, backgroundImage: "url('/images/Contact-bg.jpeg')" }}
            />
            <div className={cls.overlay} />

            {/* Red left stripe */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.5, ease: smoothEase }}
                className={cls.stripe}
            />

            <div className={cls.grid}>
                {/* ── LEFT ── */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className={cls.left}
                >
                    <motion.div variants={fadeUp} className={cls.marker}>
                        <span className={cls.markerLine} />
                        <span className={cls.markerText}>GET IN TOUCH</span>
                    </motion.div>

                    <motion.h2 variants={maskReveal} className={cls.heading}>
                        READY TO PULL<br />
                        <span className={cls.accent}>READERS INTO</span><br />
                        YOUR STORY?
                    </motion.h2>

                    <motion.p variants={fadeUp} className={cls.subtext}>
                        If so, fill out the form, share your manuscript or concept, and let us complete your book professionally and publish it worldwide.
                    </motion.p>

                    <motion.div variants={staggerContainer} className={cls.contacts}>
                        {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                            <motion.a key={label} href={href} variants={fadeUp} className={cls.contactLink}>
                                <div className={cls.contactIcon}>
                                    <Icon size={17} />
                                </div>
                                <div>
                                    <p className={cls.contactLabel}>{label}</p>
                                    <p className={cls.contactValue}>{value}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.div variants={staggerContainer} className={cls.bullets}>
                        {BULLETS.map((item) => (
                            <motion.div key={item} variants={fadeUp} className={cls.bullet}>
                                <CheckCircle2 size={16} className="text-[#e8391d] shrink-0" />
                                <span className={cls.bulletText}>{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* ── RIGHT: Form ── */}
                <div className={cls.right}>
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.98 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease: smoothEase, delay: 0.3 }}
                        className={cls.card}
                    >
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className={cls.formTitle}
                        >
                            Request a Free Proposal
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className={cls.formSub}
                        >
                            We&apos;ll get back to you within 24 hours.
                        </motion.p>

                        <ContactForm
                            theme={contactSectionTheme}
                            formLocation="Contact Section"
                            submitLabel={<>Send My Request <ArrowRight size={16} /></>}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}