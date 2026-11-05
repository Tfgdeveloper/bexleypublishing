"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    PenTool, ArrowRight, CheckCircle2, ShieldCheck, Fingerprint, Mic,
    BookOpen, UserCircle, Briefcase, Heart, Minus, Plus, Phone, Lock, Sparkles,
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

const categories = [
    { icon: UserCircle, title: "MEMOIRS & AUTOBIOGRAPHIES", desc: "Covers your life story and tells the emotional journey with depth and authenticity." },
    { icon: Briefcase, title: "BUSINESS & THOUGHT LEADERSHIP", desc: "Focuses on disseminating specific industry knowledge, scaling operational expertise, and establishing profound authority." },
    { icon: Heart, title: "FICTION & NOVEL SERIES", desc: "Features compelling characters, evolving worlds, and remarkable multi-book storytelling experiences." },
    { icon: Sparkles, title: "SELF-HELP & WELLNESS", desc: "Inspires healthier habits, confidence, balance, and lasting transformation, ensuring positive lifestyle changes." },
];

const processSteps = [
    { step: "01", title: "DISCOVERY & STORY MAPPING", desc: "Detailed collaborative conversations help us uncover your experiences, ideas, and direction.", icon: Mic },
    { step: "02", title: "TONE DEVELOPMENT & STRUCTURE", desc: "Our editorial team captures your natural voice and tone, which helps them build a compelling book framework.", icon: Fingerprint },
    { step: "03", title: "MANUSCRIPT CREATION & REVIEWS", desc: "Your input and approval are needed for each chapter professionally written.", icon: PenTool },
    { step: "04", title: "EDITING, PROTECTION & OWNERSHIP", desc: "Final refinements, confidentiality assurance, and full publishing rights transferred directly to you.", icon: ShieldCheck },
];

const faqs = [
    { q: "Will my audience know my book was written by a ghostwriter?", a: "No, it's impossible. The overall creative process by our ghostwriters is kept confidential, while your name appears as the author." },
    { q: "How do you make sure the writing sounds like me?", a: "We work on your personality, voice, and tone, and your overall conversations, and then we adopt a writing style you actually want. This way, we authentically reflect your natural voice throughout." },
    { q: "Do I keep full ownership and earnings from my book?", a: "Yes. Once your manuscript has been published, you're the only owner. You will have complete copyright ownership, publishing rights, and all royalties generated from your published book." },
    { q: "How is ghostwriting different from standard book writing services?", a: "Unlike traditional writing services that may not personalize the narrative, ghostwriting means a writing style that focuses entirely on your voice." },
    { q: "Can I share the rough ideas I got or other materials I extracted from my research?", a: "Absolutely. Anything you provide helps our writing experts create a masterpiece containing compelling content." },
];

