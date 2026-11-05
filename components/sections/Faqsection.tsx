"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

declare global {
    interface Window {
        LiveChatWidget: any;
        LC_API: any;
    }
}

function openLiveChat() {
    if (typeof window === "undefined") return;
    if (window.LiveChatWidget) {
        window.LiveChatWidget.call("maximize");
        return;
    }
    const lc = (window as any).LC_API;
    if (lc && typeof lc.open_chat_window === "function") {
        lc.open_chat_window();
        return;
    }
    const selectors = [
        "#chat-widget-container button",
        "[id^='chat-widget']",
        "iframe[title*='chat' i]",
    ];
    for (const sel of selectors) {
        const el = document.querySelector<HTMLElement>(sel);
        if (el) { el.click(); return; }
    }
}

const faqs = [
    {
        question: "How much time do you take to complete the ghostwriting process?",
        body: "The timeline depends on various factors, including the book's length, nature, genre, and complexity. Most projects usually require from a few weeks to several months to be professionally done.",
        cta: { label: "Explore Ghostwriting", href: "/InnerServices/ghostwriting" },
    },
    {
        question: "What genres do you write and publish?",
        body: "We have a team of experts who work across all genres, such as fiction, nonfiction, children's books, biographies, poetry, memoirs, romance, business books, fantasy, sci-fi, horror, and more.",
        cta: { label: "View Writing Services", href: "/InnerServices/book-writing" },
    },
    {
        question: "Do I have full rights and ownership of my book after publication?",
        body: "Definitely! Once the book is completed and published, you keep full ownership, copyrights, royalties, and publishing rights.",
        cta: { label: "Get Started", href: "/contact" },
    },
    {
        question: "What do your proofreading and editing tasks include?",
        body: "We check grammar mistakes, spelling errors, and sentence structures through developmental editing and proofreading. We enhance your book's readability and preserve your original writing style and voice.",
        cta: { label: "Explore Editing", href: "/InnerServices/book-editing" },
    },
    {
        question: "What platforms do you prefer for publication and distribution?",
        body: "We prefer all known publishing and distribution platforms, including Amazon Kindle, Apple Books, Barnes & Noble, Kobo, Google Books, and other global platforms.",
        cta: { label: "Explore Publishing", href: "/InnerServices/book-publishing" },
    },
    {
        question: "Can you help if I have an unfinished draft or only have an idea?",
        body: "Yes, we can. You just need to share your unfinished manuscript or idea. Our writers and publishing experts take your rough draft or concept and make it a complete, professional book.",
        cta: { label: "Start With An Idea", href: "/contact" },
    },
    {
        question: "What marketing and promotion services do you offer?",
        body: "We offer all book visibility services, including author branding, pre-marketing book promotions through PR and article writing, social media marketing, book trailers, Amazon optimization, email marketing, and other visibility campaigns.",
        cta: { label: "Explore Marketing", href: "/InnerServices/book-marketing" },
    },
    {
        question: "How much do your writing, editing, and publishing packages cost?",
        body: "The price varies based on your project's needs, such as book length, design requirements, and services you need. Our publishing packages scale with you, suggesting that they are more flexible.",
        cta: { label: "Get Started", href: "/contact" },
    },
];

const headerMask: Variants = {
    hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 20 },
    visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, transition: { duration: 0.8, ease: smoothEase } },
};

const listStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: smoothEase } },
};

const innerContentStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

