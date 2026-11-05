"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    BookHeart, ArrowRight, CheckCircle2, Mic, Heart, ShieldCheck,
    BookOpen, PenTool, Minus, Plus, Phone, Users, Clock, TreePine,
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
    { icon: Heart, title: "Personal Memoir", desc: "Personal experiences centered on resilience, trauma, healing, and life-changing moments." },
    { icon: Users, title: "Inspirational Memoir", desc: "Assays of overcoming hardship, achieving a life goal, or navigating a substantial life transition." },
    { icon: TreePine, title: "Travel Memoir", desc: "Stories narrating a specific journey of personal growth, emotional awakening, and transformation." },
    { icon: BookOpen, title: "Professional or Career Memoir", desc: "Professional journeys filled with growth, achievement, lessons, and leadership insights." },
];

const processSteps = [
    { step: "01", title: "Recorded Conversations", desc: "Recorded conversations help our writers extract the emotions, details, and reflections of your journey.", icon: Mic },
    { step: "02", title: "Shaping Your Narrative", desc: "Writers then consolidate scattered memories, shape the narrative, and turn them into a cohesive story.", icon: BookOpen },
    { step: "03", title: "Emotion-Driven Storytelling", desc: "With emotional writing, writers bypass pure logic, speak directly to your emotions, and keep your authentic voice.", icon: PenTool },
    { step: "04", title: "Review & Privacy Check", desc: "Every chapter is reviewed with your approval while sensitive details remain protected under strict NDA requirements.", icon: ShieldCheck },
];

const faqs = [
    { q: "What is the difference between a memoir and an autobiography?", a: "A memoir reflects meaningful experiences and emotions from specific life moments in the past. An autobiography chronologically covers the entire life journey of an author." },
    { q: "Do I need to be a well-known personality to write a memoir?", a: "No. You can publish a memoir to share meaningful experiences, personal lessons, or emotional stories that connect with readers." },
    { q: "How do you handle sensitive or traumatic memories?", a: "Empathy, confidentiality, and care are three elements we use to approach sensitive memories, giving you complete control over what is shared and how it is presented." },
    { q: "What if I can't remember all the details?", a: "No issue at all if you can't remember. That's completely normal. Recorded conversations and guided questions help us uncover your memories and bring them to life." },
    { q: "Who owns the rights to my memoir?", a: "You will have full ownership and rights to your memoir, including the manuscript, story, publishing rights, and all original content created." },
];

