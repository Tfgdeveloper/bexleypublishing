"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    Rocket, ArrowRight, CheckCircle2, Cpu, Globe, Zap,
    BookOpen, PenTool, Minus, Plus, Phone, Users, FlaskConical, Orbit,
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
    { icon: Orbit, title: "Space Opera", desc: "Featuring grand adventure in space, often including depictions of aliens and unique technologies." },
    { icon: Cpu, title: "Cyberpunk", desc: "Blending unconventional technology with societal downfall or decay." },
    { icon: FlaskConical, title: "Hard Sci-Fi", desc: "Emphasizing intensely on scientific accuracy, technical detail, and rational extrapolation." },
    { icon: Zap, title: "Dystopian & Post-Apocalyptic", desc: "Focusing on survival after catastrophe and the rise of oppressive societies." },
];

const processSteps = [
    { step: "01", title: "CONCEPT & WORLDBUILDING", desc: "We use emotionally grounded conflicts and believable speculative ideas to build compelling futuristic worlds.", icon: Globe },
    { step: "02", title: "PLOTTING & CHARACTER DEVELOPMENT", desc: "We focus on driving emotional connection with readers by creating meaningful conflicts, character arcs, and suspenseful journeys.", icon: Cpu },
    { step: "03", title: "DRAFTING & NARRATIVE FLOW", desc: "We reveal technology naturally through action, dialogue, atmosphere, and immersive storytelling momentum.", icon: Users },
    { step: "04", title: "REFINING & FINAL POLISHING", desc: "We reinforce plot consistency, scientific realism, pacing, and a strong futuristic narrative structure.", icon: PenTool },
];

const faqs = [
    { q: "Do I need a strong knowledge base to write science fiction?", a: "No need at all. You just need a basic understanding of scientific concepts to create believable worlds and advanced yet realistic technologies. With this understanding, you can be a worthy author of futuristic storytelling." },
    { q: "How do you keep futuristic worlds consistent throughout the story?", a: "Our sci-fi writers take a careful approach to tracking timelines, technologies, directions, and character details. This way, a smooth, logical, and believable storytelling is maintained all the way through." },
    { q: "Can you create alien species and futuristic cultures?", a: "Yes, we make readers feel creative, immersive, and believable by designing unique alien races, cultures, behaviors, languages, and atmospheres." },
    { q: "What is the difference between Hard Sci-Fi and Space Opera genres?", a: "Scientific realism is the core of hard sci-fi writing, while Space Opera emphasizes exploration, action, adventure, and grand-scale ultramodern conflicts across galaxies." },
    { q: "How much time does your writer take to complete a Sci-Fi novel?", a: "It depends on various factors, including complexity, research, worldbuilding, and story length. A writing project, like a novel, usually takes several weeks or months." },
];

