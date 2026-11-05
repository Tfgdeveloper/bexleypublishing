"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import {
    ArrowRight, Phone, Mail, MapPin, ChevronDown, ChevronLeft, ChevronRight, Star, Quote, ImageIcon,
    BookOpen, Globe, ShieldCheck, UserCheck, X,
} from "lucide-react";
import ContactForm from "@/components/Contact-form";
import { contactSectionTheme, landingHeroTheme, landingNewPopupTheme, landingPopupTheme } from "@/components/contactFormThemes";

/* ══════════════════════════════════════════════════════════════
   FONTS: elegant serif headings + clean sans body (max weight 600)
══════════════════════════════════════════════════════════════ */
const fontSerif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], variable: "--font-ps-serif", display: "swap" });
const fontSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-ps-sans", display: "swap" });
const SERIF = "[font-family:var(--font-ps-serif,'DM_Serif_Display'),'DM_Serif_Display',Georgia,serif]";

/* ══════════════════════════════════════════════════════════════
   EDIT THESE: contact details, images and numbers
══════════════════════════════════════════════════════════════ */
const BRAND = {
    name: "Bexley Publishing",
    phone: "(279) 777-0380",
    phoneHref: "tel:2797770380",
    email: "info@bexleypublishing.com",
    address: "2390 Fruitridge Rd, Sacramento, CA 95822",
    logo: "/images/logo.png",
};

const IMG = {
    heroPerson: "/images/page/publishing-hero-person.png", // transparent PNG of a person, bottom-aligned
    popupPerson: "/images/page/popup-person.png",          // transparent PNG for the oval popup (person holding books)
    popupBook: "/images/page/popup-open-book.png",         // optional small open-book illustration under the form
};

/* Book covers: /public/images/01.png … 25.png */
const COVER_COUNT = 22;
const cover = (n: number) => `/images/${String(((n - 1) % COVER_COUNT) + 1).padStart(2, "0")}.jpg`;

/* Service photos: /public/images/services/<slug>.jpg */
const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* Stats under the hero. Use your real numbers. */
const STATS = [
    { icon: BookOpen, value: "1,000+", label: "Titles Published" },
    { icon: Globe, value: "200+", label: "Countries Reached" },
    { icon: ShieldCheck, value: "100%", label: "Rights Kept" },
    { icon: UserCheck, value: "Dedicated", label: "Project Manager" },
];

