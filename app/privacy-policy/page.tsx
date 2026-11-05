import type { ReactNode } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, ArrowRight, Phone, Mail } from "lucide-react";
import Footer from "@/components/sections/Footer";
import Navbar2 from "@/components/Navbar2";

export const metadata: Metadata = {
    title: "Privacy Policy | Bexley Publishing",
    description:
        "Learn how Bexley Publishing collects, uses, and protects the personal information and manuscripts you share with us.",
};

const LAST_UPDATED = "September 22, 2026";
const COMPANY = "Bexley Publishing";
const EMAIL = "info@bexleypublishing.com";
const PHONE_DISPLAY = "(279) 777-0380";
const PHONE_HREF = "tel:2797770380";

type Section = { id: string; title: string; body: ReactNode };

const sections: Section[] = [
    {
        id: "introduction",
        title: "Introduction",
        body: (
            <>
                <p>
                    {COMPANY} ("we", "us", or "our") respects your privacy. This policy explains what
                    personal information we collect when you visit our website, request a proposal, or work
                    with us on a book, and how we use and protect it.
                </p>
                <p>
                    By using our website or services, you agree to the practices described here. If you do
                    not agree, please do not use our website or submit your information.
                </p>
            </>
        ),
    },
    {
        id: "information-we-collect",
        title: "Information we collect",
        body: (
            <>
                <p>We collect information in three ways:</p>
                <ul>
                    <li>
                        <strong>Information you give us.</strong> Your name, email address, phone number,
                        mailing address, and details about your book project when you fill out a form, request
                        a proposal, call us, or email us.
                    </li>
                    <li>
                        <strong>Project materials.</strong> Manuscripts, outlines, images, author bios, and
                        other files you share so we can write, edit, design, publish, or market your book.
                    </li>
                    <li>
                        <strong>Information collected automatically.</strong> Your IP address, browser type,
                        device information, pages visited, and referring website, gathered through cookies and
                        similar technologies.
                    </li>
                </ul>
                <p>
                    Payments are handled by third-party payment processors. We do not store full card numbers
                    on our servers.
                </p>
            </>
        ),
    },
    {
        id: "how-we-use",
        title: "How we use your information",
        body: (
            <>
                <p>We use your information to:</p>
                <ul>
                    <li>Respond to inquiries and prepare custom proposals.</li>
                    <li>Deliver the services you hire us for, including writing, editing, cover design, publishing, and marketing.</li>
                    <li>Send project updates, invoices, and account-related messages.</li>
                    <li>Send marketing emails, only where you have agreed to receive them.</li>
                    <li>Improve our website, services, and customer experience.</li>
                    <li>Meet legal obligations and prevent fraud or misuse.</li>
                </ul>
            </>
        ),
    },
    {
        id: "manuscripts",
        title: "Your manuscript and intellectual property",
        body: (
            <>
                <p>
                    Your work stays yours. We use manuscripts and project materials only to provide the
                    services you request. We do not sell, publish, or share your work without your
                    permission, except with team members and trusted partners (such as printers or
                    distribution platforms) who need it to complete your project.
                </p>
                <p>Copyright and ownership terms for your book are set out in your service agreement.</p>
            </>
        ),
    },
    {
        id: "cookies",
        title: "Cookies and tracking",
        body: (
            <>
                <p>
                    We use cookies to keep the website working, remember your preferences, and understand how
                    visitors use our pages. We may also use analytics and advertising tools that set their
                    own cookies.
                </p>
                <p>
                    You can block or delete cookies in your browser settings. Some parts of the website may
                    not work properly if you do.
                </p>
            </>
        ),
    },
    {
        id: "sharing",
        title: "How we share information",
        body: (
            <>
                <p>We do not sell your personal information. We share it only with:</p>
                <ul>
                    <li>
                        <strong>Service providers</strong> who help us run our business, such as hosting,
                        email, analytics, payment processing, and customer support tools.
                    </li>
                    <li>
                        <strong>Publishing partners</strong> such as printers, retailers, and distribution
                        platforms, when needed to publish or promote your book.
                    </li>
                    <li>
                        <strong>Legal authorities</strong> when required by law, or to protect our rights,
                        users, or the public.
                    </li>
                    <li>
                        <strong>A successor business</strong> if {COMPANY} is involved in a merger,
                        acquisition, or sale of assets.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "security",
        title: "Data security",
        body: (
            <p>
                We use reasonable administrative, technical, and physical safeguards to protect your
                information, including encrypted connections and restricted access to project files. No
                method of transmission or storage is completely secure, so we cannot guarantee absolute
                security.
            </p>
        ),
    },
    {
        id: "retention",
        title: "Data retention",
        body: (
            <p>
                We keep personal information for as long as needed to provide our services, maintain
                business records, resolve disputes, and meet legal requirements. When information is no
                longer needed, we delete or anonymize it.
            </p>
        ),
    },
    {
        id: "your-rights",
        title: "Your rights and choices",
        body: (
            <>
                <p>Depending on where you live, you may have the right to:</p>
                <ul>
                    <li>Access the personal information we hold about you.</li>
                    <li>Correct information that is inaccurate or incomplete.</li>
                    <li>Ask us to delete your information.</li>
                    <li>Object to or limit certain uses of your information.</li>
                    <li>Opt out of marketing emails at any time using the unsubscribe link.</li>
                </ul>
                <p>
                    To make a request, email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We may need to
                    verify your identity before responding.
                </p>
            </>
        ),
    },
    {
        id: "children",
        title: "Children's privacy",
        body: (
            <p>
                Our services are not directed to children under 13, and we do not knowingly collect their
                personal information. If you believe a child has given us personal information, contact us
                and we will delete it.
            </p>
        ),
    },
    {
        id: "third-party",
        title: "Third-party links",
        body: (
            <p>
                Our website may link to other websites, such as retailers or social media platforms. We are
                not responsible for their privacy practices, so please review their policies before sharing
                information with them.
            </p>
        ),
    },
    {
        id: "changes",
        title: "Changes to this policy",
        body: (
            <p>
                We may update this policy from time to time. When we do, we will change the "Last updated"
                date at the top of this page. Significant changes may also be announced on our website or by
                email.
            </p>
        ),
    },
    {
        id: "contact",
        title: "Contact us",
        body: (
            <p>
                Questions about this policy or your personal information? Email{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
            </p>
        ),
    },
];

const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap');

    html { scroll-behavior: smooth; }

    /* Entrance animations (CSS replaces framer-motion so this stays a server component) */
    @keyframes pp-fade-up {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pp-pop {
        0%   { opacity: 0; transform: scale(0); }
        70%  { opacity: 1; transform: scale(1.08); }
        100% { opacity: 1; transform: scale(1); }
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

    .pp-icon-ring {
        width: 88px;
        height: 88px;
        border-radius: 50%;
        background: rgba(232,57,29,0.12);
        border: 2px solid rgba(232,57,29,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 32px;
        opacity: 0;
        animation: pp-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
    }

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
    /* Highlight the section you jumped to from the contents list */
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

    /* Footer */
    .pp-footer { margin-top: 56px; text-align: center; }

    .pp-actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 36px;
    }

    .pp-btn-primary {
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
    }
    .pp-btn-primary:hover { background: #c0271a; box-shadow: 0 10px 30px rgba(232,57,29,0.4); gap: 14px; }

    .pp-btn-ghost {
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
    }
    .pp-btn-ghost:hover { border-color: rgba(255,255,255,0.35); color: white; background: rgba(255,255,255,0.05); }

    .pp-contact-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 32px;
        flex-wrap: wrap;
        padding-top: 28px;
        border-top: 1px solid rgba(255,255,255,0.07);
    }

    .pp-contact-item {
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        color: rgba(255,255,255,0.4);
        font-size: 13px;
        font-weight: 600;
        transition: color 0.2s ease;
    }
    .pp-contact-item:hover { color: rgba(255,255,255,0.85); }
    .pp-contact-item svg { color: #e8391d; flex-shrink: 0; }

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
        .pp-icon-ring { width: 72px; height: 72px; margin-bottom: 24px; }
        .pp-toc ol { columns: 1; }
        .pp-content { padding: 28px 20px; border-radius: 16px; }
        .pp-section h2 { font-size: 1.15rem; }
        .pp-section p, .pp-section li { font-size: 14px; }
        .pp-btn-primary, .pp-btn-ghost { font-size: 11px; padding: 13px 20px; }
        .pp-contact-footer { gap: 20px; }
        .pp-contact-item { font-size: 12px; }
    }

    @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        .pp-anim, .pp-icon-ring { animation: none; opacity: 1; }
        .pp-page * { transition: none !important; }
    }
`;

export default function PrivacyPolicyPage() {
    return (
        <>
            <style>{styles}</style>
            <Navbar2/>
            <div className="pp-page ">
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
                            Privacy<br />
                            <span className="accent">Policy</span>
                        </h1>

                        <p className="pp-sub pp-anim pp-d2">
                            How we collect, use, and protect your personal information and the work you trust us with.
                        </p>

                        <span className="pp-updated pp-anim pp-d3">
                            Last updated: <strong>{LAST_UPDATED}</strong>
                        </span>
                    </header>

                    {/* Body */}
                    <div className="pp-layout pp-anim pp-d4 mb-">
                        <nav className="pp-toc" aria-label="Privacy policy sections">
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

                    {/* Footer */}
                    
                </div>
            </div>
            <Footer/>
        </>
    );
}