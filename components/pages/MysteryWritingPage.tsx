"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
    ArrowRight, CheckCircle2, Eye, Skull, UserX,
    PenTool, Minus, Plus, Phone, Users, Fingerprint, Siren, Shuffle,
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

// Slugify
const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const subGenres = [
    { icon: Siren, title: "STARTING WITH THE CENTRAL QUESTION", desc: "Every mystery begins with a question that demands an answer. We build the story around that curiosity from the very beginning." },
    { icon: Eye, title: "CREATING SUSPECTS WITH SOMETHING TO HIDE", desc: "The strongest mysteries are driven by characters. We create believable suspects, motives, secrets, and conflicts that add depth to the story." },
    { icon: Fingerprint, title: "PLACING CLUES WITH PURPOSE", desc: "Every clue matters. We carefully plant information throughout the narrative to build suspense without making the solution obvious." },
    { icon: Skull, title: "DELIVERING A REVEAL THAT MAKES SENSE", desc: "The ending should surprise readers while still feeling logical. We connect every important detail to create a satisfying conclusion." },
];

const anatomySteps = [
    { num: "01", title: "CLASSIC WHODUNIT MYSTERIES", desc: "Intriguing investigations, misleading clues, suspicious characters, and satisfying conclusions that keep readers engaged throughout.", icon: Siren },
    { num: "02", title: "THRILLER MYSTERIES", desc: "High-stakes situations, unexpected developments, mounting tension, and relentless suspense that keep readers racing through every chapter.", icon: UserX },
    { num: "03", title: "CRIME & DETECTIVE FICTION", desc: "Fast-moving investigations, layered suspects, and compelling storylines built around solving complex cases.", icon: Eye },
    { num: "04", title: "PSYCHOLOGICAL MYSTERIES", desc: "Stories filled with secrets, deception, uncertainty, and tension that keep readers questioning everything they believe.", icon: Shuffle },
    { num: "05", title: "COZY MYSTERIES", desc: "Character-focused mysteries featuring engaging puzzles, intriguing situations, and suspense without graphic content.", icon: Fingerprint },
];

const processSteps = [
    { step: "01", title: "WE KNOW HOW TO BUILD SUSPENSE", desc: "Our writers carefully control the flow of information to keep curiosity alive from beginning to end.", icon: Skull },
    { step: "02", title: "WE CREATE CHARACTERS READERS QUESTION", desc: "We create layered characters that keep readers uncertain about who they can trust.", icon: Users },
    { step: "03", title: "WE BALANCE CLUES AND MISDIRECTION", desc: "We strike the balance that keeps readers engaged without making the mystery feel unfair.", icon: Fingerprint },
    { step: "04", title: "WE KEEP THE STORY MOVING FORWARD", desc: "We maintain momentum throughout the story to keep readers invested.", icon: PenTool },
    { step: "05", title: "WE FOCUS ON THE FINAL PAYOFF", desc: "We craft endings that connect the clues, answer important questions, and leave readers feeling satisfied with the outcome.", icon: Siren },
];

const faqs = [
    { q: "How Do You Build a Mystery Without Plot Holes?", a: "We carefully map clues, timelines, character actions, and key revelations to ensure every detail connects logically and supports the story." },
    { q: "What Makes a Red Herring Actually Work?", a: "A strong red herring feels believable, fits naturally into the plot, and creates suspicion without misleading readers unfairly." },
    { q: "Do You Plan Mysteries or Discover Them While Writing?", a: "We typically outline mysteries beforehand, allowing us to control clues, pacing, suspense, and reveals while maintaining consistency throughout." },
    { q: "Can You Write a Multi-Book Mystery Series?", a: "Yes, we create mystery series with recurring characters, connected story arcs, and fresh investigations that keep readers returning." },
    { q: "How Do You Keep Readers Guessing Until the End?", a: "We balance clues, secrets, suspects, and unexpected discoveries carefully, revealing information gradually while maintaining suspense and reader curiosity." },
];