const LEGAL_LINKS = [
    { label: "Terms & Conditions", href: "/terms-of-use" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
];

/* ══════════════════════════════════════════════════════════════
   CONTENT
══════════════════════════════════════════════════════════════ */
const services = [
    { title: "Ghost Writing", desc: "We turn your idea into a finished manuscript in your voice." },
    { title: "Book Editing", desc: "We shape, sharpen, and polish every page." },
    { title: "Design Services", desc: "We create the cover, the interior, and any original art." },
    { title: "Publishing Service", desc: "We get your book listed with retailers worldwide." },
    { title: "Audiobook Production", desc: "We record, edit, master, and deliver a professional listening experience." },
    { title: "Proofreading", desc: "We clear out the final typos, spacing issues, and tiny slips before publication." },
    { title: "Cover Design", desc: "We create a cover that earns attention and speaks to the right reader." },
    { title: "Interior Formatting", desc: "We set every page for comfortable reading in print and on screen." },
    { title: "Book Illustration", desc: "We develop original artwork from the first sketch to the finished page." },
    { title: "eBook and Kindle", desc: "We build and test digital editions that work beautifully on every device." },
    { title: "Author Branding", desc: "We shape a recognizable author identity that can grow beyond one book." },
    { title: "ISBN Registration", desc: "We handle ISBN, barcode, copyright, and metadata administration for you." },
    { title: "Printing Services", desc: "We arrange premium print-on-demand or larger print runs in your chosen format." },
    { title: "Global Distribution", desc: "We place your finished book in front of retailers and readers worldwide." },
    { title: "Book Marketing", desc: "We help readers find your book and keep it selling." },
];

const steps = [
    { title: "Consultation", desc: "We get to know the book, the reader, and what you want from it." },
    { title: "Manuscript Review", desc: "We ghostwrite from scratch, or read and map your existing draft." },
    { title: "Editing", desc: "We shape, tighten, and proofread the manuscript." },
    { title: "Design and Illustrations", desc: "We create the cover, the interior, and any original artwork." },
    { title: "Publishing", desc: "We handle ISBN, metadata, and your book's retail listings." },
    { title: "Distribution", desc: "We send the book out through premium global distribution channels." },
    { title: "Marketing", desc: "We help readers find it and keep it selling." },
];

const CATEGORIES = ["Autobiography & Memoir", "Religion & Spirituality", "Children's Book", "Fantasy & Sci-Fi", "Thriller & Suspense", "Romance", "Cookbooks", "Self-Help", "Poetry"];

/* Replace with real reviews from your clients before going live */
const testimonials = [
    { name: "Sarah M.", role: "First-Time Author", quote: "One of the best decisions I made was having Bexley Publishing build my publishing plan. Everything was much easier than I expected. Seeing my book published was a rewarding moment, and I couldn't have done it without their support." },
    { name: "David R.", role: "Business Author", quote: "I was nervous about letting someone edit my manuscript because I didn't want my author voice lost. It looks professional, is easy to navigate, and gives readers one place to learn about me and my books." },
    { name: "Kevin S.", role: "Memoir Author", quote: "I had been putting this book off for four years. The team turned my notes into a finished book, and readers are responding really well." },
    { name: "Priya N.", role: "Novelist", quote: "Cover design, formatting, publishing: they handled every technical detail with precision and kept me updated throughout." },
];

const faqs = [
    { q: "What does it cost to publish a book?", a: "It depends on the services you choose. A single service costs far less than a full package, and you will always get a clear quote before we start." },
    { q: "Do I keep the rights to my book?", a: "Yes. You keep full rights to your work and 100% of your royalties. The book is published in your name." },
    { q: "Can you help if I already have a manuscript?", a: "Absolutely. We start with a manuscript review, then recommend the editing, design, and publishing steps your draft actually needs." },
    { q: "How soon can you publish my book?", a: "It depends on length and the services involved. You get a timeline for each stage before any work begins." },
    { q: "Do you work on children's books?", a: "Yes. We edit, illustrate, and publish picture books, early readers, and chapter books." },
    { q: "Where will my book be sold?", a: "On Amazon, Barnes & Noble, Apple Books, Kobo, Google Play, and through wide distribution to bookstores and libraries." },
    { q: "Can I book a single service?", a: "Yes. You can choose only editing, only a cover, only publishing, or any combination." },
    { q: "What if this is my first book?", a: "That is most of our authors. A dedicated project manager walks you through every step, from the first call to launch day." },
];

/* ══════════════════════════════════════════════════════════════
   TOKENS
══════════════════════════════════════════════════════════════ */
const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* The red gradient that replaces every blue element */
const GRAD = "bg-[linear-gradient(135deg,#ff6a4d_0%,#e8391d_45%,#a3150a_100%)]";
const GRAD_TEXT = "bg-[linear-gradient(135deg,#ff6a4d_0%,#e8391d_50%,#b5160b_100%)] bg-clip-text text-transparent";

const INNER = "relative z-[2] mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 min-[1800px]:max-w-[1500px]";
const H2 = cx(SERIF, "m-0 font-normal leading-[1.12] text-[#111318] text-[clamp(1.9rem,7vw,2.4rem)] sm:text-[clamp(2.2rem,3.6vw,3.1rem)] min-[1800px]:text-[3.6rem]");
const SUB = "mx-auto mt-3 max-w-[60ch] text-[15px] leading-[1.7] text-[#5b6170] sm:text-base";
const SOFT = "shadow-[0_10px_30px_rgba(17,19,24,0.07)]";

const BTN = "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-0 px-6 py-3 text-[15px] font-semibold transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8391d]";
const BTN_RED = cx(BTN, GRAD, "text-white shadow-[0_10px_24px_rgba(232,57,29,0.3)] hover:shadow-[0_14px_30px_rgba(232,57,29,0.38)] hover:brightness-105");
const BTN_LIGHT = cx(BTN, "bg-white text-[#111318] shadow-[0_8px_22px_rgba(17,19,24,0.1)] hover:text-[#e8391d]");

/* ══════════════════════════════════════════════════════════════
   ACTIONS: quote popup on desktop, scroll to the hero form on phones
══════════════════════════════════════════════════════════════ */
const POPUP_EVENT = "ps:open-quote";
const POPUP_MIN_WIDTH = 1024; // Tailwind `lg`

function scrollToQuote() {
    document.getElementById("ps-quote")?.scrollIntoView({ behavior: "smooth", block: "center" });
}
function openQuote() {
    if (typeof window === "undefined") return;
    if (window.matchMedia(`(min-width: ${POPUP_MIN_WIDTH}px)`).matches) window.dispatchEvent(new Event(POPUP_EVENT));
    else scrollToQuote();
}

/* ══════════════════════════════════════════════════════════════
   ANIMATION HELPERS
══════════════════════════════════════════════════════════════ */
/* Fade-up entrance, once, when the element scrolls into view */
const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: EASE },
});

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return <motion.div className={className} {...reveal(delay)}>{children}</motion.div>;
}

