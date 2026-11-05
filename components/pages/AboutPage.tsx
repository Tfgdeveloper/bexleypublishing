"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { BookOpen, Target, Eye, Award, ArrowRight, CheckCircle2, Quote, PenTool, Palette, Rocket, Users, MessageCircle } from "lucide-react";
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
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
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

const stats = [
    { icon: BookOpen, num: "500+", label: "Books Published" },
    { icon: Award, num: "12+", label: "Years Legacy" },
    { icon: Target, num: "300+", label: "Happy Authors" },
];

const processSteps = [
    { icon: Users, step: "01", title: "Consultation", desc: "Building a tailored plan for your book journey based on your goals, target audience, vision, and publishing needs." },
    { icon: PenTool, step: "02", title: "Writing & Editing", desc: "Transforming rough ideas into masterpieces polished for clarity, structure, readability, and professional market standards" },
    { icon: Palette, step: "03", title: "Design & Formatting", desc: "Creating visually appealing covers, clean layouts, and well-formatted files ready for seamless publishing and print distribution." },
    { icon: Rocket, step: "04", title: "Launch & Marketing", desc: "Positioning your book through launching and marketing for visibility, credibility, audience growth, and sustained momentum." },
];

const team = [
    { name: "James Harlow", role: "Founder & CEO", img: "/images/team-1.webp" },
    { name: "Sarah Chen", role: "Head of Editing", img: "/images/team-2.webp" },
    { name: "Marcus Webb", role: "Lead Designer", img: "/images/team-3.webp" },
    { name: "Emily Rose", role: "Marketing Director", img: "/images/team-4.webp" },
];

const testimonials = [
    { name: "David Torres", book: "The Mindful Leader", quote: "Bexley Publishing, many many thanks for working on my unfinished manuscript to turn it into a well-crafted book for smooth publication. They really exceeded my expectations. Highly recommended." },
    { name: "Priya Nair", book: "Echoes of Tomorrow", quote: "I got professional support, from cover design to publishing, and these guys handled all technicalities very professionally and with precision. They kept by message and voice, and communicated my thoughts to my readers. Well done!" },
    { name: "Samantha Thornhill", book: "Echoes of Tomorrow", quote: "I wasted my time working with inexperienced people. But I found Bexley that truly understood my book idea. Their writing, editing, and design, especially their audiobook services, are outstanding. I got my book published so quickly. Thank you." },
];

