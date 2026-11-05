"use client";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const strategyLinks = [
    { label: "Email Marketing", href: "#email-marketing" },
    { label: "Book Signing Events", href: "#book-signing" },
    { label: "Author Branding & Promotional Materials", href: "#author-branding" },
    { label: "Times Square Video Promotion", href: "#times-square" },
];

const recognitionLinks = [
    { label: "Influencer Marketing & Shark Tank", href: "#influencer-marketing" },
    { label: "Author of the Month Nominations", href: "#author-of-the-month" },
    { label: "Book to Screen", href: "#book-to-screen" },
    { label: "BookTalk", href: "#booktalk" },
];

const mailListLinks = [
    { label: "Romance", href: "#mailing-list-romance" },
    { label: "Fantasy / Horror / Science Fiction", href: "#mailing-list-speculative" },
    { label: "Literature / Religion / Travel", href: "#mailing-list-literature" },
    { label: "Nonfiction", href: "#mailing-list-nonfiction" },
    { label: "Kids & Teens", href: "#mailing-list-kids" },
    { label: "Mystery", href: "#mailing-list-mystery" },
];

const collaborators = [
    { label: "Global Book Exhibit", href: "https://www.globalbookexhibit.com/" },
    { label: "Glastonbury Publications", href: "https://glastonburypublications.com/" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Refund Policy", href: "/refund-policy" },
];

const socials = [
    { label: "Facebook", href: "https://www.facebook.com/BexleyPublishing", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { label: "Instagram", href: "https://www.instagram.com/bexley_publishing/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: smoothEase } },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

function Column({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
    return (
        <motion.div variants={fadeUp}>
            <span className="mf-col-heading">{heading}</span>
            <ul className="mf-list">
                {links.map((l) => (
                    <li key={l.label}>
                        <a href={l.href} className="mf-link">{l.label}</a>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function MarketingFooter() {
    const footerRef = useRef<HTMLElement>(null);
    const isInView = useInView(footerRef, { once: true, margin: "-50px" });

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');

                .mf-footer {
                    font-family: 'Raleway', Arial, sans-serif;
                    width: 100%;
                    background: #0d0d0d;
                    border-top: 4px solid #e8391d;
                }

                .mf-body {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 72px 80px 64px;
                }

                .mf-grid {
                    display: grid;
                    grid-template-columns: 260px 1fr;
                    gap: 64px;
                }

                /* Brand */
                .mf-brand { display: flex; flex-direction: column; }
                .mf-logo-wrap { margin-bottom: 24px; }
                .mf-brand-desc {
                    color: rgba(255,255,255,0.45);
                    font-size: 14px;
                    line-height: 1.85;
                    margin: 0 0 28px;
                    max-width: 240px;
                }
                .mf-contacts { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
                .mf-contact {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    color: rgba(255,255,255,0.55);
                    font-size: 13px;
                    line-height: 1.5;
                    text-decoration: none;
                    margin: 0;
                    transition: color 0.2s ease;
                }
                a.mf-contact:hover { color: #fff; }

                .mf-socials { display: flex; gap: 10px; }
                .mf-social {
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center;
                    color: rgba(255,255,255,0.55);
                    transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
                }
                .mf-social:hover { background: #e8391d; border-color: #e8391d; color: #fff; }

                /* Columns */
                .mf-cols {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 32px;
                }
                .mf-col-heading {
                    display: block;
                    font-weight: 900;
                    color: #fff;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    margin-bottom: 16px;
                }
                .mf-list { list-style: none; padding: 0; margin: 0; }
                .mf-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    color: rgba(255,255,255,0.5);
                    font-size: 13px;
                    line-height: 1.5;
                    padding: 5px 0;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                .mf-link:hover { color: #e8391d; }

                .mf-footer a:focus-visible,
                .mf-footer button:focus-visible {
                    outline: 2px solid #e8391d;
                    outline-offset: 3px;
                    border-radius: 4px;
                }

                /* Bottom bar */
                .mf-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding: 22px 80px; }
                .mf-bottom-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                }
                .mf-copy { color: rgba(255,255,255,0.35); font-size: 12px; margin: 0; }
                .mf-bottom-links { display: flex; gap: 20px; flex-wrap: wrap; }
                .mf-bottom-link { color: rgba(255,255,255,0.35); font-size: 12px; text-decoration: none; transition: color 0.2s ease; }
                .mf-bottom-link:hover { color: #fff; }

                /* Scroll to top */
                .mf-top {
                    position: fixed;
                    bottom: 90px; right: 40px;
                    z-index: 50;
                    width: 42px; height: 42px;
                    border-radius: 50%;
                    background: #e8391d;
                    border: none;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(232,57,29,0.3);
                    transition: transform 0.2s ease;
                }
                .mf-top:hover { transform: scale(1.1); }

                /* ── 2400px+ ── */
                @media (min-width: 2400px) {
                    .mf-body { max-width: 2200px; padding: 110px 160px 90px; }
                    .mf-grid { grid-template-columns: 400px 1fr; gap: 100px; }
                    .mf-brand-desc { font-size: 18px; max-width: 360px; }
                    .mf-contact { font-size: 17px; }
                    .mf-social { width: 52px; height: 52px; }
                    .mf-col-heading { font-size: 14px; margin-bottom: 24px; }
                    .mf-link { font-size: 17px; padding: 7px 0; }
                    .mf-bottom { padding: 32px 160px; }
                    .mf-bottom-inner { max-width: 2200px; }
                    .mf-copy, .mf-bottom-link { font-size: 15px; }
                    .mf-top { width: 60px; height: 60px; }
                }

                /* ── 1800–2399px ── */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .mf-body { max-width: 1700px; padding: 90px 130px 80px; }
                    .mf-grid { grid-template-columns: 320px 1fr; gap: 80px; }
                    .mf-brand-desc { font-size: 16px; max-width: 290px; }
                    .mf-contact { font-size: 15px; }
                    .mf-col-heading { font-size: 12px; }
                    .mf-link { font-size: 15px; }
                    .mf-bottom { padding: 28px 130px; }
                    .mf-bottom-inner { max-width: 1700px; }
                    .mf-copy, .mf-bottom-link { font-size: 13px; }
                }

                /* ── 1400–1799px ── */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .mf-body { max-width: 1360px; padding: 80px 100px 72px; }
                    .mf-grid { grid-template-columns: 280px 1fr; gap: 72px; }
                    .mf-bottom-inner { max-width: 1360px; }
                    .mf-bottom { padding: 24px 100px; }
                }

                /* ── 901–1199px ── */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .mf-body { padding: 60px 56px; }
                    .mf-grid { grid-template-columns: 220px 1fr; gap: 44px; }
                    .mf-cols { gap: 20px; }
                    .mf-link { font-size: 12px; }
                    .mf-brand-desc { font-size: 13px; }
                    .mf-bottom { padding: 20px 56px; }
                }

                /* ── ≤900px: stack ── */
                @media (max-width: 900px) {
                    .mf-body { padding: 56px 40px; }
                    .mf-grid { grid-template-columns: 1fr; gap: 44px; }
                    .mf-brand-desc { max-width: 100%; }
                    .mf-cols { grid-template-columns: repeat(2, 1fr); gap: 32px; }
                    .mf-bottom { padding: 20px 40px; }
                    .mf-bottom-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
                }

                /* ── ≤640px ── */
                @media (max-width: 640px) {
                    .mf-body { padding: 44px 20px; }
                    .mf-cols { gap: 28px 20px; }
                    .mf-bottom { padding: 16px 20px; }
                    .mf-copy, .mf-bottom-link { font-size: 11px; }
                    .mf-top { width: 40px; height: 40px; bottom: 70px; right: 20px; }
                }

                /* ── ≤420px: single column ── */
                @media (max-width: 420px) {
                    .mf-body { padding: 40px 16px; }
                    .mf-cols { grid-template-columns: 1fr; gap: 28px; }
                    .mf-bottom { padding: 14px 16px; }
                    .mf-top { bottom: 16px; right: 16px; }
                }
            `}</style>

            <footer ref={footerRef} className="mf-footer">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mf-body"
                >
                    <div className="mf-grid">
                        <motion.div variants={staggerContainer} className="mf-brand">
                            <motion.div variants={fadeUp} className="mf-logo-wrap">
                                <Link href="/">
                                    <Image
                                        src="/images/Bexley-Publishing-03.png"
                                        alt="Bexley Publishing"
                                        width={300}
                                        height={80}
                                        className="object-contain pt-1"
                                    />
                                </Link>
                            </motion.div>

                            <motion.p variants={fadeUp} className="mf-brand-desc">
                                Let&apos;s work together to expand your reach, strengthen your author
                                brand, and explore the possibilities that lie beyond the page.
                            </motion.p>

                            <motion.div variants={fadeUp} className="mf-contacts">
                                <a href="tel:2797770380" className="mf-contact">
                                    <Phone size={13} style={{ color: "#e8391d", flexShrink: 0, marginTop: 2 }} />
                                    (279) 777-0380
                                </a>
                                <a href="mailto:info@bexleypublishing.com" className="mf-contact">
                                    <Mail size={13} style={{ color: "#e8391d", flexShrink: 0, marginTop: 2 }} />
                                    info@bexleypublishing.com
                                </a>
                                <p className="mf-contact">
                                    <MapPin size={13} style={{ color: "#e8391d", flexShrink: 0, marginTop: 2 }} />
                                    <span>2390 Fruitridge Rd<br />Sacramento, CA 95822</span>
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="mf-socials">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="mf-social"
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d={s.path} />
                                        </svg>
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div variants={staggerContainer} className="mf-cols">
                            <Column heading="Marketing Strategies" links={strategyLinks} />
                            <Column heading="Promotion & Recognition" links={recognitionLinks} />
                            <Column heading="Our Mail List" links={mailListLinks} />

                            <motion.div variants={fadeUp}>
                                <span className="mf-col-heading">Our Collaborators</span>
                                <ul className="mf-list">
                                    {collaborators.map((c) => (
                                        <li key={c.label}>
                                            <a
                                                href={c.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mf-link"
                                            >
                                                {c.label}
                                                <ExternalLink size={12} aria-hidden="true" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="mf-bottom">
                    <div className="mf-bottom-inner">
                        <p className="mf-copy">© 2026 Bexley Publishing LLC. All Rights Reserved.</p>
                        <div className="mf-bottom-links">
                            {legalLinks.map((l) => (
                                <Link key={l.label} href={l.href} className="mf-bottom-link">
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="mf-top"
                    aria-label="Back to top"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                        <polyline points="18 15 12 9 6 15" />
                    </svg>
                </button>
            </footer>
        </>
    );
}