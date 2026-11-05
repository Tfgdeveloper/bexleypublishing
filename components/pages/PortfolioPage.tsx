"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { BookOpen, ArrowRight, ExternalLink, MessageCircle } from "lucide-react";
import HeroButtons from "../HeroButton";

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
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

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

// ── Genre config ──────────────────────────────────────────────────────────────
const genres = [
    { label: "All", color: "#e8391d" },
    { label: "Action & Adventure", color: "#b91c1c" },
    { label: "Faith & Spirituality", color: "#7c3aed" },
    { label: "Fiction", color: "#0891b2" },
    { label: "Non-Fiction", color: "#d97706" },
    { label: "Kids", color: "#16a34a" },
    { label: "Sci-Fi", color: "#1d4ed8" },
];

// ── Book data ─────────────────────────────────────────────────────────────────
const books = [
    // Action & Adventure
    { id: 1, genre: "Action & Adventure", title: "12 ROUNDS OF ELITE BOXING", author: "MYRON TAYLOR", image: "/images/Book-Cover/Action-Adventure/1.jpg", stat: "2,400+ Copies Sold" },
    { id: 2, genre: "Action & Adventure", title: "THE CORRUGATED ROAD TO SHANGHAI", author: "DAVID SHIRLEY", image: "/images/Book-Cover/Action-Adventure/2.jpg", stat: "Top 10 Amazon" },
    { id: 3, genre: "Action & Adventure", title: "CONFESSIONS OF A SINNER", author: "DAY WALKER", image: "/images/Book-Cover/Action-Adventure/3.jpg", stat: "Bestseller" },
    { id: 4, genre: "Action & Adventure", title: "A WHITE HOUSE RAZOR WIRE FENCE", author: "JOHN LENDALL", image: "/images/Book-Cover/Action-Adventure/4.jpg", stat: "Critically Acclaimed" },
    { id: 5, genre: "Action & Adventure", title: "SLOUCHING TOWARDS BARBARISM", author: "WILLIAM OPHULS", image: "/images/Book-Cover/Action-Adventure/5.jpg", stat: "Award Winner" },
    { id: 6, genre: "Action & Adventure", title: "HERE AND GONE", author: "DAVID NOONAN & SUSAN FAIOLA", image: "/images/Book-Cover/Action-Adventure/6.jpeg", stat: "5★ Rating" },

    // Faith & Spirituality
    { id: 7, genre: "Faith & Spirituality", title: "ADJUST YOUR CROWN", author: "MARY ANNE MATHEWS", image: "/images/Book-Cover/Faith-Spirituality/1.jpg", stat: "Bestseller" },
    { id: 8, genre: "Faith & Spirituality", title: "THE COCOON", author: "ELAINE L TOMPKINS", image: "/images/Book-Cover/Faith-Spirituality/2.jpg", stat: "5★ Avg. Rating" },
    { id: 9, genre: "Faith & Spirituality", title: "A CHRISTIAN BY ANY OTHER NAME", author: "JIMMIE WAYNE KNOWLES", image: "/images/Book-Cover/Faith-Spirituality/3.jpg", stat: "Top Seller" },
    { id: 10, genre: "Faith & Spirituality", title: "CAN GOD TRUST YOU", author: "DR. EILEEN ANDERSON", image: "/images/Book-Cover/Faith-Spirituality/4.jpg", stat: "10k+ Readers" },
    { id: 11, genre: "Faith & Spirituality", title: "AWESOME ANSWER TO PRAYER", author: "PATRISIA FAUGHN", image: "/images/Book-Cover/Faith-Spirituality/5.jpg", stat: "Inspiring Read" },
    { id: 12, genre: "Faith & Spirituality", title: "WE SPEAK OF MIRACLES", author: "KRISTON NELSON", image: "/images/Book-Cover/Faith-Spirituality/6.jpg", stat: "Award Winner" },

    // Fiction
    { id: 13, genre: "Fiction", title: "CALL YOUR NEXT WITNESS", author: "D.C. RUSCHMAN", image: "/images/Book-Cover/Fiction/1.jpg", stat: "Bestseller" },
    { id: 14, genre: "Fiction", title: "THE INVADERS", author: "DILGILIO RODRIGUEZ", image: "/images/Book-Cover/Fiction/2.jpg", stat: "5★ Rating" },
    { id: 15, genre: "Fiction", title: "THE BLACK DOG OF BUNGAY", author: "DR DAVID WALDRON & CHRISTOPHER REEVE", image: "/images/Book-Cover/Fiction/3.jpg", stat: "Critically Acclaimed" },
    { id: 16, genre: "Fiction", title: "THE FUNERAL", author: "KEVIN LACHAUSSE", image: "/images/Book-Cover/Fiction/4.jpg", stat: "Top 10 Amazon" },
    { id: 17, genre: "Fiction", title: "THE PREDESTINATION", author: "DEE STREECK", image: "/images/Book-Cover/Fiction/5.jpg", stat: "Award Winner" },
    { id: 18, genre: "Fiction", title: "TRUST ME", author: "J.A FITTS", image: "/images/Book-Cover/Fiction/6.jpg", stat: "15+ Platforms" },

    // Non-Fiction
    { id: 19, genre: "Non-Fiction", title: "THANK YOU MARILYN", author: "HOLLY BUTLER", image: "/images/Book-Cover/Non-Fiction/1.jpg", stat: "Bestseller" },
    { id: 20, genre: "Non-Fiction", title: "A BETTER LOVE", author: "S.R. WILLIAMS", image: "/images/Book-Cover/Non-Fiction/2.jpg", stat: "5★ Avg. Rating" },
    { id: 21, genre: "Non-Fiction", title: "THRU THE EYES OF A CHILD", author: "DAVID SHERILL", image: "/images/Book-Cover/Non-Fiction/3.jpg", stat: "Award Winner" },
    { id: 22, genre: "Non-Fiction", title: "QUIET MORNING REFLECTIONS", author: "JESSICA LIMON", image: "/images/Book-Cover/Non-Fiction/4.jpg", stat: "10k+ Readers" },
    { id: 23, genre: "Non-Fiction", title: "PARK AVENUE FIRE SALE", author: "MICHELE WOOD", image: "/images/Book-Cover/Non-Fiction/5.jpg", stat: "Top Seller" },
    { id: 24, genre: "Non-Fiction", title: "WHEN DID MY PARENTS GET OLD", author: "LISA HARDY", image: "/images/Book-Cover/Non-Fiction/6.jpg", stat: "Critically Acclaimed" },

    // Kids
    { id: 25, genre: "Kids", title: "THE MIRROR WITHIN", author: "KYLE WEST", image: "/images/Book-Cover/Kids/1.jpg", stat: "5★ Rating" },
    { id: 26, genre: "Kids", title: "HANNAH PIMP BY HER", author: "RICKY NEAL KINCAID JR.", image: "/images/Book-Cover/Kids/2.jpg", stat: "Bestseller" },
    { id: 27, genre: "Kids", title: "PENCIL FUN MANIA", author: "ELLEN MANVILLE", image: "/images/Book-Cover/Kids/3.png", stat: "10k+ Copies" },
    { id: 28, genre: "Kids", title: "THE STORY OF YASU", author: "APRIL BASS", image: "/images/Book-Cover/Kids/4.jpg", stat: "Award Winner" },
    { id: 29, genre: "Kids", title: "THE SUBSTITUTE WHO SPARKLED", author: "JENNIFER M. BECKLER", image: "/images/Book-Cover/Kids/5.jpg", stat: "Top Seller" },
    { id: 30, genre: "Kids", title: "PATCHES", author: "BIG BACKYARD", image: "/images/Book-Cover/Kids/6.jpg", stat: "5★ Rating" },

    // Sci-Fi
    { id: 31, genre: "Sci-Fi", title: "INNOVATIVE ENVIRONMENTAL", author: "AVIJIT DASGUPTA", image: "/images/Book-Cover/Sci-Fi/1.jpg", stat: "Bestseller" },
    { id: 32, genre: "Sci-Fi", title: "THE HIDDEN EPIDEMIC", author: "JOHN J. HERBERT DC", image: "/images/Book-Cover/Sci-Fi/2.jpg", stat: "10k+ Readers" },
    { id: 33, genre: "Sci-Fi", title: "GREENLAND", author: "JEFFERY G. CARSWELL", image: "/images/Book-Cover/Sci-Fi/3.jpg", stat: "Award Winner" },
    { id: 34, genre: "Sci-Fi", title: "THE PHYSICS OF RELIGION", author: "WILLIAM J. MEGGS", image: "/images/Book-Cover/Sci-Fi/4.jpg", stat: "Critically Acclaimed" },
    { id: 35, genre: "Sci-Fi", title: "THE BOOK OF NALEDGE", author: "MAB", image: "/images/Book-Cover/Sci-Fi/5.jpg", stat: "5★ Rating" },
    { id: 36, genre: "Sci-Fi", title: "BLACK HOLES", author: "SANDI SATIAWAN", image: "/images/Book-Cover/Sci-Fi/6.jpg", stat: "Top Seller" },
];

