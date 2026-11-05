"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tabs = [
    {
        id: "writing",
        label: "Writing",
        color: "#e8391d",
        image: "/images/Writing.jpg",
        headline: "FROM IDEA TO WELL- WRITTEN MASTERPIECE.",
        sub: "Get your idea turned into a well-crafted, finished ebook with Bexley Publishing. Yes, you just need to bring your idea, and let us handle the writing until publication. No matter what you have, whether fiction, non-fiction, memoir, sci-fi, or anything else, our professional writers work hard on your manuscript and make it publish-ready. We keep your voice intact, craft a clear structure, and deliver a manuscript you can confidently release on your favorite platforms.",
        items: [
            "Professional Book & Ghostwriting Services",
            "Fiction, Nonfiction & Creative Writing",
            "Children's Storybook Writing",
            "Memoirs, Life Stories & Biographies",
            "Sci-Fi, Thriller, Mystery & Horror Writing",
            "Screenplay, Script & Story Development",
        ],
    },
    {
        id: "editing",
        label: "EDITING & PUBLISHING",
        color: "#1a6e3c",
        image: "/images/Editing-Publishing.jpg",
        headline: "WE DON'T REWRITE WORDS, WE REWIRE SYNAPSES.",
        sub: "Editing out unnecessary content and verboseness and scanning for grammatical errors requires a lot of mental energy. Our expert editors let you stay focused on your writing and save you from searching for incorrect Oxford comma usage while they handle the fine details of eBook editing. Leave the hardest part of writing, editing, to us.",
        items: [
            "Developmental & Structural Editing",
            "Professional Manuscript Proofreading",
            "Children's Storybook Editing",
            "eBook Writing, Creation, and Publication",
            "Audiobook Voice Narration",
            "Print & eBook Formatting",
        ],
    },
    {
        id: "design",
        label: "Design & Marketing",
        color: "#1a3a6e",
        image: "/images/Design-Marketing.webp",
        headline: "Where Great Stories Get Seen",
        sub: "A well-designed ebook directly impacts how your content is perceived, engaged with, and remembered. It further helps successfully market your book globally. Our professionals bring a mix of imagination, talent, and technical mastery to every project, helping your ideas become a reality with precision and flair.",
        items: [
            "Book Cover Design",
            "Author Website Design",
            "Book Printing",
            "Book Marketing Strategy",
            "Social Media Promotion",
            "Amazon Optimization",
            "Launch Campaign Management",
        ],
    },
];

const headerMask: Variants = {
    hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 20 },
    visible: {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        y: 0,
        transition: { duration: 0.7, ease: smoothEase },
    },
};

const listContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const listItem: Variants = {
    hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
    visible: {
        opacity: 1, x: 0, filter: "blur(0px)",
        transition: { duration: 0.4, ease: smoothEase },
    },
};

