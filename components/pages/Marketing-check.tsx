"use client";
import { useEffect, useRef, useState } from "react";
import {
    motion,
    useInView,
    useReducedMotion,
    Variants,
} from "framer-motion";
import { ArrowRight, Edit, Phone, Mail, ExternalLink, Check, PlayCircle } from "lucide-react";
import QuoteModal from "@/components/Quotemodal";

const CONTACT = {
    phone: "(279) 777-0380",
    phoneHref: "tel:2797770380",
    email: "info@bexleypublishing.com",
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(3px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: smoothEase },
    },
};

type Point = { title?: string; text: string };
type LinkItem = { label: string; href: string };
type VideoItem = { label: string; src: string; poster: string };

type Strategy = {
    id: string;
    nav: string;
    title: string;
    summary?: string;
    image?: string;
    alt: string;
    ratio: string;
    points: Point[];
    link?: LinkItem;
    videos?: VideoItem[];
    collaborator?: LinkItem;
};

const STRATEGIES: Strategy[] = [
    {
        id: "email-marketing",
        nav: "Email Marketing",
        title: "Email Marketing",
        image: "/images/marketing/Email-Marketing.jpg",
        alt: "Email marketing campaign for a book",
        ratio: "2000 / 1333",
        points: [
            { text: "Our email campaigns reach subscribers interested in your book's specific genre, ensuring your work is introduced to a relevant audience rather than sent to random recipients." },
            { text: "Create email content that highlights your book's unique story, key themes, and value to potential readers." },
            { text: "Strengthen your online presence by introducing your book to relevant audiences and building recognition for your author brand." },
        ],
        link: { label: "A glimpse of our mail list", href: "#mailing-list" },
    },
    {
        id: "book-signing",
        nav: "Book Signing Events",
        title: "Book Signing Events",
        image: "/images/marketing/Book-Signing-Event.jpg",
        alt: "Author signing books and greeting readers in a bookstore",
        ratio: "3504 / 2336",
        points: [
            { text: "Connect with readers in person, build meaningful relationships, and create memorable experiences around your book." },
            { text: "Support the organization of book signing events at suitable venues, helping you engage with your target audience." },
            { text: "Showcase your book through physical promotional materials and event-based marketing to increase awareness among potential readers." },
            { text: "Strengthen your reputation as an author through in-person interactions, networking opportunities, and community engagement." },
        ],
        collaborator: { label: "Global Book Exhibit", href: "https://globalbookfairs.com/" },
    },
    {
        id: "author-branding",
        nav: "Author Branding",
        title: "Author Branding & Promotional Materials",
        image: "/images/marketing/Author-Branding.jpg",
        alt: "Branded author gift box with book, bookmark, pen, and business card",
        ratio: "1 / 1",
        points: [
            { text: "Elevate your author brand with professionally designed stationery that reflects your unique identity and creates a consistent, recognizable image." },
            { text: "Incorporate your book cover, author logo, and brand elements into business cards, letterheads, bookmarks, and other promotional stationery." },
            { text: "Turn everyday interactions into opportunities to showcase your author identity and keep your book in the minds of potential readers." },
            { text: "Create polished, memorable stationery that reinforces your professionalism, supports networking, and helps you build meaningful connections with readers and industry professionals." },
        ],
    },
    {
        id: "times-square",
        nav: "Times Square",
        title: "Times Square Video Promotion",
        alt: "Book promotion on a Times Square digital billboard",
        ratio: "16 / 9",
        points: [
            { text: "Showcase your book and author brand on the digital billboards of Times Square, one of the world's most recognizable advertising destinations." },
            { text: "Present your book cover, author name, and promotional visuals through an engaging video designed to capture attention in a high-traffic environment." },
            { text: "Associate your author brand with a prominent public display, creating a memorable promotional experience and a shareable milestone." },
            { text: "Capture the moment and share your Times Square promotion across social media and digital platforms to extend its reach beyond the physical display." },
        ],
        videos: [
            { label: "Video 1", src: "/video/time-square-1.mp4", poster: "/video/time-square-1-poster.jpg" },
            { label: "Video 2", src: "/video/time-square-2.mp4", poster: "/video/time-square-2-poster.jpg" },
        ],
        collaborator: { label: "Glastonbury Publications", href: "https://glastonburypublications.com/" },
    },
    {
        id: "influencer-marketing",
        nav: "Influencer Marketing",
        title: "Influencer Marketing & Shark Tank Network Exposure",
        image: "/images/marketing/Influencer-Marketing.jpg",
        alt: "Influencer marketing on a laptop and phone",
        ratio: "1000 / 667",
        points: [
            { text: "Leverage promotional opportunities with influencers associated with Shark Tank to introduce your book and author brand to engaged audiences." },
            { text: "Present your book through carefully selected influencer collaborations designed to create awareness and spark interest among potential readers." },
            { text: "Utilize influencer-driven content, recommendations, and promotional features to showcase your book's unique message and connect with new audiences." },
            { text: "Extend your visibility beyond traditional marketing channels through strategic influencer exposure, helping you build awareness and strengthen your presence in the literary marketplace." },
        ],
    },
    {
        id: "author-of-the-month",
        nav: "Author of the Month",
        title: "Author of the Month Nominations on Global Platforms",
        image: "/images/marketing/Author-Month.jpg",
        alt: "Author proudly holding her published children's book",
        ratio: "1200 / 896",
        points: [
            { text: "Position your author brand for international recognition through Author of the Month nomination opportunities, helping showcase your literary work and connect with audiences beyond your local market." },
            { text: "Present your book for consideration in international Author of the Month nomination programs and literary recognition initiatives, subject to the platform's eligibility and selection process." },
            { text: "Support your author branding through nomination-related profiles, promotional features, or digital recognition where offered by the selected platform." },
            { text: "Use recognition opportunities as part of your broader marketing strategy to build awareness, share your literary journey, and connect with potential readers." },
        ],
        collaborator: { label: "Glastonbury Publications", href: "https://glastonburypublications.com/" },
    },
    {
        id: "book-to-screen",
        nav: "Book to Screen",
        title: "Book to Screen: Bringing Your Story to Life",
        summary:
            "Our Book-to-Screen services are designed to help authors explore the pathway from the written page to visual storytelling, from screenplay development to professional industry presentation.",
        image: "/images/marketing/Book-to-Screen.jpg",
        alt: "Reader turning the page of a digital book on a tablet",
        ratio: "612 / 407",
        points: [
            { title: "Book-to-Screen Adaptation", text: "Transform your published book into a professionally structured screenplay, adapting its characters, plot, dialogue, and narrative for film or television while preserving the heart of your original story." },
            { title: "Media Kit & Industry Presentation", text: "Develop a professional media kit featuring your book, author profile, story synopsis, character details, and adaptation concept to help present your project in a clear and compelling format." },
            { title: "Media House Submission & Outreach", text: "Assist in preparing and presenting your screenplay or adaptation proposal to relevant production companies, media houses, and industry contacts, subject to available opportunities and submission requirements." },
        ],
        collaborator: { label: "Glastonbury Publications", href: "https://glastonburypublications.com/" },
    },
    {
        id: "booktalk",
        nav: "BookTalk",
        title: "BookTalk",
        summary:
            "An opportunity to bring your story to life through meaningful conversations, author insights, and audience engagement.",
        image: "/images/marketing/BookTalk.jpg",
        alt: "Group of readers discussing books around a table",
        ratio: "612 / 408",
        points: [
            { title: "Author Storytelling & Live Discussions", text: "Present your book through engaging book talks, author discussions, and literary conversations that highlight your story, inspiration, and creative journey." },
            { text: "Create opportunities to interact with readers, answer questions, and build meaningful connections around your book and its message." },
            { text: "Use book talks as a platform to strengthen your public presence, showcase your expertise, and establish a recognizable identity within literary communities." },
        ],
    },
];