export default function GhostwritingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .gw-main { width: 100%; overflow: hidden; font-family: 'Raleway', Arial, sans-serif; }

                /* shared */
                .gw-eyebrow { display: flex; align-items: center; gap: 12px; }
                .gw-eyebrow.center { justify-content: center; }
                .gw-eyebrow-line { display: block; width: 32px; height: 2px; background: #e8391d; flex-shrink: 0; }
                .gw-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }

                /* ══ S1 HERO ══ */
                .gw-hero { position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #05070f; overflow: hidden; padding: 112px 0 48px; }
                .gw-hero-inner { position: relative; z-index: 10; text-align: center; padding: 0 24px; max-width: 1000px; margin: 0 auto; }
                .gw-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.95; margin-bottom: 32px; font-size: clamp(2.5rem, 6vw, 4rem); }
                .gw-hero-h1 .accent { color: #e8391d; }
                .gw-hero-sub { color: rgba(255,255,255,0.6); line-height: 1.85; max-width: 680px; margin: 0 auto 40px; font-size: clamp(0.9rem, 1.1vw, 1.05rem); }
                .gw-hero-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
                .gw-btn-primary { display: inline-flex; align-items: center; gap: 12px; background: #e8391d; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease; }
                .gw-btn-primary:hover { background: #c0271a; gap: 16px; box-shadow: 0 10px 40px rgba(232,57,29,0.4); }
                .gw-btn-outline { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
                .gw-btn-outline:hover { border-color: #e8391d; color: #e8391d; }

                /* ══ S2 OVERVIEW ══ */
                .gw-overview { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .gw-overview-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
                .gw-overview-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; margin-bottom: 24px; font-size: clamp(2rem, 3.8vw, 3.2rem); }
                .gw-overview-h2 .accent { color: #e8391d; }
                .gw-overview-body { color: #6b7280; line-height: 1.85; margin-bottom: 20px; font-size: 0.95rem; }
                .gw-overview-checklist { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
                .gw-check-item { display: flex; align-items: center; gap: 12px; }
                .gw-check-item span { color: rgba(0,0,0,0.8); font-weight: 600; font-size: 14px; }
                .gw-overview-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.2); aspect-ratio: 4/5; }

                /* ══ S3 CATEGORIES ══ */
                .gw-cats { position: relative; width: 100%; background: #05070f; padding: 128px 0; overflow: hidden; }
                .gw-cats-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 10; }
                .gw-cats-header { text-align: center; margin-bottom: 64px; overflow: hidden; }
                .gw-cats-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .gw-cats-h2 .accent { color: #e8391d; }
                .gw-cats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .gw-cat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; display: flex; gap: 24px; align-items: flex-start; cursor: default; transition: border-color 0.5s ease; }
                .gw-cat-card:hover { border-color: rgba(232,57,29,0.5); }
                .gw-cat-icon { width: 56px; height: 56px; border-radius: 12px; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .gw-cat-card:hover .gw-cat-icon { background: #e8391d; }
                .gw-cat-card:hover .gw-cat-icon svg { color: white !important; }
                .gw-cat-title { font-weight: 900; color: white; text-transform: uppercase; font-size: 17px; margin-bottom: 8px; letter-spacing: 0.04em; }
                .gw-cat-desc { color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.65; }

                /* ══ S4 PROCESS ══ */
                .gw-process { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .gw-process-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .gw-process-header { text-align: center; margin-bottom: 80px; }
                .gw-process-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .gw-process-h2 .accent { color: #e8391d; }
                .gw-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; position: relative; }
                .gw-process-line { display: block; position: absolute; top: 32px; left: 12%; right: 12%; height: 2px; background: #e5e7eb; z-index: 0; }
                .gw-process-card { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .gw-process-circle { width: 64px; height: 64px; border-radius: 50%; background: #e8391d; border: 4px solid #faf9f7; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(232,57,29,0.2); }
                .gw-process-step { color: #e8391d; font-weight: 900; font-size: 12px; letter-spacing: 0.15em; margin-bottom: 8px; }
                .gw-process-title { font-weight: 900; color: black; text-transform: uppercase; font-size: 15px; margin-bottom: 12px; letter-spacing: 0.04em; }
                .gw-process-desc { color: #6b7280; font-size: 14px; line-height: 1.65; max-width: 220px; }

                /* ══ S5 WHY CHOOSE ══ */
                .gw-why { position: relative; width: 100%; background: #111; padding: 128px 0; overflow: hidden; }
                .gw-why-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
                .gw-why-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.4); aspect-ratio: 1/1; }
                .gw-why-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 40px; font-size: clamp(2rem, 3.5vw, 3rem); }
                .gw-why-h2 .accent { color: #e8391d; }
                .gw-why-list { display: flex; flex-direction: column; gap: 20px; }
                .gw-why-item { display: flex; align-items: flex-start; gap: 16px; }
                .gw-why-icon { margin-top: 4px; width: 24px; height: 24px; border-radius: 50%; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .gw-why-item:hover .gw-why-icon { background: #e8391d; }
                .gw-why-item:hover .gw-why-icon svg { color: white !important; }
                .gw-why-text { color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.65; }

                /* ══ S6 FAQS ══ */
                .gw-faqs { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .gw-faqs-inner { max-width: 900px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 10; }
                .gw-faqs-header { text-align: center; margin-bottom: 64px; }
                .gw-faqs-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2rem, 4vw, 3rem); }
                .gw-faqs-h2 .accent { color: #e8391d; }
                .gw-faqs-list { display: flex; flex-direction: column; gap: 16px; }
                .gw-faq-item { background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: border-color 0.3s ease; }
                .gw-faq-item:hover { border-color: rgba(232,57,29,0.3); }
                .gw-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 24px; text-align: left; background: none; border: none; cursor: pointer; font-family: 'Raleway', Arial, sans-serif; }
                .gw-faq-q { font-weight: 700; color: black; font-size: 15px; padding-right: 16px; line-height: 1.4; }
                .gw-faq-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
                .gw-faq-icon.open { background: #e8391d; color: white; }
                .gw-faq-icon.closed { background: #f3f4f6; color: rgba(0,0,0,0.5); }
                .gw-faq-answer { padding: 0 24px 24px; color: #6b7280; font-size: 14px; line-height: 1.75; }

                /* ══ S7 CTA ══ */
                .gw-cta { position: relative; width: 100%; background: #e8391d; padding: 112px 0; overflow: hidden; }
                .gw-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 0 32px; position: relative; z-index: 10; }
                .gw-cta-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; font-size: clamp(2.5rem, 5vw, 4rem); }
                .gw-cta-sub { color: rgba(255,255,255,0.8); font-size: 18px; max-width: 560px; margin: 0 auto 40px; line-height: 1.65; }
                .gw-cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
                .gw-cta-btn-dark { display: inline-flex; align-items: center; gap: 12px; background: black; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .gw-cta-btn-dark:hover { background: white; color: #e8391d; gap: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
                .gw-cta-btn-border { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: gap 0.2s ease; }
                .gw-cta-btn-border:hover { gap: 16px; }


                /* ══════════════════════════════════════
                   2560px — 4K
                ══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .gw-hero { padding: 160px 0 80px; }
                    .gw-hero-inner { max-width: 1800px; }
                    .gw-hero-h1 { font-size: clamp(4.5rem, 5.5vw, 8rem); margin-bottom: 52px; }
                    .gw-hero-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 1100px; margin-bottom: 60px; }
                    .gw-btn-primary, .gw-btn-outline { font-size: 16px; padding: 22px 52px; border-radius: 18px; }
                    .gw-hero-btns { gap: 28px; }

                    .gw-overview-inner, .gw-cats-inner, .gw-process-inner, .gw-why-inner { max-width: 2200px; padding: 0 160px; }
                    .gw-faqs-inner { max-width: 1600px; padding: 0 160px; }
                    .gw-cta-inner { max-width: 1400px; padding: 0 60px; }
                    .gw-overview, .gw-cats, .gw-process, .gw-why, .gw-faqs, .gw-cta { padding: 200px 0; }

                    .gw-overview-inner { gap: 120px; }
                    .gw-overview-h2 { font-size: clamp(3rem, 3.5vw, 5.5rem); margin-bottom: 40px; }
                    .gw-overview-body { font-size: 1.25rem; line-height: 1.9; }
                    .gw-overview-checklist { gap: 24px; }
                    .gw-check-item span { font-size: 18px; }

                    .gw-cats-header { margin-bottom: 100px; }
                    .gw-cats-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .gw-cats-grid { gap: 40px; }
                    .gw-cat-card { padding: 52px; gap: 36px; border-radius: 24px; }
                    .gw-cat-icon { width: 76px; height: 76px; border-radius: 18px; }
                    .gw-cat-title { font-size: 22px; }
                    .gw-cat-desc { font-size: 18px; }

                    .gw-process-header { margin-bottom: 120px; }
                    .gw-process-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .gw-process-grid { gap: 52px; }
                    .gw-process-circle { width: 88px; height: 88px; margin-bottom: 36px; }
                    .gw-process-title { font-size: 19px; margin-bottom: 16px; }
                    .gw-process-desc { font-size: 18px; max-width: 320px; }
                    .gw-process-step { font-size: 15px; }

                    .gw-why-inner { gap: 120px; }
                    .gw-why-h2 { font-size: clamp(3rem, 3.5vw, 5rem); margin-bottom: 60px; }
                    .gw-why-list { gap: 28px; }
                    .gw-why-text { font-size: 19px; }
                    .gw-why-icon { width: 32px; height: 32px; }

                    .gw-faqs-header { margin-bottom: 80px; }
                    .gw-faqs-h2 { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .gw-faq-trigger { padding: 36px; }
                    .gw-faq-q { font-size: 19px; }
                    .gw-faq-answer { padding: 0 36px 36px; font-size: 17px; }
                    .gw-faq-icon { width: 44px; height: 44px; }
                    .gw-faqs-list { gap: 24px; }

                    .gw-cta-h2 { font-size: clamp(3.5rem, 5vw, 7rem); }
                    .gw-cta-sub { font-size: 24px; max-width: 800px; }
                    .gw-cta-btn-dark, .gw-cta-btn-border { font-size: 18px; padding: 26px 60px; border-radius: 18px; }
                    .gw-cta-btns { gap: 32px; }
                }

                /* ══════════════════════════════════════
                   1920px — Full HD
                ══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .gw-hero { padding: 130px 0 60px; }
                    .gw-hero-inner { max-width: 1400px; }
                    .gw-hero-h1 { font-size: clamp(3.5rem, 5vw, 6.5rem); }
                    .gw-hero-sub { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 900px; }
                    .gw-btn-primary, .gw-btn-outline { font-size: 14px; padding: 20px 44px; }

                    .gw-overview-inner, .gw-cats-inner, .gw-process-inner, .gw-why-inner { max-width: 1700px; padding: 0 130px; }
                    .gw-faqs-inner { max-width: 1200px; padding: 0 64px; }
                    .gw-overview, .gw-cats, .gw-process, .gw-why, .gw-faqs, .gw-cta { padding: 160px 0; }

                    .gw-overview-inner { gap: 100px; }
                    .gw-overview-h2 { font-size: clamp(2.6rem, 3.5vw, 4.5rem); }
                    .gw-overview-body { font-size: 1.1rem; }
                    .gw-check-item span { font-size: 16px; }

                    .gw-cats-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .gw-cats-grid { gap: 32px; }
                    .gw-cat-card { padding: 44px; gap: 28px; }
                    .gw-cat-icon { width: 64px; height: 64px; }
                    .gw-cat-title { font-size: 20px; }
                    .gw-cat-desc { font-size: 16px; }

                    .gw-process-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .gw-process-grid { gap: 44px; }
                    .gw-process-circle { width: 72px; height: 72px; }
                    .gw-process-title { font-size: 17px; }
                    .gw-process-desc { font-size: 16px; }

                    .gw-why-inner { gap: 100px; }
                    .gw-why-h2 { font-size: clamp(2.5rem, 3.2vw, 4.2rem); }
                    .gw-why-text { font-size: 17px; }

                    .gw-faqs-h2 { font-size: clamp(2.5rem, 3.5vw, 5rem); }
                    .gw-faq-q { font-size: 17px; }
                    .gw-faq-answer { font-size: 15px; }

                    .gw-cta-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .gw-cta-sub { font-size: 21px; }
                    .gw-cta-btn-dark, .gw-cta-btn-border { font-size: 16px; padding: 22px 52px; }
                    .gw-cta-inner { max-width: 1200px; }
                }

                /* ══════════════════════════════════════
                   1440px
                ══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .gw-overview-inner, .gw-cats-inner, .gw-process-inner, .gw-why-inner { max-width: 1360px; padding: 0 96px; }
                    .gw-overview, .gw-cats, .gw-process, .gw-why, .gw-faqs, .gw-cta { padding: 140px 0; }
                    .gw-overview-inner { gap: 88px; }
                    .gw-overview-h2 { font-size: clamp(2.2rem, 3.5vw, 3.6rem); }
                    .gw-cats-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .gw-process-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .gw-why-h2 { font-size: clamp(2.2rem, 3.2vw, 3.6rem); }
                    .gw-cta-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                }

                /* ══════════════════════════════════════
                   1280px
                ══════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .gw-overview-inner, .gw-cats-inner, .gw-process-inner, .gw-why-inner { max-width: 1160px; padding: 0 64px; }
                }

                /* ══════════════════════════════════════
                   1024px
                ══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .gw-overview-inner, .gw-cats-inner, .gw-process-inner, .gw-why-inner { padding: 0 48px; }
                    .gw-faqs-inner { padding: 0 48px; }
                    .gw-overview, .gw-cats, .gw-process, .gw-why, .gw-faqs, .gw-cta { padding: 96px 0; }
                    .gw-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .gw-overview-img-wrap { display: none; }
                    .gw-overview-h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); }
                    .gw-cats-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .gw-cat-card { padding: 24px; gap: 18px; }
                    .gw-cat-icon { width: 44px; height: 44px; }
                    .gw-process-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
                    .gw-process-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .gw-process-line { display: none; }
                    .gw-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .gw-why-img-wrap { display: none; }
                    .gw-why-h2 { font-size: clamp(1.8rem, 3.2vw, 2.6rem); }
                    .gw-cta-h2 { font-size: clamp(2rem, 4.5vw, 3rem); }
                    .gw-cta-sub { font-size: 15px; }
                    .gw-cta-btn-dark, .gw-cta-btn-border { font-size: 12px; padding: 16px 28px; }
                }

                /* ══════════════════════════════════════
                   900px — Tablet
                ══════════════════════════════════════ */
                @media (max-width: 900px) {
                    .gw-overview-inner, .gw-cats-inner, .gw-process-inner, .gw-why-inner { padding: 0 40px; }
                    .gw-faqs-inner { padding: 0 40px; }
                    .gw-overview, .gw-cats, .gw-process, .gw-why, .gw-faqs, .gw-cta { padding: 80px 0; }
                    .gw-hero-h1 { font-size: clamp(2.2rem, 6vw, 3.6rem); }
                    .gw-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .gw-overview-img-wrap { display: none; }
                    .gw-overview-h2 { font-size: clamp(1.8rem, 4.5vw, 2.8rem); }
                    .gw-cats-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .gw-cats-header { margin-bottom: 40px; }
                    .gw-process-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
                    .gw-process-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .gw-process-header { margin-bottom: 48px; }
                    .gw-process-line { display: none; }
                    .gw-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .gw-why-img-wrap { display: none; }
                    .gw-why-h2 { font-size: clamp(1.8rem, 5vw, 2.6rem); }
                    .gw-cta-h2 { font-size: clamp(1.8rem, 5.5vw, 2.8rem); }
                    .gw-cta-sub { font-size: 15px; }
                }

                /* ══════════════════════════════════════
                   768px
                ══════════════════════════════════════ */
                @media (max-width: 768px) {
                    .gw-overview-inner, .gw-cats-inner, .gw-process-inner, .gw-why-inner { padding: 0 32px; }
                    .gw-faqs-inner { padding: 0 32px; }
                    .gw-hero-h1 { font-size: clamp(1.9rem, 7vw, 3rem); }
                    .gw-cat-card { padding: 20px; gap: 16px; }
                    .gw-cat-icon { width: 40px; height: 40px; }
                    .gw-faq-trigger { padding: 20px; }
                    .gw-cta-h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); }
                }

                /* ══════════════════════════════════════
                   640px — Large Mobile
                ══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .gw-overview-inner, .gw-cats-inner, .gw-process-inner, .gw-why-inner { padding: 0 20px; }
                    .gw-faqs-inner { padding: 0 20px; }
                    .gw-cta-inner { padding: 0 20px; }
                    .gw-overview, .gw-cats, .gw-process, .gw-why, .gw-faqs, .gw-cta { padding: 56px 0; }
                    .gw-hero-h1 { font-size: clamp(1.7rem, 8vw, 2.6rem); margin-bottom: 20px; }
                    .gw-hero-sub { font-size: 0.875rem; margin-bottom: 28px; }
                    .gw-btn-primary, .gw-btn-outline { font-size: 11px; padding: 13px 22px; border-radius: 10px; }
                    .gw-hero-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .gw-btn-primary, .gw-btn-outline { width: 100%; justify-content: center; }
                    .gw-overview-h2 { font-size: clamp(1.5rem, 6.5vw, 2.2rem); }
                    .gw-overview-body { font-size: 0.875rem; }
                    .gw-overview-checklist { gap: 12px; }
                    .gw-check-item span { font-size: 13px; }
                    .gw-cats-grid { grid-template-columns: 1fr; gap: 14px; }
                    .gw-cats-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .gw-cat-card { padding: 18px; gap: 14px; border-radius: 12px; }
                    .gw-cat-icon { width: 36px; height: 36px; border-radius: 9px; }
                    .gw-cat-title { font-size: 14px; }
                    .gw-cat-desc { font-size: 13px; }
                    .gw-process-grid { grid-template-columns: 1fr; gap: 28px; }
                    .gw-process-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .gw-process-header { margin-bottom: 36px; }
                    .gw-process-circle { width: 52px; height: 52px; margin-bottom: 16px; }
                    .gw-process-title { font-size: 13px; margin-bottom: 8px; }
                    .gw-process-desc { font-size: 13px; }
                    .gw-why-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); margin-bottom: 28px; }
                    .gw-why-text { font-size: 13.5px; }
                    .gw-why-list { gap: 14px; }
                    .gw-faqs-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .gw-faqs-header { margin-bottom: 36px; }
                    .gw-faq-q { font-size: 13.5px; }
                    .gw-faq-answer { font-size: 13px; }
                    .gw-faq-trigger { padding: 16px; }
                    .gw-cta-h2 { font-size: clamp(1.5rem, 7.5vw, 2.2rem); }
                    .gw-cta-sub { font-size: 14px; }
                    .gw-cta-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .gw-cta-btn-dark, .gw-cta-btn-border { font-size: 11px; padding: 14px 24px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ══════════════════════════════════════
                   480px
                ══════════════════════════════════════ */
                @media (max-width: 480px) {
                    .gw-hero-h1 { font-size: clamp(1.5rem, 8.5vw, 2.2rem); }
                    .gw-overview-h2, .gw-cats-h2, .gw-process-h2, .gw-why-h2, .gw-faqs-h2, .gw-cta-h2 { font-size: clamp(1.35rem, 7.5vw, 1.9rem); }
                }

                /* ══════════════════════════════════════
                   380px — iPhone SE
                ══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .gw-overview-inner, .gw-cats-inner, .gw-process-inner, .gw-why-inner { padding: 0 14px; }
                    .gw-faqs-inner, .gw-cta-inner { padding: 0 14px; }
                    .gw-hero-h1 { font-size: 1.4rem; }
                    .gw-overview-h2, .gw-cats-h2, .gw-process-h2, .gw-why-h2, .gw-faqs-h2, .gw-cta-h2 { font-size: 1.25rem; }
                    .gw-cat-card { padding: 14px; gap: 12px; }
                    .gw-cta-btn-dark, .gw-cta-btn-border { font-size: 10px; padding: 12px 18px; }
                }

                /* ══════════════════════════════════════
                   320px
                ══════════════════════════════════════ */
                @media (max-width: 320px) {
                    .gw-overview-inner, .gw-cats-inner, .gw-process-inner, .gw-why-inner { padding: 0 12px; }
                    .gw-faqs-inner, .gw-cta-inner { padding: 0 12px; }
                    .gw-hero-h1 { font-size: 1.25rem; }
                    .gw-overview-h2, .gw-cats-h2, .gw-process-h2, .gw-why-h2, .gw-faqs-h2, .gw-cta-h2 { font-size: 1.1rem; }
                }
            `}</style>

            <main className="gw-main">

                <section className="gw-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <div className="absolute pointer-events-none" style={{ top: "50%", left: "25%", width: 900, height: 600, background: "rgba(232,57,29,0.1)", borderRadius: "50%", filter: "blur(180px)", transform: "translateY(-50%)" }} />
                    <div className="gw-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="gw-eyebrow center" style={{ marginBottom: 24 }}>
                            <Lock size={16} style={{ color: "#e8391d" }} />
                            <span className="gw-eyebrow-text">100% Confidential Ghostwriting</span>
                        </motion.div>
                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="gw-hero-h1">
                            GHOSTWRITING SERVICE WHERE OUR CRAFT BECOMES <br /><span className="accent">THE SECRET BEHIND YOUR SUCCESS.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="gw-hero-sub">
                            Get your story polished with our ghostwriting service. Our competent and experienced team of ghostwriters preserves your voice, creating a masterpiece, the one that has only your name on it and the one to which only you have the right.
                        </motion.p>

                        <HeroButtons />
                    </div>
                </section>

                <section id="overview" ref={overviewRef} className="gw-overview">
                    <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="gw-overview-inner">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <motion.div variants={fadeUp} className="gw-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="gw-eyebrow-line" /><span className="gw-eyebrow-text">WHAT IS GHOSTWRITING?</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="gw-overview-h2">
                                TAKING YOUR STORY AND <span className="accent">FASHION IT INTO A COMPELLING NARRATIVE.</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="gw-overview-body">
                                Everyone has something important to share, but not all know how to write well and get the spotlight. That's where our ghostwriters come in. Ghostwriters usually go without public credit; their names do not appear on book covers, meaning the author has complete rights and ownership.
                            </motion.p>
                            <motion.p variants={fadeUp} className="gw-overview-body" style={{ marginBottom: 32 }}>
                                Are you seeking an expert to help curate your next piece? Our ghostwriter will help you create a masterpiece, no matter what genre of writing it is. We specialize in a range of genres, including memoirs, biographies, romance, thrillers, horror, mysteries, literary fiction, and more. Let us help you become an author by sharing your story with the world with the highest standards of excellence.
                            </motion.p>
                            <motion.div variants={staggerContainer} className="gw-overview-checklist">
                                {["Your story, professionally written", "100% confidential ghostwriting", "Every genre, expertly crafted", "Your voice. Your name. Your legacy."].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="gw-check-item">
                                        <ShieldCheck size={18} style={{ color: "#e8391d", flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="gw-overview-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/Ghostwriting/01.webp" alt="Ghostwriting Service" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                            <div className="absolute" style={{ bottom: -20, left: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.2)", zIndex: -1 }} />
                        </motion.div>
                    </motion.div>
                </section>

                <section className="gw-cats">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="gw-cats-inner">
                        <div className="gw-cats-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="gw-eyebrow center" style={{ marginBottom: 16 }}>
                                <BookOpen size={16} style={{ color: "#e8391d" }} /><span className="gw-eyebrow-text">KEY SPECIALITIES</span>
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="gw-cats-h2">
                                GENRES WE <span className="accent">SPECIALIZE IN</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="gw-cats-grid">
                            {categories.map(({ icon: Icon, title, desc }) => (
                                <motion.div key={title} variants={fadeUp} className="gw-cat-card">
                                    <div className="gw-cat-icon"><Icon size={26} style={{ color: "#e8391d" }} /></div>
                                    <div>
                                        <h3 className="gw-cat-title">{title}</h3>
                                        <p className="gw-cat-desc">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="gw-process">
                    <div className="gw-process-inner">
                        <div className="gw-process-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="gw-process-h2">
                                HOW OUR GHOSTWRITING <span className="accent">WORKS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="gw-process-grid">
                            <div className="gw-process-line" />
                            {processSteps.map(({ step, title, desc, icon: Icon }) => (
                                <motion.div key={step} variants={fadeUp} className="gw-process-card">
                                    <div className="gw-process-circle"><Icon size={24} style={{ color: "white" }} /></div>
                                    <span className="gw-process-step">{step}</span>
                                    <h3 className="gw-process-title">{title}</h3>
                                    <p className="gw-process-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="gw-why">
                    <div className="gw-why-inner">
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="gw-why-img-wrap" style={{ position: "relative", order: 1 }}>
                            <Image src="/images/Services/WritingServices/Ghostwriting/02.jpeg" alt="Ghostwriting Team" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "rgba(232,57,29,0.2)", mixBlendMode: "multiply" }} />
                            <div className="absolute" style={{ bottom: -20, left: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.25)", zIndex: -1 }} />
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ order: 2 }}>
                            <motion.div variants={fadeUp} className="gw-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="gw-eyebrow-line" /><span className="gw-eyebrow-text">WHY BEXLEY GHOSTWRITERS?</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="gw-why-h2">
                                TRUSTED WITH <br /><span className="accent">STORIES THAT MATTER.</span>
                            </motion.h2>
                            <motion.div variants={staggerContainer} className="gw-why-list">
                                {["Ironclad NDA — Protecting your creative work with strict confidentiality", "Voice-Matching Guarantee — Writing tailored perfectly to your voice", "AI-Free Content — Human writing without artificial generation guaranteed.", "Unlimited Revisions — Revisions available until complete satisfaction", "100% Royalties — Complete ownership of every earned royalty"].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="gw-why-item">
                                        <div className="gw-why-icon"><CheckCircle2 size={14} style={{ color: "#e8391d" }} /></div>
                                        <p className="gw-why-text">{item}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <section className="gw-faqs">
                    <div className="gw-faqs-inner">
                        <div className="gw-faqs-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="gw-faqs-h2">
                                FREQUENTLY ASK <span className="accent">QUESTIONS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="gw-faqs-list">
                            {faqs.map(({ q, a }, i) => (
                                <motion.div key={i} variants={fadeUp} className="gw-faq-item">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="gw-faq-trigger">
                                        <span className="gw-faq-q">{q}</span>
                                        <div className={`gw-faq-icon ${openFaq === i ? "open" : "closed"}`}>
                                            {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }} style={{ overflow: "hidden" }}>
                                                <div className="gw-faq-answer">{a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="gw-cta">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="gw-cta-inner">
                        <h2 className="gw-cta-h2">READY TO PUBLISH SOMETHING REMARKABLE?</h2>
                        <p className="gw-cta-sub">We're your partner you can trust with your ideas and stories. Let us make your words dance while you relax.</p>
                        <div className="gw-cta-btns">
                            <button
                                type="button"
                                className="gw-cta-btn-dark"
                                onClick={() => setQuoteModal(true)}
                            >
                                <FileText size={16} />
                                Start Your Book
                            </button>
                            <a href="tel:2797770380" className="gw-cta-btn-border"><Phone size={16} /> Call Us Now</a>
                        </div>
                    </motion.div>

                    <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />

                </section>

            </main>
        </>
    );
}