"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    Search, ArrowRight, CheckCircle2, BarChart3, FileText, ShoppingCart,
    BookOpen, PenTool, Minus, Plus, Phone, TrendingUp, Eye, Target
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

const contentTypes = [
    { icon: FileText, title: "SEO Blog Posts", desc: "Content that answers real questions, helps readers, and drives lasting organic traffic." },
    { icon: BookOpen, title: "Pillar Pages & Guides", desc: "Pieces of content that establish a website's authority on a specific subject." },
    { icon: Target, title: "Website & Landing Page Copy", desc: "Content that engages visitors, builds trust, and drives them to take action." },
    { icon: ShoppingCart, title: "E-Commerce Product Descriptions", desc: "Content strategically optimized for readers, search engines, and AI-driven visibility." },
];

const processSteps = [
    { step: "01", title: "SERP ANALYSIS", desc: "We analyze the search engine results page (SERP) to determine which content type needs to be covered and ranked.", icon: Search },
    { step: "02", title: "STRUCTURE", desc: "We choose the angle and structure of the content, a web copy or blog, based on that SERP analysis.", icon: Target },
    { step: "03", title: "WRITING", desc: "We then write the content in a way that fills in that structure with compelling information to ensure the sell.", icon: PenTool },
    { step: "04", title: "ON-PAGE SEO", desc: "We finally polish off the content with expert on-page SEO practices.", icon: TrendingUp },
];