type ListRow = { genre: string; size: string; price?: string };
type ListGroup = { id: string; label: string; rows: ListRow[] };

const MAIL_LISTS: ListGroup[] = [
    {
        id: "romance",
        label: "Romance",
        rows: [
            { genre: "Romance Deal of the Day", size: "501,000–1,085,000", price: "$240" },
            { genre: "Steamy Contemporary Romance", size: "473,000", price: "$90" },
            { genre: "Romantic Comedy", size: "154,000", price: "$60" },
            { genre: "Sweet Contemporary Romance", size: "490,000", price: "$80" },
            { genre: "Romantic Suspense", size: "379,000", price: "$80" },
            { genre: "Historical Romance", size: "322,000", price: "$75" },
            { genre: "Paranormal Romance", size: "290,000", price: "$80" },
            { genre: "Erotic Romance", size: "243,000", price: "$80" },
        ],
    },
    {
        id: "speculative",
        label: "Fantasy / Horror / Science Fiction",
        rows: [
            { genre: "Fantasy / Paranormal Deal of the Day", size: "1,059,000" },
            { genre: "Fantasy / Paranormal", size: "498,000" },
            { genre: "LitRPG", size: "66,000" },
            { genre: "Science Fiction Deal of the Day", size: "842,000" },
            { genre: "Science Fiction", size: "427,000" },
            { genre: "Horror", size: "191,000" },
        ],
    },
    {
        id: "literature",
        label: "Literature / Religion / Travel",
        rows: [
            { genre: "Literary Fiction", size: "460,000" },
            { genre: "Women's Fiction", size: "348,000" },
            { genre: "Christian Fiction", size: "153,000" },
            { genre: "Historical Fiction", size: "197,000" },
            { genre: "Western", size: "94,000" },
            { genre: "Black Literature", size: "99,000" },
            { genre: "Travel", size: "200,000" },
            { genre: "Religion / Spirituality", size: "201,000" },
            { genre: "LGBTQ", size: "89,000" },
        ],
    },
    {
        id: "nonfiction",
        label: "Nonfiction",
        rows: [
            { genre: "Nonfiction", size: "247,000" },
            { genre: "History", size: "121,000" },
            { genre: "Self Help & How-to", size: "239,000" },
            { genre: "Cookbooks and Nutrition", size: "249,000" },
        ],
    },
    {
        id: "kids",
        label: "Kids & Teens",
        rows: [
            { genre: "Young Adult", size: "227,000" },
            { genre: "Children's", size: "113,000" },
        ],
    },
    {
        id: "mystery",
        label: "Mystery",
        rows: [
            { genre: "Mystery / Thriller / Cozy Deal of the Day", size: "1,037,000–1,522,000" },
            { genre: "Cozy Mystery", size: "380,000" },
            { genre: "Mystery", size: "636,000" },
            { genre: "Thriller", size: "575,000" },
        ],
    },
];