export default function AboutPage() {
    const storyRef = useRef<HTMLDivElement>(null);
    const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
    const { scrollYProgress: heroScroll } = useScroll({ target: storyRef, offset: ["start end", "end start"] });
    const heroImgY = useTransform(heroScroll, [0, 1], ["-15%", "15%"]);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                /* ══════════════════════════════════════════
                   GLOBAL
                ══════════════════════════════════════════ */
                .ap-main {
                    width: 100%;
                    overflow: hidden;
                    font-family: 'Raleway', Arial, sans-serif;
                }

                /* ══════════════════════════════════════════
                   SECTION 1 — HERO
                ══════════════════════════════════════════ */
                .ap-hero {
                    position: relative;
                    width: 100%;
                    height: 120vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #05070f;
                    overflow: hidden;
                }

                .ap-hero-inner {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    padding: 0 24px;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .ap-hero-eyebrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 24px;
                }

                .ap-hero-eyebrow-text {
                    color: #e8391d;
                    font-weight: 900;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.28em;
                }

                .ap-hero-h1 {
                    font-weight: 900;
                    color: white;
                    text-transform: uppercase;
                    line-height: 0.95;
                    margin-bottom: 32px;
                    font-size: clamp(3rem, 6vw, 5rem);
                }

                .ap-hero-h1 .accent { color: #e8391d; }

                .ap-hero-sub {
                    color: rgba(255,255,255,0.6);
                    line-height: 1.85;
                    max-width: 680px;
                    margin: 0 auto 40px;
                    font-size: clamp(0.9rem, 1.1vw, 1.05rem);
                }

                .ap-hero-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    background: #e8391d;
                    color: white;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 16px 32px;
                    border-radius: 12px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease;
                }

                .ap-hero-btn:hover { background: #c0271a; gap: 16px; box-shadow: 0 10px 40px rgba(232,57,29,0.4); }

                .ap-hero-scroll {
                    position: absolute;
                    bottom: 40px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }

                .ap-hero-scroll span {
                    color: rgba(255,255,255,0.3);
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                }

                /* ══════════════════════════════════════════
                   SECTION 2 — STORY
                ══════════════════════════════════════════ */
                .ap-story {
                    position: relative;
                    width: 100%;
                    background: #faf9f7;
                    padding: 128px 0;
                    overflow: hidden;
                }

                .ap-story-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 64px;
                }

                .ap-story-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 80px;
                    align-items: center;
                    margin-bottom: 128px;
                }

                .ap-story-img-wrap {
                    object-fit: fill;
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 32px 80px rgba(0,0,0,0.2);
                    aspect-ratio: 4/5;
                }

                .ap-story-img-caption {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    padding: 32px;
                    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
                }

                .ap-story-h2 {
                    font-weight: 900;
                    color: black;
                    text-transform: uppercase;
                    line-height: 1.05;
                    margin-bottom: 24px;
                    font-size: clamp(2rem, 3vw, 3rem);
                }

                .ap-story-body {
                    color: #6b7280;
                    line-height: 1.85;
                    margin-bottom: 20px;
                    font-size: 0.95rem;
                }

                .ap-vision-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                .ap-vision-card {
                    background: white;
                    border-radius: 16px;
                    padding: 24px;
                    border: 1px solid #f3f4f6;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                    cursor: default;
                    transition: box-shadow 0.5s ease, border-color 0.3s ease;
                }

                .ap-vision-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.1); border-color: rgba(232,57,29,0.3); }

                .ap-vision-icon {
                    width: 40px; height: 40px;
                    border-radius: 8px;
                    background: rgba(232,57,29,0.1);
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 16px;
                    transition: background 0.3s ease;
                }

                .ap-vision-card:hover .ap-vision-icon { background: #e8391d; }
                .ap-vision-card:hover .ap-vision-icon svg { color: white !important; }

                .ap-vision-title {
                    font-weight: 900;
                    color: black;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 8px;
                }

                .ap-vision-desc { color: #9ca3af; font-size: 13px; line-height: 1.65; }

                /* ══════════════════════════════════════════
                   SECTION 3 — PROCESS
                ══════════════════════════════════════════ */
                .ap-process {
                    position: relative;
                    width: 100%;
                    background: #05070f;
                    padding: 128px 0;
                    overflow: hidden;
                }

                .ap-process-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 64px;
                    position: relative;
                    z-index: 10;
                }

                .ap-process-header {
                    text-align: center;
                    margin-bottom: 80px;
                    overflow: hidden;
                }

                .ap-process-eyebrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .ap-process-h2 {
                    font-weight: 900;
                    color: white;
                    text-transform: uppercase;
                    line-height: 1;
                    font-size: clamp(2rem, 4vw, 3rem);
                }

                .ap-process-h2 .accent { color: #e8391d; }

                .ap-process-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 32px;
                }

                .ap-process-card {
                    position: relative;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 16px;
                    padding: 32px;
                    transition: border-color 0.5s ease;
                }

                .ap-process-card:hover { border-color: rgba(232,57,29,0.5); }

                .ap-process-num {
                    position: absolute;
                    top: 16px; right: 24px;
                    font-weight: 900;
                    font-size: 80px;
                    line-height: 1;
                    color: rgba(255,255,255,0.03);
                    transition: color 0.5s ease;
                }

                .ap-process-card:hover .ap-process-num { color: rgba(232,57,29,0.1); }

                .ap-process-icon {
                    width: 48px; height: 48px;
                    border-radius: 12px;
                    background: rgba(232,57,29,0.1);
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 24px;
                    transition: background 0.3s ease;
                }

                .ap-process-card:hover .ap-process-icon { background: #e8391d; }
                .ap-process-card:hover .ap-process-icon svg { color: white !important; }

                .ap-process-title {
                    font-weight: 900;
                    color: white;
                    text-transform: uppercase;
                    font-size: 18px;
                    margin-bottom: 12px;
                    letter-spacing: 0.05em;
                }

                .ap-process-desc { color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.65; }

                /* ══════════════════════════════════════════
                   SECTION 4 — TEAM
                ══════════════════════════════════════════ */
                .ap-team {
                    position: relative;
                    width: 100%;
                    background: #faf9f7;
                    padding: 128px 0;
                    overflow: hidden;
                }

                .ap-team-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 64px;
                }

                .ap-team-header {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 24px;
                    margin-bottom: 64px;
                }

                .ap-team-h2 {
                    font-weight: 900;
                    color: black;
                    text-transform: uppercase;
                    line-height: 1;
                    font-size: clamp(2.5rem, 5vw, 4rem);
                }

                .ap-team-h2 .accent { color: #e8391d; }

                .ap-team-sub {
                    color: #6b7280;
                    max-width: 400px;
                    font-size: 15px;
                    line-height: 1.65;
                }

                .ap-team-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }

                .ap-team-card {
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: pointer;
                    aspect-ratio: 3/4;
                }

                .ap-team-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }

                .ap-team-card:hover .ap-team-overlay { opacity: 1; }

                .ap-team-info {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    padding: 24px;
                    transform: translateY(16px);
                    transition: transform 0.5s ease;
                }

                .ap-team-card:hover .ap-team-info { transform: translateY(0); }

                .ap-team-name { font-weight: 900; color: white; font-size: 18px; line-height: 1.2; }
                .ap-team-role { color: #e8391d; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }

                /* ══════════════════════════════════════════
                   SECTION 5 — TESTIMONIALS
                ══════════════════════════════════════════ */
                .ap-testimonials {
                    position: relative;
                    width: 100%;
                    background: #111;
                    padding: 128px 0;
                    overflow: hidden;
                }

                .ap-testimonials-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 64px;
                    position: relative;
                    z-index: 10;
                }

                .ap-testimonials-header { text-align: center; margin-bottom: 64px; }

                .ap-testimonials-h2 {
                    font-weight: 900;
                    color: white;
                    text-transform: uppercase;
                    font-size: clamp(2.2rem, 4vw, 3.5rem);
                }

                .ap-testimonials-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 32px;
                }

                .ap-testimonial-card {
                    position: relative;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 24px;
                    padding: 40px;
                    transition: border-color 0.5s ease;
                }

                .ap-testimonial-card:hover { border-color: rgba(232,57,29,0.3); }

                .ap-testimonial-quote {
                    color: rgba(255,255,255,0.7);
                    font-size: 15px;
                    line-height: 1.8;
                    margin-bottom: 32px;
                    font-style: italic;
                }

                .ap-testimonial-name { font-weight: 900; color: white; font-size: 17px; }
                .ap-testimonial-book { color: #e8391d; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }

                /* ══════════════════════════════════════════
                   SECTION 6 — WHY CHOOSE US
                ══════════════════════════════════════════ */
                .ap-why {
                    position: relative;
                    width: 100%;
                    background: #faf9f7;
                    padding: 128px 0;
                    overflow: hidden;
                }

                .ap-why-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 64px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                }

                .ap-why-h2 {
                    font-weight: 900;
                    color: black;
                    text-transform: uppercase;
                    line-height: 1.05;
                    margin-bottom: 40px;
                    font-size: clamp(2rem, 3.5vw, 3rem);
                }

                .ap-why-h2 .accent { color: #e8391d; }

                .ap-why-list { display: flex; flex-direction: column; gap: 20px; }

                .ap-why-item { display: flex; align-items: flex-start; gap: 16px; }

                .ap-why-icon {
                    margin-top: 4px;
                    width: 24px; height: 24px;
                    border-radius: 50%;
                    background: rgba(232,57,29,0.1);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    transition: background 0.3s ease;
                }

                .ap-why-item:hover .ap-why-icon { background: #e8391d; }
                .ap-why-item:hover .ap-why-icon svg { color: white !important; }

                .ap-why-text { color: #4b5563; font-size: 15px; line-height: 1.65; }

                .ap-why-img-wrap {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 24px 60px rgba(0,0,0,0.1);
                    aspect-ratio: 1/1;
                }

                /* ══════════════════════════════════════════
                   SECTION 7 — CTA
                ══════════════════════════════════════════ */
                .ap-cta {
                    position: relative;
                    width: 100%;
                    background: #e8391d;
                    padding: 112px 0;
                    overflow: hidden;
                }

                .ap-cta-inner {
                    max-width: 900px;
                    margin: 0 auto;
                    text-align: center;
                    padding: 0 32px;
                    position: relative;
                    z-index: 10;
                }

                .ap-cta-h2 {
                    font-weight: 900;
                    color: white;
                    text-transform: uppercase;
                    line-height: 1.1;
                    margin-bottom: 24px;
                    font-size: clamp(2.5rem, 4vw, 3rem);
                }

                .ap-cta-sub {
                    color: rgba(255,255,255,0.8);
                    font-size: 18px;
                    max-width: 560px;
                    margin: 0 auto 40px;
                    line-height: 1.65;
                }

                .ap-cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    background: black;
                    color: white;
                    font-weight: 900;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 20px 40px;
                    border-radius: 12px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.3s ease, color 0.3s ease, gap 0.2s ease, box-shadow 0.3s ease;
                }

                .ap-cta-btn:hover { background: white; color: #e8391d; gap: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }

                /* shared eyebrow line */
                .ap-eyebrow-line { display: block; width: 32px; height: 2px; background: #e8391d; flex-shrink: 0; }
                .ap-eyebrow-text { color: #e8391d; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }


                /* ══════════════════════════════════════════
                   2560px — 4K
                ══════════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .ap-hero-inner { max-width: 1800px; }
                    .ap-hero-h1 { font-size: clamp(4.5rem, 5.5vw, 8rem); margin-bottom: 52px; }
                    .ap-hero-sub { font-size: clamp(1.2rem, 1.1vw, 1.6rem); max-width: 1100px; margin-bottom: 60px; }
                    .ap-hero-eyebrow-text { font-size: 14px; }
                    .ap-hero-btn { font-size: 16px; padding: 22px 52px; border-radius: 18px; }

                    .ap-story-inner, .ap-process-inner, .ap-team-inner, .ap-testimonials-inner, .ap-why-inner { max-width: 2200px; padding: 0 160px; }
                    .ap-story, .ap-process, .ap-team, .ap-testimonials, .ap-why { padding: 200px 0; }
                    .ap-cta { padding: 180px 0; }
                    .ap-cta-inner { max-width: 1600px; padding: 0 60px; }

                    .ap-story-grid { gap: 120px; margin-bottom: 200px; }
                    .ap-story-h2 { font-size: clamp(3rem, 3vw, 5rem); }
                    .ap-story-body { font-size: 1.25rem; line-height: 1.9; }
                    .ap-vision-card { padding: 36px; border-radius: 24px; }
                    .ap-vision-desc { font-size: 16px; }
                    .ap-vision-title { font-size: 16px; }
                    .ap-vision-icon { width: 56px; height: 56px; border-radius: 12px; }
                    .ap-story-img-wrap { border-radius: 36px; }
                    .ap-story-img-caption { padding: 48px; }
                    .ap-story-img-caption p:first-child { font-size: 13px; }
                    .ap-story-img-caption p:last-child { font-size: 28px; }

                    .ap-process-header { margin-bottom: 120px; }
                    .ap-process-h2 { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .ap-process-grid { gap: 48px; }
                    .ap-process-card { padding: 52px; border-radius: 24px; }
                    .ap-process-num { font-size: 120px; }
                    .ap-process-icon { width: 68px; height: 68px; border-radius: 18px; margin-bottom: 36px; }
                    .ap-process-title { font-size: 24px; margin-bottom: 18px; }
                    .ap-process-desc { font-size: 18px; line-height: 1.75; }

                    .ap-team-header { margin-bottom: 80px; }
                    .ap-team-h2 { font-size: clamp(3.5rem, 5vw, 6.5rem); }
                    .ap-team-sub { font-size: 20px; max-width: 600px; }
                    .ap-team-grid { gap: 36px; }
                    .ap-team-name { font-size: 24px; }
                    .ap-team-role { font-size: 15px; }
                    .ap-team-info { padding: 36px; }

                    .ap-testimonials-header { margin-bottom: 80px; }
                    .ap-testimonials-h2 { font-size: clamp(3rem, 4vw, 5.5rem); }
                    .ap-testimonials-grid { gap: 48px; }
                    .ap-testimonial-card { padding: 60px; border-radius: 32px; }
                    .ap-testimonial-quote { font-size: 19px; margin-bottom: 48px; }
                    .ap-testimonial-name { font-size: 22px; }
                    .ap-testimonial-book { font-size: 15px; }

                    .ap-why-inner { gap: 120px; }
                    .ap-why-h2 { font-size: clamp(3rem, 3.5vw, 5rem); margin-bottom: 60px; }
                    .ap-why-list { gap: 28px; }
                    .ap-why-text { font-size: 19px; line-height: 1.75; }
                    .ap-why-icon { width: 32px; height: 32px; }

                    .ap-cta-h2 { font-size: clamp(3.5rem, 4vw, 5.5rem); margin-bottom: 36px; }
                    .ap-cta-sub { font-size: 24px; max-width: 800px; }
                    .ap-cta-btn { font-size: 18px; padding: 26px 60px; border-radius: 18px; }
                }

                /* ══════════════════════════════════════════
                   1920px — Full HD
                ══════════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .ap-hero-inner { max-width: 1400px; }
                    .ap-hero-h1 { font-size: clamp(4rem, 5vw, 7rem); }
                    .ap-hero-sub { font-size: clamp(1.05rem, 1.1vw, 1.35rem); max-width: 900px; }
                    .ap-hero-btn { font-size: 14px; padding: 20px 44px; }

                    .ap-story-inner, .ap-process-inner, .ap-team-inner, .ap-testimonials-inner { max-width: 1700px; padding: 0 130px; }
                    .ap-why-inner { max-width: 1700px; padding: 0 130px; }
                    .ap-story, .ap-process, .ap-team, .ap-testimonials, .ap-why { padding: 160px 0; }
                    .ap-cta { padding: 140px 0; }

                    .ap-story-grid { gap: 100px; }
                    .ap-story-h2 { font-size: clamp(2.6rem, 2.8vw, 4.2rem); }
                    .ap-story-body { font-size: 1.1rem; }
                    .ap-vision-card { padding: 28px; }
                    .ap-vision-desc, .ap-vision-title { font-size: 14.5px; }

                    .ap-process-h2 { font-size: clamp(2.6rem, 3.5vw, 4.5rem); }
                    .ap-process-grid { gap: 40px; }
                    .ap-process-card { padding: 44px; }
                    .ap-process-title { font-size: 21px; }
                    .ap-process-desc { font-size: 16px; }
                    .ap-process-icon { width: 58px; height: 58px; }

                    .ap-team-h2 { font-size: clamp(3rem, 4.5vw, 5.5rem); }
                    .ap-team-sub { font-size: 17px; max-width: 520px; }
                    .ap-team-grid { gap: 28px; }
                    .ap-team-name { font-size: 21px; }

                    .ap-testimonials-h2 { font-size: clamp(2.8rem, 3.5vw, 5rem); }
                    .ap-testimonials-grid { gap: 40px; }
                    .ap-testimonial-card { padding: 52px; }
                    .ap-testimonial-quote { font-size: 17px; }
                    .ap-testimonial-name { font-size: 20px; }

                    .ap-why-h2 { font-size: clamp(2.5rem, 3.2vw, 4.2rem); }
                    .ap-why-text { font-size: 17px; }
                    .ap-why-list { gap: 24px; }

                    .ap-cta-h2 { font-size: clamp(3rem, 3.5vw, 4.5rem); }
                    .ap-cta-sub { font-size: 21px; }
                    .ap-cta-btn { font-size: 16px; padding: 22px 52px; }
                    .ap-cta-inner { max-width: 1200px; }
                }

                /* ══════════════════════════════════════════
                   1440px — Large Laptop
                ══════════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .ap-hero-inner { max-width: 1200px; }
                    .ap-hero-h1 { font-size: clamp(3.2rem, 5vw, 6rem); }
                    .ap-story-inner, .ap-process-inner, .ap-team-inner, .ap-testimonials-inner { max-width: 1360px; padding: 0 96px; }
                    .ap-why-inner { max-width: 1360px; padding: 0 96px; }
                    .ap-story, .ap-process, .ap-team, .ap-testimonials, .ap-why { padding: 140px 0; }
                    .ap-story-grid { gap: 88px; }
                    .ap-story-h2 { font-size: clamp(2.2rem, 2.8vw, 3.4rem); }
                    .ap-process-h2 { font-size: clamp(2.2rem, 3.5vw, 3.4rem); }
                    .ap-team-h2 { font-size: clamp(2.8rem, 4.5vw, 4.5rem); }
                    .ap-testimonials-h2 { font-size: clamp(2.5rem, 3.5vw, 4rem); }
                    .ap-why-h2 { font-size: clamp(2.2rem, 3vw, 3.5rem); }
                }

                /* ══════════════════════════════════════════
                   1280px — Standard Laptop
                ══════════════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .ap-story-inner, .ap-process-inner, .ap-team-inner, .ap-testimonials-inner { max-width: 1160px; padding: 0 64px; }
                    .ap-why-inner { max-width: 1160px; padding: 0 64px; }
                }

                /* ══════════════════════════════════════════
                   1024px — Small Laptop
                ══════════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .ap-story-inner, .ap-process-inner, .ap-team-inner, .ap-testimonials-inner { padding: 0 48px; }
                    .ap-why-inner { padding: 0 48px; gap: 52px; }
                    .ap-story, .ap-process, .ap-team, .ap-testimonials, .ap-why { padding: 96px 0; }
                    .ap-cta { padding: 80px 0; }
                    .ap-story-grid { gap: 52px; margin-bottom: 80px; }
                    .ap-story-h2 { font-size: clamp(1.8rem, 2.5vw, 2.6rem); }
                    .ap-story-body { font-size: 0.9rem; }
                    .ap-vision-grid { gap: 14px; }
                    .ap-vision-card { padding: 18px; }
                    .ap-vision-desc { font-size: 12px; }
                    .ap-process-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
                    .ap-process-h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); }
                    .ap-process-card { padding: 28px; }
                    .ap-process-title { font-size: 16px; }
                    .ap-process-desc { font-size: 13px; }
                    .ap-team-header { flex-direction: column; align-items: flex-start; }
                    .ap-team-h2 { font-size: clamp(2rem, 4vw, 3.2rem); }
                    .ap-team-sub { max-width: 100%; }
                    .ap-testimonials-grid { grid-template-columns: 1fr; gap: 24px; }
                    .ap-testimonials-h2 { font-size: clamp(2rem, 3.5vw, 2.8rem); }
                    .ap-why-h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); }
                    .ap-why-text { font-size: 14px; }
                    .ap-cta-h2 { font-size: clamp(2rem, 3.5vw, 2.8rem); }
                    .ap-cta-sub { font-size: 16px; }
                    .ap-cta-btn { font-size: 12px; padding: 16px 32px; }
                }

                /* ══════════════════════════════════════════
                   900px — Tablet
                ══════════════════════════════════════════ */
                @media (max-width: 900px) {
                    .ap-story-inner, .ap-process-inner, .ap-team-inner, .ap-testimonials-inner { padding: 0 40px; }
                    .ap-why-inner { padding: 0 40px; grid-template-columns: 1fr; gap: 48px; }
                    .ap-story, .ap-process, .ap-team, .ap-testimonials, .ap-why { padding: 80px 0; }
                    .ap-cta { padding: 72px 0; }
                    .ap-hero-h1 { font-size: clamp(2.4rem, 6vw, 4rem); }
                    .ap-hero-sub { font-size: 0.95rem; max-width: 560px; }

                    .ap-story-grid { grid-template-columns: 1fr; gap: 48px; margin-bottom: 64px; }
                    .ap-story-img-wrap { aspect-ratio: 16/9; max-height: 460px; }
                    .ap-story-h2 { font-size: clamp(1.8rem, 4.5vw, 2.6rem); }
                    .ap-vision-grid { grid-template-columns: 1fr 1fr; }

                    .ap-process-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
                    .ap-process-h2 { font-size: clamp(1.8rem, 4vw, 2.6rem); }
                    .ap-process-header { margin-bottom: 52px; }

                    .ap-team-header { flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 40px; }
                    .ap-team-h2 { font-size: clamp(2rem, 5vw, 3.2rem); }
                    .ap-team-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }

                    .ap-testimonials-grid { grid-template-columns: 1fr; gap: 20px; }
                    .ap-testimonials-h2 { font-size: clamp(1.8rem, 4vw, 2.8rem); }

                    .ap-why-h2 { font-size: clamp(1.8rem, 4.5vw, 2.6rem); }
                    .ap-why-img-wrap { display: none; }

                    .ap-cta-h2 { font-size: clamp(2rem, 5vw, 2.8rem); }
                    .ap-cta-sub { font-size: 16px; }
                }

                /* ══════════════════════════════════════════
                   768px — Tablet Portrait
                ══════════════════════════════════════════ */
                @media (max-width: 768px) {
                    .ap-story-inner, .ap-process-inner, .ap-team-inner, .ap-testimonials-inner { padding: 0 32px; }
                    .ap-why-inner { padding: 0 32px; }
                    .ap-story, .ap-process, .ap-team, .ap-testimonials, .ap-why { padding: 64px 0; }
                    .ap-hero-h1 { font-size: clamp(2rem, 7vw, 3.2rem); }
                    .ap-process-card { padding: 24px; }
                    .ap-testimonial-card { padding: 28px; }
                    .ap-testimonial-quote { font-size: 14px; margin-bottom: 20px; }
                    .ap-cta { padding: 60px 0; }
                    .ap-cta-h2 { font-size: clamp(1.8rem, 5.5vw, 2.4rem); }
                    .ap-cta-sub { font-size: 15px; }
                }

                /* ══════════════════════════════════════════
                   640px — Large Mobile
                ══════════════════════════════════════════ */
                @media (max-width: 640px) {
                    .ap-story-inner, .ap-process-inner, .ap-team-inner, .ap-testimonials-inner { padding: 0 20px; }
                    .ap-why-inner { padding: 0 20px; }
                    .ap-story, .ap-process, .ap-team, .ap-testimonials, .ap-why { padding: 56px 0; }
                    .ap-cta { padding: 52px 0; }
                    .ap-cta-inner { padding: 0 20px; }

                    .ap-hero-h1 { font-size: clamp(1.8rem, 8vw, 2.8rem); margin-bottom: 20px; }
                    .ap-hero-sub { font-size: 0.875rem; margin-bottom: 28px; }
                    .ap-hero-btn { font-size: 11px; padding: 13px 24px; }

                    .ap-story-grid { gap: 36px; margin-bottom: 48px; }
                    .ap-story-img-wrap { aspect-ratio: 4/3; max-height: 320px; border-radius: 16px; }
                    .ap-story-h2 { font-size: clamp(1.5rem, 6vw, 2.2rem); }
                    .ap-story-body { font-size: 0.875rem; }
                    .ap-vision-grid { grid-template-columns: 1fr; gap: 14px; }
                    .ap-vision-card { padding: 16px; }
                    .ap-vision-desc { font-size: 12px; }

                    .ap-process-grid { grid-template-columns: 1fr; }
                    .ap-process-h2 { font-size: clamp(1.5rem, 6.5vw, 2.2rem); }
                    .ap-process-header { margin-bottom: 36px; }
                    .ap-process-card { padding: 20px; }
                    .ap-process-title { font-size: 15px; }
                    .ap-process-desc { font-size: 13px; }

                    .ap-team-h2 { font-size: clamp(1.6rem, 7vw, 2.4rem); }
                    .ap-team-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
                    .ap-team-name { font-size: 14px; }
                    .ap-team-role { font-size: 10px; }
                    .ap-team-info { padding: 14px; }
                    .ap-team-header { margin-bottom: 28px; }

                    .ap-testimonials-h2 { font-size: clamp(1.6rem, 7vw, 2.4rem); }
                    .ap-testimonial-card { padding: 22px; border-radius: 16px; }
                    .ap-testimonial-quote { font-size: 13.5px; }

                    .ap-why-h2 { font-size: clamp(1.5rem, 7vw, 2.2rem); margin-bottom: 28px; }
                    .ap-why-text { font-size: 13.5px; }
                    .ap-why-list { gap: 16px; }

                    .ap-cta-h2 { font-size: clamp(1.6rem, 7.5vw, 2.2rem); }
                    .ap-cta-sub { font-size: 14px; }
                    .ap-cta-btn { font-size: 11px; padding: 14px 24px; border-radius: 10px; width: 100%; justify-content: center; }
                }

                /* ══════════════════════════════════════════
                   480px — Standard Mobile
                ══════════════════════════════════════════ */
                @media (max-width: 480px) {
                    .ap-hero-h1 { font-size: clamp(1.6rem, 8.5vw, 2.4rem); }
                    .ap-story-h2, .ap-process-h2, .ap-team-h2, .ap-testimonials-h2, .ap-why-h2, .ap-cta-h2 { font-size: clamp(1.4rem, 7.5vw, 2rem); }
                    .ap-cta-sub { font-size: 13px; }
                    .ap-team-grid { gap: 10px; }
                }

                /* ══════════════════════════════════════════
                   380px — Small Mobile
                ══════════════════════════════════════════ */
                @media (max-width: 380px) {
                    .ap-story-inner, .ap-process-inner, .ap-team-inner, .ap-testimonials-inner { padding: 0 14px; }
                    .ap-why-inner { padding: 0 14px; }
                    .ap-cta-inner { padding: 0 14px; }
                    .ap-hero-h1 { font-size: 1.5rem; }
                    .ap-story-h2, .ap-process-h2, .ap-team-h2, .ap-testimonials-h2, .ap-why-h2, .ap-cta-h2 { font-size: 1.3rem; }
                    .ap-story-body, .ap-why-text { font-size: 0.82rem; }
                    .ap-process-desc, .ap-testimonial-quote { font-size: 12.5px; }
                    .ap-team-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
                    .ap-team-name { font-size: 12px; }
                    .ap-cta-sub { font-size: 12.5px; }
                }

                /* ══════════════════════════════════════════
                   320px — Very Small
                ══════════════════════════════════════════ */
                @media (max-width: 320px) {
                    .ap-story-inner, .ap-process-inner, .ap-team-inner, .ap-testimonials-inner { padding: 0 12px; }
                    .ap-why-inner { padding: 0 12px; }
                    .ap-hero-h1 { font-size: 1.3rem; }
                    .ap-story-h2, .ap-process-h2, .ap-team-h2, .ap-testimonials-h2, .ap-why-h2, .ap-cta-h2 { font-size: 1.15rem; }
                    .ap-cta-btn { font-size: 10px; padding: 12px 18px; }
                    .ap-team-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <main className="ap-main">

                {/* ═══ SECTION 1: HERO ═══ */}
                <section className="ap-hero">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url('/images/Left-Section_bg.webp')`, backgroundSize: "40px 40px" }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "rgba(232,57,29,0.1)", filter: "blur(150px)" }} />

                    <div className="ap-hero-inner">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="ap-hero-eyebrow">
                            <span className="ap-eyebrow-line" />
                            <span className="ap-hero-eyebrow-text">About Bexley Publications</span>
                            <span className="ap-eyebrow-line" />
                        </motion.div>

                        <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="ap-hero-h1">
                            BEXLEY PUBLISHING <br /><span className="accent">PUBLISHES BOOKS</span> THAT BUILD AUTHORITY
                        </motion.h1>

                        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="ap-hero-sub">
                            We are here to help authors turn raw ideas into professionally written books, make them publish-ready, and market them to build authority, attract readers, and create lasting impact.
                        </motion.p>

                        <HeroButtons />
                    </div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="ap-hero-scroll">
                        <span>Scroll</span>
                        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
                    </motion.div>
                </section>

                {/* ═══ SECTION 2: OUR STORY ═══ */}
                <section id="story" ref={storyRef} className="ap-story">
                    <motion.div initial={{ width: "0%" }} animate={storyInView ? { width: "100%" } : {}} transition={{ duration: 1.5, ease: smoothEase }} className="absolute top-0 left-0 h-1 bg-[#e8391d] origin-left" />

                    <div className="ap-story-inner">
                        <div className="ap-story-grid">
                            {/* Image */}
                            <div>
                                <motion.div
                                    initial={{ clipPath: "inset(100% 0% 0% 0% round 24px)" }}
                                    animate={storyInView ? { clipPath: "inset(0% 0% 0% 0% round 24px)" } : {}}
                                    transition={{ duration: 1.4, ease: smoothEase }}
                                    className="ap-story-img-wrap"
                                >
                                    {/* Image ko motion.img se replace kar diya gaya hai */}
                                    <motion.img
                                        src="/images/about.png"
                                        alt="About Us"
                                        className="absolute inset-0 w-full h-full object-fill scale-110 will-change-transform"
                                        style={{ y: heroImgY }}
                                    />

                                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />

                                    <div className="ap-story-img-caption">
                                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8 }}>Est. 2012</p>
                                        <p style={{ color: "white", fontWeight: 900, fontSize: 24, textTransform: "uppercase", lineHeight: 1.25 }}>From Raw Ideas To<br />Global Bestsellers</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content */}
                            <motion.div variants={staggerContainer} initial="hidden" animate={storyInView ? "visible" : "hidden"} style={{ display: "flex", flexDirection: "column" }}>
                                <motion.h2 variants={maskReveal} className="ap-story-h2">
                                    WE DO MORE THAN<span style={{ color: "#e8391d" }}> "JUST PUBLISHING"</span>
                                </motion.h2>
                                <motion.p variants={fadeUp} className="ap-story-body">
                                    Bexley Publishing is the top choice for those who understand the importance of a well-crafted book. We help entrepreneurs, storytellers, coaches, professionals, and visionaries communicate what they think and what they want to convey. We transform their concepts into masterpieces, making the publishing process feel exciting, strategic, and professionally guided from stem to stern.
                                </motion.p>
                                <motion.p variants={fadeUp} className="ap-story-body" style={{ marginBottom: 40 }}>
                                    We have been operating with a team of experts who handle every aspect of the process, whether ghostwriting, editing, formatting, design, publishing, or marketing. Our in-house resources are well-experienced, and they apply their best knowledge and expertise to make sure your book's credibility and success.
                                </motion.p>

                                <motion.div variants={staggerContainer} className="ap-vision-grid">
                                    {[
                                        { icon: Eye, title: "Our Vision", desc: "To become the industry's trusted ebook publishing agency by making books impactful, shaping industries, inspiring audiences, and positioning authors as internationally recognized authorities." },
                                        { icon: Target, title: "Our Mission", desc: "To simplify the publishing process and help authors reach the relevant audience with their books readers genuinely value." }
                                    ].map(({ icon: Icon, title, desc }) => (
                                        <motion.div key={title} variants={fadeUp} className="ap-vision-card">
                                            <div className="ap-vision-icon">
                                                <Icon size={18} style={{ color: "#e8391d" }} />
                                            </div>
                                            <p className="ap-vision-title">{title}</p>
                                            <p className="ap-vision-desc">{desc}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══ SECTION 3: PROCESS ═══ */}
                <section className="ap-process">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="ap-process-inner">
                        <div className="ap-process-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="ap-process-eyebrow">
                                <span className="ap-eyebrow-line" />
                                <span className="ap-eyebrow-text">How It Works</span>
                                <span className="ap-eyebrow-line" />
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="ap-process-h2">
                                A SIMPLE PROCESS DESIGNED TO TURN YOUR BOOK <span className="accent">FROM CONCEPT TO MARKET</span>
                            </motion.h2>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="ap-process-grid">
                            {processSteps.map(({ icon: Icon, step, title, desc }) => (
                                <motion.div key={step} variants={fadeUp} className="ap-process-card">
                                    <span className="ap-process-num">{step}</span>
                                    <div className="ap-process-icon"><Icon size={22} style={{ color: "#e8391d" }} /></div>
                                    <h3 className="ap-process-title">{title}</h3>
                                    <p className="ap-process-desc">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══ SECTION 4: TEAM ═══ 
                <section className="ap-team">
                    <div className="ap-team-inner">
                        <div className="ap-team-header">
                            <div style={{ overflow: "hidden" }}>
                                <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                    <span className="ap-eyebrow-line" />
                                    <span className="ap-eyebrow-text">Our Team</span>
                                </motion.div>
                                <motion.h2 initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="ap-team-h2">
                                    CREATIVE MINDS FOR <br /><span className="accent">SUCCESSFUL LAUNCH</span>
                                </motion.h2>
                            </div>
                            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="ap-team-sub">
                                Bexley consists of professional writers, editors, designers, marketers, and publishing experts who work together to help your journey succeed.
                            </motion.p>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="ap-team-grid">
                            {team.map(({ name, role, img }) => (
                                <motion.div key={name} variants={fadeUp} className="ap-team-card">
                                    <Image src={img} alt={name} fill className="object-cover" style={{ transition: "transform 700ms ease" }}
                                        sizes="(max-width: 640px) 50vw, (max-width: 900px) 50vw, (max-width: 1200px) 25vw, 300px" />
                                    <div className="ap-team-overlay" />
                                    <div className="ap-team-info">
                                        <p className="ap-team-name">{name}</p>
                                        <p className="ap-team-role">{role}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>*/}

                {/* ═══ SECTION 6: WHY CHOOSE US ═══ */}
                <section className="ap-why">
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="ap-why-inner">
                        <div>
                            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                <span className="ap-eyebrow-line" />
                                <span className="ap-eyebrow-text">WHY BEXLEY PUBLISHING</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} className="ap-why-h2">
                                AUTHORS RELY ON <br /><span className="accent">BEXLEY PUBLISHING FOR:</span>
                            </motion.h2>
                            <motion.div variants={staggerContainer} className="ap-why-list">
                                {[
                                    "Expert and simple publishing solutions tailored by our in-house professional team.",
                                    "Professionally writing to create books and strengthen their authority and credibility.",
                                    "Strategic marketing assistance for attracting readers and long-term author growth.",
                                    "Conversion-focused cover designs illustrated to grab the spotlight instantly across competitive global marketplaces.",
                                    "Clear communication, organized timelines, and expert guidance from start to end of the publishing process.",
                                    "Proven publishing and marketing expertise customized for storytellers, poets, entrepreneurs, professionals, and modern digital authors."
                                ].map((item) => (
                                    <motion.div key={item} variants={fadeUp} className="ap-why-item">
                                        <div className="ap-why-icon">
                                            <CheckCircle2 size={14} style={{ color: "#e8391d" }} />
                                        </div>
                                        <p className="ap-why-text">{item}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: smoothEase }} className="ap-why-img-wrap" style={{ position: "relative" }}>
                            <Image src="/images/About/About-section-2.png" alt="Author writing" fill className="object-cover"
                                sizes="(max-width: 900px) 0px, (max-width: 1200px) 45vw, 560px" />
                            <div className="absolute inset-0" style={{ background: "rgba(232,57,29,0.2)", mixBlendMode: "multiply" }} />
                            <div className="absolute" style={{ bottom: -20, right: -20, width: "100%", height: "100%", borderRadius: 24, border: "3px solid rgba(232,57,29,0.25)", zIndex: -1 }} />
                        </motion.div>
                    </motion.div>
                </section>


                
                {/* ═══ SECTION 5: TESTIMONIALS ═══ */}
                <section className="ap-testimonials">
                    <div className="ap-testimonials-inner">
                        <div className="ap-testimonials-header">
                            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
                                <span className="ap-eyebrow-line" />
                                <span className="ap-eyebrow-text">TESTIMONIALS</span>
                                <span className="ap-eyebrow-line" />
                            </motion.div>
                            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="ap-testimonials-h2">
                                REVIEWS BY WINNING AUTHORS
                            </motion.h2>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="ap-testimonials-grid">
                            {testimonials.map(({ name, book, quote }) => (
                                <motion.div key={name} variants={fadeUp} className="ap-testimonial-card">
                                    <Quote size={40} style={{ color: "rgba(232,57,29,0.2)", position: "absolute", top: 32, right: 32 }} />
                                    <p className="ap-testimonial-quote">"{quote}"</p>
                                    <p className="ap-testimonial-name">{name}</p>
                                    <p className="ap-testimonial-book">Author: {book}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                

                {/* ═══ SECTION 7: CTA ═══ */}
                <section className="ap-cta">
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1, backgroundImage: "url('/images/Left-Section_bg.webp')", backgroundSize: "40px 40px" }} />
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="ap-cta-inner">
                        <h2 className="ap-cta-h2">PUBLISH FASTER, REACH FARTHER, SELL SMARTER.</h2>
                        <p className="ap-cta-sub">Let Bexley Publishing experts turn your raw data into a professionally written book designed to create havoc in the whole world.</p>
                        <button
                            type="button"
                            className="ap-cta-btn"
                            onClick={openLiveChat}
                        >
                            <span className="sp-hero-btn__dot" aria-hidden="true" />
                            <MessageCircle size={16} />
                            Get A Free Consultation
                        </button>
                    </motion.div>
                </section>

            </main>
        </>
    );
}