const faqs = [
    { q: "Are stuffing keywords in SEO content necessary?", a: "Absolutely Not. Modern SEO content is all about improving visibility without harming content quality through focusing on search intent, user experience, readability, and value. The best SEO practices naturally integrate keywords to improve visibility." },
    { q: "Do you use AI writing platforms to generate SEO content?", a: "No. We produce human-centric content without using any AI tool. Our final human-written drafts are produced to maintain originality, authenticity, and brand voice. We also maintain the quality standards modern search engines prioritize." },
    { q: "How long does it take for SEO content to rank?", a: "SEO ranking depends on a variety of factors, including competition, niche, website authority, and consistency. But quality content optimized for a specific search engine, like Google, generally starts ranking over several weeks or months." },
    { q: "What is E-E-A-T, and why does it matter?", a: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. With it, search engines can evaluate the credibility, value, and reliability of the content for users." },
    { q: "Can you write content for my specific niche?", a: "Yes, we can. Our expert SEO content writers create customized SEO content for diverse industries and audiences by keeping your business goals and brand voice in mind." },
];

export default function SEOContentWritingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);


    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .seo-main { width: 100%; overflow: hidden; font-family: 'Raleway', Arial, sans-serif; }

                .seo-eyebrow { display: flex; align-items: center; gap: 12px; }
                .seo-eyebrow.center { justify-content: center; }
                .seo-eyebrow-line { display: block; width: 32px; height: 2px; background: #e8391d; flex-shrink: 0; }
                .seo-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }

                /* ══ S1 HERO ══ */
                .seo-hero { position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #05070f; overflow: hidden; padding: 112px 0 48px; }
                .seo-hero-inner { position: relative; z-index: 10; text-align: center; padding: 0 24px; max-width: 1000px; margin: 0 auto; }
                .seo-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.95; margin-bottom: 32px; font-size: clamp(2.5rem, 6vw, 4rem); }
                .seo-hero-h1 .accent { color: #e8391d; }
                .seo-hero-sub { color: rgba(255,255,255,0.6); line-height: 1.85; max-width: 680px; margin: 0 auto 40px; font-size: clamp(0.9rem, 1.1vw, 1.05rem); }
                .seo-hero-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
                .seo-btn-primary { display: inline-flex; align-items: center; gap: 12px; background: #e8391d; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease; }
                .seo-btn-primary:hover { background: #c0271a; gap: 16px; box-shadow: 0 10px 40px rgba(232,57,29,0.4); }
                .seo-btn-outline { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
                .seo-btn-outline:hover { border-color: #e8391d; color: #e8391d; }

                /* ══ S2 OVERVIEW ══ */
                .seo-overview { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .seo-overview-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
                .seo-overview-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; margin-bottom: 24px; font-size: clamp(2rem, 3.8vw, 3.2rem); }
                .seo-overview-h2 .accent { color: #e8391d; }
                .seo-overview-body { color: #6b7280; line-height: 1.85; margin-bottom: 20px; font-size: 0.95rem; }
                .seo-overview-checklist { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
                .seo-check-item { display: flex; align-items: center; gap: 12px; }
                .seo-check-item span { color: rgba(0,0,0,0.8); font-weight: 600; font-size: 14px; }
                .seo-overview-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.2); aspect-ratio: 4/5; }

                /* ══ S3 CONTENT TYPES ══ */
                .seo-types { position: relative; width: 100%; background: #05070f; padding: 128px 0; overflow: hidden; }
                .seo-types-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 10; }
                .seo-types-header { text-align: center; margin-bottom: 64px; overflow: hidden; }
                .seo-types-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.05; font-size: clamp(2.5rem, 5vw, 4rem); }
                .seo-types-h2 .accent { color: #e8391d; font-size: clamp(2rem, 4vw, 3rem); }
                .seo-types-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .seo-type-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; display: flex; gap: 24px; align-items: flex-start; cursor: default; transition: border-color 0.5s ease; }
                .seo-type-card:hover { border-color: rgba(232,57,29,0.5); }
                .seo-type-icon { width: 56px; height: 56px; border-radius: 12px; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .seo-type-card:hover .seo-type-icon { background: #e8391d; }
                .seo-type-card:hover .seo-type-icon svg { color: white !important; }
                .seo-type-title { font-weight: 900; color: white; text-transform: uppercase; font-size: 17px; margin-bottom: 8px; letter-spacing: 0.04em; }
                .seo-type-desc { color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.65; }

                /* ══ S4 PROCESS ══ */
                .seo-process { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .seo-process-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .seo-process-header { text-align: center; margin-bottom: 80px; }
                .seo-process-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; font-size: clamp(2rem, 5vw, 4rem); }
                .seo-process-h2 .accent { color: #e8391d; }
                .seo-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; position: relative; }
                .seo-process-line { display: block; position: absolute; top: 32px; left: 12%; right: 12%; height: 2px; background: #e5e7eb; z-index: 0; }
                .seo-process-card { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .seo-process-circle { width: 64px; height: 64px; border-radius: 50%; background: #e8391d; border: 4px solid #faf9f7; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(232,57,29,0.2); }
                .seo-process-step { color: #e8391d; font-weight: 900; font-size: 12px; letter-spacing: 0.15em; margin-bottom: 8px; }
                .seo-process-title { font-weight: 900; color: black; text-transform: uppercase; font-size: 15px; margin-bottom: 12px; letter-spacing: 0.04em; line-height: 1.3; }
                .seo-process-desc { color: #6b7280; font-size: 14px; line-height: 1.65; max-width: 220px; }

                /* ══ S5 WHY CHOOSE ══ */
                .seo-why { position: relative; width: 100%; background: #111; padding: 128px 0; overflow: hidden; }
                .seo-why-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
                .seo-why-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.4); aspect-ratio: 1/1; }
                .seo-why-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 40px; font-size: clamp(2rem, 3.5vw, 3rem); }
                .seo-why-h2 .accent { color: #e8391d; }
                .seo-why-list { display: flex; flex-direction: column; gap: 20px; }
                .seo-why-item { display: flex; align-items: flex-start; gap: 16px; }
                .seo-why-icon { margin-top: 4px; width: 24px; height: 24px; border-radius: 50%; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .seo-why-item:hover .seo-why-icon { background: #e8391d; }
                .seo-why-item:hover .seo-why-icon svg { color: white !important; }
                .seo-why-text { color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.65; }

                /* ══ S6 FAQS ══ */
                .seo-faqs { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .seo-faqs-inner { max-width: 900px; margin: 0 auto; padding: 0 32px; }
                .seo-faqs-header { text-align: center; margin-bottom: 64px; }
                .seo-faqs-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2rem, 4vw, 3rem); }
                .seo-faqs-h2 .accent { color: #e8391d; }
                .seo-faqs-list { display: flex; flex-direction: column; gap: 16px; }
                .seo-faq-item { background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: border-color 0.3s ease; }
                .seo-faq-item:hover { border-color: rgba(232,57,29,0.3); }
                .seo-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 24px; text-align: left; background: none; border: none; cursor: pointer; font-family: 'Raleway', Arial, sans-serif; }
                .seo-faq-q { font-weight: 700; color: black; font-size: 15px; padding-right: 16px; line-height: 1.4; }
                .seo-faq-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
                .seo-faq-icon.open { background: #e8391d; color: white; }
                .seo-faq-icon.closed { background: #f3f4f6; color: rgba(0,0,0,0.5); }
                .seo-faq-answer { padding: 0 24px 24px; color: #6b7280; font-size: 14px; line-height: 1.75; }

                /* ══ S7 CTA ══ */
                .seo-cta { position: relative; width: 100%; background: #e8391d; padding: 112px 0; overflow: hidden; }
                .seo-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 0 32px; position: relative; z-index: 10; }
                .seo-cta-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; font-size: clamp(2.5rem, 5vw, 4rem); }
                .seo-cta-sub { color: rgba(255,255,255,0.8); font-size: 18px; max-width: 560px; margin: 0 auto 40px; line-height: 1.65; }
                .seo-cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
                .seo-cta-btn-dark { display: inline-flex; align-items: center; gap: 12px; background: black; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .seo-cta-btn-dark:hover { background: white; color: #e8391d; gap: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
                .seo-cta-btn-border { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: gap 0.2s ease; }
                .seo-cta-btn-border:hover { gap: 16px; }


                /* ══════════════════════════════════════
                   2560px — 4K
                ══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .seo-hero { padding: 160px 0 80px; }
                    .seo-hero-inner { max-width: 1800px; }
                    .seo-hero-h1 { font-size: clamp(4.5rem, 5.5vw, 8rem); margin-bottom: 52px; }
                    .seo-hero-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 1100px; margin-bottom: 60px; }
                    .seo-btn-primary, .seo-btn-outline { font-size: 16px; padding: 22px 52px; border-radius: 18px; }
                    .seo-hero-btns { gap: 28px; }

                    .seo-overview-inner, .seo-types-inner, .seo-process-inner, .seo-why-inner { max-width: 2200px; padding: 0 160px; }
                    .seo-faqs-inner { max-width: 1600px; padding: 0 160px; }
                    .seo-cta-inner { max-width: 1400px; padding: 0 60px; }
                    .seo-overview, .seo-types, .seo-process, .seo-why, .seo-faqs, .seo-cta { padding: 200px 0; }

                    .seo-overview-inner { gap: 120px; }
                    .seo-overview-h2 { font-size: clamp(3rem, 3.5vw, 5.5rem); margin-bottom: 40px; }
                    .seo-overview-body { font-size: 1.25rem; line-height: 1.9; }
                    .seo-overview-checklist { gap: 24px; }
                    .seo-check-item span { font-size: 18px; }

                    .seo-types-header { margin-bottom: 100px; }
                    .seo-types-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .seo-types-h2 .accent { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .seo-types-grid { gap: 40px; }
                    .seo-type-card { padding: 52px; gap: 36px; border-radius: 24px; }
                    .seo-type-icon { width: 76px; height: 76px; border-radius: 18px; }
                    .seo-type-title { font-size: 22px; }
                    .seo-type-desc { font-size: 18px; }

                    .seo-process-header { margin-bottom: 120px; }
                    .seo-process-h2 { font-size: clamp(3rem, 5vw, 7rem); }
                    .seo-process-grid { gap: 52px; }
                    .seo-process-circle { width: 88px; height: 88px; margin-bottom: 36px; }
                    .seo-process-title { font-size: 19px; margin-bottom: 16px; }
                    .seo-process-desc { font-size: 18px; max-width: 320px; }
                    .seo-process-step { font-size: 15px; }

                    .seo-why-inner { gap: 120px; }
                    .seo-why-h2 { font-size: clamp(3rem, 3.5vw, 5rem); margin-bottom: 60px; }
                    .seo-why-list { gap: 28px; }
                    .seo-why-text { font-size: 19px; }
                    .seo-why-icon { width: 32px; height: 32px; }

                    .seo-faqs-header { margin-bottom: 80px; }
                    .seo-faqs-h2 { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .seo-faq-trigger { padding: 36px; }
                    .seo-faq-q { font-size: 19px; }
                    .seo-faq-answer { padding: 0 36px 36px; font-size: 17px; }
                    .seo-faq-icon { width: 44px; height: 44px; }
                    .seo-faqs-list { gap: 24px; }

                    .seo-cta-h2 { font-size: clamp(3.5rem, 5vw, 7rem); }
                    .seo-cta-sub { font-size: 24px; max-width: 800px; }
                    .seo-cta-btn-dark, .seo-cta-btn-border { font-size: 18px; padding: 26px 60px; border-radius: 18px; }
                    .seo-cta-btns { gap: 32px; }
                }

                /* ══════════════════════════════════════
                   1920px — Full HD
                ══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .seo-hero { padding: 130px 0 60px; }
                    .seo-hero-inner { max-width: 1400px; }
                    .seo-hero-h1 { font-size: clamp(3.5rem, 5vw, 6.5rem); }
                    .seo-hero-sub { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 900px; }
                    .seo-btn-primary, .seo-btn-outline { font-size: 14px; padding: 20px 44px; }

                    .seo-overview-inner, .seo-types-inner, .seo-process-inner, .seo-why-inner { max-width: 1700px; padding: 0 130px; }
                    .seo-faqs-inner { max-width: 1200px; padding: 0 64px; }
                    .seo-overview, .seo-types, .seo-process, .seo-why, .seo-faqs, .seo-cta { padding: 160px 0; }

                    .seo-overview-inner { gap: 100px; }
                    .seo-overview-h2 { font-size: clamp(2.6rem, 3.5vw, 4.5rem); }
                    .seo-overview-body { font-size: 1.1rem; }
                    .seo-check-item span { font-size: 16px; }

                    .seo-types-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .seo-types-h2 .accent { font-size: clamp(2.4rem, 3.5vw, 4.8rem); }
                    .seo-types-grid { gap: 32px; }
                    .seo-type-card { padding: 44px; gap: 28px; }
                    .seo-type-icon { width: 64px; height: 64px; }
                    .seo-type-title { font-size: 20px; }
                    .seo-type-desc { font-size: 16px; }

                    .seo-process-h2 { font-size: clamp(2.6rem, 4.5vw, 6rem); }
                    .seo-process-grid { gap: 44px; }
                    .seo-process-circle { width: 72px; height: 72px; }
                    .seo-process-title { font-size: 17px; }
                    .seo-process-desc { font-size: 16px; }

                    .seo-why-inner { gap: 100px; }
                    .seo-why-h2 { font-size: clamp(2.5rem, 3.2vw, 4.2rem); }
                    .seo-why-text { font-size: 17px; }

                    .seo-faqs-h2 { font-size: clamp(2.5rem, 3.5vw, 5rem); }
                    .seo-faq-q { font-size: 17px; }
                    .seo-faq-answer { font-size: 15px; }

                    .seo-cta-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .seo-cta-sub { font-size: 21px; }
                    .seo-cta-btn-dark, .seo-cta-btn-border { font-size: 16px; padding: 22px 52px; }
                    .seo-cta-inner { max-width: 1200px; }
                }

                /* ══════════════════════════════════════
                   1440px
                ══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .seo-overview-inner, .seo-types-inner, .seo-process-inner, .seo-why-inner { max-width: 1360px; padding: 0 96px; }
                    .seo-overview, .seo-types, .seo-process, .seo-why, .seo-faqs, .seo-cta { padding: 140px 0; }
                    .seo-overview-inner { gap: 88px; }
                    .seo-overview-h2 { font-size: clamp(2.2rem, 3.5vw, 3.6rem); }
                    .seo-types-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .seo-process-h2 { font-size: clamp(2.2rem, 4.5vw, 4.8rem); }
                    .seo-why-h2 { font-size: clamp(2.2rem, 3.2vw, 3.6rem); }
                    .seo-cta-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                }

                /* ══════════════════════════════════════
                   1280px
                ══════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .seo-overview-inner, .seo-types-inner, .seo-process-inner, .seo-why-inner { max-width: 1160px; padding: 0 64px; }
                }

                /* ══════════════════════════════════════
                   1024px
                ══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .seo-overview-inner, .seo-types-inner, .seo-process-inner, .seo-why-inner { padding: 0 48px; }
                    .seo-faqs-inner { padding: 0 48px; }
                    .seo-overview, .seo-types, .seo-process, .seo-why, .seo-faqs, .seo-cta { padding: 96px 0; }
                    .seo-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .seo-overview-img-wrap { display: none; }
                    .seo-overview-h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); }
                    .seo-types-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .seo-type-card { padding: 24px; gap: 18px; }
                    .seo-type-icon { width: 44px; height: 44px; }
                    .seo-process-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
                    .seo-process-h2 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); }
                    .seo-process-line { display: none; }
                    .seo-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .seo-why-img-wrap { display: none; }
                    .seo-why-h2 { font-size: clamp(1.8rem, 3.2vw, 2.6rem); }
                    .seo-cta-h2 { font-size: clamp(2rem, 4.5vw, 3rem); }
                    .seo-cta-sub { font-size: 15px; }
                    .seo-cta-btn-dark, .seo-cta-btn-border { font-size: 12px; padding: 16px 28px; }
                }

                /* ══════════════════════════════════════
                   900px — Tablet
                ══════════════════════════════════════ */
                @media (max-width: 900px) {
                    .seo-overview-inner, .seo-types-inner, .seo-process-inner, .seo-why-inner { padding: 0 40px; }
                    .seo-faqs-inner { padding: 0 40px; }
                    .seo-overview, .seo-types, .seo-process, .seo-why, .seo-faqs, .seo-cta { padding: 80px 0; }
                    .seo-hero-h1 { font-size: clamp(2.2rem, 6vw, 3.6rem); }
                    .seo-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .seo-overview-img-wrap { display: none; }
                    .seo-overview-h2 { font-size: clamp(1.8rem, 4.5vw, 2.8rem); }
                    .seo-types-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .seo-types-header { margin-bottom: 40px; }
                    .seo-process-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
                    .seo-process-h2 { font-size: clamp(1.6rem, 5vw, 2.6rem); }
                    .seo-process-header { margin-bottom: 48px; }
                    .seo-process-line { display: none; }
                    .seo-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .seo-why-img-wrap { display: none; }
                    .seo-why-h2 { font-size: clamp(1.8rem, 5vw, 2.6rem); }
                    .seo-cta-h2 { font-size: clamp(1.8rem, 5.5vw, 2.8rem); }
                    .seo-cta-sub { font-size: 15px; }
                }

                /* ══════════════════════════════════════
                   768px
                ══════════════════════════════════════ */
                @media (max-width: 768px) {
                    .seo-overview-inner, .seo-types-inner, .seo-process-inner, .seo-why-inner { padding: 0 32px; }
                    .seo-faqs-inner { padding: 0 32px; }
                    .seo-hero-h1 { font-size: clamp(1.9rem, 7vw, 3rem); }
                    .seo-type-card { padding: 20px; gap: 16px; }
                    .seo-type-icon { width: 40px; height: 40px; }
                    .seo-faq-trigger { padding: 20px; }
                    .seo-cta-h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); }
                }

                /* ══════════════════════════════════════
                   640px — Large Mobile
                ══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .seo-overview-inner, .seo-types-inner, .seo-process-inner, .seo-why-inner { padding: 0 20px; }
                    .seo-faqs-inner { padding: 0 20px; }
                    .seo-cta-inner { padding: 0 20px; }
                    .seo-overview, .seo-types, .seo-process, .seo-why, .seo-faqs, .seo-cta { padding: 56px 0; }
                    .seo-hero-h1 { font-size: clamp(1.7rem, 8vw, 2.6rem); margin-bottom: 20px; }
                    .seo-hero-sub { font-size: 0.875rem; margin-bottom: 28px; }
                    .seo-btn-primary, .seo-btn-outline { font-size: 11px; padding: 13px 22px; border-radius: 10px; width: 100%; justify-content: center; }
                    .seo-hero-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .seo-overview-h2 { font-size: clamp(1.5rem, 6.5vw, 2.2rem); }
                    .seo-overview-body { font-size: 0.875rem; }
                    .seo-overview-checklist { gap: 12px; }
                    .seo-check-item span { font-size: 13px; }
                    .seo-types-grid { grid-template-columns: 1fr; gap: 14px; }
                    .seo-types-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .seo-type-card { padding: 18px; gap: 14px; border-radius: 12px; }
                    .seo-type-icon { width: 36px; height: 36px; border-radius: 9px; }
                    .seo-type-title { font-size: 14px; }
                    .seo-type-desc { font-size: 13px; }
                    .seo-process-grid { grid-template-columns: 1fr; gap: 28px; }
                    .seo-process-h2 { font-size: clamp(1.4rem, 7vw, 2rem); }
                    .seo-process-header { margin-bottom: 36px; }
                    .seo-process-circle { width: 52px; height: 52px; margin-bottom: 16px; }
                    .seo-process-title { font-size: 13px; margin-bottom: 8px; }
                    .seo-process-desc { font-size: 13px; }
                    .seo-why-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); margin-bottom: 28px; }
                    .seo-why-text { font-size: 13.5px; }
                    .seo-why-list { gap: 14px; }
                    .seo-faqs-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .seo-faqs-header { margin-bottom: 36px; }
                    .seo-faq-q { font-size: 13.5px; }
                    .seo-faq-answer { font-size: 13px; }
                    .seo-faq-trigger { padding: 16px; }
                    .seo-cta-h2 { font-size: clamp(1.5rem, 7.5vw, 2.2rem); }
                    .seo-cta-sub { font-size: 14px; }
                    .seo-cta-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .seo-cta-btn-dark, .seo-cta-btn-border { font-size: 11px; padding: 14px 24px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ══════════════════════════════════════
                   480px
                ══════════════════════════════════════ */
                @media (max-width: 480px) {
                    .seo-hero-h1 { font-size: clamp(1.5rem, 8.5vw, 2.2rem); }
                    .seo-overview-h2, .seo-types-h2, .seo-process-h2, .seo-why-h2, .seo-faqs-h2, .seo-cta-h2 { font-size: clamp(1.35rem, 7.5vw, 1.9rem); }
                }

                /* ══════════════════════════════════════
                   380px — iPhone SE
                ══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .seo-overview-inner, .seo-types-inner, .seo-process-inner, .seo-why-inner { padding: 0 14px; }
                    .seo-faqs-inner, .seo-cta-inner { padding: 0 14px; }
                    .seo-hero-h1 { font-size: 1.4rem; }
                    .seo-overview-h2, .seo-types-h2, .seo-process-h2, .seo-why-h2, .seo-faqs-h2, .seo-cta-h2 { font-size: 1.25rem; }
                    .seo-type-card { padding: 14px; gap: 12px; }
                    .seo-cta-btn-dark, .seo-cta-btn-border { font-size: 10px; padding: 12px 18px; }
                }

                /* ══════════════════════════════════════
                   320px
                ══════════════════════════════════════ */
                @media (max-width: 320px) {
                    .seo-overview-inner, .seo-types-inner, .seo-process-inner, .seo-why-inner { padding: 0 12px; }
                    .seo-faqs-inner, .seo-cta-inner { padding: 0 12px; }
                    .seo-hero-h1 { font-size: 1.25rem; }
                    .seo-overview-h2, .seo-types-h2, .seo-process-h2, .seo-why-h2, .seo-faqs-h2, .seo-cta-h2 { font-size: 1.1rem; }
                }
            `}</style>

            <main className="seo-main">

                {/* S1 HERO */}
                <section className="seo-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <div className="absolute pointer-events-none" style={{ top: "33%", right: "25%", width: 900, height: 600, background: "rgba(232,57,29,0.1)", borderRadius: "50%", filter: "blur(180px)" }} />
                    <div className="seo-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="seo-eyebrow center" style={{ marginBottom: 24 }}>
                            <TrendingUp size={16} style={{ color: "#e8391d" }} />
                            <span className="seo-eyebrow-text">SEO Content Writing</span>
                        </motion.div>
                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="seo-hero-h1">
                            WE CREATE CONTENT <br /><span className="accent">THAT RANKS AND ENGAGES.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="seo-hero-sub">
                            We create high-quality content that's relevant to your readers and helps your brand get found more easily by search engines.
                        </motion.p>

                        <HeroButtons />
                    </div>
                </section>

                {/* S2 OVERVIEW */}
                <section id="overview" ref={overviewRef} className="seo-overview">
                    <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="seo-overview-inner">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <motion.div variants={fadeUp} className="seo-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="seo-eyebrow-line" /><span className="seo-eyebrow-text">HUMAN-CENTRIC – ALGORITHM-FRIENDLY</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="seo-overview-h2">
                                BOOST TRAFFIC COMING FROM <span className="accent">SEARCH ENGINES TO YOUR BRAND.</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="seo-overview-body">
                                SEO-optimized, human-first content for your website, landing page, blogs, or product descriptions is truly an asset to your business. With effective SEO content writing, you can build authority and influence in your respective field while increasing your brand's visibility on the web. With our SEO content writing service, you can turn your business into a useful resource for visitors and potential customers.
                            </motion.p>
                            <motion.p variants={fadeUp} className="seo-overview-body" style={{ marginBottom: 32 }}>
                                Our content writers target a specific audience of people who are looking for what a company offers. We ensure your brand receives well-optimized web traffic that converts into purchases. Our expert writing team intimately knows the specific needs of each of the main players involved in your success and how to cater to these needs.
                            </motion.p>
                            <motion.div variants={staggerContainer} className="seo-overview-checklist">
                                {["Expert-Led, Human-Crafted Content", "Search-Intent Driven Content Strategy", "SEO Optimization & Smart Internal Linking", "Structured To Engage and Convert"].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="seo-check-item">
                                        <CheckCircle2 size={18} style={{ color: "#e8391d", flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="seo-overview-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/seo-content-writing/01.jpg" alt="SEO Content Writing Service" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                            <div className="absolute" style={{ bottom: -20, left: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.2)", zIndex: -1 }} />
                        </motion.div>
                    </motion.div>
                </section>

                {/* S3 CONTENT TYPES */}
                <section className="seo-types">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="seo-types-inner">
                        <div className="seo-types-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="seo-eyebrow center" style={{ marginBottom: 16 }}>
                                <BarChart3 size={16} style={{ color: "#e8391d" }} /><span className="seo-eyebrow-text">Content Types</span>
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="seo-types-h2">
                                SEO CONTENT <br /><span className="accent">THE SMARTER WAY TO DRIVE ORGANIC TRAFFIC</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="seo-types-grid">
                            {contentTypes.map(({ icon: Icon, title, desc }) => (
                                <motion.div key={title} variants={fadeUp} className="seo-type-card">
                                    <div className="seo-type-icon"><Icon size={26} style={{ color: "#e8391d" }} /></div>
                                    <div>
                                        <h3 className="seo-type-title">{title}</h3>
                                        <p className="seo-type-desc">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S4 PROCESS */}
                <section className="seo-process">
                    <div className="seo-process-inner">
                        <div className="seo-process-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="seo-process-h2">
                                AMAZING CONTENT + SOLID ON-PAGE SEO = <span className="accent">SEO WRITING.</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="seo-process-grid">
                            <div className="seo-process-line" />
                            {processSteps.map(({ step, title, desc, icon: Icon }) => (
                                <motion.div key={step} variants={fadeUp} className="seo-process-card">
                                    <div className="seo-process-circle"><Icon size={24} style={{ color: "white" }} /></div>
                                    <span className="seo-process-step">{step}</span>
                                    <h3 className="seo-process-title">{title}</h3>
                                    <p className="seo-process-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S5 WHY CHOOSE */}
                <section className="seo-why">
                    <div className="seo-why-inner">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="seo-why-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/seo-content-writing/02.jpg" alt="SEO Content Team" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "rgba(232,57,29,0.2)", mixBlendMode: "multiply" }} />
                            <div className="absolute" style={{ bottom: -20, right: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.25)", zIndex: -1 }} />
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <motion.div variants={fadeUp} className="seo-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="seo-eyebrow-line" /><span className="seo-eyebrow-text">WHY BEXLEY PUBLISHING</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="seo-why-h2">
                                OUR SEO WORK <br /><span className="accent">CONNECTS CONTENT DIRECTLY TO STRATEGY.</span>
                            </motion.h2>
                            <motion.div variants={staggerContainer} className="seo-why-list">
                                {["SEO-Driven Storytelling — Strong storytelling through keyword research, formatting, and technical optimization.", "100% Human-Written — We never use AI to generate final drafts.", "Goal-Oriented Content Strategy — Planning, execution, and alignment with your business goals.", "Modern SEO Optimization — Alignment with modern trends in SEO.", "AI-Ready Content Optimization — Content optimizing for emerging AI-driven models like Google AI overviews."].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="seo-why-item">
                                        <div className="seo-why-icon"><CheckCircle2 size={14} style={{ color: "#e8391d" }} /></div>
                                        <p className="seo-why-text">{item}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* S6 FAQS */}
                <section className="seo-faqs">
                    <div className="seo-faqs-inner">
                        <div className="seo-faqs-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="seo-faqs-h2">
                                FREQUENTLY ASKED <span className="accent">QUESTIONS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="seo-faqs-list">
                            {faqs.map(({ q, a }, i) => (
                                <motion.div key={i} variants={fadeUp} className="seo-faq-item">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="seo-faq-trigger">
                                        <span className="seo-faq-q">{q}</span>
                                        <div className={`seo-faq-icon ${openFaq === i ? "open" : "closed"}`}>
                                            {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }} style={{ overflow: "hidden" }}>
                                                <div className="seo-faq-answer">{a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S7 CTA */}
                <section className="seo-cta">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="seo-cta-inner">
                        <h2 className="seo-cta-h2">BETTER CONTENT. BIGGER SEARCH PRESENCE.</h2>
                        <p className="seo-cta-sub">Don't let competitors with weaker products but stronger SEO take away your customers. Let's fix that today.</p>
                        <div className="seo-cta-btns">
                            <button
                                type="button"
                                className="seo-cta-btn-dark"
                                onClick={() => setQuoteModal(true)}
                            >
                                <FileText size={16} />
                                Start Your Book
                            </button>
                            <a href="tel:2797770380" className="seo-cta-btn-border"><Phone size={16} /> Call Us Now</a>
                        </div>
                    </motion.div>
                </section>

                <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />

            </main>
        </>
    );
}