"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, Phone, Mail, BookOpen, Edit3, Globe, Palette, Megaphone, HelpCircle } from "lucide-react";
import MetaLeadEvent from "@/components/MetaLeadEvent";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: (i: number = 0) => ({
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.7, ease: smoothEase, delay: i * 0.12 },
    }),
};

const scaleIn: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.2 } },
};

const services = [
    { icon: BookOpen, label: "Book Writing" },
    { icon: Edit3, label: "Editing" },
    { icon: Globe, label: "Publishing" },
    { icon: Palette, label: "Cover Design" },
    { icon: Megaphone, label: "Marketing" },
    { icon: HelpCircle, label: "Other" },
];

const LAST_PAGE_KEY = "bexley:lastPage";

function isSafePath(p: string | null): p is string {
    if (!p) return false;
    if (!p.startsWith("/") || p.startsWith("//") || p.startsWith("/\\")) return false;
    if (p.startsWith("/thank-you")) return false;
    return true;
}

function getSafeReturnPath(): string | null {
    if (typeof window === "undefined") return null;
    const fromParam = new URLSearchParams(window.location.search).get("from");
    if (isSafePath(fromParam)) return fromParam;
    try {
        const stored = sessionStorage.getItem(LAST_PAGE_KEY);
        if (isSafePath(stored)) return stored;
    } catch {
    }
    return null;
}