/* Infinite horizontal slider. `reverse` slides left to right. */
function Marquee({ children, reverse = false, duration = 40, className = "" }: { children: ReactNode; reverse?: boolean; duration?: number; className?: string }) {
    const reduce = useReducedMotion();
    return (
        <div className={cx("overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]", className)}>
            <motion.div
                className="flex w-max"
                animate={reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
                <div className="flex shrink-0">{children}</div>
                <div className="flex shrink-0" aria-hidden="true">{children}</div>
            </motion.div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   IMAGES
══════════════════════════════════════════════════════════════ */
function Img({ src, alt, className = "", hideOnFail = false }: { src: string; alt: string; className?: string; hideOnFail?: boolean }) {
    const ref = useRef<HTMLImageElement>(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        const img = ref.current;
        if (img && img.complete && img.naturalWidth === 0) setFailed(true);
    }, []);
    if (failed) {
        if (hideOnFail) return null;
        return <div role="img" aria-label={alt} className="flex h-full w-full items-center justify-center bg-[#f6f2f0] text-[#e8391d]/40"><ImageIcon size={26} /></div>;
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img ref={ref} src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
}

/* 3D hardcover mockup: angled cover, spine shading and a visible page edge */
function BookMockup({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
    return (
        <div className={cx("[perspective:900px]", className)}>
            <div className="relative aspect-[2/3] w-full transition-transform duration-500 [transform-style:preserve-3d] [transform:rotateY(-22deg)] group-hover:[transform:rotateY(-8deg)]">
                <div className="absolute inset-0 overflow-hidden rounded-l-[2px] rounded-r-[4px] bg-[#e9e4df] shadow-[0_22px_36px_rgba(0,0,0,0.28)]">
                    <Img src={src} alt={alt} className="h-full w-full object-cover" />
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[7%] bg-[linear-gradient(90deg,rgba(0,0,0,0.38),rgba(255,255,255,0.2)_45%,rgba(0,0,0,0.08))]" />
                    <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.2),transparent_42%)]" />
                </div>
                {/* page edge */}
                <span aria-hidden="true" className="absolute left-full top-[1.5%] h-[97%] w-[14%] origin-left bg-[linear-gradient(90deg,rgba(0,0,0,0.12),transparent_40%),repeating-linear-gradient(90deg,#fdfbf7_0_1px,#ddd4c6_1px_2px)] [transform:rotateY(90deg)]" />
            </div>
        </div>
    );
}

/* Wooden shelf the mockups stand on */
function Shelf({ className = "" }: { className?: string }) {
    return (
        <div aria-hidden="true" className={cx("relative", className)}>
            <div className="h-2.5 rounded-t-[3px] bg-[linear-gradient(180deg,#c48a5d,#a5683f)]" />
            <div className="h-4 rounded-b-[5px] bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.05)_0_2px,transparent_2px_5px),linear-gradient(180deg,#8a532f,#5f351c)] shadow-[0_18px_26px_rgba(0,0,0,0.22)]" />
        </div>
    );
}

/* Heading with the highlighted (gradient) part on its own line */
function Heading({ before, accent, sub, center = true }: { before: string; accent: string; sub?: string; center?: boolean }) {
    return (
        <Reveal className={cx("mb-10 sm:mb-12", center && "text-center")}>
            <h2 className={H2}>{before}<br /><span className={GRAD_TEXT}>{accent}</span></h2>
            {sub && <p className={cx(SUB, !center && "mx-0")}>{sub}</p>}
        </Reveal>
    );
}

function QuoteForm({ location, submit = "Request Free Consultation" }: { location: string; submit?: string }) {
    return (
        <ContactForm
            theme={landingHeroTheme}
            formLocation={location}
            placeholders={{ name: "Name", email: "Email", phone: "Phone Number", message: "Tell us about your book" }}
            labels={{ name: "Name", email: "Email", phone: "Phone Number", message: "Tell us about your book" }}
            submitLabel={<>{submit} <ArrowRight size={15} /></>}
        />
    );
}

function QuoteCard({ id, location }: { id?: string; location: string }) {
    return (
        <div id={id} className="relative w-full rounded-3xl bg-white/50 p-6 shadow-[0_24px_60px_rgba(17,19,24,0.14)] sm:p-7">
            <h3 className={cx(SERIF, "m-0 text-2xl font-normal text-[#111318]")}>Tell Us About Your Book</h3>
            <p className="mb-5 mt-1 text-[13px] text-black">Start with a free, no-pressure publishing consultation.</p>
            <QuoteForm location={location} />
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   HEADER
══════════════════════════════════════════════════════════════ */
function Header() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: EASE }}
            className={cx("fixed inset-x-0 top-0 z-[100] bg-white backdrop-blur-md transition-shadow duration-300", scrolled && "shadow-[0_6px_24px_rgba(17,19,24,0.08)]")}
        >
            <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
                <a href="#top" aria-label={`${BRAND.name}, back to top`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={BRAND.logo} alt={BRAND.name} className="block h-10 w-auto sm:h-12" />
                </a>
                <div className="flex items-center gap-2 sm:gap-3">
                    <a href={BRAND.phoneHref} className="hidden items-center gap-2 text-[15px] font-semibold text-[#111318] hover:text-[#e8391d] md:inline-flex">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fdecea] text-[#e8391d]"><Phone size={15} /></span>{BRAND.phone}
                    </a>
                    <a href={BRAND.phoneHref} aria-label={`Call ${BRAND.phone}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdecea] text-[#e8391d] md:hidden"><Phone size={16} /></a>
                    <button type="button" className={cx(BTN_RED, "px-4 py-2.5 text-sm sm:px-5")} onClick={openQuote}>Get a Free Quote</button>
                </div>
            </div>
        </motion.header>
    );
}

/* ══════════════════════════════════════════════════════════════
   HERO: white, light red diagonal shape behind the content
══════════════════════════════════════════════════════════════ */
function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pb-14 pt-28 sm:pt-32 lg:pb-0 lg:pt-28 bg-[url('/images/background-wide.png')] bg-cover bg-center">
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: EASE }}
                className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(135deg,rgba(255,106,77,0.90)_0%,rgba(232,57,29,0.90)_55%,rgba(163,21,10,0.30)_100%)] [clip-path:polygon(0_0,100%_0,100%_62%,0_100%)] lg:w-[64%] lg:[clip-path:polygon(0_0,100%_0,74%_100%,0_100%)]"
            />

            <div className={cx(INNER, "grid grid-cols-1 items-center gap-10 lg:min-h-[600px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-6")}>
                <div className="text-center lg:pb-16 lg:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                        className={cx(SERIF, "m-0 font-normal leading-[1.08] text-[#fff] text-[clamp(2.3rem,9vw,3rem)] sm:text-[clamp(2.8rem,5vw,4rem)] min-[1800px]:text-[4.8rem]")}
                    >
                        Self Publish A Book<br />Without The Overwhelm
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                        className="mx-auto mt-5 max-w-[50ch] text-base leading-[1.75] text-[#fff]/80 sm:text-[17px] lg:mx-0"
                    >
                        {BRAND.name} helps you turn your idea into a professionally published book. Partner with us to transform your vision into a
                        polished, publication-ready masterpiece, and keep 100% of your rights and royalties.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
                        className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
                    >
                        <button type="button" className={BTN_RED} onClick={openQuote}>Get My Free Quote <ArrowRight size={16} /></button>
                        <a href={BRAND.phoneHref} className={BTN_LIGHT}><Phone size={15} /> {BRAND.phone}</a>
                    </motion.div>
                </div>

                <div className="relative flex items-end justify-center lg:h-full lg:justify-end">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: EASE }}
                        className="pointer-events-none absolute bottom-0 left-[-12%] hidden h-[94%] w-[64%] lg:block"
                    >
                        <Img src={IMG.heroPerson} alt="" className="h-full w-full object-contain object-bottom" hideOnFail />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
                        className="relative z-[2] w-full max-w-[420px] lg:mb-16"
                    >
                        <QuoteCard id="ps-quote" location="Publishing Landing - Hero" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   STATS
══════════════════════════════════════════════════════════════ */
function Stats() {
    return (
        <section className="bg-white py-12 sm:py-14">
            <ul className={cx(INNER, "m-0 grid list-none grid-cols-2 gap-x-6 gap-y-8 p-0 lg:grid-cols-4")}>
                {STATS.map(({ icon: Icon, value, label }, i) => (
                    <motion.li key={label} {...reveal(i * 0.08)} className="flex items-center justify-center gap-3.5 lg:justify-start">
                        <span className={cx("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_10px_22px_rgba(232,57,29,0.28)] sm:h-14 sm:w-14", GRAD)}><Icon size={22} /></span>
                        <span>
                            <b className={cx(SERIF, "block text-[1.4rem] font-normal leading-none sm:text-[2rem]", GRAD_TEXT)}>{value}</b>
                            <span className="mt-1 block text-[13px] font-medium text-[#5b6170] sm:text-sm">{label}</span>
                        </span>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   INTRO: two infinite book rows (top moves right, bottom moves left) + text
══════════════════════════════════════════════════════════════ */
function Intro() {
    const rowA = [1, 2, 3, 4, 5, 6, 7, 8];
    const rowB = [9, 10, 11, 12, 13, 14, 15, 16];
    const item = (n: number) => (
        <div key={n} className="w-[124px] shrink-0 px-4 py-7 sm:w-[160px] sm:px-5">
            <BookMockup src={cover(n)} alt="Book published by Bexley Publishing" />
        </div>
    );
    return (
        <section className="overflow-hidden bg-[#fbf8f7] py-16 sm:py-24">
            <div className={cx(INNER, "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14")}>
                <Reveal className="min-w-0">
                    <Marquee reverse duration={38}>{rowA.map(item)}</Marquee>
                    <Marquee duration={42} className="-mt-2">{rowB.map(item)}</Marquee>
                </Reveal>
                <Reveal delay={0.1} className="text-center lg:text-left">
                    <h2 className={H2}>The Best In The Industry:<br /><span className={GRAD_TEXT}>Book Publication Solutions</span></h2>
                    <p className={cx(SUB, "lg:mx-0")}>
                        From ghostwriting and editorial polish to design, formatting, worldwide distribution, and marketing, one team carries the work
                        from the first idea to the finished book.
                    </p>
                    <div className="mt-7 flex justify-center lg:justify-start">
                        <button type="button" className={BTN_RED} onClick={openQuote}>Start My Book <ArrowRight size={16} /></button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   SERVICES GRID
══════════════════════════════════════════════════════════════ */
function Services() {
    const [all, setAll] = useState(false);
    const shown = all ? services : services.slice(0, 9);
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className={INNER}>
                <Heading before="Everything It Takes To" accent="Publish Your Own Book" sub="Choose a single service or bring the full project under one roof." />
                <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-9 p-0 sm:grid-cols-2 lg:grid-cols-3">
                    {shown.map((s, i) => (
                        <motion.li key={s.title} {...reveal((i % 3) * 0.08)} className="group">
                            <div className={cx("aspect-[16/10] overflow-hidden rounded-2xl bg-[#f6f2f0]", SOFT)}>
                                <Img src={`/images/services/${slug(s.title)}.jpg`} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                            </div>
                            <h3 className={cx(SERIF, "mb-1.5 mt-4 text-xl font-normal text-[#111318] transition-colors group-hover:text-[#e8391d]")}>{s.title}</h3>
                            <p className="m-0 text-[15px] leading-[1.65] text-[#5b6170]">{s.desc}</p>
                        </motion.li>
                    ))}
                </ul>
                {!all && (
                    <Reveal className="mt-12 flex justify-center">
                        <button type="button" className={BTN_RED} onClick={() => setAll(true)}>Explore More <ChevronDown size={16} /></button>
                    </Reveal>
                )}
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   HOW IT WORKS (zigzag, cards fill with the gradient on hover)
══════════════════════════════════════════════════════════════ */
function StepCard({ i, title, desc }: { i: number; title: string; desc: string }) {
    return (
        <div className={cx("group relative cursor-default overflow-hidden rounded-2xl bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(232,57,29,0.28)]", SOFT)}>
            <span aria-hidden="true" className={cx("absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100", GRAD)} />
            <div className="relative">
                <span className={cx("mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-none group-hover:bg-white group-hover:text-[#e8391d]", GRAD)}>
                    {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={cx(SERIF, "m-0 text-xl font-normal text-[#111318] transition-colors duration-300 group-hover:text-white")}>{title}</h3>
                <p className="mb-0 mt-1.5 text-[15px] leading-[1.65] text-[#5b6170] transition-colors duration-300 group-hover:text-white/90">{desc}</p>
            </div>
        </div>
    );
}

function HowItWorks() {
    return (
        <section className="relative overflow-hidden bg-[#fbf8f7] py-16 sm:py-24">
            <div className={INNER}>
                <Heading before="How It Works" accent="Start To Finish" sub="Here is exactly how we help you publish a book, one step at a time." />
                {/* Phones: one list in order. Tablet and up: two independent columns (odd steps left, even steps right, offset down) */}
                <div className="relative mx-auto grid max-w-[880px] grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-10">
                    <span aria-hidden="true" className="absolute bottom-6 left-1/2 top-6 hidden w-0.5 -translate-x-1/2 bg-[linear-gradient(180deg,rgba(232,57,29,0.35),rgba(232,57,29,0.05))] md:block" />
                    {[0, 1].map((col) => (
                        <ol key={col} className={cx("contents m-0 list-none p-0 md:grid md:content-start md:gap-6", col === 1 && "md:pt-20")}>
                            {steps.map((s, i) => (i % 2 !== col ? null : (
                                <motion.li key={s.title} {...reveal(0.05 * i)} style={{ order: i }}>
                                    <StepCard i={i} title={s.title} desc={s.desc} />
                                </motion.li>
                            )))}
                        </ol>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   PORTFOLIO: infinite slider of book mockups, each on its own shelf
══════════════════════════════════════════════════════════════ */
function Portfolio() {
    const [active, setActive] = useState(0);
    const books = Array.from({ length: 8 }, (_, i) => cover(active * 3 + i + 1));
    return (
        <section className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fdf3f1_100%)] py-16 sm:py-24">
            <div className={INNER}>
                <Heading before="Books We've" accent="Helped Publish" sub="We make it easy for authors to get their manuscripts edited, proofread, and formatted, then ready to be published for their readers." />
                <Reveal>
                    <div role="tablist" aria-label="Book categories" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
                        {CATEGORIES.map((c, i) => (
                            <button
                                key={c} type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)}
                                className={cx(
                                    "shrink-0 cursor-pointer whitespace-nowrap rounded-full border-0 px-4 py-2 text-sm font-medium transition-all duration-200",
                                    active === i ? cx(GRAD, "text-white shadow-[0_8px_20px_rgba(232,57,29,0.28)]") : "bg-white text-[#3a3f4c] shadow-[0_4px_14px_rgba(17,19,24,0.06)] hover:text-[#e8391d]",
                                )}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </Reveal>
            </div>

            <Reveal delay={0.1}>
                <AnimatePresence mode="wait">
                    <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                        <Marquee duration={45} className="mx-auto max-w-[1600px]">
                            {books.map((src, i) => (
                                <div key={`${active}-${i}`} className="group w-[230px] shrink-0 px-5 pb-10 pt-8 sm:w-[270px] sm:px-7">
                                    <BookMockup src={src} alt={`${CATEGORIES[active]} book ${i + 1}`} className="relative z-[2] mx-auto w-[64%]" />
                                    <Shelf className="-mt-1" />
                                </div>
                            ))}
                        </Marquee>
                    </motion.div>
                </AnimatePresence>
            </Reveal>

            <Reveal className="mt-12 flex justify-center">
                <button type="button" className={BTN_RED} onClick={openQuote}>Publish My Book <ArrowRight size={16} /></button>
            </Reveal>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   TESTIMONIALS (red gradient band)
══════════════════════════════════════════════════════════════ */
function Testimonials() {
    const [perView, setPerView] = useState(2);
    const [index, setIndex] = useState(0);
    const pages = Math.max(1, testimonials.length - perView + 1);
    useEffect(() => {
        const calc = () => setPerView(window.innerWidth < 900 ? 1 : 2);
        calc();
        window.addEventListener("resize", calc);
        return () => window.removeEventListener("resize", calc);
    }, []);
    useEffect(() => { if (index > pages - 1) setIndex(0); }, [pages, index]);
    useEffect(() => {
        const t = setInterval(() => setIndex((i) => (i + 1) % pages), 6000);
        return () => clearInterval(t);
    }, [pages]);

    const arrow = "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-[#e8391d] shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-transform hover:scale-105";
    return (
        <section className={cx("relative overflow-hidden py-16 sm:py-24", GRAD)}>
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/[0.07]" />
            <div className={INNER}>
                <Reveal className="mb-10 text-center sm:mb-12">
                    <h2 className={cx(H2, "text-white")}>What Our Authors Say</h2>
                    <p className="mx-auto mt-3 max-w-[56ch] text-[15px] leading-[1.7] text-white/85 sm:text-base">We've helped hundreds of people to capture their stories and we have a lot of happy clients. Learn about their experience in their own words.</p>
                </Reveal>
                <Reveal delay={0.1} className="flex items-center gap-3 sm:gap-5">
                    <button type="button" aria-label="Previous reviews" className={arrow} onClick={() => setIndex((i) => (i - 1 + pages) % pages)}><ChevronLeft size={20} /></button>
                    <div className="-mx-3 flex-1 overflow-hidden py-2">
                        {/* The slide offset is computed, so it stays an inline style */}
                        <div className="flex transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `translateX(-${(index * 100) / perView}%)` }}>
                            {testimonials.map((t) => (
                                <div key={t.name} className="px-3" style={{ flex: `0 0 ${100 / perView}%` }}>
                                    <figure className="m-0 flex h-full flex-col items-center rounded-3xl bg-white px-6 py-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:px-9">
                                        <div className="mb-4 inline-flex gap-[3px]" aria-label="Rated 5 out of 5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <span key={i} className="inline-flex h-5 w-5 items-center justify-center rounded-[3px] bg-[#03D389]"><Star size={12} fill="white" stroke="white" /></span>
                                            ))}
                                        </div>
                                        <Quote size={22} className="mb-2 text-[#e8391d]/30" />
                                        <blockquote className="m-0 flex-1 text-[15px] leading-[1.75] text-[#3a3f4c] sm:text-base">“{t.quote}”</blockquote>
                                        <figcaption className="mt-5 text-[15px] font-semibold text-[#111318]">{t.name} <span className="font-normal text-[#6b7180]">· {t.role}</span></figcaption>
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="button" aria-label="Next reviews" className={arrow} onClick={() => setIndex((i) => (i + 1) % pages)}><ChevronRight size={20} /></button>
                </Reveal>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════════════════ */
function Faq() {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className={cx(INNER, "max-w-[900px] min-[1800px]:max-w-[1000px]")}>
                <Heading before="Valid Questions," accent="Honest Answers" sub="Straight answers about cost, ownership, timing, distribution, and what it is like to publish your first book with us." />
                <div className="grid gap-3">
                    {faqs.map(({ q, a }, i) => {
                        const isOpen = open === i;
                        return (
                            <motion.div key={q} {...reveal(i * 0.04)} className={cx("overflow-hidden rounded-2xl transition-colors", isOpen ? "bg-[#fdf1ee]" : "bg-[#f8f6f5] hover:bg-[#fdf6f4]")}>
                                <button
                                    type="button" aria-expanded={isOpen} aria-controls={`ps-faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                                    className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-5 py-4 text-left sm:px-6"
                                >
                                    <span className={cx(SERIF, "text-[17px] font-normal text-[#111318] sm:text-lg")}>{q}</span>
                                    <ChevronDown size={18} className={cx("shrink-0 text-[#e8391d] transition-transform duration-300", isOpen && "rotate-180")} />
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div id={`ps-faq-${i}`} initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
                                            <p className="m-0 px-5 pb-5 text-[15px] leading-[1.7] text-[#5b6170] sm:px-6">{a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   FINAL CTA + FORM
══════════════════════════════════════════════════════════════ */
function FinalCta() {
    return (
        <section className="relative overflow-hidden bg-[#fbf8f7] py-16 sm:py-24 bg-[url('/images/background-wide.png')] bg-cover bg-center">
            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(135deg,rgba(255,106,77,0.90),rgba(232,57,29,0.80))] [clip-path:polygon(0_0,58%_0,42%_100%,0_100%)]" />
            <div className={cx(INNER, "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16")}>
                <Reveal className="text-center lg:text-left">
                    <h2 className={cx(H2, "text-[clamp(2.1rem,7.6vw,2.6rem)] text-white sm:text-[clamp(2.6rem,4.4vw,3.6rem)]")}>Your Book Is Ready<br />For The World</h2>
                    <p className={cx(SUB, "lg:mx-0 text-white/80")}>Take the first step today. Tell us about the book and book a free, no-pressure call.</p>
                    <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                        <a href={BRAND.phoneHref} className={BTN_RED}><Phone size={15} /> {BRAND.phone}</a>
                        <a href={`mailto:${BRAND.email}`} className={BTN_LIGHT}><Mail size={15} /> Email us</a>
                    </div>
                </Reveal>
                <Reveal delay={0.12} className="mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
                    <QuoteCard location="Publishing Landing - Final CTA" />
                </Reveal>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   QUOTE POPUP (desktop only): oval, red gradient, white ring
══════════════════════════════════════════════════════════════ */
function QuotePopup() {
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
                    className="fixed inset-0 z-[1000] hidden items-center justify-center bg-[#111318]/50 p-6 backdrop-blur-[3px] lg:flex"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                    onClick={() => setOpen(false)}
                >
                    {/* Oval: sized by width, but never taller than the screen */}
                    <motion.div
                        role="dialog" aria-modal="true" aria-labelledby="ps-pop-title"
                        className="relative aspect-[1.4/1] w-[min(900px,92vw,calc((100vh-48px)*1.55))]"
                        initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 260, damping: 24 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* White ring */}
                        <div className="absolute inset-0 bg-[url('/images/popup.png')] bg-cover bg-center">
                            {/* Red gradient oval */}
                            <div className={cx("relative h-full w-full overflow-hidden ", )}>
                                

                                <div className="relative h-full items-center justify-center">
                                    {/* Left: offer + your form */}
                                    <div className="w-full flex flex-col pt-[13%] pl-[15%]">
                                        <div className="flex flex-col text-white text-center mr-[40%] mb-">
                                        <h2 id="ps-pop-title" className={cx(SERIF, "m-0 text-[48px] font-normal uppercase leading-none tracking-[-0.01em]")}>Get 50% Off</h2>
                                        <p className="mb-4 mt-2  text-[14px] font-medium leading-snug text-white/90">Start your publishing journey with a 50% discount.</p>
                                        </div>
                                        <div className="w-full max-w-[300px] overflow-y-auto text-left [scrollbar-width:thin]" style={{ maxHeight: "62%" }}>
                                            <ContactForm
                                                theme={landingNewPopupTheme}
                                                formLocation="Publishing Landing - Popup"
                                                placeholders={{ name: "Full Name", email: "Email", phone: "Phone Number", message: "Tell us about your book" }}
                                                labels={{ name: "Full Name", email: "Email", phone: "Phone Number", message: "Tell us about your book" }}
                                                submitLabel={<>Get my 50% Discount</>}
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Close button, just outside the top-right of the oval */}
                        <button
                            ref={closeBtn} type="button" aria-label="Close" onClick={() => setOpen(false)}
                            className="absolute right-[3.5%] top-[8%] z-[3] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-[#e8391d] text-white shadow-[0_0_0_3px_#fff,0_8px_20px_rgba(0,0,0,0.3)] transition-transform hover:scale-110"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ══════════════════════════════════════════════════════════════
   FOOTER (red gradient)
══════════════════════════════════════════════════════════════ */
function Footer() {
    return (
        <footer className={cx("relative overflow-hidden text-white", GRAD)}>
            <Reveal className={cx(INNER, "py-14 text-center sm:py-16")}>
                <h2 className={cx(SERIF, "m-0 text-[clamp(1.6rem,5vw,2.2rem)] font-normal")}>Our Wide Variety Of Services Includes:</h2>
                <p className="mx-auto mt-3 max-w-[64ch] text-[15px] leading-[1.7] text-white/85">A full-service publishing partner. We turn finished manuscripts into well-made books and get them onto shelves around the world.</p>
                <ul className="m-0 mx-auto mt-8 grid max-w-[900px] list-none grid-cols-2 gap-x-6 gap-y-2.5 p-0 text-[15px] text-white/90 sm:grid-cols-4">
                    {services.slice(0, 12).map((s) => <li key={s.title}>{s.title}</li>)}
                </ul>
                <p className="mx-auto mt-10 max-w-[70ch] text-xs leading-[1.7] text-white/70">
                    Disclaimer: {BRAND.name} is an independent publishing services company and is not affiliated with, endorsed by, or sponsored by any
                    literary agency, traditional publishing house, or retailer. Results, timelines, and outcomes may vary by project.
                </p>
            </Reveal>
            <div className="bg-black/15">
                <div className={cx(INNER, "flex flex-col items-center justify-between gap-4 py-5 text-[13px] text-white/85 min-[1280px]:flex-row")}>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        <a href={BRAND.phoneHref} className="inline-flex items-center gap-2 hover:text-white"><Phone size={14} /> {BRAND.phone}</a>
                        <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 hover:text-white"><Mail size={14} /> {BRAND.email}</a>
                        <span className="inline-flex items-center gap-2"><MapPin size={14} /> {BRAND.address}</span>
                    </div>
                    <p className="m-0 text-center">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
                    <nav aria-label="Legal" className="flex flex-wrap justify-center gap-5">
                        {LEGAL_LINKS.map((l) => <a key={l.href} href={l.href} className="hover:text-white">{l.label}</a>)}
                    </nav>
                </div>
            </div>
        </footer>
    );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function PublishingSimpleLandingPage() {
    return (
        /* reducedMotion="user": entrance animations and sliders respect the visitor's reduced-motion setting */
        <MotionConfig reducedMotion="user">
            <main
                id="top"
                className={cx(fontSerif.variable, fontSans.variable, "w-full overflow-hidden bg-white text-[#111318] antialiased [font-family:var(--font-ps-sans,'DM_Sans'),'DM_Sans',system-ui,sans-serif]")}
            >
                <Header />
                <Hero />
                <Stats />
                <Intro />
                <Services />
                <HowItWorks />
                <Portfolio />
                <Testimonials />
                <Faq />
                <FinalCta />
                <Footer />
                <QuotePopup />
            </main>
        </MotionConfig>
    );
}