export default function MemoirWritingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);


    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .mw-main { width: 100%; overflow: hidden; font-family: 'Raleway', Arial, sans-serif; }

                .mw-eyebrow { display: flex; align-items: center; gap: 12px; }
                .mw-eyebrow.center { justify-content: center; }
                .mw-eyebrow-line { display: block; width: 32px; height: 2px; background: #e8391d; flex-shrink: 0; }
                .mw-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }

                /* ══ S1 HERO ══ */
                .mw-hero { position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #05070f; overflow: hidden; padding: 112px 0 48px; }
                .mw-hero-inner { position: relative; z-index: 10; text-align: center; padding: 0 24px; max-width: 1000px; margin: 0 auto; }
                .mw-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.95; margin-bottom: 32px; font-size: clamp(2.5rem, 6vw, 4rem); }
                .mw-hero-h1 .accent { color: #e8391d; }
                .mw-hero-sub { color: rgba(255,255,255,0.6); line-height: 1.85; max-width: 680px; margin: 0 auto 40px; font-size: clamp(0.9rem, 1.1vw, 1.05rem); }
                .mw-hero-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
                .mw-btn-primary { display: inline-flex; align-items: center; gap: 12px; background: #e8391d; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease; }
                .mw-btn-primary:hover { background: #c0271a; gap: 16px; box-shadow: 0 10px 40px rgba(232,57,29,0.4); }
                .mw-btn-outline { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
                .mw-btn-outline:hover { border-color: #e8391d; color: #e8391d; }

                /* ══ S2 OVERVIEW ══ */
                .mw-overview { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .mw-overview-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
                .mw-overview-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; margin-bottom: 24px; font-size: clamp(2rem, 3vw, 3rem); }
                .mw-overview-h2 .accent { color: #e8391d; }
                .mw-overview-body { color: #6b7280; line-height: 1.85; margin-bottom: 20px; font-size: 0.95rem; }
                .mw-overview-checklist { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
                .mw-check-item { display: flex; align-items: center; gap: 12px; }
                .mw-check-item span { color: rgba(0,0,0,0.8); font-weight: 600; font-size: 14px; }
                .mw-overview-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.2); aspect-ratio: 4/5; }

                /* ══ S3 CATEGORIES ══ */
                .mw-cats { position: relative; width: 100%; background: #05070f; padding: 128px 0; overflow: hidden; }
                .mw-cats-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 10; }
                .mw-cats-header { text-align: center; margin-bottom: 64px; overflow: hidden; }
                .mw-cats-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .mw-cats-h2 .accent { color: #e8391d; }
                .mw-cats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .mw-cat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; display: flex; gap: 24px; align-items: flex-start; cursor: default; transition: border-color 0.5s ease; }
                .mw-cat-card:hover { border-color: rgba(232,57,29,0.5); }
                .mw-cat-icon { width: 56px; height: 56px; border-radius: 12px; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .mw-cat-card:hover .mw-cat-icon { background: #e8391d; }
                .mw-cat-card:hover .mw-cat-icon svg { color: white !important; }
                .mw-cat-title { font-weight: 900; color: white; text-transform: uppercase; font-size: 17px; margin-bottom: 8px; letter-spacing: 0.04em; }
                .mw-cat-desc { color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.65; }

                /* ══ S4 PROCESS ══ */
                .mw-process { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .mw-process-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .mw-process-header { text-align: center; margin-bottom: 80px; }
                .mw-process-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .mw-process-h2 .accent { color: #e8391d; }
                .mw-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; position: relative; }
                .mw-process-line { display: block; position: absolute; top: 32px; left: 12%; right: 12%; height: 2px; background: #e5e7eb; z-index: 0; }
                .mw-process-card { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .mw-process-circle { width: 64px; height: 64px; border-radius: 50%; background: #e8391d; border: 4px solid #faf9f7; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(232,57,29,0.2); }
                .mw-process-step { color: #e8391d; font-weight: 900; font-size: 12px; letter-spacing: 0.15em; margin-bottom: 8px; }
                .mw-process-title { font-weight: 900; color: black; text-transform: uppercase; font-size: 15px; margin-bottom: 12px; letter-spacing: 0.04em; line-height: 1.3; }
                .mw-process-desc { color: #6b7280; font-size: 14px; line-height: 1.65; max-width: 220px; }

                /* ══ S5 WHY CHOOSE ══ */
                .mw-why { position: relative; width: 100%; background: #111; padding: 128px 0; overflow: hidden; }
                .mw-why-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
                .mw-why-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.4); aspect-ratio: 1/1; }
                .mw-why-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 40px; font-size: clamp(2rem, 3.5vw, 3rem); }
                .mw-why-h2 .accent { color: #e8391d; }
                .mw-why-list { display: flex; flex-direction: column; gap: 20px; }
                .mw-why-item { display: flex; align-items: flex-start; gap: 16px; }
                .mw-why-icon { margin-top: 4px; width: 24px; height: 24px; border-radius: 50%; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .mw-why-item:hover .mw-why-icon { background: #e8391d; }
                .mw-why-item:hover .mw-why-icon svg { color: white !important; }
                .mw-why-text { color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.65; }

                /* ══ S6 FAQS ══ */
                .mw-faqs { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .mw-faqs-inner { max-width: 900px; margin: 0 auto; padding: 0 32px; }
                .mw-faqs-header { text-align: center; margin-bottom: 64px; }
                .mw-faqs-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2rem, 4vw, 3rem); }
                .mw-faqs-h2 .accent { color: #e8391d; }
                .mw-faqs-list { display: flex; flex-direction: column; gap: 16px; }
                .mw-faq-item { background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: border-color 0.3s ease; }
                .mw-faq-item:hover { border-color: rgba(232,57,29,0.3); }
                .mw-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 24px; text-align: left; background: none; border: none; cursor: pointer; font-family: 'Raleway', Arial, sans-serif; }
                .mw-faq-q { font-weight: 700; color: black; font-size: 15px; padding-right: 16px; line-height: 1.4; }
                .mw-faq-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
                .mw-faq-icon.open { background: #e8391d; color: white; }
                .mw-faq-icon.closed { background: #f3f4f6; color: rgba(0,0,0,0.5); }
                .mw-faq-answer { padding: 0 24px 24px; color: #6b7280; font-size: 14px; line-height: 1.75; }

                /* ══ S7 CTA ══ */
                .mw-cta { position: relative; width: 100%; background: #e8391d; padding: 112px 0; overflow: hidden; }
                .mw-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 0 32px; position: relative; z-index: 10; }
                .mw-cta-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; font-size: clamp(2.5rem, 5vw, 4rem); }
                .mw-cta-sub { color: rgba(255,255,255,0.8); font-size: 18px; max-width: 560px; margin: 0 auto 40px; line-height: 1.65; }
                .mw-cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
                .mw-cta-btn-dark { display: inline-flex; align-items: center; gap: 12px; background: black; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .mw-cta-btn-dark:hover { background: white; color: #e8391d; gap: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
                .mw-cta-btn-border { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: gap 0.2s ease; }
                .mw-cta-btn-border:hover { gap: 16px; }


                /* ══════════════════════════════════════
                   2560px — 4K
                ══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .mw-hero { padding: 160px 0 80px; }
                    .mw-hero-inner { max-width: 1800px; }
                    .mw-hero-h1 { font-size: clamp(4.5rem, 5.5vw, 8rem); margin-bottom: 52px; }
                    .mw-hero-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 1100px; margin-bottom: 60px; }
                    .mw-btn-primary, .mw-btn-outline { font-size: 16px; padding: 22px 52px; border-radius: 18px; }
                    .mw-hero-btns { gap: 28px; }

                    .mw-overview-inner, .mw-cats-inner, .mw-process-inner, .mw-why-inner { max-width: 2200px; padding: 0 160px; }
                    .mw-faqs-inner { max-width: 1600px; padding: 0 160px; }
                    .mw-cta-inner { max-width: 1400px; padding: 0 60px; }
                    .mw-overview, .mw-cats, .mw-process, .mw-why, .mw-faqs, .mw-cta { padding: 200px 0; }

                    .mw-overview-inner { gap: 120px; }
                    .mw-overview-h2 { font-size: clamp(3rem, 3vw, 5rem); margin-bottom: 40px; }
                    .mw-overview-body { font-size: 1.25rem; line-height: 1.9; }
                    .mw-overview-checklist { gap: 24px; }
                    .mw-check-item span { font-size: 18px; }

                    .mw-cats-header { margin-bottom: 100px; }
                    .mw-cats-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .mw-cats-grid { gap: 40px; }
                    .mw-cat-card { padding: 52px; gap: 36px; border-radius: 24px; }
                    .mw-cat-icon { width: 76px; height: 76px; border-radius: 18px; }
                    .mw-cat-title { font-size: 22px; }
                    .mw-cat-desc { font-size: 18px; }

                    .mw-process-header { margin-bottom: 120px; }
                    .mw-process-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .mw-process-grid { gap: 52px; }
                    .mw-process-circle { width: 88px; height: 88px; margin-bottom: 36px; }
                    .mw-process-title { font-size: 19px; margin-bottom: 16px; }
                    .mw-process-desc { font-size: 18px; max-width: 320px; }
                    .mw-process-step { font-size: 15px; }

                    .mw-why-inner { gap: 120px; }
                    .mw-why-h2 { font-size: clamp(3rem, 3.5vw, 5rem); margin-bottom: 60px; }
                    .mw-why-list { gap: 28px; }
                    .mw-why-text { font-size: 19px; }
                    .mw-why-icon { width: 32px; height: 32px; }

                    .mw-faqs-header { margin-bottom: 80px; }
                    .mw-faqs-h2 { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .mw-faq-trigger { padding: 36px; }
                    .mw-faq-q { font-size: 19px; }
                    .mw-faq-answer { padding: 0 36px 36px; font-size: 17px; }
                    .mw-faq-icon { width: 44px; height: 44px; }
                    .mw-faqs-list { gap: 24px; }

                    .mw-cta-h2 { font-size: clamp(3.5rem, 5vw, 7rem); }
                    .mw-cta-sub { font-size: 24px; max-width: 800px; }
                    .mw-cta-btn-dark, .mw-cta-btn-border { font-size: 18px; padding: 26px 60px; border-radius: 18px; }
                    .mw-cta-btns { gap: 32px; }
                }

                /* ══════════════════════════════════════
                   1920px — Full HD
                ══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .mw-hero { padding: 130px 0 60px; }
                    .mw-hero-inner { max-width: 1400px; }
                    .mw-hero-h1 { font-size: clamp(3.5rem, 5vw, 6.5rem); }
                    .mw-hero-sub { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 900px; }
                    .mw-btn-primary, .mw-btn-outline { font-size: 14px; padding: 20px 44px; }

                    .mw-overview-inner, .mw-cats-inner, .mw-process-inner, .mw-why-inner { max-width: 1700px; padding: 0 130px; }
                    .mw-faqs-inner { max-width: 1200px; padding: 0 64px; }
                    .mw-overview, .mw-cats, .mw-process, .mw-why, .mw-faqs, .mw-cta { padding: 160px 0; }

                    .mw-overview-inner { gap: 100px; }
                    .mw-overview-h2 { font-size: clamp(2.6rem, 2.8vw, 4.2rem); }
                    .mw-overview-body { font-size: 1.1rem; }
                    .mw-check-item span { font-size: 16px; }

                    .mw-cats-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .mw-cats-grid { gap: 32px; }
                    .mw-cat-card { padding: 44px; gap: 28px; }
                    .mw-cat-icon { width: 64px; height: 64px; }
                    .mw-cat-title { font-size: 20px; }
                    .mw-cat-desc { font-size: 16px; }

                    .mw-process-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .mw-process-grid { gap: 44px; }
                    .mw-process-circle { width: 72px; height: 72px; }
                    .mw-process-title { font-size: 17px; }
                    .mw-process-desc { font-size: 16px; }

                    .mw-why-inner { gap: 100px; }
                    .mw-why-h2 { font-size: clamp(2.5rem, 3.2vw, 4.2rem); }
                    .mw-why-text { font-size: 17px; }

                    .mw-faqs-h2 { font-size: clamp(2.5rem, 3.5vw, 5rem); }
                    .mw-faq-q { font-size: 17px; }
                    .mw-faq-answer { font-size: 15px; }

                    .mw-cta-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .mw-cta-sub { font-size: 21px; }
                    .mw-cta-btn-dark, .mw-cta-btn-border { font-size: 16px; padding: 22px 52px; }
                    .mw-cta-inner { max-width: 1200px; }
                }

                /* ══════════════════════════════════════
                   1440px
                ══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .mw-overview-inner, .mw-cats-inner, .mw-process-inner, .mw-why-inner { max-width: 1360px; padding: 0 96px; }
                    .mw-overview, .mw-cats, .mw-process, .mw-why, .mw-faqs, .mw-cta { padding: 140px 0; }
                    .mw-overview-inner { gap: 88px; }
                    .mw-overview-h2 { font-size: clamp(2.2rem, 2.8vw, 3.4rem); }
                    .mw-cats-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .mw-process-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .mw-why-h2 { font-size: clamp(2.2rem, 3.2vw, 3.6rem); }
                    .mw-cta-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                }

                /* ══════════════════════════════════════
                   1280px
                ══════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .mw-overview-inner, .mw-cats-inner, .mw-process-inner, .mw-why-inner { max-width: 1160px; padding: 0 64px; }
                }

                /* ══════════════════════════════════════
                   1024px
                ══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .mw-overview-inner, .mw-cats-inner, .mw-process-inner, .mw-why-inner { padding: 0 48px; }
                    .mw-faqs-inner { padding: 0 48px; }
                    .mw-overview, .mw-cats, .mw-process, .mw-why, .mw-faqs, .mw-cta { padding: 96px 0; }
                    .mw-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .mw-overview-img-wrap { display: none; }
                    .mw-overview-h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); }
                    .mw-cats-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .mw-cat-card { padding: 24px; gap: 18px; }
                    .mw-cat-icon { width: 44px; height: 44px; }
                    .mw-process-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
                    .mw-process-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .mw-process-line { display: none; }
                    .mw-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .mw-why-img-wrap { display: none; }
                    .mw-why-h2 { font-size: clamp(1.8rem, 3.2vw, 2.6rem); }
                    .mw-cta-h2 { font-size: clamp(2rem, 4.5vw, 3rem); }
                    .mw-cta-sub { font-size: 15px; }
                    .mw-cta-btn-dark, .mw-cta-btn-border { font-size: 12px; padding: 16px 28px; }
                }

                /* ══════════════════════════════════════
                   900px — Tablet
                ══════════════════════════════════════ */
                @media (max-width: 900px) {
                    .mw-overview-inner, .mw-cats-inner, .mw-process-inner, .mw-why-inner { padding: 0 40px; }
                    .mw-faqs-inner { padding: 0 40px; }
                    .mw-overview, .mw-cats, .mw-process, .mw-why, .mw-faqs, .mw-cta { padding: 80px 0; }
                    .mw-hero-h1 { font-size: clamp(2.2rem, 6vw, 3.6rem); }
                    .mw-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .mw-overview-img-wrap { display: none; }
                    .mw-overview-h2 { font-size: clamp(1.8rem, 4.5vw, 2.8rem); }
                    .mw-cats-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .mw-cats-header { margin-bottom: 40px; }
                    .mw-process-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
                    .mw-process-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .mw-process-header { margin-bottom: 48px; }
                    .mw-process-line { display: none; }
                    .mw-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .mw-why-img-wrap { display: none; }
                    .mw-why-h2 { font-size: clamp(1.8rem, 5vw, 2.6rem); }
                    .mw-cta-h2 { font-size: clamp(1.8rem, 5.5vw, 2.8rem); }
                    .mw-cta-sub { font-size: 15px; }
                }

                /* ══════════════════════════════════════
                   768px
                ══════════════════════════════════════ */
                @media (max-width: 768px) {
                    .mw-overview-inner, .mw-cats-inner, .mw-process-inner, .mw-why-inner { padding: 0 32px; }
                    .mw-faqs-inner { padding: 0 32px; }
                    .mw-hero-h1 { font-size: clamp(1.9rem, 7vw, 3rem); }
                    .mw-cat-card { padding: 20px; gap: 16px; }
                    .mw-cat-icon { width: 40px; height: 40px; }
                    .mw-faq-trigger { padding: 20px; }
                    .mw-cta-h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); }
                }

                /* ══════════════════════════════════════
                   640px — Large Mobile
                ══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .mw-overview-inner, .mw-cats-inner, .mw-process-inner, .mw-why-inner { padding: 0 20px; }
                    .mw-faqs-inner { padding: 0 20px; }
                    .mw-cta-inner { padding: 0 20px; }
                    .mw-overview, .mw-cats, .mw-process, .mw-why, .mw-faqs, .mw-cta { padding: 56px 0; }
                    .mw-hero-h1 { font-size: clamp(1.7rem, 8vw, 2.6rem); margin-bottom: 20px; }
                    .mw-hero-sub { font-size: 0.875rem; margin-bottom: 28px; }
                    .mw-btn-primary, .mw-btn-outline { font-size: 11px; padding: 13px 22px; border-radius: 10px; width: 100%; justify-content: center; }
                    .mw-hero-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .mw-overview-h2 { font-size: clamp(1.5rem, 6.5vw, 2.2rem); }
                    .mw-overview-body { font-size: 0.875rem; }
                    .mw-overview-checklist { gap: 12px; }
                    .mw-check-item span { font-size: 13px; }
                    .mw-cats-grid { grid-template-columns: 1fr; gap: 14px; }
                    .mw-cats-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .mw-cat-card { padding: 18px; gap: 14px; border-radius: 12px; }
                    .mw-cat-icon { width: 36px; height: 36px; border-radius: 9px; }
                    .mw-cat-title { font-size: 14px; }
                    .mw-cat-desc { font-size: 13px; }
                    .mw-process-grid { grid-template-columns: 1fr; gap: 28px; }
                    .mw-process-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .mw-process-header { margin-bottom: 36px; }
                    .mw-process-circle { width: 52px; height: 52px; margin-bottom: 16px; }
                    .mw-process-title { font-size: 13px; margin-bottom: 8px; }
                    .mw-process-desc { font-size: 13px; }
                    .mw-why-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); margin-bottom: 28px; }
                    .mw-why-text { font-size: 13.5px; }
                    .mw-why-list { gap: 14px; }
                    .mw-faqs-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .mw-faqs-header { margin-bottom: 36px; }
                    .mw-faq-q { font-size: 13.5px; }
                    .mw-faq-answer { font-size: 13px; }
                    .mw-faq-trigger { padding: 16px; }
                    .mw-cta-h2 { font-size: clamp(1.5rem, 7.5vw, 2.2rem); }
                    .mw-cta-sub { font-size: 14px; }
                    .mw-cta-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .mw-cta-btn-dark, .mw-cta-btn-border { font-size: 11px; padding: 14px 24px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ══════════════════════════════════════
                   480px
                ══════════════════════════════════════ */
                @media (max-width: 480px) {
                    .mw-hero-h1 { font-size: clamp(1.5rem, 8.5vw, 2.2rem); }
                    .mw-overview-h2, .mw-cats-h2, .mw-process-h2, .mw-why-h2, .mw-faqs-h2, .mw-cta-h2 { font-size: clamp(1.35rem, 7.5vw, 1.9rem); }
                }

                /* ══════════════════════════════════════
                   380px — iPhone SE
                ══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .mw-overview-inner, .mw-cats-inner, .mw-process-inner, .mw-why-inner { padding: 0 14px; }
                    .mw-faqs-inner, .mw-cta-inner { padding: 0 14px; }
                    .mw-hero-h1 { font-size: 1.4rem; }
                    .mw-overview-h2, .mw-cats-h2, .mw-process-h2, .mw-why-h2, .mw-faqs-h2, .mw-cta-h2 { font-size: 1.25rem; }
                    .mw-cat-card { padding: 14px; gap: 12px; }
                    .mw-cta-btn-dark, .mw-cta-btn-border { font-size: 10px; padding: 12px 18px; }
                }

                /* ══════════════════════════════════════
                   320px
                ══════════════════════════════════════ */
                @media (max-width: 320px) {
                    .mw-overview-inner, .mw-cats-inner, .mw-process-inner, .mw-why-inner { padding: 0 12px; }
                    .mw-faqs-inner, .mw-cta-inner { padding: 0 12px; }
                    .mw-hero-h1 { font-size: 1.25rem; }
                    .mw-overview-h2, .mw-cats-h2, .mw-process-h2, .mw-why-h2, .mw-faqs-h2, .mw-cta-h2 { font-size: 1.1rem; }
                }
            `}</style>

            <main className="mw-main">

                {/* S1 HERO */}
                <section className="mw-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <div className="absolute pointer-events-none" style={{ top: "33%", right: "25%", width: 900, height: 600, background: "rgba(232,57,29,0.1)", borderRadius: "50%", filter: "blur(180px)" }} />
                    <div className="mw-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mw-eyebrow center" style={{ marginBottom: 24 }}>
                            <BookHeart size={16} style={{ color: "#e8391d" }} />
                            <span className="mw-eyebrow-text">Memoir Writing Services</span>
                        </motion.div>
                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="mw-hero-h1">
                            EVERYONE HAS A STORY WORTH SHARING <br /><span className="accent">LET US WRITE YOURS.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mw-hero-sub">
                            Want to share your life story with the world and become a published author? Bexley Publishing has a deep understanding of the memoir genre, personal storytelling, and emotional authenticity. Let your story be the one that impacts readers.
                        </motion.p>

                        <HeroButtons />
                    </div>
                </section>

                {/* S2 OVERVIEW */}
                <section id="overview" ref={overviewRef} className="mw-overview">
                    <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="mw-overview-inner">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <motion.div variants={fadeUp} className="mw-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="mw-eyebrow-line" /><span className="mw-eyebrow-text">PERSONAL STORYTELLING</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="mw-overview-h2">
                                NARRATE YOUR JOURNEY THAT MADE YOU <span className="accent">WHO YOU ARE.</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="mw-overview-body">
                                Memoir writing isn't just for celebrities and politicians. It's for anyone who is prone to self-reflection, interested in capturing a meaningful slice of their life, reflecting on personal experiences, and communicating those experiences to others. No matter if you're an amateur author with a story to tell or an award-winning author trying out a new genre, we are always here to guide you every step of the way.
                            </motion.p>
                            <motion.p variants={fadeUp} className="mw-overview-body" style={{ marginBottom: 32 }}>
                                Putting your life experiences and learning on paper doesn't have to be a complex process. Everyone has a story worth sharing, and we provide would-be memoirists with all the expert writing and publication support. Become a published author with our comprehensive memoir-writing solution.
                            </motion.p>
                            <motion.div variants={staggerContainer} className="mw-overview-checklist">
                                {["Professional memoir writing support", "Story development and structuring", "Editing with emotional authenticity", "Publishing guidance from start to finish"].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="mw-check-item">
                                        <CheckCircle2 size={18} style={{ color: "#e8391d", flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="mw-overview-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/memoir-writing/01.jpg" alt="Memoir Writing Service" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                            <div className="absolute" style={{ bottom: -20, left: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.2)", zIndex: -1 }} />
                        </motion.div>
                    </motion.div>
                </section>

                {/* S3 CATEGORIES */}
                <section className="mw-cats">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="mw-cats-inner">
                        <div className="mw-cats-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="mw-eyebrow center" style={{ marginBottom: 16 }}>
                                <Clock size={16} style={{ color: "#e8391d" }} /><span className="mw-eyebrow-text">Types of Memoirs</span>
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mw-cats-h2">
                                EVERY MEMOIR TELLS IT DIFFERENTLY, <span className="accent">ALL STYLES COVERED.</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mw-cats-grid">
                            {categories.map(({ icon: Icon, title, desc }) => (
                                <motion.div key={title} variants={fadeUp} className="mw-cat-card">
                                    <div className="mw-cat-icon"><Icon size={26} style={{ color: "#e8391d" }} /></div>
                                    <div>
                                        <h3 className="mw-cat-title">{title}</h3>
                                        <p className="mw-cat-desc">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S4 PROCESS */}
                <section className="mw-process">
                    <div className="mw-process-inner">
                        <div className="mw-process-header">
                            {/* Fixed typo: MEMOR -> MEMOIR */}
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mw-process-h2">
                                A STRATEGIC MEMOIR WRITING PROCESS <span className="accent">WE FOLLOW</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mw-process-grid">
                            <div className="mw-process-line" />
                            {processSteps.map(({ step, title, desc, icon: Icon }) => (
                                <motion.div key={step} variants={fadeUp} className="mw-process-card">
                                    <div className="mw-process-circle"><Icon size={24} style={{ color: "white" }} /></div>
                                    <span className="mw-process-step">{step}</span>
                                    <h3 className="mw-process-title">{title}</h3>
                                    <p className="mw-process-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S5 WHY CHOOSE */}
                <section className="mw-why">
                    <div className="mw-why-inner">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mw-why-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/memoir-writing/02.jpg" alt="Memoir Interviewers" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "rgba(232,57,29,0.2)", mixBlendMode: "multiply" }} />
                            <div className="absolute" style={{ bottom: -20, right: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.25)", zIndex: -1 }} />
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <motion.div variants={fadeUp} className="mw-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="mw-eyebrow-line" /><span className="mw-eyebrow-text">WHY BEXLEY PUBLISHING</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="mw-why-h2">
                                COLLABORATING CLOSELY <br /><span className="accent">WITH AUTHORS AT EVERY STEP.</span>
                            </motion.h2>
                            <motion.div variants={staggerContainer} className="mw-why-list">
                                {["Empathetic Listeners — Listening and helping your story unfold naturally, in your own voice.", "Emotional Truth — Capturing the emotions, not just the moments, and writing them accordingly.", "Strict Privacy & NDA — Keeping your personal stories safe & confidential.", "Narrative Arc Mastery — Transforming cherished memories into beautifully written, heirloom-quality books.", "Legacy Focused — Preserving your legacy through every page for future generations."].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="mw-why-item">
                                        <div className="mw-why-icon"><CheckCircle2 size={14} style={{ color: "#e8391d" }} /></div>
                                        <p className="mw-why-text">{item}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* S6 FAQS */}
                <section className="mw-faqs">
                    <div className="mw-faqs-inner">
                        <div className="mw-faqs-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mw-faqs-h2">
                                FREQUENTLY ASKED <span className="accent">QUESTIONS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mw-faqs-list">
                            {faqs.map(({ q, a }, i) => (
                                <motion.div key={i} variants={fadeUp} className="mw-faq-item">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="mw-faq-trigger">
                                        <span className="mw-faq-q">{q}</span>
                                        <div className={`mw-faq-icon ${openFaq === i ? "open" : "closed"}`}>
                                            {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }} style={{ overflow: "hidden" }}>
                                                <div className="mw-faq-answer">{a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S7 CTA */}
                <section className="mw-cta">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mw-cta-inner">
                        <h2 className="mw-cta-h2">DON'T WAIT FOR SOMEDAY, START TODAY.</h2>
                        <p className="mw-cta-sub">Don't leave your memoir journey unspoken. Let us help you begin your memoir writing process and answer any concerns you may have.</p>
                        <div className="mw-cta-btns">
                            <button
                                type="button"
                                className="mw-cta-btn-dark"
                                onClick={() => setQuoteModal(true)}
                            >
                                <FileText size={16} />
                                Start Your Book
                            </button>
                            <a href="tel:2797770380" className="mw-cta-btn-border"><Phone size={16} /> Call Us Now</a>
                        </div>
                    </motion.div>

                    <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />

                </section>

            </main>
        </>
    );
}