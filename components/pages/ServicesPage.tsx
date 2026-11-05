"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import QuoteModal from "@/components/Quotemodal";
import {
    BookOpen, PenTool, Palette, Rocket, ArrowRight, CheckCircle2,
    Sparkles, FileText, BarChart, Sword, Heart, Briefcase, Globe,
    Baby, GraduationCap, Minus, Plus, MessageCircle, Phone
} from "lucide-react";

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
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const coreServices = [
    { icon: PenTool, title: "Writing & Ghostwriting", desc: "Writing that transforms your ideas into a captivating manuscript.", color: "#e8391d" },
    { icon: FileText, title: "Editing & Proofreading", desc: "Preparing with developmental, line, and copy editing for seamless publication.", color: "#1a6e3c" },
    { icon: Palette, title: "Cover Design & Formatting", desc: "Designing stunning visuals and pixel-perfect interior layouts that sell.", color: "#1a3a6e" },
    { icon: Rocket, title: "Publishing & Distribution", desc: "Global reach across Amazon, B&N, Ingram, and 40+ platforms.", color: "#7c3aed" },
];

const detailedServices = [
    { id: "writing", label: "Book Writing", icon: PenTool, title: "CRAFTING YOUR MASTERPIECE", desc: "Whether you have a rough outline or just a spark of an idea, our elite ghostwriters breathe life into your vision. We match your voice, tone, and style perfectly.", features: ["Ghostwriting (Fiction & Non-Fiction)", "Memoir & Biography Writing", "Children's Book Writing", "Story Development & Outlining", "Character & World Building"], image: "/images/Services/Book-Writing.jpg" },
    { id: "editing", label: "Editing", icon: FileText, title: "PERFECTION IN EVERY WORD", desc: "A good book is edited by a great team. We refine your manuscript through multiple rounds, ensuring flawless grammar, pacing, and narrative flow.", features: ["Developmental Editing", "Line & Copy Editing", "Proofreading", "Beta Reading Feedback", "Manuscript Critique"], image: "/images/Services/Book-Editing.jpg" },
    { id: "design", label: "Design", icon: Palette, title: "JUDGED BY THE COVER", desc: "Readers absolutely judge a book by its cover. Our award-winning designers create covers that stop the scroll and interiors that are a joy to read.", features: ["Custom Book Cover Design", "Interior Layout & Formatting", "eBook Conversion (ePub/Mobi)", "Illustrations for Children's Books", "Author Branding"], image: "/images/Services/Design.webp" },
    { id: "publishing", label: "Publishing", icon: Rocket, title: "FROM MANUSCRIPT TO MARKET", desc: "We navigate the complex publishing landscape so you don't have to. From ISBN registration to global distribution, we handle it all.", features: ["Self-Publishing Guidance", "Print & eBook Distribution", "Audiobook Production", "ISBN & Copyright Registration", "Royalty Management Setup"], image: "/images/Services/Publishing.jpg" },
    { id: "marketing", label: "Marketing", icon: BarChart, title: "AMPLIFY YOUR REACH", desc: "A great book deserves a massive audience. Our data-driven marketing strategies ensure your book reaches the right readers and climbs the charts.", features: ["Amazon Listing Optimization (SEO)", "Author Website Design", "Social Media Campaigns", "Book Launch Strategy", "Press Releases & PR"], image: "/images/Services/Marketing.jpg" },
];

const genres = [
    { icon: Sword, title: "Mystery & Thriller", desc: "Suspense that keeps readers on the edge." },
    { icon: Heart, title: "Romance", desc: "Heartfelt stories of love and connection." },
    { icon: Rocket, title: "Science Fiction", desc: "Imaginative futures and beyond." },
    { icon: Briefcase, title: "Business & Finance", desc: "Strategies for the modern leader." },
    { icon: Baby, title: "Children's Books", desc: "Magical tales for young minds." },
    { icon: GraduationCap, title: "Academic & Educational", desc: "Knowledge shaped for impact." },
];

const journeySteps = [
    { step: "01", title: "Consultation", desc: "We discuss your vision, genre, and goals to map out the perfect strategy." },
    { step: "02", title: "Creation", desc: "Our writers and editors craft your manuscript while keeping your voice intact." },
    { step: "03", title: "Design", desc: "World-class cover design and interior formatting that captivates readers." },
    { step: "04", title: "Launch", desc: "Global distribution and targeted marketing to make your book a bestseller." },
];

const faqs = [
    { q: "How long does the ghostwriting process take?", a: "Timelines depend on project scope. A short book (20k-40k words) typically takes 6-10 weeks. A full-length novel can take 3-6 months. We provide a detailed schedule after your consultation." },
    { q: "Do I retain full rights to my book?", a: "Absolutely. You retain 100% intellectual property rights. We sign a comprehensive NDA before starting and transfer all rights upon completion. We claim zero royalties." },
    { q: "What genres do you specialize in?", a: "We cover them all—from Mystery, Romance, and Sci-Fi to Business, Memoirs, and Children's books. We match you with specialists in your genre." },
    { q: "Can you help if I only have an idea?", a: "Yes! Our manuscript development service starts from scratch. You share your idea, we handle the writing while keeping your vision intact every step of the way." },
    { q: "Where will my book be distributed?", a: "Globally across Amazon KDP, Barnes & Noble, IngramSpark, Kobo, Apple Books, and 30+ more platforms in Print, eBook, and Audiobook formats." },
];

const packages = [
    { title: "Starter", price: "$499", desc: "Perfect for first-time authors needing foundational publishing services.", features: ["Custom Cover Design", "Interior Formatting", "eBook Conversion", "Amazon Upload"], highlight: false },
    { title: "Professional", price: "$1,499", desc: "Our most popular package for authors who want a polished, market-ready book.", features: ["Everything in Starter", "Developmental Editing", "Proofreading", "ISBN Registration", "Author Website"], highlight: true },
    { title: "Elite", price: "Custom", desc: "End-to-end ghostwriting, publishing, and aggressive marketing for bestsellers.", features: ["Everything in Professional", "Full Ghostwriting", "Book Marketing Campaign", "Audiobook Narration", "PR & Launch Strategy"], highlight: false },
];

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