export default function MysteryWritingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const overviewRef = useRef<HTMLDivElement>(null);
    const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
    const [quoteModal, setQuoteModal] = useState(false);


    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .mys-main { width: 100%; overflow: hidden; font-family: 'Raleway', Arial, sans-serif; }

                .mys-eyebrow { display: flex; align-items: center; gap: 12px; }
                .mys-eyebrow.center { justify-content: center; }
                .mys-eyebrow-line { display: block; width: 32px; height: 2px; background: #e8391d; flex-shrink: 0; }
                .mys-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }

                /* ══ S1 HERO ══ */
                .mys-hero { position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #05070f; overflow: hidden; padding: 112px 0 48px; }
                .mys-hero-inner { position: relative; z-index: 10; text-align: center; padding: 0 24px; max-width: 1000px; margin: 0 auto; }
                .mys-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.95; margin-bottom: 32px; font-size: clamp(2.5rem, 6vw, 4rem); }
                .mys-hero-h1 .accent { color: #e8391d; }
                .mys-hero-sub { color: rgba(255,255,255,0.6); line-height: 1.85; max-width: 680px; margin: 0 auto 40px; font-size: clamp(0.9rem, 1.1vw, 1.05rem); }
                .mys-hero-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
                .mys-btn-primary { display: inline-flex; align-items: center; gap: 12px; background: #e8391d; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease; }
                .mys-btn-primary:hover { background: #c0271a; gap: 16px; box-shadow: 0 10px 40px rgba(232,57,29,0.4); }
                .mys-btn-outline { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 32px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
                .mys-btn-outline:hover { border-color: #e8391d; color: #e8391d; }

                /* ══ S2 OVERVIEW ══ */
                .mys-overview { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .mys-overview-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
                .mys-overview-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; margin-bottom: 24px; font-size: clamp(2rem, 3.8vw, 3.2rem); }
                .mys-overview-h2 .accent { color: #e8391d; }
                .mys-overview-body { color: #6b7280; line-height: 1.85; margin-bottom: 20px; font-size: 0.95rem; }
                .mys-overview-checklist { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
                .mys-check-item { display: flex; align-items: center; gap: 12px; }
                .mys-check-item span { color: rgba(0,0,0,0.8); font-weight: 600; font-size: 14px; }
                .mys-overview-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.2); aspect-ratio: 4/5; }

                /* ══ S3 ANATOMY (TIMELINE) ══ */
                .mys-anatomy { position: relative; width: 100%; background: #05070f; padding: 128px 0; overflow: hidden; }
                .mys-anatomy-inner { max-width: 1000px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 10; }
                .mys-anatomy-header { text-align: center; margin-bottom: 64px; overflow: hidden; }
                .mys-anatomy-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1; font-size: clamp(2.5rem, 5vw, 4rem); }
                .mys-anatomy-h2 .accent { color: #e8391d; }

                /* Vertical connecting line — desktop only */
                .mys-anatomy-vline { display: none; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,0.1); transform: translateX(-50%); }

                /* Each step row — mobile default: icon + text side by side */
                .mys-anatomy-step { position: relative; display: flex; align-items: center; gap: 1.25rem; margin-bottom: 2.5rem; }

                /* Node */
                .mys-anatomy-node { position: relative; z-index: 10; width: 3rem; height: 3rem; border-radius: 50%; background: #e8391d; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 4px solid #05070f; box-shadow: 0 0 24px rgba(232,57,29,0.35); }

                /* Text block — always visible on mobile */
                .mys-anatomy-text { flex: 1; }
                .mys-anatomy-title { font-weight: 900; color: white; text-transform: uppercase; font-size: 1.1rem; margin-bottom: 6px; line-height: 1.2; }
                .mys-anatomy-desc  { color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.65; }

                /* Desktop zigzag — hidden by default, shown ≥1024px */
                .mys-anatomy-desktop-left  { display: none; flex: 1; text-align: right; }
                .mys-anatomy-desktop-right { display: none; flex: 1; text-align: left; }
                .mys-anatomy-desktop-empty { display: none; flex: 1; }

                /* Desktop: hide mobile text block */
                @media (min-width: 1024px) {
                    .mys-anatomy-vline { display: block; }
                    .mys-anatomy-step { gap: 2rem; margin-bottom: 3rem; }
                    .mys-anatomy-text { display: none; }
                    .mys-anatomy-desktop-left  { display: block; }
                    .mys-anatomy-desktop-right { display: block; }
                    .mys-anatomy-desktop-empty { display: block; }
                    .mys-anatomy-desktop-left h3,
                    .mys-anatomy-desktop-right h3 { font-weight: 900; color: white; text-transform: uppercase; font-size: 1.5rem; margin-bottom: 8px; }
                    .mys-anatomy-desktop-left p,
                    .mys-anatomy-desktop-right p  { color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.65; }
                }

                /* ══ S4 HOW WE BUILD ══ */
                .mys-build { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .mys-build-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
                .mys-build-header { text-align: center; margin-bottom: 64px; overflow: hidden; }
                .mys-build-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1.05; font-size: clamp(2.5rem, 5vw, 4rem); }
                .mys-build-h2 .accent { color: #e8391d; }
                .mys-build-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .mys-build-card { background: white; border: 1px solid #e5e7eb; border-radius: 16px; padding: 32px; display: flex; gap: 24px; align-items: flex-start; cursor: default; transition: border-color 0.5s ease, box-shadow 0.5s ease; }
                .mys-build-card:hover { border-color: rgba(232,57,29,0.5); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
                .mys-build-icon { width: 56px; height: 56px; border-radius: 12px; background: rgba(232,57,29,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
                .mys-build-card:hover .mys-build-icon { background: #e8391d; }
                .mys-build-card:hover .mys-build-icon svg { color: white !important; }
                .mys-build-title { font-weight: 900; color: black; text-transform: uppercase; font-size: 15px; margin-bottom: 8px; letter-spacing: 0.04em; line-height: 1.3; }
                .mys-build-desc { color: #6b7280; font-size: 14px; line-height: 1.65; }

                /* ══ S5 WHY / PROCESS ══ */
                .mys-process { position: relative; width: 100%; background: #111; padding: 128px 0; overflow: hidden; }
                .mys-process-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
                .mys-process-img-wrap { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.4); aspect-ratio: 1/1; }
                .mys-process-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 24px; font-size: clamp(2rem, 3.5vw, 3rem); }
                .mys-process-h2 .accent { color: #e8391d; }
                .mys-process-body { color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.85; margin-bottom: 40px; }
                .mys-process-list { display: flex; flex-direction: column; gap: 20px; }
                .mys-process-item { display: flex; align-items: flex-start; gap: 16px; }
                .mys-process-icon { margin-top: 4px; width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease, border-color 0.3s ease; }
                .mys-process-item:hover .mys-process-icon { background: #e8391d; border-color: #e8391d; }
                .mys-process-item:hover .mys-process-icon svg { color: white !important; }
                .mys-process-text-wrap h4 { font-weight: 900; color: white; text-transform: uppercase; letter-spacing: 0.06em; font-size: 14px; margin-bottom: 4px; }
                .mys-process-text-wrap p  { color: rgba(255,255,255,0.4); font-size: 13px; line-height: 1.65; }

                /* ══ S6 FAQS ══ */
                .mys-faqs { position: relative; width: 100%; background: #faf9f7; padding: 128px 0; overflow: hidden; }
                .mys-faqs-inner { max-width: 900px; margin: 0 auto; padding: 0 32px; }
                .mys-faqs-header { text-align: center; margin-bottom: 64px; }
                .mys-faqs-h2 { font-weight: 900; color: black; text-transform: uppercase; line-height: 1; font-size: clamp(2rem, 4vw, 3rem); }
                .mys-faqs-h2 .accent { color: #e8391d; }
                .mys-faqs-list { display: flex; flex-direction: column; gap: 16px; }
                .mys-faq-item { background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: border-color 0.3s ease; }
                .mys-faq-item:hover { border-color: rgba(232,57,29,0.3); }
                .mys-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 24px; text-align: left; background: none; border: none; cursor: pointer; font-family: 'Raleway', Arial, sans-serif; }
                .mys-faq-q { font-weight: 700; color: black; font-size: 15px; padding-right: 16px; line-height: 1.4; }
                .mys-faq-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
                .mys-faq-icon.open   { background: #e8391d; color: white; }
                .mys-faq-icon.closed { background: #f3f4f6; color: rgba(0,0,0,0.5); }
                .mys-faq-answer { padding: 0 24px 24px; color: #6b7280; font-size: 14px; line-height: 1.75; }

                /* ══ S7 CTA ══ */
                .mys-cta { position: relative; width: 100%; background: #e8391d; padding: 112px 0; overflow: hidden; }
                .mys-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 0 32px; position: relative; z-index: 10; }
                .mys-cta-h2 { font-weight: 900; color: white; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; font-size: clamp(2.5rem, 5vw, 4rem); }
                .mys-cta-sub { color: rgba(255,255,255,0.8); font-size: 18px; max-width: 560px; margin: 0 auto 40px; line-height: 1.65; }
                .mys-cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
                .mys-cta-btn-dark { display: inline-flex; align-items: center; gap: 12px; background: black; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .mys-cta-btn-dark:hover { background: white; color: #e8391d; gap: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
                .mys-cta-btn-border { display: inline-flex; align-items: center; gap: 12px; border: 2px solid white; color: white; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; padding: 20px 40px; border-radius: 12px; text-decoration: none; cursor: pointer; transition: gap 0.2s ease; }
                .mys-cta-btn-border:hover { gap: 16px; }


                /* ══════════════════════════════════════
                   2560px — 4K / QHD
                ══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .mys-hero { padding: 160px 0 80px; }
                    .mys-hero-inner { max-width: 1800px; }
                    .mys-hero-h1 { font-size: clamp(4.5rem, 5.5vw, 8rem); margin-bottom: 52px; }
                    .mys-hero-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 1100px; margin-bottom: 60px; }
                    .mys-btn-primary, .mys-btn-outline { font-size: 16px; padding: 22px 52px; border-radius: 18px; }
                    .mys-hero-btns { gap: 28px; }

                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { max-width: 2200px; padding: 0 160px; }
                    .mys-anatomy-inner { max-width: 1800px; padding: 0 160px; }
                    .mys-faqs-inner { max-width: 1600px; padding: 0 160px; }
                    .mys-cta-inner { max-width: 1400px; padding: 0 60px; }
                    .mys-overview, .mys-anatomy, .mys-build, .mys-process, .mys-faqs, .mys-cta { padding: 200px 0; }

                    .mys-overview-inner { gap: 120px; }
                    .mys-overview-h2 { font-size: clamp(3rem, 3.5vw, 5.5rem); margin-bottom: 40px; }
                    .mys-overview-body { font-size: 1.25rem; line-height: 1.9; }
                    .mys-overview-checklist { gap: 24px; }
                    .mys-check-item span { font-size: 18px; }

                    .mys-anatomy-header { margin-bottom: 100px; }
                    .mys-anatomy-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .mys-anatomy-node { width: 5rem; height: 5rem; }
                    .mys-anatomy-title { font-size: 1.6rem; }
                    .mys-anatomy-desc  { font-size: 17px; }
                    .mys-anatomy-desktop-left h3,
                    .mys-anatomy-desktop-right h3 { font-size: 2rem; }
                    .mys-anatomy-desktop-left p,
                    .mys-anatomy-desktop-right p  { font-size: 18px; }

                    .mys-build-header { margin-bottom: 100px; }
                    .mys-build-h2 { font-size: clamp(4rem, 5vw, 7rem); }
                    .mys-build-grid { gap: 40px; }
                    .mys-build-card { padding: 52px; gap: 36px; border-radius: 24px; }
                    .mys-build-icon { width: 76px; height: 76px; border-radius: 18px; }
                    .mys-build-title { font-size: 22px; }
                    .mys-build-desc  { font-size: 18px; }

                    .mys-process-inner { gap: 120px; }
                    .mys-process-h2 { font-size: clamp(3rem, 3.5vw, 5rem); margin-bottom: 40px; }
                    .mys-process-body { font-size: 1.2rem; }
                    .mys-process-list { gap: 28px; }
                    .mys-process-icon { width: 64px; height: 64px; }
                    .mys-process-text-wrap h4 { font-size: 18px; }
                    .mys-process-text-wrap p  { font-size: 17px; }

                    .mys-faqs-header { margin-bottom: 80px; }
                    .mys-faqs-h2 { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .mys-faq-trigger { padding: 36px; }
                    .mys-faq-q { font-size: 19px; }
                    .mys-faq-answer { padding: 0 36px 36px; font-size: 17px; }
                    .mys-faq-icon { width: 44px; height: 44px; }
                    .mys-faqs-list { gap: 24px; }

                    .mys-cta-h2 { font-size: clamp(3.5rem, 5vw, 7rem); }
                    .mys-cta-sub { font-size: 24px; max-width: 800px; }
                    .mys-cta-btn-dark, .mys-cta-btn-border { font-size: 18px; padding: 26px 60px; border-radius: 18px; }
                    .mys-cta-btns { gap: 32px; }
                }

                /* ══════════════════════════════════════
                   1920px — Full HD
                ══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .mys-hero { padding: 130px 0 60px; }
                    .mys-hero-inner { max-width: 1400px; }
                    .mys-hero-h1 { font-size: clamp(3.5rem, 5vw, 6.5rem); }
                    .mys-hero-sub { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 900px; }
                    .mys-btn-primary, .mys-btn-outline { font-size: 14px; padding: 20px 44px; }

                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { max-width: 1700px; padding: 0 130px; }
                    .mys-anatomy-inner { max-width: 1400px; padding: 0 130px; }
                    .mys-faqs-inner { max-width: 1200px; padding: 0 64px; }
                    .mys-overview, .mys-anatomy, .mys-build, .mys-process, .mys-faqs, .mys-cta { padding: 160px 0; }

                    .mys-overview-inner { gap: 100px; }
                    .mys-overview-h2 { font-size: clamp(2.6rem, 3.5vw, 4.5rem); }
                    .mys-overview-body { font-size: 1.1rem; }
                    .mys-check-item span { font-size: 16px; }

                    .mys-anatomy-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .mys-anatomy-node { width: 4rem; height: 4rem; }
                    .mys-anatomy-title { font-size: 1.3rem; }
                    .mys-anatomy-desc  { font-size: 16px; }

                    .mys-build-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .mys-build-grid { gap: 32px; }
                    .mys-build-card { padding: 44px; gap: 28px; }
                    .mys-build-icon { width: 64px; height: 64px; }
                    .mys-build-title { font-size: 20px; }
                    .mys-build-desc  { font-size: 16px; }

                    .mys-process-inner { gap: 100px; }
                    .mys-process-h2 { font-size: clamp(2.5rem, 3.2vw, 4.2rem); }
                    .mys-process-body { font-size: 1.05rem; }
                    .mys-process-text-wrap h4 { font-size: 16px; }
                    .mys-process-text-wrap p  { font-size: 15px; }

                    .mys-faqs-h2 { font-size: clamp(2.5rem, 3.5vw, 5rem); }
                    .mys-faq-q { font-size: 17px; }
                    .mys-faq-answer { font-size: 15px; }

                    .mys-cta-h2 { font-size: clamp(3rem, 4.5vw, 6rem); }
                    .mys-cta-sub { font-size: 21px; }
                    .mys-cta-btn-dark, .mys-cta-btn-border { font-size: 16px; padding: 22px 52px; }
                    .mys-cta-inner { max-width: 1200px; }
                }

                /* ══════════════════════════════════════
                   1440px
                ══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { max-width: 1360px; padding: 0 96px; }
                    .mys-anatomy-inner { max-width: 1200px; padding: 0 96px; }
                    .mys-overview, .mys-anatomy, .mys-build, .mys-process, .mys-faqs, .mys-cta { padding: 140px 0; }
                    .mys-overview-inner { gap: 88px; }
                    .mys-overview-h2 { font-size: clamp(2.2rem, 3.5vw, 3.6rem); }
                    .mys-anatomy-h2 { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .mys-build-h2   { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                    .mys-process-h2 { font-size: clamp(2.2rem, 3.2vw, 3.6rem); }
                    .mys-cta-h2     { font-size: clamp(2.8rem, 4.5vw, 4.8rem); }
                }

                /* ══════════════════════════════════════
                   1280px
                ══════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { max-width: 1160px; padding: 0 64px; }
                    .mys-anatomy-inner { max-width: 1000px; padding: 0 64px; }
                }

                /* ══════════════════════════════════════
                   1024px
                ══════════════════════════════════════ */
                @media (min-width: 1024px) and (max-width: 1199px) {
                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { padding: 0 48px; }
                    .mys-anatomy-inner { padding: 0 48px; }
                }

                /* ══════════════════════════════════════
                   901px – 1023px
                ══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { padding: 0 48px; }
                    .mys-anatomy-inner { padding: 0 48px; }
                    .mys-faqs-inner { padding: 0 48px; }
                    .mys-overview, .mys-anatomy, .mys-build, .mys-process, .mys-faqs, .mys-cta { padding: 96px 0; }

                    /* Overview: 1-col, hide image */
                    .mys-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .mys-overview-img-wrap { display: none; }
                    .mys-overview-h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); }

                    .mys-anatomy-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .mys-anatomy-header { margin-bottom: 40px; }

                    /* Build: 2-col stays, card smaller */
                    .mys-build-h2 { font-size: clamp(2rem, 4vw, 3rem); }
                    .mys-build-card { padding: 24px; gap: 18px; }
                    .mys-build-icon { width: 44px; height: 44px; }

                    /* Process: 1-col, hide image */
                    .mys-process-inner { grid-template-columns: 1fr; gap: 48px; }
                    .mys-process-img-wrap { display: none; }
                    .mys-process-h2 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); }

                    .mys-cta-h2 { font-size: clamp(2rem, 4.5vw, 3rem); }
                    .mys-cta-sub { font-size: 15px; }
                    .mys-cta-btn-dark, .mys-cta-btn-border { font-size: 12px; padding: 16px 28px; }
                }

                /* ══════════════════════════════════════
                   900px — Tablet
                ══════════════════════════════════════ */
                @media (max-width: 900px) {
                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { padding: 0 40px; }
                    .mys-anatomy-inner { padding: 0 40px; }
                    .mys-faqs-inner { padding: 0 40px; }
                    .mys-overview, .mys-anatomy, .mys-build, .mys-process, .mys-faqs, .mys-cta { padding: 80px 0; }

                    .mys-hero-h1 { font-size: clamp(2.2rem, 6vw, 3.6rem); }

                    /* Overview: 1-col */
                    .mys-overview-inner { grid-template-columns: 1fr; gap: 48px; }
                    .mys-overview-img-wrap { display: none; }
                    .mys-overview-h2 { font-size: clamp(1.8rem, 4.5vw, 2.8rem); }

                    .mys-anatomy-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .mys-anatomy-header { margin-bottom: 40px; }

                    .mys-build-h2 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
                    .mys-build-header { margin-bottom: 40px; }

                    /* Process: 1-col */
                    .mys-process-inner { grid-template-columns: 1fr; gap: 48px; }
                    .mys-process-img-wrap { display: none; }
                    .mys-process-h2 { font-size: clamp(1.8rem, 5vw, 2.6rem); }

                    .mys-cta-h2 { font-size: clamp(1.8rem, 5.5vw, 2.8rem); }
                    .mys-cta-sub { font-size: 15px; }
                }

                /* ══════════════════════════════════════
                   768px
                ══════════════════════════════════════ */
                @media (max-width: 768px) {
                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { padding: 0 32px; }
                    .mys-anatomy-inner { padding: 0 32px; }
                    .mys-faqs-inner { padding: 0 32px; }
                    .mys-hero-h1 { font-size: clamp(1.9rem, 7vw, 3rem); }
                    .mys-build-card { padding: 20px; gap: 16px; }
                    .mys-build-icon { width: 40px; height: 40px; }
                    .mys-faq-trigger { padding: 20px; }
                    .mys-cta-h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); }
                    /* Hide zigzag line on small screens */
                    .mys-anatomy-vline { display: none; }
                }

                /* ══════════════════════════════════════
                   640px — Large Mobile
                ══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { padding: 0 20px; }
                    .mys-anatomy-inner { padding: 0 20px; }
                    .mys-faqs-inner { padding: 0 20px; }
                    .mys-cta-inner { padding: 0 20px; }
                    .mys-overview, .mys-anatomy, .mys-build, .mys-process, .mys-faqs, .mys-cta { padding: 56px 0; }

                    .mys-hero-h1 { font-size: clamp(1.7rem, 8vw, 2.6rem); margin-bottom: 20px; }
                    .mys-hero-sub { font-size: 0.875rem; margin-bottom: 28px; }
                    .mys-btn-primary, .mys-btn-outline { font-size: 11px; padding: 13px 22px; border-radius: 10px; width: 100%; justify-content: center; }
                    .mys-hero-btns { flex-direction: column; align-items: center; gap: 12px; }

                    .mys-overview-h2 { font-size: clamp(1.5rem, 6.5vw, 2.2rem); }
                    .mys-overview-body { font-size: 0.875rem; }
                    .mys-overview-checklist { gap: 12px; }
                    .mys-check-item span { font-size: 13px; }

                    .mys-anatomy-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .mys-anatomy-header { margin-bottom: 32px; }
                    .mys-anatomy-title { font-size: 0.95rem; }
                    .mys-anatomy-desc  { font-size: 12.5px; }
                    .mys-anatomy-node { width: 2.5rem; height: 2.5rem; }

                    .mys-build-grid { grid-template-columns: 1fr; gap: 14px; }
                    .mys-build-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .mys-build-card { padding: 18px; gap: 14px; border-radius: 12px; }
                    .mys-build-icon { width: 36px; height: 36px; border-radius: 9px; }
                    .mys-build-title { font-size: 13px; }
                    .mys-build-desc  { font-size: 13px; }

                    .mys-process-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .mys-process-body { font-size: 0.875rem; }
                    .mys-process-icon { width: 40px; height: 40px; }
                    .mys-process-text-wrap h4 { font-size: 12px; }
                    .mys-process-text-wrap p  { font-size: 12.5px; }
                    .mys-process-list { gap: 14px; }

                    .mys-faqs-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); }
                    .mys-faqs-header { margin-bottom: 36px; }
                    .mys-faq-q { font-size: 13.5px; }
                    .mys-faq-answer { font-size: 13px; }
                    .mys-faq-trigger { padding: 16px; }

                    .mys-cta-h2 { font-size: clamp(1.5rem, 7.5vw, 2.2rem); }
                    .mys-cta-sub { font-size: 14px; }
                    .mys-cta-btns { flex-direction: column; align-items: center; gap: 12px; }
                    .mys-cta-btn-dark, .mys-cta-btn-border { font-size: 11px; padding: 14px 24px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ══════════════════════════════════════
                   480px
                ══════════════════════════════════════ */
                @media (max-width: 480px) {
                    .mys-hero-h1 { font-size: clamp(1.5rem, 8.5vw, 2.2rem); }
                    .mys-overview-h2, .mys-anatomy-h2, .mys-build-h2,
                    .mys-process-h2, .mys-faqs-h2, .mys-cta-h2 { font-size: clamp(1.35rem, 7.5vw, 1.9rem); }
                }

                /* ══════════════════════════════════════
                   380px — iPhone SE
                ══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { padding: 0 14px; }
                    .mys-anatomy-inner { padding: 0 14px; }
                    .mys-faqs-inner, .mys-cta-inner { padding: 0 14px; }
                    .mys-hero-h1 { font-size: 1.4rem; }
                    .mys-overview-h2, .mys-anatomy-h2, .mys-build-h2,
                    .mys-process-h2, .mys-faqs-h2, .mys-cta-h2 { font-size: 1.25rem; }
                    .mys-build-card { padding: 14px; gap: 12px; }
                    .mys-cta-btn-dark, .mys-cta-btn-border { font-size: 10px; padding: 12px 18px; }
                }

                /* ══════════════════════════════════════
                   320px
                ══════════════════════════════════════ */
                @media (max-width: 320px) {
                    .mys-overview-inner, .mys-build-inner, .mys-process-inner { padding: 0 12px; }
                    .mys-anatomy-inner { padding: 0 12px; }
                    .mys-faqs-inner, .mys-cta-inner { padding: 0 12px; }
                    .mys-hero-h1 { font-size: 1.25rem; }
                    .mys-overview-h2, .mys-anatomy-h2, .mys-build-h2,
                    .mys-process-h2, .mys-faqs-h2, .mys-cta-h2 { font-size: 1.1rem; }
                }
            `}</style>

            <main className="mys-main">

                {/* ═══════════════════════ S1: HERO ═══════════════════════ */}
                <section className="mys-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{ backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <div className="absolute pointer-events-none"
                        style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 900, background: "rgba(232,57,29,0.1)", borderRadius: "50%", filter: "blur(200px)" }} />

                    <div className="mys-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }} className="mys-eyebrow center" style={{ marginBottom: 24 }}>
                            <Fingerprint size={16} style={{ color: "#e8391d" }} />
                            <span className="mys-eyebrow-text">Mystery &amp; Thriller Writing</span>
                        </motion.div>

                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="mys-hero-h1">
                            KEEP READERS SECOND-GUESSING <br /><span className="accent">EVERY PAGE</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mys-hero-sub">
                            Our mystery writing team creates suspense-filled stories packed with hidden secrets, compelling suspects, carefully placed clues, and endings that leave readers stunned.
                        </motion.p>

                        <HeroButtons />
                    </div>
                </section>

                {/* ═══════════════════════ S2: OVERVIEW ═══════════════════════ */}
                <section id="overview" ref={overviewRef} className="mys-overview">
                    <motion.div initial={{ width: "0%" }} animate={overviewInView ? { width: "100%" } : {}}
                        transition={{ duration: 1.5, ease: smoothEase }}
                        className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />

                    <motion.div variants={staggerContainer} initial="hidden" animate={overviewInView ? "visible" : "hidden"}
                        className="mys-overview-inner">

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <motion.div variants={fadeUp} className="mys-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="mys-eyebrow-line" />
                                <span className="mys-eyebrow-text">THE ART OF SUSPENSE</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="mys-overview-h2">
                                A GREAT MYSTERY NEVER GIVES AWAY THE ANSWER <span className="accent">TOO SOON.</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="mys-overview-body">
                                Readers love the feeling of not knowing. They follow the clues. Question every suspect. Notice every detail. And keep reading because they need answers. The best mystery novels create that feeling from the first chapter and never let go.
                            </motion.p>
                            <motion.p variants={fadeUp} className="mys-overview-body" style={{ marginBottom: 32 }}>
                                Our mystery writing service helps shape your idea into a gripping story filled with suspense, intrigue, tension, and carefully planned reveals that keep readers guessing until the very end. Whether you have a rough concept, a central crime, or a complete plot outline, our experienced writers build mysteries that hold attention from the opening scene to the final page.
                            </motion.p>
                            <motion.div variants={staggerContainer} className="mys-overview-checklist">
                                {["Suspense That Builds Naturally", "Clever Clues & Hidden Connections", "Memorable Suspects & Motives", "Endings That Feel Worth the Wait"].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="mys-check-item">
                                        <CheckCircle2 size={18} style={{ color: "#e8391d", flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Image – visible on lg+ via default CSS */}
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={overviewInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, ease: smoothEase }}
                            className="mys-overview-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/mystery-writing/01.jpg"
                                alt="Mystery Writing Service" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0"
                                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                            <div className="absolute"
                                style={{ bottom: -20, left: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.2)", zIndex: -1 }} />
                        </motion.div>
                    </motion.div>
                </section>

                {/* ═══════════════════════ S3: ANATOMY / TIMELINE ═══════════════════════ */}
                <section className="mys-anatomy">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

                    <div className="mys-anatomy-inner">
                        <div className="mys-anatomy-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }}
                                className="mys-eyebrow center" style={{ marginBottom: 16 }}>
                                <Shuffle size={16} style={{ color: "#e8391d" }} />
                                <span className="mys-eyebrow-text">MYSTERIES FOR EVERY READER</span>
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible"
                                viewport={{ once: true }} className="mys-anatomy-h2">
                                MYSTERY STORIES WE <span className="accent">SPECIALIZE IN</span>
                            </motion.h2>
                        </div>

                        <div style={{ position: "relative" }}>
                            <div className="mys-anatomy-vline" />
                            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
                                viewport={{ once: true }} style={{ display: "flex", flexDirection: "column" }}>
                                {anatomySteps.map(({ num, title, desc, icon: Icon }, i) => (
                                    <motion.div key={num} variants={fadeUp} className="mys-anatomy-step">

                                        <div className="mys-anatomy-desktop-left">
                                            {i % 2 === 0
                                                ? <><h3>{title}</h3><p>{desc}</p></>
                                                : null}
                                        </div>

                                        <div className="mys-anatomy-desktop-empty" style={{ display: i % 2 !== 0 ? undefined : "none" }} />

                                        <div className="mys-anatomy-node">
                                            <Icon size={20} style={{ color: "white" }} />
                                        </div>

                                        {/* Desktop: right side text (odd rows get text here) */}
                                        <div className="mys-anatomy-desktop-right">
                                            {i % 2 !== 0
                                                ? <><h3>{title}</h3><p>{desc}</p></>
                                                : null}
                                        </div>

                                        {/* Desktop: empty spacer (even rows — text is on left) */}
                                        <div className="mys-anatomy-desktop-empty" style={{ display: i % 2 === 0 ? undefined : "none" }} />

                                        {/* Mobile: text always next to icon */}
                                        <div className="mys-anatomy-text">
                                            <p className="mys-anatomy-title">{title}</p>
                                            <p className="mys-anatomy-desc">{desc}</p>
                                        </div>

                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════ S4: HOW WE BUILD ═══════════════════════ */}
                <section className="mys-build">
                    <div className="mys-build-inner">
                        <div className="mys-build-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible"
                                viewport={{ once: true }} className="mys-build-h2">
                                HOW WE BUILD A MYSTERY THAT <span className="accent">KEEPS PEOPLE READING</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
                            viewport={{ once: true }} className="mys-build-grid">
                            {subGenres.map(({ icon: Icon, title, desc }) => (
                                <motion.div key={title} variants={fadeUp} className="mys-build-card">
                                    <div className="mys-build-icon">
                                        <Icon size={26} style={{ color: "#e8391d" }} />
                                    </div>
                                    <div>
                                        <h3 className="mys-build-title">{title}</h3>
                                        <p className="mys-build-desc">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════ S5: WHY OUR APPROACH ═══════════════════════ */}
                <section className="mys-process">
                    <div className="mys-process-inner">
                        {/* Image – left side on desktop */}
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.8 }}
                            className="mys-process-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/Services/WritingServices/mystery-writing/02.jpg"
                                alt="Detective Writing Team" fill className="object-cover"
                                sizes="(max-width: 1200px) 0px, 560px" />
                            <div className="absolute inset-0"
                                style={{ background: "rgba(232,57,29,0.2)", mixBlendMode: "multiply" }} />
                            <div className="absolute"
                                style={{ bottom: -20, left: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.25)", zIndex: -1 }} />
                        </motion.div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <motion.div variants={fadeUp} className="mys-eyebrow" style={{ marginBottom: 16 }}>
                                <span className="mys-eyebrow-line" />
                                <span className="mys-eyebrow-text">WE WRITE WITH PURPOSE</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="mys-process-h2">
                                WHY OUR APPROACH <span className="accent">WORKS</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="mys-process-body">
                                Great mysteries are built on careful planning, believable characters, meaningful clues, and suspense that keeps readers invested until the final reveal.
                            </motion.p>
                            <motion.div variants={staggerContainer} className="mys-process-list">
                                {processSteps.map(({ step, title, desc, icon: Icon }) => (
                                    <motion.div key={step} variants={fadeUp} className="mys-process-item">
                                        <div className="mys-process-icon">
                                            <Icon size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
                                        </div>
                                        <div className="mys-process-text-wrap">
                                            <h4>{step} — {title}</h4>
                                            <p>{desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════ S6: FAQS ═══════════════════════ */}
                <section className="mys-faqs">
                    <div className="mys-faqs-inner">
                        <div className="mys-faqs-header">
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible"
                                viewport={{ once: true }} className="mys-faqs-h2">
                                FREQUENTLY ASKED <span className="accent">QUESTIONS</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
                            viewport={{ once: true }} className="mys-faqs-list">
                            {faqs.map(({ q, a }, i) => (
                                <motion.div key={i} variants={fadeUp} className="mys-faq-item">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="mys-faq-trigger">
                                        <span className="mys-faq-q">{q}</span>
                                        <div className={`mys-faq-icon ${openFaq === i ? "open" : "closed"}`}>
                                            {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: smoothEase }}
                                                style={{ overflow: "hidden" }}>
                                                <div className="mys-faq-answer">{a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════ S7: CTA ═══════════════════════ */}
                <section className="mys-cta">
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8 }} className="mys-cta-inner">
                        <h2 className="mys-cta-h2">LET&apos;S WRITE A MYSTERY READERS CAN&apos;T PUT DOWN</h2>
                        <p className="mys-cta-sub">
                            From hidden secrets and suspicious characters to shocking discoveries and unforgettable endings, our mystery writing team creates stories that keep readers hooked until the final page.
                        </p>
                        <div className="mys-cta-btns">
                            <button
                                type="button"
                                className="mys-cta-btn-dark"
                                onClick={() => setQuoteModal(true)}
                            >
                                <FileText size={16} />
                                Start Your Book
                            </button>
                            <a href="tel:2797770380" className="mys-cta-btn-border"><Phone size={16} /> Call Us Now</a>
                        </div>
                    </motion.div>
                </section>

                <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />


            </main>
        </>
    );
}