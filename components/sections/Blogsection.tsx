"use client";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const posts = [
    {
        id: 1, date: "May 1, 2026", readTime: "5 min", tag: "Publishing", tagColor: "#e8391d",
        title: "How to Get Your Book Published in 2026: A Step-by-Step Guide",
        excerpt: "",
        image: "/images/Book-Publishing.jpg", featured: true,
    },
    {
        id: 2, date: "Apr 18, 2026", readTime: "4 min", tag: "Writing", tagColor: "#1a6e3c",
        title: "10 Ghostwriting Secrets Professional Authors Swear By",
        excerpt: "The best ghostwriters disappear into your voice. Here's what separates the pros from the rest.",
        image: "/images/Writing-Blogs.jpg", featured: false,
    },
    {
        id: 3, date: "Apr 5, 2026", readTime: "6 min", tag: "Marketing", tagColor: "#1a3a6e",
        title: "Book Marketing in the Age of Social Media: What Actually Works",
        excerpt: "With thousands of books published daily, targeted strategy is everything. We break down what drives real results.",
        image: "/images/Marketing-Blog.jpg", featured: false,
    },
    {
        id: 4, date: "Mar 22, 2026", readTime: "3 min", tag: "Design", tagColor: "#7c3aed",
        title: "Why Your Book Cover Can Make or Break Your Sales",
        excerpt: "Readers absolutely judge books by their covers. An expert cover designer explains what makes them reach for a book.",
        image: "/images/Cover-Design-Blog.jpg", featured: false,
    },
];

const headerMask: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: smoothEase } },
};

const smallCardContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};

const smallCard: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: smoothEase } },
};

