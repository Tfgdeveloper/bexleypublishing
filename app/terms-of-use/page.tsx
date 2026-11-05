import type { ReactNode } from "react";
import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import Navbar2 from "@/components/Navbar2";

export const metadata: Metadata = {
    title: "Terms of Use | Bexley Publishing",
    description:
        "Read the terms that apply when you use the Bexley Publishing website or hire us for writing, editing, design, publishing, and marketing services.",
};

const LAST_UPDATED = "September 22, 2026";
const COMPANY = "Bexley Publishing";
const EMAIL = "info@bexleypublishing.com";
const PHONE_DISPLAY = "(279) 777-0380";
const PHONE_HREF = "tel:2797770380";
// Update to the state whose laws govern your contracts
const GOVERNING_STATE = "California";

type Section = { id: string; title: string; body: ReactNode };

const sections: Section[] = [
    {
        id: "acceptance",
        title: "Acceptance of terms",
        body: (
            <>
                <p>
                    These Terms of Use ("Terms") apply to your use of the {COMPANY} website and to any
                    services you buy from us. By using our website, submitting a form, or signing a service
                    agreement, you agree to these Terms.
                </p>
                <p>
                    If you sign a separate written agreement with us, that agreement takes priority where it
                    conflicts with these Terms.
                </p>
            </>
        ),
    },
    {
        id: "eligibility",
        title: "Eligibility",
        body: (
            <p>
                You must be at least 18 years old, or the age of majority where you live, to buy our
                services. If you are acting for a company or another person, you confirm that you have the
                authority to accept these Terms on their behalf.
            </p>
        ),
    },
    {
        id: "services",
        title: "Our services",
        body: (
            <>
                <p>
                    We offer ghostwriting, editing, proofreading, cover design, formatting, publishing, and
                    marketing services. The exact scope, deliverables, timeline, and price of your project are
                    set out in your proposal or service agreement.
                </p>
                <p>
                    Work that falls outside the agreed scope, such as extra chapters, new formats, or added
                    marketing campaigns, may be quoted and billed separately.
                </p>
            </>
        ),
    },
    {
        id: "payments",
        title: "Pricing and payments",
        body: (
            <>
                <ul>
                    <li>Prices are listed in US dollars unless your proposal says otherwise.</li>
                    <li>
                        Projects may require an upfront deposit or be billed in milestones. Work begins once the
                        first payment is received.
                    </li>
                    <li>
                        If a payment is late, we may pause work on your project until the balance is paid.
                    </li>
                    <li>
                        Refunds are handled under our <Link href="/refund-policy">Refund Policy</Link>.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "your-responsibilities",
        title: "Your responsibilities",
        body: (
            <>
                <p>To keep your project on track, you agree to:</p>
                <ul>
                    <li>Give us accurate information and the materials we need, when we need them.</li>
                    <li>Review drafts and respond to requests for feedback within a reasonable time.</li>
                    <li>
                        Only share content you own or have permission to use, including text, images, quotes,
                        and trademarks.
                    </li>
                    <li>Make sure your content does not defame anyone or break any law.</li>
                </ul>
                <p>
                    Delays in feedback or materials from your side may push back the project timeline.
                </p>
            </>
        ),
    },
    {
        id: "revisions",
        title: "Revisions and approvals",
        body: (
            <p>
                Your proposal states how many rounds of revisions are included for each deliverable. Once you
                approve a draft, design, or final file, further changes may be treated as new work and
                billed separately.
            </p>
        ),
    },
    {
        id: "ownership",
        title: "Ownership and copyright",
        body: (
            <>
                <p>
                    Once your project is paid in full, you own the rights to the final manuscript, cover
                    design, and other deliverables created for you, as set out in your service agreement. For
                    ghostwriting projects, you are credited as the author and we make no claim to authorship.
                </p>
                <p>
                    Until full payment is received, we keep ownership of all work in progress. We may keep
                    working files for our records, and we will not publish or resell your work.
                </p>
                <p>
                    Fonts, stock images, and other licensed assets used in your project remain subject to
                    their own license terms.
                </p>
            </>
        ),
    },
    {
        id: "portfolio",
        title: "Portfolio use",
        body: (
            <p>
                Unless you ask us not to in writing, we may show your book cover, title, and a short
                description in our portfolio and marketing. We will never share your manuscript content or
                name you as a ghostwriting client without your permission.
            </p>
        ),
    },
    {
        id: "confidentiality",
        title: "Confidentiality",
        body: (
            <p>
                We treat your manuscript, ideas, and personal details as confidential and share them only
                with team members and partners who need them to complete your project. You can read more in
                our <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>
        ),
    },
    {
        id: "third-party-platforms",
        title: "Publishing platforms and third parties",
        body: (
            <p>
                When we publish or distribute your book through platforms such as Amazon KDP, IngramSpark,
                Barnes &amp; Noble Press, or Apple Books, those platforms have their own rules, approval
                processes, royalty terms, and fees. We are not responsible for their decisions, including
                rejected listings, pricing changes, or account suspensions.
            </p>
        ),
    },
    {
        id: "no-guarantee",
        title: "No guarantee of results",
        body: (
            <p>
                We work hard to help your book succeed, but we cannot guarantee sales numbers, rankings,
                reviews, bestseller status, media coverage, or acceptance by a traditional publisher or
                literary agent. Results depend on many factors outside our control.
            </p>
        ),
    },
    {
        id: "website-use",
        title: "Using our website",
        body: (
            <>
                <p>The content on our website, including text, graphics, and logos, belongs to {COMPANY}. You agree not to:</p>
                <ul>
                    <li>Copy, reproduce, or resell our website content without permission.</li>
                    <li>Use the website for any unlawful or fraudulent purpose.</li>
                    <li>Try to hack, disrupt, or overload the website or its servers.</li>
                    <li>Submit false information or pretend to be someone else.</li>
                </ul>
            </>
        ),
    },
    {
        id: "liability",
        title: "Limitation of liability",
        body: (
            <>
                <p>
                    Our website and services are provided "as is". To the fullest extent allowed by law,{" "}
                    {COMPANY} is not liable for indirect, incidental, or consequential losses, such as lost
                    profits, lost royalties, or lost data.
                </p>
                <p>
                    Our total liability for any claim related to a project is limited to the amount you paid
                    us for that project.
                </p>
            </>
        ),
    },
    {
        id: "indemnification",
        title: "Indemnification",
        body: (
            <p>
                You agree to protect {COMPANY} from claims, losses, and legal costs that arise from content
                you provide, such as copyright infringement or defamation claims, or from your breach of
                these Terms.
            </p>
        ),
    },
    {
        id: "termination",
        title: "Termination",
        body: (
            <p>
                Either party may end a project by giving written notice. You will pay for work completed up
                to that point, as described in our <Link href="/refund-policy">Refund Policy</Link>. We may
                also stop providing services if you break these Terms or behave abusively toward our team.
            </p>
        ),
    },
    {
        id: "governing-law",
        title: "Governing law",
        body: (
            <p>
                These Terms are governed by the laws of the State of {GOVERNING_STATE}, United States. We
                will try to resolve any dispute informally first. If that does not work, disputes will be
                handled in the courts of {GOVERNING_STATE}.
            </p>
        ),
    },
    {
        id: "changes",
        title: "Changes to these terms",
        body: (
            <p>
                We may update these Terms from time to time. When we do, we will change the "Last updated"
                date at the top of this page. Continuing to use our website or services after an update means
                you accept the new Terms.
            </p>
        ),
    },
    {
        id: "contact",
        title: "Contact us",
        body: (
            <p>
                Questions about these Terms? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{" "}
                <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
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

export default function TermsOfUsePage() {
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
                            Terms<br />
                            <span className="accent">of Use</span>
                        </h1>

                        <p className="pp-sub pp-anim pp-d2">
                            The rules for using our website and working with us on your book.
                        </p>

                        <span className="pp-updated pp-anim pp-d3">
                            Last updated: <strong>{LAST_UPDATED}</strong>
                        </span>
                    </header>

                    {/* Body */}
                    <div className="pp-layout pp-anim pp-d4">
                        <nav className="pp-toc" aria-label="Terms of use sections">
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