export default function BrandingSection() {
    const [active, setActive] = useState(0);
    const tab = tabs[active];
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                /* ═══════════════════════════════════
                   BASE STYLES
                ═══════════════════════════════════ */
                .bs-section {
                    font-family: 'Raleway', Arial, sans-serif;
                    background: #f7f6f3;
                    position: relative;
                    width: 100%;
                    min-height: 100vh;
                    overflow: hidden;
                }

                .bs-grid {
                    position: relative;
                    z-index: 10;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    min-height: 100vh;
                }

                /* Image panel */
                .bs-image-panel {
                    position: relative;
                    overflow: hidden;
                    min-height: 100vh;
                }

                /* Content panel */
                .bs-content-panel {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 80px 64px;
                }

                /* Section marker */
                .bs-marker {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 32px;
                }

                .bs-marker-text {
                    font-size: 11px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                }

                /* Heading */
                .bs-heading {
                    font-weight: 900;
                    color: black;
                    text-transform: uppercase;
                    line-height: 1.05;
                    margin-bottom: 20px;
                    font-size: clamp(1.6rem, 3.5vw, 3.2rem);
                }

                /* Body text */
                .bs-body {
                    color: #6b7280;
                    line-height: 1.75;
                    margin-bottom: 32px;
                    max-width: 480px;
                    font-size: clamp(0.9rem, 1.25vw, 1.1rem);
                }

                /* Services list */
                .bs-list {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: 40px;
                    list-style: none;
                    padding: 0;
                    margin-left: 0;
                }

                .bs-list-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                }

                .bs-list-item span {
                    color: #374151;
                    font-weight: 600;
                    font-size: 14px;
                    transition: color 0.2s ease;
                }

                .bs-list-item:hover span { color: black; }

                /* CTA Button */
                .bs-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: white;
                    padding: 16px 32px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: padding-right 0.2s ease;
                }

                .bs-cta:hover { padding-right: 40px; }

                /* Tab buttons */
                .bs-tabs {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    display: flex;
                }

                .bs-tab-btn {
                    flex: 1;
                    padding: 16px 8px;
                    font-weight: 900;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    position: relative;
                    transition: background 0.3s ease, color 0.3s ease;
                    line-height: 1.3;
                }

                /* Big background label */
                .bs-bg-label {
                    position: absolute;
                    right: -2rem;
                    top: 50%;
                    transform: translateY(-50%);
                    font-weight: 900;
                    color: rgba(0,0,0,0.04);
                    text-transform: uppercase;
                    user-select: none;
                    pointer-events: none;
                    font-size: clamp(6rem, 14vw, 14rem);
                    writing-mode: vertical-rl;
                    letter-spacing: -0.05em;
                }

                /* Number overlay */
                .bs-number {
                    font-weight: 900;
                    color: white;
                    user-select: none;
                    font-size: clamp(8rem, 22vw, 18rem);
                    opacity: 0.15;
                }


                /* ═══════════════════════════════════
                   2560px — 4K Monitors
                ═══════════════════════════════════ */
                @media (min-width: 2400px) {
                    .bs-content-panel {
                        padding: 140px 140px;
                    }
                    .bs-heading {
                        font-size: clamp(3rem, 3.2vw, 5.5rem);
                        margin-bottom: 32px;
                    }
                    .bs-body {
                        font-size: clamp(1.2rem, 1.1vw, 1.6rem);
                        max-width: 780px;
                        margin-bottom: 52px;
                        line-height: 1.9;
                    }
                    .bs-list {
                        gap: 20px;
                        margin-bottom: 64px;
                    }
                    .bs-list-item span { font-size: 18px; }
                    .bs-marker { margin-bottom: 52px; gap: 20px; }
                    .bs-marker-text { font-size: 14px; }
                    .bs-cta { font-size: 15px; padding: 22px 52px; gap: 16px; }
                    .bs-tab-btn { padding: 24px 12px; font-size: 13px; }
                    .bs-number { font-size: clamp(12rem, 28vw, 26rem); }
                    .bs-bg-label { font-size: clamp(8rem, 16vw, 18rem); }
                }

                /* ═══════════════════════════════════
                   1920px — Full HD Monitors
                ═══════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .bs-content-panel {
                        padding: 100px 100px;
                    }
                    .bs-heading {
                        font-size: clamp(2.4rem, 2.8vw, 4.2rem);
                        margin-bottom: 28px;
                    }
                    .bs-body {
                        font-size: clamp(1.05rem, 1.1vw, 1.35rem);
                        max-width: 90%;
                        margin-bottom: 44px;
                    }
                    .bs-list { gap: 16px; margin-bottom: 52px; }
                    .bs-list-item span { font-size: 16px; }
                    .bs-marker { margin-bottom: 44px; }
                    .bs-marker-text { font-size: 13px; }
                    .bs-cta { font-size: 14px; padding: 20px 44px; }
                    .bs-tab-btn { padding: 20px 10px; font-size: 12px; }
                    .bs-number { font-size: clamp(10rem, 24vw, 22rem); }
                    .bs-bg-label { font-size: clamp(7rem, 15vw, 16rem); }
                }

                /* ═══════════════════════════════════
                   1440px — Large Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .bs-content-panel { padding: 80px 80px; }
                    .bs-heading { font-size: clamp(2rem, 3vw, 3.6rem); }
                    .bs-body { max-width: 540px; }
                    .bs-list-item span { font-size: 15px; }
                    .bs-cta { font-size: 13px; padding: 18px 40px; }
                }

                /* ═══════════════════════════════════
                   1280px — Standard Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .bs-content-panel { padding: 80px 56px; }
                    .bs-heading { font-size: clamp(1.7rem, 3vw, 3rem); }
                }

                /* ═══════════════════════════════════
                   1024px — Small Laptop
                ═══════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .bs-content-panel { padding: 60px 40px; }
                    .bs-heading { font-size: clamp(1.5rem, 2.6vw, 2.6rem); }
                    .bs-body {
                        font-size: clamp(0.85rem, 1.2vw, 1rem);
                        max-width: 420px;
                    }
                    .bs-list { gap: 10px; }
                    .bs-list-item span { font-size: 13px; }
                    .bs-tab-btn { padding: 14px 6px; font-size: 10px; }
                    .bs-cta { font-size: 11px; padding: 14px 28px; }
                }

                /* ═══════════════════════════════════
                   900px — Tablet Landscape (STACK)
                ═══════════════════════════════════ */
                @media (max-width: 900px) {
                    .bs-grid {
                        grid-template-columns: 1fr;
                        min-height: unset;
                    }

                    .bs-image-panel {
                        height: 55vw;
                        min-height: 280px;
                        max-height: 520px;
                    }

                    .bs-content-panel {
                        padding: 56px 40px 64px;
                        justify-content: flex-start;
                    }

                    .bs-body { max-width: 100%; }

                    .bs-bg-label {
                        writing-mode: horizontal-tb;
                        right: auto;
                        left: 50%;
                        top: auto;
                        bottom: -2rem;
                        transform: translateX(-50%);
                        font-size: clamp(5rem, 18vw, 10rem);
                    }
                }

                /* ═══════════════════════════════════
                   768px — Tablet Portrait
                ═══════════════════════════════════ */
                @media (max-width: 768px) {
                    .bs-image-panel {
                        height: 60vw;
                        min-height: 260px;
                        max-height: 420px;
                    }

                    .bs-content-panel { padding: 48px 32px 56px; }

                    .bs-heading { font-size: clamp(1.5rem, 4.5vw, 2.4rem); }

                    .bs-body { font-size: 0.9rem; margin-bottom: 24px; }

                    .bs-list {
                        grid-template-columns: 1fr;
                        gap: 10px;
                        margin-bottom: 32px;
                    }

                    .bs-tab-btn { padding: 14px 6px; font-size: 10px; letter-spacing: 0.05em; }

                    .bs-marker { margin-bottom: 24px; }
                }

                /* ═══════════════════════════════════
                   640px — Large Mobile
                ═══════════════════════════════════ */
                @media (max-width: 640px) {
                    .bs-image-panel {
                        height: 65vw;
                        min-height: 240px;
                        max-height: 360px;
                    }

                    .bs-content-panel { padding: 40px 20px 52px; }

                    .bs-heading {
                        font-size: clamp(1.3rem, 5.5vw, 2rem);
                        margin-bottom: 14px;
                    }

                    .bs-body {
                        font-size: 0.875rem;
                        line-height: 1.7;
                        margin-bottom: 20px;
                    }

                    .bs-list {
                        grid-template-columns: 1fr;
                        gap: 8px;
                        margin-bottom: 28px;
                    }

                    .bs-list-item span { font-size: 13px; }

                    .bs-cta {
                        width: 100%;
                        justify-content: center;
                        font-size: 11px;
                        padding: 14px 24px;
                    }

                    .bs-tab-btn {
                        padding: 12px 4px;
                        font-size: 9px;
                        letter-spacing: 0.04em;
                    }

                    .bs-marker { margin-bottom: 20px; }
                    .bs-marker-text { font-size: 9px; }

                    .bs-number { font-size: clamp(6rem, 28vw, 12rem); }
                }

                /* ═══════════════════════════════════
                   480px — Standard Mobile
                ═══════════════════════════════════ */
                @media (max-width: 480px) {
                    .bs-image-panel {
                        height: 70vw;
                        min-height: 220px;
                        max-height: 300px;
                    }

                    .bs-content-panel { padding: 32px 16px 48px; }

                    .bs-heading { font-size: clamp(1.15rem, 6vw, 1.7rem); }

                    .bs-body { font-size: 0.84rem; }

                    .bs-list-item span { font-size: 12px; }

                    .bs-tab-btn { font-size: 8.5px; padding: 11px 3px; }
                }

                /* ═══════════════════════════════════
                   380px — Small Mobile (iPhone SE)
                ═══════════════════════════════════ */
                @media (max-width: 380px) {
                    .bs-content-panel { padding: 28px 14px 44px; }

                    .bs-heading { font-size: 1.1rem; margin-bottom: 12px; }

                    .bs-body { font-size: 0.8rem; line-height: 1.65; }

                    .bs-list-item span { font-size: 11px; }

                    .bs-cta { font-size: 10px; padding: 12px 18px; }

                    .bs-tab-btn { font-size: 8px; padding: 10px 2px; letter-spacing: 0.02em; }

                    .bs-marker-text { font-size: 8px; }

                    .bs-number { font-size: clamp(5rem, 26vw, 9rem); }
                }

                /* ═══════════════════════════════════
                   320px — Very Small Mobile
                ═══════════════════════════════════ */
                @media (max-width: 320px) {
                    .bs-content-panel { padding: 24px 12px 40px; }
                    .bs-heading { font-size: 1rem; }
                    .bs-body { font-size: 0.76rem; }
                    .bs-list-item span { font-size: 10px; }
                    .bs-tab-btn { font-size: 7.5px; padding: 9px 2px; }
                    .bs-cta { font-size: 9px; padding: 10px 14px; }
                }
            `}</style>

            <section ref={sectionRef} className="bs-section">
                {/* Big rotated background label */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1.5, ease: smoothEase, delay: 0.3 }}
                    className="bs-bg-label"
                >
                    SERVICES
                </motion.div>

                <div className="bs-grid">
                    {/* ── LEFT: Image Panel ── */}
                    <motion.div
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                        transition={{ duration: 1.2, ease: smoothEase }}
                        className="bs-image-panel"
                    >
                        {/* Ken Burns crossfade image */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={tab.id}
                                src={tab.image}
                                alt={tab.label}
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: 1, scale: 1.1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    opacity: { duration: 0.5, ease: smoothEase },
                                    scale: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" },
                                }}
                                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </AnimatePresence>

                        {/* Color overlay */}
                        <motion.div
                            key={active + "-overlay"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                position: "absolute", inset: 0,
                                background: `${tab.color}CC`,
                            }}
                        />

                        {/* Number */}
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <motion.span
                                key={active + "-num"}
                                initial={{ scale: 1.6, opacity: 0, rotate: -15 }}
                                animate={{ scale: 1, opacity: 0.15, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                className="bs-number"
                            >
                                0{active + 1}
                            </motion.span>
                        </div>

                        {/* Tab buttons */}
                        <div className="bs-tabs">
                            {tabs.map((t, i) => (
                                <button
                                    key={t.id}
                                    onClick={() => setActive(i)}
                                    className="bs-tab-btn"
                                    style={{
                                        background: i === active ? t.color : "rgba(0,0,0,0.6)",
                                        color: i === active ? "#fff" : "rgba(255,255,255,0.5)",
                                    }}
                                >
                                    {t.label}
                                    {i === active && (
                                        <motion.div
                                            layoutId="tabUnderline"
                                            style={{
                                                position: "absolute", bottom: 0,
                                                left: 0, right: 0,
                                                height: 4, background: "rgba(255,255,255,0.4)",
                                            }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Content Panel ── */}
                    <div className="bs-content-panel">
                        {/* Section marker */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="bs-marker"
                        >
                            <motion.div
                                key={active + "-line"}
                                initial={{ width: 0 }}
                                animate={{ width: 40 }}
                                transition={{ duration: 0.4, ease: smoothEase }}
                                style={{ height: 4, background: tab.color, flexShrink: 0 }}
                            />
                            <span className="bs-marker-text" style={{ color: tab.color }}>
                                Our {tab.label}
                            </span>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.h2
                                    variants={headerMask}
                                    initial="hidden"
                                    animate="visible"
                                    className="bs-heading"
                                >
                                    {tab.headline}
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2, ease: smoothEase }}
                                    className="bs-body"
                                >
                                    {tab.sub}
                                </motion.p>

                                <motion.ul
                                    variants={listContainer}
                                    initial="hidden"
                                    animate="visible"
                                    className="bs-list"
                                >
                                    {tab.items.map((item) => (
                                        <motion.li key={item} variants={listItem} className="bs-list-item">
                                            <CheckCircle2
                                                size={18}
                                                style={{ color: tab.color, flexShrink: 0, transition: "transform 0.3s ease" }}
                                            />
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>

                                <motion.a
                                    href="/services"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="bs-cta"
                                    style={{ background: tab.color }}
                                >
                                    Explore All Services
                                    <ArrowUpRight size={16} />
                                </motion.a>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </>
    );
}