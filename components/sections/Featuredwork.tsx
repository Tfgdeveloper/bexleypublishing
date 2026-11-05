"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, BookOpen } from "lucide-react";
import { gsap } from "gsap";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const projects = [
    {
        id: 1, tag: "Children's Adventure", tagColor: "#e8391d",
        title: "The Story of Yasu", author: "April Bass",
        description: "A beautifully crafted children's tale filled with adventure, wisdom, and imagination, making the reading experience unforgettable.",
        stat: { num: "2,400+", label: "Copies Sold" },
        screenshot: "/images/01.jpg",
    },
    {
        id: 3, tag: "Religion & Spirituality", tagColor: "#1a6e3c",
        title: "Can God Trust You With His Reputation?", author: "Dr. Eileen Anderson",
        description: "A faith-driven guided journal inspiring spiritual growth, reflection, alignment, and deeper trust through daily devotionals.",
        stat: { num: "5★", label: "Avg. Rating" },
        screenshot: "/images/03.jpg",
    },
    {
        id: 4, tag: "Inspirational Prayer", tagColor: "#7c3aed",
        title: "Awesome Answers to Prayers", author: "Patricia Faughn",
        description: "An inspiring Christian memoir sharing powerful testimonies, answered prayers, and transformative personal experiences with Christ.",
        stat: { num: "15+", label: "Platforms" },
        screenshot: "/images/04.jpg",
    },
    {
        id: 5, tag: "Memoir", tagColor: "#0891b2",
        title: "Que te puedo decir!", author: "Brenda Galdamez",
        description: "A profound Spanish memoir exploring healing, consciousness, emotional transformation, and the journey of self-discovery and peace.",
        stat: { num: "3x", label: "Sales Boost" },
        screenshot: "/images/05.jpg",
    },
    {
        id: 6, tag: "Medical Guide", tagColor: "#d97706",
        title: "Biopsy Decoded", author: "David Torres",
        description: "An authoritative medical guide simplifying biopsies, pathology reports, and diagnostic procedures with clarity and patient-centric reassurance.",
        stat: { num: "Forbes", label: "Featured" },
        screenshot: "/images/06.jpg",
    },
];

const slideVars = {
    enter: (d: number) => ({
        opacity: 0, x: d > 0 ? 60 : -60,
        clipPath: d > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
    }),
    center: {
        opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)",
        transition: { duration: 0.7, ease: smoothEase },
    },
    exit: (d: number) => ({
        opacity: 0, x: d > 0 ? -60 : 60,
        clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
        transition: { duration: 0.5, ease: smoothEase },
    }),
};