export default function ServicesPage() {
    const [activeService, setActiveService] = useState("writing");
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [quoteModal, setQuoteModal] = useState(false);

    const gridRef = useRef<HTMLDivElement>(null);
    const gridInView = useInView(gridRef, { once: true, margin: "-100px" });
    const currentService = detailedServices.find(s => s.id === activeService) || detailedServices[0];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .sp-main { width: 100%; overflow: hidden; font-family: 'Raleway', Arial, sans-serif; }

                /* ── Shared helpers ── */
                .sp-eyebrow { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px; }
                .sp-eyebrow-left { justify-content: flex-start; }
                .sp-eyebrow-line { display: block; width: 32px; height: 2px; background: #e8391d; flex-shrink: 0; }
                .sp-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }

                /* ══ S1 HERO ══ */
                .sp-hero { position: relative; width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center; background: #05070f; overflow: hidden; }
                .sp-hero-inner { position: relative; z-index: 10; text-align: center; padding: 0 24px; max-width: 1000px; margin: 0 auto; }
                .sp-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.95; margin-bottom: 32px; font-size: clamp(2.5rem, 6vw, 4rem); }
                .sp-hero-h1 .accent { color: #e8391d; }
                .sp-hero-sub { color: rgba(255,255,255,0.6); line-height: 1.85; max-width: 680px; margin: 0 auto; font-size: clamp(0.9rem, 1.1vw, 1.05rem); }

                /* ── Hero Buttons ── */
                .sp-hero-buttons {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-top: 44px;
                }
                .sp-hero-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-family: 'Raleway', Arial, sans-serif;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    padding: 0 28px;
                    height: 52px;
                    border-radius: 14px;
                    text-decoration: none;
                    cursor: pointer;
                    border: none;
                    outline: none;
                    overflow: hidden;
                    transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.3s ease;
                    white-space: nowrap;
                    background: none;
                }
                .sp-hero-btn:active { transform: scale(0.96) !important; }
                .sp-hero-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 60%;
                    height: 100%;
                    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
                    transform: skewX(-20deg);
                    transition: left 0.55s ease;
                    pointer-events: none;
                    z-index: 1;
                }
                .sp-hero-btn:hover::before { left: 160%; }
                .sp-hero-btn svg { position: relative; z-index: 2; flex-shrink: 0; }

                /* BTN 1 — Request A Quote */
                .sp-hero-btn--quote {
                    background: #e8391d;
                    color: white;
                }
                .sp-hero-btn--quote:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 32px rgba(232,57,29,0.5), 0 0 0 3px rgba(232,57,29,0.2);
                }

                /* BTN 2 — Live Chat */
                .sp-hero-btn--chat {
                    background: rgba(255,255,255,0.06);
                    color: white;
                    box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.25);
                }
                .sp-hero-btn--chat:hover {
                    background: rgba(255,255,255,0.12);
                    transform: translateY(-3px);
                    box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.55), 0 10px 28px rgba(0,0,0,0.35);
                }

                /* BTN 3 — Call Now */
                .sp-hero-btn--call {
                    background: transparent;
                    color: #e8391d;
                    box-shadow: inset 0 0 0 1.5px rgba(232,57,29,0.55);
                }
                .sp-hero-btn--call:hover {
                    background: rgba(232,57,29,0.08);
                    transform: translateY(-3px);
                    box-shadow: inset 0 0 0 1.5px #e8391d, 0 10px 28px rgba(232,57,29,0.25);
                }

                /* Green pulse dot on Live Chat */
                .sp-hero-btn__dot {
                    position: relative;
                    z-index: 2;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #22c55e;
                    flex-shrink: 0;
                    box-shadow: 0 0 6px rgba(34,197,94,0.9);
                }
                .sp-hero-btn__dot::after {
                    content: '';
                    position: absolute;
                    inset: -3px;
                    border-radius: 50%;
                    background: rgba(34,197,94,0.3);
                    animation: sp-pulse 2s ease infinite;
                }
                @keyframes sp-pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.7); opacity: 0; }
                }

                /* ══ S2 CORE GRID ══ */
                .sp-core { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .sp-core-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .sp-core-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .sp-core-h2 .accent { color: #e8391d; }
                .sp-core-header { text-align: center; margin-bottom: 80px; overflow: hidden; }
                .sp-core-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
                .sp-core-card { position: relative; background: white; border-radius: 24px; padding: 32px; border: 1px solid #f3f4f6; box-shadow: 0 2px 8px rgba(0,0,0,0.04); overflow: hidden; cursor: default; transition: box-shadow 0.5s ease; }
                .sp-core-card:hover { box-shadow: 0 20px 48px rgba(0,0,0,0.1); }
                .sp-core-card-bar { position: absolute; top: 0; left: 0; width: 100%; height: 4px; transform-origin: left; transform: scaleX(0); transition: transform 0.5s ease; }
                .sp-core-card:hover .sp-core-card-bar { transform: scaleX(1); }
                .sp-core-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; transition: transform 0.3s ease; }
                .sp-core-card:hover .sp-core-icon svg { transform: scale(1.1); }
                .sp-core-title { font-weight: 900; color: black; text-transform: uppercase; font-size: 17px; margin-bottom: 12px; letter-spacing: 0.04em; }
                .sp-core-desc { color: #6b7280; font-size: 14px; line-height: 1.65; }

                /* ══ S3 SHOWCASE ══ */
                .sp-showcase { position: relative; width: 100%; background: #05070f; padding: 128px 0; overflow: hidden; }
                .sp-showcase-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 10; }
                .sp-showcase-layout { display: grid; grid-template-columns: 280px 1fr; gap: 64px; align-items: start; }
                .sp-showcase-nav { display: flex; flex-direction: column; gap: 12px; position: sticky; top: 128px; }
                .sp-showcase-btn { width: 100%; display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-radius: 12px; text-align: left; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; border: 1px solid; transition: all 0.3s ease; background: none; font-family: 'Raleway', Arial, sans-serif; }
                .sp-showcase-btn.active { background: #e8391d; border-color: #e8391d; color: white; box-shadow: 0 8px 24px rgba(232,57,29,0.3); }
                .sp-showcase-btn.inactive { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); }
                .sp-showcase-btn.inactive:hover { background: rgba(255,255,255,0.1); color: white; }
                .sp-showcase-content { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
                .sp-showcase-img { position: relative; border-radius: 24px; overflow: hidden; aspect-ratio: 3/4; box-shadow: 0 32px 80px rgba(0,0,0,0.5); }
                .sp-showcase-img-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 32px; background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent); }
                .sp-showcase-title { font-weight: 900; color: white; font-size: 22px; text-transform: uppercase; line-height: 1.2; }
                .sp-showcase-desc { color: rgba(255,255,255,0.7); line-height: 1.85; margin-bottom: 32px; font-size: 15px; }
                .sp-showcase-features { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
                .sp-showcase-feat { display: flex; align-items: center; gap: 12px; }
                .sp-showcase-feat span { color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 500; }
                .sp-showcase-cta { display: inline-flex; align-items: center; gap: 12px; background: #e8391d; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: gap 0.2s ease, box-shadow 0.2s ease; }
                .sp-showcase-cta:hover { gap: 16px; box-shadow: 0 10px 30px rgba(232,57,29,0.4); }

                /* ══ S4 GENRES ══ */
                .sp-genres { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .sp-genres-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .sp-genres-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .sp-genres-h2 .accent { color: #e8391d; }
                .sp-genres-header { text-align: center; margin-bottom: 64px; overflow: hidden; }
                .sp-genres-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; }
                .sp-genre-card { background: white; border-radius: 16px; padding: 24px; border: 1px solid #f3f4f6; text-align: center; cursor: default; transition: border-color 0.5s ease, box-shadow 0.5s ease; }
                .sp-genre-card:hover { border-color: rgba(232,57,29,0.5); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
                .sp-genre-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; transition: background 0.3s ease; }
                .sp-genre-card:hover .sp-genre-icon { background: #e8391d; }
                .sp-genre-card:hover .sp-genre-icon svg { color: white !important; }
                .sp-genre-title { font-weight: 900; color: black; text-transform: uppercase; font-size: 12px; letter-spacing: 0.06em; margin-bottom: 4px; }
                .sp-genre-desc { color: #9ca3af; font-size: 11px; line-height: 1.5; }

                /* ══ S5 JOURNEY ══ */
                .sp-journey { position: relative; width: 100%; background: #111; padding: 128px 0; overflow: hidden; }
                .sp-journey-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 10; }
                .sp-journey-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .sp-journey-h2 .accent { color: #e8391d; }
                .sp-journey-header { text-align: center; margin-bottom: 80px; overflow: hidden; }
                .sp-journey-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; position: relative; }
                .sp-journey-line { display: none; position: absolute; top: 32px; left: 12%; right: 12%; height: 2px; background: rgba(255,255,255,0.1); z-index: 0; }
                .sp-journey-card { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .sp-journey-circle { width: 64px; height: 64px; border-radius: 50%; background: #e8391d; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(232,57,29,0.3); }
                .sp-journey-num { font-weight: 900; color: white; font-size: 20px; }
                .sp-journey-title { font-weight: 900; color: white; text-transform: uppercase; font-size: 17px; margin-bottom: 12px; letter-spacing: 0.05em; }
                .sp-journey-desc { color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.65; max-width: 220px; }

                /* ══ S6 WHY CHOOSE ══ */
                .sp-why { position: relative; width: 100%; background: #05070f; padding: 128px 0; overflow: hidden; }
                .sp-why-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
                .sp-why-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 40px; font-size: clamp(2rem, 3.5vw, 3rem); }
                .sp-why-h2 .accent { color: #e8391d; }
                .sp-why-list { display: flex; flex-direction: column; gap: 20px; }
                .sp-why-item { display: flex; align-items: flex-start; gap: 16px; }
                .sp-why-icon { margin-top: 4px; width: 24px; height: 24px; border-radius: 50%; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .sp-why-item:hover .sp-why-icon { background: #e8391d; }
                .sp-why-item:hover .sp-why-icon svg { color: white !important; }
                .sp-why-text { color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.65; }
                .sp-why-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.4); aspect-ratio: 1/1; }

                /* ══ S7 PACKAGES ══ */
                .sp-packages { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .sp-packages-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .sp-packages-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .sp-packages-h2 .accent { color: #e8391d; }
                .sp-packages-header { text-align: center; margin-bottom: 80px; overflow: hidden; }
                .sp-packages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; align-items: center; }
                .sp-pkg-card { position: relative; border-radius: 24px; padding: 40px; transition: all 0.5s ease; }
                .sp-pkg-card.normal { background: white; color: black; border: 1px solid #e5e7eb; }
                .sp-pkg-card.normal:hover { border-color: rgba(232,57,29,0.3); box-shadow: 0 20px 48px rgba(0,0,0,0.08); }
                .sp-pkg-card.featured { background: #05070f; color: white; border: 2px solid #e8391d; transform: scale(1.05); box-shadow: 0 32px 80px rgba(0,0,0,0.3); z-index: 10; }
                .sp-pkg-badge { position: absolute; top: -16px; left: 50%; transform: translateX(-50%); background: #e8391d; color: white; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 16px; border-radius: 999px; white-space: nowrap; }
                .sp-pkg-title { font-weight: 900; text-transform: uppercase; letter-spacing: 0.06em; font-size: 20px; margin-bottom: 8px; }
                .sp-pkg-desc { font-size: 13px; margin-bottom: 24px; }
                .sp-pkg-price { font-weight: 900; font-size: 48px; line-height: 1; margin-bottom: 32px; }
                .sp-pkg-price span { font-size: 13px; font-weight: 400; opacity: 0.5; }
                .sp-pkg-features { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
                .sp-pkg-feat { display: flex; align-items: center; gap: 12px; font-size: 13px; }
                .sp-pkg-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 16px; border-radius: 12px; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; cursor: pointer; border: 2px solid; transition: all 0.3s ease; font-family: 'Raleway', Arial, sans-serif; }
                .sp-pkg-btn.normal { background: transparent; border-color: black; color: black; }
                .sp-pkg-btn.normal:hover { background: #e8391d; border-color: #e8391d; color: white; }
                .sp-pkg-btn.featured { background: #e8391d; border-color: #e8391d; color: white; }
                .sp-pkg-btn.featured:hover { background: white; color: #e8391d; }

                /* ══ S8 FAQS ══ */
                .sp-faqs { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .sp-faqs-inner { max-width: 900px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 10; }
                .sp-faqs-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2rem, 4vw, 3rem); }
                .sp-faqs-h2 .accent { color: #e8391d; }
                .sp-faq-item:hover { border-color: rgba(232,57,29,0.3); }
                .sp-faqs-header { text-align: center; margin-bottom: 64px; }
                .sp-faq-item { background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: border-color 0.3s ease; }
                .sp-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 24px; text-align: left; background: none; border: none; cursor: pointer; font-family: 'Raleway', Arial, sans-serif; }
                .sp-faq-q { font-weight: 700; color: black; font-size: 15px; padding-right: 16px; line-height: 1.4; }
                .sp-faq-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
                .sp-faq-icon.open { background: #e8391d; color: white; }
                .sp-faq-icon.closed { background: #f3f4f6; color: rgba(0,0,0,0.5); }
                .sp-faq-answer { padding: 0 24px 24px; color: #6b7280; font-size: 14px; line-height: 1.75; }
                .sp-faqs-list { display: flex; flex-direction: column; gap: 16px; }

                /* ══ S9 CTA ══ */
                .sp-cta { position: relative; width: 100%; background: #e8391d; padding: 112px 0; overflow: hidden; }
                .sp-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 0 32px; position: relative; z-index: 10; }
                .sp-cta-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; font-size: clamp(2.5rem, 5vw, 4rem); }
                .sp-cta-sub { color: rgba(255,255,255,0.8); font-size: 18px; max-width: 560px; margin: 0 auto 40px; line-height: 1.65; }
                .sp-cta-btn { display: inline-flex; align-items: center; gap: 12px; background: black; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .sp-cta-btn:hover { background: white; color: #e8391d; gap: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }

                /* ══════════════════════════════════════
                   2560px — 4K
                ══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .sp-hero-inner { max-width: 1800px; }
                    .sp-hero-h1 { font-size: clamp(4.5rem, 5.5vw, 8rem); margin-bottom: 52px; }
                    .sp-hero-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 1100px; }
                    .sp-hero-buttons { gap: 24px; margin-top: 64px; }
                    .sp-hero-btn { height: 68px; padding: 0 40px; font-size: 15px; border-radius: 18px; gap: 14px; }
                    .sp-core-inner, .sp-genres-inner, .sp-packages-inner { max-width: 2200px; padding: 0 160px; }
                    .sp-showcase-inner, .sp-journey-inner, .sp-why-inner, .sp-faqs-inner { max-width: 2200px; padding: 0 160px; }
                    .sp-core, .sp-showcase, .sp-genres, .sp-journey, .sp-why, .sp-packages, .sp-faqs, .sp-cta { padding: 200px 0; }
                    .sp-core-h2, .sp-genres-h2, .sp-journey-h2, .sp-packages-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .sp-core-header, .sp-genres-header, .sp-journey-header, .sp-packages-header { margin-bottom: 120px; }
                    .sp-core-grid { gap: 40px; }
                    .sp-core-card { padding: 52px; border-radius: 36px; }
                    .sp-core-icon { width: 72px; height: 72px; border-radius: 22px; margin-bottom: 36px; }
                    .sp-core-title { font-size: 22px; margin-bottom: 16px; }
                    .sp-core-desc { font-size: 18px; }
                    .sp-showcase-layout { grid-template-columns: 360px 1fr; gap: 100px; }
                    .sp-showcase-nav { gap: 18px; }
                    .sp-showcase-btn { padding: 22px 28px; font-size: 16px; border-radius: 18px; }
                    .sp-showcase-content { gap: 60px; }
                    .sp-showcase-title { font-size: 30px; }
                    .sp-showcase-desc { font-size: 19px; margin-bottom: 48px; }
                    .sp-showcase-feat span { font-size: 18px; }
                    .sp-showcase-features { gap: 22px; margin-bottom: 56px; }
                    .sp-showcase-cta { font-size: 16px; padding: 22px 52px; border-radius: 18px; }
                    .sp-genres-grid { gap: 32px; }
                    .sp-genre-card { padding: 36px; border-radius: 24px; }
                    .sp-genre-icon { width: 68px; height: 68px; margin-bottom: 24px; }
                    .sp-genre-title { font-size: 15px; }
                    .sp-genre-desc { font-size: 14px; }
                    .sp-journey-grid { gap: 48px; }
                    .sp-journey-circle { width: 88px; height: 88px; margin-bottom: 32px; }
                    .sp-journey-num { font-size: 28px; }
                    .sp-journey-title { font-size: 22px; margin-bottom: 16px; }
                    .sp-journey-desc { font-size: 18px; max-width: 320px; }
                    .sp-why-inner { gap: 120px; }
                    .sp-why-h2 { font-size: clamp(3rem, 3.5vw, 5rem); margin-bottom: 60px; }
                    .sp-why-list { gap: 28px; }
                    .sp-why-text { font-size: 19px; }
                    .sp-why-icon { width: 32px; height: 32px; }
                    .sp-packages-grid { gap: 52px; }
                    .sp-pkg-card { padding: 60px; border-radius: 36px; }
                    .sp-pkg-title { font-size: 26px; }
                    .sp-pkg-desc { font-size: 17px; }
                    .sp-pkg-price { font-size: 68px; }
                    .sp-pkg-feat { font-size: 17px; gap: 16px; }
                    .sp-pkg-features { gap: 22px; }
                    .sp-pkg-btn { font-size: 15px; padding: 20px; border-radius: 16px; }
                    .sp-faqs-inner { max-width: 1600px; padding: 0 160px; }
                    .sp-faq-q { font-size: 19px; }
                    .sp-faq-answer { font-size: 17px; padding: 0 32px 32px; }
                    .sp-faq-trigger { padding: 32px; }
                    .sp-faq-icon { width: 44px; height: 44px; }
                    .sp-faqs-list { gap: 24px; }
                    .sp-cta-inner { max-width: 1400px; }
                    .sp-cta-h2 { font-size: clamp(3.5rem, 5vw, 7rem); }
                    .sp-cta-sub { font-size: 24px; max-width: 800px; }
                    .sp-cta-btn { font-size: 18px; padding: 26px 60px; border-radius: 18px; }
                }

                /* ══════════════════════════════════════
                   1920px — Full HD
                ══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .sp-hero-inner { max-width: 1400px; }
                    .sp-hero-h1 { font-size: clamp(3.5rem, 5vw, 6.5rem); }
                    .sp-hero-sub { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 900px; }
                    .sp-hero-buttons { gap: 20px; margin-top: 56px; }
                    .sp-hero-btn { height: 60px; padding: 0 36px; font-size: 14px; }
                    .sp-core-inner, .sp-genres-inner, .sp-packages-inner { max-width: 1700px; padding: 0 130px; }
                    .sp-showcase-inner, .sp-journey-inner, .sp-why-inner { max-width: 1700px; padding: 0 130px; }
                    .sp-faqs-inner { max-width: 1200px; padding: 0 64px; }
                    .sp-core, .sp-showcase, .sp-genres, .sp-journey, .sp-why, .sp-packages, .sp-faqs, .sp-cta { padding: 160px 0; }
                    .sp-core-h2, .sp-genres-h2, .sp-journey-h2, .sp-packages-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .sp-core-grid { gap: 32px; }
                    .sp-core-card { padding: 44px; }
                    .sp-core-icon { width: 64px; height: 64px; }
                    .sp-core-title { font-size: 20px; }
                    .sp-core-desc { font-size: 16px; }
                    .sp-showcase-layout { grid-template-columns: 320px 1fr; gap: 80px; }
                    .sp-showcase-btn { font-size: 14px; padding: 18px 24px; }
                    .sp-showcase-title { font-size: 26px; }
                    .sp-showcase-desc { font-size: 17px; }
                    .sp-showcase-feat span { font-size: 16px; }
                    .sp-showcase-cta { font-size: 14px; padding: 20px 44px; }
                    .sp-genres-grid { gap: 28px; }
                    .sp-genre-card { padding: 28px; }
                    .sp-genre-title { font-size: 13px; }
                    .sp-genre-desc { font-size: 12px; }
                    .sp-journey-grid { gap: 40px; }
                    .sp-journey-circle { width: 72px; height: 72px; }
                    .sp-journey-title { font-size: 20px; }
                    .sp-journey-desc { font-size: 16px; max-width: 280px; }
                    .sp-why-h2 { font-size: clamp(2.5rem, 3.2vw, 4.2rem); }
                    .sp-why-text { font-size: 17px; }
                    .sp-why-inner { gap: 100px; }
                    .sp-packages-grid { gap: 40px; }
                    .sp-pkg-card { padding: 52px; }
                    .sp-pkg-title { font-size: 23px; }
                    .sp-pkg-price { font-size: 58px; }
                    .sp-pkg-feat { font-size: 15px; }
                    .sp-faq-q { font-size: 17px; }
                    .sp-faq-answer { font-size: 15px; }
                    .sp-cta-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .sp-cta-sub { font-size: 21px; }
                    .sp-cta-btn { font-size: 16px; padding: 22px 52px; }
                }

                /* ══════════════════════════════════════
                   1440px — Large Laptop
                ══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .sp-core-inner, .sp-genres-inner, .sp-packages-inner { max-width: 1360px; padding: 0 96px; }
                    .sp-showcase-inner, .sp-journey-inner, .sp-why-inner { max-width: 1360px; padding: 0 96px; }
                    .sp-core, .sp-showcase, .sp-genres, .sp-journey, .sp-why, .sp-packages, .sp-faqs, .sp-cta { padding: 140px 0; }
                    .sp-core-h2, .sp-genres-h2, .sp-journey-h2, .sp-packages-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .sp-showcase-layout { gap: 72px; }
                    .sp-why-h2 { font-size: clamp(2.2rem, 3.2vw, 3.6rem); }
                }

                /* ══════════════════════════════════════
                   1280px — Standard Laptop
                ══════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .sp-core-inner, .sp-genres-inner, .sp-packages-inner { max-width: 1160px; padding: 0 64px; }
                    .sp-showcase-inner, .sp-journey-inner, .sp-why-inner { max-width: 1160px; padding: 0 64px; }
                }

                /* ══════════════════════════════════════
                   1024px — Small Laptop
                ══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .sp-core-inner, .sp-genres-inner, .sp-packages-inner { padding: 0 48px; }
                    .sp-showcase-inner, .sp-journey-inner, .sp-why-inner { padding: 0 48px; }
                    .sp-faqs-inner { padding: 0 48px; }
                    .sp-core, .sp-showcase, .sp-genres, .sp-journey, .sp-why, .sp-packages, .sp-faqs, .sp-cta { padding: 96px 0; }
                    .sp-core-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
                    .sp-core-h2 { font-size: clamp(2rem, 4vw, 3.2rem); }
                    .sp-showcase-layout { grid-template-columns: 220px 1fr; gap: 40px; }
                    .sp-showcase-btn { font-size: 11px; padding: 13px 16px; }
                    .sp-showcase-content { grid-template-columns: 1fr; gap: 32px; }
                    .sp-showcase-img { aspect-ratio: 16/9; max-height: 360px; }
                    .sp-genres-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
                    .sp-genres-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .sp-journey-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
                    .sp-journey-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .sp-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .sp-why-h2 { font-size: clamp(1.8rem, 3.2vw, 2.6rem); }
                    .sp-why-img-wrap { display: none; }
                    .sp-packages-grid { gap: 20px; }
                    .sp-pkg-card { padding: 28px; }
                    .sp-pkg-card.featured { transform: scale(1.02); }
                    .sp-pkg-price { font-size: 36px; }
                    .sp-packages-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .sp-cta-h2 { font-size: clamp(2rem, 4.5vw, 3.2rem); }
                    .sp-cta-sub { font-size: 15px; }
                    .sp-cta-btn { font-size: 12px; padding: 16px 32px; }
                }

                /* ══════════════════════════════════════
                   900px — Tablet
                ══════════════════════════════════════ */
                @media (max-width: 900px) {
                    .sp-core-inner, .sp-genres-inner, .sp-packages-inner { padding: 0 40px; }
                    .sp-showcase-inner, .sp-journey-inner, .sp-why-inner { padding: 0 40px; }
                    .sp-faqs-inner { padding: 0 40px; }
                    .sp-core, .sp-showcase, .sp-genres, .sp-journey, .sp-why, .sp-packages, .sp-faqs, .sp-cta { padding: 80px 0; }
                    .sp-hero-h1 { font-size: clamp(2.2rem, 6vw, 3.6rem); }
                    .sp-hero-sub { font-size: 0.95rem; }
                    .sp-hero-buttons { gap: 12px; margin-top: 36px; }
                    .sp-core-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
                    .sp-core-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .sp-core-header { margin-bottom: 48px; }
                    .sp-showcase-layout { grid-template-columns: 1fr; gap: 32px; }
                    .sp-showcase-nav { flex-direction: row; flex-wrap: wrap; position: static; }
                    .sp-showcase-btn { width: auto; flex: 1; min-width: 100px; }
                    .sp-showcase-content { grid-template-columns: 1fr; }
                    .sp-showcase-img { aspect-ratio: 16/9; max-height: 380px; }
                    .sp-genres-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
                    .sp-genres-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .sp-journey-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
                    .sp-journey-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .sp-journey-line { display: none; }
                    .sp-why-inner { grid-template-columns: 1fr; }
                    .sp-why-img-wrap { display: none; }
                    .sp-why-h2 { font-size: clamp(1.8rem, 5vw, 2.6rem); }
                    .sp-packages-grid { grid-template-columns: 1fr; gap: 24px; max-width: 480px; margin: 0 auto; }
                    .sp-pkg-card.featured { transform: scale(1); }
                    .sp-packages-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .sp-cta-h2 { font-size: clamp(1.8rem, 5.5vw, 2.8rem); }
                    .sp-cta-sub { font-size: 15px; }
                }

                /* ══════════════════════════════════════
                   768px — Tablet Portrait
                ══════════════════════════════════════ */
                @media (max-width: 768px) {
                    .sp-core-inner, .sp-genres-inner, .sp-packages-inner { padding: 0 32px; }
                    .sp-showcase-inner, .sp-journey-inner, .sp-why-inner { padding: 0 32px; }
                    .sp-faqs-inner { padding: 0 32px; }
                    .sp-hero-h1 { font-size: clamp(1.9rem, 7vw, 3rem); }
                    .sp-core-card { padding: 24px; border-radius: 18px; }
                    .sp-genre-card { padding: 16px; }
                    .sp-genres-grid { gap: 12px; }
                    .sp-pkg-card { padding: 28px; border-radius: 18px; }
                    .sp-cta-h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); }
                    .sp-hero-btn { height: 46px; padding: 0 20px; font-size: 11px; }
                }

                /* ══════════════════════════════════════
                   640px — Large Mobile
                ══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .sp-core-inner, .sp-genres-inner, .sp-packages-inner { padding: 0 20px; }
                    .sp-showcase-inner, .sp-journey-inner, .sp-why-inner { padding: 0 20px; }
                    .sp-faqs-inner { padding: 0 20px; }
                    .sp-cta-inner { padding: 0 20px; }
                    .sp-core, .sp-showcase, .sp-genres, .sp-journey, .sp-why, .sp-packages, .sp-faqs, .sp-cta { padding: 56px 0; }
                    .sp-hero-h1 { font-size: clamp(1.7rem, 8vw, 2.6rem); margin-bottom: 20px; }
                    .sp-hero-sub { font-size: 0.875rem; }
                    .sp-hero-buttons { flex-direction: column; align-items: stretch; gap: 10px; margin-top: 32px; }
                    .sp-hero-btn { height: 48px; justify-content: center; width: 100%; border-radius: 12px; font-size: 11px; }
                    .sp-core-grid { grid-template-columns: 1fr; gap: 14px; }
                    .sp-core-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .sp-core-header { margin-bottom: 36px; }
                    .sp-core-card { padding: 20px; border-radius: 16px; }
                    .sp-core-icon { width: 44px; height: 44px; margin-bottom: 16px; }
                    .sp-core-title { font-size: 15px; }
                    .sp-core-desc { font-size: 13px; }
                    .sp-showcase-nav { flex-direction: column; }
                    .sp-showcase-btn { width: 100%; }
                    .sp-genres-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
                    .sp-genres-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .sp-genres-header { margin-bottom: 36px; }
                    .sp-genre-card { padding: 16px; border-radius: 12px; }
                    .sp-genre-icon { width: 40px; height: 40px; margin-bottom: 12px; }
                    .sp-genre-title { font-size: 11px; }
                    .sp-genre-desc { font-size: 10.5px; }
                    .sp-journey-grid { grid-template-columns: 1fr; gap: 24px; }
                    .sp-journey-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .sp-journey-header { margin-bottom: 36px; }
                    .sp-journey-circle { width: 52px; height: 52px; margin-bottom: 16px; }
                    .sp-journey-num { font-size: 16px; }
                    .sp-journey-title { font-size: 15px; }
                    .sp-journey-desc { font-size: 13px; }
                    .sp-why-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .sp-why-text { font-size: 13.5px; }
                    .sp-why-list { gap: 14px; }
                    .sp-packages-grid { max-width: 100%; }
                    .sp-packages-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .sp-pkg-card { padding: 24px; border-radius: 16px; }
                    .sp-pkg-title { font-size: 17px; }
                    .sp-pkg-price { font-size: 40px; }
                    .sp-pkg-feat { font-size: 12px; }
                    .sp-pkg-btn { font-size: 11px; padding: 14px; }
                    .sp-faqs-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .sp-faqs-header { margin-bottom: 36px; }
                    .sp-faq-q { font-size: 13.5px; }
                    .sp-faq-answer { font-size: 13px; }
                    .sp-faq-trigger { padding: 18px; }
                    .sp-cta-h2 { font-size: clamp(1.5rem, 7.5vw, 2.2rem); }
                    .sp-cta-sub { font-size: 14px; }
                    .sp-cta-btn { font-size: 11px; padding: 14px 24px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ══════════════════════════════════════
                   480px — Standard Mobile
                ══════════════════════════════════════ */
                @media (max-width: 480px) {
                    .sp-hero-h1 { font-size: clamp(1.5rem, 8.5vw, 2.2rem); }
                    .sp-core-h2, .sp-genres-h2, .sp-journey-h2, .sp-packages-h2, .sp-faqs-h2, .sp-cta-h2, .sp-why-h2 { font-size: clamp(1.35rem, 7.5vw, 1.9rem); }
                }

                /* ══════════════════════════════════════
                   380px — Small Mobile
                ══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .sp-core-inner, .sp-genres-inner, .sp-packages-inner { padding: 0 14px; }
                    .sp-showcase-inner, .sp-journey-inner, .sp-why-inner, .sp-faqs-inner, .sp-cta-inner { padding: 0 14px; }
                    .sp-hero-h1 { font-size: 1.4rem; }
                    .sp-core-h2, .sp-genres-h2, .sp-journey-h2, .sp-packages-h2, .sp-faqs-h2, .sp-cta-h2, .sp-why-h2 { font-size: 1.25rem; }
                    .sp-genres-grid { grid-template-columns: 1fr 1fr; }
                    .sp-pkg-price { font-size: 34px; }
                }

                /* ══════════════════════════════════════
                   320px — Very Small
                ══════════════════════════════════════ */
                @media (max-width: 320px) {
                    .sp-core-inner, .sp-genres-inner, .sp-packages-inner { padding: 0 12px; }
                    .sp-showcase-inner, .sp-journey-inner, .sp-why-inner, .sp-faqs-inner, .sp-cta-inner { padding: 0 12px; }
                    .sp-hero-h1 { font-size: 1.25rem; }
                    .sp-core-h2, .sp-genres-h2, .sp-journey-h2, .sp-packages-h2, .sp-faqs-h2, .sp-cta-h2, .sp-why-h2 { font-size: 1.1rem; }
                    .sp-cta-btn { font-size: 10px; padding: 12px 18px; }
                }
            `}</style>

            <main className="sp-main">

                {/* S1 HERO */}
                <section className="sp-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <div className="absolute pointer-events-none" style={{ top: "33%", right: "25%", width: 600, height: 600, background: "rgba(232,57,29,0.1)", borderRadius: "50%", filter: "blur(150px)" }} />
                    <div className="sp-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="sp-eyebrow">
                            <span className="sp-eyebrow-line" /><span className="sp-eyebrow-text">What We Do</span><span className="sp-eyebrow-line" />
                        </motion.div>
                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="sp-hero-h1">
                            PROFESSIONAL EBOOK WRITING AND <br /><span className="accent">PUBLISHING SERVICES YOU CAN TRUST.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="sp-hero-sub">
                            Whether you're an aspiring author, entrepreneur, or expert with a story to tell, working with Bexley Publishing ensures your ideas are transformed into a compelling, polished book.
                        </motion.p>

                        {/* ── Hero Buttons ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.85, ease: smoothEase }}
                            className="sp-hero-buttons"
                        >
                            {/* Button 1 — Request A Quote */}
                            <button
                                type="button"
                                className="sp-hero-btn sp-hero-btn--quote"
                                onClick={() => setQuoteModal(true)}
                            >
                                <FileText size={16} />
                                Request A Quote
                            </button>

                            {/* Button 2 — Live Chat */}
                            <button
                                type="button"
                                className="sp-hero-btn sp-hero-btn--chat"
                                onClick={openLiveChat}
                            >
                                <span className="sp-hero-btn__dot" aria-hidden="true" />
                                <MessageCircle size={16} />
                                Live Chat
                            </button>

                            {/* Button 3 — Call Now */}
                            <a href="tel:2797770380" className="sp-hero-btn sp-hero-btn--call">
                                <Phone size={16} />
                                Call Now
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* S2 CORE SERVICES */}
                <section ref={gridRef} className="sp-core">
                    <motion.div initial={{ width: "0%" }} animate={gridInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />
                    <div className="sp-core-inner">
                        <div className="sp-core-header">
                            <motion.h2 variants={maskReveal} initial="hidden" animate={gridInView ? "visible" : "hidden"} className="sp-core-h2">
                                From Manuscript to Marketplace. <span className="accent">Your Complete Publishing Partner.</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" animate={gridInView ? "visible" : "hidden"} className="sp-core-grid">
                            {coreServices.map(({ icon: Icon, title, desc, color }) => (
                                <motion.div key={title} variants={fadeUp} className="sp-core-card">
                                    <div className="sp-core-card-bar" style={{ background: color }} />
                                    <div className="sp-core-icon" style={{ background: `${color}15` }}><Icon size={24} style={{ color }} /></div>
                                    <h3 className="sp-core-title">{title}</h3>
                                    <p className="sp-core-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S3 SHOWCASE */}
                <section className="sp-showcase">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="sp-showcase-inner">
                        <div className="sp-showcase-layout">
                            <div className="sp-showcase-nav">
                                {detailedServices.map(({ id, label, icon: Icon }) => (
                                    <motion.button key={id} onClick={() => setActiveService(id)} whileTap={{ scale: 0.95 }} className={`sp-showcase-btn ${activeService === id ? "active" : "inactive"}`}>
                                        <Icon size={15} /> {label}
                                    </motion.button>
                                ))}
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div key={currentService.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, ease: smoothEase }} className="sp-showcase-content">
                                    <div className="sp-showcase-img">
                                        <Image src={currentService.image} alt={currentService.title} fill className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 900px) 100vw, (max-width: 1200px) 45vw, 520px" />
                                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)" }} />
                                        <div className="sp-showcase-img-caption">
                                            <h3 className="sp-showcase-title">{currentService.title}</h3>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="sp-showcase-desc">{currentService.desc}</p>
                                        <div className="sp-showcase-features">
                                            {currentService.features.map((feat) => (
                                                <div key={feat} className="sp-showcase-feat">
                                                    <CheckCircle2 size={18} style={{ color: "#e8391d", flexShrink: 0 }} />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="sp-hero-btn sp-hero-btn--quote"
                                            onClick={() => setQuoteModal(true)}
                                        >
                                            <PenTool size={16} />
                                            Get Started
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* S4 GENRES */}
                <section className="sp-genres">
                    <div className="sp-genres-inner">
                        <div className="sp-genres-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="sp-eyebrow">
                                <span className="sp-eyebrow-line" /><span className="sp-eyebrow-text">Categories</span><span className="sp-eyebrow-line" />
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sp-genres-h2">
                                GENRES WE <span className="accent">PUBLISH</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sp-genres-grid">
                            {genres.map(({ icon: Icon, title, desc }) => (
                                <motion.div key={title} variants={fadeUp} className="sp-genre-card">
                                    <div className="sp-genre-icon"><Icon size={20} style={{ color: "#e8391d" }} /></div>
                                    <h4 className="sp-genre-title">{title}</h4>
                                    <p className="sp-genre-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S5 JOURNEY */}
                <section className="sp-journey">
                    <div className="sp-journey-inner">
                        <div className="sp-journey-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sp-journey-h2">
                                YOUR JOURNEY TO <span className="accent">BESTSELLER</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sp-journey-grid">
                            <div className="sp-journey-line" style={{ display: "block" }} />
                            {journeySteps.map(({ step, title, desc }) => (
                                <motion.div key={step} variants={fadeUp} className="sp-journey-card">
                                    <div className="sp-journey-circle"><span className="sp-journey-num">{step}</span></div>
                                    <h3 className="sp-journey-title">{title}</h3>
                                    <p className="sp-journey-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S6 WHY CHOOSE */}
                <section className="sp-why">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sp-why-inner">
                        <div>
                            <motion.div variants={fadeUp} className="sp-eyebrow sp-eyebrow-left" style={{ marginBottom: 16 }}>
                                <span className="sp-eyebrow-line" /><span className="sp-eyebrow-text">Why Bexley?</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="sp-why-h2">BUILT FOR AUTHORS. <br /><span className="accent">DRIVEN BY RESULT.</span></motion.h2>
                            <motion.div variants={staggerContainer} className="sp-why-list">
                                {["100% Copyright Ownership — Your book, your rules.", "No Upfront Fees — Flexible milestone-based payments.", "Global Distribution — Amazon, B&N, Ingram, and 40+ platforms.", "Dedicated Project Manager — Personal guidance from Day 1.", "Premium Ghostwriting — Voice-matched, confidential, and NDA protected."].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="sp-why-item">
                                        <div className="sp-why-icon"><CheckCircle2 size={14} style={{ color: "#e8391d" }} /></div>
                                        <p className="sp-why-text">{item}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: smoothEase }} className="sp-why-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/Services-3.png" alt="Author writing" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "rgba(232,57,29,0.2)", mixBlendMode: "multiply" }} />
                            <div className="absolute" style={{ bottom: -20, right: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.25)", zIndex: -1 }} />
                        </motion.div>
                    </motion.div>
                </section>

                {/* S8 FAQs */}
                <section className="sp-faqs">
                    <div className="sp-faqs-inner">
                        <div className="sp-faqs-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sp-faqs-h2">
                                SERVICE <span className="accent">FAQS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sp-faqs-list">
                            {faqs.map(({ q, a }, i) => (
                                <motion.div key={i} variants={fadeUp} className="sp-faq-item">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="sp-faq-trigger">
                                        <span className="sp-faq-q">{q}</span>
                                        <div className={`sp-faq-icon ${openFaq === i ? "open" : "closed"}`}>
                                            {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }} style={{ overflow: "hidden" }}>
                                                <div className="sp-faq-answer">{a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S9 CTA */}
                <section className="sp-cta">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sp-cta-inner">
                        <h2 className="sp-cta-h2">NOT SURE WHICH SERVICE YOU NEED?</h2>
                        <p className="sp-cta-sub">Speak to one of our publishing consultants today. We'll map out the perfect plan for your book.</p>
                        <button
                            type="button"
                            className="sp-cta-btn"
                            onClick={openLiveChat}
                        >
                            <MessageCircle size={16} />
                            Book A Free Consultation
                        </button>
                    </motion.div>
                </section>


                <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />

            </main>
        </>
    );
}