// For "All": pick first book of each genre
const ALL_PREVIEW = genres
    .filter(g => g.label !== "All")
    .map(g => books.find(b => b.genre === g.label)!);

export default function PortfolioPage() {
    const [activeGenre, setActiveGenre] = useState("All");
    const gridRef = useRef<HTMLDivElement>(null);
    const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

    const genreColor = genres.find(g => g.label === activeGenre)?.color ?? "#e8391d";

    const displayedBooks = activeGenre === "All"
        ? ALL_PREVIEW
        : books.filter(b => b.genre === activeGenre);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;900&display=swap');
                .port-main { width: 100%; overflow: hidden; font-family: 'Raleway', Arial, sans-serif; }

                /* ── Hero ── */
                .port-hero { position: relative; width: 100%; height: 100vh; min-height: 480px; display: flex; align-items: center; justify-content: center; background: #05070f; overflow: hidden; }
                .port-hero-inner { position: relative; z-index: 10; text-align: center; padding: 0 24px; max-width: 1000px; margin: 0 auto; }
                .port-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.95; margin-bottom: 24px; font-size: clamp(2.8rem, 8vw, 7rem); }
                .port-hero-sub { color: rgba(255,255,255,0.6); line-height: 1.85; max-width: 40rem; margin: 0 auto; font-size: clamp(0.875rem, 1.1vw, 1.05rem); }
                .port-eyebrow { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 24px; }
                .port-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }

                /* ── Grid Section ── */
                .port-grid-section { position: relative; width: 100%; background: #faf9f7; padding: 80px 0 100px; overflow: hidden; }
                .port-grid-inner { max-width: 1400px; margin: 0 auto; padding: 0 32px; }

                /* ── Filter header row ── */
                .port-filter-row { display: flex; flex-direction: column; gap: 24px; margin-bottom: 56px; align-items: center; text-align: center; }
                .port-section-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2rem, 5vw, 4rem); }
                .port-pills { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
                .port-pill { position: relative; padding: 10px 20px; border-radius: 999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; font-size: 11px; cursor: pointer; border: 1.5px solid; transition: all 0.25s ease; background: transparent; font-family: 'Raleway', Arial, sans-serif; }
                .port-pill.active { color: white; }
                .port-pill.inactive { color: rgba(0,0,0,0.55); border-color: #d1d5db; }
                .port-pill.inactive:hover { border-color: #e8391d; color: #e8391d; }

                /* ── Sub-label centering ── */
                .port-sublabel { text-align: center; }

                /* ── Book Grid ── */
                .port-books-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
                .port-book-card { position: relative; border-radius: 20px; overflow: hidden; cursor: pointer; box-shadow: 0 8px 32px rgba(0,0,0,0.12); transition: box-shadow 0.5s ease; aspect-ratio: 3/4; min-height: 300px; }
                .port-book-card:hover { box-shadow: 0 24px 64px rgba(0,0,0,0.22); }
                .port-book-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; display: block; }
                .port-book-card:hover .port-book-img { transform: scale(1.08); }
                .port-book-overlay-default { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, transparent 100%); }
                .port-book-bottom { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; transition: opacity 0.3s ease; }
                .port-book-bottom-genre { font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; font-size: 9px; color: white; padding: 3px 10px; border-radius: 999px; display: inline-block; margin-bottom: 8px; }
                .port-book-bottom-title { font-weight: 900; color: white; text-transform: uppercase; font-size: 15px; line-height: 1.2; }
                .port-book-bottom-author { color: rgba(255,255,255,0.5); font-size: 11px; margin-top: 4px; }
                /* Hover slide-up overlay */
                .port-book-hover { position: absolute; inset: 0; background: rgba(5,7,15,0.92); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px; text-align: center; transform: translateY(100%); transition: transform 0.45s ease; }
                .port-book-card:hover .port-book-hover { transform: translateY(0); }
                .port-book-card:hover .port-book-bottom { opacity: 0; }
                .port-hover-stat-box { width: 72px; height: 72px; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px; }
                .port-hover-stat-num  { font-weight: 900; font-size: 18px; line-height: 1; }
                .port-hover-stat-text { color: rgba(255,255,255,0.5); font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 3px; }
                .port-hover-title  { font-weight: 900; color: white; text-transform: uppercase; font-size: 20px; line-height: 1.15; margin-bottom: 6px; }
                .port-hover-author { color: rgba(255,255,255,0.55); font-size: 12px; margin-bottom: 20px; }
                .port-hover-btns { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
                .port-hover-btn-primary { display: inline-flex; align-items: center; gap: 6px; background: #e8391d; color: white; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; padding: 10px 18px; border-radius: 10px; text-decoration: none; transition: background 0.2s; }
                .port-hover-btn-primary:hover { background: #c0271a; }
                .port-hover-btn-outline { display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(255,255,255,0.2); color: white; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; padding: 10px 18px; border-radius: 10px; text-decoration: none; transition: background 0.2s; }
                .port-hover-btn-outline:hover { background: rgba(255,255,255,0.08); }

                /* ── All-mode genre label badge ── */
                .port-all-badge { position: absolute; top: 16px; left: 16px; z-index: 5; font-weight: 900; font-size: 9px; text-transform: uppercase; letter-spacing: 0.12em; color: white; padding: 4px 12px; border-radius: 999px; }

                /* ── CTA ── */
                .port-cta { position: relative; width: 100%; background: #e8391d; padding: 100px 0; overflow: hidden; }
                .port-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 0 32px; position: relative; z-index: 10; }
                .port-cta-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.1; margin-bottom: 20px; font-size: clamp(2.2rem, 5vw, 4rem); }
                .port-cta-sub { color: rgba(255,255,255,0.82); font-size: 17px; max-width: 480px; margin: 0 auto 36px; line-height: 1.7; }
                .port-cta-btn { display: inline-flex; align-items: center; gap: 12px; background: black; color: white; font-weight: 900; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; padding: 18px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .port-cta-btn:hover { background: white; color: #e8391d; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }

                /* ══ Responsive ══════════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .port-grid-inner { max-width: 2200px; padding: 0 160px; }
                    .port-grid-section { padding: 140px 0 160px; }
                    .port-books-grid { gap: 48px; }
                    .port-book-bottom-title { font-size: 20px; }
                    .port-hover-title { font-size: 26px; }
                    .port-cta { padding: 160px 0; }
                    .port-cta-h2 { font-size: 6rem; }
                    .port-cta-sub { font-size: 22px; }
                    .port-cta-btn { font-size: 17px; padding: 24px 56px; }
                }
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .port-grid-inner { max-width: 1700px; padding: 0 96px; }
                    .port-books-grid { gap: 36px; }
                    .port-book-bottom-title { font-size: 17px; }
                    .port-hover-title { font-size: 22px; }
                    .port-cta-h2 { font-size: clamp(3rem, 4.5vw, 5rem); }
                }
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .port-grid-inner { max-width: 1360px; padding: 0 64px; }
                }
                @media (max-width: 900px) {
                    .port-books-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
                    .port-grid-inner { padding: 0 24px; }
                    .port-grid-section { padding: 56px 0 72px; }
                    .port-filter-row { margin-bottom: 36px; }
                }
                @media (max-width: 640px) {
                    .port-books-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
                    .port-grid-inner { padding: 0 16px; }
                    .port-grid-section { padding: 44px 0 60px; }
                    .port-pill { font-size: 10px; padding: 8px 14px; }
                    .port-book-bottom-title { font-size: 12px; }
                    .port-book-bottom-author { font-size: 10px; }
                    .port-hover-title { font-size: 13px; }
                    .port-hover-author { font-size: 10px; }
                    .port-hover-stat-box { width: 52px; height: 52px; }
                    .port-hover-stat-num { font-size: 13px; }
                    .port-hover-btn-primary, .port-hover-btn-outline { font-size: 8px; padding: 8px 12px; }
                    .port-book-hover { padding: 16px; }
                    .port-cta { padding: 60px 0; }
                    .port-cta-inner { padding: 0 20px; }
                    .port-cta-sub { font-size: 14px; }
                    .port-cta-btn { font-size: 11px; padding: 14px 28px; }
                    .port-all-badge { font-size: 8px; padding: 3px 8px; }
                }
                @media (max-width: 400px) {
                    .port-books-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
                    .port-grid-inner { padding: 0 12px; }
                }
            `}</style>

            <main className="port-main">

                {/* ═══ S1: HERO ═══ */}
                <section className="port-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{ backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                        style={{ width: 1000, height: 500, background: "rgba(232,57,29,0.1)", borderRadius: "50%", filter: "blur(180px)" }} />

                    <div className="port-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }} className="port-eyebrow">
                            <span style={{ width: 32, height: 2, background: "#e8391d", display: "block" }} />
                            <span className="port-eyebrow-text">Our Work</span>
                            <span style={{ width: 32, height: 2, background: "#e8391d", display: "block" }} />
                        </motion.div>

                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="port-hero-h1">
                            PUBLISHED <br /><span style={{ color: "#e8391d" }}>MASTERPIECES.</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="port-hero-sub">
                            From thrilling adventures to groundbreaking guides — explore the books we've brought to life across every genre.
                        </motion.p>

                        <HeroButtons />
                    </div>
                </section>

                {/* ═══ S2: GRID ═══ */}
                <section ref={gridRef} className="port-grid-section">
                    <motion.div initial={{ width: "0%" }} animate={gridInView ? { width: "100%" } : {}}
                        transition={{ duration: 1.5, ease: smoothEase }}
                        className="absolute top-0 left-0 h-1 origin-left" style={{ background: "#e8391d" }} />

                    <div className="port-grid-inner">

                        {/* Header + Filter Pills — CENTERED */}
                        <div className="port-filter-row">
                            <motion.h2 variants={maskReveal} initial="hidden"
                                animate={gridInView ? "visible" : "hidden"} className="port-section-h2">
                                FEATURED <span style={{ color: "#e8391d" }}>BOOKS</span>
                            </motion.h2>

                            <motion.div variants={fadeUp} initial="hidden"
                                animate={gridInView ? "visible" : "hidden"} className="port-pills">
                                {genres.map((g) => {
                                    const isActive = activeGenre === g.label;
                                    return (
                                        <button key={g.label} onClick={() => setActiveGenre(g.label)}
                                            className={`port-pill ${isActive ? "active" : "inactive"}`}
                                            style={isActive
                                                ? { background: g.color, borderColor: g.color }
                                                : {}}>
                                            {g.label}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* Sub-label — CENTERED */}
                        <AnimatePresence mode="wait">
                            {activeGenre !== "All" && (
                                <motion.p key={activeGenre}
                                    className="port-sublabel"
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                                    style={{ color: "#6b7280", fontSize: 14, marginBottom: 32, marginTop: -16 }}>
                                    Showing all <span style={{ color: genreColor, fontWeight: 700 }}>{activeGenre}</span> titles
                                </motion.p>
                            )}
                            {activeGenre === "All" && (
                                <motion.p key="all"
                                    className="port-sublabel"
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                                    style={{ color: "#6b7280", fontSize: 14, marginBottom: 32, marginTop: -16 }}>
                                    Showing one title per genre — <span style={{ color: "#e8391d", fontWeight: 700 }}>click a genre</span> to explore all 6 books
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Books Grid */}
                        <motion.div layout className="port-books-grid">
                            <AnimatePresence mode="popLayout">
                                {displayedBooks.map((book) => {
                                    const color = genres.find(g => g.label === book.genre)?.color ?? "#e8391d";
                                    const statParts = book.stat.split(" ");
                                    const statNum = statParts[0];
                                    const statRest = statParts.slice(1).join(" ");

                                    return (
                                        <motion.div key={book.id} layout
                                            initial={{ opacity: 0, scale: 0.92 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.92 }}
                                            transition={{ duration: 0.45, ease: smoothEase }}
                                            className="port-book-card">

                                            {/* Cover Image */}
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={book.image} alt={book.title} className="port-book-img" />

                                            {/* Genre badge (All mode only) */}
                                            {activeGenre === "All" && (
                                                <div className="port-all-badge" style={{ background: color }}>
                                                    {book.genre}
                                                </div>
                                            )}

                                            {/* Default gradient + bottom text */}
                                            <div className="port-book-overlay-default" />
                                            <div className="port-book-bottom">
                                                <div className="port-book-bottom-genre" style={{ background: color }}>
                                                    {book.genre}
                                                </div>
                                                <h3 className="port-book-bottom-title">{book.title}</h3>
                                                <p className="port-book-bottom-author">by {book.author}</p>
                                            </div>

                                            {/* Hover overlay */}
                                            <div className="port-book-hover">
                                                <div className="port-hover-stat-box"
                                                    style={{ background: `${color}20` }}>
                                                    <span className="port-hover-stat-num" style={{ color }}>{statNum}</span>
                                                    {statRest && <span className="port-hover-stat-text">{statRest}</span>}
                                                </div>
                                                <h3 className="port-hover-title">{book.title}</h3>
                                                <p className="port-hover-author">by {book.author}</p>
                                            </div>

                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </section>

                {/* ═══ S3: CTA ═══ */}
                <section className="port-cta">
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8 }} className="port-cta-inner">
                        <h2 className="port-cta-h2">READY TO SEE YOUR NAME HERE?</h2>
                        <p className="port-cta-sub">
                            Join the ranks of bestselling authors. Let's publish your book and create a success story together.
                        </p>
                        <button
                            type="button"
                            className="port-cta-btn"
                            onClick={openLiveChat}
                        >
                            <MessageCircle size={16} />
                            Book A Free Consultation
                        </button>
                    </motion.div>
                </section>

            </main>
        </>
    );
}