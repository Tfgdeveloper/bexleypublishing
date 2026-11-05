"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    BookHeart, ArrowRight, CheckCircle2, Palette, Baby, GraduationCap,
    Sparkles, BookOpen, PenTool, Minus, Plus, Phone, Users, LayoutGrid, Smile,
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

const ageGroups = [
    { icon: Baby, title: "Picture Books (Ages 0-5)", desc: "Captivating toddlers and parents alike with vibrant, minimal text and cinematic visual storytelling." },
    { icon: Smile, title: "Early Readers (Ages 5-7)", desc: "Ensuring kids read with confidence by integrating simple vocabulary, compact chapters, and compelling storylines." },
    { icon: BookOpen, title: "Middle Grade (Ages 8-12)", desc: "Keeping independent readers engaged through complex narratives, character growth, and wonder-filled worlds." },
    { icon: GraduationCap, title: "Young Adult (Ages 13+)", desc: "Creating books to resonate with teens with mature themes and emotion-driven storytelling." },
];

const processSteps = [
    { step: "01", title: "Concept & Moral", desc: "Your story should deliver an emotional lesson and a reader-friendly message, and we ensure this.", icon: Sparkles },
    { step: "02", title: "Storyboarding", desc: "Every page should keep the story engaging and visually immersive, and we map each one accordingly.", icon: LayoutGrid },
    { step: "03", title: "Writing & Rhyming", desc: "Your story must have rhythm, fun, and imagination, and we do this through lively, kid-friendly writing.", icon: PenTool },
    { step: "04", title: "Illustration Briefing", desc: "Illustrations need to match your story and its characters beautifully, so we craft clear, creative briefs.", icon: Palette },
];

const faqs = [
    { q: "Do I need to have illustrations ready before book writing and final publishing?", a: "No. You just need to share your project idea with us, and we will create illustrations in collaboration with you and ensure they perfectly match your story, voice, and audience." },
    { q: "Should my children's book rhyme?", a: "Again, no, and it's not necessarily. Some stories require rhyming that works beautifully. But others work well with simple, natural, reader-friendly storytelling." },
    { q: "How much time does your writer take to write my book?", a: "It depends on the complexity of the illustrations, the revisions, and the desired reading age group. Most children's books take several weeks to a few months." },
    { q: "What makes a children's book successful?", a: "A children's book truly stands out if it is based on influential storytelling, striking characters, appealing visuals, emotional connection, and age-appropriate language." },
    { q: "Can you help with books based on educational or curriculum niches?", a: "Yes. We create educational children's books, and we have created 200+ books designed around learning goals, curriculum standards, age levels, and winning storytelling techniques." },
];

