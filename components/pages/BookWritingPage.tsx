"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    PenTool, ArrowRight, CheckCircle2, BookOpen, Sword, Heart, Briefcase,
    Rocket, Baby, GraduationCap, Phone, Minus, Plus, Users, FileText, Sparkles
} from "lucide-react";
import HeroButtons from "../HeroButton";
import QuoteModal from "../Quotemodal";

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
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const genres = [
    { icon: Sword, title: "Mystery & Thriller", desc: "Twists, suspense, tension, and stories that keep readers guessing." },
    { icon: Heart, title: "Romance", desc: "Emotionally rich love stories that keep readers turning pages till the very end." },
    { icon: Rocket, title: "Science Fiction", desc: "Technological and futuristic concepts for readers looking for adventure and social satire." },
    { icon: Briefcase, title: "Business & Finance", desc: "Educating, advising, and informing readers on actionable strategies for the modern business." },
    { icon: Baby, title: "Children's Books", desc: "Well-designed books that spark creativity and emotional intelligence in children." },
    { icon: GraduationCap, title: "Memoir & Biography", desc: "Personal experiences narrating in a way that expresses emotional truth." },
];

const processSteps = [
    { step: "01", title: "RESEARCH & PLANNING", desc: "We conduct in-depth research to understand the manuscript's nature and target audience, and then tailor a roadmap.", icon: Users },
    { step: "02", title: "CHAPTER STRUCTURE", desc: "We create chapters outline and send it back for approval, making the process simple and fast.", icon: FileText },
    { step: "03", title: "Chapter-by-Chapter Writing", desc: "We then start writing chapters, and once completed, each chapter is sent back for a \"go-ahead.\"", icon: PenTool },
    { step: "04", title: "REVIEW & IMPROVEMENT", desc: "We perfect the manuscript through revisions until every detail is complete.", icon: Sparkles },
];

const faqs = [
    { q: "How much time does a writer take to write a book?", a: "Writing a book depends on the length of your manuscript, its genre, tone, and complexity. These factors determine whether your book will take a few weeks or several months to write." },
    { q: "Will the finally written book sound like me?", a: "Yes. Our ghostwriters focus more on this aspect without compromising the very nature of your manuscript. They carefully match your voice, tone, style, and the core message you need to convey to your readers." },
    { q: "Do I own the complete copyright?", a: "Absolutely Yes. Once we complete the manuscript and give it a professional book form, you will have full ownership and rights to it." },
    { q: "What if I don't like the writing?", a: "If it happens, our unlimited revision policy allows us to refine the manuscript. Your dedicated writer and project manager work closely with you to ensure the writing matches your expectations." },
    { q: "Can you write a book from just a conceptual idea?", a: "Yes. Even if you have just a simple idea or a rough outline, it's enough for our professionals to start working on your manuscript." },
];

