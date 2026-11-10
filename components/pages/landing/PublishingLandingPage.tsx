"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants, } from "framer-motion";
import {
    ArrowRight, Phone, Mail, MapPin, Send, Star, X, BadgeCheck, Check, Plus,
    PenTool, SpellCheck, Palette, LayoutTemplate, Globe, Megaphone, Headphones, MonitorSmartphone,
    CalendarDays, PhoneCall, Trophy, BookOpen, Users, Percent, Crown, ShieldCheck, Handshake,
    FileText, Rocket, Search, Award,
    Leaf,
    Bird,
} from "lucide-react";
import CallBar from "./CallBar";
import ContactForm from "@/components/Contact-form";
import { publishingHeroTheme, publishingFooterTheme, landingPopupTheme } from "@/components/contactFormThemes";
import GetStartedPopup from "./Getstartedpopup";



const BRAND = {
    name: "Bexley Publishing",
    phone: "(279) 777-0380",
    tollFree: "(279) 777-0380",
    phoneHref: "tel:+12797770380",
    email: "info@bexleypublishing.com",
    headOffice: "2390 Fruitridge Rd Sacramento, CA 95822",
};

/* ------------------------------------------------------------------ */
/*  Offer settings: change these two values for future campaigns      */
/* ------------------------------------------------------------------ */


const MEETING_URL = "";

const IMG = {
    headerLogo: "/images/page/Bexley-Publishing-03.png",
    footerLogo: "/images/page/Bexley-Publishing-03.png",
};

const COVER_COUNT = 25;
const cover = (n: number) => `/images/books/${String(((n - 1) % COVER_COUNT) + 1).padStart(2, "0")}.png`;

const POPUP_COVERS = [20, 21, 22];