export default function SciFiWritingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);


    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .sf-main { width: 100%; overflow: hidden; font-family: 'Raleway', Arial, sans-serif; }

                .sf-eyebrow { display: flex; align-items: center; gap: 12px; }
                .sf-eyebrow.center { justify-content: center; }
                .sf-eyebrow-line { display: block; width: 32px; height: 2px; background: #e8391d; flex-shrink: 0; }
                .sf-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }

                /* ══ S1 HERO ══ */
                .sf-hero { position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #05070f; overflow: hidden; padding: 112px 0 48px; }
                .sf-hero-inner { position: relative; z-index: 10; text-align: center; padding: 0 24px; max-width: 1000px; margin: 0 auto; }
                .sf-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.95; margin-bottom: 32px; font-size: clamp(3rem, 8vw, 7rem); }
                .sf-hero-h1 .accent { color: #e8391d; }
                .sf-hero-sub { color: rgba(255,255,255,0.6); line-height: 1.85; max-width: 680px; margin: 0 auto 40px; font-size: clamp(0.9rem, 1.1vw, 1.05rem); }
                .sf-hero-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
                .sf-btn-primary { display: inline-flex; align-items: center; gap: 12px; background: #e8391d; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease; }
                .sf-btn-primary:hover { background: #c0271a; gap: 16px; box-shadow: 0 10px 40px rgba(232,57,29,0.4); }
                .sf-btn-outline { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
                .sf-btn-outline:hover { border-color: #e8391d; color: #e8391d; }

                /* ══ S2 OVERVIEW ══ */
                .sf-overview { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .sf-overview-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
                .sf-overview-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; margin-bottom: 24px; font-size: clamp(2rem, 3.8vw, 3.2rem); }
                .sf-overview-h2 .accent { color: #e8391d; }
                .sf-overview-body { color: #6b7280; line-height: 1.85; margin-bottom: 20px; font-size: 0.95rem; }
                .sf-overview-checklist { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
                .sf-check-item { display: flex; align-items: center; gap: 12px; }
                .sf-check-item span { color: rgba(0,0,0,0.8); font-weight: 600; font-size: 14px; }
                .sf-overview-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.2); aspect-ratio: 4/5; }

                /* ══ S3 SUB-GENRES ══ */
                .sf-genres { position: relative; width: 100%; background: #05070f; padding: 128px 0; overflow: hidden; }
                .sf-genres-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 10; }
                .sf-genres-header { text-align: center; margin-bottom: 64px; overflow: hidden; }
                .sf-genres-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .sf-genres-h2 .accent { color: #e8391d; }
                .sf-genres-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .sf-genre-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; display: flex; gap: 24px; align-items: flex-start; cursor: default; transition: border-color 0.5s ease; }
                .sf-genre-card:hover { border-color: rgba(232,57,29,0.5); }
                .sf-genre-icon { width: 56px; height: 56px; border-radius: 12px; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .sf-genre-card:hover .sf-genre-icon { background: #e8391d; }
                .sf-genre-card:hover .sf-genre-icon svg { color: white !important; }
                .sf-genre-title { font-weight: 900; color: white; text-transform: uppercase; font-size: 17px; margin-bottom: 8px; letter-spacing: 0.04em; }
                .sf-genre-desc { color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.65; }

                /* ══ S4 PROCESS ══ */
                .sf-process { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .sf-process-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .sf-process-header { text-align: center; margin-bottom: 80px; }
                .sf-process-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .sf-process-h2 .accent { color: #e8391d; }
                .sf-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; position: relative; }
                .sf-process-line { display: block; position: absolute; top: 32px; left: 12%; right: 12%; height: 2px; background: #e5e7eb; z-index: 0; }
                .sf-process-card { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .sf-process-circle { width: 64px; height: 64px; border-radius: 50%; background: #e8391d; border: 4px solid #faf9f7; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(232,57,29,0.2); }
                .sf-process-step { color: #e8391d; font-weight: 900; font-size: 12px; letter-spacing: 0.15em; margin-bottom: 8px; }
                .sf-process-title { font-weight: 900; color: black; text-transform: uppercase; font-size: 14px; margin-bottom: 12px; letter-spacing: 0.04em; line-height: 1.3; }
                .sf-process-desc { color: #6b7280; font-size: 14px; line-height: 1.65; max-width: 220px; }

                /* ══ S5 WHY CHOOSE ══ */
                .sf-why { position: relative; width: 100%; background: #111; padding: 128px 0; overflow: hidden; }
                .sf-why-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
                .sf-why-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.4); aspect-ratio: 1/1; }
                .sf-why-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 40px; font-size: clamp(2rem, 3.5vw, 3rem); }
                .sf-why-h2 .accent { color: #e8391d; }
                .sf-why-list { display: flex; flex-direction: column; gap: 20px; }
                .sf-why-item { display: flex; align-items: flex-start; gap: 16px; }
                .sf-why-icon { margin-top: 4px; width: 24px; height: 24px; border-radius: 50%; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .sf-why-item:hover .sf-why-icon { background: #e8391d; }
                .sf-why-item:hover .sf-why-icon svg { color: white !important; }
                .sf-why-text { color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.65; }

                /* ══ S6 FAQS ══ */
                .sf-faqs { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .sf-faqs-inner { max-width: 900px; margin: 0 auto; padding: 0 32px; }
                .sf-faqs-header { text-align: center; margin-bottom: 64px; }
                .sf-faqs-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2rem, 4vw, 3rem); }
                .sf-faqs-h2 .accent { color: #e8391d; }
                .sf-faqs-list { display: flex; flex-direction: column; gap: 16px; }
                .sf-faq-item { background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: border-color 0.3s ease; }
                .sf-faq-item:hover { border-color: rgba(232,57,29,0.3); }
                .sf-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 24px; text-align: left; background: none; border: none; cursor: pointer; font-family: 'Raleway', Arial, sans-serif; }
                .sf-faq-q { font-weight: 700; color: black; font-size: 15px; padding-right: 16px; line-height: 1.4; }
                .sf-faq-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
                .sf-faq-icon.open { background: #e8391d; color: white; }
                .sf-faq-icon.closed { background: #f3f4f6; color: rgba(0,0,0,0.5); }
                .sf-faq-answer { padding: 0 24px 24px; color: #6b7280; font-size: 14px; line-height: 1.75; }

                /* ══ S7 CTA ══ */
                .sf-cta { position: relative; width: 100%; background: #e8391d; padding: 112px 0; overflow: hidden; }
                .sf-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 0 32px; position: relative; z-index: 10; }
                .sf-cta-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; font-size: clamp(2rem, 3.5vw, 3rem); }
                .sf-cta-sub { color: rgba(255,255,255,0.8); font-size: 18px; max-width: 560px; margin: 0 auto 40px; line-height: 1.65; }
                .sf-cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
                .sf-cta-btn-dark { display: inline-flex; align-items: center; gap: 12px; background: black; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .sf-cta-btn-dark:hover { background: white; color: #e8391d; gap: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
                .sf-cta-btn-border { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: gap 0.2s ease; }
                .sf-cta-btn-border:hover { gap: 16px; }


                /* ══════════════════════════════════════
                   2560px — 4K
                ══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .sf-hero { padding: 160px 0 80px; }
                    .sf-hero-inner { max-width: 1800px; }
                    .sf-hero-h1 { font-size: clamp(5rem, 8vw, 11rem); margin-bottom: 52px; }
                    .sf-hero-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 1100px; margin-bottom: 60px; }
                    .sf-btn-primary, .sf-btn-outline { font-size: 16px; padding: 22px 52px; border-radius: 18px; }
                    .sf-hero-btns { gap: 28px; }

                    .sf-overview-inner, .sf-genres-inner, .sf-process-inner, .sf-why-inner { max-width: 2200px; padding: 0 160px; }
                    .sf-faqs-inner { max-width: 1600px; padding: 0 160px; }
                    .sf-cta-inner { max-width: 1400px; padding: 0 60px; }
                    .sf-overview, .sf-genres, .sf-process, .sf-why, .sf-faqs, .sf-cta { padding: 200px 0; }

                    .sf-overview-inner { gap: 120px; }
                    .sf-overview-h2 { font-size: clamp(3rem, 3.5vw, 5.5rem); margin-bottom: 40px; }
                    .sf-overview-body { font-size: 1.25rem; line-height: 1.9; }
                    .sf-overview-checklist { gap: 24px; }
                    .sf-check-item span { font-size: 18px; }

                    .sf-genres-header { margin-bottom: 100px; }
                    .sf-genres-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .sf-genres-grid { gap: 40px; }
                    .sf-genre-card { padding: 52px; gap: 36px; border-radius: 24px; }
                    .sf-genre-icon { width: 76px; height: 76px; border-radius: 18px; }
                    .sf-genre-title { font-size: 22px; }
                    .sf-genre-desc { font-size: 18px; }

                    .sf-process-header { margin-bottom: 120px; }
                    .sf-process-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .sf-process-grid { gap: 52px; }
                    .sf-process-circle { width: 88px; height: 88px; margin-bottom: 36px; }
                    .sf-process-title { font-size: 17px; margin-bottom: 16px; }
                    .sf-process-desc { font-size: 18px; max-width: 320px; }
                    .sf-process-step { font-size: 15px; }

                    .sf-why-inner { gap: 120px; }
                    .sf-why-h2 { font-size: clamp(3rem, 3.5vw, 5rem); margin-bottom: 60px; }
                    .sf-why-list { gap: 28px; }
                    .sf-why-text { font-size: 19px; }
                    .sf-why-icon { width: 32px; height: 32px; }

                    .sf-faqs-header { margin-bottom: 80px; }
                    .sf-faqs-h2 { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .sf-faq-trigger { padding: 36px; }
                    .sf-faq-q { font-size: 19px; }
                    .sf-faq-answer { padding: 0 36px 36px; font-size: 17px; }
                    .sf-faq-icon { width: 44px; height: 44px; }
                    .sf-faqs-list { gap: 24px; }

                    .sf-cta-h2 { font-size: clamp(3rem, 3.5vw, 5.5rem); }
                    .sf-cta-sub { font-size: 24px; max-width: 800px; }
                    .sf-cta-btn-dark, .sf-cta-btn-border { font-size: 18px; padding: 26px 60px; border-radius: 18px; }
                    .sf-cta-btns { gap: 32px; }
                }

                /* ══════════════════════════════════════
                   1920px — Full HD
                ══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .sf-hero { padding: 130px 0 60px; }
                    .sf-hero-inner { max-width: 1400px; }
                    .sf-hero-h1 { font-size: clamp(4rem, 7vw, 9rem); }
                    .sf-hero-sub { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 900px; }
                    .sf-btn-primary, .sf-btn-outline { font-size: 14px; padding: 20px 44px; }

                    .sf-overview-inner, .sf-genres-inner, .sf-process-inner, .sf-why-inner { max-width: 1700px; padding: 0 130px; }
                    .sf-faqs-inner { max-width: 1200px; padding: 0 64px; }
                    .sf-overview, .sf-genres, .sf-process, .sf-why, .sf-faqs, .sf-cta { padding: 160px 0; }

                    .sf-overview-inner { gap: 100px; }
                    .sf-overview-h2 { font-size: clamp(2.6rem, 3.5vw, 4.5rem); }
                    .sf-overview-body { font-size: 1.1rem; }
                    .sf-check-item span { font-size: 16px; }

                    .sf-genres-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .sf-genres-grid { gap: 32px; }
                    .sf-genre-card { padding: 44px; gap: 28px; }
                    .sf-genre-icon { width: 64px; height: 64px; }
                    .sf-genre-title { font-size: 20px; }
                    .sf-genre-desc { font-size: 16px; }

                    .sf-process-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .sf-process-grid { gap: 44px; }
                    .sf-process-circle { width: 72px; height: 72px; }
                    .sf-process-title { font-size: 16px; }
                    .sf-process-desc { font-size: 16px; }

                    .sf-why-inner { gap: 100px; }
                    .sf-why-h2 { font-size: clamp(2.5rem, 3.2vw, 4.2rem); }
                    .sf-why-text { font-size: 17px; }

                    .sf-faqs-h2 { font-size: clamp(2.5rem, 3.5vw, 5rem); }
                    .sf-faq-q { font-size: 17px; }
                    .sf-faq-answer { font-size: 15px; }

                    .sf-cta-h2 { font-size: clamp(2.5rem, 3.2vw, 5rem); }
                    .sf-cta-sub { font-size: 21px; }
                    .sf-cta-btn-dark, .sf-cta-btn-border { font-size: 16px; padding: 22px 52px; }
                    .sf-cta-inner { max-width: 1200px; }
                }

                /* ══════════════════════════════════════
                   1440px
                ══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .sf-overview-inner, .sf-genres-inner, .sf-process-inner, .sf-why-inner { max-width: 1360px; padding: 0 96px; }
                    .sf-overview, .sf-genres, .sf-process, .sf-why, .sf-faqs, .sf-cta { padding: 140px 0; }
                    .sf-overview-inner { gap: 88px; }
                    .sf-overview-h2 { font-size: clamp(2.2rem, 3.5vw, 3.6rem); }
                    .sf-genres-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .sf-process-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .sf-why-h2 { font-size: clamp(2.2rem, 3.2vw, 3.6rem); }
                    .sf-cta-h2 { font-size: clamp(2.2rem, 3.2vw, 3.4rem); }
                }

                /* ══════════════════════════════════════
                   1280px
                ══════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .sf-overview-inner, .sf-genres-inner, .sf-process-inner, .sf-why-inner { max-width: 1160px; padding: 0 64px; }
                }

                /* ══════════════════════════════════════
                   1024px
                ══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .sf-overview-inner, .sf-genres-inner, .sf-process-inner, .sf-why-inner { padding: 0 48px; }
                    .sf-faqs-inner { padding: 0 48px; }
                    .sf-overview, .sf-genres, .sf-process, .sf-why, .sf-faqs, .sf-cta { padding: 96px 0; }
                    .sf-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .sf-overview-img-wrap { display: none; }
                    .sf-overview-h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); }
                    .sf-genres-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .sf-genre-card { padding: 24px; gap: 18px; }
                    .sf-genre-icon { width: 44px; height: 44px; }
                    .sf-process-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
                    .sf-process-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .sf-process-line { display: none; }
                    .sf-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .sf-why-img-wrap { display: none; }
                    .sf-why-h2 { font-size: clamp(1.8rem, 3.2vw, 2.6rem); }
                    .sf-cta-h2 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); }
                    .sf-cta-sub { font-size: 15px; }
                    .sf-cta-btn-dark, .sf-cta-btn-border { font-size: 12px; padding: 16px 28px; }
                }

                /* ══════════════════════════════════════
                   900px — Tablet
                ══════════════════════════════════════ */
                @media (max-width: 900px) {
                    .sf-overview-inner, .sf-genres-inner, .sf-process-inner, .sf-why-inner { padding: 0 40px; }
                    .sf-faqs-inner { padding: 0 40px; }
                    .sf-overview, .sf-genres, .sf-process, .sf-why, .sf-faqs, .sf-cta { padding: 80px 0; }
                    .sf-hero-h1 { font-size: clamp(2.8rem, 7vw, 5rem); }
                    .sf-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .sf-overview-img-wrap { display: none; }
                    .sf-overview-h2 { font-size: clamp(1.8rem, 4.5vw, 2.8rem); }
                    .sf-genres-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .sf-genres-header { margin-bottom: 40px; }
                    .sf-process-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
                    .sf-process-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .sf-process-header { margin-bottom: 48px; }
                    .sf-process-line { display: none; }
                    .sf-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .sf-why-img-wrap { display: none; }
                    .sf-why-h2 { font-size: clamp(1.8rem, 5vw, 2.6rem); }
                    .sf-cta-h2 { font-size: clamp(1.8rem, 5vw, 2.6rem); }
                    .sf-cta-sub { font-size: 15px; }
                }

                /* ══════════════════════════════════════
                   768px
                ══════════════════════════════════════ */
                @media (max-width: 768px) {
                    .sf-overview-inner, .sf-genres-inner, .sf-process-inner, .sf-why-inner { padding: 0 32px; }
                    .sf-faqs-inner { padding: 0 32px; }
                    .sf-hero-h1 { font-size: clamp(2.4rem, 8vw, 4rem); }
                    .sf-genre-card { padding: 20px; gap: 16px; }
                    .sf-genre-icon { width: 40px; height: 40px; }
                    .sf-faq-trigger { padding: 20px; }
                    .sf-cta-h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); }
                }

                /* ══════════════════════════════════════
                   640px — Large Mobile
                ══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .sf-overview-inner, .sf-genres-inner, .sf-process-inner, .sf-why-inner { padding: 0 20px; }
                    .sf-faqs-inner { padding: 0 20px; }
                    .sf-cta-inner { padding: 0 20px; }
                    .sf-overview, .sf-genres, .sf-process, .sf-why, .sf-faqs, .sf-cta { padding: 56px 0; }
                    .sf-hero-h1 { font-size: clamp(2.2rem, 9vw, 3.5rem); margin-bottom: 20px; }
                    .sf-hero-sub { font-size: 0.875rem; margin-bottom: 28px; }
                    .sf-btn-primary, .sf-btn-outline { font-size: 11px; padding: 13px 22px; border-radius: 10px; width: 100%; justify-content: center; }
                    .sf-hero-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .sf-overview-h2 { font-size: clamp(1.5rem, 6.5vw, 2.2rem); }
                    .sf-overview-body { font-size: 0.875rem; }
                    .sf-overview-checklist { gap: 12px; }
                    .sf-check-item span { font-size: 13px; }
                    .sf-genres-grid { grid-template-columns: 1fr; gap: 14px; }
                    .sf-genres-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .sf-genre-card { padding: 18px; gap: 14px; border-radius: 12px; }
                    .sf-genre-icon { width: 36px; height: 36px; border-radius: 9px; }
                    .sf-genre-title { font-size: 14px; }
                    .sf-genre-desc { font-size: 13px; }
                    .sf-process-grid { grid-template-columns: 1fr; gap: 28px; }
                    .sf-process-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .sf-process-header { margin-bottom: 36px; }
                    .sf-process-circle { width: 52px; height: 52px; margin-bottom: 16px; }
                    .sf-process-title { font-size: 13px; margin-bottom: 8px; }
                    .sf-process-desc { font-size: 13px; }
                    .sf-why-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); margin-bottom: 28px; }
                    .sf-why-text { font-size: 13.5px; }
                    .sf-why-list { gap: 14px; }
                    .sf-faqs-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .sf-faqs-header { margin-bottom: 36px; }
                    .sf-faq-q { font-size: 13.5px; }
                    .sf-faq-answer { font-size: 13px; }
                    .sf-faq-trigger { padding: 16px; }
                    .sf-cta-h2 { font-size: clamp(1.5rem, 7.5vw, 2.2rem); }
                    .sf-cta-sub { font-size: 14px; }
                    .sf-cta-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .sf-cta-btn-dark, .sf-cta-btn-border { font-size: 11px; padding: 14px 24px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ══════════════════════════════════════
                   480px
                ══════════════════════════════════════ */
                @media (max-width: 480px) {
                    .sf-hero-h1 { font-size: clamp(2rem, 9.5vw, 3rem); }
                    .sf-overview-h2, .sf-genres-h2, .sf-process-h2, .sf-why-h2, .sf-faqs-h2, .sf-cta-h2 { font-size: clamp(1.35rem, 7.5vw, 1.9rem); }
                }

                /* ══════════════════════════════════════
                   380px — iPhone SE
                ══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .sf-overview-inner, .sf-genres-inner, .sf-process-inner, .sf-why-inner { padding: 0 14px; }
                    .sf-faqs-inner, .sf-cta-inner { padding: 0 14px; }
                    .sf-hero-h1 { font-size: clamp(1.8rem, 9vw, 2.6rem); }
                    .sf-overview-h2, .sf-genres-h2, .sf-process-h2, .sf-why-h2, .sf-faqs-h2, .sf-cta-h2 { font-size: 1.25rem; }
                    .sf-genre-card { padding: 14px; gap: 12px; }
                    .sf-cta-btn-dark, .sf-cta-btn-border { font-size: 10px; padding: 12px 18px; }
                }

                /* ══════════════════════════════════════
                   320px
                ══════════════════════════════════════ */
                @media (max-width: 320px) {
                    .sf-overview-inner, .sf-genres-inner, .sf-process-inner, .sf-why-inner { padding: 0 12px; }
                    .sf-faqs-inner, .sf-cta-inner { padding: 0 12px; }
                    .sf-hero-h1 { font-size: 1.7rem; }
                    .sf-overview-h2, .sf-genres-h2, .sf-process-h2, .sf-why-h2, .sf-faqs-h2, .sf-cta-h2 { font-size: 1.1rem; }
                }
            `}</style>

            <main className="sf-main">

                {/* S1 HERO */}
                <section className="sf-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <div className="absolute pointer-events-none" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 900, background: "rgba(232,57,29,0.1)", borderRadius: "50%", filter: "blur(200px)" }} />
                    <div className="sf-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="sf-eyebrow center" style={{ marginBottom: 24 }}>
                            <Rocket size={16} style={{ color: "#e8391d" }} />
                            <span className="sf-eyebrow-text">Science Fiction Writing</span>
                        </motion.div>
                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="sf-hero-h1">
                            BUILDING WORLDS <br /><span className="accent">BEYOND IMAGINATION.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="sf-hero-sub">
                            Let our sci-fi writers start your project with a central "what if" concept, establishing consistent world rules, and exploring how futuristic elements impact human characters.
                        </motion.p>

                        <HeroButtons />
                    </div>
                </section>

                {/* S2 OVERVIEW */}
                <section id="overview" ref={overviewRef} className="sf-overview">
                    <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="sf-overview-inner">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <motion.div variants={fadeUp} className="sf-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="sf-eyebrow-line" /><span className="sf-eyebrow-text">World-Building Experts</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="sf-overview-h2">
                                CRAFT A GRIPPING <span className="accent">SCIENCE FICTION BOOK.</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="sf-overview-body">
                                Writing a mesmerizing science fiction book requires a strong speculative "What if?" premise, coupled with grounded, emotionally resonant human experiences. An author's characters' actions and observations in sci-fi writing allow advanced technologies and environments to reveal themselves naturally.
                            </motion.p>
                            <motion.p variants={fadeUp} className="sf-overview-body" style={{ marginBottom: 32 }}>
                                A well-written sci-fi story includes excitement, adventure, a fascinating, memorable world, and truly unique characters and relationships. And our sci-fi writers focus exactly on these aspects to captivate readers.
                            </motion.p>
                            <motion.div variants={staggerContainer} className="sf-overview-checklist">
                                {["Powerful 'What If?' Concepts", "Emotionally Driven Characters", "Immersive Futuristic Worlds", "Suspense, Adventure & Discovery"].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="sf-check-item">
                                        <CheckCircle2 size={18} style={{ color: "#e8391d", flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="sf-overview-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/sci-fi-writing/01.webp" alt="Sci-Fi Writing Service" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                            <div className="absolute" style={{ bottom: -20, left: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.2)", zIndex: -1 }} />
                        </motion.div>
                    </motion.div>
                </section>

                {/* S3 SUB-GENRES */}
                <section className="sf-genres">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="sf-genres-inner">
                        <div className="sf-genres-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="sf-eyebrow center" style={{ marginBottom: 16 }}>
                                <Globe size={16} style={{ color: "#e8391d" }} /><span className="sf-eyebrow-text">Specializations</span>
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sf-genres-h2">
                                WE COVER ALL MAJOR SUBGENRES <span className="accent">OF SCIENCE FICTION</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sf-genres-grid">
                            {subGenres.map(({ icon: Icon, title, desc }) => (
                                <motion.div key={title} variants={fadeUp} className="sf-genre-card">
                                    <div className="sf-genre-icon"><Icon size={26} style={{ color: "#e8391d" }} /></div>
                                    <div>
                                        <h3 className="sf-genre-title">{title}</h3>
                                        <p className="sf-genre-desc">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S4 PROCESS */}
                <section className="sf-process">
                    <div className="sf-process-inner">
                        <div className="sf-process-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sf-process-h2">
                                OUR SCI-FI WRITING <span className="accent">PROCESS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sf-process-grid">
                            <div className="sf-process-line" />
                            {processSteps.map(({ step, title, desc, icon: Icon }) => (
                                <motion.div key={step} variants={fadeUp} className="sf-process-card">
                                    <div className="sf-process-circle"><Icon size={24} style={{ color: "white" }} /></div>
                                    <span className="sf-process-step">{step}</span>
                                    <h3 className="sf-process-title">{title}</h3>
                                    <p className="sf-process-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S5 WHY CHOOSE */}
                <section className="sf-why">
                    <div className="sf-why-inner">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sf-why-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/sci-fi-writing/02.webp" alt="Sci-Fi Writing Team" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "rgba(232,57,29,0.2)", mixBlendMode: "multiply" }} />
                            <div className="absolute" style={{ bottom: -20, right: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.25)", zIndex: -1 }} />
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <motion.div variants={fadeUp} className="sf-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="sf-eyebrow-line" /><span className="sf-eyebrow-text">WHY BEXLEY PUBLISHING</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="sf-why-h2">
                                TAKING CRAZY CONCEPTS AND APPLYING THEM TO <br /><span className="accent">REAL WORLD ISSUES.</span>
                            </motion.h2>
                            <motion.div variants={staggerContainer} className="sf-why-list">
                                {["Consistent Worldbuilding — We make sure consistent history, technology, and story rules to track your detailed worlds.", "Realistic Future Technology — We ensure your project presents realistic science and believable futuristic technologies.", "Logical Story Progression — We ensure strong timelines and smooth, logical storytelling.", "Unique Alien Civilizations — We create unique alien cultures and hi-tech civilizations.", "Immersive Planet Atmospheres — We make sure immersive environments so readers can clearly see and feel."].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="sf-why-item">
                                        <div className="sf-why-icon"><CheckCircle2 size={14} style={{ color: "#e8391d" }} /></div>
                                        <p className="sf-why-text">{item}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* S6 FAQS */}
                <section className="sf-faqs">
                    <div className="sf-faqs-inner">
                        <div className="sf-faqs-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sf-faqs-h2">
                                FREQUENTLY ASKED <span className="accent">QUESTIONS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sf-faqs-list">
                            {faqs.map(({ q, a }, i) => (
                                <motion.div key={i} variants={fadeUp} className="sf-faq-item">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="sf-faq-trigger">
                                        <span className="sf-faq-q">{q}</span>
                                        <div className={`sf-faq-icon ${openFaq === i ? "open" : "closed"}`}>
                                            {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }} style={{ overflow: "hidden" }}>
                                                <div className="sf-faq-answer">{a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S7 CTA */}
                <section className="sf-cta">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sf-cta-inner">
                        <h2 className="sf-cta-h2">READY TO CHALLENGE REALITY, HINT AT FUTURISTIC STAKES, OR POSE PHILOSOPHICAL QUESTIONS?</h2>
                        <p className="sf-cta-sub">Writing science fiction is a big undertaking in a big genre. If you're ready, let us explore the expanse of the universe you have in your mind.</p>
                        <div className="sf-cta-btns">
                            <button
                                type="button"
                                className="sf-cta-btn-dark"
                                onClick={() => setQuoteModal(true)}
                            >
                                <FileText size={16} />
                                Start Your Book
                            </button>
                            <a href="tel:2797770380" className="sf-cta-btn-border"><Phone size={16} /> Call Us Now</a>
                        </div>
                    </motion.div>

                    <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />

                </section>

            </main>
        </>
    );
}