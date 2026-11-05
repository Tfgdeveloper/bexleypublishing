"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    BookOpen, ArrowRight, CheckCircle2, Sword, Heart, Ghost,
    PenTool, Minus, Plus, Phone, Users, Map, Sparkles,
    FileText
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

const subGenres = [
    { icon: Sword, title: "Thriller & Suspense", desc: "Quick-paced storylines, shocking twists, and suspenseful narratives that keep your readers on edge at all times." },
    { icon: Heart, title: "Romance", desc: "Moving stories, chemistry, and heartwarming characters that readers can relate become deeply invested in." },
    { icon: Sparkles, title: "Literary Fiction", desc: "Character-driven plots with relevant themes, deep emotions, and compelling narratives." },
    { icon: Ghost, title: "Horror & Dark Fantasy", desc: "Creepy settings, unsettling plot development, and eerie worlds meant to stay with readers forever." },
];

const processSteps = [
    { step: "01", title: "CONCEPT & DIRECTION", desc: "Transforming your raw concept into a vivid, engaging, and emotionally driven fiction writing concept.", icon: Sparkles },
    { step: "02", title: "WORLD & CHARACTER BUILDING", desc: "Developing immersive settings and memorable characters that readers can emotionally connect with throughout the story.", icon: Users },
    { step: "03", title: "STORY EXECUTION", desc: "Creating scenes that have excellent pacing and dialogue that will keep readers emotionally invested.", icon: Map },
    { step: "04", title: "EDITING & POLISHING", desc: "Refining every chapter through careful editing, revisions, and polishing to strengthen the overall reading experience.", icon: PenTool },
];

const faqs = [
    { q: "Do I need a completed outline to start?", a: "No. You can come to us with a rough idea, a few notes, or even just a concept. Our fiction writers can help develop the outline, characters, plot structure, and overall direction of your story." },
    { q: "How do you make sure the characters feel real, and not flat?", a: "We focus on giving characters realistic emotions, personal struggles, motivations, and growth. Every character is developed with a unique voice, believable reactions, and meaningful relationships that make them feel natural and memorable to readers." },
    { q: "What makes a story truly addictive to read?", a: "A strong fiction book keeps readers emotionally invested through suspense, meaningful conflict, engaging pacing, and characters they genuinely care about. Unexpected twists, emotional depth, and immersive storytelling also play a major role in making a story difficult to put down." },
    { q: "Can you write a book series or only standalone novels?", a: "Yes. We can develop both standalone novels and multi-book series. Whether you want a single complete story or a long-running fictional universe, we help maintain consistent characters, worldbuilding, timelines, and story progression across every book." },
    { q: "How do you overcome writer's block and fix plot holes?", a: "Our fiction writers use structured story planning, character mapping, and detailed plot analysis to identify weak areas in the story. We refine pacing, strengthen character motivations, and resolve inconsistencies to keep the narrative smooth, engaging, and logically connected from beginning to end." },
];