export default function ThankYouPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-80px" });
    const [returnPath, setReturnPath] = useState<string | null>(null);

    useEffect(() => {
        setReturnPath(getSafeReturnPath());
    }, []);

    useEffect(() => {
        const colors = ["#e8391d", "#ffffff", "#ff6b4a", "#c0271a", "#ffaa99"];
        const pieces: HTMLDivElement[] = [];

        for (let i = 0; i < 60; i++) {
            const el = document.createElement("div");
            const size = Math.random() * 8 + 4;
            el.style.cssText = `
                position:fixed;
                top:-10px;
                left:${Math.random() * 100}vw;
                width:${size}px;
                height:${size}px;
                background:${colors[Math.floor(Math.random() * colors.length)]};
                border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
                pointer-events:none;
                z-index:9999;
                opacity:${0.6 + Math.random() * 0.4};
            `;
            document.body.appendChild(el);
            pieces.push(el);

            const duration = 1200 + Math.random() * 1400;
            const xDrift = (Math.random() - 0.5) * 200;
            el.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: el.style.opacity },
                { transform: `translate(${xDrift}px, 110vh) rotate(${Math.random() * 720}deg)`, opacity: 0 },
            ], { duration, easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", delay: Math.random() * 600, fill: "forwards" });

            setTimeout(() => el.remove(), duration + 700);
        }

        return () => pieces.forEach(p => p.remove());
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .ty-page {
                    font-family: 'Raleway', Arial, sans-serif;
                    min-height: 100vh;
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 20px;
                    background: #0d0d0d;
                }

                /* Animated radial glow background */
                .ty-glow {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 700px 500px at 20% 50%, rgba(232,57,29,0.08) 0%, transparent 70%),
                        radial-gradient(ellipse 500px 400px at 80% 20%, rgba(232,57,29,0.05) 0%, transparent 70%);
                    pointer-events: none;
                }

                /* Grid lines texture */
                .ty-grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                }

                /* Red left stripe — same as Contact section */
                .ty-stripe {
                    position: absolute;
                    top: 0; left: 0; bottom: 0;
                    width: 4px;
                    background: #e8391d;
                }

                /* Card container */
                .ty-card {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 680px;
                    text-align: center;
                }

                /* Check icon ring */
                .ty-icon-ring {
                    width: 96px;
                    height: 96px;
                    border-radius: 50%;
                    background: rgba(232,57,29,0.12);
                    border: 2px solid rgba(232,57,29,0.35);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 36px;
                }

                /* Marker */
                .ty-marker {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 24px;
                }

                .ty-marker-text {
                    color: #e8391d;
                    font-weight: 900;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.28em;
                }

                /* Heading */
                .ty-heading {
                    font-weight: 900;
                    color: white;
                    text-transform: uppercase;
                    line-height: 1;
                    font-size: clamp(2.6rem, 6vw, 4.5rem);
                    margin-bottom: 20px;
                }

                .ty-heading .accent { color: #e8391d; }

                /* Sub paragraph */
                .ty-sub {
                    color: rgba(255,255,255,0.5);
                    font-size: 1.05rem;
                    line-height: 1.8;
                    max-width: 480px;
                    margin: 0 auto 48px;
                }

                /* Divider */
                .ty-divider {
                    width: 48px;
                    height: 3px;
                    background: #e8391d;
                    margin: 0 auto 48px;
                    border-radius: 2px;
                }

                /* What happens next box */
                .ty-steps {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    padding: 36px 40px;
                    margin-bottom: 40px;
                    text-align: left;
                }

                .ty-steps-title {
                    color: rgba(255,255,255,0.35);
                    font-size: 10px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.28em;
                    margin-bottom: 24px;
                }

                .ty-step {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    margin-bottom: 20px;
                }

                .ty-step:last-child { margin-bottom: 0; }

                .ty-step-num {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: rgba(232,57,29,0.15);
                    border: 1px solid rgba(232,57,29,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #e8391d;
                    font-size: 11px;
                    font-weight: 900;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .ty-step-text {
                    color: rgba(255,255,255,0.65);
                    font-size: 14px;
                    line-height: 1.6;
                }

                .ty-step-text strong {
                    color: white;
                    font-weight: 700;
                    display: block;
                    margin-bottom: 2px;
                }

                /* Services chips */
                .ty-services {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    justify-content: center;
                    margin-bottom: 44px;
                }

                .ty-chip {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 999px;
                    padding: 8px 16px;
                    color: rgba(255,255,255,0.55);
                    font-size: 12px;
                    font-weight: 600;
                }

                .ty-chip svg { color: #e8391d; }

                /* Buttons */
                .ty-actions {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    flex-wrap: wrap;
                    margin-bottom: 40px;
                }

                .ty-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: #e8391d;
                    color: white;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 14px 28px;
                    border-radius: 10px;
                    text-decoration: none;
                    transition: background 0.2s ease, box-shadow 0.2s ease, gap 0.2s ease;
                    font-family: 'Raleway', Arial, sans-serif;
                }

                .ty-btn-primary:hover {
                    background: #c0271a;
                    box-shadow: 0 10px 30px rgba(232,57,29,0.4);
                    gap: 14px;
                }

                .ty-btn-ghost {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: transparent;
                    color: rgba(255,255,255,0.6);
                    font-weight: 700;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 14px 24px;
                    border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.15);
                    text-decoration: none;
                    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
                    font-family: 'Raleway', Arial, sans-serif;
                }

                .ty-btn-ghost:hover {
                    border-color: rgba(255,255,255,0.35);
                    color: white;
                    background: rgba(255,255,255,0.05);
                }

                /* Contact footer */
                .ty-contact-footer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 32px;
                    flex-wrap: wrap;
                    padding-top: 28px;
                    border-top: 1px solid rgba(255,255,255,0.07);
                }

                .ty-contact-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                    color: rgba(255,255,255,0.4);
                    font-size: 13px;
                    font-weight: 600;
                    transition: color 0.2s ease;
                }

                .ty-contact-item:hover { color: rgba(255,255,255,0.85); }
                .ty-contact-item svg { color: #e8391d; flex-shrink: 0; }

                /* ── Responsive ── */
                @media (max-width: 640px) {
                    .ty-page { padding: 48px 16px; }
                    .ty-heading { font-size: clamp(2rem, 10vw, 3rem); }
                    .ty-sub { font-size: 0.9rem; margin-bottom: 36px; }
                    .ty-icon-ring { width: 80px; height: 80px; margin-bottom: 28px; }
                    .ty-steps { padding: 24px 20px; }
                    .ty-actions { gap: 12px; }
                    .ty-btn-primary, .ty-btn-ghost { font-size: 11px; padding: 13px 20px; }
                    .ty-contact-footer { gap: 20px; }
                    .ty-contact-item { font-size: 12px; }
                    .ty-services { gap: 8px; }
                    .ty-chip { font-size: 11px; padding: 6px 12px; }
                }

                @media (max-width: 380px) {
                    .ty-heading { font-size: 1.8rem; }
                    .ty-steps-title { font-size: 9px; }
                    .ty-step-text { font-size: 13px; }
                    .ty-btn-primary, .ty-btn-ghost { padding: 11px 16px; font-size: 10px; }
                }
            `}</style>

             <MetaLeadEvent />

            <div className="ty-page">
                <div className="ty-glow" />
                <div className="ty-grid-bg" />
                <div className="ty-stripe" />

                <div ref={containerRef} className="ty-card">

                    {/* Check icon */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="ty-icon-ring"
                    >
                        <CheckCircle size={44} style={{ color: "#e8391d" }} />
                    </motion.div>

                    {/* Marker */}
                    <motion.div
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="ty-marker"
                    >
                        <span style={{ width: 28, height: 2, background: "#e8391d", display: "block" }} />
                        <span className="ty-marker-text">Request Received</span>
                        <span style={{ width: 28, height: 2, background: "#e8391d", display: "block" }} />
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="ty-heading"
                    >
                        THANK<br />
                        <span className="accent">YOU!</span>
                    </motion.h1>

                    {/* Sub text */}
                    <motion.p
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="ty-sub"
                    >
                        Your proposal request has been successfully submitted. Our team will review your details and reach out within <strong style={{ color: "white", fontWeight: 700 }}>24 hours</strong> to discuss your publishing journey.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        custom={3}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="ty-divider"
                    />

                    {/* What happens next */}
                    <motion.div
                        variants={fadeUp}
                        custom={4}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="ty-steps"
                    >
                        <p className="ty-steps-title">What Happens Next</p>

                        {[
                            {
                                num: "01",
                                title: "Review",
                                desc: "Our publishing experts review your submission to understand your vision and goals.",
                            },
                            {
                                num: "02",
                                title: "Consultation Call",
                                desc: "A dedicated project manager will contact you within 24 hours to schedule a free consultation.",
                            },
                            {
                                num: "03",
                                title: "Custom Proposal",
                                desc: "We craft a tailored proposal with timeline, pricing, and a clear roadmap for your book.",
                            },
                        ].map(({ num, title, desc }) => (
                            <div key={num} className="ty-step">
                                <div className="ty-step-num">{num}</div>
                                <div className="ty-step-text">
                                    <strong>{title}</strong>
                                    {desc}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Services chips */}
                    <motion.div
                        variants={fadeUp}
                        custom={5}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="ty-services"
                    >
                        {services.map(({ icon: Icon, label }) => (
                            <div key={label} className="ty-chip">
                                <Icon size={13} />
                                {label}
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        variants={fadeUp}
                        custom={6}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="ty-actions"
                    >
                        {returnPath ? (
                            <Link href={returnPath} className="ty-btn-primary">
                                <ArrowLeft size={15} /> Back to Previous Page
                            </Link>
                        ) : (
                            <Link href="/" className="ty-btn-primary">
                                Back to Home <ArrowRight size={15} />
                            </Link>
                        )}
                        <Link href="/services" className="ty-btn-ghost">
                            Explore Services
                        </Link>
                    </motion.div>

                    {/* Contact footer */}
                    <motion.div
                        variants={fadeUp}
                        custom={7}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="ty-contact-footer"
                    >
                        <a href="tel:2797770380" className="ty-contact-item">
                            <Phone size={14} />
                            (279) 777-0380
                        </a>
                        <a href="mailto:info@bexleypublishing.com" className="ty-contact-item">
                            <Mail size={14} />
                            info@bexleypublishing.com
                        </a>
                    </motion.div>

                </div>
            </div>
        </>
    );
}