const LEGAL_LINKS = [
    { label: "Terms & Conditions", href: "/terms-of-use" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
];

const POPUP_MIN_WIDTH = 1024;
const POPUP_EVENT = "pb:open-popup";
const Sep = () => <span className="-mt-3 text-xl font-extrabold text-[#ff9a1f]">:</span>;
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
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const portfolioCats = ["Fiction", "Fantasy", "Spirituality", "Thriller", "Romance", "Biography"] as const;
type PortfolioCat = (typeof portfolioCats)[number];

const portfolioData: Record<PortfolioCat, string[]> = {
    Fiction: [
        "/images/books/02.png",
        "/images/books/13.png",
        "/images/books/18.png",
        "/images/books/24.png",
        "/images/books/30.png",
        "/images/books/36.png",
    ],
    Fantasy: [
        "/images/books/04.png",
        "/images/books/10.png",
        "/images/books/21.png",
        "/images/books/25.png",
        "/images/books/31.png",
        "/images/books/32.png",
    ],
    Spirituality: [
        "/images/books/05.png",
        "/images/books/07.png",
        "/images/books/15.png",
        "/images/books/17.png",
        "/images/books/20.png",
        "/images/books/26.png",
    ],
    Thriller: [
        "/images/books/03.png",
        "/images/books/16.png",
        "/images/books/27.png",
        "/images/books/35.png",
        "/images/books/33.png",
        "/images/books/34.png",
    ],
    Romance: [
        "/images/books/01.png",
        "/images/books/06.png",
        "/images/books/09.png",
        "/images/books/22.png",
        "/images/books/23.png",
        "/images/books/11.png",
    ],
    Biography: [
        "/images/books/08.png",
        "/images/books/12.png",
        "/images/books/14.png",
        "/images/books/19.png",
        "/images/books/28.png",
        "/images/books/29.png",
    ],
};

function scrollToForm() {
    document.getElementById("pb-hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function getStarted() {
    if (typeof window === "undefined") return;
    if (window.matchMedia(`(min-width: ${POPUP_MIN_WIDTH}px)`).matches) window.dispatchEvent(new Event(POPUP_EVENT));
    else scrollToForm();
}

function bookMeeting() {
    if (MEETING_URL) window.open(MEETING_URL, "_blank", "noopener,noreferrer");
    else getStarted();
}

function useImgFallback() {
    const ref = useRef<HTMLImageElement>(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        const img = ref.current;
        if (img && img.complete && img.naturalWidth === 0) setFailed(true);
    }, []);
    return { ref, failed, onError: () => setFailed(true) };
}

function BookCover({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
    return <img src={src} alt={alt} className={`pb-cover ${className}`} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function LogoMark({ src, name }: { src: string; name: string }) {
    const { ref, failed, onError } = useImgFallback();
    if (failed) return <span className="pb-wordmark">{name}</span>;
    // eslint-disable-next-line @next/next/no-img-element
    return <img ref={ref} src={src} alt={name} className="pb-logo-mark" loading="lazy" onError={onError} />;
}

function PlainImg({ src, alt, className = "", fallback }: { src: string; alt: string; className?: string; fallback: ReactNode }) {
    const { ref, failed, onError } = useImgFallback();
    if (failed) return <>{fallback}</>;
    return <img ref={ref} src={src} alt={alt} className={className} loading="lazy" onError={onError} />;
}

const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const heroBooks = Array.from({ length: 7 }, (_, i) => cover(i + 1));

const retailers = ["Amazon Kindle", "Barnes & Noble", "Kobo", "Apple Books", "Google Play Books", "Draft2Digital", "IngramSpark", "Smashwords"];
const reviewSites = ["Trustpilot", "Reviews.io", "Bark", "Sitejabber", "GoodFirms", "Clutch"];

/* Service tags from the content doc: Cover Design, eBook, Editing, Interior Formatting, Illustrations, Marketing */
const genres = [
    { title: "Biography", items: ["Cover Design", "eBook", "Editing", "Interior Formatting", "Illustrations"] },
    { title: "Novels", items: ["Cover Design", "Editing", "Interior Formatting", "Illustrations", "Marketing"] },
    { title: "Fantasy", items: ["Cover Design", "Editing", "Interior Formatting", "Illustrations"] },
    { title: "Romance", items: ["Cover Design", "eBook", "Editing", "Interior Formatting"] },
    { title: "Fiction", items: ["Cover Design", "eBook", "Editing", "Interior Formatting"] },
    { title: "Non-Fiction", items: ["Cover Design", "eBook", "Editing", "Interior Formatting", "Marketing"] },
].map((g, i) => ({ ...g, src: cover(8 + i) }));

/* ═══ AWARDS — images from /public/images/Awards/ ═══
   Note: paths are case-sensitive on Vercel/Linux. If your files are .jpg or .webp, change the extension below. */
const awards = [
    { src: "/images/Awards/Award-01.png", alt: "Readers' Favorite Book Award Winner" },
    { src: "/images/Awards/Award-02.png", alt: "Literary Titan Book Award" },
    { src: "/images/Awards/Award-03.png", alt: "Independent Press Award Winner" },
    { src: "/images/Awards/Award-04.png", alt: "The BookFest Award Winner" },
    { src: "/images/Awards/Award-05.png", alt: "Big Book Award 2024 Winner" },
    { src: "/images/Awards/Award-06.png", alt: "Global Book Award" },
];

const services = [
    { icon: PenTool, title: "Ghostwriting", desc: "Turn your ideas, notes, or unfinished drafts into a professionally written manuscript that reflects your voice and vision." },
    { icon: SpellCheck, title: "Editing & Proofreading", desc: "Improve clarity, grammar, flow, consistency, and readability while preserving the style and personality of your writing." },
    { icon: Palette, title: "Cover Design", desc: "Create a professional, genre-appropriate cover designed to make a strong first impression and attract the right readers." },
    { icon: LayoutTemplate, title: "Formatting & Typesetting", desc: "Prepare clean, polished interior layouts for paperback, hardcover, and digital editions across major platforms." },
    { icon: Globe, title: "Publishing & Distribution", desc: "Prepare your title for release across major online retailers, eBook platforms, and distribution networks." },
    { icon: Megaphone, title: "Book Marketing", desc: "Build visibility with tailored promotional strategies designed to help your title reach and engage its target audience." },
    { icon: Headphones, title: "Audiobook Production", desc: "Transform your manuscript into a professionally produced audiobook with narration, editing, and mastering support." },
    { icon: MonitorSmartphone, title: "Author Website", desc: "Build a professional online presence where readers can discover your books, learn about you, and stay connected." },
];

const processSteps = [
    { icon: Handshake, title: "Connect With Us", desc: "Tell us about your manuscript, goals, preferred format, and the support you need to get started." },
    { icon: FileText, title: "Draft Review", desc: "Our team reviews your manuscript and identifies the editing, design, formatting, and production requirements." },
    { icon: Search, title: "Editing & Formatting", desc: "We refine your content and prepare the interior layout for a polished, professional reading experience." },
    { icon: Palette, title: "Cover Design", desc: "Our designers create a cover that reflects your genre, message, and target audience." },
    { icon: Rocket, title: "Book Publishing", desc: "Once approved, your final files are prepared for release and distribution across selected publishing platforms." },
];

const stats = [
    { icon: BookOpen, num: "500+", label: "Books published" },
    { icon: Users, num: "300+", label: "Happy authors" },
    { icon: Crown, num: "12+", label: "Years of experience" },
    { icon: Percent, num: "100%", label: "Rights & royalties yours" },
];

const whyPoints = [
    "A dedicated consultant and project manager from start to finish.",
    "You keep full creative control over your book.",
    "Editing, design, formatting, and publishing support in one place.",
    "Clear pricing, organized timelines, and no hidden fees.",
    "Distribution support across major online platforms and retailers.",
];

const TRUST = { score: "4.9", label: "Excellent", reviews: "300+" };

const testimonials = [
    { name: "Samantha Thornhill", location: "US", date: "Jul 21, 2026", rating: 5, title: "Finally, a team that gets it", quote: "After working with several inexperienced freelancers, Bexley understood my book idea straight away. Editing and design were outstanding." },
    { name: "David Torres", location: "CA", date: "Jul 05, 2026", rating: 5, title: "My manuscript became a real book.", quote: "They took my unfinished manuscript and turned it into a polished, professional publication. Highly recommended." },
    { name: "Emily Rose", location: "AU", date: "Jun 14, 2026", rating: 5, title: "Marketing that actually worked", quote: "The launch plan helped my book reach the top of its Amazon category in the first week. Great communication throughout." },
];

const faqs = [
    { q: "How long does it take to publish my book?", a: "Timelines vary depending on manuscript length, editing needs, design requirements, revisions, and selected services. After reviewing your project, we can provide a more accurate schedule." },
    { q: "Do I keep the rights and royalties to my book?", a: "Yes. When publishing a book with Bexley Publishing, you retain ownership of your work, along with your rights and royalties." },
    { q: "Where will my book be available?", a: "Depending on your selected distribution plan, your book can be prepared for availability across major online retailers, eBook stores, and distribution networks." },
    { q: "I only have an idea. Can you still help?", a: "Yes. Our team can help develop your idea into a structured manuscript through ghostwriting and manuscript development support." },
    { q: "Can I publish in paperback, hardcover, and eBook?", a: "Yes. We can prepare your book for paperback, hardcover, and digital formats based on your project requirements." },
    { q: "How much does it cost?", a: "Pricing depends on your manuscript length, condition, selected services, design needs, and publishing goals. Contact us for a customized quote." },
];

function Eyebrow({ children, center = false, light = false }: { children: ReactNode; center?: boolean; light?: boolean }) {
    return (
        <div className={`pb-eyebrow ${center ? "center" : ""} ${light ? "light" : ""}`}>
            <span className="pb-eyebrow-line" />
            <span className="pb-eyebrow-text">{children}</span>
            {center && <span className="pb-eyebrow-line" />}
        </div>
    );
}

function CtaButtons({ onDark = true }: { onDark?: boolean }) {
    return (
        <div className="pb-actions">
            <button type="button" className="pb-btn pb-btn-primary" onClick={getStarted}>Get A Quote <ArrowRight size={16} /></button>
            <button type="button" className={`pb-btn ${onDark ? "pb-btn-light" : "pb-btn-dark"}`} onClick={bookMeeting}><CalendarDays size={16} /> Book A Meeting</button>
            <a href={BRAND.phoneHref} className={`pb-btn ${onDark ? "pb-btn-ghost" : "pb-btn-ghost-dark"}`}><PhoneCall size={16} /> Toll Free: {BRAND.tollFree}</a>
        </div>
    );
}

function SectionHead({ eyebrow, title, accent, sub, light = false }: { eyebrow: string; title: string; accent: string; sub?: string; light?: boolean }) {
    return (
        <div className="pb-section-head">
            <Eyebrow center light={light}>{eyebrow}</Eyebrow>
            <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`pb-h2 ${light ? "light" : ""}`}>
                {title} <span className="accent">{accent}</span>
            </motion.h2>
            {sub && <p className={`pb-sub ${light ? "light" : ""}`}>{sub}</p>}
        </div>
    );
}

function Marquee({ items, dark = false, label }: { items: string[]; dark?: boolean; label: string }) {
    const row = [...items, ...items];
    return (
        <div className={`pb-marquee ${dark ? "dark" : ""}`} aria-label={label}>
            <div className="pb-marquee-track">
                {row.map((name, i) => (
                    <div key={`${name}-${i}`} className="pb-marquee-item" aria-hidden={i >= items.length}>
                        <LogoMark src={`/images/publishing/platforms/${slug(name)}.png`} name={name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function TrustStars({ rating, size = 22 }: { rating: number; size?: number }) {
    return (
        <div className="pb-tp-stars" aria-label={`Rated ${rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`pb-tp-star ${i < Math.round(rating) ? "on" : ""}`} style={{ width: size, height: size }}>
                    <Star size={size * 0.62} fill="white" stroke="white" />
                </span>
            ))}
        </div>
    );
}


const TICKER_TEXT = "Thanksgiving Special! Publish Your Dream Book with Professional Publishing Services – Get 50% OFF!";

const TickerContent = () => (
    <span
        style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
            paddingRight: 40,
        }}
    >
        <Leaf size={18} color="#FCD34D" fill="#F59E0B" strokeWidth={2} />
        <span style={{ fontWeight: 600 }}>{TICKER_TEXT}</span>
        <Bird size={18} color="#FDE68A" fill="#B45309" strokeWidth={2} />
    </span>
);


function Header() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <header className={`pb-header ${scrolled ? "scrolled" : ""}`}>
             <div className="cb-ticker mb-4 -mt-5"  role="marquee" aria-label={TICKER_TEXT}>
                <div className="cb-ticker-track" aria-hidden="true">
                    {[0, 1].map((group) => (
                        <div className="cb-ticker-group" key={group}>
                            {[0, 1, 2].map((i) => (
                                <span className="cb-ticker-item" key={i}>
                                    <TickerContent />
                                    <span className="cb-ticker-sep"></span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="pb-header-inner">
                <a href="#top" className="pb-logo" aria-label={`${BRAND.name}, back to top`}>
                    <img src={IMG.headerLogo} alt={BRAND.name} className="pb-logo-img" />
                </a>
                <div className="pb-header-right">
                    <a href={BRAND.phoneHref} className="pb-header-phone" aria-label={`Call ${BRAND.phone}`}>
                        <span className="pb-header-phone-icon"><Phone size={15} /></span>
                        <span className="pb-header-phone-text"><small>Call us</small>{BRAND.phone}</span>
                    </a>
                    <button type="button" className="pb-btn pb-btn-primary pb-btn-sm" onClick={getStarted}>Get Started</button>
                </div>
            </div>
        </header>
    );
}

/* Hero form: white card = offer panel + ContactForm (styled by publishingHeroTheme) */
function HeroForm() {
    return (
        <motion.div
            id="pb-hero-form"
            className="pb-hero-form"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: smoothEase }}
        >
            <div className="pb-hero-form-offer">
                <p>LIMITED-TIME {" "}<br />OFFER</p>
                <span className="pb-badge-50">50%<small>off</small></span>
            </div>
            <ContactForm
                theme={publishingHeroTheme}
                formLocation="Publishing Landing - Hero"
                placeholders={{ name: "Full Name *", email: "Email Address *", phone: "Phone Number *", message: "Tell us about your project." }}
                labels={{ name: "Full Name", email: "Email Address", phone: "Phone Number", message: "Tell us about your project." }}
                submitLabel={<>Talk To An Expert <Send size={15} /></>}
            />
        </motion.div>
    );
}

function Hero() {

    return (
        <section className="pb-hero">
                
                    <img
                        src="/images/page/thanksgiving2.webp"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover [mask-image:linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]"
                    />
                    {/* Black overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-black/50" aria-hidden="true" />

                    {/* Your content goes here; z-10 keeps it above the overlay */}
                    
                
                          
            <div className="pb-hero-dots" />
            <div className="pb-hero-glow" />
            <div className="pb-inner pb-hero-inner">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <Eyebrow center light>Your Path To Professional Publishing</Eyebrow>
                </motion.div>
                <motion.h1 variants={maskReveal} initial="hidden" animate="visible" className="pb-hero-h1">
                    Book Publishing Made <span className="accent">Simple with Bexley</span>
                </motion.h1>
                <motion.p variants={fadeUp} initial="hidden" animate="visible" className="pb-hero-sub">
                    Turn your manuscript into a professionally produced book with expert guidance at every stage. Keep full creative control, retain your rights and royalties, and work with a dedicated team committed to bringing your vision to life.
                </motion.p>
                <HeroForm />
            </div>

            <div className="pb-shelf" aria-hidden="true">
                {heroBooks.map((src, i) => (
                    <motion.div
                        key={src}
                        className={`pb-shelf-book b${i + 1}`}
                        initial={{ y: 160, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 + i * 0.08, ease: smoothEase }}
                    >
                        <BookCover src={src} alt="" eager />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function Genres() {
    return (
        <section className="pb-genres">
            <div className="pb-inner">
                <SectionHead eyebrow="Publishing support for every story" title="Publishing Solutions For" accent="Every Genre" sub="Whatever you write, our team provides the creative and professional support needed to prepare your book for readers." />
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="pb-genre-grid">
                    {genres.map((g) => (
                        <motion.article key={g.title} variants={fadeUp} className="pb-genre-card">
                            <div className="pb-genre-art">
                                <span className="pb-genre-ring" />
                                <BookCover src={g.src} alt={`${g.title} book cover`} className="pb-genre-cover" />
                            </div>
                            <h3 className="pb-genre-title">{g.title}</h3>
                            <ul className="pb-genre-list">
                                {g.items.map((it) => <li key={it}><Check size={14} /> {it}</li>)}
                            </ul>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function CtaBand({ eyebrow, title, text, covers, badge }: { eyebrow: string; title: ReactNode; text: string; covers: [number, number, number]; badge?: boolean }) {
    return (
        <section className="pb-band">
            <div className="pb-band-bg" aria-hidden="true" />
            <div className="pb-inner pb-band-inner">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="pb-band-copy">
                    <motion.p variants={fadeUp} className="pb-band-eyebrow">{eyebrow}</motion.p>
                    <motion.h2 variants={maskReveal} className="pb-band-h2">{title}</motion.h2>
                    <motion.p variants={fadeUp} className="pb-band-text">{text}</motion.p>
                    <motion.div variants={fadeUp}><CtaButtons /></motion.div>
                </motion.div>
                <motion.div
                    className="pb-band-art"
                    initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: smoothEase }}
                >
                    <div className="pb-band-stack">
                        <BookCover src={cover(covers[0])} alt="Book published by Bexley Publishing" className="s1" />
                        <BookCover src={cover(covers[1])} alt="Book published by Bexley Publishing" className="s2" />
                        <BookCover src={cover(covers[2])} alt="Book published by Bexley Publishing" className="s3" />
                        {badge && (
                            <div className="pb-band-chip">
                                <b>100%</b>
                                <span>Rights &amp; Royalties<br />Yours</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


function Portfolio() {
    const [active, setActive] = useState<PortfolioCat>(portfolioCats[0]);
    const items = portfolioData[active];

    return (
        <section className="pb-portfolio">
            <div className="pb-inner">
                <SectionHead
                    eyebrow="Our published work"
                    title="Recently We've Published"
                    accent="These Books"
                    sub="Explore a selection of books we've helped prepare for publication across a range of genres. Each project reflects a unique story, professionally presented for its intended audience."
                />

                <div className="pb-tabs" role="tablist" aria-label="Book categories">
                    {portfolioCats.map((c) => (
                        <button
                            key={c}
                            type="button"
                            role="tab"
                            aria-selected={active === c}
                            className={`pb-tab ${active === c ? "active" : ""}`}
                            onClick={() => setActive(c)}
                        >
                            {c}
                            {active === c && (
                                <motion.span
                                    layoutId="pb-tab-pill"
                                    className="pb-tab-pill"
                                    transition={{ duration: 0.4, ease: smoothEase }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <motion.div layout className="pb-gallery">
                    <AnimatePresence mode="popLayout">
                        {items.map((src, i) => (
                            <motion.div
                                key={`${active}-${i}-${src}`}
                                layout
                                className="pb-gallery-item"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.94 }}
                                transition={{ duration: 0.45, delay: i * 0.03, ease: smoothEase }}
                            >
                                <BookCover src={src} alt={`${active} book cover ${i + 1}`} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

function Services() {
    return (
        <section className="pb-services">
            <div className="pb-inner">
                <SectionHead eyebrow="Complete author support" title="Everything Your Book Needs," accent="Under One Roof" sub="Choose the services your manuscript needs or let our team guide you through the complete process from first draft to final release." />
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="pb-service-grid">
                    {services.map(({ icon: Icon, title, desc }) => (
                        <motion.article key={title} variants={fadeUp} className="pb-service-card">
                            <div className="pb-service-icon"><Icon size={24} /></div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                            <button type="button" className="pb-service-link" onClick={getStarted}>Get a quote <ArrowRight size={14} /></button>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function Process() {
    return (
        <section className="pb-process">
            <div className="pb-inner">
                <SectionHead eyebrow="Simple. Clear. Author-focused." title="Our Book" accent="Publishing Process" sub="Five straightforward steps take your manuscript from initial review to a professionally prepared book ready for readers." />
                <motion.ol variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="pb-process-row">
                    {processSteps.map(({ icon: Icon, title, desc }, i) => (
                        <motion.li key={title} variants={fadeUp} className="pb-process-step">
                            <div className="pb-process-top">
                                <span className="pb-process-num">{String(i + 1).padStart(2, "0")}</span>
                                <span className="pb-process-icon"><Icon size={20} /></span>
                            </div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </motion.li>
                    ))}
                </motion.ol>
            </div>
        </section>
    );
}

function WhyUs() {
    return (
        <section className="pb-why">
            <div className="pb-inner pb-why-grid">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
                    <motion.div variants={fadeUp}><Eyebrow>Why authors choose us</Eyebrow></motion.div>
                    <motion.h2 variants={maskReveal} className="pb-h2 left">
                        Authors Rely On <span className="accent">Bexley Publishing For</span>
                    </motion.h2>
                    <motion.ul variants={staggerContainer} className="pb-why-list">
                        {whyPoints.map((p) => (
                            <motion.li key={p} variants={fadeUp}><span className="pb-why-check"><ShieldCheck size={15} /></span>{p}</motion.li>
                        ))}
                    </motion.ul>
                    <motion.div variants={fadeUp}><CtaButtons onDark={false} /></motion.div>
                </motion.div>

                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="pb-stats">
                    {stats.map(({ icon: Icon, num, label }, i) => (
                        <motion.div key={label} variants={fadeUp} className={`pb-stat ${i === 0 ? "feature" : ""}`}>
                            <Icon size={22} />
                            <b>{num}</b>
                            <span>{label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function Testimonials() {
    const [perView, setPerView] = useState(3);
    const [index, setIndex] = useState(0);
    const pages = Math.max(1, testimonials.length - perView + 1);

    useEffect(() => {
        const calc = () => setPerView(window.innerWidth < 700 ? 1 : window.innerWidth < 1100 ? 2 : 3);
        calc();
        window.addEventListener("resize", calc);
        return () => window.removeEventListener("resize", calc);
    }, []);
    useEffect(() => { if (index > pages - 1) setIndex(0); }, [pages, index]);
    useEffect(() => {
        if (pages <= 1) return;
        const t = setInterval(() => setIndex((i) => (i + 1) % pages), 5000);
        return () => clearInterval(t);
    }, [pages]);

    return (
        <section className="pb-testimonials">
            <div className="pb-inner">
                <SectionHead
                    eyebrow="What our authors say"
                    title="Reviews From"
                    accent="Satisfied Authors"
                    sub="Real experiences from authors who trusted Bexley Publishing to help bring their books to life."
                    light
                />

                <motion.div className="pb-tp-summary" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <span className="pb-tp-label">{TRUST.label}</span>
                    <TrustStars rating={5} size={30} />
                    <span className="pb-tp-meta">Rated <strong>{TRUST.score}</strong> / 5 based on <strong>{TRUST.reviews} reviews</strong></span>
                    <span className="pb-tp-brand"><Star size={20} fill="#03D389" stroke="#03D389" /> Trustpilot</span>
                </motion.div>

                <div className="pb-slider">
                    <div className="pb-slider-track" style={{ transform: `translateX(-${(index * 100) / perView}%)` }}>
                        {testimonials.map(({ name, location, date, rating, title, quote }) => (
                            <div key={name} className="pb-slide" style={{ flex: `0 0 ${100 / perView}%` }}>
                                <article className="pb-tp-card">
                                    <header className="pb-tp-head">
                                        <span className="pb-tp-avatar" aria-hidden="true">{name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                                        <div>
                                            <p className="pb-tp-name">{name}</p>
                                            
                                        </div>
                                    </header>
                                    <div className="pb-tp-rowline">
                                        <TrustStars rating={rating} size={20} />
                                        <span className="pb-tp-verified"><BadgeCheck size={14} /> Verified</span>
                                    </div>
                                    <h3 className="pb-tp-title">{title}</h3>
                                    <p className="pb-tp-text">{quote}</p>
                                   
                                </article>
                            </div>
                        ))}
                    </div>
                </div>

                {pages > 1 && (
                    <div className="pb-dots">
                        {Array.from({ length: pages }).map((_, i) => (
                            <button key={i} type="button" aria-label={`Show reviews ${i + 1}`} className={`pb-dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} />
                        ))}
                    </div>
                )}

                
            </div>
        </section>
    );
}

function Faq() {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section className="pb-faq">
            <div className="pb-inner pb-faq-grid">
                <div className="pb-faq-intro">
                    <Eyebrow>Need help?</Eyebrow>
                    <motion.h2 variants={maskReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="pb-h2 left">
                        Questions Authors <span className="accent">Ask Us</span>
                    </motion.h2>
                    <p className="pb-sub left">Have questions about your manuscript, timeline, pricing, or distribution? Our team is here to help you understand the process and choose the right support for your book.</p>
                    <a href={BRAND.phoneHref} className="pb-faq-call"><span><Phone size={18} /></span><div><small>Call us</small>{BRAND.phone}</div></a>
                </div>
                <div className="pb-faq-list">
                    {faqs.map(({ q, a }, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={q} className={`pb-faq-item ${isOpen ? "open" : ""}`}>
                                <button type="button" className="pb-faq-q" aria-expanded={isOpen} aria-controls={`pb-faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                                    <span>{q}</span>
                                    <span className="pb-faq-icon"><Plus size={18} /></span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`pb-faq-${i}`} className="pb-faq-a"
                                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: smoothEase }}
                                        >
                                            <p>{a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="pb-footer">
            <div className="pb-inner pb-footer-grid">
                <div className="pb-footer-brand">
                    <a href="#top" className="pb-logo" aria-label={`${BRAND.name}, back to top`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={IMG.footerLogo} alt={BRAND.name} className="pb-logo-img footer" />
                    </a>
                    <p>Bexley Publishing helps authors move from manuscript to market with professional editing, design, formatting, distribution, and marketing support. Our team is committed to making the publishing journey clear, collaborative, and author-focused.</p>
                    <div className="pb-footer-contact">
                        <a href={BRAND.phoneHref}><Phone size={16} /><span><small>Call us</small>{BRAND.phone}</span></a>
                        <a href={`mailto:${BRAND.email}`}><Mail size={16} /><span><small>Email</small>{BRAND.email}</span></a>
                        <p><MapPin size={16} /><span><small>Address</small>{BRAND.headOffice}</span></p>
                    </div>
                </div>

                <div className="pb-footer-card">
                    <span className="pb-badge-50 corner">50%<small>off</small></span>
                    <p className="pb-footer-card-h">Ready To Bring Your Book To Readers?</p>
                    <p className="pb-footer-card-sub">Tell us about your project, and our publishing team will get in touch to discuss the next steps.</p>
                    <ContactForm
                        theme={publishingFooterTheme}
                        formLocation="Publishing Landing - Footer"
                        placeholders={{ name: "Full Name *", email: "Email Address *", phone: "Phone Number *", message: "Tell us about your project." }}
                        labels={{ name: "Full Name", email: "Email Address", phone: "Phone Number", message: "Tell us about your project." }}
                        submitLabel={<>Get In Touch <Send size={15} /></>}
                    />
                </div>
            </div>
            <div className="pb-footer-bottom">
                <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
                <nav aria-label="Legal">{LEGAL_LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</nav>
            </div>
        </footer>
    );
}

export default function PublishingLandingPage() {
    return (
        <>
            <style>{`
                /* ═══ TOKENS & GLOBAL ═══ */
                .pb-main {
                    --red: #e8391d; --red-dark: #c0271a; --ink: #05070f; --ink-2: #111522; --cream: #faf9f7;
                    --sun: #ffc83d; --grey: #6b7280; --line: #ece8e1;
                    width: 100%; overflow: hidden; font-family: var(--font-raleway), 'Raleway', Arial, sans-serif; color: var(--ink); background: var(--cream);
                }
                .pb-main *, .pb-main *::before, .pb-main *::after { box-sizing: border-box; }
                .pb-main a { text-decoration: none; color: inherit; }
                .pb-main :focus-visible { outline: 3px solid var(--sun); outline-offset: 3px; border-radius: 6px; }
                .pb-inner { max-width: 1240px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 2; }

                /* ═══ EYEBROW / HEADINGS ═══ */
                .pb-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
                .pb-eyebrow.center { justify-content: center; }
                .pb-eyebrow-line { display: block; width: 32px; height: 2px; background: var(--red); flex-shrink: 0; }
                .pb-eyebrow-text { color: var(--red); font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; }
                .pb-eyebrow.light .pb-eyebrow-text { color: var(--sun); }
                .pb-eyebrow.light .pb-eyebrow-line { background: var(--sun); }
                .pb-section-head { text-align: center; max-width: 820px; margin: 0 auto 56px; }
                .pb-h2 { font-weight: 900; text-transform: uppercase; line-height: 1.05; font-size: clamp(2rem, 3.5vw, 3rem); color: var(--ink); }
                .pb-h2.light { color: white; }
                .pb-h2.left { text-align: left; }
                .pb-h2 .accent { color: var(--red); }
                .pb-sub { color: var(--grey); font-size: 15px; line-height: 1.75; margin-top: 18px; }
                .pb-sub.light { color: rgba(255,255,255,0.6); }
                .pb-sub.left { text-align: left; }

                /* ═══ BUTTONS ═══ */
                .pb-actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
                .pb-btn {
                    display: inline-flex; align-items: center; justify-content: center; gap: 10px; border: 2px solid transparent;
                    font-family: inherit; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;
                    padding: 15px 24px; border-radius: 12px; cursor: pointer; white-space: nowrap;
                    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease;
                }
                .pb-btn:hover { gap: 14px; }
                .pb-btn-primary { background: var(--red); color: white !important; }
                .pb-btn-primary:hover { background: var(--red-dark); box-shadow: 0 10px 40px rgba(232,57,29,0.4); }
                .pb-btn-light { background: white; color: var(--ink) !important; }
                .pb-btn-light:hover { background: var(--sun); }
                .pb-btn-dark { background: var(--ink); color: white !important; }
                .pb-btn-dark:hover { background: var(--red); }
                .pb-btn-ghost { background: transparent; color: white !important; border-color: rgba(255,255,255,0.45); }
                .pb-btn-ghost:hover { border-color: white; background: rgba(255,255,255,0.08); }
                .pb-btn-ghost-dark { background: transparent; color: var(--ink) !important; border-color: rgba(5,7,15,0.25); }
                .pb-btn-ghost-dark:hover { border-color: var(--ink); }
                .pb-btn-sm { padding: 11px 20px; font-size: 11px; }

                /* ═══ BOOK COVERS ═══ */
                .pb-cover { display: block; width: 100%; height: 100%; object-fit: contain; object-position: center bottom; background: none; filter: drop-shadow(0 18px 24px rgba(0,0,0,0.3)); }

                /* ═══ HEADER ═══ */
                .pb-header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 20px 0; transition: background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease; }
                .pb-header.scrolled { background: rgba(5,7,15,0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 0 8px 30px rgba(0,0,0,0.25); padding: 12px 0; }
                .pb-header-inner { max-width: 1320px; margin: 0 auto; padding: 0 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
                .pb-logo { display: inline-flex; align-items: center; }
                .pb-logo-img { height: 52px; width: auto; display: block; object-fit: contain; transition: height 0.3s ease; }
                .pb-header.scrolled .pb-logo-img { height: 44px; }
                .pb-logo-img.footer { height: 64px; }
                .pb-header-right { display: flex; align-items: center; gap: 18px; }
                .pb-header-phone { display: inline-flex; align-items: center; gap: 10px; color: white !important; font-weight: 800; font-size: 15px; }
                .pb-header-phone-text { display: flex; flex-direction: column; line-height: 1.2; }
                .pb-header-phone-text small { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: rgba(255,255,255,0.5); }
                .pb-header-phone-icon { width: 38px; height: 38px; border-radius: 50%; background: rgba(232,57,29,0.15); color: var(--red); display: inline-flex; align-items: center; justify-content: center; transition: background 0.2s ease, color 0.2s ease; }
                .pb-header-phone:hover .pb-header-phone-icon { background: var(--red); color: white; }

                /* ═══ HERO ═══ */
                .pb-hero { position: relative; background: var(--ink); padding: 160px 0 0; overflow: hidden; }
                .pb-hero-glow { position: absolute; top: 38%; left: 50%; width: 1000px; height: 700px; transform: translate(-50%, -50%); border-radius: 50%; background: rgba(232,57,29,0.15); filter: blur(160px); pointer-events: none; }
                .pb-hero-dots { position: absolute; inset: 0; opacity: 0.05; background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 30px 30px; pointer-events: none; }
                .pb-hero-inner { text-align: center; }
                .pb-hero-h1 { font-weight: 900; color: white; text-transform: uppercase; line-height: 0.98; font-size: clamp(2.6rem, 5vw, 4.6rem); max-width: 980px; margin: 0 auto 24px; }
                .pb-hero-h1 .accent { color: var(--red); }
                .pb-hero-sub { color: rgba(255,255,255,0.65); line-height: 1.85; max-width: 720px; margin: 0 auto 40px; font-size: clamp(0.95rem, 1.1vw, 1.05rem); }

                /* Hero form card: offer panel + form (the form itself is styled by publishingHeroTheme) */
                .pb-hero-form { position: relative; z-index: 5; display: grid; grid-template-columns: 200px 1fr; gap: 14px; max-width: 900px; margin: 0 auto; background: white; border-radius: 18px; padding: 14px; box-shadow: 0 40px 100px rgba(0,0,0,0.5); text-align: left; }
                .pb-hero-form-offer { position: relative; background: var(--ink-2); border-radius: 12px; padding: 22px 20px; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
                .pb-hero-form-offer::after { content: ""; position: absolute; right: -40px; bottom: -40px; width: 120px; height: 120px; border-radius: 50%; border: 18px solid rgba(232,57,29,0.25); }
                .pb-hero-form-offer p { color: white; font-weight: 900; font-size: 22px; line-height: 1.05; text-transform: uppercase; }
                .pb-badge-50 { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 50%; background: var(--red); color: white; font-weight: 900; font-size: 20px; line-height: 1; margin-top: 14px; box-shadow: 0 0 0 5px rgba(232,57,29,0.25); position: relative; z-index: 1; }
                .pb-badge-50 small { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }

                .pb-shelf { position: relative; z-index: 3; display: flex; align-items: flex-end; justify-content: center; gap: 22px; height: 340px; margin-top: 56px; padding: 0 20px 24px; box-sizing: content-box; }
                .pb-shelf::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 18px; background: linear-gradient(to top, var(--ink), transparent); pointer-events: none; }
                .pb-shelf-book { flex: 0 0 auto; width: 175px; height: 262px; }
                .pb-shelf-book.b1 { width: 185px; height: 278px; margin-bottom: 40px; }
                .pb-shelf-book.b2 { width: 160px; height: 240px; }
                .pb-shelf-book.b3 { width: 138px; height: 207px; }
                .pb-shelf-book.b4 { width: 215px; height: 322px; }
                .pb-shelf-book.b5 { width: 138px; height: 207px; }
                .pb-shelf-book.b6 { width: 165px; height: 248px; }
                .pb-shelf-book.b7 { width: 185px; height: 278px; margin-bottom: 40px; }

                /* ═══ LOGO MARQUEE ═══ */
                .pb-marquee { background: white; border-bottom: 1px solid var(--line); overflow: hidden; padding: 26px 0; }
                .pb-marquee.dark { background: var(--ink-2); border: none; }
                .pb-marquee-track { display: flex; width: max-content; animation: pb-marquee 36s linear infinite; }
                .pb-marquee:hover .pb-marquee-track { animation-play-state: paused; }
                .pb-marquee-item { display: flex; align-items: center; justify-content: center; padding: 0 44px; height: 40px; border-right: 1px solid var(--line); }
                .pb-marquee.dark .pb-marquee-item { border-color: rgba(255,255,255,0.1); }
                .pb-logo-mark { height: 34px; width: auto; max-width: 160px; object-fit: contain; filter: grayscale(1); opacity: 0.75; transition: filter 0.3s ease, opacity 0.3s ease; }
                .pb-marquee-item:hover .pb-logo-mark { filter: none; opacity: 1; }
                .pb-wordmark { font-weight: 900; font-size: 20px; letter-spacing: -0.01em; color: #2b2f3a; white-space: nowrap; }
                .pb-marquee.dark .pb-wordmark { color: rgba(255,255,255,0.8); }
                .pb-marquee.dark .pb-logo-mark { filter: grayscale(1) brightness(3); }
                @keyframes pb-marquee { to { transform: translateX(-50%); } }

                /* ═══ GENRES ═══ */
                .pb-genres { padding: 120px 0; background: var(--cream); }
                .pb-genre-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
                .pb-genre-card { background: white; border: 1px solid var(--line); border-radius: 20px; padding: 32px 28px 30px; text-align: center; transition: border-color 0.3s ease, box-shadow 0.4s ease, transform 0.4s ease; }
                .pb-genre-card:hover { border-color: rgba(232,57,29,0.35); box-shadow: 0 22px 50px rgba(0,0,0,0.1); transform: translateY(-4px); }
                .pb-genre-art { position: relative; height: 290px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
                .pb-genre-ring { position: absolute; width: 240px; height: 240px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255,200,61,0.35), rgba(232,57,29,0.12)); border: 2px dashed rgba(232,57,29,0.3); transition: transform 0.8s ease; }
                .pb-genre-card:hover .pb-genre-ring { transform: rotate(40deg) scale(1.05); }
                .pb-genre-cover { position: relative; width: 180px !important; height: 270px !important; transform: rotate(-4deg); transition: transform 0.5s ease; }
                .pb-genre-card:hover .pb-genre-cover { transform: rotate(0deg) translateY(-6px); }
                .pb-genre-title { font-weight: 900; font-size: 17px; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 14px; }
                .pb-genre-list { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
                .pb-genre-list li { display: inline-flex; align-items: center; gap: 5px; font-size: 12.5px; font-weight: 600; color: #4b5563; background: var(--cream); border: 1px solid var(--line); padding: 6px 11px; border-radius: 999px; }
                .pb-genre-list li svg { color: var(--red); }

                /* ═══ CTA BAND ═══ */
                .pb-band { position: relative; background: linear-gradient(120deg, #05070f 0%, #1a0f14 45%, #8f1c0c 100%); overflow: hidden; }
                .pb-band-bg { position: absolute; inset: 0; opacity: 0.06; background-image: radial-gradient(#fff 1.5px, transparent 1.5px); background-size: 26px 26px; }
                .pb-band-inner { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 48px; align-items: center; min-height: 440px; }
                .pb-band-copy { padding: 80px 0; min-width: 0; }
                .pb-band-eyebrow { color: var(--sun); font-weight: 900; font-size: 14px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.12em; }
                .pb-band-h2 { color: white; font-weight: 900; text-transform: uppercase; line-height: 1.05; font-size: clamp(1.7rem, 3.2vw, 2.9rem); margin-bottom: 18px; overflow-wrap: break-word; }
                .pb-band-h2 .accent { color: var(--red); }
                .pb-band-text { color: rgba(255,255,255,0.65); font-size: 15px; line-height: 1.8; max-width: 560px; margin-bottom: 32px; }
                .pb-band-art { position: relative; min-width: 0; width: 100%; align-self: stretch; display: flex; align-items: center; justify-content: center; }
                .pb-band-stack { position: relative; width: min(430px, 100%); aspect-ratio: 430 / 400; height: auto; overflow: visible; }
                .pb-band-stack .pb-cover { position: absolute; width: 50%; height: 80.5%; }
                .pb-band-stack .s1 { left: 0; top: 13.75%; transform: rotate(-8deg); }
                .pb-band-stack .s2 { left: 25.12%; top: 0; z-index: 2; }
                .pb-band-stack .s3 { left: 50%; top: 16.25%; transform: rotate(8deg); }
                .pb-band-chip { position: absolute; left: 4%; bottom: 14%; z-index: 3; display: flex; align-items: center; gap: 10px; background: white; border-radius: 14px; padding: 12px 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.35); max-width: calc(100% - 16px); }
                .pb-band-chip b { color: var(--red); font-weight: 900; font-size: 30px; line-height: 1; }
                .pb-band-chip span { font-size: 11px; font-weight: 700; line-height: 1.3; color: var(--ink); text-transform: uppercase; }

                /* ═══ AWARDS ═══ */
                .pb-awards { background: white; border-bottom: 1px solid var(--line); }
                .pb-awards-inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; padding-top: 30px; padding-bottom: 30px; }
                .pb-awards-label { display: flex; align-items: center; gap: 12px; font-weight: 900; text-transform: uppercase; font-size: 16px; line-height: 1.25; max-width: 280px; }
                .pb-awards-label svg { color: var(--red); flex-shrink: 0; }
                .pb-awards-row { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; justify-content: flex-end; }
                .pb-award img { display: block; width: 84px; height: 84px; object-fit: contain; mix-blend-mode: multiply; transition: transform 0.3s ease; }
                .pb-award:hover img { transform: scale(1.08); }
                .pb-award-fallback { width: 84px; height: 84px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #b8860b; background: radial-gradient(circle at 35% 30%, #fff3c4, #f0c54a 60%, #c99624); box-shadow: inset 0 0 0 4px rgba(255,255,255,0.5), 0 6px 14px rgba(0,0,0,0.12); }

                /* ═══ PORTFOLIO ═══ */
                .pb-portfolio { padding: 120px 0; background: var(--cream); }
                .pb-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; margin-bottom: 44px; }
                .pb-tab { position: relative; background: none; border: none; font-family: inherit; font-weight: 700; font-size: 13px; color: var(--ink); padding: 10px 16px; border-radius: 999px; cursor: pointer; z-index: 0; transition: color 0.25s ease; }
                .pb-tab:hover { color: var(--red); }
                .pb-tab.active { color: white; }
                .pb-tab-pill { position: absolute; inset: 0; background: var(--red); border-radius: 999px; z-index: -1; }
                .pb-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px 24px; max-width: 1020px; margin: 0 auto; }
                .pb-gallery-item { aspect-ratio: 2/2; transition: transform 0.5s ease; }
                .pb-gallery-item:hover { transform: translateY(-8px) rotate(-1deg); }

                /* ═══ SERVICES ═══ */
                .pb-services { padding: 120px 0; background: white; }
                .pb-service-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
                .pb-service-card { display: flex; flex-direction: column; background: var(--cream); border: 1px solid var(--line); border-radius: 18px; padding: 28px 24px; transition: background 0.35s ease, border-color 0.35s ease, transform 0.35s ease; }
                .pb-service-card:hover { background: var(--ink); border-color: var(--ink); transform: translateY(-4px); }
                .pb-service-icon { width: 50px; height: 50px; border-radius: 14px; background: rgba(232,57,29,0.1); color: var(--red); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; transition: background 0.35s ease, color 0.35s ease; }
                .pb-service-card:hover .pb-service-icon { background: var(--red); color: white; }
                .pb-service-card h3 { font-weight: 900; font-size: 15px; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px; transition: color 0.35s ease; }
                .pb-service-card p { color: var(--grey); font-size: 13.5px; line-height: 1.7; flex: 1; transition: color 0.35s ease; }
                .pb-service-card:hover h3 { color: white; }
                .pb-service-card:hover p { color: rgba(255,255,255,0.6); }
                .pb-service-link { align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; margin-top: 18px; background: none; border: none; padding: 0; cursor: pointer; font-family: inherit; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--red); transition: gap 0.2s ease; }
                .pb-service-link:hover { gap: 10px; }

                /* ═══ PROCESS ═══ */
                .pb-process { padding: 120px 0; background: var(--cream); }
                .pb-process-row { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; position: relative; }
                .pb-process-row::before { content: ""; position: absolute; top: 34px; left: 6%; right: 6%; border-top: 2px dashed rgba(232,57,29,0.35); }
                .pb-process-step { position: relative; background: white; border: 1px solid var(--line); border-radius: 18px; padding: 24px 22px; transition: border-color 0.3s ease, box-shadow 0.4s ease; }
                .pb-process-step:hover { border-color: rgba(232,57,29,0.4); box-shadow: 0 18px 40px rgba(0,0,0,0.08); }
                .pb-process-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
                .pb-process-num { font-weight: 900; font-size: 34px; line-height: 1; color: var(--red); }
                .pb-process-icon { width: 40px; height: 40px; border-radius: 50%; background: var(--ink); color: white; display: flex; align-items: center; justify-content: center; }
                .pb-process-step h3 { font-weight: 900; font-size: 15px; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 10px; line-height: 1.25; }
                .pb-process-step p { color: var(--grey); font-size: 13px; line-height: 1.7; }

                /* ═══ WHY + STATS ═══ */
                .pb-why { padding: 120px 0; background: white; }
                .pb-why-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 72px; align-items: center; }
                .pb-why-list { list-style: none; padding: 0; margin: 32px 0 36px; display: flex; flex-direction: column; gap: 16px; }
                .pb-why-list li { display: flex; align-items: flex-start; gap: 14px; color: #4b5563; font-size: 15px; line-height: 1.6; }
                .pb-why-check { width: 28px; height: 28px; border-radius: 50%; background: rgba(232,57,29,0.1); color: var(--red); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .pb-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
                .pb-stat { background: var(--cream); border: 1px solid var(--line); border-radius: 20px; padding: 30px 26px; display: flex; flex-direction: column; gap: 6px; }
                .pb-stat svg { color: var(--red); margin-bottom: 10px; }
                .pb-stat b { font-weight: 900; font-size: 46px; line-height: 1; }
                .pb-stat span { color: var(--grey); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
                .pb-stat.feature { background: var(--red); border-color: var(--red); }
                .pb-stat.feature svg, .pb-stat.feature b { color: white; }
                .pb-stat.feature span { color: rgba(255,255,255,0.8); }

                /* ═══ TESTIMONIALS ═══ */
                .pb-testimonials { padding: 120px 0; background: #111; }
                .pb-tp-stars { display: inline-flex; gap: 3px; }
                .pb-tp-star { display: inline-flex; align-items: center; justify-content: center; background: #dcdce6; border-radius: 2px; }
                .pb-tp-star.on { background: #03D389; }
                .pb-tp-summary { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 14px 20px; margin: -16px auto 48px; padding: 18px 28px; max-width: 860px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; }
                .pb-tp-label { color: white; font-weight: 900; font-size: 22px; }
                .pb-tp-meta { color: rgba(255,255,255,0.65); font-size: 14px; }
                .pb-tp-meta strong { color: white; }
                .pb-tp-brand { display: inline-flex; align-items: center; gap: 6px; color: white; font-weight: 800; font-size: 18px; }
                .pb-slider { overflow: hidden; margin: 0 -12px; }
                .pb-slider-track { display: flex; transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
                .pb-slide { padding: 0 12px; }
                .pb-tp-card { height: 100%; display: flex; flex-direction: column; background: white; border-radius: 10px; padding: 26px; border: 1px solid #e5e5ec; transition: box-shadow 0.35s ease, transform 0.35s ease; }
                .pb-tp-card:hover { box-shadow: 0 18px 40px rgba(0,0,0,0.35); transform: translateY(-3px); }
                .pb-tp-head { display: flex; align-items: center; gap: 12px; padding-bottom: 16px; margin-bottom: 16px; border-bottom: 1px solid #efeff4; }
                .pb-tp-avatar { width: 42px; height: 42px; border-radius: 50%; background: rgba(232,57,29,0.12); color: #03D389; font-weight: 900; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .pb-tp-name { font-weight: 800; font-size: 15px; color: #191919; }
                .pb-tp-loc { font-size: 12px; color: #6c6c85; margin-top: 2px; }
                .pb-tp-rowline { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
                .pb-tp-verified { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #6c6c85; }
                .pb-tp-verified svg { color: #03D389; }
                .pb-tp-title { font-weight: 800; font-size: 16px; color: #191919; margin-bottom: 8px; line-height: 1.35; }
                .pb-tp-text { color: #3f3f55; font-size: 14.5px; line-height: 1.7; flex: 1; }
                .pb-tp-date { font-size: 12px; color: #6c6c85; margin-top: 18px; padding-top: 14px; border-top: 1px solid #efeff4; }
                .pb-tp-date strong { color: #191919; font-weight: 700; }
                .pb-dots { display: flex; justify-content: center; gap: 10px; margin-top: 40px; }
                .pb-dot { width: 10px; height: 10px; border-radius: 999px; border: none; background: rgba(255,255,255,0.25); cursor: pointer; transition: width 0.35s ease, background 0.35s ease; padding: 0; }
                .pb-dot.active { width: 30px; background: var(--red); }
                .pb-review-sites { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 56px; }
                .pb-review-site { display: flex; flex-direction: column; align-items: center; gap: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px 24px; min-width: 150px; }
                .pb-review-site .pb-wordmark { color: white; font-size: 18px; }
                .pb-review-site .pb-logo-mark { height: 28px; filter: grayscale(1) brightness(3); }
                .pb-review-stars { display: flex; gap: 2px; }

                /* ═══ FAQ ═══ */
                .pb-faq { padding: 120px 0; background: var(--cream); }
                .pb-faq-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 72px; align-items: start; }
                .pb-faq-intro { position: sticky; top: 120px; }
                .pb-faq-call { display: inline-flex; align-items: center; gap: 14px; margin-top: 32px; background: var(--ink); color: white !important; padding: 14px 22px 14px 14px; border-radius: 16px; transition: background 0.2s ease; }
                .pb-faq-call:hover { background: var(--red); }
                .pb-faq-call > span { width: 44px; height: 44px; border-radius: 12px; background: var(--red); display: flex; align-items: center; justify-content: center; }
                .pb-faq-call:hover > span { background: var(--ink); }
                .pb-faq-call div { display: flex; flex-direction: column; font-weight: 900; font-size: 17px; }
                .pb-faq-call small { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; opacity: 0.6; }
                .pb-faq-list { display: flex; flex-direction: column; gap: 12px; }
                .pb-faq-item { background: white; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; transition: border-color 0.3s ease; }
                .pb-faq-item.open { border-color: rgba(232,57,29,0.4); }
                .pb-faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; background: none; border: none; padding: 20px 22px; cursor: pointer; font-family: inherit; font-weight: 800; font-size: 15.5px; color: var(--ink); }
                .pb-faq-icon { width: 32px; height: 32px; border-radius: 50%; background: var(--cream); color: var(--red); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.35s ease, background 0.3s ease, color 0.3s ease; }
                .pb-faq-item.open .pb-faq-icon { transform: rotate(45deg); background: var(--red); color: white; }
                .pb-faq-a { overflow: hidden; }
                .pb-faq-a p { padding: 0 22px 22px; color: var(--grey); font-size: 14.5px; line-height: 1.75; }

                /* ═══ FOOTER ═══ (the form inside the card is styled by publishingFooterTheme) */
                .pb-footer { background: var(--ink); color: rgba(255,255,255,0.6); border-top: 4px solid var(--red); position: relative; overflow: hidden; }
                .pb-footer::before { content: ""; position: absolute; right: -200px; top: -200px; width: 600px; height: 600px; border-radius: 50%; background: rgba(232,57,29,0.12); filter: blur(120px); }
                .pb-footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; padding-top: 88px; padding-bottom: 64px; }
                .pb-footer-brand > p { margin-top: 22px; font-size: 14px; line-height: 1.8; max-width: 440px; }
                .pb-footer-contact { display: flex; flex-direction: column; gap: 16px; margin-top: 32px; }
                .pb-footer-contact a, .pb-footer-contact p { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: white; font-weight: 700; }
                .pb-footer-contact svg { color: var(--red); flex-shrink: 0; margin-top: 12px; }
                .pb-footer-contact span { display: flex; flex-direction: column; }
                .pb-footer-contact small { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: rgba(255,255,255,0.45); margin-bottom: 2px; }
                .pb-footer-contact a:hover { color: var(--red); }
                .pb-footer-card { position: relative; background: rgba(255,255,255,0.04); border: 2px solid var(--red); border-radius: 22px; padding: 40px 34px 34px; }
                .pb-badge-50.corner { position: absolute; top: -26px; right: 26px; margin: 0; }
                .pb-footer-card-h { color: white; font-weight: 900; font-size: 24px; text-transform: uppercase; line-height: 1.1; }
                .pb-footer-card-sub { margin: 6px 0 22px; font-size: 14px; }
                .pb-footer-bottom { position: relative; z-index: 2; max-width: 1240px; margin: 0 auto; padding: 24px 64px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 13px; }
                .pb-footer-bottom nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; }
                .pb-footer-bottom a:hover { color: var(--red); }

                /* ═══ POPUP (web only) ═══ (the form is styled by landingPopupTheme) */
                .pb-pop-backdrop { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 40px; background: rgba(5,7,15,0.35); backdrop-filter: blur(12px) saturate(1.1); -webkit-backdrop-filter: blur(12px) saturate(1.1); }
                .pb-pop { position: relative; display: grid; grid-template-columns: auto 330px 380px; align-items: end; max-height: calc(100vh - 80px); }
                .pb-pop-side { writing-mode: vertical-rl; transform: rotate(180deg); display: flex; flex-direction: column; gap: 4px; align-self: end; margin-right: 14px; padding-bottom: 4px; }
                .pb-pop-side span { color: white; font-size: 15px; font-weight: 500; text-shadow: 0 2px 16px rgba(0,0,0,0.6); }
                .pb-pop-side strong { color: white; font-size: 34px; font-weight: 900; line-height: 1; text-shadow: 0 4px 24px rgba(0,0,0,0.65); }
                .pb-pop-main { position: relative; z-index: 2; }
                .pb-pop-h { position: relative; color: white; font-weight: 900; font-size: 23px; line-height: 1.15; margin-bottom: 16px; width: 360px; text-shadow: 0 2px 18px rgba(0,0,0,0.6); }
                .pb-pop-h::before { content: ""; position: absolute; inset: -18px -24px -14px -24px; background: rgba(5,7,15,0.35); filter: blur(22px); border-radius: 40px; z-index: -1; }
                .pb-pop-h span { display: block; font-weight: 400; font-size: 21px; margin-top: 6px; }
                .pb-pop-art { position: relative; height: 460px; margin-left: -60px; align-self: center; z-index: 1; }
                .pb-pop-panel { position: absolute; top: -40px; right: 0; width: 200px; height: 200px; border-radius: 4px; background: var(--ink); border: 1px solid rgba(232,57,29,0.35); background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 18px 18px; box-shadow: 0 30px 70px rgba(0,0,0,0.35); }
                .pb-pop-close { position: absolute; top: 6px; right: 6px; width: 34px; height: 34px; border-radius: 50%; border: none; cursor: pointer; background: transparent; color: white; display: flex; align-items: center; justify-content: center; transition: background 0.2s ease; }
                .pb-pop-close:hover { background: var(--red); }
                .pb-pop-collage { position: absolute; inset: 0; z-index: 2; }
                .pb-pop-book { position: absolute; width: 180px; height: 240px; transform-origin: bottom center; }
                .pb-pop-book.b1 { left: 72px; bottom: 80px; z-index: 1; }
                .pb-pop-book.b2 { left: 158px; bottom: 26px; width: 200px; height: 300px; z-index: 3; }
                .pb-pop-book.b3 { left: 268px; bottom: 90px; z-index: 2; }
                .pb-pop-book .pb-cover { filter: drop-shadow(0 24px 30px rgba(0,0,0,0.55)); }
                @media (max-height: 640px) {
                    .pb-pop-art { height: 380px; }
                    .pb-pop-panel { height: 200px; }
                    .pb-pop-book { width: 135px; height: 202px; }
                    .pb-pop-book.b2 { left: 150px; width: 165px; height: 247px; }
                    .pb-pop-book.b3 { left: 258px; }
                }
                @media (max-width: 1023px) { .pb-pop-backdrop { display: none; } }

                /* ══════════════════════════════════════════
                   1800px+ — Full HD / 4K
                ══════════════════════════════════════════ */
                @media (min-width: 1800px) {
                    .pb-inner { max-width: 1640px; padding: 0 120px; }
                    .pb-header-inner { max-width: 1760px; }
                    .pb-footer-bottom { max-width: 1640px; padding-left: 120px; padding-right: 120px; }
                    .pb-hero { padding-top: 200px; }
                    .pb-hero-h1 { font-size: clamp(4.4rem, 4.4vw, 6.6rem); max-width: 1300px; }
                    .pb-hero-sub { font-size: 1.2rem; max-width: 900px; }
                    .pb-hero-form { max-width: 1100px; }
                    .pb-shelf { height: 340px; gap: 26px; }
                    .pb-shelf-book { zoom: 1.2; }
                    .pb-genres, .pb-portfolio, .pb-services, .pb-process, .pb-why, .pb-testimonials, .pb-faq { padding: 160px 0; }
                    .pb-h2 { font-size: clamp(3rem, 3.2vw, 4.4rem); }
                    .pb-sub, .pb-band-text, .pb-why-list li, .pb-tp-text, .pb-faq-a p { font-size: 17px; }
                    .pb-btn { font-size: 13px; padding: 18px 30px; }
                    .pb-gallery { max-width: 1300px; }
                    .pb-award img, .pb-award-fallback { width: 100px; height: 100px; }
                    .pb-pop { grid-template-columns: auto 400px 460px; }
                    .pb-pop-h { width: 440px; font-size: 28px; }
                    .pb-pop-art { height: 560px; }
                    .pb-pop-panel { width: 350px; height: 490px; }
                    .pb-pop-book { width: 195px; height: 292px; }
                    .pb-pop-book.b1 { left: 76px; }
                    .pb-pop-book.b2 { left: 180px; width: 245px; height: 367px; }
                    .pb-pop-book.b3 { left: 318px; }
                }

                /* ══════════════════════════════════════════
                   ≤1200px — Laptop
                ══════════════════════════════════════════ */
                @media (max-width: 1200px) {
                    .pb-shelf-book.b1, .pb-shelf-book.b7 { display: none; }
                    .pb-service-grid { grid-template-columns: repeat(2, 1fr); }
                    .pb-process-row { grid-template-columns: repeat(3, 1fr); }
                    .pb-process-row::before { display: none; }
                    .pb-awards-inner { flex-direction: column; text-align: center; }
                    .pb-awards-label { max-width: none; }
                    .pb-awards-row { justify-content: center; }
                }

                /* ══════════════════════════════════════════
                   ≤1024px — Small Laptop / Tablet landscape
                ══════════════════════════════════════════ */
                @media (max-width: 1024px) {
                    .pb-inner { padding: 0 40px; }
                    .pb-footer-bottom { padding: 24px 40px; }
                    .pb-hero-form { grid-template-columns: 1fr; }
                    .pb-hero-form-offer { flex-direction: row; align-items: center; justify-content: space-between; }
                    .pb-hero-form-offer p br { display: none; }
                    .pb-badge-50 { margin-top: 0; }
                    .pb-genre-grid { grid-template-columns: repeat(2, 1fr); }
                    .pb-band-inner { grid-template-columns: 1fr; text-align: center; min-height: 0; gap: 12px; }
                    .pb-band-copy { padding: 64px 0 8px; }
                    .pb-band-text { margin-left: auto; margin-right: auto; }
                    .pb-band-copy .pb-actions { flex-direction: column; align-items: stretch; justify-content: center; width: 100%; max-width: 420px; margin: 0 auto; }
                    .pb-band-copy .pb-actions .pb-btn { width: 100%; white-space: normal; }
                    .pb-band-art { padding: 0 12px 48px; max-width: 430px; margin: 0 auto; }
                    .pb-why-grid, .pb-faq-grid, .pb-footer-grid { grid-template-columns: 1fr; gap: 48px; }
                    .pb-faq-intro { position: static; }
                }

                /* ══════════════════════════════════════════
                   ≤900px — Tablet
                ══════════════════════════════════════════ */
                @media (max-width: 900px) {
                    .pb-hero { padding-top: 140px; }
                    .pb-shelf { height: 260px; gap: 14px; margin-top: 44px; }
                    .pb-shelf-book { width: 130px !important; height: 195px !important; }
                    .pb-shelf-book.b4 { width: 155px !important; height: 232px !important; }
                    .pb-shelf-book.b3, .pb-shelf-book.b5 { display: none; }
                    .pb-genres, .pb-portfolio, .pb-services, .pb-process, .pb-why, .pb-testimonials, .pb-faq { padding: 88px 0; }
                    .pb-gallery { gap: 28px 32px; }
                    .pb-process-row { grid-template-columns: repeat(2, 1fr); }
                    .pb-marquee-item { padding: 0 30px; }
                }

                /* ══════════════════════════════════════════
                   ≤640px — Mobile
                ══════════════════════════════════════════ */
                @media (max-width: 640px) {
                    .pb-inner, .pb-header-inner { padding: 0 20px; }
                    .pb-header-phone-text { display: none; }
                    .pb-header-right { gap: 10px; }
                    .pb-logo-img { height: 42px; }
                    .pb-hero { padding-top: 120px; }
                    .pb-hero-h1 { font-size: clamp(2rem, 9vw, 2.7rem); }
                    .pb-hero-sub { font-size: 0.9rem; margin-bottom: 30px; }
                    .pb-hero-form { padding: 12px; }
                    .pb-hero-form-offer p { font-size: 18px; }
                    .pb-shelf { height: 200px; gap: 10px; }
                    .pb-shelf-book { width: 100px !important; height: 150px !important; }
                    .pb-shelf-book.b4 { width: 120px !important; height: 180px !important; }
                    .pb-h2 { font-size: clamp(1.6rem, 7vw, 2.2rem); }
                    .pb-section-head { margin-bottom: 36px; }
                    .pb-genres, .pb-portfolio, .pb-services, .pb-process, .pb-why, .pb-testimonials, .pb-faq { padding: 64px 0; }
                    .pb-genre-grid, .pb-service-grid, .pb-process-row { grid-template-columns: 1fr; }
                    .pb-actions { flex-direction: column; align-items: stretch; width: 100%; }
                    .pb-actions .pb-btn { width: 100%; white-space: normal; padding: 14px 16px; letter-spacing: 0.06em; }
                    .pb-band-copy { padding: 48px 0 4px; }
                    .pb-band-h2 { font-size: clamp(1.5rem, 7.2vw, 2.15rem); }
                    .pb-band-eyebrow { font-size: 12px; letter-spacing: 0.1em; }
                    .pb-band-text { font-size: 14px; margin-bottom: 24px; }
                    .pb-band-art { padding-bottom: 40px; }
                    .pb-band-stack { width: min(300px, 90%); }
                    .pb-band-chip { padding: 8px 12px; gap: 8px; left: 2%; bottom: 8%; border-radius: 12px; }
                    .pb-band-chip b { font-size: 22px; }
                    .pb-band-chip span { font-size: 9px; }
                    .pb-tabs { flex-wrap: nowrap; overflow-x: auto; justify-content: flex-start; margin: 0 -20px 32px; padding: 0 20px 6px; scrollbar-width: none; }
                    .pb-tabs::-webkit-scrollbar { display: none; }
                    .pb-tab { white-space: nowrap; flex-shrink: 0; }
                    .pb-gallery { grid-template-columns: repeat(2, 1fr); gap: 20px; }
                    .pb-awards-row { gap: 14px; }
                    .pb-award img, .pb-award-fallback { width: 60px; height: 60px; }
                    .pb-stat { padding: 22px 18px; }
                    .pb-stat b { font-size: 34px; }
                    .pb-tp-card { padding: 20px; }
                    .pb-tp-summary { padding: 16px; margin-bottom: 32px; }
                    .pb-review-site { min-width: 0; flex: 1 1 40%; padding: 14px; }
                    .pb-faq-q { padding: 16px 18px; font-size: 14.5px; }
                    .pb-faq-a p { padding: 0 18px 18px; }
                    .pb-footer-grid { padding-top: 64px; }
                    .pb-footer-card { padding: 36px 20px 24px; }
                    .pb-footer-bottom { padding: 20px; flex-direction: column; text-align: center; align-items: center; }
                }

                @media (max-width: 380px) {
                    .pb-inner, .pb-header-inner { padding: 0 14px; }
                    .pb-hero-h1 { font-size: 1.75rem; }
                    .pb-h2 { font-size: 1.45rem; }
                    .pb-logo-img { height: 36px; }
                    .pb-gallery { gap: 14px; }
                    .pb-award img, .pb-award-fallback { width: 52px; height: 52px; }
                    .pb-band-copy { padding-top: 40px; }
                    .pb-band-chip { padding: 6px 10px; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .pb-marquee-track { animation: none; }
                    .pb-main *, .pb-main *::before, .pb-main *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
                }
                                                            /* ── Mobile ticker ── */
.cb-ticker {
    overflow: hidden;
    background: #e8391d;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1;
    padding: 8px 0;
    white-space: nowrap;
    
}
.cb-ticker-track {
    display: flex;
    width: max-content;
    animation: cb-ticker-scroll 28s linear infinite;
}
.cb-ticker:hover .cb-ticker-track { animation-play-state: paused; }
.cb-ticker-group { display: flex; }
.cb-ticker-item { display: inline-flex; align-items: center; }
.cb-ticker-sep { margin: 0 18px; }

@keyframes cb-ticker-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
}

/* Hide on tablet and desktop */
@media (min-width: 768px) {
    .cb-ticker { display: none; }
}

/* No scrolling for visitors who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
    .cb-ticker-track { animation: none; }
    .cb-ticker { text-align: center; white-space: normal; padding: 8px 16px; line-height: 1.4; }
    .cb-ticker-track { width: auto; justify-content: center; }
    .cb-ticker-group:not(:first-child),
    .cb-ticker-item:not(:first-child),
    .cb-ticker-sep { display: none; }
}
            `}</style>

            <main id="top" className="pb-main">
                <Header />
                <Hero />
                <Marquee items={retailers} label="Platforms we publish on" />
                <Genres />
                <CtaBand
                    eyebrow="Bring your story to life"
                    title={<>Professional Self-Publishing <span className="accent">Book Publishing Services</span></>}
                    text="From editing and design to formatting, distribution, and marketing, our team provides everything you need to prepare your manuscript for readers with confidence."
                    covers={[14, 15, 16]}
                    badge
                />
                
                <Portfolio />
                <Services />
                <CtaBand
                    eyebrow="Your story deserves readers"
                    title={<>Start Your Publishing <span className="accent">Journey Today!</span></>}
                    text="Get expert support from manuscript preparation to worldwide distribution. Our team helps you move forward with a clear process, professional guidance, and complete creative control."
                    covers={[17, 18, 19]}
                />
                <Marquee items={[...retailers].reverse()} dark label="Distribution partners" />
                <Process />
                <WhyUs />
                <Testimonials />
                <Faq />
                <Footer />
                <CallBar />
                <GetStartedPopup variant="halloween" />
            </main>
        </>
    );
}