export default function FictionWritingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);


    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .fw-main { width: 100%; overflow: hidden; font-family: 'Raleway', Arial, sans-serif; }

                .fw-eyebrow { display: flex; align-items: center; gap: 12px; }
                .fw-eyebrow.center { justify-content: center; }
                .fw-eyebrow-line { display: block; width: 32px; height: 2px; background: #e8391d; flex-shrink: 0; }
                .fw-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }

                /* ══ S1 HERO ══ */
                .fw-hero { position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #05070f; overflow: hidden; padding: 112px 0 48px; }
                .fw-hero-inner { position: relative; z-index: 10; text-align: center; padding: 0 24px; max-width: 1000px; margin: 0 auto; }
                .fw-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.95; margin-bottom: 32px; font-size: clamp(2.5rem, 6vw, 4rem); }
                .fw-hero-h1 .accent { color: #e8391d; }
                .fw-hero-sub { color: rgba(255,255,255,0.6); line-height: 1.85; max-width: 680px; margin: 0 auto 40px; font-size: clamp(0.9rem, 1.1vw, 1.05rem); }
                .fw-hero-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
                .fw-btn-primary { display: inline-flex; align-items: center; gap: 12px; background: #e8391d; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease; }
                .fw-btn-primary:hover { background: #c0271a; gap: 16px; box-shadow: 0 10px 40px rgba(232,57,29,0.4); }
                .fw-btn-outline { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
                .fw-btn-outline:hover { border-color: #e8391d; color: #e8391d; }

                /* ══ S2 OVERVIEW ══ */
                .fw-overview { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .fw-overview-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
                .fw-overview-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; margin-bottom: 24px; font-size: clamp(2rem, 3.8vw, 3.2rem); }
                .fw-overview-h2 .accent { color: #e8391d; }
                .fw-overview-body { color: #6b7280; line-height: 1.85; margin-bottom: 20px; font-size: 0.95rem; }
                .fw-overview-checklist { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
                .fw-check-item { display: flex; align-items: center; gap: 12px; }
                .fw-check-item span { color: rgba(0,0,0,0.8); font-weight: 600; font-size: 14px; }
                .fw-overview-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.2); aspect-ratio: 4/5; }

                /* ══ S3 GENRES ══ */
                .fw-genres { position: relative; width: 100%; background: #05070f; padding: 128px 0; overflow: hidden; }
                .fw-genres-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 10; }
                .fw-genres-header { text-align: center; margin-bottom: 64px; overflow: hidden; }
                .fw-genres-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .fw-genres-h2 .accent { color: #e8391d; }
                .fw-genres-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .fw-genre-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; display: flex; gap: 24px; align-items: flex-start; cursor: default; transition: border-color 0.5s ease; }
                .fw-genre-card:hover { border-color: rgba(232,57,29,0.5); }
                .fw-genre-icon { width: 56px; height: 56px; border-radius: 12px; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .fw-genre-card:hover .fw-genre-icon { background: #e8391d; }
                .fw-genre-card:hover .fw-genre-icon svg { color: white !important; }
                .fw-genre-title { font-weight: 900; color: white; text-transform: uppercase; font-size: 17px; margin-bottom: 8px; letter-spacing: 0.04em; }
                .fw-genre-desc { color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.65; }

                /* ══ S4 PROCESS ══ */
                .fw-process { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .fw-process-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .fw-process-header { text-align: center; margin-bottom: 80px; }
                .fw-process-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .fw-process-h2 .accent { color: #e8391d; }
                .fw-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; position: relative; }
                .fw-process-line { display: block; position: absolute; top: 32px; left: 12%; right: 12%; height: 2px; background: #e5e7eb; z-index: 0; }
                .fw-process-card { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .fw-process-circle { width: 64px; height: 64px; border-radius: 50%; background: #e8391d; border: 4px solid #faf9f7; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(232,57,29,0.2); }
                .fw-process-step { color: #e8391d; font-weight: 900; font-size: 12px; letter-spacing: 0.15em; margin-bottom: 8px; }
                .fw-process-title { font-weight: 900; color: black; text-transform: uppercase; font-size: 15px; margin-bottom: 12px; letter-spacing: 0.04em; line-height: 1.3; }
                .fw-process-desc { color: #6b7280; font-size: 14px; line-height: 1.65; max-width: 220px; }

                /* ══ S5 WHY CHOOSE ══ */
                .fw-why { position: relative; width: 100%; background: #111; padding: 128px 0; overflow: hidden; }
                .fw-why-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
                .fw-why-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.4); aspect-ratio: 1/1; }
                .fw-why-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 40px; font-size: clamp(2rem, 3.5vw, 3rem); }
                .fw-why-h2 .accent { color: #e8391d; }
                .fw-why-list { display: flex; flex-direction: column; gap: 20px; }
                .fw-why-item { display: flex; align-items: flex-start; gap: 16px; }
                .fw-why-icon { margin-top: 4px; width: 24px; height: 24px; border-radius: 50%; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .fw-why-item:hover .fw-why-icon { background: #e8391d; }
                .fw-why-item:hover .fw-why-icon svg { color: white !important; }
                .fw-why-text { color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.65; }

                /* ══ S6 FAQS ══ */
                .fw-faqs { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .fw-faqs-inner { max-width: 900px; margin: 0 auto; padding: 0 32px; }
                .fw-faqs-header { text-align: center; margin-bottom: 64px; }
                .fw-faqs-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2rem, 4vw, 3rem); }
                .fw-faqs-h2 .accent { color: #e8391d; }
                .fw-faqs-list { display: flex; flex-direction: column; gap: 16px; }
                .fw-faq-item { background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: border-color 0.3s ease; }
                .fw-faq-item:hover { border-color: rgba(232,57,29,0.3); }
                .fw-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 24px; text-align: left; background: none; border: none; cursor: pointer; font-family: 'Raleway', Arial, sans-serif; }
                .fw-faq-q { font-weight: 700; color: black; font-size: 15px; padding-right: 16px; line-height: 1.4; }
                .fw-faq-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
                .fw-faq-icon.open { background: #e8391d; color: white; }
                .fw-faq-icon.closed { background: #f3f4f6; color: rgba(0,0,0,0.5); }
                .fw-faq-answer { padding: 0 24px 24px; color: #6b7280; font-size: 14px; line-height: 1.75; }

                /* ══ S7 CTA ══ */
                .fw-cta { position: relative; width: 100%; background: #e8391d; padding: 112px 0; overflow: hidden; }
                .fw-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 0 32px; position: relative; z-index: 10; }
                .fw-cta-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; font-size: clamp(2.5rem, 5vw, 4rem); }
                .fw-cta-sub { color: rgba(255,255,255,0.8); font-size: 18px; max-width: 560px; margin: 0 auto 40px; line-height: 1.65; }
                .fw-cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
                .fw-cta-btn-dark { display: inline-flex; align-items: center; gap: 12px; background: black; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .fw-cta-btn-dark:hover { background: white; color: #e8391d; gap: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
                .fw-cta-btn-border { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: gap 0.2s ease; }
                .fw-cta-btn-border:hover { gap: 16px; }


                /* ══════════════════════════════════════
                   2560px — 4K
                ══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .fw-hero { padding: 160px 0 80px; }
                    .fw-hero-inner { max-width: 1800px; }
                    .fw-hero-h1 { font-size: clamp(4.5rem, 5.5vw, 8rem); margin-bottom: 52px; }
                    .fw-hero-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 1100px; margin-bottom: 60px; }
                    .fw-btn-primary, .fw-btn-outline { font-size: 16px; padding: 22px 52px; border-radius: 18px; }
                    .fw-hero-btns { gap: 28px; }

                    .fw-overview-inner, .fw-genres-inner, .fw-process-inner, .fw-why-inner { max-width: 2200px; padding: 0 160px; }
                    .fw-faqs-inner { max-width: 1600px; padding: 0 160px; }
                    .fw-cta-inner { max-width: 1400px; padding: 0 60px; }
                    .fw-overview, .fw-genres, .fw-process, .fw-why, .fw-faqs, .fw-cta { padding: 200px 0; }

                    .fw-overview-inner { gap: 120px; }
                    .fw-overview-h2 { font-size: clamp(3rem, 3.5vw, 5.5rem); margin-bottom: 40px; }
                    .fw-overview-body { font-size: 1.25rem; line-height: 1.9; }
                    .fw-overview-checklist { gap: 24px; }
                    .fw-check-item span { font-size: 18px; }

                    .fw-genres-header { margin-bottom: 100px; }
                    .fw-genres-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .fw-genres-grid { gap: 40px; }
                    .fw-genre-card { padding: 52px; gap: 36px; border-radius: 24px; }
                    .fw-genre-icon { width: 76px; height: 76px; border-radius: 18px; }
                    .fw-genre-title { font-size: 22px; }
                    .fw-genre-desc { font-size: 18px; }

                    .fw-process-header { margin-bottom: 120px; }
                    .fw-process-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .fw-process-grid { gap: 52px; }
                    .fw-process-circle { width: 88px; height: 88px; margin-bottom: 36px; }
                    .fw-process-title { font-size: 19px; margin-bottom: 16px; }
                    .fw-process-desc { font-size: 18px; max-width: 320px; }
                    .fw-process-step { font-size: 15px; }

                    .fw-why-inner { gap: 120px; }
                    .fw-why-h2 { font-size: clamp(3rem, 3.5vw, 5rem); margin-bottom: 60px; }
                    .fw-why-list { gap: 28px; }
                    .fw-why-text { font-size: 19px; }
                    .fw-why-icon { width: 32px; height: 32px; }

                    .fw-faqs-header { margin-bottom: 80px; }
                    .fw-faqs-h2 { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .fw-faq-trigger { padding: 36px; }
                    .fw-faq-q { font-size: 19px; }
                    .fw-faq-answer { padding: 0 36px 36px; font-size: 17px; }
                    .fw-faq-icon { width: 44px; height: 44px; }
                    .fw-faqs-list { gap: 24px; }

                    .fw-cta-h2 { font-size: clamp(3.5rem, 5vw, 7rem); }
                    .fw-cta-sub { font-size: 24px; max-width: 800px; }
                    .fw-cta-btn-dark, .fw-cta-btn-border { font-size: 18px; padding: 26px 60px; border-radius: 18px; }
                    .fw-cta-btns { gap: 32px; }
                }

                /* ══════════════════════════════════════
                   1920px — Full HD
                ══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .fw-hero { padding: 130px 0 60px; }
                    .fw-hero-inner { max-width: 1400px; }
                    .fw-hero-h1 { font-size: clamp(3.5rem, 5vw, 6.5rem); }
                    .fw-hero-sub { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 900px; }
                    .fw-btn-primary, .fw-btn-outline { font-size: 14px; padding: 20px 44px; }

                    .fw-overview-inner, .fw-genres-inner, .fw-process-inner, .fw-why-inner { max-width: 1700px; padding: 0 130px; }
                    .fw-faqs-inner { max-width: 1200px; padding: 0 64px; }
                    .fw-overview, .fw-genres, .fw-process, .fw-why, .fw-faqs, .fw-cta { padding: 160px 0; }

                    .fw-overview-inner { gap: 100px; }
                    .fw-overview-h2 { font-size: clamp(2.6rem, 3.5vw, 4.5rem); }
                    .fw-overview-body { font-size: 1.1rem; }
                    .fw-check-item span { font-size: 16px; }

                    .fw-genres-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .fw-genres-grid { gap: 32px; }
                    .fw-genre-card { padding: 44px; gap: 28px; }
                    .fw-genre-icon { width: 64px; height: 64px; }
                    .fw-genre-title { font-size: 20px; }
                    .fw-genre-desc { font-size: 16px; }

                    .fw-process-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .fw-process-grid { gap: 44px; }
                    .fw-process-circle { width: 72px; height: 72px; }
                    .fw-process-title { font-size: 17px; }
                    .fw-process-desc { font-size: 16px; }

                    .fw-why-inner { gap: 100px; }
                    .fw-why-h2 { font-size: clamp(2.5rem, 3.2vw, 4.2rem); }
                    .fw-why-text { font-size: 17px; }

                    .fw-faqs-h2 { font-size: clamp(2.5rem, 3.5vw, 5rem); }
                    .fw-faq-q { font-size: 17px; }
                    .fw-faq-answer { font-size: 15px; }

                    .fw-cta-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .fw-cta-sub { font-size: 21px; }
                    .fw-cta-btn-dark, .fw-cta-btn-border { font-size: 16px; padding: 22px 52px; }
                    .fw-cta-inner { max-width: 1200px; }
                }

                /* ══════════════════════════════════════
                   1440px
                ══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .fw-overview-inner, .fw-genres-inner, .fw-process-inner, .fw-why-inner { max-width: 1360px; padding: 0 96px; }
                    .fw-overview, .fw-genres, .fw-process, .fw-why, .fw-faqs, .fw-cta { padding: 140px 0; }
                    .fw-overview-inner { gap: 88px; }
                    .fw-overview-h2 { font-size: clamp(2.2rem, 3.5vw, 3.6rem); }
                    .fw-genres-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .fw-process-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .fw-why-h2 { font-size: clamp(2.2rem, 3.2vw, 3.6rem); }
                    .fw-cta-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                }

                /* ══════════════════════════════════════
                   1280px
                ══════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .fw-overview-inner, .fw-genres-inner, .fw-process-inner, .fw-why-inner { max-width: 1160px; padding: 0 64px; }
                }

                /* ══════════════════════════════════════
                   1024px
                ══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .fw-overview-inner, .fw-genres-inner, .fw-process-inner, .fw-why-inner { padding: 0 48px; }
                    .fw-faqs-inner { padding: 0 48px; }
                    .fw-overview, .fw-genres, .fw-process, .fw-why, .fw-faqs, .fw-cta { padding: 96px 0; }
                    .fw-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .fw-overview-img-wrap { display: none; }
                    .fw-overview-h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); }
                    .fw-genres-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .fw-genre-card { padding: 24px; gap: 18px; }
                    .fw-genre-icon { width: 44px; height: 44px; }
                    .fw-process-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
                    .fw-process-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .fw-process-line { display: none; }
                    .fw-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .fw-why-img-wrap { display: none; }
                    .fw-why-h2 { font-size: clamp(1.8rem, 3.2vw, 2.6rem); }
                    .fw-cta-h2 { font-size: clamp(2rem, 4.5vw, 3rem); }
                    .fw-cta-sub { font-size: 15px; }
                    .fw-cta-btn-dark, .fw-cta-btn-border { font-size: 12px; padding: 16px 28px; }
                }

                /* ══════════════════════════════════════
                   900px — Tablet
                ══════════════════════════════════════ */
                @media (max-width: 900px) {
                    .fw-overview-inner, .fw-genres-inner, .fw-process-inner, .fw-why-inner { padding: 0 40px; }
                    .fw-faqs-inner { padding: 0 40px; }
                    .fw-overview, .fw-genres, .fw-process, .fw-why, .fw-faqs, .fw-cta { padding: 80px 0; }
                    .fw-hero-h1 { font-size: clamp(2.2rem, 6vw, 3.6rem); }
                    .fw-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .fw-overview-img-wrap { display: none; }
                    .fw-overview-h2 { font-size: clamp(1.8rem, 4.5vw, 2.8rem); }
                    .fw-genres-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .fw-genres-header { margin-bottom: 40px; }
                    .fw-process-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
                    .fw-process-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .fw-process-header { margin-bottom: 48px; }
                    .fw-process-line { display: none; }
                    .fw-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .fw-why-img-wrap { display: none; }
                    .fw-why-h2 { font-size: clamp(1.8rem, 5vw, 2.6rem); }
                    .fw-cta-h2 { font-size: clamp(1.8rem, 5.5vw, 2.8rem); }
                    .fw-cta-sub { font-size: 15px; }
                }

                /* ══════════════════════════════════════
                   768px
                ══════════════════════════════════════ */
                @media (max-width: 768px) {
                    .fw-overview-inner, .fw-genres-inner, .fw-process-inner, .fw-why-inner { padding: 0 32px; }
                    .fw-faqs-inner { padding: 0 32px; }
                    .fw-hero-h1 { font-size: clamp(1.9rem, 7vw, 3rem); }
                    .fw-genre-card { padding: 20px; gap: 16px; }
                    .fw-genre-icon { width: 40px; height: 40px; }
                    .fw-faq-trigger { padding: 20px; }
                    .fw-cta-h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); }
                }

                /* ══════════════════════════════════════
                   640px — Large Mobile
                ══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .fw-overview-inner, .fw-genres-inner, .fw-process-inner, .fw-why-inner { padding: 0 20px; }
                    .fw-faqs-inner { padding: 0 20px; }
                    .fw-cta-inner { padding: 0 20px; }
                    .fw-overview, .fw-genres, .fw-process, .fw-why, .fw-faqs, .fw-cta { padding: 56px 0; }
                    .fw-hero-h1 { font-size: clamp(1.7rem, 8vw, 2.6rem); margin-bottom: 20px; }
                    .fw-hero-sub { font-size: 0.875rem; margin-bottom: 28px; }
                    .fw-btn-primary, .fw-btn-outline { font-size: 11px; padding: 13px 22px; border-radius: 10px; width: 100%; justify-content: center; }
                    .fw-hero-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .fw-overview-h2 { font-size: clamp(1.5rem, 6.5vw, 2.2rem); }
                    .fw-overview-body { font-size: 0.875rem; }
                    .fw-overview-checklist { gap: 12px; }
                    .fw-check-item span { font-size: 13px; }
                    .fw-genres-grid { grid-template-columns: 1fr; gap: 14px; }
                    .fw-genres-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .fw-genre-card { padding: 18px; gap: 14px; border-radius: 12px; }
                    .fw-genre-icon { width: 36px; height: 36px; border-radius: 9px; }
                    .fw-genre-title { font-size: 14px; }
                    .fw-genre-desc { font-size: 13px; }
                    .fw-process-grid { grid-template-columns: 1fr; gap: 28px; }
                    .fw-process-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .fw-process-header { margin-bottom: 36px; }
                    .fw-process-circle { width: 52px; height: 52px; margin-bottom: 16px; }
                    .fw-process-title { font-size: 13px; margin-bottom: 8px; }
                    .fw-process-desc { font-size: 13px; }
                    .fw-why-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); margin-bottom: 28px; }
                    .fw-why-text { font-size: 13.5px; }
                    .fw-why-list { gap: 14px; }
                    .fw-faqs-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .fw-faqs-header { margin-bottom: 36px; }
                    .fw-faq-q { font-size: 13.5px; }
                    .fw-faq-answer { font-size: 13px; }
                    .fw-faq-trigger { padding: 16px; }
                    .fw-cta-h2 { font-size: clamp(1.5rem, 7.5vw, 2.2rem); }
                    .fw-cta-sub { font-size: 14px; }
                    .fw-cta-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .fw-cta-btn-dark, .fw-cta-btn-border { font-size: 11px; padding: 14px 24px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ══════════════════════════════════════
                   480px
                ══════════════════════════════════════ */
                @media (max-width: 480px) {
                    .fw-hero-h1 { font-size: clamp(1.5rem, 8.5vw, 2.2rem); }
                    .fw-overview-h2, .fw-genres-h2, .fw-process-h2, .fw-why-h2, .fw-faqs-h2, .fw-cta-h2 { font-size: clamp(1.35rem, 7.5vw, 1.9rem); }
                }

                /* ══════════════════════════════════════
                   380px — iPhone SE
                ══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .fw-overview-inner, .fw-genres-inner, .fw-process-inner, .fw-why-inner { padding: 0 14px; }
                    .fw-faqs-inner, .fw-cta-inner { padding: 0 14px; }
                    .fw-hero-h1 { font-size: 1.4rem; }
                    .fw-overview-h2, .fw-genres-h2, .fw-process-h2, .fw-why-h2, .fw-faqs-h2, .fw-cta-h2 { font-size: 1.25rem; }
                    .fw-genre-card { padding: 14px; gap: 12px; }
                    .fw-cta-btn-dark, .fw-cta-btn-border { font-size: 10px; padding: 12px 18px; }
                }

                /* ══════════════════════════════════════
                   320px
                ══════════════════════════════════════ */
                @media (max-width: 320px) {
                    .fw-overview-inner, .fw-genres-inner, .fw-process-inner, .fw-why-inner { padding: 0 12px; }
                    .fw-faqs-inner, .fw-cta-inner { padding: 0 12px; }
                    .fw-hero-h1 { font-size: 1.25rem; }
                    .fw-overview-h2, .fw-genres-h2, .fw-process-h2, .fw-why-h2, .fw-faqs-h2, .fw-cta-h2 { font-size: 1.1rem; }
                }
            `}</style>

            <main className="fw-main">

                <section className="fw-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <div className="absolute pointer-events-none" style={{ top: "33%", left: "25%", width: 900, height: 600, background: "rgba(232,57,29,0.1)", borderRadius: "50%", filter: "blur(180px)" }} />
                    <div className="fw-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="fw-eyebrow center" style={{ marginBottom: 24 }}>
                            <BookOpen size={16} style={{ color: "#e8391d" }} />
                            <span className="fw-eyebrow-text">Fiction Writing Services</span>
                        </motion.div>
                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="fw-hero-h1">
                            WHERE GREAT FICTION COMES <br /><span className="accent">TO LIFE.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="fw-hero-sub">
                            Our fiction writing team develops emotionally engaging stories filled with suspense, passion, conflict, and characters readers genuinely connect with.
                        </motion.p>

                        <HeroButtons />
                    </div>
                </section>

                <section id="overview" ref={overviewRef} className="fw-overview">
                    <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="fw-overview-inner">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <motion.div variants={fadeUp} className="fw-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="fw-eyebrow-line" /><span className="fw-eyebrow-text">Master Storytellers</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="fw-overview-h2">
                                GREAT IDEAS DESERVE POWERFUL <span className="accent">STORYTELLING</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="fw-overview-body">
                                Your ideas deserve more than ordinary storytelling. Our fiction writing service transforms your concepts into immersive stories filled with emotion, suspense, unforgettable characters, and meaningful depth. All these keep your readers invested from beginning to end.
                            </motion.p>
                            <motion.p variants={fadeUp} className="fw-overview-body" style={{ marginBottom: 32 }}>
                                Whether you are starting with a rough idea or a complete vision, our experienced fiction writers help shape your story into a polished and compelling manuscript designed to captivate readers and leave a lasting impression.
                            </motion.p>
                            <motion.div variants={staggerContainer} className="fw-overview-checklist">
                                {["Immersive Storytelling", "Emotional Complexity", "Strong Character Arcs", "Suspense That Keeps Readers Turning Pages"].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="fw-check-item">
                                        <CheckCircle2 size={18} style={{ color: "#e8391d", flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="fw-overview-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/fiction-writing/01.jpg" alt="Fiction Writing Service" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                            <div className="absolute" style={{ bottom: -20, left: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.2)", zIndex: -1 }} />
                        </motion.div>
                    </motion.div>
                </section>

                <section className="fw-genres">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="fw-genres-inner">
                        <div className="fw-genres-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="fw-eyebrow center" style={{ marginBottom: 16 }}>
                                <BookOpen size={16} style={{ color: "#e8391d" }} /><span className="fw-eyebrow-text">Specializations</span>
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="fw-genres-h2">
                                GENRES WE <span className="accent">SPECIALIZE IN</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="fw-genres-grid">
                            {subGenres.map(({ icon: Icon, title, desc }) => (
                                <motion.div key={title} variants={fadeUp} className="fw-genre-card">
                                    <div className="fw-genre-icon"><Icon size={26} style={{ color: "#e8391d" }} /></div>
                                    <div>
                                        <h3 className="fw-genre-title">{title}</h3>
                                        <p className="fw-genre-desc">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="fw-process">
                    <div className="fw-process-inner">
                        <div className="fw-process-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="fw-process-h2">
                                OUR FICTION WRITING <span className="accent">PROCESS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="fw-process-grid">
                            <div className="fw-process-line" />
                            {processSteps.map(({ step, title, desc, icon: Icon }) => (
                                <motion.div key={step} variants={fadeUp} className="fw-process-card">
                                    <div className="fw-process-circle"><Icon size={24} style={{ color: "white" }} /></div>
                                    <span className="fw-process-step">{step}</span>
                                    <h3 className="fw-process-title">{title}</h3>
                                    <p className="fw-process-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="fw-why">
                    <div className="fw-why-inner">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="fw-why-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/fiction-writing/02.jpg" alt="Fiction Writing Team" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "rgba(232,57,29,0.2)", mixBlendMode: "multiply" }} />
                            <div className="absolute" style={{ bottom: -20, right: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.25)", zIndex: -1 }} />
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <motion.div variants={fadeUp} className="fw-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="fw-eyebrow-line" /><span className="fw-eyebrow-text">WHY BEXLEY PUBLISHING</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="fw-why-h2">
                                EMPOWERING AUTHORS TO BRING <br /><span className="accent">IDEAS TO LIFE</span>
                            </motion.h2>
                            <motion.div variants={staggerContainer} className="fw-why-list">
                                {["Deep Character Psychology — We create emotionally layered characters with believable motivations, flaws, and personal growth.", "Genre Focused Storytelling — We understand the unique expectations, tone, and style of every fiction genre.", "Immersive Fiction Worlds — We develop rich settings and environments that readers can clearly imagine and experience.", "Emotion-Driven Writing — We craft scenes that build emotional connection and keep readers invested throughout the story.", "Consistent Story Development — We maintain logical timelines, character continuity, and smooth storytelling from beginning to end."].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="fw-why-item">
                                        <div className="fw-why-icon"><CheckCircle2 size={14} style={{ color: "#e8391d" }} /></div>
                                        <p className="fw-why-text">{item}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <section className="fw-faqs">
                    <div className="fw-faqs-inner">
                        <div className="fw-faqs-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="fw-faqs-h2">
                                FREQUENTLY ASKED <span className="accent">QUESTIONS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="fw-faqs-list">
                            {faqs.map(({ q, a }, i) => (
                                <motion.div key={i} variants={fadeUp} className="fw-faq-item">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="fw-faq-trigger">
                                        <span className="fw-faq-q">{q}</span>
                                        <div className={`fw-faq-icon ${openFaq === i ? "open" : "closed"}`}>
                                            {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }} style={{ overflow: "hidden" }}>
                                                <div className="fw-faq-answer">{a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="fw-cta">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="fw-cta-inner">
                        <h2 className="fw-cta-h2">DON'T JUST IMAGINE THE STORY. WRITE IT.</h2>
                        <p className="fw-cta-sub">From worldbuilding to final edits, we guide your fiction journey from concept to completed manuscript.</p>
                        <div className="fw-cta-btns">
                            <button
                                type="button"
                                className="fw-cta-btn-dark"
                                onClick={() => setQuoteModal(true)}
                            >
                                <FileText size={16} />
                                Start Your Book
                            </button>
                            <a href="tel:2797770380" className="fw-cta-btn-border"><Phone size={16} /> Call Us Now</a>
                        </div>
                    </motion.div>
                </section>

                <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />

            </main>
        </>
    );
} 