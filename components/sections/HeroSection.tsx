"use client";
import "@/lib/gsap-init";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Volume2, ArrowRight, Accessibility } from "lucide-react";
import QuoteModal from "../Quotemodal";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 1.2 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: {
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
};

function useMagnetic() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });
    const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
    };
    const handleLeave = () => { x.set(0); y.set(0); };
    return { x: springX, y: springY, handleMouse, handleLeave };
}

export default function HeroSection() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const leftBgRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [quoteModal, setQuoteModal] = useState(false);

    const magnetic1 = useMagnetic();
    const magnetic2 = useMagnetic();

    const [isHoveringLeft, setIsHoveringLeft] = useState(false);
    const spotlightX = useMotionValue(-1000);
    const spotlightY = useMotionValue(-1000);

    const spotlightBg = useTransform(
        [spotlightX, spotlightY],
        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(200, 240, 255, 0.7), rgba(50, 50, 255, 0.3) 40%, transparent 70%)`
    );

    const handleLeftMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        spotlightX.set(e.clientX - rect.left);
        spotlightY.set(e.clientY - rect.top);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
            if (leftBgRef.current) {
                tl.fromTo(leftBgRef.current, { scale: 1.2 }, { scale: 1, duration: 2.5, ease: "power2.out" }, 0);
            }
            if (headingRef.current) {
                try {
                    const split = new SplitText(headingRef.current, {
                        type: "words",
                        wordsClass: "split-word", 
                    });
                    gsap.set(headingRef.current, { perspective: 1000 });

                    tl.from(
                        split.words,
                        {
                            opacity: 0,
                            y: 60,
                            rotateX: -60,
                            z: -100,
                            stagger: 0.04,
                            duration: 1.2,
                            ease: "back.out(1.7)",
                        },
                        0.3
                    );

                    tl.call(() => { split.revert(); }, [], "+=0.1");
                } catch (e) { console.error("SplitText Error:", e); }
            }
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const safePlay = () => {
            const p = video.play();
            if (p !== undefined) p.catch(err => { if (err.name !== "AbortError") console.error(err); });
        };
        const handleVisibility = () => {
            if (document.visibilityState === "visible") { if (video.paused) safePlay(); }
            else video.pause();
        };
        document.addEventListener("visibilitychange", handleVisibility);
        safePlay();
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700;900&display=swap');

                /* ═══════════════════════════════════
                   BASE — Hero fullscreen
                ═══════════════════════════════════ */
                .hero-section {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                    font-family: 'Raleway', Arial, sans-serif;
                }

                /* Background split */
                .hero-bg-grid {
                    position: absolute;
                    inset: 0;
                    display: grid;
                    grid-template-columns: 2fr 3fr;
                }

                .hero-left-bg {
                    position: relative;
                    background: #e8391d;
                    overflow: hidden;
                    height: 100%;
                }

                .hero-right-bg {
                    position: relative;
                    background: #05070f;
                    overflow: hidden;
                    height: 100%;
                }

                /* Content grid */
                .hero-content-grid {
                    position: absolute;
                    inset: 0;
                    display: grid;
                    grid-template-columns: 2fr 3fr;
                }

                /* LEFT content */
                .hero-left-content {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    padding: 160px 56px 40px;
                    height: 100%;
                }

                /* SplitText word spans — never break inside during animation */
                .split-word {
                    display: inline-block !important;
                    white-space: nowrap !important;
                }

                /* KEY FIX: heading font + word-break */
                .hero-heading {
                    font-weight: 900;
                    color: white;
                    line-height: 1.0;
                    letter-spacing: -0.01em;
                    text-transform: uppercase;
                    margin-bottom: 24px;

                    /* Prevent mid-word breaks */
                    word-break: keep-all;
                    overflow-wrap: normal;
                    hyphens: none;
                    white-space: normal;

                    /* clamp: never so large it causes wrapping issues */
                    font-size: clamp(1.6rem, 2.4vw, 2.8rem);
                    transform-origin: left center;
                }

                .hero-body {
                    color: rgba(255,255,255,0.85);
                    line-height: 1.7;
                    margin-bottom: 32px;
                    max-width: 420px;
                    font-size: clamp(0.9rem, 1.1vw, 1.1rem);
                }

                .hero-ctas {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                .hero-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    border: 2px solid white;
                    color: white;
                    font-weight: 700;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 14px 28px;
                    background: transparent;
                    text-decoration: none;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: background 0.2s ease;
                }

                .hero-btn-secondary {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(0,0,0,0.25);
                    color: white;
                    font-weight: 700;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 14px 28px;
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.1);
                    text-decoration: none;
                    cursor: pointer;
                    white-space: nowrap;
                }

                .hero-accessibility {
                    position: absolute;
                    left: 24px; bottom: 24px;
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.4);
                    display: flex; align-items: center; justify-content: center;
                    color: rgba(255,255,255,0.6);
                    cursor: pointer;
                    z-index: 10;
                    transition: border-color 0.3s ease, color 0.3s ease;
                }

                .hero-accessibility:hover { border-color: white; color: white; }

                /* RIGHT — audio btn */
                .hero-right-content { position: relative; height: 100%; }

                .hero-audio-btn {
                    position: absolute;
                    bottom: 28px; left: 28px;
                    z-index: 20;
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.3);
                    background: rgba(0,0,0,0.4);
                    backdrop-filter: blur(8px);
                    display: flex; align-items: center; justify-content: center;
                    color: white;
                    cursor: pointer;
                    transition: border-color 0.2s ease, transform 0.2s ease;
                }

                .hero-audio-btn:hover { border-color: rgba(255,255,255,0.8); transform: scale(1.15); }
                .hero-audio-btn:active { transform: scale(0.9); }


                /* ═══════════════════════════════════
                   2560px — 4K
                ═══════════════════════════════════ */
                @media (min-width: 2400px) {
                    .hero-left-content { padding: 240px 100px 60px; }
                    .hero-heading { font-size: clamp(2.8rem, 2.8vw, 5rem); margin-bottom: 40px; }
                    .hero-body { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 700px; margin-bottom: 52px; }
                    .hero-btn-primary, .hero-btn-secondary { font-size: 15px; padding: 20px 48px; }
                    .hero-ctas { gap: 24px; }
                    .hero-accessibility { width: 52px; height: 52px; left: 36px; bottom: 36px; }
                    .hero-audio-btn { width: 56px; height: 56px; bottom: 40px; left: 40px; }
                }

                /* ═══════════════════════════════════
                   1920px — Full HD
                ═══════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .hero-left-content { padding: 200px 80px 52px; }
                    .hero-heading { font-size: clamp(2.4rem, 2.6vw, 4rem); margin-bottom: 32px; }
                    .hero-body { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 560px; margin-bottom: 44px; }
                    .hero-btn-primary, .hero-btn-secondary { font-size: 13px; padding: 17px 40px; }
                    .hero-ctas { gap: 20px; }
                    .hero-accessibility { width: 44px; height: 44px; }
                    .hero-audio-btn { width: 48px; height: 48px; }
                }

                /* ═══════════════════════════════════
                   1440px — Large Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .hero-left-content { padding: 176px 64px 48px; }
                    .hero-heading { font-size: clamp(2rem, 2.5vw, 3.2rem); }
                    .hero-body { font-size: clamp(0.95rem, 1.1vw, 1.2rem); max-width: 480px; }
                    .hero-btn-primary, .hero-btn-secondary { font-size: 12px; padding: 15px 32px; }
                }

                /* ═══════════════════════════════════
                   1280px — Standard Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .hero-left-content { padding: 164px 56px 44px; }
                    .hero-heading { font-size: clamp(1.7rem, 2.4vw, 2.8rem); }
                    .hero-body { max-width: 420px; }
                }

                /* ═══════════════════════════════════
                   1024px — Small Laptop
                ═══════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .hero-left-content { padding: 148px 40px 40px; }
                    .hero-heading { font-size: clamp(1.5rem, 2.2vw, 2.4rem); }
                    .hero-body { font-size: 0.9rem; max-width: 360px; margin-bottom: 24px; }
                    .hero-btn-primary, .hero-btn-secondary { font-size: 10px; padding: 12px 22px; }
                    .hero-ctas { gap: 12px; }
                }

                /* ═══════════════════════════════════
                   900px — Tablet (Single column)
                ═══════════════════════════════════ */
                @media (max-width: 900px) {
                    .hero-bg-grid { grid-template-columns: 1fr; }
                    .hero-right-bg { display: none; }
                    .hero-content-grid { grid-template-columns: 1fr; }
                    .hero-right-content { display: none; }
                    .hero-left-content { padding: 140px 40px 48px; }
                    .hero-heading {
                        font-size: clamp(2rem, 6vw, 3.4rem);
                        white-space: normal;
                        word-break: keep-all;
                    }
                    .hero-body { max-width: 100%; font-size: clamp(0.9rem, 2vw, 1.1rem); }
                }

                /* ═══════════════════════════════════
                   768px — Tablet Portrait
                ═══════════════════════════════════ */
                @media (max-width: 768px) {
                    .hero-left-content { padding: 120px 32px 44px; }
                    .hero-heading { font-size: clamp(1.8rem, 6.5vw, 3rem); }
                    .hero-body { font-size: 0.9rem; margin-bottom: 24px; }
                    .hero-btn-primary, .hero-btn-secondary { font-size: 10px; padding: 12px 20px; }
                }

                /* ═══════════════════════════════════
                   640px — Large Mobile
                ═══════════════════════════════════ */
                @media (max-width: 640px) {
                    .hero-left-content { padding: 110px 20px 40px; }
                    .hero-heading {
                        font-size: clamp(1.6rem, 7.5vw, 2.6rem);
                        margin-bottom: 16px;
                        line-height: 1.05;
                    }
                    .hero-body { font-size: 0.875rem; margin-bottom: 20px; }
                    .hero-ctas { flex-direction: column; gap: 10px; }
                    .hero-btn-primary, .hero-btn-secondary {
                        width: 100%;
                        justify-content: center;
                        font-size: 10px;
                        padding: 13px 20px;
                    }
                    .hero-accessibility { left: 16px; bottom: 16px; width: 32px; height: 32px; }
                }

                /* ═══════════════════════════════════
                   480px — Standard Mobile
                ═══════════════════════════════════ */
                @media (max-width: 480px) {
                    .hero-left-content { padding: 100px 16px 36px; }
                    .hero-heading { font-size: clamp(1.45rem, 8vw, 2.2rem); }
                    .hero-body { font-size: 0.84rem; }
                    .hero-btn-primary, .hero-btn-secondary { font-size: 9.5px; padding: 12px 16px; }
                }

                /* ═══════════════════════════════════
                   380px — Small Mobile
                ═══════════════════════════════════ */
                @media (max-width: 380px) {
                    .hero-left-content { padding: 90px 14px 32px; }
                    .hero-heading { font-size: clamp(1.3rem, 8.5vw, 1.9rem); }
                    .hero-body { font-size: 0.8rem; }
                    .hero-btn-primary, .hero-btn-secondary { font-size: 9px; padding: 11px 14px; }
                }

                /* ═══════════════════════════════════
                   320px — Very Small
                ═══════════════════════════════════ */
                @media (max-width: 320px) {
                    .hero-left-content { padding: 80px 12px 28px; }
                    .hero-heading { font-size: 1.2rem; }
                    .hero-body { font-size: 0.76rem; }
                    .hero-btn-primary, .hero-btn-secondary { font-size: 8.5px; padding: 10px 12px; }
                }
            `}</style>

            <section className="hero-section">
                <div className="hero-bg-grid">
                    <div className="hero-left-bg">
                        <div
                            ref={leftBgRef}
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
                            style={{ backgroundImage: "url('/images/Left-Section_bg.webp')" }}
                        />
                        <div className="absolute inset-0" style={{ background: "rgba(232,57,29,0.75)" }} />
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                opacity: 0.18,
                                backgroundImage: "url('/images/Left-Section_bg.webp')",
                                backgroundSize: "40px 40px",
                            }}
                        />
                    </div>
                    <div className="hero-right-bg">
                        <motion.video
                            ref={videoRef}
                            src="/video/BexleyNight.mp4"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            autoPlay muted loop playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ objectPosition: "center 25%" }}
                        />
                        <div className="absolute inset-0 pointer-events-none"
                            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.2), transparent)" }}
                        />
                    </div>
                </div>

                <div className="hero-content-grid">
                    <div
                        className="hero-left-content"
                        onMouseMove={handleLeftMouseMove}
                        onMouseEnter={() => setIsHoveringLeft(true)}
                        onMouseLeave={() => {
                            setIsHoveringLeft(false);
                            spotlightX.set(-1000);
                        }}
                    >
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                zIndex: 2,
                                opacity: isHoveringLeft ? 1 : 0,
                                background: spotlightBg,
                                mixBlendMode: "overlay",
                                transition: "opacity 0.3s ease",
                            }}
                        />

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ position: "relative", zIndex: 10 }}
                        >
                            <motion.h1
                                ref={headingRef}
                                animate={{
                                    scale: isHoveringLeft ? 1.04 : 1,
                                    filter: isHoveringLeft ? "brightness(1.3)" : "brightness(1)",
                                }}
                                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                className="hero-heading"
                            >
                                BRING YOUR STORY TO BEXLEY AND GET IT PUBLISHED WITHOUT HASSLE.
                            </motion.h1>

                            <motion.p variants={fadeUp} className="hero-body">
                                Bexley Publishing is a trusted name in book publishing, where we build books that last and help stories reach readers. Whether your manuscript needs complete writing, editing, formatting, publishing, distribution, or marketing, we are here to handle the details.
                            </motion.p>

                            <motion.div variants={fadeUp} className="hero-ctas">
                                <motion.a
                                >
                                    <button
                                        type="button"
                                        className="hero-btn-primary"
                                        onClick={() => setQuoteModal(true)}
                                    >
                                        Publish My Book Now <ArrowRight size={15} />
                                    </button>
                                </motion.a>
                                <motion.a
                                    href="/portfolio"
                                    style={{ x: magnetic2.x, y: magnetic2.y }}
                                    onMouseMove={magnetic2.handleMouse}
                                    onMouseLeave={magnetic2.handleLeave}
                                    whileTap={{ scale: 0.95 }}
                                    className="hero-btn-secondary"
                                >
                                    View Our Work
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
                <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />
            </section>
        </>
    );
}