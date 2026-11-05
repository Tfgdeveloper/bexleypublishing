"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Fredoka, Nunito } from "next/font/google";
import {
    ArrowRight, Phone, Mail, MapPin, Send, X, Check, MessageCircle, Star,
    SpellCheck, Palette, Handshake, BookOpen, Megaphone, ShieldCheck, RefreshCw, FileCheck, UserCheck,
    Printer, Globe, PenTool, ImageIcon,
} from "lucide-react";
import ContactForm from "@/components/Contact-form";
import { landingHeroTheme } from "@/components/contactFormThemes";
import { Button } from "@/components/ui/button";

/* ══════════════════════════════════════════════════════════════
   FONTS: Fredoka for headings, Nunito for body (max weight 600)
══════════════════════════════════════════════════════════════ */
const fontDisplay = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-kh-display", display: "swap" });
const fontBody = Nunito({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-kh-body", display: "swap" });
const DISPLAY = "[font-family:var(--font-kh-display,'Fredoka'),'Fredoka',sans-serif]";

/* ══════════════════════════════════════════════════════════════
   EDIT THESE: contact details and image paths
══════════════════════════════════════════════════════════════ */
const BRAND = {
    name: "Bexley Publishing",
    phone: "(279) 777-0380",
    phoneHref: "tel:2797770380",
    email: "info@bexleypublishing.com",
    headOffice: "2390 Fruitridge Rd, Sacramento, CA 95822",
};

const IMG = {
    headerLogo: "/images/page/Bexley-Publishing-03.png",
    footerLogo: "/images/page/Bexley-Publishing-03.png",
    heroBg: "/images/page/kids-hero-bg.jpg",
    heroArt: "/images/page/11.png",
    mission: "/images/page/e-bok-inner-img.png",
    contactArt: "/images/page/child-banner-vec-img3.png",
    popup: "/images/page/popup-new-side-img.png",
};

/* Portfolio tabs: `folder` matches your image names /images/children/portfolio/<folder>-1.jpg … -8.jpg */
const PORTFOLIO_TABS = [
    { label: "Picture Books", folder: "children" },
    { label: "Book Covers", folder: "book-covers" },
    { label: "Storybook Art", folder: "book-illustration" },
    { label: "Animal Stories", folder: "animals" },
    { label: "Fantasy", folder: "fantasy" },
];
const pf = (folder: string, n: number) => `/images/children/portfolio/${folder}-${n}.jpg`;

/* Retailer logos: /images/publishing/platforms/<slug>.png (the name shows as text until the logo exists) */
const RETAILERS = [
    { name: "Amazon", slug: "amazon" },
    { name: "Barnes & Noble", slug: "barnes-and-noble" },
    { name: "Apple Books", slug: "apple-books" },
    { name: "IngramSpark", slug: "ingramspark" },
    { name: "Lulu", slug: "lulu" },
];

const LEGAL_LINKS = [
    { label: "Terms & Conditions", href: "/terms-of-use" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
];

const POPUP_MIN_WIDTH = 1024; // matches Tailwind's `lg` breakpoint used on the popup
const POPUP_EVENT = "kh:open-popup";
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ══════════════════════════════════════════════════════════════
   ACTIONS
══════════════════════════════════════════════════════════════ */
function openLiveChat() {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (w.LiveChatWidget) { w.LiveChatWidget.call("maximize"); return; }
    const lc = w.LC_API;
    if (lc && typeof lc.open_chat_window === "function") { lc.open_chat_window(); return; }
    const selectors = ["#chat-widget-container button", "[id^='chat-widget']", "iframe[title*='chat' i]"];
    for (const sel of selectors) {
        const el = document.querySelector<HTMLElement>(sel);
        if (el) { el.click(); return; }
    }
}

function scrollToForm() {
    document.getElementById("kh-contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function getStarted() {
    if (typeof window === "undefined") return;
    if (window.matchMedia(`(min-width: ${POPUP_MIN_WIDTH}px)`).matches) window.dispatchEvent(new Event(POPUP_EVENT));
    else scrollToForm();
}

/* ══════════════════════════════════════════════════════════════
   DESIGN TOKENS (Tailwind class strings)
   Palette: brand red + ink + cream/white. Yellow and blue only as small accents.
══════════════════════════════════════════════════════════════ */
const HEX = { red: "#e8391d", ink: "#05070f", cream: "#faf9f7", sun: "#ffc83d", sky: "#4fb3ff", white: "#ffffff" };

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

const INNER = "relative z-[2] mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16 min-[1800px]:max-w-[1560px] min-[1800px]:px-[120px]";
const H2 = cx(DISPLAY, "m-0 font-semibold leading-[1.15] tracking-[-0.01em] text-[clamp(1.75rem,6.4vw,2.2rem)] sm:text-[clamp(2rem,3.2vw,2.75rem)] min-[1800px]:text-[clamp(2.8rem,3vw,3.6rem)]");
const BODY = "mt-4 max-w-[60ch] text-base leading-[1.75] text-[#4a5160] sm:text-[17px] min-[1800px]:text-lg";
const SOFT = "shadow-[0_10px_30px_rgba(5,7,15,0.07)]";
const SOFT_HOVER = "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(5,7,15,0.11)]";

/* Buttons: fully rounded, no borders, soft shadow */
const BTN_BASE = "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-0 font-semibold transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-wait disabled:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc83d]";
const BTN_SIZE = {
    md: "px-7 py-3.5 text-[15px] min-[1800px]:px-8 min-[1800px]:py-4 min-[1800px]:text-base",
    sm: "px-4 py-2 text-[13px] min-[381px]:px-5 min-[381px]:py-2.5 min-[381px]:text-sm",
};
const BTN_COLOR = {
    red: "bg-[#e8391d] text-white shadow-[0_8px_22px_rgba(232,57,29,0.3)] hover:bg-[#d42f14] hover:shadow-[0_12px_28px_rgba(232,57,29,0.38)]",
    white: "bg-white text-[#05070f] shadow-[0_8px_22px_rgba(5,7,15,0.12)] hover:shadow-[0_12px_28px_rgba(5,7,15,0.18)]",
    glass: "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
};
function btn(color: keyof typeof BTN_COLOR, opts: { size?: keyof typeof BTN_SIZE; extra?: string } = {}) {
    const { size = "md", extra = "" } = opts;
    return cx(BTN_BASE, BTN_SIZE[size], BTN_COLOR[color], extra);
}

/* ══════════════════════════════════════════════════════════════
   IMAGES WITH FALLBACK
══════════════════════════════════════════════════════════════ */
function useImgFallback() {
    const ref = useRef<HTMLImageElement>(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        const img = ref.current;
        if (img && img.complete && img.naturalWidth === 0) setFailed(true);
    }, []);
    return { ref, failed, onError: () => setFailed(true) };
}

function Img({ src, alt, className = "", hideOnFail = false }: { src: string; alt: string; className?: string; hideOnFail?: boolean }) {
    const { ref, failed, onError } = useImgFallback();
    if (failed) {
        if (hideOnFail) return null;
        return (
            <div role="img" aria-label={alt} className="flex h-full min-h-[140px] w-full items-center justify-center bg-[#f1eee8] text-[#e8391d]/50">
                <ImageIcon size={26} />
            </div>
        );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img ref={ref} src={src} alt={alt} className={className} loading="lazy" onError={onError} />;
}

function LogoMark({ src, name }: { src: string; name: string }) {
    const { ref, failed, onError } = useImgFallback();
    if (failed) return <span className={cx(DISPLAY, "text-center text-base font-medium leading-tight text-[#05070f] sm:text-lg")}>{name}</span>;
    // eslint-disable-next-line @next/next/no-img-element
    return <img ref={ref} src={src} alt={name} className="max-h-10 max-w-full object-contain" loading="lazy" onError={onError} />;
}

/* ══════════════════════════════════════════════════════════════
   CONTENT
══════════════════════════════════════════════════════════════ */
const services = [
    { icon: SpellCheck, title: "Children's Book Manuscript", desc: "We edit your story for your reader's age, from read-aloud rhythm in picture books to pacing in chapter books." },
    { icon: Palette, title: "Book Illustration", desc: "Our illustrators sketch your characters first, then paint every page in the art style that suits your story." },
    { icon: Handshake, title: "Publishing Consultation", desc: "Advice on format, page count, ISBN, copyright, and pricing before you spend anything on production." },
    { icon: BookOpen, title: "Book Cover Design", desc: "A front cover, back cover, and spine that stand out as a thumbnail online and on a bookstore shelf." },
    { icon: Megaphone, title: "Marketing & Promotion", desc: "An Amazon book page, author bio, and launch plan aimed at parents, teachers, and librarians." },
    { icon: Megaphone, title: "Marketing & Promotion", desc: "An Amazon book page, author bio, and launch plan aimed at parents, teachers, and librarians." },
];

const promises = [
    { icon: ShieldCheck, title: "You keep 100% of your royalties" },
    { icon: RefreshCw, title: "Revisions at every sketch stage" },
    { icon: FileCheck, title: "Print-ready files you own" },
    { icon: UserCheck, title: "One project manager start to finish" },
];

/* Replace with real reviews from your clients before going live */
const testimonials = [
    { name: "Priya Nair", title: "Exactly what I imagined", quote: "From the first sketch to the final artwork, the team understood exactly what I wanted. The characters felt expressive and every revision was handled with care." },
    { name: "Olivia Morgan", title: "Perfect for my children's book", quote: "I wanted something playful, warm, and colorful, and that is exactly what I received. The illustrations fit the tone of my story beautifully." },
    { name: "Samantha Thornhill", title: "Smooth and stress-free process", quote: "I was unsure about the process at first, but everything was explained clearly. The sketches arrived quickly and the final pages looked wonderful." },
    { name: "Rachel Bennett", title: "Wonderful attention to detail", quote: "Every little detail mattered to me, especially the facial expressions and backgrounds. The illustrator listened carefully throughout the project." },
    { name: "Jennifer Collins", title: "They really listened to my ideas", quote: "I had a very specific vision for my characters, and the team took the time to understand it. The final result stayed true to my original concept." },
    { name: "Ethan Brooks", title: "Great creative collaboration", quote: "The team brought fresh ideas while still respecting the direction of my manuscript, and improved the scenes without changing the personality of the story." },
];

/* Rating strip: only set `verified: true` once you have a real, verifiable Trustpilot score.
   While it's false, the strip shows "Client Feedback" instead of a rating and review count. */
const TRUST = { verified: false, label: "Excellent", score: "4.9", reviews: "300+" };

/* Trustpilot-style square star blocks */
function TrustStars({ rating = 5, size = 20 }: { rating?: number; size?: number }) {
    return (
        <div className="inline-flex gap-[3px]" aria-label={`Rated ${rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={cx("inline-flex items-center justify-center rounded-[3px]", i < rating ? "bg-[#03D389]" : "bg-[#dcdce6]")} style={{ width: size, height: size }}>
                    <Star size={Math.round(size * 0.62)} fill="white" stroke="white" />
                </span>
            ))}
        </div>
    );
}

const footerBadges = [
    { icon: PenTool, label: "Editing" },
    { icon: Palette, label: "Illustration" },
    { icon: Printer, label: "Printing" },
    { icon: Globe, label: "Distribution" },
];

/* ══════════════════════════════════════════════════════════════
   DECORATIONS (no outlines, gentle float, off for reduced motion)
══════════════════════════════════════════════════════════════ */
function Deco({ className = "", float = true, slow = false, delay = 0, children }: { className?: string; float?: boolean; slow?: boolean; delay?: number; children: ReactNode }) {
    const reduce = useReducedMotion();
    const anim = float && !reduce;
    return (
        <motion.div
            aria-hidden="true"
            className={cx("pointer-events-none absolute z-[1]", className)}
            animate={anim ? { y: [0, -10], rotate: [0, 6] } : undefined}
            transition={anim ? { duration: slow ? 8 : 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay } : undefined}
        >
            {children}
        </motion.div>
    );
}

type DecoProps = { color?: string; size?: number; className?: string; float?: boolean; delay?: number };

function DStar({ color = HEX.sun, size = 30, className = "", float = true, delay = 0 }: DecoProps) {
    return (
        <Deco className={className} float={float} delay={delay}>
            <svg width={size} height={size} viewBox="0 0 24 24"><polygon points="12 1.8 15 8.6 22.2 9.3 16.7 14.1 18.4 21.2 12 17.4 5.6 21.2 7.3 14.1 1.8 9.3 9 8.6" fill={color} strokeLinejoin="round" /></svg>
        </Deco>
    );
}
function DHeart({ color = HEX.red, size = 28, className = "", float = true, delay = 0 }: DecoProps) {
    return (
        <Deco className={className} float={float} delay={delay}>
            <svg width={size} height={size} viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 4.3 2.6.7-1.3 2.1-2.6 4.3-2.6 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill={color} /></svg>
        </Deco>
    );
}
function DSparkle({ color = HEX.white, size = 22, className = "", float = true, delay = 0 }: DecoProps) {
    return (
        <Deco className={className} float={float} delay={delay}>
            <svg width={size} height={size} viewBox="0 0 24 24"><path d="M12 1 C13 8 16 11 23 12 C16 13 13 16 12 23 C11 16 8 13 1 12 C8 11 11 8 12 1 Z" fill={color} /></svg>
        </Deco>
    );
}
function DPlane({ className = "" }: { className?: string }) {
    return (
        <Deco className={className} float={false}>
            <svg viewBox="0 0 220 120" className="block h-auto w-full">
                <path d="M6 108 C 40 70, 70 120, 100 84 S 150 40, 170 46" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 8" strokeLinecap="round" />
                <path d="M168 20 L214 4 L196 52 L184 38 Z" fill={HEX.white} />
                <path d="M184 38 L214 4 L176 34 Z" fill="#cfd5df" />
            </svg>
        </Deco>
    );
}
function DSquiggle({ color = HEX.sun, className = "" }: { color?: string; className?: string }) {
    return (
        <svg aria-hidden="true" className={className} width="110" height="20" viewBox="0 0 110 20">
            <path d="M3 10 Q 12 1 21 10 T 39 10 T 57 10 T 75 10 T 93 10 T 107 10" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
        </svg>
    );
}

/* ══════════════════════════════════════════════════════════════
   SHARED PIECES
══════════════════════════════════════════════════════════════ */
function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
    return (
        <span className={cx(
            "mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold",
            dark ? "bg-white/10 text-white backdrop-blur-sm" : "bg-[#fdecea] text-[#c42a12]",
        )}>
            <Star size={13} fill="currentColor" className={dark ? "text-[#ffc83d]" : "text-[#e8391d]"} /> {children}
        </span>
    );
}

function Head({ tag, title, accent, sub }: { tag: string; title: string; accent: string; sub?: string }) {
    return (
        <div className="mx-auto mb-10 max-w-[720px] text-center sm:mb-14">
            <Tag>{tag}</Tag>
            <h2 className={cx(H2, "text-[#05070f]")}>{title} <span className="text-[#e8391d]">{accent}</span></h2>
            {sub && <p className="mx-auto mt-4 max-w-[56ch] text-base leading-[1.75] text-[#4a5160] sm:text-[17px]">{sub}</p>}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   HEADER
══════════════════════════════════════════════════════════════ */
function Header() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <header className={cx(
            "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
            scrolled ? "bg-[#05070f]/90 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md" : "py-4",
        )}>
            <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-5 px-4 sm:px-10 min-[1800px]:max-w-[1760px]">
                <a href="#top" aria-label={`${BRAND.name}, back to top`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG.headerLogo} alt={BRAND.name} className="block h-10 w-auto sm:h-[52px]" />
                </a>
                <div className="flex items-center gap-3 sm:gap-5">
                    <a href={BRAND.phoneHref} className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-white">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#ffc83d]"><Phone size={16} /></span>
                        <span className="hidden flex-col leading-[1.2] sm:flex">
                            <small className="text-[11px] font-medium text-white/60">Call us</small>{BRAND.phone}
                        </span>
                    </a>
                    <button type="button" className={btn("red", { size: "sm" })} onClick={getStarted}>Get Started</button>
                </div>
            </div>
        </header>
    );
}

/* ══════════════════════════════════════════════════════════════
   HERO (background image + form inside the circle)
══════════════════════════════════════════════════════════════ */
function Hero() {
    const orbit: { icon: typeof Palette; pos: string; cls: string; delay: number }[] = [
        { icon: Palette, pos: "left-[3%] top-[8%]", cls: "bg-[#ffc83d] text-[#05070f]", delay: 0 },
        { icon: PenTool, pos: "right-[-1%] top-[46%]", cls: "bg-white text-[#e8391d]", delay: 1.5 },
        { icon: BookOpen, pos: "bottom-[8%] left-[5%]", cls: "bg-[#4fb3ff] text-white", delay: 3 },
    ];
    const perks = ["Custom illustrations", "Paperback, hardcover and board books", "100% of your royalties"];
    const reduce = useReducedMotion();
    return (
        /* The background image is the only inline style: Tailwind can't read a path stored in a variable */
        <section
            className="relative overflow-hidden bg-[#05070f] bg-cover bg-center pb-20 pt-[116px] sm:pb-24 sm:pt-[130px] min-[900px]:pb-28 min-[900px]:pt-40 min-[1800px]:pb-36 min-[1800px]:pt-[200px]"
            style={{ backgroundImage: `url('${IMG.heroBg}')` }}
        >
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,15,0.9)_0%,rgba(5,7,15,0.82)_60%,rgba(5,7,15,0.75)_100%)] min-[1200px]:bg-[linear-gradient(90deg,rgba(5,7,15,0.93)_0%,rgba(5,7,15,0.8)_45%,rgba(5,7,15,0.35)_100%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-[-10%] top-[10%] h-4/5 w-3/5 bg-[radial-gradient(closest-side,rgba(232,57,29,0.22),transparent)]" />

            <DStar className="left-[46%] top-[130px] hidden min-[1200px]:block" size={30} />
            <DHeart className="bottom-[120px] left-[4%]" size={26} delay={1} />
            <DSparkle className="left-[3%] top-[22%]" size={24} delay={2} />
            <DSparkle className="left-[48%] top-[62%] hidden min-[1200px]:block" size={16} color={HEX.sun} delay={0.5} />
            <DStar className="right-[6%] top-[120px]" size={20} color={HEX.sky} delay={1.5} />
            <DPlane className="left-[36%] top-[96px] hidden w-[190px] text-white/50 min-[1200px]:block" />

            <div className={cx(INNER, "grid grid-cols-1 items-center gap-12 min-[1200px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] min-[1200px]:gap-10")}>
                <motion.div className="text-center min-[1200px]:text-left" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
                    <Tag dark>Bringing stories to life</Tag>
                    <h1 className={cx(DISPLAY, "m-0 font-semibold leading-[1.08] tracking-[-0.015em] text-white text-[clamp(2.2rem,8.4vw,2.8rem)] sm:text-[clamp(2.6rem,4.2vw,3.7rem)] min-[1800px]:text-[clamp(3.8rem,3.8vw,5rem)]")}>
                        We edit, illustrate, and <span className="text-[#ff6a4d]">publish your children's book</span>
                    </h1>
                    <DSquiggle className="relative mx-auto mt-4 block min-[1200px]:mx-0" />
                    <p className="mx-auto mt-5 max-w-[54ch] text-base leading-[1.75] text-white/80 sm:text-[17px] min-[1200px]:mx-0 min-[1800px]:text-lg">
                        Bexley Publishing turns your manuscript, or even a rough idea, into a finished picture book or chapter book.
                        We handle the editing, illustration, cover, printing, and listing on Amazon and IngramSpark, and you keep your rights and royalties.
                    </p>
                    <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap  min-[1200px]:justify-start">
                        <button type="button" className={btn("red")} onClick={getStarted}>Start Your Story <ArrowRight size={16} /></button>
                        <button type="button" className={btn("glass")} onClick={openLiveChat}><MessageCircle size={17} /> Live Chat</button>
                    </div>
                    <ul className="m-0 mt-8 flex list-none flex-wrap justify-center gap-x-6 gap-y-3 p-0 min-[1200px]:justify-start">
                        {perks.map((label) => (
                            <li key={label} className="inline-flex items-center gap-2 text-[15px] font-medium text-white/90">
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ffc83d] text-[#05070f]"><Check size={12} strokeWidth={3} /></span>
                                {label}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className="relative flex w-full items-center justify-center justify-self-center px-3.5 py-[26px] sm:aspect-square sm:max-w-[600px] sm:p-0 min-[1200px]:max-w-[620px] min-[1800px]:max-w-[700px]"
                    initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease }}
                >
                    {/* Red disc (rounded panel on phones) + dashed ring */}
                    <span aria-hidden="true" className="absolute inset-0 rounded-[32px] bg-[#e8391d] shadow-[0_30px_80px_rgba(232,57,29,0.35)] sm:inset-[5%] sm:rounded-full" />
                    <span aria-hidden="true" className="absolute inset-0 hidden animate-[spin_60s_linear_infinite] rounded-full border-2 border-dashed border-[#ffc83d]/60 motion-reduce:animate-none sm:block" />

                    {/* Your form, centred inside the circle.
                        If your form theme already draws its own card, remove bg-white / padding / shadow here. */}
                    <div className="relative z-[3] w-full rounded-3xl bg-white px-4 py-5 shadow-[0_24px_60px_rgba(5,7,15,0.3)] sm:w-[62%] sm:px-6 sm:py-6">
                        <ContactForm
                            theme={landingHeroTheme}
                            formLocation="Publishing Landing - Hero"
                            placeholders={{ name: "Full Name *", email: "Email Address *", phone: "Phone Number *", message: "Tell us about your project." }}
                            labels={{ name: "Full Name", email: "Email Address", phone: "Phone Number", message: "Tell us about your project." }}
                            submitLabel={<>Talk To An Expert <Send size={15} /></>}
                        />
                    </div>

                    {orbit.map(({ icon: Icon, pos, cls, delay }) => (
                        <motion.span
                            key={pos} aria-hidden="true"
                            className={cx("absolute z-[3] hidden h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_28px_rgba(0,0,0,0.3)] sm:flex", pos, cls)}
                            animate={reduce ? undefined : { y: [0, -10] }}
                            transition={reduce ? undefined : { duration: 4.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay }}
                        >
                            <Icon size={22} />
                        </motion.span>
                    ))}
                    <motion.div
                        aria-hidden="true"
                        className={cx(DISPLAY, "absolute -right-1.5 -top-[30px] z-[4] flex h-[92px] w-[92px] flex-col items-center justify-center rounded-full bg-[#ffc83d] text-center leading-[1.05] text-[#05070f] shadow-[0_14px_30px_rgba(0,0,0,0.3)] sm:right-0 sm:top-0 sm:h-[112px] sm:w-[112px]")}
                        initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: -10 }}
                        transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 220, damping: 14 }}
                    >
                        <b className="text-lg font-semibold sm:text-[22px]">Up to 50%</b>
                        <span className="text-[0.72rem] font-medium sm:text-[0.82rem]">off this month</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   RETAILER LOGO CAROUSEL (endless slide, still for reduced motion)
══════════════════════════════════════════════════════════════ */
function LogoCarousel({ title = true }: { title?: boolean }) {
    const reduce = useReducedMotion();
    /* Two identical halves: the track slides left by exactly one half, then repeats seamlessly */
    const half = [...RETAILERS, ...RETAILERS];
    const track = [...half, ...half];
    const card = "flex h-[72px] w-[200px] shrink-0 items-center justify-center rounded-2xl bg-white px-6 shadow-[0_6px_18px_rgba(5,7,15,0.08)] sm:h-20 sm:w-[250px]";
    return (
        <section aria-label="Where your book will be sold" className="bg-white py-12 sm:py-14">
            
            <div className="mx-auto max-w-[1440px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
                {reduce ? (
                    <ul className="m-0 flex list-none flex-wrap justify-center gap-5 p-0 px-5">
                        {RETAILERS.map((r) => (
                            <li key={r.slug} className={card}><LogoMark src={`/images/publishing/platforms/${r.slug}.png`} name={r.name} /></li>
                        ))}
                    </ul>
                ) : (
                    <motion.ul
                        className="m-0 flex w-max list-none gap-5 p-0 py-3 sm:gap-7"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {track.map((r, i) => (
                            <li key={`${r.slug}-${i}`} aria-hidden={i >= RETAILERS.length} className={card}>
                                <LogoMark src={`/images/publishing/platforms/${r.slug}.png`} name={r.name} />
                            </li>
                        ))}
                    </motion.ul>
                )}
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   MISSION (cream)
══════════════════════════════════════════════════════════════ */
function Mission() {
    const chips: { icon: typeof Palette; label: string }[] = [
        { icon: SpellCheck, label: "Editing" },
        { icon: Palette, label: "Illustration" },
        { icon: Printer, label: "Printing" },
    ];
    return (
        <section className="relative overflow-hidden bg-[#faf9f7] py-16 sm:py-24 min-[900px]:py-28">
            <DHeart className="left-[47%] top-[80px] hidden min-[900px]:block" size={28} color="#f6b8ab" />
            <DStar className="bottom-[80px] left-[3%]" size={24} delay={1.2} />
            <DSparkle className="right-[6%] top-[60px]" size={22} color={HEX.red} delay={2.4} />
            <div className={cx(INNER, "grid grid-cols-1 items-center gap-12 min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[900px]:gap-16")}>
                <div>
                    <Tag>Our Mission</Tag>
                    <h2 className={cx(H2, "text-[#05070f]")}>Helping authors make <span className="text-[#e8391d]">books children love</span></h2>
                    <p className={BODY}>
                        Writing a children's book is the easy part to get excited about. Turning it into a finished, printed book takes editing,
                        illustration, design, and a lot of publishing paperwork. Our job is to handle all of that with you, so your story reaches
                        young readers looking the way you imagined it.
                    </p>
                    <ul className="m-0 mt-7 flex list-none flex-wrap gap-2.5 p-0">
                        {chips.map(({ icon: Icon, label }) => (
                            <li key={label} className={cx("inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] font-medium text-[#05070f]", SOFT)}>
                                <Icon size={16} className="text-[#e8391d]" /> {label}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
                        <button type="button" className={btn("red")} onClick={getStarted}>Get a Free Quote <ArrowRight size={16} /></button>
                    </div>
                </div>
                <div className="relative mx-auto aspect-[5/4] w-full max-w-[460px] min-[900px]:max-w-none">
                    <span aria-hidden="true" className="absolute inset-[4%_2%_0_6%] rounded-[46%_54%_42%_58%/55%_45%_55%_45%] bg-[#fdecea]" />
                    <Img src={IMG.mission} alt="Children's books published by Bexley Publishing" className="relative h-full w-full object-contain" hideOnFail />
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   SERVICES (white)
══════════════════════════════════════════════════════════════ */
function Services() {
    return (
        <section className="relative bg-white py-16 sm:py-24 min-[900px]:py-28">
            <DStar className="left-[16%] top-20 hidden sm:block" size={28} />
            <DSparkle className="right-[16%] top-[110px] hidden sm:block" size={22} color={HEX.sky} delay={1.5} />
            <div className={INNER}>
                <Head tag="What we do" title="Our" accent="Services" sub="Everything your children's book needs, from the first edit to the printed copy." />
                <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 min-[900px]:grid-cols-3 min-[1200px]:grid-cols-5">
                    {services.map(({ icon: Icon, title, desc }) => (
                        <li key={title} className={cx("rounded-3xl bg-[#faf9f7] p-7 text-center", SOFT_HOVER)}>
                            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#e8391d] shadow-[0_8px_20px_rgba(232,57,29,0.15)]"><Icon size={26} /></span>
                            <h3 className={cx(DISPLAY, "mb-2.5 mt-0 text-lg font-semibold leading-snug text-[#05070f]")}>{title}</h3>
                            <p className="m-0 text-[15px] leading-[1.65] text-[#4a5160]">{desc}</p>
                        </li>
                    ))}
                </ul>
                <div className="mt-12 flex justify-center">
                    <button type="button" className={btn("red", { extra: "w-full sm:w-auto" })} onClick={getStarted}>Get a Free Quote <ArrowRight size={16} /></button>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   PORTFOLIO (cream)
══════════════════════════════════════════════════════════════ */
function Portfolio() {
    const [active, setActive] = useState("all");
    const tabs = [{ label: "All", folder: "all" }, ...PORTFOLIO_TABS];
    const items = active === "all"
        ? PORTFOLIO_TABS.flatMap((t) => [pf(t.folder, 1), pf(t.folder, 2)]).slice(0, 8)
        : Array.from({ length: 8 }, (_, i) => pf(active, i + 1));
    const label = active === "all" ? "Children's book" : PORTFOLIO_TABS.find((t) => t.folder === active)?.label ?? "";
    return (
        <section className="relative overflow-hidden bg-[#faf9f7] py-16 sm:py-24 min-[900px]:py-28">
            <DStar className="left-[10%] top-[90px] hidden sm:block" size={24} />
            <DHeart className="right-[12%] top-[130px] hidden sm:block" size={22} color="#f6b8ab" delay={2} />
            <div className={INNER}>
                <Head tag="Books we've worked on" title="Our" accent="Portfolio" />
                <div role="tablist" aria-label="Portfolio categories" className="-mx-5 mb-8 flex gap-2.5 overflow-x-auto px-5 pb-2 pt-1 [scrollbar-width:none] sm:mx-0 sm:mb-12 sm:flex-wrap sm:justify-center sm:overflow-visible sm:p-0 [&::-webkit-scrollbar]:hidden">
                    {tabs.map((t) => {
                        const on = active === t.folder;
                        return (
                            <button
                                key={t.folder} type="button" role="tab" aria-selected={on}
                                onClick={() => setActive(t.folder)}
                                className={cx(
                                    "inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full border-0 px-5 py-2.5 text-[15px] font-medium transition-all duration-200",
                                    on ? "bg-[#e8391d] text-white shadow-[0_8px_20px_rgba(232,57,29,0.28)]" : "bg-white text-[#05070f] shadow-[0_4px_14px_rgba(5,7,15,0.06)] hover:text-[#e8391d]",
                                )}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                    <AnimatePresence mode="popLayout">
                        {items.map((src, i) => (
                            <motion.div
                                key={`${active}-${src}`} layout className="group"
                                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.3, delay: i * 0.03, ease }}
                            >
                                <div className={cx("aspect-square overflow-hidden rounded-3xl bg-white", SOFT, "transition-shadow duration-300 group-hover:shadow-[0_18px_40px_rgba(5,7,15,0.12)]")}>
                                    <Img src={src} alt={`${label} ${i + 1}`} className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <div className="mt-12 flex justify-center">
                    <button type="button" className={btn("red", { extra: "w-full sm:w-auto" })} onClick={getStarted}>Start Your Book <ArrowRight size={16} /></button>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   TESTIMONIALS (Trustpilot style, white) + PROMISES
══════════════════════════════════════════════════════════════ */
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
        const t = setInterval(() => setIndex((i) => (i + 1) % pages), 6000);
        return () => clearInterval(t);
    }, [pages]);

    const arrow = "mx-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-[#05070f] shadow-[0_6px_18px_rgba(5,7,15,0.1)] transition-colors hover:bg-[#e8391d] hover:text-white";

    return (
        <section className="relative bg-white py-16 sm:py-24 min-[900px]:py-28">
            <DSparkle className="left-[14%] top-[90px] hidden sm:block" size={22} color={HEX.sun} />
            <DStar className="right-[13%] top-[120px] hidden sm:block" size={24} color={HEX.sky} delay={1.5} />
            <div className={INNER}>
                <Head tag="Testimonials" title="What our" accent="authors say" sub="Authors, parents, and teachers on working with Bexley Publishing." />

                {/* Summary strip: shows a real rating only when TRUST.verified is true */}
                <div className="mx-auto mb-12 flex max-w-[820px] flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-full bg-[#faf9f7] px-6 py-4 text-center">
                    {TRUST.verified ? (
                        <>
                            <span className={cx(DISPLAY, "text-xl font-semibold")}>{TRUST.label}</span>
                            <TrustStars size={26} />
                            <span className="text-[15px] text-[#4a5160]">Rated <strong className="font-semibold text-[#05070f]">{TRUST.score}</strong> / 5 based on <strong className="font-semibold text-[#05070f]">{TRUST.reviews} reviews</strong></span>
                            <span className="inline-flex items-center gap-1.5 text-lg font-semibold"><Star size={20} fill="#03D389" stroke="#03D389" /> Trustpilot</span>
                        </>
                    ) : (
                        <>
                            <span className={cx(DISPLAY, "text-lg font-semibold sm:text-xl")}>Client Feedback</span>
                            <TrustStars size={26} />
                            <span className="text-[15px] text-[#4a5160]">Trusted by authors for creativity, communication, and reliable delivery.</span>
                        </>
                    )}
                </div>

                <div className="-mx-3 overflow-hidden px-0 pb-6 pt-1">
                    {/* The slide offset is computed, so it stays an inline style */}
                    <div className="flex transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `translateX(-${(index * 100) / perView}%)` }}>
                        {testimonials.map((t) => (
                            <div key={t.name} className="px-3" style={{ flex: `0 0 ${100 / perView}%` }}>
                                <article className={cx("flex h-full flex-col rounded-3xl bg-white p-6 sm:p-7", SOFT, "ring-1 ring-[#05070f]/[0.04]")}>
                                    <header className="mb-4 flex items-center gap-3">
                                        <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#03D389]/15 text-sm font-semibold text-[#03a06a]">
                                            {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                        </span>
                                        <div>
                                            <p className="m-0 text-[15px] font-semibold text-[#191919]">{t.name}</p>
                                            <p className="m-0 mt-0.5 text-[13px] text-[#6c6c85]">Author</p>
                                        </div>
                                    </header>
                                    <div className="mb-3"><TrustStars /></div>
                                    <h3 className={cx(DISPLAY, "mb-2 mt-0 text-lg font-medium leading-snug text-[#191919]")}>{t.title}</h3>
                                    <p className="m-0 flex-1 text-[15px] leading-[1.7] text-[#4a5160] min-[1800px]:text-base">{t.quote}</p>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
                {pages > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <button type="button" className={arrow} aria-label="Previous reviews" onClick={() => setIndex((i) => (i - 1 + pages) % pages)}><ArrowRight size={18} className="rotate-180" /></button>
                        {Array.from({ length: pages }).map((_, i) => (
                            <button
                                key={i} type="button" aria-label={`Show reviews ${i + 1}`} onClick={() => setIndex(i)}
                                className={cx("h-2.5 cursor-pointer rounded-full border-0 p-0 transition-all duration-300", i === index ? "w-7 bg-[#e8391d]" : "w-2.5 bg-[#d9dce3] hover:bg-[#b9bdc8]")}
                            />
                        ))}
                        <button type="button" className={arrow} aria-label="Next reviews" onClick={() => setIndex((i) => (i + 1) % pages)}><ArrowRight size={18} /></button>
                    </div>
                )}

                <ul className="m-0 mt-16 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 min-[1200px]:grid-cols-4">
                    {promises.map(({ icon: Icon, title }) => (
                        <li key={title} className="flex flex-col items-center gap-4 rounded-3xl bg-[#faf9f7] px-6 py-8 text-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8391d] text-white shadow-[0_8px_20px_rgba(232,57,29,0.28)]"><Icon size={24} /></span>
                            <span className={cx(DISPLAY, "text-lg font-medium leading-snug text-[#05070f]")}>{title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT (dark, matches the hero)
══════════════════════════════════════════════════════════════ */
function Contact() {
    const cards: { href?: string; icon: typeof Mail; title: string; value: string }[] = [
        { href: `mailto:${BRAND.email}`, icon: Mail, title: "Email us", value: BRAND.email },
        { href: BRAND.phoneHref, icon: Phone, title: "Call us", value: BRAND.phone },
        { icon: MapPin, title: "Visit us", value: BRAND.headOffice },
    ];
    return (
        <section className="relative overflow-hidden bg-[#05070f] py-16 sm:py-24 min-[900px]:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute left-[-10%] top-[-10%] h-[70%] w-3/5 bg-[radial-gradient(closest-side,rgba(232,57,29,0.22),transparent)]" />
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:26px_26px] opacity-[0.05]" />
            <span aria-hidden="true" className="absolute right-[8%] top-10 h-[50px] w-[50px] rounded-full bg-[#ffc83d] shadow-[0_0_40px_rgba(255,200,61,0.45)] sm:top-[70px] sm:h-[64px] sm:w-[64px]" />
            <DStar className="left-[44%] top-[90px] hidden min-[900px]:block" size={24} />
            <DStar className="left-[2%] top-1/2" size={18} color={HEX.white} delay={1} />
            <DSparkle className="bottom-[200px] left-[40%] hidden min-[900px]:block" size={20} color={HEX.sun} delay={2} />
            <DSparkle className="right-[20%] top-[160px]" size={14} delay={3} />

            <div className={cx(INNER, "grid grid-cols-1 items-center gap-12 min-[900px]:grid-cols-2 min-[900px]:gap-16")}>
                <div className="text-center min-[900px]:text-left">
                    <Tag dark>Let's talk</Tag>
                    <h2 className={cx(H2, "text-white")}>We'd love to <span className="text-[#ff6a4d]">hear your story</span></h2>
                    <p className="mx-auto mt-4 max-w-[52ch] text-base leading-[1.75] text-white/75 sm:text-[17px] min-[900px]:mx-0">Have a manuscript, an idea, or a question about publishing? Tell us about your book and a publishing consultant will reply with a plan and a quote.</p>
                    <div className="relative mx-auto mt-8 aspect-square w-full max-w-[260px] min-[900px]:mx-0 min-[900px]:max-w-[320px]">
                        <span aria-hidden="true" className="absolute inset-[10%] rounded-full bg-[#4fb3ff]/25" />
                        <Img src={IMG.contactArt} alt="Illustrated character" className="relative h-full w-full object-contain drop-shadow-[0_20px_26px_rgba(0,0,0,0.5)]" hideOnFail />
                    </div>
                </div>

                <div id="kh-contact-form" className="relative rounded-[28px] bg-white px-5 pb-7 pt-14 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:px-9 sm:pb-9 sm:pt-16">
                    <span aria-hidden="true" className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[#e8391d] text-white shadow-[0_12px_28px_rgba(232,57,29,0.4)]"><Mail size={24} /></span>
                    <h3 className={cx(DISPLAY, "mb-6 mt-0 text-center text-2xl font-semibold text-[#05070f]")}>Send us a message</h3>
                    <ContactForm
                        theme={landingHeroTheme}
                        formLocation="Children's Publishing Landing - Contact"
                        placeholders={{ name: "Full Name *", email: "Email Address *", phone: "Phone Number *", message: "Tell us about your book." }}
                        labels={{ name: "Full Name", email: "Email Address", phone: "Phone Number", message: "Tell us about your book." }}
                        submitLabel={<>Send Message <Send size={15} /></>}
                    />
                </div>
            </div>

            <div className={cx(INNER, "mt-16 grid grid-cols-1 gap-4 min-[900px]:grid-cols-3")}>
                {cards.map(({ href, icon: Icon, title, value }) => {
                    const cls = cx("flex min-w-0 items-center gap-4 rounded-3xl bg-white/[0.06] p-5 text-[15px] leading-normal text-white/70 backdrop-blur-sm transition-colors duration-200", href && "hover:bg-white/[0.1]");
                    const inner = (
                        <>
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8391d] text-white"><Icon size={20} /></span>
                            <div className="min-w-0 [overflow-wrap:anywhere]">
                                <b className={cx(DISPLAY, "mb-0.5 block text-base font-medium text-white")}>{title}</b>{value}
                            </div>
                        </>
                    );
                    return href ? <a key={title} href={href} className={cls}>{inner}</a> : <div key={title} className={cls}>{inner}</div>;
                })}
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   POPUP (desktop only)
══════════════════════════════════════════════════════════════ */
function GetStartedPopup() {
    const [open, setOpen] = useState(false);
    const closeBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const onOpen = () => setOpen(true);
        window.addEventListener(POPUP_EVENT, onOpen);
        return () => window.removeEventListener(POPUP_EVENT, onOpen);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        const mq = window.matchMedia(`(min-width: ${POPUP_MIN_WIDTH}px)`);
        const onMq = () => { if (!mq.matches) setOpen(false); };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onMq);
        const t = setTimeout(() => closeBtn.current?.focus(), 300);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onMq);
            clearTimeout(t);
        };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[1000] hidden items-center justify-center bg-[#05070f]/35 p-10 backdrop-blur-md backdrop-saturate-[1.1] lg:flex"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        role="dialog" aria-modal="true" aria-labelledby="kh-pop-title"
                        className="relative grid max-h-[calc(100vh-80px)] grid-cols-[auto_340px_380px] items-end"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div aria-hidden="true" className="mr-3.5 flex rotate-180 flex-col gap-1 pb-1 [writing-mode:vertical-rl]">
                            <span className="text-[15px] font-medium text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">Fill in this form for special discounts of</span>
                            <strong className={cx(DISPLAY, "text-[34px] font-semibold leading-none text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.65)]")}>Up to 50%!</strong>
                        </div>
                        <div className="relative z-[2]">
                            <h2 id="kh-pop-title" className={cx(DISPLAY, "relative mb-4 mt-0 w-[360px] text-[26px] font-semibold leading-[1.15] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]")}>
                                <span aria-hidden="true" className="absolute -bottom-3.5 -left-6 -right-6 -top-[18px] -z-10 rounded-[40px] bg-[#05070f]/35 blur-[22px]" />
                                Publish your children's book
                                <span className="mt-2 block text-base font-medium [font-family:var(--font-kh-body,'Nunito'),'Nunito',sans-serif]">Editing, illustration, and printing in one place</span>
                            </h2>
                            <div className="rounded-3xl bg-white p-6 shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                                <ContactForm
                                    theme={landingHeroTheme}
                                    formLocation="Children's Publishing Landing - Popup"
                                    placeholders={{ name: "Full Name *", email: "Email Address *", phone: "Phone Number *", message: "Tell us about your book." }}
                                    labels={{ name: "Full Name", email: "Email Address", phone: "Phone Number", message: "Tell us about your book." }}
                                    submitLabel={<>Get My Free Quote <Send size={15} /></>}
                                />
                            </div>
                        </div>
                        <div className="relative z-[1] -ml-[60px] h-[380px] self-center [@media(min-height:661px)]:h-[460px]">
                            <div className="absolute -top-10 right-0 h-[330px] w-[290px] overflow-hidden rounded-3xl bg-[#e8391d] shadow-[0_30px_70px_rgba(0,0,0,0.3)] [@media(min-height:661px)]:h-[400px]">
                                <DStar className="left-[26px] top-[26px]" size={24} float={false} />
                                <DSparkle className="left-[74px] top-20" size={16} float={false} />
                                <button ref={closeBtn} type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute right-3 top-3 z-[3] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white/90 text-[#05070f] transition-colors hover:bg-white"><X size={20} /></button>
                            </div>
                            <Img src={IMG.popup} alt="" className="absolute bottom-0 left-0 z-[2] h-full w-full object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]" hideOnFail />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#05070f] text-white/70">
            <div className={cx(INNER, "grid grid-cols-1 gap-10 pb-12 pt-16 sm:grid-cols-2 sm:gap-14 sm:pt-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]")}>
                <div className="sm:col-span-2 lg:col-span-1">
                    <a href="#top" aria-label={`${BRAND.name}, back to top`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={IMG.footerLogo} alt={BRAND.name} className="block h-16 w-auto" />
                    </a>
                    <p className="mb-0 mt-5 max-w-[38ch] text-[15px] leading-[1.8]">We help authors turn their ideas into beautifully illustrated, published books that inspire young minds.</p>
                </div>
                <div>
                    <p className={cx(DISPLAY, "mb-4 mt-0 text-lg font-medium text-white")}>Contact</p>
                    <ul className="m-0 grid list-none gap-3.5 p-0 text-[15px]">
                        {[
                            { icon: Phone, node: <a href={BRAND.phoneHref} className="hover:text-white">{BRAND.phone}</a> },
                            { icon: Mail, node: <a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a> },
                            { icon: MapPin, node: <span>{BRAND.headOffice}</span> },
                        ].map(({ icon: Icon, node }, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[#ff6a4d]"><Icon size={15} /></span>
                                {node}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className={cx(DISPLAY, "mb-4 mt-0 text-lg font-medium text-white")}>Ready to start?</p>
                    <p className="mb-5 mt-0 text-[15px] leading-[1.7]">Tell us about your book and get a free publishing plan and quote.</p>
                    <button type="button" className={btn("red")} onClick={getStarted}>Get a Free Quote <ArrowRight size={16} /></button>
                </div>
            </div>
            <div className={cx(INNER, "flex flex-col flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-center text-sm sm:flex-row sm:text-left")}>
                <p className="m-0">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
                <ul className="m-0 flex list-none flex-wrap justify-center gap-5 p-0">
                    {footerBadges.map(({ icon: Icon, label }) => (
                        <li key={label} className="inline-flex items-center gap-2 font-medium text-white/85">
                            <Icon size={15} className="text-[#ffc83d]" />
                            {label}
                        </li>
                    ))}
                </ul>
                <nav aria-label="Legal" className="flex flex-wrap justify-center gap-5">
                    {LEGAL_LINKS.map((l) => <a key={l.href} href={l.href} className="hover:text-white">{l.label}</a>)}
                </nav>
            </div>
        </footer>
    );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function KidsPublishingLandingPage() {
    return (
        <main
            id="top"
            className={cx(
                fontDisplay.variable, fontBody.variable,
                "w-full overflow-hidden bg-white text-[#05070f] antialiased [font-family:var(--font-kh-body,'Nunito'),'Nunito',sans-serif]",
            )}
        >
            <Header />
            <Hero />
            <LogoCarousel />
            <Mission />
            <Services />
            <Portfolio />
            <Testimonials />
            <Contact />
            <LogoCarousel title={false} />
            <Footer />
            <GetStartedPopup />
        </main>
    );
}