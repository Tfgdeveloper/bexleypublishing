"use client";
import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { BookOpen, Users, Award, Star, ArrowRight, FileText, Edit } from "lucide-react";
import QuoteModal from "@/components/Quotemodal";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(3px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: smoothEase },
    },
};

export default function AboutSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [quoteModal, setQuoteModal] = useState(false);


    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700;900&display=swap');

                /* ═══════════════════════════════════════
                   BASE STYLES  (applies to all sizes)
                ═══════════════════════════════════════ */
                .about-section {
                    font-family: 'Raleway', Arial, sans-serif;
                    background: #faf9f7;
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                }

                .about-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 96px 64px;
                }

                .about-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                }

                .about-image-wrap {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.15);
                    aspect-ratio: 3 / 4;
                }

                .about-image-wrap img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: fill;
                    transform: scale(1.1);
                }

                .about-image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.08) 50%, transparent 100%);
                }

                .about-image-caption {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    padding: 32px;
                }

                .about-image-caption .eyebrow {
                    color: rgba(255,255,255,0.6);
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    margin-bottom: 4px;
                }

                .about-image-caption .tagline {
                    color: white;
                    font-weight: 900;
                    font-size: 18px;
                    text-transform: uppercase;
                    line-height: 1.3;
                }

                .about-label {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 48px;
                }

                .about-label span.line {
                    display: block;
                    height: 2px;
                    background: #e8391d;
                    flex-shrink: 0;
                }

                .about-label span.text {
                    color: #e8391d;
                    font-weight: 900;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.28em;
                }

                .about-heading {
                    font-weight: 900;
                    color: black;
                    text-transform: uppercase;
                    line-height: 1.05;
                    margin-bottom: 24px;
                    font-size: clamp(1.5rem, 3vw, 2.8rem);
                }

                .about-heading .accent { color: #e8391d; }

                .about-body {
                    color: #6b7280;
                    line-height: 1.85;
                    margin-bottom: 20px;
                    font-size: clamp(0.95rem, 1.25vw, 1.1rem);
                }

                .about-ctas {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 20px;
                    margin-top: 40px;
                }

                .btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: #e8391d;
                    color: white;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 16px 32px;
                    border-radius: 12px;
                    text-decoration: none;
                    transition: background 0.2s ease, gap 0.2s ease;
                    cursor: pointer;
                }

                .btn-primary:hover { background: #c0271a; gap: 14px; }

                .btn-ghost {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: black;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border-bottom: 2px solid rgba(0,0,0,0.2);
                    padding-bottom: 4px;
                    text-decoration: none;
                    transition: color 0.2s ease, border-color 0.2s ease, gap 0.2s ease;
                    cursor: pointer;
                }

                .btn-ghost:hover { color: #e8391d; border-color: #e8391d; gap: 12px; }


                /* ═══════════════════════════════════════
                   2560px — 4K / Wide Monitors
                ═══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .about-inner {
                        max-width: 2200px;
                        padding: 180px 160px;
                    }
                    .about-grid { gap: 160px; }
                    .about-heading { font-size: clamp(3rem, 3vw, 5rem); }
                    .about-body { font-size: clamp(1.3rem, 1.1vw, 1.7rem); line-height: 2; }
                    .about-image-caption .tagline { font-size: 32px; }
                    .about-image-caption .eyebrow { font-size: 14px; }
                    .about-image-caption { padding: 56px; }
                    .about-label span.text { font-size: 15px; letter-spacing: 0.32em; }
                    .about-label { margin-bottom: 80px; gap: 20px; }
                    .btn-primary { font-size: 16px; padding: 22px 52px; border-radius: 18px; gap: 14px; }
                    .btn-ghost { font-size: 16px; }
                    .about-ctas { gap: 36px; margin-top: 64px; }
                    .about-image-wrap { border-radius: 40px; }
                }

                /* ═══════════════════════════════════════
                   1920px — Full HD Monitors
                ═══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .about-inner {
                        max-width: 100%;
                        padding: 140px 120px;
                    }
                    .about-grid { gap: 120px; }
                    .about-heading { font-size: clamp(2.4rem, 2.8vw, 4rem); }
                    .about-body { font-size: clamp(1.1rem, 1.1vw, 1.4rem); line-height: 1.95; }
                    .about-image-caption .tagline { font-size: 24px; }
                    .about-image-caption { padding: 44px; }
                    .about-label span.text { font-size: 13px; }
                    .about-label { margin-bottom: 64px; }
                    .btn-primary { font-size: 14px; padding: 20px 44px; border-radius: 16px; }
                    .btn-ghost { font-size: 14px; }
                    .about-ctas { gap: 28px; margin-top: 52px; }
                    .about-image-wrap { border-radius: 32px; }
                }

                /* ═══════════════════════════════════════
                   1440px — Large Laptop / Desktop
                ═══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .about-inner {
                        max-width: 1320px;
                        padding: 112px 80px;
                    }
                    .about-grid { gap: 96px; }
                    .about-heading { font-size: clamp(2rem, 2.6vw, 3.2rem); }
                    .about-body { font-size: clamp(1rem, 1.15vw, 1.2rem); }
                    .about-image-caption .tagline { font-size: 20px; }
                    .about-image-caption { padding: 36px; }
                    .btn-primary { font-size: 13px; padding: 18px 40px; }
                    .about-ctas { margin-top: 48px; }
                }

                /* ═══════════════════════════════════════
                   1280px — Standard Laptop
                ═══════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .about-inner {
                        max-width: 1160px;
                        padding: 96px 64px;
                    }
                    .about-grid { gap: 80px; }
                }

                /* ═══════════════════════════════════════
                   1024px — Small Laptop / Large Tablet
                ═══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .about-inner { padding: 80px 48px; }
                    .about-grid { gap: 56px; }
                    .about-heading { font-size: clamp(1.5rem, 2.4vw, 2.4rem); }
                    .about-body { font-size: clamp(0.9rem, 1.2vw, 1.05rem); }
                    .about-image-caption .tagline { font-size: 16px; }
                    .about-image-caption { padding: 28px; }
                    .btn-primary { padding: 14px 28px; }
                }

                /* ═══════════════════════════════════════
                   900px — Tablet (Landscape)
                ═══════════════════════════════════════ */
                @media (max-width: 900px) {
                    .about-inner { padding: 64px 40px; }
                    .about-grid {
                        grid-template-columns: 1fr;
                        gap: 48px;
                    }
                    .about-image-wrap {
                        aspect-ratio: 16 / 9;
                        max-height: 460px;
                    }
                    .about-label { margin-bottom: 32px; }
                    .about-heading { font-size: clamp(1.7rem, 4vw, 2.6rem); }
                    .about-body { font-size: clamp(0.95rem, 1.8vw, 1.1rem); }
                }

                /* ═══════════════════════════════════════
                   768px — Tablet (Portrait)
                ═══════════════════════════════════════ */
                @media (max-width: 768px) {
                    .about-inner { padding: 56px 32px; }
                    .about-image-wrap {
                        aspect-ratio: 4 / 3;
                        max-height: 400px;
                    }
                    .about-heading { font-size: clamp(1.5rem, 4vw, 2.2rem); }
                    .about-body { font-size: 0.95rem; }
                    .about-image-caption .tagline { font-size: 15px; }
                    .about-image-caption { padding: 24px; }
                }

                /* ═══════════════════════════════════════
                   640px — Large Mobile
                ═══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .about-inner { padding: 48px 20px; }
                    .about-grid { gap: 36px; }
                    .about-image-wrap {
                        aspect-ratio: 4 / 3;
                        max-height: 320px;
                        border-radius: 16px;
                    }
                    .about-image-caption { padding: 20px; }
                    .about-image-caption .tagline { font-size: 14px; }
                    .about-label {
                        margin-bottom: 24px;
                    }
                    .about-label span.text { font-size: 9px; letter-spacing: 0.2em; }
                    .about-heading {
                        font-size: clamp(1.35rem, 6vw, 1.9rem);
                        margin-bottom: 16px;
                    }
                    .about-body { font-size: 0.9rem; line-height: 1.75; }
                    .about-ctas {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                        margin-top: 28px;
                    }
                    .btn-primary {
                        width: 100%;
                        justify-content: center;
                        padding: 14px 24px;
                    }
                    .btn-ghost { font-size: 11px; }
                }

                /* ═══════════════════════════════════════
                   480px — Standard Mobile
                ═══════════════════════════════════════ */
                @media (max-width: 480px) {
                    .about-inner { padding: 40px 18px; }
                    .about-image-wrap {
                        aspect-ratio: 5 / 4;
                        max-height: 280px;
                        border-radius: 14px;
                    }
                    .about-heading { font-size: clamp(1.2rem, 6.5vw, 1.7rem); }
                    .about-body { font-size: 0.875rem; line-height: 1.7; }
                    .about-image-caption .tagline { font-size: 13px; }
                    .about-image-caption { padding: 16px; }
                }

                /* ═══════════════════════════════════════
                   380px — Small Mobile (iPhone SE etc.)
                ═══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .about-inner { padding: 36px 14px; }
                    .about-heading { font-size: 1.15rem; }
                    .about-body { font-size: 0.82rem; line-height: 1.65; }
                    .about-label span.text { font-size: 8px; }
                    .btn-primary { font-size: 10px; padding: 12px 18px; border-radius: 10px; }
                    .btn-ghost { font-size: 10px; }
                    .about-image-wrap {
                        max-height: 240px;
                        border-radius: 12px;
                    }
                    .about-image-caption .tagline { font-size: 12px; }
                    .about-image-caption { padding: 14px; }
                }

                /* ═══════════════════════════════════════
                   320px — Very Small Mobile
                ═══════════════════════════════════════ */
                @media (max-width: 320px) {
                    .about-inner { padding: 28px 12px; }
                    .about-heading { font-size: 1rem; }
                    .about-body { font-size: 0.78rem; }
                    .about-label { margin-bottom: 18px; gap: 8px; }
                    .about-ctas { gap: 12px; }
                    .btn-primary { font-size: 9px; padding: 11px 14px; }
                }
            `}</style>

            <section ref={ref} className="about-section">
                {/* Top Red Bar */}
                <motion.div
                    initial={{ width: "0%" }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{ duration: 1.5, ease: smoothEase }}
                    style={{ height: "4px", background: "#e8391d", transformOrigin: "left center" }}
                />

                <div className="about-inner">
                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, ease: smoothEase }}
                        className="about-label"
                    >
                        <motion.span
                            className="line"
                            initial={{ width: 0 }}
                            animate={inView ? { width: 40 } : {}}
                            transition={{ duration: 0.5, delay: 0.2, ease: smoothEase }}
                        />
                        <span className="text">ABOUT BEXLEY PUBLISHING</span>
                    </motion.div>

                    <div className="about-grid">
                        {/* ── LEFT: Image ── */}
                        <motion.div
                            initial={{ clipPath: "inset(100% 0% 0% 0% round 24px)" }}
                            animate={inView ? { clipPath: "inset(0% 0% 0% 0% round 24px)" } : {}}
                            transition={{ duration: 1.2, ease: smoothEase }}
                            className="about-image-wrap"
                        >
                            <img src="/images/about.png" alt="About Bexley Publishing" />
                            <div className="about-image-overlay" />
                            <div className="about-image-caption">
                                <p className="eyebrow">Est. 2012</p>
                                <p className="tagline">
                                    BEXLEY PUBLISHING<br />
                                    EMPOWERS VOICES<br />
                                    THROUGH PAGES.
                                </p>
                            </div>
                        </motion.div>

                        {/* ── RIGHT: Content ── */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <motion.h2
                                variants={{
                                    hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 30 },
                                    visible: {
                                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        y: 0,
                                        transition: { duration: 0.8, ease: smoothEase },
                                    },
                                }}
                                className="about-heading"
                            >
                                BEXLEY PUBLISHING EMPOWERS VOICES{" "}
                                <span className="accent">THROUGH PAGES.</span>
                            </motion.h2>

                            <motion.p variants={fadeUp} className="about-body">
                                Developing a book is time-consuming and requires patience and creativity.
                                At Bexley Publishing, we have a team of eBook experts who help authors move
                                from raw drafts to picture-perfect, polish-ready books. Authors experience
                                expert publishing support at every step of the way.
                            </motion.p>

                            <motion.p variants={fadeUp} className="about-body">
                                From ghostwriting to design, publishing, and promotion, we put your story
                                first by focusing on storytelling, strengthening it, and handling all technical
                                aspects of publishing. We turn rough manuscripts into professional books so
                                authors can reach wider audiences in every corner of the world.
                            </motion.p>

                            <motion.div variants={fadeUp} className="about-ctas">
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => setQuoteModal(true)}
                                >
                                    <Edit size={16} />
                                    Start Your Journey
                                </button>
                                <a href="/portfolio" className="btn-ghost">
                                    View Portfolio <ArrowRight size={14} />
                                </a>
                                
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />
            </section>
        </>
    );
}