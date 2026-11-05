"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerMask: Variants = {
    hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 20 },
    visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, transition: { duration: 0.8, ease: smoothEase } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 25, filter: "blur(3px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: smoothEase } },
};

const formStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

export default function NewsletterSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [done, setDone] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
    const submit = (e: React.FormEvent) => { e.preventDefault(); setDone(true); };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                /* ═══════════════════════════════════
                   BASE STYLES
                ═══════════════════════════════════ */
                .nl-section {
                    font-family: 'Raleway', Arial, sans-serif;
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                }

                .nl-bg {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(108deg, #0d0d0d 50%, #faf9f7 50%);
                }

                .nl-grid {
                    position: relative;
                    z-index: 10;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    min-height: 300px;
                }

                /* LEFT dark panel */
                .nl-left {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 64px 80px;
                }

                .nl-eyebrow {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                    overflow: hidden;
                }

                .nl-eyebrow-text {
                    color: #e8391d;
                    font-weight: 900;
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.28em;
                }

                .nl-heading {
                    font-weight: 900;
                    color: white;
                    text-transform: uppercase;
                    line-height: 1;
                    margin-bottom: 16px;
                    font-size: clamp(1.8rem, 3.5vw, 3rem);
                }

                .nl-heading .accent { color: #e8391d; }

                .nl-subtext {
                    color: rgba(255,255,255,0.45);
                    line-height: 1.85;
                    max-width: 290px;
                    font-size: clamp(0.9rem, 1.2vw, 1.1rem);
                }

                /* RIGHT light panel */
                .nl-right {
                    display: flex;
                    align-items: center;
                    padding: 64px;
                }

                .nl-form-wrap {
                    width: 100%;
                    max-width: 440px;
                }

                /* Form */
                .nl-form {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    width: 100%;
                }

                .nl-input {
                    width: 100%;
                    border: 1px solid #d1d5db;
                    color: #1f2937;
                    background: white;
                    font-size: 14px;
                    font-family: 'Raleway', Arial, sans-serif;
                    padding: 16px 20px;
                    border-radius: 12px;
                    outline: none;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    box-sizing: border-box;
                }

                .nl-input::placeholder { color: #9ca3af; }
                .nl-input:focus { border-color: #e8391d; box-shadow: 0 0 0 3px rgba(232,57,29,0.1); }

                .nl-submit {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    background: #e8391d;
                    color: white;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 16px;
                    border-radius: 12px;
                    border: none;
                    cursor: pointer;
                    font-family: 'Raleway', Arial, sans-serif;
                    transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease;
                    width: 100%;
                }

                .nl-submit:hover { background: #c0271a; gap: 16px; box-shadow: 0 10px 25px rgba(232,57,29,0.25); }
                .nl-submit:active { transform: scale(0.97); }

                .nl-disclaimer {
                    color: #9ca3af;
                    font-size: 11px;
                    text-align: center;
                }

                /* Thank you state */
                .nl-thanks {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 16px;
                }

                .nl-check {
                    width: 56px; height: 56px;
                    border-radius: 50%;
                    background: #e8391d;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 8px 24px rgba(232,57,29,0.3);
                }

                .nl-thanks-title {
                    font-weight: 900;
                    color: black;
                    text-transform: uppercase;
                    font-size: 1.25rem;
                }

                .nl-thanks-sub {
                    color: #6b7280;
                    font-size: 13px;
                }


                /* ═══════════════════════════════════
                   2560px — 4K
                ═══════════════════════════════════ */
                @media (min-width: 2400px) {
                    .nl-bg { background: linear-gradient(108deg, #0d0d0d 50%, #faf9f7 50%); }
                    .nl-grid { min-height: 520px; }
                    .nl-left { padding: 120px 160px; }
                    .nl-right { padding: 120px 140px; }
                    .nl-heading { font-size: clamp(3rem, 3.8vw, 5.5rem); margin-bottom: 28px; }
                    .nl-subtext { font-size: clamp(1.1rem, 1.1vw, 1.5rem); max-width: 520px; }
                    .nl-eyebrow { margin-bottom: 32px; gap: 18px; }
                    .nl-eyebrow-text { font-size: 13px; }
                    .nl-form-wrap { max-width: 680px; }
                    .nl-form { gap: 20px; }
                    .nl-input { font-size: 18px; padding: 22px 28px; border-radius: 18px; }
                    .nl-submit { font-size: 16px; padding: 22px; border-radius: 18px; }
                    .nl-disclaimer { font-size: 14px; }
                    .nl-check { width: 80px; height: 80px; }
                    .nl-thanks-title { font-size: 1.9rem; }
                    .nl-thanks-sub { font-size: 17px; }
                }

                /* ═══════════════════════════════════
                   1920px — Full HD
                ═══════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .nl-grid { min-height: 420px; }
                    .nl-left { padding: 100px 130px; }
                    .nl-right { padding: 100px 110px; }
                    .nl-heading { font-size: clamp(2.5rem, 3.2vw, 4.5rem); margin-bottom: 24px; }
                    .nl-subtext { font-size: clamp(1rem, 1.1vw, 1.3rem); max-width: 440px; }
                    .nl-eyebrow { margin-bottom: 28px; }
                    .nl-eyebrow-text { font-size: 12px; }
                    .nl-form-wrap { max-width: 560px; }
                    .nl-form { gap: 16px; }
                    .nl-input { font-size: 16px; padding: 20px 24px; border-radius: 16px; }
                    .nl-submit { font-size: 14px; padding: 20px; border-radius: 16px; }
                    .nl-disclaimer { font-size: 13px; }
                    .nl-check { width: 68px; height: 68px; }
                    .nl-thanks-title { font-size: 1.6rem; }
                    .nl-thanks-sub { font-size: 15px; }
                }

                /* ═══════════════════════════════════
                   1440px — Large Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .nl-left { padding: 72px 96px; }
                    .nl-right { padding: 72px 80px; }
                    .nl-heading { font-size: clamp(2.2rem, 3.2vw, 3.6rem); }
                    .nl-subtext { max-width: 360px; }
                    .nl-form-wrap { max-width: 500px; }
                    .nl-input { padding: 17px 22px; font-size: 15px; }
                    .nl-submit { font-size: 13px; padding: 17px; }
                }

                /* ═══════════════════════════════════
                   1280px — Standard Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .nl-left { padding: 64px 80px; }
                    .nl-right { padding: 64px 64px; }
                }

                /* ═══════════════════════════════════
                   1024px — Small Laptop
                ═══════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .nl-left { padding: 56px 52px; }
                    .nl-right { padding: 56px 44px; }
                    .nl-heading { font-size: clamp(1.6rem, 3vw, 2.4rem); }
                    .nl-subtext { font-size: 0.9rem; max-width: 260px; }
                    .nl-input { padding: 13px 16px; font-size: 13px; }
                    .nl-submit { font-size: 11px; padding: 14px; }
                    .nl-form-wrap { max-width: 380px; }
                }

                /* ═══════════════════════════════════
                   900px — Tablet (STACK + bg fix)
                ═══════════════════════════════════ */
                @media (max-width: 900px) {
                    .nl-bg { background: linear-gradient(180deg, #0d0d0d 50%, #faf9f7 50%); }
                    .nl-grid {
                        grid-template-columns: 1fr;
                        min-height: unset;
                    }
                    .nl-left { padding: 64px 40px 48px; }
                    .nl-right { padding: 48px 40px 64px; }
                    .nl-subtext { max-width: 100%; }
                    .nl-heading { font-size: clamp(1.9rem, 5vw, 3rem); }
                    .nl-form-wrap { max-width: 100%; }
                }

                /* ═══════════════════════════════════
                   768px — Tablet Portrait
                ═══════════════════════════════════ */
                @media (max-width: 768px) {
                    .nl-left { padding: 56px 32px 40px; }
                    .nl-right { padding: 40px 32px 56px; }
                    .nl-heading { font-size: clamp(1.7rem, 5.5vw, 2.6rem); }
                    .nl-subtext { font-size: 0.9rem; }
                }

                /* ═══════════════════════════════════
                   640px — Large Mobile
                ═══════════════════════════════════ */
                @media (max-width: 640px) {
                    .nl-bg { background: linear-gradient(180deg, #0d0d0d 45%, #faf9f7 45%); }
                    .nl-left { padding: 48px 20px 36px; }
                    .nl-right { padding: 36px 20px 52px; }
                    .nl-heading { font-size: clamp(1.5rem, 7.5vw, 2.2rem); margin-bottom: 12px; }
                    .nl-subtext { font-size: 0.84rem; }
                    .nl-eyebrow { margin-bottom: 16px; }
                    .nl-eyebrow-text { font-size: 9px; }
                    .nl-input { padding: 14px 16px; font-size: 13px; border-radius: 10px; }
                    .nl-submit { font-size: 11px; padding: 14px; border-radius: 10px; }
                    .nl-disclaimer { font-size: 10px; }
                    .nl-form { gap: 10px; }
                    .nl-check { width: 48px; height: 48px; }
                    .nl-thanks-title { font-size: 1.1rem; }
                }

                /* ═══════════════════════════════════
                   480px — Standard Mobile
                ═══════════════════════════════════ */
                @media (max-width: 480px) {
                    .nl-left { padding: 40px 16px 32px; }
                    .nl-right { padding: 28px 16px 44px; }
                    .nl-heading { font-size: clamp(1.35rem, 8vw, 1.9rem); }
                    .nl-subtext { font-size: 0.8rem; }
                    .nl-input { padding: 13px 14px; font-size: 12.5px; }
                    .nl-submit { font-size: 10.5px; padding: 13px; }
                }

                /* ═══════════════════════════════════
                   380px — Small Mobile (iPhone SE)
                ═══════════════════════════════════ */
                @media (max-width: 380px) {
                    .nl-left { padding: 36px 14px 28px; }
                    .nl-right { padding: 24px 14px 40px; }
                    .nl-heading { font-size: 1.25rem; }
                    .nl-subtext { font-size: 0.78rem; }
                    .nl-input { padding: 11px 12px; font-size: 12px; border-radius: 9px; }
                    .nl-submit { font-size: 10px; padding: 12px; border-radius: 9px; }
                    .nl-eyebrow-text { font-size: 8px; }
                    .nl-check { width: 42px; height: 42px; }
                    .nl-thanks-title { font-size: 1rem; }
                    .nl-thanks-sub { font-size: 12px; }
                }

                /* ═══════════════════════════════════
                   320px — Very Small
                ═══════════════════════════════════ */
                @media (max-width: 320px) {
                    .nl-left { padding: 28px 12px 24px; }
                    .nl-right { padding: 20px 12px 36px; }
                    .nl-heading { font-size: 1.1rem; }
                    .nl-input { padding: 10px 12px; font-size: 11px; }
                    .nl-submit { font-size: 9.5px; padding: 11px; }
                    .nl-form { gap: 8px; }
                }
            `}</style>

            <section ref={sectionRef} className="nl-section">
                <div className="nl-bg" />

                <div className="nl-grid">
                    <motion.div
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                        transition={{ duration: 1, ease: smoothEase }}
                        className="nl-left"
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={isInView ? { y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4, ease: smoothEase }}
                            className="nl-eyebrow"
                        >
                            <BookOpen size={16} style={{ color: "#e8391d", flexShrink: 0 }} />
                            <span className="nl-eyebrow-text">NEWSLETTER</span>
                        </motion.div>

                        <motion.h2
                            variants={headerMask}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="nl-heading"
                        >
                            JOIN THE<br />
                            <span className="accent">AUTHOR NEWSLETTER.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6, duration: 0.6, ease: smoothEase }}
                            className="nl-subtext"
                        >
                            Get expert book publishing tips and author strategies sent to your inbox every week. Just enter your email here.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ clipPath: "inset(0 0 0 100%)" }}
                        animate={isInView ? { clipPath: "inset(0 0 0 0%)" } : {}}
                        transition={{ duration: 1, ease: smoothEase }}
                        className="nl-right"
                    >
                        <div className="nl-form-wrap">
                            <AnimatePresence mode="wait">
                                {done ? (
                                    <motion.div
                                        key="thanks"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, ease: smoothEase }}
                                        className="nl-thanks"
                                    >
                                        <motion.div
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                            className="nl-check"
                                        >
                                            <svg width="20" height="16" viewBox="0 0 24 20" fill="none">
                                                <motion.path
                                                    d="M2 10L8.5 16.5L22 2"
                                                    stroke="white" strokeWidth="3"
                                                    strokeLinecap="round" strokeLinejoin="round"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ delay: 0.4, duration: 0.5, ease: smoothEase }}
                                                />
                                            </svg>
                                        </motion.div>
                                        <p className="nl-thanks-title">You're subscribed!</p>
                                        <p className="nl-thanks-sub">Watch your inbox for our next issue.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={submit}
                                        variants={formStagger}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="nl-form"
                                    >
                                        <motion.input
                                            variants={fadeUp}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your Name"
                                            className="nl-input"
                                        />
                                        <motion.input
                                            variants={fadeUp}
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email Address *"
                                            required
                                            className="nl-input"
                                        />
                                        <motion.button
                                            variants={fadeUp}
                                            type="submit"
                                            className="nl-submit"
                                        >
                                            Subscribe Now <ArrowRight size={15} />
                                        </motion.button>
                                        <motion.p variants={fadeUp} className="nl-disclaimer">
                                            No spam. Unsubscribe anytime.
                                        </motion.p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}