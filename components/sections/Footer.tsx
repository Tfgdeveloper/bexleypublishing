"use client";
import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Edit, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import QuoteModal from "../Quotemodal";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const writingServices = [
    "Book Writing", "Ghostwriting", "Children's Book Writing", "Sci-Fi Writing",
    "Memoir Writing", "Fiction Writing", "SEO Content Writing", "Mystery Writing",
    "Historical Writing", "Fantasy Writing", "Non-Fiction Writing", "Script Writing", "Horror Writing",
];

const editingServices = [
    "Book Proofreading", "Book Editing", "Ebook Creation", "Audiobook Narration",
    "Book Formatting", "Children's Book Editing", "Book Publishing",
];

const designServices = [
    "Book Cover Design", "Author Website Design", "Book Printing", "Book Marketing",
];

const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blogs & Insights", href: "/Blogs" },
    { label: "Pricing Plans", href: "/pricing" },
    { label: "Contact Us", href: "/contact" },
     { label: "Reviews", href: "/reviews" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Refund Policy", href: "/refund-policy" },
];

const socials = [
    { label: "FB", href: "https://www.facebook.com/BexleyPublishing", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { label: "IG", href: "https://www.instagram.com/bexley_publishing/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
];

const ctaMask: Variants = {
    hidden: { clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" },
    visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", transition: { duration: 1, ease: smoothEase } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: smoothEase } },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

const linkStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
};

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const isInView = useInView(footerRef, { once: true, margin: "-50px" });
    const [quoteModal, setQuoteModal] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                /* ═══════════════════════════════════
                   BASE STYLES
                ═══════════════════════════════════ */
                .ft-footer {
                    font-family: 'Raleway', Arial, sans-serif;
                    width: 100%;
                    background: #0d0d0d;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }

                /* CTA Banner */
                .ft-cta-band {
                    background: #e8391d;
                    padding: 48px 80px;
                    transform-origin: left;
                }

                .ft-cta-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    gap: 24px;
                    overflow: hidden;
                }

                .ft-cta-eyebrow {
                    color: rgba(255,255,255,0.7);
                    font-size: 11px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.28em;
                    margin-bottom: 8px;
                }

                .ft-cta-heading {
                    font-weight: 900;
                    color: white;
                    text-transform: uppercase;
                    line-height: 1;
                    font-size: clamp(1.8rem, 3.5vw, 3rem);
                }

                .ft-cta-btn {
                    flex-shrink: 0;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    border: 2px solid white;
                    color: white;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 16px 32px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.2s ease, gap 0.2s ease;
                    white-space: nowrap;
                }

                .ft-cta-btn:hover { background: rgba(255,255,255,0.15); gap: 16px; }

                /* Main body */
                .ft-body {
                    padding: 64px 80px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .ft-body-grid {
                    display: grid;
                    grid-template-columns: 260px 1fr;
                    gap: 64px;
                }

                /* Brand column */
                .ft-brand { display: flex; flex-direction: column; }

                .ft-logo-wrap { margin-bottom: 28px; }

                .ft-brand-desc {
                    color: rgba(255,255,255,0.38);
                    font-size: 14px;
                    line-height: 1.85;
                    margin-bottom: 32px;
                    max-width: 220px;
                }

                .ft-contacts { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }

                .ft-contact-link {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    color: rgba(255,255,255,0.4);
                    font-size: 13px;
                    text-decoration: none;
                    transition: color 0.2s ease;
                    line-height: 1.5;
                }

                .ft-contact-link:hover { color: white; }

                .ft-socials { display: flex; align-items: center; gap: 10px; margin-bottom: 32px; }

                .ft-social-btn {
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center;
                    color: rgba(255,255,255,0.45);
                    text-decoration: none;
                    transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
                }

                .ft-social-btn:hover { background: #e8391d; border-color: #e8391d; color: white; }

                /* Link columns */
                .ft-links-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 32px;
                }

                .ft-col-heading {
                    font-weight: 900;
                    color: white;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    margin-bottom: 16px;
                    display: block;
                }

                .ft-link {
                    color: rgba(255,255,255,0.4);
                    font-size: 13px;
                    line-height: 2.1;
                    display: block;
                    text-decoration: none;
                    transition: color 0.2s ease, padding-left 0.2s ease;
                }

                .ft-link:hover { color: white; padding-left: 4px; }

                /* Bottom bar */
                .ft-bottom {
                    border-top: 1px solid rgba(255,255,255,0.05);
                    padding: 24px 80px;
                }

                .ft-bottom-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                }

                .ft-copy { color: rgba(255,255,255,0.25); font-size: 12px; }

                .ft-bottom-links { display: flex; align-items: center; gap: 20px; }

                .ft-bottom-link {
                    color: rgba(255,255,255,0.25);
                    font-size: 12px;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .ft-bottom-link:hover { color: white; }

                /* Scroll to top */
                .ft-scroll-top {
                    position: fixed;
                    bottom: 90px; right: 40px;
                    z-index: 50;
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    background: #e8391d;
                    border: none;
                    display: flex; align-items: center; justify-content: center;
                    color: white;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(232,57,29,0.3);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .ft-scroll-top:hover { transform: scale(1.15); box-shadow: 0 0 25px rgba(232,57,29,0.5); }
                .ft-scroll-top:active { transform: scale(0.9); }


                /* ═══════════════════════════════════
                   2560px — 4K
                ═══════════════════════════════════ */
                @media (min-width: 2400px) {
                    .ft-cta-band { padding: 80px 160px; }
                    .ft-cta-inner { max-width: 2200px; gap: 60px; }
                    .ft-cta-heading { font-size: clamp(2.8rem, 3.5vw, 5rem); }
                    .ft-cta-eyebrow { font-size: 14px; margin-bottom: 14px; }
                    .ft-cta-btn { font-size: 15px; padding: 22px 52px; gap: 16px; }
                    .ft-body { padding: 100px 160px; max-width: 2200px; }
                    .ft-body-grid { grid-template-columns: 400px 1fr; gap: 100px; }
                    .ft-brand-desc { font-size: 18px; max-width: 360px; margin-bottom: 48px; }
                    .ft-contact-link { font-size: 17px; gap: 12px; }
                    .ft-contacts { gap: 18px; margin-bottom: 48px; }
                    .ft-social-btn { width: 52px; height: 52px; }
                    .ft-socials { gap: 14px; }
                    .ft-links-grid { gap: 48px; }
                    .ft-col-heading { font-size: 13px; margin-bottom: 24px; }
                    .ft-link { font-size: 16px; line-height: 2.3; }
                    .ft-bottom { padding: 32px 160px; }
                    .ft-bottom-inner { max-width: 2200px; }
                    .ft-copy, .ft-bottom-link { font-size: 15px; }
                    .ft-bottom-links { gap: 32px; }
                    .ft-scroll-top { width: 64px; height: 64px; bottom: 118px; right: 48px; }
                    .ft-logo-wrap { margin-bottom: 40px; }
                }

                /* ═══════════════════════════════════
                   1920px — Full HD
                ═══════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .ft-cta-band { padding: 64px 130px; }
                    .ft-cta-inner { max-width: 1700px; }
                    .ft-cta-heading { font-size: clamp(2.4rem, 3.2vw, 4.2rem); }
                    .ft-cta-eyebrow { font-size: 13px; }
                    .ft-cta-btn { font-size: 14px; padding: 20px 44px; }
                    .ft-body { padding: 80px 130px; max-width: 100%; }
                    .ft-body-grid { grid-template-columns: 320px 1fr; gap: 80px; }
                    .ft-brand-desc { font-size: 16px; max-width: 280px; }
                    .ft-contact-link { font-size: 15px; }
                    .ft-links-grid { gap: 40px; }
                    .ft-col-heading { font-size: 12px; }
                    .ft-link { font-size: 15px; }
                    .ft-bottom { padding: 28px 130px; }
                    .ft-bottom-inner { max-width: 1700px; }
                    .ft-copy, .ft-bottom-link { font-size: 13px; }
                    .ft-scroll-top { width: 56px; height: 56px; bottom: 100px; right: 40px; }
                }

                /* ═══════════════════════════════════
                   1440px — Large Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .ft-cta-band { padding: 56px 100px; }
                    .ft-cta-inner { max-width: 1360px; }
                    .ft-cta-heading { font-size: clamp(2rem, 3vw, 3.4rem); }
                    .ft-body { padding: 72px 100px; max-width: 1360px; }
                    .ft-body-grid { grid-template-columns: 280px 1fr; gap: 72px; }
                }

                /* ═══════════════════════════════════
                   1280px — Standard Laptop
                ═══════════════════════════════════ */
                @media (min-width: 1200px) and (max-width: 1399px) {
                    .ft-cta-band { padding: 48px 80px; }
                    .ft-body { padding: 64px 80px; }
                    .ft-bottom { padding: 24px 80px; }
                }

                /* ═══════════════════════════════════
                   1024px — Small Laptop
                ═══════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .ft-cta-band { padding: 44px 56px; }
                    .ft-cta-heading { font-size: clamp(1.6rem, 3vw, 2.6rem); }
                    .ft-cta-btn { font-size: 11px; padding: 14px 24px; }
                    .ft-body { padding: 56px 56px; }
                    .ft-body-grid { grid-template-columns: 220px 1fr; gap: 48px; }
                    .ft-links-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
                    .ft-link { font-size: 12px; }
                    .ft-col-heading { font-size: 10px; }
                    .ft-brand-desc { font-size: 12px; max-width: 200px; }
                    .ft-contact-link { font-size: 12px; }
                    .ft-bottom { padding: 20px 56px; }
                }

                /* ═══════════════════════════════════
                   900px — Tablet (STACK)
                ═══════════════════════════════════ */
                @media (max-width: 900px) {
                    .ft-cta-band { padding: 48px 40px; }
                    .ft-cta-inner { flex-direction: column; align-items: flex-start; gap: 20px; }
                    .ft-cta-btn { align-self: flex-start; }
                    .ft-cta-heading { font-size: clamp(1.7rem, 5vw, 2.8rem); }
                    .ft-body { padding: 56px 40px; }
                    .ft-body-grid { grid-template-columns: 1fr; gap: 48px; }
                    .ft-brand-desc { max-width: 100%; }
                    .ft-links-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
                    .ft-bottom { padding: 20px 40px; }
                    .ft-bottom-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
                }

                /* ═══════════════════════════════════
                   768px — Tablet Portrait
                ═══════════════════════════════════ */
                @media (max-width: 768px) {
                    .ft-cta-band { padding: 40px 32px; }
                    .ft-cta-heading { font-size: clamp(1.5rem, 5.5vw, 2.4rem); }
                    .ft-body { padding: 48px 32px; }
                    .ft-bottom { padding: 18px 32px; }
                    .ft-links-grid { gap: 24px; }
                    .ft-link { font-size: 12px; line-height: 2; }
                }

                /* ═══════════════════════════════════
                   640px — Large Mobile
                ═══════════════════════════════════ */
                @media (max-width: 640px) {
                    .ft-cta-band { padding: 36px 20px; }
                    .ft-cta-heading { font-size: clamp(1.3rem, 7vw, 2rem); }
                    .ft-cta-eyebrow { font-size: 9px; }
                    .ft-cta-btn { font-size: 10px; padding: 13px 20px; gap: 10px; width: 100%; justify-content: center; }
                    .ft-cta-inner { gap: 16px; }
                    .ft-body { padding: 40px 20px; }
                    .ft-body-grid { gap: 36px; }
                    .ft-brand-desc { font-size: 13px; margin-bottom: 24px; }
                    .ft-contact-link { font-size: 12px; }
                    .ft-contacts { gap: 10px; margin-bottom: 24px; }
                    .ft-social-btn { width: 32px; height: 32px; }
                    .ft-socials { gap: 8px; margin-bottom: 24px; }
                    .ft-links-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
                    .ft-col-heading { font-size: 10px; margin-bottom: 12px; }
                    .ft-link { font-size: 12px; line-height: 1.95; }
                    .ft-bottom { padding: 16px 20px; }
                    .ft-copy { font-size: 11px; }
                    .ft-bottom-link { font-size: 11px; }
                    .ft-bottom-links { gap: 14px; flex-wrap: wrap; }
                    .ft-scroll-top { width: 42px; height: 42px; bottom: 70px; right: 20px; }
                }

                /* ═══════════════════════════════════
                   480px — Standard Mobile
                ═══════════════════════════════════ */
                @media (max-width: 480px) {
                    .ft-cta-band { padding: 32px 16px; }
                    .ft-cta-heading { font-size: clamp(1.2rem, 7.5vw, 1.8rem); }
                    .ft-body { padding: 36px 16px; }
                    .ft-brand-desc { font-size: 12px; }
                    .ft-link { font-size: 11.5px; }
                    .ft-links-grid { gap: 18px; }
                    .ft-bottom { padding: 14px 16px; }
                }

                /* ═══════════════════════════════════
                   380px — Small Mobile (iPhone SE)
                ═══════════════════════════════════ */
                @media (max-width: 380px) {
                    .ft-cta-band { padding: 28px 14px; }
                    .ft-cta-heading { font-size: 1.15rem; }
                    .ft-body { padding: 32px 14px; }
                    .ft-brand-desc { font-size: 11.5px; }
                    .ft-contact-link { font-size: 11px; }
                    .ft-col-heading { font-size: 9px; }
                    .ft-link { font-size: 11px; line-height: 1.85; }
                    .ft-links-grid { gap: 16px; }
                    .ft-cta-btn { font-size: 9px; padding: 11px 16px; }
                    .ft-bottom { padding: 12px 14px; }
                    .ft-copy, .ft-bottom-link { font-size: 10px; }
                    .ft-scroll-top { width: 38px; height: 38px; bottom: 16px; right: 16px; }
                }

                /* ═══════════════════════════════════
                   320px — Very Small
                ═══════════════════════════════════ */
                @media (max-width: 320px) {
                    .ft-cta-band { padding: 24px 12px; }
                    .ft-cta-heading { font-size: 1rem; }
                    .ft-body { padding: 28px 12px; }
                    .ft-brand-desc { font-size: 11px; }
                    .ft-link { font-size: 10.5px; }
                    .ft-col-heading { font-size: 8.5px; }
                    .ft-bottom { padding: 10px 12px; }
                    .ft-copy, .ft-bottom-link { font-size: 9.5px; }
                    .ft-scroll-top { width: 34px; height: 34px; }
                }
            `}</style>

            <footer ref={footerRef} className="ft-footer">
                {/* CTA Banner */}
                <motion.div
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.2, ease: smoothEase }}
                    className="ft-cta-band"
                >
                    <div className="ft-cta-inner">
                        <div style={{ overflow: "hidden" }}>
                            <motion.p
                                initial={{ y: "100%" }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.4, ease: smoothEase }}
                                className="ft-cta-eyebrow"
                            >
                                PUBLISH WITH CONFIDENCE
                            </motion.p>
                            <motion.h3
                                variants={ctaMask}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="ft-cta-heading"
                            >
                                GRAB THE SPOTLIGHT YOUR STORY DESERVES.
                            </motion.h3>
                        </div>
                        <button
                            type="button"
                            className="ft-cta-btn"
                            onClick={() => setQuoteModal(true)}
                        >
                            <FileText size={16} />
                            Get a Free Proposal
                        </button>
                    </div>
                </motion.div>

                {/* Main Body */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="ft-body"
                >
                    <div className="ft-body-grid">
                        {/* Brand */}
                        <motion.div variants={staggerContainer} className="ft-brand">
                            <motion.div variants={fadeUp} className="ft-logo-wrap">
                                <Image
                                    src="/images/Bexley-Publishing-03.png"
                                    alt="Bexley Publications"
                                    width={300} height={80}
                                    className="object-contain pt-1"
                                    priority
                                />
                            </motion.div>

                            <motion.p variants={fadeUp} className="ft-brand-desc">
                                Bexley Publishing is a USA-based eBook services agency that helps authors publish confidently and professionally while connecting their books with the right readers.
                            </motion.p>

                            <motion.div variants={fadeUp} className="ft-contacts">
                                <a href="tel:2797770380" className="ft-contact-link">
                                    <Phone size={13} style={{ color: "#e8391d", flexShrink: 0, marginTop: 2 }} />
                                    (279) 777-0380
                                </a>
                                <a href="mailto:info@bexleypublishing.com" className="ft-contact-link">
                                    <Mail size={13} style={{ color: "#e8391d", flexShrink: 0, marginTop: 2 }} />
                                    info@bexleypublishing.com
                                </a>
                                <p className="ft-contact-link" style={{ cursor: "default" }}>
                                    <MapPin size={13} style={{ color: "#e8391d", flexShrink: 0, marginTop: 2 }} />
                                    <span>2390 Fruitridge Rd<br />Sacramento, CA 95822</span>
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="ft-socials">
                                {socials.map((s) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        className="ft-social-btn"
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                            <path d={s.path} />
                                        </svg>
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Link Columns */}
                        <motion.div variants={staggerContainer} className="ft-links-grid">
                            {/* Writing */}
                            <motion.div variants={fadeUp}>
                                <span className="ft-col-heading">Writing Services</span>
                                <motion.ul variants={linkStagger} initial="hidden" animate="visible" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {writingServices.map((link) => (
                                        <motion.li key={link} variants={fadeUp}>
                                            <Link href={`/InnerServices/${slugify(link)}`} className="ft-link">{link}</Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>

                            {/* Editing */}
                            <motion.div variants={fadeUp}>
                                <span className="ft-col-heading">Editing & Publishing</span>
                                <motion.ul variants={linkStagger} initial="hidden" animate="visible" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {editingServices.map((link) => (
                                        <motion.li key={link} variants={fadeUp}>
                                            <Link href={`/InnerServices/${slugify(link)}`} className="ft-link">{link}</Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>

                            {/* Design */}
                            <motion.div variants={fadeUp}>
                                <span className="ft-col-heading">Design & Marketing</span>
                                <motion.ul variants={linkStagger} initial="hidden" animate="visible" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {designServices.map((link) => (
                                        <motion.li key={link} variants={fadeUp}>
                                            <Link href={`/InnerServices/${slugify(link)}`} className="ft-link">{link}</Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>

                            {/* Company */}
                            <motion.div variants={fadeUp}>
                                <span className="ft-col-heading">Company</span>
                                <motion.ul variants={linkStagger} initial="hidden" animate="visible" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {companyLinks.map((item) => (
                                        <motion.li key={item.label} variants={fadeUp}>
                                            <Link href={item.href} className="ft-link">{item.label}</Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="ft-bottom"
                >
                    <div className="ft-bottom-inner">
                        <p className="ft-copy">© 2026 Bexley Publishing LLC. All Rights Reserved.</p>
                        <div className="ft-bottom-links">
                            {companyLinks.filter((l) => ["Privacy Policy", "Terms of Use"].includes(l.label)).map((item) => (
                                <Link key={item.label} href={item.href} className="ft-bottom-link">{item.label}</Link>
                            ))}
                            <Link href="/refund-policy" className="ft-bottom-link">Refund Policy</Link>
                        </div>
                    </div>
                </motion.div>

                {/* Scroll to top */}
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="ft-scroll-top"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <polyline points="18 15 12 9 6 15" />
                    </svg>
                </motion.button>

                <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />
            </footer>
        </>
    );
}