import type { ReactNode } from "react";
import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import Navbar2 from "@/components/Navbar2";

export const metadata: Metadata = {
    title: "Refund Policy | Bexley Publishing",
    description:
        "Understand when Bexley Publishing offers full or partial refunds, how cancellations work, and how to request a refund.",
};

const LAST_UPDATED = "September 22, 2026";
const COMPANY = "Bexley Publishing";
const EMAIL = "info@bexleypublishing.com";
const PHONE_DISPLAY = "(279) 777-0380";
const PHONE_HREF = "tel:2797770380";
// Adjust these to match your actual refund terms
const REFUND_REQUEST_DAYS = 14;
const PROCESSING_DAYS = "7 to 10 business days";

type Section = { id: string; title: string; body: ReactNode };

const sections: Section[] = [
    {
        id: "overview",
        title: "Overview",
        body: (
            <>
                <p>
                    At {COMPANY}, we want you to feel confident about investing in your book. This policy
                    explains when you can get a full or partial refund, how cancellations work, and how to
                    make a request.
                </p>
                <p>
                    If your service agreement includes different refund terms, the agreement takes priority.
                </p>
            </>
        ),
    },
    {
        id: "satisfaction",
        title: "Our satisfaction commitment",
        body: (
            <p>
                Before any refund, we will always try to fix the problem first. If you are unhappy with a
                draft or design, tell us what is wrong and we will revise it within the rounds included in
                your package. Most concerns are resolved this way.
            </p>
        ),
    },
    {
        id: "full-refund",
        title: "When you can get a full refund",
        body: (
            <>
                <p>You are eligible for a full refund if:</p>
                <ul>
                    <li>You cancel before any work has started on your project.</li>
                    <li>We are unable to start your project within the timeline agreed in your proposal.</li>
                    <li>You were charged twice or billed by mistake.</li>
                </ul>
            </>
        ),
    },
    {
        id: "partial-refund",
        title: "When you can get a partial refund",
        body: (
            <>
                <p>
                    If you cancel after work has started, you can get a refund for the parts of the project
                    that have not been delivered yet. We deduct the cost of work already completed, based on
                    the milestones in your proposal. For example:
                </p>
                <ul>
                    <li>
                        <strong>Writing and editing.</strong> Chapters or editing passes already delivered are
                        non-refundable. Remaining chapters or passes are refunded.
                    </li>
                    <li>
                        <strong>Cover design.</strong> Once initial concepts are delivered, the design fee is
                        non-refundable.
                    </li>
                    <li>
                        <strong>Publishing.</strong> Once your book has been formatted or submitted to a
                        platform, the publishing fee is non-refundable.
                    </li>
                    <li>
                        <strong>Marketing.</strong> Campaigns already launched and ad spend already paid to
                        third parties are non-refundable. Unused campaign time is refunded.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "non-refundable",
        title: "What is not refundable",
        body: (
            <>
                <p>We cannot refund:</p>
                <ul>
                    <li>Work you have already approved.</li>
                    <li>Projects that are completed and delivered.</li>
                    <li>
                        Third-party costs paid for your project, such as ISBNs, copyright registration, printing,
                        stock images, and advertising spend.
                    </li>
                    <li>
                        Requests based on sales, reviews, rankings, or other results, which we cannot guarantee.
                    </li>
                    <li>
                        Projects paused for more than 60 days because we did not receive feedback or materials
                        from you.
                    </li>
                    <li>Changes of mind after work has been delivered.</li>
                </ul>
            </>
        ),
    },
    {
        id: "cancellation",
        title: "Cancelling a project",
        body: (
            <p>
                You can cancel your project at any time by emailing us in writing. We will stop work as soon
                as we receive your notice, send you any work completed so far, and calculate any refund owed
                based on the sections above.
            </p>
        ),
    },
    {
        id: "how-to-request",
        title: "How to request a refund",
        body: (
            <>
                <p>
                    Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> within {REFUND_REQUEST_DAYS} days of the
                    delivery or issue you are raising. Please include:
                </p>
                <ul>
                    <li>Your full name and the email address used for your project.</li>
                    <li>Your project or invoice number.</li>
                    <li>The reason for your request.</li>
                </ul>
                <p>We will review your request and reply within 5 business days.</p>
            </>
        ),
    },
    {
        id: "processing",
        title: "Processing time",
        body: (
            <p>
                Approved refunds are sent back to your original payment method within {PROCESSING_DAYS}.
                Depending on your bank or card provider, it may take a few extra days to appear in your
                account.
            </p>
        ),
    },
    {
        id: "chargebacks",
        title: "Chargebacks",
        body: (
            <p>
                Please contact us before filing a dispute with your bank or card provider. We can usually
                resolve issues faster directly. If a chargeback is filed without contacting us first, we may
                pause work on your project until it is resolved.
            </p>
        ),
    },
    {
        id: "changes",
        title: "Changes to this policy",
        body: (
            <p>
                We may update this policy from time to time. When we do, we will change the "Last updated"
                date at the top of this page. The policy in place when you signed your agreement applies to
                your project.
            </p>
        ),
    },
    {
        id: "contact",
        title: "Contact us",
        body: (
            <p>
                Questions about refunds? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{" "}
                <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>. You can also read our{" "}
                <Link href="/terms-of-use">Terms of Use</Link>.
            </p>
        ),
    },

];

const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap');

    html { scroll-behavior: smooth; }

    @keyframes pp-fade-up {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    .pp-anim { opacity: 0; animation: pp-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .pp-d0 { animation-delay: 0.1s; }
    .pp-d1 { animation-delay: 0.2s; }
    .pp-d2 { animation-delay: 0.3s; }
    .pp-d3 { animation-delay: 0.4s; }
    .pp-d4 { animation-delay: 0.5s; }

    .pp-page {
        font-family: 'Raleway', Arial, sans-serif;
        min-height: 100vh;
        width: 100%;
        position: relative;
        background: #0d0d0d;
        color: rgba(255,255,255,0.7);
        overflow-x: clip;
    }

    .pp-glow {
        position: absolute;
        inset: 0;
        background:
            radial-gradient(ellipse 700px 500px at 15% 10%, rgba(232,57,29,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 500px 400px at 85% 0%, rgba(232,57,29,0.05) 0%, transparent 70%);
        pointer-events: none;
    }

    .pp-grid-bg {
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 60px 60px;
        mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
        -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
        pointer-events: none;
    }

    .pp-stripe {
        position: absolute;
        top: 0; left: 0; bottom: 0;
        width: 4px;
        background: #e8391d;
    }

    .pp-inner {
        position: relative;
        z-index: 10;
        max-width: 1240px;
        margin: 0 auto;
        padding: 100px 24px;
    }

    /* Hero */
    .pp-hero { text-align: center; max-width: 680px; margin: 0 auto 72px; }

    .pp-marker { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 24px; }
    .pp-marker-line { width: 28px; height: 2px; background: #e8391d; display: block; }
    .pp-marker-text {
        color: #e8391d;
        font-weight: 900;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
    }

    .pp-heading {
        font-weight: 900;
        color: white;
        text-transform: uppercase;
        line-height: 1;
        font-size: clamp(2.4rem, 6vw, 4.5rem);
        margin: 0 0 20px;
    }
    .pp-heading .accent { color: #e8391d; }

    .pp-sub {
        color: rgba(255,255,255,0.5);
        font-size: 1.05rem;
        line-height: 1.8;
        max-width: 520px;
        margin: 0 auto 24px;
    }

    .pp-updated {
        display: inline-block;
        color: rgba(255,255,255,0.45);
        font-size: 12px;
        font-weight: 600;
        padding: 8px 16px;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 999px;
        background: rgba(255,255,255,0.04);
    }
    .pp-updated strong { color: white; font-weight: 700; }

    /* Layout */
    .pp-layout {
        display: grid;
        grid-template-columns: 260px minmax(0, 1fr);
        gap: 56px;
        align-items: start;
    }

    /* Table of contents */
    .pp-toc {
        position: sticky;
        top: 100px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        padding: 24px 12px 24px 20px;
        max-height: calc(100vh - 140px);
        overflow-y: auto;
    }

    .pp-toc-title {
        color: rgba(255,255,255,0.35);
        font-size: 10px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.28em;
        margin: 0 0 16px;
    }

    .pp-toc ol { list-style: none; margin: 0; padding: 0; }

    .pp-toc a {
        display: block;
        padding: 7px 10px;
        margin-left: -10px;
        border-left: 2px solid transparent;
        color: rgba(255,255,255,0.45);
        font-size: 13px;
        font-weight: 600;
        line-height: 1.4;
        text-decoration: none;
        transition: color 0.2s ease, border-color 0.2s ease;
    }
    .pp-toc a:hover { color: white; border-left-color: #e8391d; }

    /* Content */
    .pp-content {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        padding: 48px 56px;
    }

    .pp-section {
        scroll-margin-top: 100px;
        padding-bottom: 36px;
        margin-bottom: 36px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .pp-section:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }

    .pp-section h2 {
        color: white;
        font-size: 1.35rem;
        font-weight: 800;
        line-height: 1.3;
        margin: 0 0 16px;
        transition: color 0.3s ease;
    }
    .pp-section:target h2 { color: #ff6b4a; }

    .pp-section p,
    .pp-section li {
        font-size: 15px;
        line-height: 1.8;
        color: rgba(255,255,255,0.62);
        max-width: 68ch;
    }
    .pp-section p { margin: 0 0 14px; }
    .pp-section p:last-child { margin-bottom: 0; }

    .pp-section ul { list-style: none; margin: 0 0 14px; padding: 0; }
    .pp-section li { position: relative; padding-left: 22px; margin-bottom: 10px; }
    .pp-section li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.75em;
        width: 8px;
        height: 2px;
        background: #e8391d;
    }

    .pp-section strong { color: white; font-weight: 700; }
    .pp-section a { color: #ff6b4a; text-decoration: underline; text-underline-offset: 3px; }
    .pp-section a:hover { color: white; }

    .pp-page a:focus-visible { outline: 2px solid #ff6b4a; outline-offset: 3px; border-radius: 4px; }

    /* Responsive */
    @media (max-width: 960px) {
        .pp-layout { grid-template-columns: 1fr; gap: 32px; }
        .pp-toc { position: static; max-height: none; }
        .pp-toc ol { columns: 2; column-gap: 24px; }
        .pp-toc li { break-inside: avoid; }
    }

    @media (max-width: 640px) {
        .pp-inner { padding: 64px 16px 72px; }
        .pp-hero { margin-bottom: 48px; }
        .pp-heading { font-size: clamp(2rem, 10vw, 3rem); }
        .pp-sub { font-size: 0.9rem; }
        .pp-toc ol { columns: 1; }
        .pp-content { padding: 28px 20px; border-radius: 16px; }
        .pp-section h2 { font-size: 1.15rem; }
        .pp-section p, .pp-section li { font-size: 14px; }
    }

    @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        .pp-anim { animation: none; opacity: 1; }
        .pp-page * { transition: none !important; }
    }
`;

export default function RefundPolicyPage() {
    return (
        <>
            <style>{styles}</style>
            <Navbar2 />
            <div className="pp-page">
                <div className="pp-glow" />
                <div className="pp-grid-bg" />
                <div className="pp-stripe" />

                <div className="pp-inner">
                    {/* Hero */}
                    <header className="pp-hero">
                        <div className="pp-marker pp-anim pp-d0">
                            <span className="pp-marker-line" />
                            <span className="pp-marker-text">Legal</span>
                            <span className="pp-marker-line" />
                        </div>

                        <h1 className="pp-heading pp-anim pp-d1">
                            Refund<br />
                            <span className="accent">Policy</span>
                        </h1>

                        <p className="pp-sub pp-anim pp-d2">
                            When you can get your money back, how cancellations work, and how to make a request.
                        </p>

                        <span className="pp-updated pp-anim pp-d3">
                            Last updated: <strong>{LAST_UPDATED}</strong>
                        </span>
                    </header>

                    {/* Body */}
                    <div className="pp-layout pp-anim pp-d4">
                        <nav className="pp-toc" aria-label="Refund policy sections">
                            <p className="pp-toc-title">On this page</p>
                            <ol>
                                {sections.map(({ id, title }) => (
                                    <li key={id}>
                                        <a href={`#${id}`}>{title}</a>
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        <article className="pp-content">
                            {sections.map(({ id, title, body }) => (
                                <section key={id} id={id} className="pp-section">
                                    <h2>{title}</h2>
                                    {body}
                                </section>
                            ))}
                        </article>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}