/* ═══════════════════════════════════════
   STRATEGY ROW
═══════════════════════════════════════ */
function StrategyRow({ s, reduce }: { s: Strategy; reduce: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [videoIndex, setVideoIndex] = useState(0);
    const video = s.videos?.[videoIndex];

    return (
        <article id={s.id} ref={ref} className="mp-row">
            <div className="mp-row-mediacol">
                <motion.div
                    className="mp-row-media"
                    style={{
                        aspectRatio: s.ratio,
                        // Cap the height without breaking the ratio (no black bars)
                        maxWidth: `calc(var(--mp-media-max-h) * (${s.ratio}))`,
                    }}
                    initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 24px)" }}
                    animate={inView ? { clipPath: "inset(0% 0% 0% 0% round 24px)" } : {}}
                    transition={{ duration: 1.1, ease: smoothEase }}
                >
                    {video ? (
                        <video
                            key={video.src}
                            src={video.src}
                            poster={video.poster}
                            autoPlay={!reduce}
                            muted
                            loop
                            playsInline
                            controls
                            preload="metadata"
                            aria-label={`${s.alt} (${video.label})`}
                        />
                    ) : (
                        <img src={s.image} alt={s.alt} loading="lazy" />
                    )}
                </motion.div>

                {s.videos && s.videos.length > 1 && (
                    <div className="mp-vtabs" role="group" aria-label="Choose video">
                        {s.videos.map((v, i) => (
                            <button
                                key={v.src}
                                type="button"
                                className="mp-video-link"
                                aria-pressed={videoIndex === i}
                                onClick={() => setVideoIndex(i)}
                            >
                                <PlayCircle size={18} />
                                {v.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <motion.div
                className="mp-row-body"
                variants={staggerContainer}
                initial={reduce ? "visible" : "hidden"}
                animate={inView ? "visible" : "hidden"}
            >
                <motion.h3 variants={fadeUp} className="mp-row-title">
                    {s.title}
                </motion.h3>
                {s.summary && (
                    <motion.p variants={fadeUp} className="mp-row-summary">
                        {s.summary}
                    </motion.p>
                )}
                <motion.ul variants={fadeUp} className="mp-points">
                    {s.points.map((p, i) => (
                        <li key={i}>
                            <span className="mp-check" aria-hidden="true">
                                <Check size={12} strokeWidth={3} />
                            </span>
                            <span>
                                {p.title && <strong>{p.title}: </strong>}
                                {p.text}
                            </span>
                        </li>
                    ))}
                </motion.ul>

                {s.link && (
                    <motion.a variants={fadeUp} href={s.link.href} className="mp-btn-ghost">
                        {s.link.label}
                        <ArrowRight size={14} />
                    </motion.a>
                )}

                {s.collaborator && (
                    <motion.p variants={fadeUp} className="mp-collab">
                        <span>
                            Our collaborator
                        </span>
                        <a href={s.collaborator.href} target="_blank" rel="noopener noreferrer">
                            {s.collaborator.label}
                            <ExternalLink size={13} />
                        </a>
                    </motion.p>
                )}
            </motion.div>
        </article>
    );
}

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
export default function MarketingProposal() {
    const reduce = useReducedMotion() ?? false;
    const [quoteModal, setQuoteModal] = useState(false);
    const [activeNav, setActiveNav] = useState(STRATEGIES[0].id);

    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });

    const introRef = useRef<HTMLDivElement>(null);
    const introInView = useInView(introRef, { once: true, margin: "-80px" });

    /* Highlight the strategy currently on screen in the sticky nav */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveNav(e.target.id);
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        STRATEGIES.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    /* Keep the active nav pill visible on small screens */
    useEffect(() => {
        const nav = document.querySelector<HTMLDivElement>(".mp-nav");
        const pill = nav?.querySelector<HTMLAnchorElement>(`a[data-id="${activeNav}"]`);
        if (!nav || !pill) return;
        const navRect = nav.getBoundingClientRect();
        const pillRect = pill.getBoundingClientRect();
        const left =
            nav.scrollLeft + (pillRect.left - navRect.left) - nav.clientWidth / 2 + pillRect.width / 2;
        // Scroll the pill bar sideways only — never the page itself
        nav.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
    }, [activeNav, reduce]);


    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700;900&display=swap');

                /* ═══════════════════════════════════════
                   BASE
                ═══════════════════════════════════════ */
                .mp {
                    --mp-red: #e8391d;
                    --mp-red-dark: #c0271a;
                    --mp-bg: #faf9f7;
                    --mp-ink: #000;
                    --mp-muted: #6b7280;
                    /* Paragraph text: darker for readability */
                    --mp-text: #000;
                    --mp-line: rgba(0,0,0,0.1);
                    /* Height of your site header, if it's sticky/fixed */
                    --mp-header-offset: 88px;
                    /* Height of MarketingNavbar overlaying the top of the hero */
                    --mp-navbar-height: 88px;
                    /* Tallest a strategy image/video may get */
                    --mp-media-max-h: 600px;

                    font-family: 'Raleway', Arial, sans-serif;
                    background: var(--mp-bg);
                    color: var(--mp-ink);
                    width: 100%;
                    overflow-x: clip;
                }

                .mp *:focus-visible {
                    outline: 3px solid var(--mp-red);
                    outline-offset: 3px;
                    border-radius: 6px;
                }

                .mp-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 64px;
                }

                .mp-label {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 32px;
                }
                .mp-label .line {
                    display: block;
                    height: 2px;
                    background: var(--mp-red);
                    flex-shrink: 0;
                }
                .mp-label .text {
                    color: var(--mp-red);
                    font-weight: 900;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.28em;
                }

                .mp-h2 {
                    font-weight: 900;
                    text-transform: uppercase;
                    line-height: 1.05;
                    font-size: clamp(1.6rem, 3.2vw, 3rem);
                    margin: 0 0 24px;
                }
                .mp-h2 .accent { color: var(--mp-red); }

                .mp-body {
                    color: var(--mp-text);
                    line-height: 1.85;
                    font-size: clamp(0.95rem, 1.25vw, 1.1rem);
                    margin: 0 0 20px;
                    max-width: 62ch;
                }

                /* Buttons (same as About section) */
                .mp-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: var(--mp-red);
                    color: #fff;
                    font-family: inherit;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 16px 32px;
                    border: 0;
                    border-radius: 12px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.2s ease, gap 0.2s ease;
                }
                .mp-btn-primary:hover { background: var(--mp-red-dark); gap: 14px; }

                .mp-btn-ghost {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    align-self: flex-start;
                    color: inherit;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border-bottom: 2px solid currentColor;
                    border-color: rgba(0,0,0,0.2);
                    padding-bottom: 4px;
                    text-decoration: none;
                    transition: color 0.2s ease, border-color 0.2s ease, gap 0.2s ease;
                }
                .mp-btn-ghost:hover { color: var(--mp-red); border-color: var(--mp-red); gap: 12px; }

                /* ═══════════════════════════════════════
                   HERO
                ═══════════════════════════════════════ */
                .mp-hero {
                    position: relative;
                    background: #000;
                    color: #fff;
                    overflow: hidden;
                }
                .mp-hero-grid {
                    margin-top: var(--mp-navbar-height);
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    gap: 72px;
                    align-items: center;
                    padding-top: 120px;
                    padding-bottom: 120px;
                }
                .mp-hero h1 {
                    font-weight: 900;
                    text-transform: uppercase;
                    line-height: 0.98;
                    font-size: clamp(2.2rem, 5.4vw, 5rem);
                    margin: 0 0 28px;
                }
                .mp-hero h1 .accent { color: var(--mp-red); display: block; }
                .mp-hero .mp-body { color: rgba(255,255,255,0.85); }
                .mp-hero .mp-btn-ghost { border-color: rgba(255,255,255,0.3); }
                .mp-hero .mp-btn-ghost:hover { color: var(--mp-red); border-color: var(--mp-red); }
                .mp-hero-ctas {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 24px;
                    margin-top: 40px;
                }
                .mp-hero-media {
                    position: relative;
                    aspect-ratio: 4 / 5;
                }
                .mp-hero-media::before {
                    content: "";
                    position: absolute;
                    inset: 24px -24px -24px 24px;
                    border: 2px solid var(--mp-red);
                    border-radius: 24px;
                }
                .mp-hero-media img {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    /* contain = whole image visible, nothing cut off */
                    object-fit: contain;
                    object-position: center;
                    border-radius: 24px;
                }

                /* ═══════════════════════════════════════
                   INTRO
                ═══════════════════════════════════════ */
                .mp-intro { padding: 112px 0 96px; }
                .mp-intro-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: start;
                }
                .mp-questions {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                .mp-questions li {
                    font-weight: 700;
                    font-size: clamp(1.05rem, 1.5vw, 1.35rem);
                    line-height: 1.45;
                    padding: 22px 0 22px 24px;
                    border-left: 3px solid var(--mp-line);
                    transition: border-color 0.3s ease;
                }
                .mp-questions li:hover { border-color: var(--mp-red); }
                .mp-fusion {
                    margin-top: 28px;
                    font-weight: 900;
                    text-transform: uppercase;
                    font-size: clamp(1rem, 1.4vw, 1.25rem);
                    line-height: 1.35;
                    color: var(--mp-red);
                }

                /* ═══════════════════════════════════════
                   STICKY STRATEGY NAV
                ═══════════════════════════════════════ */
                .mp-nav-wrap {
                    position: sticky;
                    top: var(--mp-header-offset);
                    z-index: 20;
                    background: rgba(250,249,247,0.92);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-top: 1px solid var(--mp-line);
                    border-bottom: 1px solid var(--mp-line);
                }
                .mp-nav {
                    display: flex;
                    gap: 8px;
                    overflow-x: auto;
                    scrollbar-width: none;
                    padding-top: 14px;
                    padding-bottom: 14px;
                }
                .mp-nav::-webkit-scrollbar { display: none; }
                .mp-nav a {
                    flex-shrink: 0;
                    font-weight: 700;
                    font-size: 13px;
                    color: var(--mp-muted);
                    text-decoration: none;
                    padding: 9px 16px;
                    border-radius: 999px;
                    border: 1px solid transparent;
                    transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
                }
                .mp-nav a:hover { color: var(--mp-ink); border-color: var(--mp-line); }
                .mp-nav a[aria-current="true"] {
                    background: var(--mp-ink);
                    color: #fff;
                }

                /* ═══════════════════════════════════════
                   STRATEGY ROWS
                ═══════════════════════════════════════ */
                .mp-strategies { padding: 96px 0 40px; }
                .mp-strategies-head { max-width: 760px; margin-bottom: 80px; }

                .mp-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                    padding: 56px 0;
                    scroll-margin-top: calc(var(--mp-header-offset) + 90px);
                }
                .mp-row + .mp-row { border-top: 1px solid var(--mp-line); }
                .mp-row:nth-child(even) .mp-row-mediacol { order: 2; }
                .mp-row-mediacol { min-width: 0; }

                .mp-row-media {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    width: 100%;
                    margin: 0 auto;
                    background: #000;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.12);
                }
                .mp-row-media img,
                .mp-row-media video {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    /* Box matches each file's own ratio; contain guarantees no cropping */
                    object-fit: contain;
                }

                .mp-row-body { display: flex; flex-direction: column; }
                .mp-row-title {
                    font-weight: 900;
                    text-transform: uppercase;
                    line-height: 1.1;
                    font-size: clamp(1.3rem, 2.2vw, 2rem);
                    margin: 0 0 14px;
                }
                .mp-row-summary {
                    font-weight: 500;
                    font-size: clamp(1rem, 1.3vw, 1.15rem);
                    line-height: 1.6;
                    color: #000;
                    margin: 0 0 24px;
                }
                .mp-points {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 28px;
                    display: grid;
                    gap: 14px;
                }
                .mp-points li {
                    display: flex;
                    gap: 14px;
                    color: var(--mp-text);
                    line-height: 1.7;
                    font-size: clamp(0.9rem, 1.1vw, 1rem);
                }
                .mp-points strong { color: var(--mp-ink); font-weight: 700; }
                .mp-vtabs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 16px;
                }
                .mp-video-link {
                    font-family: inherit;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 700;
                    font-size: 14px;
                    color: var(--mp-ink);
                    text-decoration: none;
                    background: #fff;
                    border: 1px solid var(--mp-line);
                    border-radius: 999px;
                    padding: 10px 18px 10px 12px;
                    transition: border-color 0.2s ease, color 0.2s ease;
                }
                .mp-video-link svg { color: var(--mp-red); }
                .mp-video-link:hover { border-color: var(--mp-red); color: var(--mp-red); }
                .mp-video-link[aria-pressed="true"] { background: var(--mp-ink); border-color: var(--mp-ink); color: #fff; }

                .mp-collab {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: baseline;
                    gap: 6px 12px;
                    margin: 24px 0 0;
                    padding-top: 20px;
                    border-top: 1px solid var(--mp-line);
                    font-size: 14px;
                }
                .mp-collab span { color: var(--mp-muted); font-weight: 500; }
                .mp-collab a {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 700;
                    color: var(--mp-ink);
                    text-decoration: none;
                    border-bottom: 2px solid var(--mp-red);
                    padding-bottom: 1px;
                }
                .mp-collab a:hover { color: var(--mp-red); }

                .mp-check {
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    width: 22px;
                    height: 22px;
                    margin-top: 2px;
                    border-radius: 50%;
                    background: var(--mp-red);
                    color: #fff;
                }

                /* ═══════════════════════════════════════
                   MAILING LIST
                ═══════════════════════════════════════ */
                .mp-lists {
                    padding: 112px 0;
                    scroll-margin-top: calc(var(--mp-header-offset) + 20px);
                }
                .mp-lists-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 32px;
                    align-items: start;
                }
                .mp-list-card {
                    background: #fff;
                    border-radius: 20px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.07);
                    overflow: hidden;
                    scroll-margin-top: calc(var(--mp-header-offset) + 90px);
                    /* keep a genre's heading and table on the same PDF page */
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                .mp-list-heading {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 0;
                    padding: 22px 24px;
                    font-weight: 900;
                    font-size: clamp(1rem, 1.3vw, 1.2rem);
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    line-height: 1.25;
                    color: var(--mp-ink);
                    border-bottom: 3px solid var(--mp-red);
                }
                .mp-list-heading::before {
                    content: "";
                    width: 10px;
                    height: 10px;
                    flex-shrink: 0;
                    border-radius: 2px;
                    background: var(--mp-red);
                }
                .mp-table-wrap { overflow-x: auto; }
                .mp-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .mp-table th {
                    text-align: left;
                    font-weight: 900;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.18em;
                    color: #fff;
                    background: var(--mp-ink);
                    padding: 14px 24px;
                }
                .mp-table td {
                    padding: 14px 24px;
                    font-size: 15px;
                    color: var(--mp-text);
                    border-bottom: 1px solid var(--mp-line);
                }
                .mp-table tr:last-child td { border-bottom: 0; }
                .mp-table td:first-child { font-weight: 700; }
                .mp-table td.mp-size { font-variant-numeric: tabular-nums; white-space: nowrap; }
                .mp-table td.mp-price {
                    font-weight: 900;
                    color: var(--mp-red);
                    font-variant-numeric: tabular-nums;
                }
                .mp-table th:not(:first-child),
                .mp-table td:not(:first-child) { text-align: right; }
                .mp-note {
                    margin-top: 24px;
                    font-size: 13px;
                    color: var(--mp-text);
                }

                /* ═══════════════════════════════════════
                   CLOSING CTA
                ═══════════════════════════════════════ */
                .mp-cta {
                    background: var(--mp-red);
                    color: #fff;
                    padding: 112px 0;
                    position: relative;
                    overflow: hidden;
                }
                .mp-cta-grid {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    gap: 64px;
                    align-items: end;
                }
                .mp-cta h2 {
                    font-weight: 900;
                    text-transform: uppercase;
                    line-height: 1;
                    font-size: clamp(2rem, 4.6vw, 4.2rem);
                    margin: 0;
                }
                .mp-cta p {
                    color: rgba(255,255,255,0.95);
                    line-height: 1.8;
                    font-size: clamp(0.95rem, 1.2vw, 1.1rem);
                    margin: 0 0 32px;
                }
                .mp-cta p.mp-cta-lead {
                    color: #fff;
                    font-weight: 700;
                    font-size: clamp(1.1rem, 1.6vw, 1.45rem);
                    line-height: 1.4;
                    margin-bottom: 16px;
                }
                .mp-cta p strong { font-weight: 700; color: #fff; }
                .mp-cta .mp-btn-primary { background: #000; }
                .mp-cta .mp-btn-primary:hover { background: #222; }
                .mp-cta-contact {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px 28px;
                    margin-top: 28px;
                }
                .mp-cta-contact a {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #fff;
                    font-weight: 700;
                    font-size: 14px;
                    text-decoration: none;
                    border-bottom: 1px solid rgba(255,255,255,0.4);
                    padding-bottom: 2px;
                }
                .mp-cta-contact a:hover { border-color: #fff; }

                /* ═══════════════════════════════════════
                   2400px+ — 4K
                ═══════════════════════════════════════ */
                @media (min-width: 2400px) {
                    .mp-inner { max-width: 2200px; padding: 0 160px; }
                    .mp { --mp-media-max-h: 960px; }
                    .mp-hero-grid { padding-top: 200px; padding-bottom: 200px; gap: 140px; }
                    .mp-hero h1 { font-size: clamp(5rem, 4.6vw, 8rem); }
                    .mp-h2 { font-size: clamp(3rem, 3vw, 5rem); }
                    .mp-body { font-size: clamp(1.3rem, 1.1vw, 1.7rem); }
                    .mp-row { gap: 160px; padding: 96px 0; }
                    .mp-row-title { font-size: 3rem; }
                    .mp-row-summary { font-size: 1.5rem; }
                    .mp-points li { font-size: 1.3rem; }
                    .mp-nav a { font-size: 17px; padding: 12px 22px; }
                    .mp-lists-grid { gap: 48px; }
                    .mp-list-heading { font-size: 1.6rem; padding: 30px 32px; }
                    .mp-table td { font-size: 20px; padding: 20px 32px; }
                    .mp-table th { font-size: 14px; padding: 18px 32px; }
                    .mp-btn-primary { font-size: 16px; padding: 22px 52px; border-radius: 18px; }
                    .mp-btn-ghost { font-size: 16px; }
                    .mp-cta h2 { font-size: 7rem; }
                    .mp-cta p { font-size: 1.5rem; }
                }

                /* ═══════════════════════════════════════
                   1800–2399px — Full HD
                ═══════════════════════════════════════ */
                @media (min-width: 1800px) and (max-width: 2399px) {
                    .mp-inner { max-width: 1680px; padding: 0 120px; }
                    .mp { --mp-media-max-h: 720px; }
                    .mp-hero-grid { padding-top: 160px; padding-bottom: 160px; gap: 110px; }
                    .mp-row { gap: 120px; padding: 72px 0; }
                    .mp-lists-grid { gap: 40px; }
                    .mp-btn-primary { font-size: 14px; padding: 20px 44px; border-radius: 16px; }
                    .mp-btn-ghost { font-size: 14px; }
                }

                /* ═══════════════════════════════════════
                   1400–1799px — Large desktop
                ═══════════════════════════════════════ */
                @media (min-width: 1400px) and (max-width: 1799px) {
                    .mp-inner { max-width: 1320px; padding: 0 80px; }
                    .mp-row { gap: 96px; }
                }

                /* ═══════════════════════════════════════
                   901–1199px — Small laptop
                ═══════════════════════════════════════ */
                @media (min-width: 901px) and (max-width: 1199px) {
                    .mp-inner { padding: 0 48px; }
                    .mp-hero-grid { gap: 48px; padding-top: 96px; padding-bottom: 96px; }
                    .mp-intro-grid, .mp-row { gap: 56px; }
                    .mp-lists-grid { gap: 24px; }
                    .mp-table td, .mp-table th { padding-left: 18px; padding-right: 18px; }
                }

                /* ═══════════════════════════════════════
                   ≤900px — Tablet
                ═══════════════════════════════════════ */
                /* Navbar is 72px tall below 1024px */
                @media (max-width: 1023px) {
                    .mp { --mp-navbar-height: 72px; --mp-header-offset: 72px; }
                }

                @media (max-width: 900px) {
                    .mp-inner { padding: 0 40px; }
                    .mp-hero-grid,
                    .mp-intro-grid,
                    .mp-row,
                    .mp-cta-grid {
                        grid-template-columns: 1fr;
                        gap: 48px;
                    }
                    .mp-hero-grid { padding-top: 80px; padding-bottom: 96px; }
                    .mp-hero-media { aspect-ratio: 16 / 10; max-width: 640px; }
                    .mp-row:nth-child(even) .mp-row-mediacol { order: 0; }
                    .mp-row { gap: 32px; padding: 48px 0; }
                    .mp-intro { padding: 80px 0 64px; }
                    .mp-strategies { padding: 72px 0 24px; }
                    .mp-strategies-head { margin-bottom: 40px; }
                    .mp-lists { padding: 80px 0; }

                    /* Genres stack in one column */
                    .mp-lists-grid { grid-template-columns: 1fr; gap: 24px; }
                    .mp-cta { padding: 80px 0; }
                }

                /* ═══════════════════════════════════════
                   ≤640px — Mobile
                ═══════════════════════════════════════ */
                @media (max-width: 640px) {
                    .mp-inner { padding: 0 20px; }
                    .mp-hero-grid { padding-top: 56px; padding-bottom: 72px; gap: 40px; }
                    .mp-hero-media::before { inset: 14px -10px -14px 10px; border-radius: 16px; }
                    .mp-hero-media img { border-radius: 16px; }
                    .mp-hero-ctas {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 18px;
                        margin-top: 28px;
                    }
                    .mp-hero-ctas .mp-btn-primary,
                    .mp-cta .mp-btn-primary {
                        width: 100%;
                        justify-content: center;
                        padding: 14px 24px;
                    }
                    .mp-label { margin-bottom: 20px; }
                    .mp-label .text { font-size: 9px; letter-spacing: 0.2em; }
                    .mp-questions li { padding: 16px 0 16px 18px; }
                    .mp-nav { padding-top: 10px; padding-bottom: 10px; }
                    .mp-nav a { font-size: 12px; padding: 8px 14px; }
                    .mp-row-media { border-radius: 16px; }
                    .mp-points li { gap: 12px; }
                    .mp-table td, .mp-table th { padding: 12px 16px; }
                    .mp-table td { font-size: 14px; }
                    .mp-list-heading { padding: 18px 16px; }
                    .mp-lists { padding: 64px 0; }
                    .mp-cta { padding: 64px 0; }
                }

                /* ═══════════════════════════════════════
                   ≤380px — Small mobile
                ═══════════════════════════════════════ */
                @media (max-width: 380px) {
                    .mp-inner { padding: 0 14px; }
                    .mp-hero h1 { font-size: 1.9rem; }
                    .mp-btn-primary { font-size: 10px; padding: 12px 18px; border-radius: 10px; }
                    .mp-btn-ghost { font-size: 10px; }
                    .mp-body { font-size: 0.85rem; }
                    .mp-points li { font-size: 0.85rem; }
                }

                /* ═══════════════════════════════════════
                   PRINT / PDF
                ═══════════════════════════════════════ */
                @media print {
                    .mp-nav-wrap, .mp-vtabs { display: none !important; }
                    .mp-lists { padding: 24px 0; }
                    .mp-lists-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
                    .mp-list-card { box-shadow: none; border: 1px solid #ddd; }
                    .mp-table th {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .mp *, .mp *::before, .mp *::after {
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                }
            `}</style>

            <main className="mp">
                <section className="mp-hero" ref={heroRef}>
                    <motion.div
                        initial={reduce ? false : { width: "0%" }}
                        animate={heroInView ? { width: "100%" } : {}}
                        transition={{ duration: 1.5, ease: smoothEase }}
                        style={{ height: "4px", background: "#e8391d" }}
                    />
                    <div className="mp-inner mp-hero-grid">
                        <motion.div
                            variants={staggerContainer}
                            initial={reduce ? "visible" : "hidden"}
                            animate={heroInView ? "visible" : "hidden"}
                        >
                            <motion.div variants={fadeUp} className="mp-label">
                                <span className="line" style={{ width: 40 }} />
                                <span className="text">Marketing Solutions</span>
                            </motion.div>

                            <motion.h1
                                variants={{
                                    hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 30 },
                                    visible: {
                                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        y: 0,
                                        transition: { duration: 0.9, ease: smoothEase },
                                    },
                                }}
                            >
                                Marketing &amp; Promotional
                                <span className="accent">Campaigns</span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="mp-body">
                                Publishing your book is the first chapter. Our marketing team builds a
                                campaign around your story, combining email, events, influencers,
                                branding, and big-screen exposure, so the right readers find it.
                            </motion.p>

                            <motion.div variants={fadeUp} className="mp-hero-ctas">
                                <button
                                    type="button"
                                    className="mp-btn-primary"
                                    onClick={() => setQuoteModal(true)}
                                >
                                    <Edit size={16} />
                                    Get Your Proposal
                                </button>
                                <a href={CONTACT.phoneHref} className="mp-btn-ghost">
                                    <Phone size={14} />
                                    {CONTACT.phone}
                                </a>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="mp-hero-media"
                            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1.2, delay: 0.3, ease: smoothEase }}
                        >
                            <img src="/images/marketing/Hero.png" alt="Author holding a newly published book" />
                        </motion.div>
                    </div>
                </section>

                <section className="mp-intro" ref={introRef}>
                    <div className="mp-inner mp-intro-grid">
                        <motion.div
                            variants={staggerContainer}
                            initial={reduce ? "visible" : "hidden"}
                            animate={introInView ? "visible" : "hidden"}
                        >
                            <motion.h2 variants={fadeUp} className="mp-h2">
                                Book marketing that{" "}
                                <span className="accent">makes a difference.</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="mp-body">
                                At Bexley Publishing, we understand the power of the digital world and
                                the opportunities it offers authors to expand their reach. However, at
                                the same time, we recognize that traditional marketing strategies
                                continue to play an important role in building brand awareness and
                                creating lasting visibility.
                            </motion.p>
                            <motion.p variants={fadeUp} className="mp-fusion">
                                That&apos;s why we propose a strategic fusion of digital and
                                traditional marketing.
                            </motion.p>
                        </motion.div>

                        <motion.ul
                            className="mp-questions"
                            variants={staggerContainer}
                            initial={reduce ? "visible" : "hidden"}
                            animate={introInView ? "visible" : "hidden"}
                        >
                            {[
                                "Your publishing company may have provided you with marketing strategies, but have those efforts translated into meaningful book sales?",
                                "Have they helped your book stand out in an increasingly competitive marketplace?",
                                "More importantly, have they strengthened your visibility and connected your work with the right audience?",
                            ].map((q) => (
                                <motion.li key={q} variants={fadeUp}>
                                    {q}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </section>

                <nav className="mp-nav-wrap" aria-label="Marketing strategies">
                    <div className="mp-inner mp-nav">
                        {STRATEGIES.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                data-id={s.id}
                                aria-current={activeNav === s.id ? "true" : undefined}
                            >
                                {s.nav}
                            </a>
                        ))}
                        <a href="#mailing-list" data-id="mailing-list">
                            Mailing Lists
                        </a>
                    </div>
                </nav>

                <section className="mp-strategies">
                    <div className="mp-inner">
                        <div className="mp-strategies-head">
                            <div className="mp-label">
                                <span className="line" style={{ width: 40 }} />
                                <span className="text">Your Campaign</span>
                            </div>
                            <h2 className="mp-h2">
                                A tried-and-tested{" "}
                                <span className="accent">strategic combination.</span>
                            </h2>
                            <p className="mp-body">
                                Here is a tried-and-tested, strategic combination to create a
                                well-rounded marketing approach for your utmost visibility and promotion.
                            </p>
                        </div>

                        {STRATEGIES.map((s) => (
                            <StrategyRow key={s.id} s={s} reduce={reduce} />
                        ))}
                    </div>
                </section>

                <section id="mailing-list" className="mp-lists">
                    <div className="mp-inner">
                        <div className="mp-label">
                            <span className="line" style={{ width: 40 }} />
                            <span className="text">Our Mailing Lists</span>
                        </div>
                        <h2 className="mp-h2" style={{ maxWidth: 760 }}>
                            A glimpse of{" "}
                            <span className="accent">our mail list.</span>
                        </h2>
                        <p className="mp-body" style={{ marginBottom: 48 }}>
                            Subscriber lists by genre, so your book reaches readers who already
                            love books like yours.
                        </p>

                        <div className="mp-lists-grid">
                            {MAIL_LISTS.map((l) => {
                                const hasPrice = l.rows.some((r) => r.price);
                                return (
                                    <article
                                        key={l.id}
                                        id={`mailing-list-${l.id}`}
                                        className="mp-list-card"
                                        aria-labelledby={`list-title-${l.id}`}
                                    >
                                        <h3 id={`list-title-${l.id}`} className="mp-list-heading">
                                            {l.label}
                                        </h3>
                                        <div className="mp-table-wrap">
                                            <table className="mp-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Genre</th>
                                                        <th scope="col">List size</th>
                                                        {hasPrice && <th scope="col">Price</th>}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {l.rows.map((r) => (
                                                        <tr key={r.genre}>
                                                            <td>{r.genre}</td>
                                                            <td className="mp-size">{r.size}</td>
                                                            {hasPrice && (
                                                                <td className="mp-price">{r.price ?? "—"}</td>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                        <p className="mp-note">
                            Contact us for pricing on lists without a listed price.
                        </p>
                    </div>
                </section>

                <section className="mp-cta">
                    <div className="mp-inner mp-cta-grid">
                        <h2>
                            Your story deserves more than a place on the shelf.
                        </h2>
                        <div>
                            <p className="mp-cta-lead">
                                It deserves opportunities to be discovered, shared, and remembered.
                            </p>
                            <p>
                                <strong>
                                    Let&apos;s work together to expand your reach, strengthen your
                                    author brand, and explore the possibilities that lie beyond the page.
                                </strong>
                            </p>
                            <button
                                type="button"
                                className="mp-btn-primary"
                                onClick={() => setQuoteModal(true)}
                            >
                                <Edit size={16} />
                                Get Your Proposal
                            </button>
                            <div className="mp-cta-contact">
                                <a href={CONTACT.phoneHref}>
                                    <Phone size={14} /> {CONTACT.phone}
                                </a>
                                <a href={`mailto:${CONTACT.email}`}>
                                    <Mail size={14} /> {CONTACT.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />
            </main>
        </>
    );
}