export default function BookWritingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [quoteModal, setQuoteModal] = useState(false);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .bw-main { width: 100%; overflow: hidden; font-family: 'Raleway', Arial, sans-serif; }

                /* shared */
                .bw-eyebrow { display: flex; align-items: center; gap: 12px; }
                .bw-eyebrow.center { justify-content: center; }
                .bw-eyebrow-line { display: block; width: 32px; height: 2px; background: #e8391d; flex-shrink: 0; }
                .bw-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }

                /* ══ S1 HERO ══ */
                .bw-hero { position: relative; width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center; background: #05070f; overflow: hidden; }
                .bw-hero-inner { position: relative; z-index: 10; text-align: center; padding: 0 24px; max-width: 1000px; margin: 0 auto; }
                .bw-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.95; margin-bottom: 32px; font-size: clamp(2.5rem, 6vw, 4rem); }
                .bw-hero-h1 .accent { color: #e8391d; }
                .bw-hero-sub { color: rgba(255,255,255,0.6); line-height: 1.85; max-width: 680px; margin: 0 auto 40px; font-size: clamp(0.9rem, 1.1vw, 1.05rem); }
                .bw-hero-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
                .bw-btn-primary { display: inline-flex; align-items: center; gap: 12px; background: #e8391d; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease; }
                .bw-btn-primary:hover { background: #c0271a; gap: 16px; box-shadow: 0 10px 40px rgba(232,57,29,0.4); }
                .bw-btn-outline { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
                .bw-btn-outline:hover { border-color: #e8391d; color: #e8391d; }

                /* ══ S2 OVERVIEW ══ */
                .bw-overview { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .bw-overview-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
                .bw-overview-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; margin-bottom: 24px; font-size: clamp(2rem, 3vw, 3rem); }
                .bw-overview-h2 .accent { color: #e8391d; }
                .bw-overview-body { color: #6b7280; line-height: 1.85; margin-bottom: 20px; font-size: 0.95rem; }
                .bw-overview-checklist { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
                .bw-check-item { display: flex; align-items: center; gap: 12px; }
                .bw-check-item span { color: rgba(0,0,0,0.8); font-weight: 600; font-size: 14px; }
                .bw-overview-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.2); aspect-ratio: 4/5; }

                /* ══ S3 GENRES ══ */
                .bw-genres { position: relative; width: 100%; background: #05070f; padding: 128px 0; overflow: hidden; }
                .bw-genres-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 10; }
                .bw-genres-header { text-align: center; margin-bottom: 64px; overflow: hidden; }
                .bw-genres-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .bw-genres-h2 .accent { color: #e8391d; }
                .bw-genres-sub { color: #6b7280; line-height: 1.85; margin-top: 24px; font-size: 0.95rem; }
                .bw-genres-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
                .bw-genre-card { position: relative; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; overflow: hidden; cursor: default; transition: border-color 0.5s ease; }
                .bw-genre-card:hover { border-color: rgba(232,57,29,0.5); }
                .bw-genre-bg { position: absolute; top: 0; right: 0; width: 80px; height: 80px; background: rgba(232,57,29,0.05); border-bottom-left-radius: 100px; transition: all 0.5s ease; }
                .bw-genre-card:hover .bw-genre-bg { width: 100%; height: 100%; border-radius: 0; }
                .bw-genre-icon { position: relative; z-index: 10; width: 48px; height: 48px; border-radius: 12px; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; transition: background 0.3s ease; }
                .bw-genre-card:hover .bw-genre-icon { background: #e8391d; }
                .bw-genre-card:hover .bw-genre-icon svg { color: white !important; }
                .bw-genre-title { position: relative; z-index: 10; font-weight: 900; color: white; text-transform: uppercase; font-size: 17px; margin-bottom: 8px; letter-spacing: 0.04em; }
                .bw-genre-desc { position: relative; z-index: 10; color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.65; }

                /* ══ S4 PROCESS ══ */
                .bw-process { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .bw-process-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .bw-process-header { text-align: center; margin-bottom: 80px; }
                .bw-process-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .bw-process-h2 .accent { color: #e8391d; }
                .bw-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; position: relative; }
                .bw-process-line { display: block; position: absolute; top: 32px; left: 12%; right: 12%; height: 2px; background: #e5e7eb; z-index: 0; }
                .bw-process-card { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .bw-process-circle { width: 64px; height: 64px; border-radius: 50%; background: #e8391d; border: 4px solid #faf9f7; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(232,57,29,0.2); }
                .bw-process-step { color: #e8391d; font-weight: 900; font-size: 12px; letter-spacing: 0.15em; margin-bottom: 8px; }
                .bw-process-title { font-weight: 900; color: black; text-transform: uppercase; font-size: 16px; margin-bottom: 12px; letter-spacing: 0.04em; }
                .bw-process-desc { color: #6b7280; font-size: 14px; line-height: 1.65; max-width: 220px; }

                /* ══ S5 WHY CHOOSE ══ */
                .bw-why { position: relative; width: 100%; background: #111; padding: 128px 0; overflow: hidden; }
                .bw-why-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
                .bw-why-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.4); aspect-ratio: 1/1; }
                .bw-why-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 40px; font-size: clamp(2rem, 3.5vw, 3rem); }
                .bw-why-h2 .accent { color: #e8391d; }
                .bw-why-list { display: flex; flex-direction: column; gap: 20px; }
                .bw-why-item { display: flex; align-items: flex-start; gap: 16px; }
                .bw-why-icon { margin-top: 4px; width: 24px; height: 24px; border-radius: 50%; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .bw-why-item:hover .bw-why-icon { background: #e8391d; }
                .bw-why-item:hover .bw-why-icon svg { color: white !important; }
                .bw-why-text { color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.65; }

                /* ══ S6 FAQS ══ */
                .bw-faqs { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .bw-faqs-inner { max-width: 900px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 10; }
                .bw-faqs-header { text-align: center; margin-bottom: 64px; }
                .bw-faqs-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2rem, 4vw, 3rem); }
                .bw-faqs-h2 .accent { color: #e8391d; }
                .bw-faqs-list { display: flex; flex-direction: column; gap: 16px; }
                .bw-faq-item { background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: border-color 0.3s ease; }
                .bw-faq-item:hover { border-color: rgba(232,57,29,0.3); }
                .bw-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 24px; text-align: left; background: none; border: none; cursor: pointer; font-family: 'Raleway', Arial, sans-serif; }
                .bw-faq-q { font-weight: 700; color: black; font-size: 15px; padding-right: 16px; line-height: 1.4; }
                .bw-faq-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease, color 0.3s ease; }
                .bw-faq-icon.open { background: #e8391d; color: white; }
                .bw-faq-icon.closed { background: #f3f4f6; color: rgba(0,0,0,0.5); }
                .bw-faq-answer { padding: 0 24px 24px; color: #6b7280; font-size: 14px; line-height: 1.75; }

                /* ══ S7 CTA ══ */
                .bw-cta { position: relative; width: 100%; background: #e8391d; padding: 112px 0; overflow: hidden; }
                .bw-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 0 32px; position: relative; z-index: 10; }
                .bw-cta-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; font-size: clamp(2.5rem, 4vw, 3rem); }
                .bw-cta-sub { color: rgba(255,255,255,0.8); font-size: 18px; max-width: 560px; margin: 0 auto 40px; line-height: 1.65; }
                .bw-cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
                .bw-cta-btn-dark { display: inline-flex; align-items: center; gap: 12px; background: black; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .bw-cta-btn-dark:hover { background: white; color: #e8391d; gap: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
                .bw-cta-btn-border { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: gap 0.2s ease; }
                .bw-cta-btn-border:hover { gap: 16px; }


                /* ══════════════════════════════════════
                   2560px — 4K
                ══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .bw-hero-inner { max-width: 1800px; }
                    .bw-hero-h1 { font-size: clamp(4.5rem, 5.5vw, 8rem); margin-bottom: 52px; }
                    .bw-hero-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 1100px; margin-bottom: 60px; }
                    .bw-btn-primary, .bw-btn-outline { font-size: 16px; padding: 22px 52px; border-radius: 18px; }
                    .bw-hero-btns { gap: 24px; }

                    .bw-overview-inner, .bw-genres-inner, .bw-process-inner, .bw-why-inner { max-width: 2200px; padding: 0 160px; }
                    .bw-faqs-inner { max-width: 1600px; padding: 0 160px; }
                    .bw-cta-inner { max-width: 1400px; padding: 0 60px; }
                    .bw-overview, .bw-genres, .bw-process, .bw-why, .bw-faqs, .bw-cta { padding: 200px 0; }

                    .bw-overview-inner { gap: 120px; }
                    .bw-overview-h2 { font-size: clamp(3rem, 3vw, 5rem); margin-bottom: 36px; }
                    .bw-overview-body { font-size: 1.25rem; line-height: 1.9; }
                    .bw-overview-checklist { gap: 22px; }
                    .bw-check-item span { font-size: 18px; }

                    .bw-genres-header { margin-bottom: 100px; }
                    .bw-genres-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .bw-genres-sub { font-size: 1.2rem; margin-top: 36px; }
                    .bw-genres-grid { gap: 40px; }
                    .bw-genre-card { padding: 52px; border-radius: 24px; }
                    .bw-genre-icon { width: 68px; height: 68px; border-radius: 18px; margin-bottom: 36px; }
                    .bw-genre-title { font-size: 22px; }
                    .bw-genre-desc { font-size: 18px; }

                    .bw-process-header { margin-bottom: 120px; }
                    .bw-process-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .bw-process-grid { gap: 52px; }
                    .bw-process-circle { width: 88px; height: 88px; margin-bottom: 36px; }
                    .bw-process-title { font-size: 20px; margin-bottom: 16px; }
                    .bw-process-desc { font-size: 18px; max-width: 320px; }
                    .bw-process-step { font-size: 15px; }

                    .bw-why-inner { gap: 120px; }
                    .bw-why-h2 { font-size: clamp(3rem, 3.5vw, 5rem); margin-bottom: 60px; }
                    .bw-why-list { gap: 28px; }
                    .bw-why-text { font-size: 19px; }
                    .bw-why-icon { width: 32px; height: 32px; }

                    .bw-faqs-header { margin-bottom: 80px; }
                    .bw-faqs-h2 { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .bw-faq-trigger { padding: 36px; }
                    .bw-faq-q { font-size: 19px; }
                    .bw-faq-answer { padding: 0 36px 36px; font-size: 17px; }
                    .bw-faq-icon { width: 44px; height: 44px; }
                    .bw-faqs-list { gap: 24px; }

                    .bw-cta-h2 { font-size: clamp(3.5rem, 4.5vw, 6.5rem); }
                    .bw-cta-sub { font-size: 24px; max-width: 800px; }
                    .bw-cta-btn-dark, .bw-cta-btn-border { font-size: 18px; padding: 26px 60px; border-radius: 18px; }
                    .bw-cta-btns { gap: 32px; }
                }

                /* ══════════════════════════════════════
                   1920px — Full HD
                ══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .bw-hero-inner { max-width: 1400px; }
                    .bw-hero-h1 { font-size: clamp(3.5rem, 5vw, 6.5rem); }
                    .bw-hero-sub { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 900px; }
                    .bw-btn-primary, .bw-btn-outline { font-size: 14px; padding: 20px 44px; }

                    .bw-overview-inner, .bw-genres-inner, .bw-process-inner, .bw-why-inner { max-width: 1700px; padding: 0 130px; }
                    .bw-faqs-inner { max-width: 1200px; padding: 0 64px; }
                    .bw-overview, .bw-genres, .bw-process, .bw-why, .bw-faqs, .bw-cta { padding: 160px 0; }

                    .bw-overview-inner { gap: 100px; }
                    .bw-overview-h2 { font-size: clamp(2.6rem, 2.8vw, 4.2rem); }
                    .bw-overview-body { font-size: 1.1rem; }
                    .bw-check-item span { font-size: 16px; }

                    .bw-genres-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .bw-genres-grid { gap: 32px; }
                    .bw-genre-card { padding: 44px; }
                    .bw-genre-icon { width: 58px; height: 58px; }
                    .bw-genre-title { font-size: 20px; }
                    .bw-genre-desc { font-size: 16px; }

                    .bw-process-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .bw-process-grid { gap: 44px; }
                    .bw-process-circle { width: 72px; height: 72px; }
                    .bw-process-title { font-size: 18px; }
                    .bw-process-desc { font-size: 16px; }

                    .bw-why-inner { gap: 100px; }
                    .bw-why-h2 { font-size: clamp(2.5rem, 3.2vw, 4.2rem); }
                    .bw-why-text { font-size: 17px; }

                    .bw-faqs-h2 { font-size: clamp(2.5rem, 3.5vw, 5rem); }
                    .bw-faq-q { font-size: 17px; }
                    .bw-faq-answer { font-size: 15px; }

                    .bw-cta-h2 { font-size: clamp(3rem, 3.5vw, 5rem); }
                    .bw-cta-sub { font-size: 21px; }
                    .bw-cta-btn-dark, .bw-cta-btn-border { font-size: 16px; padding: 22px 52px; }
                    .bw-cta-inner { max-width: 1200px; }
                }

                /* ══════════════════════════════════════
                   1440px — Large Laptop
                ══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .bw-overview-inner, .bw-genres-inner, .bw-process-inner, .bw-why-inner { max-width: 1360px; padding: 0 96px; }
                    .bw-overview, .bw-genres, .bw-process, .bw-why, .bw-faqs, .bw-cta { padding: 140px 0; }
                    .bw-overview-inner { gap: 88px; }
                    .bw-overview-h2 { font-size: clamp(2.2rem, 2.8vw, 3.4rem); }
                    .bw-genres-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .bw-process-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .bw-why-h2 { font-size: clamp(2.2rem, 3.2vw, 3.6rem); }
                    .bw-cta-h2 { font-size: clamp(2.8rem, 3.5vw, 4rem); }
                }

                /* ══════════════════════════════════════
                   1280px — Standard Laptop
                ══════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .bw-overview-inner, .bw-genres-inner, .bw-process-inner, .bw-why-inner { max-width: 1160px; padding: 0 64px; }
                }

                /* ══════════════════════════════════════
                   1024px — Small Laptop
                ══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .bw-overview-inner, .bw-genres-inner, .bw-process-inner, .bw-why-inner { padding: 0 48px; }
                    .bw-faqs-inner { padding: 0 48px; }
                    .bw-overview, .bw-genres, .bw-process, .bw-why, .bw-faqs, .bw-cta { padding: 96px 0; }
                    .bw-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .bw-overview-img-wrap { display: none; }
                    .bw-overview-h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); }
                    .bw-genres-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
                    .bw-genres-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .bw-process-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
                    .bw-process-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .bw-process-line { display: none; }
                    .bw-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .bw-why-img-wrap { display: none; }
                    .bw-why-h2 { font-size: clamp(1.8rem, 3.2vw, 2.6rem); }
                    .bw-cta-h2 { font-size: clamp(2rem, 4vw, 2.8rem); }
                    .bw-cta-sub { font-size: 15px; }
                    .bw-cta-btn-dark, .bw-cta-btn-border { font-size: 12px; padding: 16px 28px; }
                }

                /* ══════════════════════════════════════
                   900px — Tablet
                ══════════════════════════════════════ */
                @media (max-width: 900px) {
                    .bw-overview-inner, .bw-genres-inner, .bw-process-inner, .bw-why-inner { padding: 0 40px; }
                    .bw-faqs-inner { padding: 0 40px; }
                    .bw-overview, .bw-genres, .bw-process, .bw-why, .bw-faqs, .bw-cta { padding: 80px 0; }
                    .bw-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .bw-overview-img-wrap { display: none; }
                    .bw-hero-h1 { font-size: clamp(2.2rem, 6vw, 3.6rem); }
                    .bw-overview-h2 { font-size: clamp(1.8rem, 4.5vw, 2.6rem); }
                    .bw-genres-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
                    .bw-genres-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .bw-genres-header { margin-bottom: 40px; }
                    .bw-process-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
                    .bw-process-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .bw-process-header { margin-bottom: 48px; }
                    .bw-process-line { display: none; }
                    .bw-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .bw-why-img-wrap { display: none; }
                    .bw-why-h2 { font-size: clamp(1.8rem, 5vw, 2.6rem); }
                    .bw-cta-h2 { font-size: clamp(1.8rem, 5.5vw, 2.8rem); }
                    .bw-cta-sub { font-size: 15px; }
                }

                /* ══════════════════════════════════════
                   768px — Tablet Portrait
                ══════════════════════════════════════ */
                @media (max-width: 768px) {
                    .bw-overview-inner, .bw-genres-inner, .bw-process-inner, .bw-why-inner { padding: 0 32px; }
                    .bw-faqs-inner { padding: 0 32px; }
                    .bw-hero-h1 { font-size: clamp(1.9rem, 7vw, 3rem); }
                    .bw-genre-card { padding: 24px; }
                    .bw-faq-trigger { padding: 20px; }
                    .bw-cta-h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); }
                }

                /* ══════════════════════════════════════
                   640px — Large Mobile
                ══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .bw-overview-inner, .bw-genres-inner, .bw-process-inner, .bw-why-inner { padding: 0 20px; }
                    .bw-faqs-inner { padding: 0 20px; }
                    .bw-cta-inner { padding: 0 20px; }
                    .bw-overview, .bw-genres, .bw-process, .bw-why, .bw-faqs, .bw-cta { padding: 56px 0; }
                    .bw-hero-h1 { font-size: clamp(1.7rem, 8vw, 2.6rem); margin-bottom: 20px; }
                    .bw-hero-sub { font-size: 0.875rem; margin-bottom: 28px; }
                    .bw-btn-primary, .bw-btn-outline { font-size: 11px; padding: 13px 22px; border-radius: 10px; }
                    .bw-hero-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .bw-btn-primary, .bw-btn-outline { width: 100%; justify-content: center; }
                    .bw-overview-h2 { font-size: clamp(1.5rem, 6.5vw, 2.2rem); }
                    .bw-overview-body { font-size: 0.875rem; }
                    .bw-overview-checklist { gap: 12px; }
                    .bw-check-item span { font-size: 13px; }
                    .bw-genres-grid { grid-template-columns: 1fr; gap: 14px; }
                    .bw-genres-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .bw-genre-card { padding: 20px; border-radius: 12px; }
                    .bw-genre-icon { width: 40px; height: 40px; margin-bottom: 16px; }
                    .bw-genre-title { font-size: 15px; }
                    .bw-genre-desc { font-size: 13px; }
                    .bw-process-grid { grid-template-columns: 1fr; gap: 28px; }
                    .bw-process-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .bw-process-header { margin-bottom: 36px; }
                    .bw-process-circle { width: 52px; height: 52px; margin-bottom: 16px; }
                    .bw-process-title { font-size: 14px; margin-bottom: 8px; }
                    .bw-process-desc { font-size: 13px; }
                    .bw-why-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); margin-bottom: 28px; }
                    .bw-why-text { font-size: 13.5px; }
                    .bw-why-list { gap: 14px; }
                    .bw-faqs-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .bw-faqs-header { margin-bottom: 36px; }
                    .bw-faq-q { font-size: 13.5px; }
                    .bw-faq-answer { font-size: 13px; }
                    .bw-faq-trigger { padding: 16px; }
                    .bw-cta-h2 { font-size: clamp(1.5rem, 7.5vw, 2.2rem); }
                    .bw-cta-sub { font-size: 14px; }
                    .bw-cta-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .bw-cta-btn-dark, .bw-cta-btn-border { font-size: 11px; padding: 14px 24px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ══════════════════════════════════════
                   480px — Standard Mobile
                ══════════════════════════════════════ */
                @media (max-width: 480px) {
                    .bw-hero-h1 { font-size: clamp(1.5rem, 8.5vw, 2.2rem); }
                    .bw-overview-h2, .bw-genres-h2, .bw-process-h2, .bw-why-h2, .bw-faqs-h2, .bw-cta-h2 { font-size: clamp(1.35rem, 7.5vw, 1.9rem); }
                }

                /* ══════════════════════════════════════
                   380px — Small Mobile
                ══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .bw-overview-inner, .bw-genres-inner, .bw-process-inner, .bw-why-inner { padding: 0 14px; }
                    .bw-faqs-inner, .bw-cta-inner { padding: 0 14px; }
                    .bw-hero-h1 { font-size: 1.4rem; }
                    .bw-overview-h2, .bw-genres-h2, .bw-process-h2, .bw-why-h2, .bw-faqs-h2, .bw-cta-h2 { font-size: 1.25rem; }
                    .bw-genre-card { padding: 16px; }
                    .bw-cta-btn-dark, .bw-cta-btn-border { font-size: 10px; padding: 12px 18px; }
                }

                /* ══════════════════════════════════════
                   320px — Very Small
                ══════════════════════════════════════ */
                @media (max-width: 320px) {
                    .bw-overview-inner, .bw-genres-inner, .bw-process-inner, .bw-why-inner { padding: 0 12px; }
                    .bw-faqs-inner, .bw-cta-inner { padding: 0 12px; }
                    .bw-hero-h1 { font-size: 1.25rem; }
                    .bw-overview-h2, .bw-genres-h2, .bw-process-h2, .bw-why-h2, .bw-faqs-h2, .bw-cta-h2 { font-size: 1.1rem; }
                }
            `}</style>

            <main className="bw-main">

                {/* S1 HERO */}
                <section className="bw-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <div className="absolute pointer-events-none" style={{ bottom: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 600, background: "rgba(232,57,29,0.1)", borderRadius: "50%", filter: "blur(180px)" }} />
                    <div className="bw-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="bw-eyebrow center" style={{ marginBottom: 24 }}>
                            <PenTool size={16} style={{ color: "#e8391d" }} />
                            <span className="bw-eyebrow-text">Book Writing & Ghostwriting</span>
                        </motion.div>
                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="bw-hero-h1">
                            GET YOUR CONCEPTS WRITTEN <br /><span className="accent">BY WARRIOR OF THE WILD.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="bw-hero-sub">
                            Looking for "writing" that speaks volumes? Bexley Publishing helps you communicate your thoughts effectively to the whole world by publishing a book that hooks readers from start to finish.
                        </motion.p>

                        <HeroButtons />
                    </div>
                </section>

                {/* S2 OVERVIEW */}
                <section id="overview" ref={overviewRef} className="bw-overview">
                    <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="bw-overview-inner">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <motion.div variants={fadeUp} className="bw-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="bw-eyebrow-line" /><span className="bw-eyebrow-text">Overview</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="bw-overview-h2">
                                YOUR IDEA DESERVES <span className="accent">POWERFUL WRITING EXPERTISE.</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="bw-overview-body">
                                Some people are ordinary, and some are extraordinary. Our writers belong to the latter. We have 50+ certified book ghostwriters who have written 500+ books so far. No matter if you just got a spark of an idea and want to publish a professionally crafted masterpiece, we are here for you. Our professionals understand the author's unique voice, their thoughts, what they want to communicate, and in what tone, and keep everything intact in the final book.
                            </motion.p>
                            <motion.p variants={fadeUp} className="bw-overview-body" style={{ marginBottom: 32 }}>
                                Our writers are narrative masters who work across all genres, including fiction, non-fiction, horror, Christian literature, thrillers, romance, and more. Irrespective of the genre, we keep readers on the edge and help you be the next hot seller.
                            </motion.p>
                            <motion.div variants={staggerContainer} className="bw-overview-checklist">
                                {["100% Written Your Way", "100% NDA & Confidentiality", "Unlimited Revisions", "Full Rights Belong To You"].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="bw-check-item">
                                        <CheckCircle2 size={18} style={{ color: "#e8391d", flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="bw-overview-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/BookWriting/01.jpg" alt="Book Writing Service" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                            <div className="absolute" style={{ bottom: -20, left: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.2)", zIndex: -1 }} />
                        </motion.div>
                    </motion.div>
                </section>

                {/* S3 GENRES */}
                <section className="bw-genres">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="bw-genres-inner">
                        <div className="bw-genres-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="bw-eyebrow center" style={{ marginBottom: 16 }}>
                                <BookOpen size={16} style={{ color: "#e8391d" }} />
                                <span className="bw-eyebrow-text">Specializations</span>
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bw-genres-h2">
                                ALL GENRES <span className="accent">COVERED</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bw-genres-sub">
                                Not just fancy words, we genuinely work on every kind of write-up, and our dedicated writers for each make it possible. Our certified, native writers leave a strong impact on readers.
                            </motion.p>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bw-genres-grid">
                            {genres.map(({ icon: Icon, title, desc }) => (
                                <motion.div key={title} variants={fadeUp} className="bw-genre-card">
                                    <div className="bw-genre-bg" />
                                    <div className="bw-genre-icon"><Icon size={22} style={{ color: "#e8391d" }} /></div>
                                    <h3 className="bw-genre-title">{title}</h3>
                                    <p className="bw-genre-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S4 PROCESS */}
                <section className="bw-process">
                    <div className="bw-process-inner">
                        <div className="bw-process-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bw-process-h2">
                                STRATEGIC WRITING PROCESS FOR <span className="accent">EVERY MANUSCRIPT</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bw-process-grid">
                            <div className="bw-process-line" />
                            {processSteps.map(({ step, title, desc, icon: Icon }) => (
                                <motion.div key={step} variants={fadeUp} className="bw-process-card">
                                    <div className="bw-process-circle"><Icon size={24} style={{ color: "white" }} /></div>
                                    <span className="bw-process-step">{step}</span>
                                    <h3 className="bw-process-title">{title}</h3>
                                    <p className="bw-process-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S5 WHY CHOOSE */}
                <section className="bw-why">
                    <div className="bw-why-inner">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bw-why-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/BookWriting/02.jpg" alt="Ghostwriting Team" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "rgba(232,57,29,0.2)", mixBlendMode: "multiply" }} />
                            <div className="absolute" style={{ bottom: -20, right: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.25)", zIndex: -1 }} />
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <motion.div variants={fadeUp} className="bw-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="bw-eyebrow-line" /><span className="bw-eyebrow-text">WHY BEXLEY PUBLISHING</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="bw-why-h2">
                                WHY YOU SHOULD<br /><span className="accent">HIRE OUR WRITERS.</span>
                            </motion.h2>
                            <motion.div variants={staggerContainer} className="bw-why-list">
                                {["Round-the-Clock Author Support – We are always within reach.", "Voice-Matched Ghostwriting – We keep your voice and tone intact.", "Genre Specialists – We meet specific market conventions across all genres.", "Strict NDA & Confidentiality - We protect your privacy and maintain professional standards.", "Collaborative Approach - We get your consent for every single line.", "Fair Pricing – We have a fair pricing policy and do not charge hidden costs."].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="bw-why-item">
                                        <div className="bw-why-icon"><CheckCircle2 size={14} style={{ color: "#e8391d" }} /></div>
                                        <p className="bw-why-text">{item}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* S6 FAQS */}
                <section className="bw-faqs">
                    <div className="bw-faqs-inner">
                        <div className="bw-faqs-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bw-faqs-h2">
                                BOOK WRITING <span className="accent">FAQS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bw-faqs-list">
                            {faqs.map(({ q, a }, i) => (
                                <motion.div key={i} variants={fadeUp} className="bw-faq-item">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="bw-faq-trigger">
                                        <span className="bw-faq-q">{q}</span>
                                        <div className={`bw-faq-icon ${openFaq === i ? "open" : "closed"}`}>
                                            {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }} style={{ overflow: "hidden" }}>
                                                <div className="bw-faq-answer">{a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S7 CTA */}
                <section className="bw-cta">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bw-cta-inner">
                        <h2 className="bw-cta-h2">READY TO TEAM UP WITH YOUR DEDICATED WRITER?</h2>
                        <p className="bw-cta-sub">Whether you are looking for a storyteller, novelist, playwright, screenwriter, or fabulist, share your project with us, and let us dedicate a writer to it.</p>
                        <div className="bw-cta-btns">
                            <button
                                type="button"
                                className="bw-cta-btn-dark"
                                onClick={() => setQuoteModal(true)}
                            >
                                <FileText size={16} />
                                Start Your Book
                            </button>
                            <a href="tel:2797770380" className="bw-cta-btn-border"><Phone size={16} /> Call Us Now</a>
                        </div>
                    </motion.div>

                    <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />

                </section>

            </main>
        </>
    );
}