export default function FeaturedWork() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [progress, setProgress] = useState(0);

    const sectionRef = useRef<HTMLElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = (idx: number, dir: number) => { setDirection(dir); setCurrent(idx); };
    const prev = () => goTo((current - 1 + projects.length) % projects.length, -1);
    const next = () => goTo((current + 1) % projects.length, 1);

    useEffect(() => {
        setProgress(0);
        if (progressRef.current) clearInterval(progressRef.current);
        if (autoRef.current) clearTimeout(autoRef.current);
        progressRef.current = setInterval(() => {
            setProgress(p => (p >= 100 ? 100 : p + (100 / (5500 / 50))));
        }, 50);
        autoRef.current = setTimeout(() => next(), 5500);
        return () => {
            if (autoRef.current) clearTimeout(autoRef.current);
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [current]);

    useEffect(() => {
        if (!bgTextRef.current || !isInView) return;
        gsap.fromTo(bgTextRef.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 1.5, ease: "power2.out", delay: 0.5 }
        );
    }, [isInView]);

    const p = projects[current];
    if (!p) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                /* ═══════════════════════════════════
                   BASE STYLES
                ═══════════════════════════════════ */
                .fw-section {
                    font-family: 'Raleway', Arial, sans-serif;
                    background: #faf9f7;
                    position: relative;
                    width: 100%;
                    min-height: 100vh;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                }

                .fw-inner {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 96px 64px;
                }

                .fw-bg-text {
                    position: absolute;
                    right: -1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    font-weight: 900;
                    color: rgba(0,0,0,0.03);
                    text-transform: uppercase;
                    user-select: none;
                    pointer-events: none;
                    line-height: 1;
                    opacity: 0;
                    writing-mode: vertical-rl;
                    font-size: clamp(8rem, 20vw, 18rem);
                }

                /* Header row */
                .fw-header {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 24px;
                    margin-bottom: 64px;
                }

                .fw-heading {
                    font-weight: 900;
                    color: black;
                    text-transform: uppercase;
                    line-height: 1;
                    font-size: clamp(2.8rem, 6vw, 5.5rem);
                }

                .fw-heading .accent { color: #e8391d; }

                .fw-view-all {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: black;
                    text-decoration: none;
                    white-space: nowrap;
                    align-self: flex-end;
                    margin-bottom: 8px;
                    cursor: pointer;
                    transition: gap 0.2s ease;
                }

                .fw-view-all:hover { gap: 16px; }

                .fw-view-all .arrow-circle {
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    background: black;
                    display: flex; align-items: center; justify-content: center;
                    color: white;
                    transition: background 0.3s ease;
                    flex-shrink: 0;
                }

                .fw-view-all:hover .arrow-circle { background: #e8391d; }

                /* Main grid */
                .fw-grid {
                    display: grid;
                    grid-template-columns: 1fr 480px;
                    gap: 48px;
                    align-items: center;
                }

                /* Left: info panel */
                .fw-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 900;
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 999px;
                    align-self: flex-start;
                    margin-bottom: 24px;
                }

                .fw-title {
                    font-weight: 900;
                    color: black;
                    text-transform: uppercase;
                    line-height: 1.05;
                    margin-bottom: 8px;
                    font-size: clamp(1.8rem, 3.5vw, 3rem);
                }

                .fw-author {
                    color: #9ca3af;
                    font-weight: 700;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    margin-bottom: 20px;
                }

                .fw-desc {
                    color: #6b7280;
                    line-height: 1.85;
                    margin-bottom: 32px;
                    max-width: 460px;
                    font-size: 1rem;
                }

                .fw-btns {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 40px;
                }

                .fw-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #e8391d;
                    color: white;
                    font-weight: 900;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 12px 24px;
                    border-radius: 12px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .fw-btn-primary:hover { background: #c0271a; }

                .fw-btn-outline {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    border: 2px solid rgba(0,0,0,0.15);
                    color: rgba(0,0,0,0.6);
                    font-weight: 900;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 12px 24px;
                    border-radius: 12px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: border-color 0.2s ease, color 0.2s ease;
                }

                /* Dots */
                .fw-dots {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .fw-dot {
                    position: relative;
                    border-radius: 999px;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    padding: 0;
                    overflow: hidden;
                    transition: width 0.3s ease, background 0.3s ease;
                }

                .fw-dot.active {
                    width: 28px; height: 10px;
                    background: rgba(0,0,0,0.1);
                }

                .fw-dot.inactive {
                    width: 10px; height: 10px;
                    background: rgba(0,0,0,0.15);
                }

                .fw-dot.inactive:hover { background: rgba(0,0,0,0.35); }

                /* Right: book stack */
                .fw-book-wrap {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .fw-book-stack {
                    position: relative;
                    width: 100%;
                    max-width: 380px;
                }

                .fw-book-back {
                    position: absolute;
                    inset: 0;
                    border-radius: 24px;
                    overflow: hidden;
                    transform: translateX(20px) translateY(20px) rotate(3deg);
                    opacity: 0.3;
                }

                .fw-book-mid {
                    position: absolute;
                    inset: 0;
                    border-radius: 24px;
                    overflow: hidden;
                    transform: translateX(-10px) translateY(10px) rotate(-1.5deg);
                    opacity: 0.5;
                }

                .fw-book-front {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 32px 64px rgba(0,0,0,0.2);
                    aspect-ratio: 3/4;
                }

                .fw-book-overlay {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent);
                    padding: 28px;
                }

                .fw-nav-btn {
                    position: absolute;
                    z-index: 20;
                    width: 48px; height: 48px;
                    border-radius: 50%;
                    background: #e8391d;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 8px 24px rgba(232,57,29,0.25);
                    transition: background 0.2s ease, transform 0.2s ease;
                }

                .fw-nav-btn:hover { background: #c0271a; transform: scale(1.1); }
                .fw-nav-btn:active { transform: scale(0.9); }
                .fw-nav-btn.prev { left: -24px; }
                .fw-nav-btn.next { right: -24px; }


                /* ═══════════════════════════════════
                   2560px — 4K
                ═══════════════════════════════════ */
                @media (min-width: 2400px) {
                    .fw-inner {
                        max-width: 2100px;
                        padding: 160px 140px;
                    }
                    .fw-grid {
                        grid-template-columns: 1fr 700px;
                        gap: 100px;
                    }
                    .fw-header { margin-bottom: 100px; }
                    .fw-heading { font-size: clamp(4rem, 5.5vw, 8rem); }
                    .fw-title { font-size: clamp(2.8rem, 3.5vw, 5rem); }
                    .fw-desc { font-size: 1.4rem; max-width: 720px; line-height: 1.9; }
                    .fw-author { font-size: 14px; }
                    .fw-tag { font-size: 13px; padding: 10px 20px; margin-bottom: 36px; }
                    .fw-btn-primary, .fw-btn-outline { font-size: 14px; padding: 18px 36px; border-radius: 16px; }
                    .fw-btns { gap: 14px; margin-bottom: 60px; }
                    .fw-view-all { font-size: 15px; gap: 16px; }
                    .fw-view-all .arrow-circle { width: 52px; height: 52px; }
                    .fw-dot.active { width: 44px; height: 14px; }
                    .fw-dot.inactive { width: 14px; height: 14px; }
                    .fw-dots { gap: 14px; }
                    .fw-nav-btn { width: 68px; height: 68px; }
                    .fw-nav-btn.prev { left: -34px; }
                    .fw-nav-btn.next { right: -34px; }
                    .fw-book-stack { max-width: 600px; }
                    .fw-book-overlay { padding: 44px; }
                    .fw-bg-text { font-size: clamp(10rem, 22vw, 22rem); }
                }

                /* ═══════════════════════════════════
                   1920px — Full HD
                ═══════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .fw-inner {
                        max-width: 100%;
                        padding: 130px 120px;
                    }
                    .fw-grid {
                        grid-template-columns: 1fr 580px;
                        gap: 80px;
                    }
                    .fw-header { margin-bottom: 80px; }
                    .fw-heading { font-size: clamp(3.2rem, 5vw, 7rem); }
                    .fw-title { font-size: clamp(2.2rem, 3vw, 4rem); }
                    .fw-desc { font-size: 1.2rem; max-width: 580px; line-height: 1.9; }
                    .fw-author { font-size: 13px; }
                    .fw-tag { font-size: 12px; padding: 8px 16px; margin-bottom: 28px; }
                    .fw-btn-primary, .fw-btn-outline { font-size: 13px; padding: 16px 32px; border-radius: 14px; width: 30% } 
                    .fw-btns { gap: 12px; margin-bottom: 52px; }
                    .fw-view-all { font-size: 14px; }
                    .fw-view-all .arrow-circle { width: 44px; height: 44px; }
                    .fw-dot.active { width: 36px; height: 12px; }
                    .fw-dot.inactive { width: 12px; height: 12px; }
                    .fw-nav-btn { width: 56px; height: 56px; }
                    .fw-nav-btn.prev { left: -28px; }
                    .fw-nav-btn.next { right: -28px; }
                    .fw-book-stack { max-width: 500px; }
                    .fw-bg-text { font-size: clamp(9rem, 21vw, 20rem); }
                }

                /* ═══════════════════════════════════
                   1440px — Large Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .fw-inner { max-width: 1360px; padding: 110px 80px; }
                    .fw-grid { grid-template-columns: 1fr 520px; gap: 64px; }
                    .fw-heading { font-size: clamp(3rem, 5.5vw, 6rem); }
                    .fw-title { font-size: clamp(2rem, 3.2vw, 3.5rem); }
                    .fw-desc { font-size: 1.05rem; max-width: 500px; }
                    .fw-header { margin-bottom: 72px; }
                    .fw-book-stack { max-width: 440px; }
                }

                /* ═══════════════════════════════════
                   1280px — Standard Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .fw-inner { max-width: 1160px; padding: 96px 64px; }
                    .fw-grid { grid-template-columns: 1fr 460px; gap: 52px; }
                }

                /* ═══════════════════════════════════
                   1024px — Small Laptop
                ═══════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .fw-inner { padding: 80px 48px; }
                    .fw-grid { grid-template-columns: 1fr 360px; gap: 40px; }
                    .fw-heading { font-size: clamp(2.2rem, 5vw, 4rem); }
                    .fw-title { font-size: clamp(1.6rem, 3vw, 2.4rem); }
                    .fw-desc { font-size: 0.9rem; max-width: 380px; }
                    .fw-header { margin-bottom: 48px; }
                    .fw-book-stack { max-width: 320px; }
                    .fw-nav-btn { width: 40px; height: 40px; }
                    .fw-nav-btn.prev { left: -20px; }
                    .fw-nav-btn.next { right: -20px; }
                }

                /* ═══════════════════════════════════
                   900px — Tablet (STACK)
                ═══════════════════════════════════ */
                @media (max-width: 900px) {
                    .fw-section { align-items: flex-start; }
                    .fw-inner { padding: 72px 40px; }
                    .fw-grid {
                        grid-template-columns: 1fr;
                        gap: 48px;
                    }
                    /* Book panel comes first on tablet */
                    .fw-book-wrap { order: -1; }
                    .fw-book-stack { max-width: 320px; }
                    .fw-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                        margin-bottom: 48px;
                    }
                    .fw-heading { font-size: clamp(2.4rem, 6vw, 4rem); }
                    .fw-view-all { align-self: flex-start; margin-bottom: 0; }
                    .fw-desc { max-width: 100%; }
                    .fw-bg-text {
                        writing-mode: horizontal-tb;
                        right: auto;
                        left: 50%;
                        top: auto;
                        bottom: -1rem;
                        transform: translateX(-50%);
                        font-size: clamp(5rem, 18vw, 10rem);
                    }
                }

                /* ═══════════════════════════════════
                   768px — Tablet Portrait
                ═══════════════════════════════════ */
                @media (max-width: 768px) {
                    .fw-inner { padding: 60px 32px; }
                    .fw-heading { font-size: clamp(2rem, 7vw, 3.2rem); }
                    .fw-title { font-size: clamp(1.5rem, 5vw, 2.2rem); }
                    .fw-desc { font-size: 0.9rem; margin-bottom: 24px; }
                    .fw-book-stack { max-width: 280px; }
                    .fw-header { margin-bottom: 40px; }
                    .fw-btns { margin-bottom: 28px; }
                }

                /* ═══════════════════════════════════
                   640px — Large Mobile
                ═══════════════════════════════════ */
                @media (max-width: 640px) {
                    .fw-inner { padding: 48px 20px; }
                    .fw-grid { gap: 36px; }
                    .fw-heading { font-size: clamp(1.9rem, 8vw, 2.8rem); }
                    .fw-title { font-size: clamp(1.35rem, 6vw, 2rem); }
                    .fw-author { font-size: 10px; }
                    .fw-desc { font-size: 0.875rem; line-height: 1.75; margin-bottom: 20px; }
                    .fw-tag { font-size: 9px; padding: 5px 10px; margin-bottom: 16px; }
                    .fw-btn-primary, .fw-btn-outline { font-size: 10px; padding: 11px 20px; border-radius: 10px; }
                    .fw-book-stack { max-width: 260px; }
                    .fw-nav-btn { width: 38px; height: 38px; }
                    .fw-nav-btn.prev { left: -18px; }
                    .fw-nav-btn.next { right: -18px; }
                    .fw-view-all { font-size: 11px; }
                    .fw-view-all .arrow-circle { width: 32px; height: 32px; }
                    .fw-header { margin-bottom: 32px; gap: 12px; }
                    .fw-btns { gap: 8px; margin-bottom: 24px; }
                    .fw-dots { gap: 8px; }
                }

                /* ═══════════════════════════════════
                   480px — Standard Mobile
                ═══════════════════════════════════ */
                @media (max-width: 480px) {
                    .fw-inner { padding: 40px 16px; }
                    .fw-heading { font-size: clamp(1.7rem, 8.5vw, 2.4rem); }
                    .fw-title { font-size: clamp(1.2rem, 6.5vw, 1.8rem); }
                    .fw-desc { font-size: 0.84rem; }
                    .fw-book-stack { max-width: 220px; }
                    .fw-nav-btn { width: 34px; height: 34px; }
                    .fw-nav-btn.prev { left: -16px; }
                    .fw-nav-btn.next { right: -16px; }
                    .fw-book-overlay { padding: 16px; }
                }

                /* ═══════════════════════════════════
                   380px — Small Mobile
                ═══════════════════════════════════ */
                @media (max-width: 380px) {
                    .fw-inner { padding: 32px 14px; }
                    .fw-heading { font-size: 1.6rem; }
                    .fw-title { font-size: 1.1rem; margin-bottom: 6px; }
                    .fw-desc { font-size: 0.8rem; line-height: 1.65; margin-bottom: 16px; }
                    .fw-tag { font-size: 8.5px; }
                    .fw-btn-primary, .fw-btn-outline { font-size: 9.5px; padding: 10px 16px; }
                    .fw-book-stack { max-width: 190px; }
                    .fw-nav-btn { width: 30px; height: 30px; }
                    .fw-nav-btn.prev { left: -14px; }
                    .fw-nav-btn.next { right: -14px; }
                    .fw-view-all { font-size: 10px; }
                    .fw-dot.active { width: 22px; height: 8px; }
                    .fw-dot.inactive { width: 8px; height: 8px; }
                }

                /* ═══════════════════════════════════
                   320px — Very Small Mobile
                ═══════════════════════════════════ */
                @media (max-width: 320px) {
                    .fw-inner { padding: 28px 12px; }
                    .fw-heading { font-size: 1.4rem; }
                    .fw-title { font-size: 1rem; }
                    .fw-desc { font-size: 0.76rem; }
                    .fw-book-stack { max-width: 160px; }
                    .fw-btn-primary, .fw-btn-outline { font-size: 9px; padding: 9px 14px; }
                    .fw-nav-btn { width: 28px; height: 28px; }
                    .fw-nav-btn.prev { left: -12px; }
                    .fw-nav-btn.next { right: -12px; }
                }
            `}</style>

            <section ref={sectionRef} className="fw-section">
                {/* Animated bg text */}
                <div ref={bgTextRef} className="fw-bg-text">PORTFOLIO</div>

                {/* Top accent bar */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.2, ease: smoothEase }}
                    style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: 4, background: "#e8391d", transformOrigin: "left center",
                    }}
                />

                <div className="fw-inner">
                    {/* Header */}
                    <div className="fw-header">
                        <div style={{ overflow: "hidden" }}>
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ duration: 0.6, ease: smoothEase }}
                                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
                            >
                                <span style={{ width: 32, height: 2, background: "#e8391d", display: "block" }} />
                                <span style={{ color: "#e8391d", fontWeight: 900, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.28em" }}>
                                    OUR PORTFOLIO
                                </span>
                            </motion.div>
                            <motion.h2
                                initial={{ y: "110%" }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
                                className="fw-heading"
                            >
                                FEATURED<br />
                                <span className="accent">PROJECTS</span>
                            </motion.h2>
                        </div>
                        <motion.a
                            href="/portfolio"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="fw-view-all"
                        >
                            View All Work
                            <span className="arrow-circle"><ArrowRight size={15} /></span>
                        </motion.a>
                    </div>

                    {/* Main Grid */}
                    <div className="fw-grid">
                        {/* LEFT: info */}
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={p.id}
                                custom={direction}
                                variants={slideVars}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                style={{ display: "flex", flexDirection: "column" }}
                            >
                                <span className="fw-tag" style={{ background: p.tagColor }}>
                                    <BookOpen size={10} /> {p.tag}
                                </span>
                                <h3 className="fw-title">{p.title}</h3>
                                <p className="fw-author">by {p.author}</p>
                                <p className="fw-desc">{p.description}</p>

                                {/* Dots */}
                                <div className="fw-dots">
                                    {projects.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => goTo(i, i > current ? 1 : -1)}
                                            className={`fw-dot ${i === current ? "active" : "inactive"}`}
                                        >
                                            {i === current && (
                                                <motion.div
                                                    style={{
                                                        position: "absolute", inset: 0,
                                                        background: "#e8391d", borderRadius: 999,
                                                        width: `${progress}%`,
                                                    }}
                                                    transition={{ duration: 0.05 }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* RIGHT: book stack */}
                        <div className="fw-book-wrap">
                            <button className="fw-nav-btn prev" onClick={prev}>
                                <ArrowLeft size={18} />
                            </button>

                            <div className="fw-book-stack">
                                {/* Back card */}
                                <div className="fw-book-back">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={projects[(current + 1) % projects.length].id + "-back"}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8 }}
                                            style={{
                                                position: "absolute", inset: 0,
                                                backgroundImage: `url('${projects[(current + 1) % projects.length].screenshot}')`,
                                                backgroundSize: "cover", backgroundPosition: "center",
                                            }}
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Mid card */}
                                <div className="fw-book-mid">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={projects[(current + 2) % projects.length].id + "-mid"}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 0.1 }}
                                            style={{
                                                position: "absolute", inset: 0,
                                                backgroundImage: `url('${projects[(current + 2) % projects.length].screenshot}')`,
                                                backgroundSize: "cover", backgroundPosition: "center",
                                            }}
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Front card */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, scale: 0.9, rotate: direction > 0 ? 4 : -4 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, rotate: direction > 0 ? -4 : 4 }}
                                        transition={{ duration: 0.7, ease: smoothEase }}
                                        className="fw-book-front"
                                    >
                                        <Image
                                            src={p.screenshot} alt={p.title} fill
                                            className="object-contain"
                                            sizes="(max-width: 480px) 220px, (max-width: 768px) 280px, (max-width: 900px) 320px, (max-width: 1200px) 360px, (max-width: 1800px) 460px, 600px"
                                        />
                                        <div className="fw-book-overlay">
                                            <span style={{
                                                fontWeight: 900, color: "white", fontSize: 9,
                                                textTransform: "uppercase", letterSpacing: "0.1em",
                                                padding: "4px 10px", borderRadius: 999,
                                                background: p.tagColor, display: "inline-block", marginBottom: 8,
                                            }}>
                                                {p.tag}
                                            </span>
                                            <p style={{ fontWeight: 900, color: "white", textTransform: "uppercase", fontSize: 14, lineHeight: 1.3 }}>{p.title}</p>
                                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 4 }}>by {p.author}</p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <button className="fw-nav-btn next" onClick={next}>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}