export default function FAQSection() {
    const [open, setOpen] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                /* ═══════════════════════════════════
                   BASE STYLES
                ═══════════════════════════════════ */
                .faq-section {
                    font-family: 'Raleway', Arial, sans-serif;
                    background: #111;
                    position: relative;
                    width: 100%;
                }

                /* Header band */
                .faq-header-band {
                    background: #e8391d;
                    padding: 64px 96px;
                }

                .faq-header-grid {
                    max-width: 1100px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    align-items: flex-end;
                }

                .faq-eyebrow {
                    color: rgba(255,255,255,0.7);
                    font-weight: 900;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.28em;
                    margin-bottom: 16px;
                }

                .faq-heading {
                    font-weight: 900;
                    color: white;
                    text-transform: uppercase;
                    line-height: 1;
                    font-size: clamp(2rem, 4vw, 3rem);
                }

                .faq-sub {
                    color: rgba(255,255,255,0.8);
                    line-height: 1.85;
                    margin-bottom: 32px;
                    font-size: clamp(1rem, 1.25vw, 1.2rem);
                }

                .faq-cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    border: 2px solid white;
                    color: white;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 16px 32px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.2s ease, gap 0.2s ease;
                }

                .faq-cta-btn:hover { background: rgba(0,0,0,0.2); gap: 16px; }

                /* Accordion */
                .faq-accordion {
                    padding: 32px 96px;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .faq-item {
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }

                .faq-trigger {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 28px 0;
                    text-align: left;
                    background: none;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    gap: 16px;
                }

                .faq-trigger-left {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    flex: 1;
                    min-width: 0;
                }

                .faq-num {
                    font-weight: 900;
                    font-size: clamp(1.1rem, 1.8vw, 1.6rem);
                    min-width: 3rem;
                    text-align: right;
                    flex-shrink: 0;
                    transition: color 0.3s ease, transform 0.3s ease;
                    font-variant-numeric: tabular-nums;
                }

                .faq-question {
                    font-weight: 700;
                    line-height: 1.4;
                    padding-right: 24px;
                    font-size: clamp(0.9rem, 1.25vw, 1.05rem);
                    transition: color 0.2s ease;
                }

                .faq-icon {
                    flex-shrink: 0;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s ease;
                }

                .faq-inner {
                    overflow: hidden;
                }

                .faq-inner-body {
                    padding-left: 5rem;
                    padding-right: 16px;
                    padding-bottom: 36px;
                    display: grid;
                    grid-template-columns: 1fr auto;
                    gap: 32px;
                    align-items: flex-start;
                }

                .faq-body-text {
                    color: rgba(255,255,255,0.55);
                    line-height: 1.85;
                    font-size: 1.05rem;
                    margin-bottom: 0;
                }

                .faq-inner-cta {
                    flex-shrink: 0;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #e8391d;
                    color: white;
                    font-weight: 900;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 14px 24px;
                    border-radius: 12px;
                    white-space: nowrap;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.2s ease;
                    align-self: flex-start;
                }

                .faq-inner-cta:hover { background: #c0271a; }


                /* ═══════════════════════════════════
                   2560px — 4K
                ═══════════════════════════════════ */
                @media (min-width: 2400px) {
                    .faq-header-band { padding: 120px 180px; }
                    .faq-header-grid { max-width: 2100px; gap: 80px; }
                    .faq-heading { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .faq-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); margin-bottom: 52px; }
                    .faq-eyebrow { font-size: 14px; margin-bottom: 24px; }
                    .faq-cta-btn { font-size: 15px; padding: 22px 52px; gap: 16px; }
                    .faq-accordion { padding: 52px 180px; max-width: 2100px; }
                    .faq-trigger { padding: 40px 0; }
                    .faq-num { font-size: clamp(1.6rem, 2vw, 2.4rem); min-width: 4.5rem; }
                    .faq-question { font-size: clamp(1.1rem, 1.3vw, 1.5rem); }
                    .faq-trigger-left { gap: 40px; }
                    .faq-icon { width: 60px; height: 60px; }
                    .faq-inner-body { padding-left: 8rem; gap: 52px; padding-bottom: 56px; }
                    .faq-body-text { font-size: 1.35rem; }
                    .faq-inner-cta { font-size: 14px; padding: 20px 40px; border-radius: 18px; }
                }

                /* ═══════════════════════════════════
                   1920px — Full HD
                ═══════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .faq-header-band { padding: 96px 140px; }
                    .faq-header-grid { max-width: 1700px; gap: 60px; }
                    .faq-heading { font-size: clamp(2.5rem, 3.5vw, 4.5rem); }
                    .faq-sub { font-size: clamp(1.1rem, 1.1vw, 1.35rem); margin-bottom: 44px; }
                    .faq-eyebrow { font-size: 13px; margin-bottom: 20px; }
                    .faq-cta-btn { font-size: 14px; padding: 20px 44px; }
                    .faq-accordion { padding: 44px 140px; max-width: 1700px; }
                    .faq-trigger { padding: 36px 0; }
                    .faq-num { font-size: clamp(1.4rem, 1.8vw, 2rem); min-width: 4rem; }
                    .faq-question { font-size: clamp(1rem, 1.2vw, 1.3rem); }
                    .faq-trigger-left { gap: 32px; }
                    .faq-icon { width: 52px; height: 52px; }
                    .faq-inner-body { padding-left: 7rem; gap: 44px; padding-bottom: 48px; }
                    .faq-body-text { font-size: 1.2rem; }
                    .faq-inner-cta { font-size: 13px; padding: 18px 36px; border-radius: 16px; }
                }

                /* ═══════════════════════════════════
                   1440px — Large Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .faq-header-band { padding: 80px 120px; }
                    .faq-header-grid { max-width: 1360px; gap: 48px; }
                    .faq-heading { font-size: clamp(2.2rem, 3.5vw, 3.6rem); }
                    .faq-accordion { padding: 36px 120px; max-width: 1360px; }
                    .faq-sub { font-size: clamp(1rem, 1.1vw, 1.2rem); }
                    .faq-question { font-size: clamp(0.95rem, 1.2vw, 1.1rem); }
                }

                /* ═══════════════════════════════════
                   1280px — Standard Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .faq-header-band { padding: 64px 96px; }
                    .faq-accordion { padding: 32px 96px; }
                }

                /* ═══════════════════════════════════
                   1024px — Small Laptop
                ═══════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .faq-header-band { padding: 56px 64px; }
                    .faq-header-grid { gap: 32px; }
                    .faq-heading { font-size: clamp(1.8rem, 3.5vw, 2.6rem); }
                    .faq-sub { font-size: 0.95rem; }
                    .faq-cta-btn { font-size: 11px; padding: 14px 24px; }
                    .faq-accordion { padding: 28px 64px; }
                    .faq-trigger { padding: 24px 0; }
                    .faq-question { font-size: 0.9rem; }
                    .faq-inner-body { padding-left: 4rem; gap: 24px; padding-bottom: 28px; }
                    .faq-body-text { font-size: 0.95rem; }
                    .faq-inner-cta { font-size: 10px; padding: 12px 20px; }
                }

                /* ═══════════════════════════════════
                   900px — Tablet (STACK header)
                ═══════════════════════════════════ */
                @media (max-width: 900px) {
                    .faq-header-band { padding: 56px 40px; }
                    .faq-header-grid {
                        grid-template-columns: 1fr;
                        gap: 28px;
                        align-items: flex-start;
                    }
                    .faq-heading { font-size: clamp(1.9rem, 5vw, 2.8rem); }
                    .faq-sub { margin-bottom: 24px; }
                    .faq-accordion { padding: 24px 40px; }
                    .faq-inner-body {
                        grid-template-columns: 1fr;
                        gap: 20px;
                        padding-left: 4rem;
                        padding-bottom: 28px;
                    }
                    .faq-inner-cta { align-self: flex-start; }
                }

                /* ═══════════════════════════════════
                   768px — Tablet Portrait
                ═══════════════════════════════════ */
                @media (max-width: 768px) {
                    .faq-header-band { padding: 48px 32px; }
                    .faq-heading { font-size: clamp(1.7rem, 5.5vw, 2.4rem); }
                    .faq-sub { font-size: 0.9rem; }
                    .faq-accordion { padding: 20px 32px; }
                    .faq-trigger { padding: 22px 0; }
                    .faq-question { font-size: 0.88rem; padding-right: 12px; }
                    .faq-num { font-size: 1.1rem; min-width: 2.4rem; }
                    .faq-trigger-left { gap: 16px; }
                    .faq-inner-body { padding-left: 3.5rem; }
                    .faq-body-text { font-size: 0.9rem; }
                }

                /* ═══════════════════════════════════
                   640px — Large Mobile
                ═══════════════════════════════════ */
                @media (max-width: 640px) {
                    .faq-header-band { padding: 40px 20px; }
                    .faq-heading { font-size: clamp(1.5rem, 7vw, 2.1rem); }
                    .faq-eyebrow { font-size: 9px; }
                    .faq-sub { font-size: 0.875rem; margin-bottom: 20px; }
                    .faq-cta-btn { font-size: 10px; padding: 13px 20px; gap: 10px; }
                    .faq-accordion { padding: 16px 20px; }
                    .faq-trigger { padding: 20px 0; gap: 10px; }
                    .faq-trigger-left { gap: 12px; }
                    .faq-num { font-size: 1rem; min-width: 2rem; }
                    .faq-question { font-size: 0.84rem; padding-right: 8px; }
                    .faq-icon { width: 34px; height: 34px; }
                    .faq-inner-body { padding-left: 3rem; gap: 16px; padding-bottom: 24px; }
                    .faq-body-text { font-size: 0.84rem; line-height: 1.75; }
                    .faq-inner-cta { font-size: 10px; padding: 11px 18px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ═══════════════════════════════════
                   480px — Standard Mobile
                ═══════════════════════════════════ */
                @media (max-width: 480px) {
                    .faq-header-band { padding: 36px 16px; }
                    .faq-heading { font-size: clamp(1.35rem, 7.5vw, 1.9rem); }
                    .faq-accordion { padding: 12px 16px; }
                    .faq-trigger { padding: 18px 0; }
                    .faq-question { font-size: 0.8rem; }
                    .faq-num { font-size: 0.9rem; min-width: 1.8rem; }
                    .faq-trigger-left { gap: 10px; }
                    .faq-icon { width: 30px; height: 30px; }
                    .faq-inner-body { padding-left: 2.5rem; padding-bottom: 20px; }
                    .faq-body-text { font-size: 0.8rem; }
                }

                /* ═══════════════════════════════════
                   380px — Small Mobile (iPhone SE)
                ═══════════════════════════════════ */
                @media (max-width: 380px) {
                    .faq-header-band { padding: 32px 14px; }
                    .faq-heading { font-size: 1.3rem; }
                    .faq-sub { font-size: 0.8rem; }
                    .faq-cta-btn { font-size: 9px; padding: 11px 16px; }
                    .faq-accordion { padding: 10px 14px; }
                    .faq-trigger { padding: 16px 0; }
                    .faq-question { font-size: 0.77rem; }
                    .faq-num { font-size: 0.85rem; min-width: 1.6rem; }
                    .faq-icon { width: 28px; height: 28px; }
                    .faq-inner-body { padding-left: 2rem; gap: 12px; }
                    .faq-body-text { font-size: 0.77rem; }
                    .faq-inner-cta { font-size: 9px; padding: 10px 14px; }
                }

                /* ═══════════════════════════════════
                   320px — Very Small
                ═══════════════════════════════════ */
                @media (max-width: 320px) {
                    .faq-header-band { padding: 28px 12px; }
                    .faq-heading { font-size: 1.15rem; }
                    .faq-accordion { padding: 8px 12px; }
                    .faq-question { font-size: 0.73rem; }
                    .faq-num { font-size: 0.8rem; min-width: 1.4rem; }
                    .faq-body-text { font-size: 0.73rem; }
                    .faq-inner-cta { font-size: 8.5px; padding: 9px 12px; }
                }
            `}</style>

            <section ref={sectionRef} className="faq-section">
                {/* Header Band */}
                <div className="faq-header-band">
                    <div className="faq-header-grid">
                        <div style={{ overflow: "hidden" }}>
                            <motion.p
                                initial={{ y: "100%" }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ duration: 0.5, ease: smoothEase }}
                                className="faq-eyebrow"
                            >
                                HAVE QUESTIONS?
                            </motion.p>
                            <motion.h2
                                variants={headerMask}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="faq-heading"
                            >
                                YOUR FREQUENTLY<br />ASKED QUESTIONS<br />ANSWERED HERE.
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.6, ease: smoothEase }}
                        >
                            <p className="faq-sub">
                                Even now, if you have any questions about our ebook support and services, scroll down for questions authors often ask.
                            </p>
                            <button
                                type="button"
                                className="faq-cta-btn"
                                onClick={openLiveChat}
                            >
                                TALK TO A CONSULTANT <ArrowRight size={15} />
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Accordion */}
                <motion.div
                    variants={listStagger}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="faq-accordion"
                >
                    {faqs.map((faq, i) => (
                        <motion.div key={i} variants={itemFadeUp} className="faq-item">
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="faq-trigger"
                            >
                                <div className="faq-trigger-left">
                                    <span
                                        className="faq-num"
                                        style={{
                                            color: open === i ? "#e8391d" : "rgba(255,255,255,0.12)",
                                            transform: open === i ? "scale(1.1)" : "scale(1)",
                                        }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className="faq-question"
                                        style={{ color: open === i ? "#fff" : "rgba(255,255,255,0.65)" }}
                                    >
                                        {faq.question}
                                    </span>
                                </div>
                                <div
                                    className="faq-icon"
                                    style={{ background: open === i ? "#e8391d" : "rgba(255,255,255,0.07)" }}
                                >
                                    {open === i
                                        ? <Minus size={15} style={{ color: "white" }} />
                                        : <Plus size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
                                    }
                                </div>
                            </button>

                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.45, ease: smoothEase }}
                                        className="faq-inner"
                                    >
                                        <motion.div
                                            variants={innerContentStagger}
                                            initial="hidden"
                                            animate="visible"
                                            className="faq-inner-body"
                                        >
                                            <motion.p variants={itemFadeUp} className="faq-body-text">
                                                {faq.body}
                                            </motion.p>
                                            <motion.a
                                                href={faq.cta.href}
                                                variants={itemFadeUp}
                                                whileHover={{ backgroundColor: "#c0271a" }}
                                                whileTap={{ scale: 0.97 }}
                                                className="faq-inner-cta"
                                            >
                                                {faq.cta.label} <ArrowRight size={13} />
                                            </motion.a>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </>
    );
}