export default function BlogSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const featured = posts[0];
    const rest = posts.slice(1);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                /* ═══════════════════════════════════
                   BASE STYLES
                ═══════════════════════════════════ */
                .bl-section {
                    font-family: 'Raleway', Arial, sans-serif;
                    background: #f5f4f1;
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    padding: 96px 64px;
                }

                .bl-dot-bg {
                    position: absolute;
                    inset: 0;
                    opacity: 0.035;
                    pointer-events: none;
                    background-image: radial-gradient(#000 1px, transparent 1px);
                    background-size: 28px 28px;
                }

                .bl-inner {
                    position: relative;
                    z-index: 10;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* Header */
                .bl-header {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 24px;
                    margin-bottom: 64px;
                }

                .bl-heading {
                    font-weight: 900;
                    color: black;
                    text-transform: uppercase;
                    line-height: 1;
                    font-size: clamp(2.8rem, 6vw, 5.5rem);
                }

                .bl-heading .accent { color: #e8391d; }

                .bl-view-all {
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

                .bl-view-all:hover { gap: 16px; }

                .bl-view-all .arrow-circle {
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    background: black;
                    display: flex; align-items: center; justify-content: center;
                    color: white;
                    flex-shrink: 0;
                    transition: background 0.3s ease;
                }

                .bl-view-all:hover .arrow-circle { background: #e8391d; }

                /* Grid */
                .bl-grid {
                    display: grid;
                    grid-template-columns: 1.55fr 1fr;
                    gap: 24px;
                }

                /* Featured card */
                .bl-featured {
                    position: relative;
                    overflow: hidden;
                    border-radius: 24px;
                    display: block;
                    text-decoration: none;
                    min-height: 580px;
                }

                .bl-featured-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
                }

                .bl-featured-tag {
                    position: absolute;
                    top: 24px; left: 24px;
                }

                .bl-tag-pill {
                    font-weight: 900;
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 999px;
                    display: inline-block;
                }

                .bl-featured-body {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    padding: 32px;
                }

                .bl-featured-meta {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    color: rgba(255,255,255,0.5);
                    font-size: 12px;
                    font-weight: 600;
                    margin-bottom: 16px;
                }

                .bl-featured-title {
                    font-weight: 900;
                    color: white;
                    text-transform: uppercase;
                    line-height: 1.15;
                    margin-bottom: 12px;
                    font-size: clamp(1.3rem, 2.2vw, 1.9rem);
                    transition: color 0.3s ease;
                }

                .bl-featured:hover .bl-featured-title { color: #e8391d; }

                .bl-featured-excerpt {
                    color: rgba(255,255,255,0.65);
                    line-height: 1.65;
                    font-size: 0.88rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Right col */
                .bl-right {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                /* Small card */
                .bl-card {
                    display: flex;
                    gap: 20px;
                    background: white;
                    border-radius: 16px;
                    padding: 20px;
                    text-decoration: none;
                    overflow: hidden;
                    border: 1px solid transparent;
                    transition: box-shadow 0.5s ease, border-color 0.3s ease;
                }

                .bl-card:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.1); border-color: #f0f0f0; }

                .bl-card-thumb {
                    position: relative;
                    flex-shrink: 0;
                    border-radius: 12px;
                    overflow: hidden;
                    width: 96px;
                    height: 96px;
                }

                .bl-card-body {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    min-width: 0;
                }

                .bl-card-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                }

                .bl-small-pill {
                    font-weight: 900;
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 999px;
                }

                .bl-card-time {
                    color: #9ca3af;
                    font-size: 11px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .bl-card-title {
                    font-weight: 900;
                    color: black;
                    text-transform: uppercase;
                    line-height: 1.35;
                    font-size: clamp(0.82rem, 0.95vw, 0.92rem);
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.2s ease;
                }

                .bl-card:hover .bl-card-title { color: #e8391d; }

                .bl-card-date {
                    color: #9ca3af;
                    font-size: 11px;
                    font-weight: 500;
                    margin-top: 6px;
                }

                /* Browse all CTA */
                .bl-cta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #e8391d;
                    color: white;
                    border-radius: 16px;
                    padding: 20px 28px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .bl-cta:hover { background: #c0271a; }

                .bl-cta span {
                    font-weight: 900;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }


                /* ═══════════════════════════════════
                   2560px — 4K
                ═══════════════════════════════════ */
                @media (min-width: 2400px) {
                    .bl-section { padding: 160px 140px; }
                    .bl-inner { max-width: 2200px; }
                    .bl-heading { font-size: clamp(4rem, 5.5vw, 8rem); }
                    .bl-header { margin-bottom: 100px; gap: 40px; }
                    .bl-view-all { font-size: 16px; gap: 18px; }
                    .bl-view-all .arrow-circle { width: 52px; height: 52px; }
                    .bl-grid { gap: 36px; }
                    .bl-featured { min-height: 1000px; border-radius: 40px; }
                    .bl-featured-body { padding: 56px; }
                    .bl-featured-title { font-size: clamp(2rem, 2.5vw, 3rem); }
                    .bl-featured-excerpt { font-size: 1.1rem; }
                    .bl-featured-meta { font-size: 16px; gap: 24px; margin-bottom: 24px; }
                    .bl-featured-tag { top: 40px; left: 40px; }
                    .bl-tag-pill { font-size: 13px; padding: 10px 20px; }
                    .bl-right { gap: 28px; }
                    .bl-card { padding: 28px; gap: 28px; border-radius: 24px; }
                    .bl-card-thumb { width: 140px; height: 140px; border-radius: 16px; }
                    .bl-card-title { font-size: clamp(1rem, 1.1vw, 1.3rem); }
                    .bl-card-date { font-size: 14px; }
                    .bl-card-time { font-size: 14px; }
                    .bl-small-pill { font-size: 11px; padding: 6px 12px; }
                    .bl-cta { padding: 28px 44px; border-radius: 24px; }
                    .bl-cta span { font-size: 17px; }
                    .bl-dot-bg { background-size: 40px 40px; }
                }

                /* ═══════════════════════════════════
                   1920px — Full HD
                ═══════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .bl-section { padding: 130px 120px; }
                    .bl-inner { max-width: 1700px; }
                    .bl-heading { font-size: clamp(3.2rem, 5vw, 7rem); }
                    .bl-header { margin-bottom: 80px; }
                    .bl-view-all { font-size: 14px; }
                    .bl-view-all .arrow-circle { width: 44px; height: 44px; }
                    .bl-grid { gap: 28px; }
                    .bl-featured { min-height: 780px; border-radius: 32px; }
                    .bl-featured-body { padding: 44px; }
                    .bl-featured-title { font-size: clamp(1.7rem, 2.3vw, 2.5rem); }
                    .bl-featured-excerpt { font-size: 1rem; }
                    .bl-featured-meta { font-size: 14px; }
                    .bl-tag-pill { font-size: 12px; padding: 8px 16px; }
                    .bl-right { gap: 24px; }
                    .bl-card { padding: 24px; gap: 24px; border-radius: 20px; }
                    .bl-card-thumb { width: 120px; height: 120px; }
                    .bl-card-title { font-size: clamp(0.92rem, 1vw, 1.1rem); }
                    .bl-card-date, .bl-card-time { font-size: 13px; }
                    .bl-small-pill { font-size: 10px; }
                    .bl-cta { padding: 24px 36px; border-radius: 20px; }
                    .bl-cta span { font-size: 15px; }
                }

                /* ═══════════════════════════════════
                   1440px — Large Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .bl-section { padding: 110px 80px; }
                    .bl-inner { max-width: 1360px; }
                    .bl-heading { font-size: clamp(3rem, 5.5vw, 6rem); }
                    .bl-header { margin-bottom: 72px; }
                    .bl-featured { min-height: 650px; }
                    .bl-card-thumb { width: 104px; height: 104px; }
                }

                /* ═══════════════════════════════════
                   1280px — Standard Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .bl-section { padding: 96px 64px; }
                    .bl-inner { max-width: 1160px; }
                }

                /* ═══════════════════════════════════
                   1024px — Small Laptop
                ═══════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .bl-section { padding: 80px 48px; }
                    .bl-heading { font-size: clamp(2.2rem, 5vw, 4rem); }
                    .bl-header { margin-bottom: 48px; }
                    .bl-grid { grid-template-columns: 1.4fr 1fr; gap: 20px; }
                    .bl-featured { min-height: 500px; }
                    .bl-featured-body { padding: 24px; }
                    .bl-featured-title { font-size: clamp(1.1rem, 2vw, 1.5rem); }
                    .bl-card { padding: 16px; gap: 14px; }
                    .bl-card-thumb { width: 80px; height: 80px; }
                    .bl-card-title { font-size: 0.82rem; }
                    .bl-cta { padding: 16px 22px; }
                    .bl-cta span { font-size: 11px; }
                    .bl-right { gap: 14px; }
                }

                /* ═══════════════════════════════════
                   900px — Tablet (STACK)
                ═══════════════════════════════════ */
                @media (max-width: 900px) {
                    .bl-section { padding: 72px 40px; }
                    .bl-grid {
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }
                    .bl-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                        margin-bottom: 48px;
                    }
                    .bl-view-all { align-self: flex-start; margin-bottom: 0; }
                    .bl-heading { font-size: clamp(2.4rem, 6vw, 4rem); }
                    .bl-featured { min-height: 480px; }
                }

                /* ═══════════════════════════════════
                   768px — Tablet Portrait
                ═══════════════════════════════════ */
                @media (max-width: 768px) {
                    .bl-section { padding: 60px 32px; }
                    .bl-heading { font-size: clamp(2rem, 7vw, 3.2rem); }
                    .bl-header { margin-bottom: 40px; }
                    .bl-featured { min-height: 420px; border-radius: 20px; }
                    .bl-featured-body { padding: 24px; }
                    .bl-featured-title { font-size: clamp(1.2rem, 4vw, 1.6rem); }
                    .bl-card { padding: 16px; gap: 14px; border-radius: 14px; }
                    .bl-card-thumb { width: 88px; height: 88px; }
                }

                /* ═══════════════════════════════════
                   640px — Large Mobile
                ═══════════════════════════════════ */
                @media (max-width: 640px) {
                    .bl-section { padding: 48px 20px; }
                    .bl-heading { font-size: clamp(1.9rem, 8vw, 2.8rem); }
                    .bl-header { margin-bottom: 32px; gap: 12px; }
                    .bl-featured { min-height: 360px; border-radius: 18px; }
                    .bl-featured-body { padding: 20px; }
                    .bl-featured-meta { font-size: 11px; gap: 10px; margin-bottom: 10px; }
                    .bl-featured-title { font-size: clamp(1.05rem, 5vw, 1.4rem); margin-bottom: 8px; }
                    .bl-featured-excerpt { font-size: 0.82rem; }
                    .bl-featured-tag { top: 16px; left: 16px; }
                    .bl-tag-pill { font-size: 9px; padding: 5px 10px; }
                    .bl-card { padding: 14px; gap: 12px; border-radius: 12px; }
                    .bl-card-thumb { width: 80px; height: 80px; border-radius: 10px; }
                    .bl-card-title { font-size: 0.8rem; }
                    .bl-card-date, .bl-card-time { font-size: 10px; }
                    .bl-small-pill { font-size: 8.5px; }
                    .bl-cta { padding: 16px 20px; border-radius: 14px; }
                    .bl-cta span { font-size: 11px; }
                    .bl-view-all { font-size: 11px; }
                    .bl-view-all .arrow-circle { width: 32px; height: 32px; }
                    .bl-right { gap: 14px; }
                }

                /* ═══════════════════════════════════
                   480px — Standard Mobile
                ═══════════════════════════════════ */
                @media (max-width: 480px) {
                    .bl-section { padding: 40px 16px; }
                    .bl-heading { font-size: clamp(1.7rem, 8.5vw, 2.4rem); }
                    .bl-featured { min-height: 300px; border-radius: 16px; }
                    .bl-featured-body { padding: 16px; }
                    .bl-featured-title { font-size: clamp(1rem, 5.5vw, 1.3rem); }
                    .bl-card-thumb { width: 72px; height: 72px; }
                    .bl-card { padding: 12px; gap: 10px; }
                    .bl-card-title { font-size: 0.78rem; }
                }

                /* ═══════════════════════════════════
                   380px — Small Mobile (iPhone SE)
                ═══════════════════════════════════ */
                @media (max-width: 380px) {
                    .bl-section { padding: 32px 14px; }
                    .bl-heading { font-size: 1.6rem; }
                    .bl-featured { min-height: 260px; border-radius: 14px; }
                    .bl-featured-title { font-size: 1rem; }
                    .bl-featured-excerpt { display: none; }
                    .bl-card { padding: 10px; gap: 10px; }
                    .bl-card-thumb { width: 64px; height: 64px; }
                    .bl-card-title { font-size: 0.75rem; }
                    .bl-cta span { font-size: 10px; }
                    .bl-cta { padding: 14px 16px; }
                    .bl-header { margin-bottom: 24px; }
                    .bl-right { gap: 10px; }
                }

                /* ═══════════════════════════════════
                   320px — Very Small
                ═══════════════════════════════════ */
                @media (max-width: 320px) {
                    .bl-section { padding: 28px 12px; }
                    .bl-heading { font-size: 1.4rem; }
                    .bl-featured { min-height: 220px; }
                    .bl-featured-title { font-size: 0.9rem; }
                    .bl-card-thumb { width: 56px; height: 56px; }
                    .bl-card-title { font-size: 0.72rem; }
                    .bl-featured-meta { display: none; }
                }
            `}</style>

            <section ref={sectionRef} className="bl-section">
                <div className="bl-dot-bg" />

                <div className="bl-inner">
                    {/* Header */}
                    <div className="bl-header">
                        <div style={{ overflow: "hidden" }}>
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ duration: 0.6, ease: smoothEase }}
                                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
                            >
                                <span style={{ width: 32, height: 2, background: "#e8391d", display: "block" }} />
                                <span style={{ color: "#e8391d", fontWeight: 900, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.28em" }}>
                                    OUR BLOGS
                                </span>
                            </motion.div>
                            <motion.h2
                                variants={headerMask}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="bl-heading"
                            >
                                PUBLISHING INSIGHTS<br />
                                <span className="accent">& SPOTLIGHTS</span>
                            </motion.h2>
                        </div>
                        <motion.a
                            href="#"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="bl-view-all"
                        >
                            All Articles
                            <span className="arrow-circle"><ArrowRight size={15} /></span>
                        </motion.a>
                    </div>

                    {/* Magazine Grid */}
                    <div className="bl-grid">
                        {/* Featured Card */}
                        <motion.a
                            href="#"
                            initial={{ clipPath: "inset(100% 0% 0% 0% round 24px)", scale: 1.05 }}
                            animate={isInView ? { clipPath: "inset(0% 0% 0% 0% round 24px)", scale: 1 } : {}}
                            transition={{ duration: 1.2, ease: smoothEase }}
                            className="bl-featured"
                        >
                            <Image src={featured.image} alt={featured.title} fill
                                className="object-cover"
                                style={{ transition: "transform 1200ms ease-out" }}
                                sizes="(max-width: 640px) 100vw, (max-width: 900px) 100vw, (max-width: 1200px) 55vw, (max-width: 1800px) 720px, 1100px"
                            />
                            <div className="bl-featured-overlay" />

                            <motion.div
                                className="bl-featured-tag"
                                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                                transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <span className="bl-tag-pill" style={{ background: featured.tagColor }}>
                                    {featured.tag}
                                </span>
                            </motion.div>

                            <div className="bl-featured-body">
                                <div className="bl-featured-meta">
                                    <span>{featured.date}</span>
                                    <span>·</span>
                                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                        <Clock size={11} /> {featured.readTime} read
                                    </span>
                                </div>
                                <h3 className="bl-featured-title">{featured.title}</h3>
                                <p className="bl-featured-excerpt">{featured.excerpt}</p>
                            </div>
                        </motion.a>

                        {/* Right col */}
                        <motion.div
                            variants={smallCardContainer}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="bl-right"
                        >
                            {rest.map((post) => (
                                <motion.a key={post.id} href="#" variants={smallCard} className="bl-card">
                                    <div className="bl-card-thumb">
                                        <Image src={post.image} alt={post.title} fill
                                            className="object-cover"
                                            style={{ transition: "transform 700ms ease-out" }}
                                            sizes="(max-width: 480px) 72px, (max-width: 768px) 88px, (max-width: 1800px) 96px, 140px"
                                        />
                                    </div>
                                    <div className="bl-card-body">
                                        <div className="bl-card-meta">
                                            <span className="bl-small-pill" style={{ background: post.tagColor }}>{post.tag}</span>
                                            <span className="bl-card-time"><Clock size={10} /> {post.readTime}</span>
                                        </div>
                                        <h3 className="bl-card-title">{post.title}</h3>
                                        <p className="bl-card-date">{post.date}</p>
                                    </div>
                                </motion.a>
                            ))}

                            {/* Browse All CTA */}
                            <motion.a
                                href="/Blogs"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
                                className="bl-cta"
                            >
                                <span>Browse All Articles</span>
                                <ArrowRight size={18} />
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}