export default function ChildrensBookPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .cb-main { width: 100%; overflow: hidden; font-family: 'Raleway', Arial, sans-serif; }

                .cb-eyebrow { display: flex; align-items: center; gap: 12px; }
                .cb-eyebrow.center { justify-content: center; }
                .cb-eyebrow-line { display: block; width: 32px; height: 2px; background: #e8391d; flex-shrink: 0; }
                .cb-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }

                /* ══ S1 HERO ══ */
                .cb-hero { position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #05070f; overflow: hidden; padding: 112px 0 48px; }
                .cb-hero-inner { position: relative; z-index: 10; text-align: center; padding: 0 24px; max-width: 1000px; margin: 0 auto; }
                .cb-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.95; margin-bottom: 32px; font-size: clamp(2.5rem, 6vw, 4rem); }
                .cb-hero-h1 .accent { color: #e8391d; }
                .cb-hero-sub { color: rgba(255,255,255,0.6); line-height: 1.85; max-width: 680px; margin: 0 auto 40px; font-size: clamp(0.9rem, 1.1vw, 1.05rem); }
                .cb-hero-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
                .cb-btn-primary { display: inline-flex; align-items: center; gap: 12px; background: #e8391d; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease; }
                .cb-btn-primary:hover { background: #c0271a; gap: 16px; box-shadow: 0 10px 40px rgba(232,57,29,0.4); }
                .cb-btn-outline { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
                .cb-btn-outline:hover { border-color: #e8391d; color: #e8391d; }

                /* ══ S2 OVERVIEW ══ */
                .cb-overview { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .cb-overview-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
                .cb-overview-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; margin-bottom: 24px; font-size: clamp(2rem, 3vw, 3rem); }
                .cb-overview-h2 .accent { color: #e8391d; }
                .cb-overview-body { color: #6b7280; line-height: 1.85; margin-bottom: 20px; font-size: 0.95rem; }
                .cb-overview-checklist { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
                .cb-check-item { display: flex; align-items: center; gap: 12px; }
                .cb-check-item span { color: rgba(0,0,0,0.8); font-weight: 600; font-size: 14px; }
                .cb-overview-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.2); aspect-ratio: 4/5; }

                /* ══ S3 AGE GROUPS ══ */
                .cb-ages { position: relative; width: 100%; background: #05070f; padding: 128px 0; overflow: hidden; }
                .cb-ages-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 10; }
                .cb-ages-header { text-align: center; margin-bottom: 64px; overflow: hidden; }
                .cb-ages-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .cb-ages-h2 .accent { color: #e8391d; }
                .cb-ages-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .cb-age-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; display: flex; gap: 24px; align-items: flex-start; cursor: default; transition: border-color 0.5s ease; }
                .cb-age-card:hover { border-color: rgba(232,57,29,0.5); }
                .cb-age-icon { width: 56px; height: 56px; border-radius: 12px; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .cb-age-card:hover .cb-age-icon { background: #e8391d; }
                .cb-age-card:hover .cb-age-icon svg { color: white !important; }
                .cb-age-title { font-weight: 900; color: white; text-transform: uppercase; font-size: 16px; margin-bottom: 8px; letter-spacing: 0.04em; }
                .cb-age-desc { color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.65; }

                /* ══ S4 PROCESS ══ */
                .cb-process { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .cb-process-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .cb-process-header { text-align: center; margin-bottom: 80px; }
                .cb-process-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; font-size: clamp(2.5rem, 5vw, 4rem); }
                .cb-process-h2 .accent { color: #e8391d; font-size: clamp(2rem, 4vw, 3rem); }
                .cb-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; position: relative; }
                .cb-process-line { display: block; position: absolute; top: 32px; left: 12%; right: 12%; height: 2px; background: #e5e7eb; z-index: 0; }
                .cb-process-card { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .cb-process-circle { width: 64px; height: 64px; border-radius: 50%; background: #e8391d; border: 4px solid #faf9f7; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(232,57,29,0.2); }
                .cb-process-step { color: #e8391d; font-weight: 900; font-size: 12px; letter-spacing: 0.15em; margin-bottom: 8px; }
                .cb-process-title { font-weight: 900; color: black; text-transform: uppercase; font-size: 16px; margin-bottom: 12px; letter-spacing: 0.04em; }
                .cb-process-desc { color: #6b7280; font-size: 14px; line-height: 1.65; max-width: 220px; }

                /* ══ S5 WHY CHOOSE ══ */
                .cb-why { position: relative; width: 100%; background: #111; padding: 128px 0; overflow: hidden; }
                .cb-why-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
                .cb-why-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.4); aspect-ratio: 1/1; }
                .cb-why-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 40px; font-size: clamp(2rem, 3.5vw, 3rem); }
                .cb-why-h2 .accent { color: #e8391d; }
                .cb-why-list { display: flex; flex-direction: column; gap: 20px; }
                .cb-why-item { display: flex; align-items: flex-start; gap: 16px; }
                .cb-why-icon { margin-top: 4px; width: 24px; height: 24px; border-radius: 50%; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .cb-why-item:hover .cb-why-icon { background: #e8391d; }
                .cb-why-item:hover .cb-why-icon svg { color: white !important; }
                .cb-why-text { color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.65; }

                /* ══ S6 FAQS ══ */
                .cb-faqs { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .cb-faqs-inner { max-width: 900px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 10; }
                .cb-faqs-header { text-align: center; margin-bottom: 64px; }
                .cb-faqs-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2rem, 4vw, 3rem); }
                .cb-faqs-h2 .accent { color: #e8391d; }
                .cb-faqs-list { display: flex; flex-direction: column; gap: 16px; }
                .cb-faq-item { background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: border-color 0.3s ease; }
                .cb-faq-item:hover { border-color: rgba(232,57,29,0.3); }
                .cb-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 24px; text-align: left; background: none; border: none; cursor: pointer; font-family: 'Raleway', Arial, sans-serif; }
                .cb-faq-q { font-weight: 700; color: black; font-size: 15px; padding-right: 16px; line-height: 1.4; }
                .cb-faq-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
                .cb-faq-icon.open { background: #e8391d; color: white; }
                .cb-faq-icon.closed { background: #f3f4f6; color: rgba(0,0,0,0.5); }
                .cb-faq-answer { padding: 0 24px 24px; color: #6b7280; font-size: 14px; line-height: 1.75; }

                /* ══ S7 CTA ══ */
                .cb-cta { position: relative; width: 100%; background: #e8391d; padding: 112px 0; overflow: hidden; }
                .cb-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 0 32px; position: relative; z-index: 10; }
                .cb-cta-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; font-size: clamp(2.5rem, 4vw, 3rem); }
                .cb-cta-sub { color: rgba(255,255,255,0.8); font-size: 18px; max-width: 560px; margin: 0 auto 40px; line-height: 1.65; }
                .cb-cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
                .cb-cta-btn-dark { display: inline-flex; align-items: center; gap: 12px; background: black; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .cb-cta-btn-dark:hover { background: white; color: #e8391d; gap: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
                .cb-cta-btn-border { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: gap 0.2s ease; }
                .cb-cta-btn-border:hover { gap: 16px; }


                /* ══════════════════════════════════════
                   2560px — 4K
                ══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .cb-hero { padding: 160px 0 80px; }
                    .cb-hero-inner { max-width: 1800px; }
                    .cb-hero-h1 { font-size: clamp(4.5rem, 5.5vw, 8rem); margin-bottom: 52px; }
                    .cb-hero-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 1100px; margin-bottom: 60px; }
                    .cb-btn-primary, .cb-btn-outline { font-size: 16px; padding: 22px 52px; border-radius: 18px; }
                    .cb-hero-btns { gap: 28px; }

                    .cb-overview-inner, .cb-ages-inner, .cb-process-inner, .cb-why-inner { max-width: 2200px; padding: 0 160px; }
                    .cb-faqs-inner { max-width: 1600px; padding: 0 160px; }
                    .cb-cta-inner { max-width: 1400px; padding: 0 60px; }
                    .cb-overview, .cb-ages, .cb-process, .cb-why, .cb-faqs, .cb-cta { padding: 200px 0; }

                    .cb-overview-inner { gap: 120px; }
                    .cb-overview-h2 { font-size: clamp(3rem, 3vw, 5rem); margin-bottom: 40px; }
                    .cb-overview-body { font-size: 1.25rem; line-height: 1.9; }
                    .cb-overview-checklist { gap: 24px; }
                    .cb-check-item span { font-size: 18px; }

                    .cb-ages-header { margin-bottom: 100px; }
                    .cb-ages-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .cb-ages-grid { gap: 40px; }
                    .cb-age-card { padding: 52px; gap: 36px; border-radius: 24px; }
                    .cb-age-icon { width: 76px; height: 76px; border-radius: 18px; }
                    .cb-age-title { font-size: 22px; }
                    .cb-age-desc { font-size: 18px; }

                    .cb-process-header { margin-bottom: 120px; }
                    .cb-process-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .cb-process-h2 .accent { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .cb-process-grid { gap: 52px; }
                    .cb-process-circle { width: 88px; height: 88px; margin-bottom: 36px; }
                    .cb-process-title { font-size: 20px; margin-bottom: 16px; }
                    .cb-process-desc { font-size: 18px; max-width: 320px; }
                    .cb-process-step { font-size: 15px; }

                    .cb-why-inner { gap: 120px; }
                    .cb-why-h2 { font-size: clamp(3rem, 3.5vw, 5rem); margin-bottom: 60px; }
                    .cb-why-list { gap: 28px; }
                    .cb-why-text { font-size: 19px; }
                    .cb-why-icon { width: 32px; height: 32px; }

                    .cb-faqs-header { margin-bottom: 80px; }
                    .cb-faqs-h2 { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .cb-faq-trigger { padding: 36px; }
                    .cb-faq-q { font-size: 19px; }
                    .cb-faq-answer { padding: 0 36px 36px; font-size: 17px; }
                    .cb-faq-icon { width: 44px; height: 44px; }
                    .cb-faqs-list { gap: 24px; }

                    .cb-cta-h2 { font-size: clamp(3.5rem, 4.5vw, 6.5rem); }
                    .cb-cta-sub { font-size: 24px; max-width: 800px; }
                    .cb-cta-btn-dark, .cb-cta-btn-border { font-size: 18px; padding: 26px 60px; border-radius: 18px; }
                    .cb-cta-btns { gap: 32px; }
                }

                /* ══════════════════════════════════════
                   1920px — Full HD
                ══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .cb-hero { padding: 130px 0 60px; }
                    .cb-hero-inner { max-width: 1400px; }
                    .cb-hero-h1 { font-size: clamp(3.5rem, 5vw, 6.5rem); }
                    .cb-hero-sub { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 900px; }
                    .cb-btn-primary, .cb-btn-outline { font-size: 14px; padding: 20px 44px; }

                    .cb-overview-inner, .cb-ages-inner, .cb-process-inner, .cb-why-inner { max-width: 1700px; padding: 0 130px; }
                    .cb-faqs-inner { max-width: 1200px; padding: 0 64px; }
                    .cb-overview, .cb-ages, .cb-process, .cb-why, .cb-faqs, .cb-cta { padding: 160px 0; }

                    .cb-overview-inner { gap: 100px; }
                    .cb-overview-h2 { font-size: clamp(2.6rem, 2.8vw, 4.2rem); }
                    .cb-overview-body { font-size: 1.1rem; }
                    .cb-check-item span { font-size: 16px; }

                    .cb-ages-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .cb-ages-grid { gap: 32px; }
                    .cb-age-card { padding: 44px; gap: 28px; }
                    .cb-age-icon { width: 64px; height: 64px; }
                    .cb-age-title { font-size: 20px; }
                    .cb-age-desc { font-size: 16px; }

                    .cb-process-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .cb-process-grid { gap: 44px; }
                    .cb-process-circle { width: 72px; height: 72px; }
                    .cb-process-title { font-size: 18px; }
                    .cb-process-desc { font-size: 16px; }

                    .cb-why-inner { gap: 100px; }
                    .cb-why-h2 { font-size: clamp(2.5rem, 3.2vw, 4.2rem); }
                    .cb-why-text { font-size: 17px; }

                    .cb-faqs-h2 { font-size: clamp(2.5rem, 3.5vw, 5rem); }
                    .cb-faq-q { font-size: 17px; }
                    .cb-faq-answer { font-size: 15px; }

                    .cb-cta-h2 { font-size: clamp(3rem, 3.5vw, 5rem); }
                    .cb-cta-sub { font-size: 21px; }
                    .cb-cta-btn-dark, .cb-cta-btn-border { font-size: 16px; padding: 22px 52px; }
                    .cb-cta-inner { max-width: 1200px; }
                }

                /* ══════════════════════════════════════
                   1440px
                ══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .cb-overview-inner, .cb-ages-inner, .cb-process-inner, .cb-why-inner { max-width: 1360px; padding: 0 96px; }
                    .cb-overview, .cb-ages, .cb-process, .cb-why, .cb-faqs, .cb-cta { padding: 140px 0; }
                    .cb-overview-inner { gap: 88px; }
                    .cb-overview-h2 { font-size: clamp(2.2rem, 2.8vw, 3.4rem); }
                    .cb-ages-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .cb-process-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .cb-why-h2 { font-size: clamp(2.2rem, 3.2vw, 3.6rem); }
                    .cb-cta-h2 { font-size: clamp(2.8rem, 3.5vw, 4rem); }
                }

                /* ══════════════════════════════════════
                   1280px
                ══════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .cb-overview-inner, .cb-ages-inner, .cb-process-inner, .cb-why-inner { max-width: 1160px; padding: 0 64px; }
                }

                /* ══════════════════════════════════════
                   1024px
                ══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .cb-overview-inner, .cb-ages-inner, .cb-process-inner, .cb-why-inner { padding: 0 48px; }
                    .cb-faqs-inner { padding: 0 48px; }
                    .cb-overview, .cb-ages, .cb-process, .cb-why, .cb-faqs, .cb-cta { padding: 96px 0; }
                    .cb-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .cb-overview-img-wrap { display: none; }
                    .cb-overview-h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); }
                    .cb-ages-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .cb-age-card { padding: 24px; gap: 18px; }
                    .cb-age-icon { width: 44px; height: 44px; }
                    .cb-process-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
                    .cb-process-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .cb-process-line { display: none; }
                    .cb-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .cb-why-img-wrap { display: none; }
                    .cb-why-h2 { font-size: clamp(1.8rem, 3.2vw, 2.6rem); }
                    .cb-cta-h2 { font-size: clamp(2rem, 4vw, 2.8rem); }
                    .cb-cta-sub { font-size: 15px; }
                    .cb-cta-btn-dark, .cb-cta-btn-border { font-size: 12px; padding: 16px 28px; }
                }

                /* ══════════════════════════════════════
                   900px — Tablet
                ══════════════════════════════════════ */
                @media (max-width: 900px) {
                    .cb-overview-inner, .cb-ages-inner, .cb-process-inner, .cb-why-inner { padding: 0 40px; }
                    .cb-faqs-inner { padding: 0 40px; }
                    .cb-overview, .cb-ages, .cb-process, .cb-why, .cb-faqs, .cb-cta { padding: 80px 0; }
                    .cb-hero-h1 { font-size: clamp(2.2rem, 6vw, 3.6rem); }
                    .cb-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .cb-overview-img-wrap { display: none; }
                    .cb-overview-h2 { font-size: clamp(1.8rem, 4.5vw, 2.6rem); }
                    .cb-ages-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .cb-ages-header { margin-bottom: 40px; }
                    .cb-process-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
                    .cb-process-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .cb-process-header { margin-bottom: 48px; }
                    .cb-process-line { display: none; }
                    .cb-why-inner { grid-template-columns: 1fr; gap: 48px; }
                    .cb-why-img-wrap { display: none; }
                    .cb-why-h2 { font-size: clamp(1.8rem, 5vw, 2.6rem); }
                    .cb-cta-h2 { font-size: clamp(1.8rem, 5.5vw, 2.8rem); }
                    .cb-cta-sub { font-size: 15px; }
                }

                /* ══════════════════════════════════════
                   768px
                ══════════════════════════════════════ */
                @media (max-width: 768px) {
                    .cb-overview-inner, .cb-ages-inner, .cb-process-inner, .cb-why-inner { padding: 0 32px; }
                    .cb-faqs-inner { padding: 0 32px; }
                    .cb-hero-h1 { font-size: clamp(1.9rem, 7vw, 3rem); }
                    .cb-age-card { padding: 20px; gap: 16px; }
                    .cb-age-icon { width: 40px; height: 40px; }
                    .cb-faq-trigger { padding: 20px; }
                    .cb-cta-h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); }
                }

                /* ══════════════════════════════════════
                   640px — Large Mobile
                ══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .cb-overview-inner, .cb-ages-inner, .cb-process-inner, .cb-why-inner { padding: 0 20px; }
                    .cb-faqs-inner { padding: 0 20px; }
                    .cb-cta-inner { padding: 0 20px; }
                    .cb-overview, .cb-ages, .cb-process, .cb-why, .cb-faqs, .cb-cta { padding: 56px 0; }
                    .cb-hero-h1 { font-size: clamp(1.7rem, 8vw, 2.6rem); margin-bottom: 20px; }
                    .cb-hero-sub { font-size: 0.875rem; margin-bottom: 28px; }
                    .cb-btn-primary, .cb-btn-outline { font-size: 11px; padding: 13px 22px; border-radius: 10px; width: 100%; justify-content: center; }
                    .cb-hero-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .cb-overview-h2 { font-size: clamp(1.5rem, 6.5vw, 2.2rem); }
                    .cb-overview-body { font-size: 0.875rem; }
                    .cb-overview-checklist { gap: 12px; }
                    .cb-check-item span { font-size: 13px; }
                    .cb-ages-grid { grid-template-columns: 1fr; gap: 14px; }
                    .cb-ages-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .cb-age-card { padding: 18px; gap: 14px; border-radius: 12px; }
                    .cb-age-icon { width: 36px; height: 36px; border-radius: 9px; }
                    .cb-age-title { font-size: 13px; }
                    .cb-age-desc { font-size: 13px; }
                    .cb-process-grid { grid-template-columns: 1fr; gap: 28px; }
                    .cb-process-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .cb-process-header { margin-bottom: 36px; }
                    .cb-process-circle { width: 52px; height: 52px; margin-bottom: 16px; }
                    .cb-process-title { font-size: 14px; margin-bottom: 8px; }
                    .cb-process-desc { font-size: 13px; }
                    .cb-why-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); margin-bottom: 28px; }
                    .cb-why-text { font-size: 13.5px; }
                    .cb-why-list { gap: 14px; }
                    .cb-faqs-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .cb-faqs-header { margin-bottom: 36px; }
                    .cb-faq-q { font-size: 13.5px; }
                    .cb-faq-answer { font-size: 13px; }
                    .cb-faq-trigger { padding: 16px; }
                    .cb-cta-h2 { font-size: clamp(1.5rem, 7.5vw, 2.2rem); }
                    .cb-cta-sub { font-size: 14px; }
                    .cb-cta-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .cb-cta-btn-dark, .cb-cta-btn-border { font-size: 11px; padding: 14px 24px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ══════════════════════════════════════
                   480px
                ══════════════════════════════════════ */
                @media (max-width: 480px) {
                    .cb-hero-h1 { font-size: clamp(1.5rem, 8.5vw, 2.2rem); }
                    .cb-overview-h2, .cb-ages-h2, .cb-process-h2, .cb-why-h2, .cb-faqs-h2, .cb-cta-h2 { font-size: clamp(1.35rem, 7.5vw, 1.9rem); }
                }

                /* ══════════════════════════════════════
                   380px — iPhone SE
                ══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .cb-overview-inner, .cb-ages-inner, .cb-process-inner, .cb-why-inner { padding: 0 14px; }
                    .cb-faqs-inner, .cb-cta-inner { padding: 0 14px; }
                    .cb-hero-h1 { font-size: 1.4rem; }
                    .cb-overview-h2, .cb-ages-h2, .cb-process-h2, .cb-why-h2, .cb-faqs-h2, .cb-cta-h2 { font-size: 1.25rem; }
                    .cb-age-card { padding: 14px; gap: 12px; }
                    .cb-cta-btn-dark, .cb-cta-btn-border { font-size: 10px; padding: 12px 18px; }
                }

                /* ══════════════════════════════════════
                   320px
                ══════════════════════════════════════ */
                @media (max-width: 320px) {
                    .cb-overview-inner, .cb-ages-inner, .cb-process-inner, .cb-why-inner { padding: 0 12px; }
                    .cb-faqs-inner, .cb-cta-inner { padding: 0 12px; }
                    .cb-hero-h1 { font-size: 1.25rem; }
                    .cb-overview-h2, .cb-ages-h2, .cb-process-h2, .cb-why-h2, .cb-faqs-h2, .cb-cta-h2 { font-size: 1.1rem; }
                }
            `}</style>

            <main className="cb-main">

                {/* S1 HERO */}
                <section className="cb-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <div className="absolute pointer-events-none" style={{ top: "33%", right: "25%", width: 800, height: 800, background: "rgba(232,57,29,0.15)", borderRadius: "50%", filter: "blur(180px)" }} />
                    <div className="cb-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="cb-eyebrow center" style={{ marginBottom: 24 }}>
                            <BookHeart size={16} style={{ color: "#e8391d" }} />
                            <span className="cb-eyebrow-text">Children's Book Writing</span>
                        </motion.div>
                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="cb-hero-h1">
                            CHILDREN'S BOOKS THAT <br /><span className="accent">SPARK IMAGINATION.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="cb-hero-sub">
                            Make your children's book a bedtime favorite for young minds with our expert writers for young audiences.
                        </motion.p>

                        <HeroButtons />
                    </div>
                </section>

                {/* S2 OVERVIEW */}
                <section id="overview" ref={overviewRef} className="cb-overview">
                    <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />
                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"} className="cb-overview-inner">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <motion.div variants={fadeUp} className="cb-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="cb-eyebrow-line" /><span className="cb-eyebrow-text">Crafting Magic</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="cb-overview-h2">
                                THINKING LIKE CHILDREN TO WRITE STORIES <span className="accent">THEY TRULY RELATE TO.</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="cb-overview-body">
                                Writing through the eyes of a child is what our children's book writers do to create stories that truly connect with little minds. Our professionals know the importance of capturing a child's imagination, emotions, and voice, keeping them engaged with every page they turn.
                            </motion.p>
                            <motion.p variants={fadeUp} className="cb-overview-body" style={{ marginBottom: 32 }}>
                                Not just writing magical stories that take kids into the world of imagination, our writers storyboard visual experiences, writing the text so it seems to speak with illustrations. Share your ideas with us, and let our writers shape them because they know what works for child readers on the page.
                            </motion.p>
                            <motion.div variants={staggerContainer} className="cb-overview-checklist">
                                {["Smooth Rhyme & Natural Story Flow", "Scene Planning With Engaging Page Turns", "Illustration-Friendly Story Development", "Kid-Friendly Language for Every Age"].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="cb-check-item">
                                        <CheckCircle2 size={18} style={{ color: "#e8391d", flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: smoothEase }} className="cb-overview-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/children-s-book-writing/01.png" alt="Children's Book Writing" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                            <div className="absolute" style={{ bottom: -20, left: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.2)", zIndex: -1 }} />
                        </motion.div>
                    </motion.div>
                </section>

                {/* S3 AGE GROUPS */}
                <section className="cb-ages">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="cb-ages-inner">
                        <div className="cb-ages-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} className="cb-eyebrow center" style={{ marginBottom: 16 }}>
                                <Users size={16} style={{ color: "#e8391d" }} /><span className="cb-eyebrow-text">Age Groups</span>
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="cb-ages-h2">
                                EXPERTLY CURATED BOOKS FOR <span className="accent">ALL AGE GROUPS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="cb-ages-grid">
                            {ageGroups.map(({ icon: Icon, title, desc }) => (
                                <motion.div key={title} variants={fadeUp} className="cb-age-card">
                                    <div className="cb-age-icon"><Icon size={26} style={{ color: "#e8391d" }} /></div>
                                    <div>
                                        <h3 className="cb-age-title">{title}</h3>
                                        <p className="cb-age-desc">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S4 PROCESS */}
                <section className="cb-process">
                    <div className="cb-process-inner">
                        <div className="cb-process-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="cb-process-h2">
                                WE STRICTLY FOLLOW <br /><span className="accent">THE FUNDAMENTALS OF STORYTELLING</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="cb-process-grid">
                            <div className="cb-process-line" />
                            {processSteps.map(({ step, title, desc, icon: Icon }) => (
                                <motion.div key={step} variants={fadeUp} className="cb-process-card">
                                    <div className="cb-process-circle"><Icon size={24} style={{ color: "white" }} /></div>
                                    <span className="cb-process-step">{step}</span>
                                    <h3 className="cb-process-title">{title}</h3>
                                    <p className="cb-process-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S5 WHY CHOOSE */}
                <section className="cb-why">
                    <div className="cb-why-inner">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="cb-why-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/children-s-book-writing/02.webp" alt="Illustration Team" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0" style={{ background: "rgba(232,57,29,0.2)", mixBlendMode: "multiply" }} />
                            <div className="absolute" style={{ bottom: -20, right: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.25)", zIndex: -1 }} />
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <motion.div variants={fadeUp} className="cb-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="cb-eyebrow-line" /><span className="cb-eyebrow-text">WHY BEXLEY PUBLISHING</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="cb-why-h2">
                                GROUNDS FOR GOING WITH <br /><span className="accent">BEXLEY PUBLISHING</span>
                            </motion.h2>
                            <motion.div variants={staggerContainer} className="cb-why-list">
                                {["Perfect Rhyme & Rhythm — Not forced rhymes, every line flows naturally.", "Illustration-Ready Writing — Every artwork and visual exactly portrays every scene written.", "Engaging Page Flow — Every page builds curiosity and excitement.", "Meaningful Yet Fun — Valuable lessons woven naturally into magical stories.", "Loved by Kids & Parents — Stories that keep both kids and parents alike."].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="cb-why-item">
                                        <div className="cb-why-icon"><CheckCircle2 size={14} style={{ color: "#e8391d" }} /></div>
                                        <p className="cb-why-text">{item}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* S6 FAQS */}
                <section className="cb-faqs">
                    <div className="cb-faqs-inner">
                        <div className="cb-faqs-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="cb-faqs-h2">
                                FREQUENTLY ASKED <span className="accent">QUESTIONS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="cb-faqs-list">
                            {faqs.map(({ q, a }, i) => (
                                <motion.div key={i} variants={fadeUp} className="cb-faq-item">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="cb-faq-trigger">
                                        <span className="cb-faq-q">{q}</span>
                                        <div className={`cb-faq-icon ${openFaq === i ? "open" : "closed"}`}>
                                            {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }} style={{ overflow: "hidden" }}>
                                                <div className="cb-faq-answer">{a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* S7 CTA */}
                <section className="cb-cta">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="cb-cta-inner">
                        <h2 className="cb-cta-h2">BEGIN YOUR CHILDREN'S BOOK DEVELOPMENT PROCESS RIGHT NOW!</h2>
                        <p className="cb-cta-sub">Don't let your idea stick to paper. Start the development process today and turn it into a sparkling children's book.</p>
                        <div className="cb-cta-btns">
                            <button
                                type="button"
                                className="cb-cta-btn-dark"
                                onClick={() => setQuoteModal(true)}
                            >
                                <FileText size={16} />
                                Start Your Book
                            </button>
                            <a href="tel:2797770380" className="cb-cta-btn-border"><Phone size={16} /> Call Us Now</a>
                        </div>
                    </motion.div>

                    <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />

                </section>

            </main>
        </>
    );
}