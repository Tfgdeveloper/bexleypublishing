"use client";
import { useState } from "react";
import { FileText, MessageCircle, Phone } from "lucide-react";
import QuoteModal from "@/components/Quotemodal";

declare global {
    interface Window {
        LiveChatWidget: any;
        LC_API: any;
    }
}

function openLiveChat() {
    if (typeof window === "undefined") return;
    if (window.LiveChatWidget) {
        window.LiveChatWidget.call("maximize");
        return;
    }
    const lc = (window as any).LC_API;
    if (lc && typeof lc.open_chat_window === "function") {
        lc.open_chat_window();
        return;
    }
    const selectors = [
        "#chat-widget-container button",
        "[id^='chat-widget']",
        "iframe[title*='chat' i]",
    ];
    for (const sel of selectors) {
        const el = document.querySelector<HTMLElement>(sel);
        if (el) { el.click(); return; }
    }
}

export default function HeroButtons() {
    const [quoteModal, setQuoteModal] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;900&display=swap');

                .hb-wrap {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-top: 44px;
                }
                .hb-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-family: 'Raleway', Arial, sans-serif;
                    font-weight: 900;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    padding: 0 28px;
                    height: 52px;
                    border-radius: 14px;
                    text-decoration: none;
                    cursor: pointer;
                    border: none;
                    outline: none;
                    overflow: hidden;
                    transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.3s ease;
                    white-space: nowrap;
                    background: none;
                }
                .hb-btn:active { transform: scale(0.96) !important; }
                .hb-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 60%; height: 100%;
                    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
                    transform: skewX(-20deg);
                    transition: left 0.55s ease;
                    pointer-events: none;
                    z-index: 1;
                }
                .hb-btn:hover::before { left: 160%; }
                .hb-btn svg { position: relative; z-index: 2; flex-shrink: 0; }

                .hb-btn--quote { background: #e8391d; color: white; }
                .hb-btn--quote:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 32px rgba(232,57,29,0.5), 0 0 0 3px rgba(232,57,29,0.2);
                }
                .hb-btn--chat {
                    background: rgba(255,255,255,0.06);
                    color: white;
                    box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.25);
                }
                .hb-btn--chat:hover {
                    background: rgba(255,255,255,0.12);
                    transform: translateY(-3px);
                    box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.55), 0 10px 28px rgba(0,0,0,0.35);
                }
                .hb-btn--call {
                    background: transparent;
                    color: #e8391d;
                    box-shadow: inset 0 0 0 1.5px rgba(232,57,29,0.55);
                }
                .hb-btn--call:hover {
                    background: rgba(232,57,29,0.08);
                    transform: translateY(-3px);
                    box-shadow: inset 0 0 0 1.5px #e8391d, 0 10px 28px rgba(232,57,29,0.25);
                }
                .hb-dot {
                    position: relative; z-index: 2;
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    background: #22c55e;
                    flex-shrink: 0;
                    box-shadow: 0 0 6px rgba(34,197,94,0.9);
                }
                .hb-dot::after {
                    content: '';
                    position: absolute;
                    inset: -3px;
                    border-radius: 50%;
                    background: rgba(34,197,94,0.3);
                    animation: hb-pulse 2s ease infinite;
                }
                @keyframes hb-pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50%       { transform: scale(1.7); opacity: 0; }
                }

                @media (max-width: 768px) {
                    .hb-btn { height: 46px; padding: 0 20px; font-size: 11px; }
                }
                @media (max-width: 640px) {
                    .hb-wrap { flex-direction: column; align-items: stretch; gap: 10px; margin-top: 32px; }
                    .hb-btn { height: 48px; justify-content: center; width: 100%; border-radius: 12px; font-size: 11px; }
                }
            `}</style>

            {/* ── Buttons ── */}
            <div className="hb-wrap">
                <button
                    type="button"
                    className="hb-btn hb-btn--quote"
                    onClick={() => setQuoteModal(true)}
                >
                    <FileText size={16} />
                    Start Your Publishing Journey
                </button>

                <button
                    type="button"
                    className="hb-btn hb-btn--chat"
                    onClick={openLiveChat}
                >
                    <span className="hb-dot" aria-hidden="true" />
                    <MessageCircle size={16} />
                    Live Chat
                </button>

                <a href="tel:tel:2797770380" className="hb-btn hb-btn--call">
                    <Phone size={16} />
                    Call Now
                </a>
            </div>

            <QuoteModal isOpen={quoteModal} onClose={() => setQuoteModal(false)} />
        </>
    );
}