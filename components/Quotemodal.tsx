"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Tag, ArrowRight } from "lucide-react";
import ContactForm from "./Contact-form";



const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
type Status = "idle" | "loading" | "error";

const LEAD_URL = "https://crm.authorssale.com/api/lead/L6RQei7pdOcTUyOSaGLKvGjguhnurLb9";
const MAX_ATTEMPTS = 3;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function postWithRetry(url: string, body: unknown): Promise<Response> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.status >= 500 && attempt < MAX_ATTEMPTS) {
                console.warn(`[QuoteModal] Attempt ${attempt} got ${res.status}, retrying...`); // TEMP DEBUG
                await wait(600 * attempt);
                continue;
            }
            return res;
        } catch (err) {
            lastError = err;
            console.warn(`[QuoteModal] Attempt ${attempt} failed to connect:`, err); // TEMP DEBUG
            if (attempt < MAX_ATTEMPTS) await wait(600 * attempt);
        }
    }
    throw lastError;
}

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (status === "error") setStatus("idle");
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        const fullMessage = form.service
            ? `Service: ${form.service}\n\n${form.message}`
            : form.message;

        const payload = {
            Name: form.name,
            Email: form.email,
            "Phone Number": form.phone,
            Message: fullMessage,
        };


        try {
            const res = await postWithRetry(LEAD_URL, payload);

            
            

            if (!res.ok && res.status !== 409) throw new Error();
            onClose();
            router.push("/thank-you");
        } catch (err) {
            console.error("[QuoteModal] Submit failed:", err); // TEMP DEBUG
            setErrorMsg("Something went wrong. Please try again or call us directly.");
            setStatus("error");
        }
    };

    const handleClose = () => {
        if (status === "loading") return;
        onClose();
    };

    const modalContent = (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap');
                .qm-scroll::-webkit-scrollbar { display: none; }
                .qm-input {
                    width: 100%; box-sizing: border-box;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.12);
                    color: white; font-size: 14px;
                    font-family: 'Raleway', Arial, sans-serif;
                    padding: 14px 18px; border-radius: 12px;
                    outline: none; appearance: none;
                    transition: border-color 0.25s ease, background 0.25s ease;
                }
                .qm-input::placeholder { color: rgba(255,255,255,0.3); }
                .qm-input:focus { border-color: #e8391d; background: rgba(255,255,255,0.1); }
                .qm-input:disabled { opacity: 0.5; cursor: not-allowed; }
                .qm-label {
                    color: rgba(255,255,255,0.4); font-size: 10px;
                    font-weight: 900; text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-family: 'Raleway', Arial, sans-serif;
                }
                .qm-submit {
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    background: #e8391d; color: white; font-weight: 900; font-size: 13px;
                    text-transform: uppercase; letter-spacing: 0.1em;
                    padding: 16px; border-radius: 12px; border: none;
                    cursor: pointer; width: 100%; margin-top: 4px;
                    font-family: 'Raleway', Arial, sans-serif;
                    transition: background 0.2s ease, box-shadow 0.2s ease, gap 0.2s ease;
                }
                .qm-submit:hover:not(:disabled) { background: #c0271a; gap: 14px; box-shadow: 0 10px 30px rgba(232,57,29,0.4); }
                .qm-submit:active:not(:disabled) { transform: scale(0.97); }
                .qm-submit:disabled { opacity: 0.6; cursor: not-allowed; }
                .qm-close-btn {
                    margin-left: auto; background: rgba(255,255,255,0.15);
                    border: none; border-radius: 50%;
                    width: 32px; height: 32px;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; flex-shrink: 0;
                    transition: background 0.2s ease;
                }
                .qm-close-btn:hover { background: rgba(255,255,255,0.28); }
                @keyframes qm-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .qm-spinner { animation: qm-spin 0.8s linear infinite; }
                @media (max-width: 480px) {
                    .qm-input { font-size: 13px; padding: 12px 14px; border-radius: 10px; }
                    .qm-submit { font-size: 12px; padding: 14px; border-radius: 10px; }
                }
            `}</style>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={handleClose}
                        style={{
                            position: "fixed", inset: 0,
                            zIndex: 99999,
                            background: "rgba(0,0,0,0.75)",
                            backdropFilter: "blur(6px)",
                            WebkitBackdropFilter: "blur(6px)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            padding: "20px",
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: smoothEase }}
                            onClick={(e) => e.stopPropagation()}
                            className="qm-scroll"
                            style={{
                                width: "100%", maxWidth: 540,
                                maxHeight: "90vh", overflowY: "auto",
                                scrollbarWidth: "none",
                                background: "#0d0f18",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 24,
                                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
                                fontFamily: "'Raleway', Arial, sans-serif",
                            }}
                        >
                            <div style={{
                                background: "linear-gradient(135deg, #e8391d 0%, #c0271a 100%)",
                                borderRadius: "24px 24px 0 0",
                                padding: "20px 32px",
                                display: "flex", alignItems: "center", gap: 12,
                            }}>
                                <Tag size={20} color="white" />
                                <div>
                                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", margin: 0, fontFamily: "'Raleway', Arial, sans-serif" }}>
                                        Limited Time Offer
                                    </p>
                                    <p style={{ color: "white", fontSize: 22, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.04em", margin: 0, lineHeight: 1.2, fontFamily: "'Raleway', Arial, sans-serif" }}>
                                        Get <span style={{ fontSize: 28 }}>50% OFF</span> Today!
                                    </p>
                                </div>
                                <button className="qm-close-btn" onClick={handleClose} aria-label="Close">
                                    <X size={15} color="white" />
                                </button>
                            </div>

                            {/* Body */}
                            <div style={{ padding: "28px 32px 32px" }}>
                                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 24, lineHeight: 1.6, fontFamily: "'Raleway', Arial, sans-serif" }}>
                                    Fill out the form below and our publishing consultant will reach out within 24 hours with your custom quote.
                                </p>

                                {/* <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <label className="qm-label">Full Name *</label>
                                        <input name="name" type="text" value={form.name} onChange={handle} required disabled={status === "loading"} placeholder="Enter your full name" className="qm-input" />
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <label className="qm-label">Email Address *</label>
                                        <input name="email" type="email" value={form.email} onChange={handle} required disabled={status === "loading"} placeholder="your@email.com" className="qm-input" />
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <label className="qm-label">Phone Number</label>
                                        <input name="phone" type="tel" value={form.phone} onChange={handle} disabled={status === "loading"} placeholder="(000) 000-0000" className="qm-input" />
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <label className="qm-label">Service Needed</label>
                                        <select name="service" value={form.service} onChange={handle} disabled={status === "loading"} className="qm-input">
                                            <option value="" style={{ background: "#1a1a1a" }}>Select a service...</option>
                                            <option value="Book Writing / Ghostwriting" style={{ background: "#1a1a1a" }}>Book Writing / Ghostwriting</option>
                                            <option value="Editing & Proofreading" style={{ background: "#1a1a1a" }}>Editing &amp; Proofreading</option>
                                            <option value="Book Publishing" style={{ background: "#1a1a1a" }}>Book Publishing</option>
                                            <option value="Cover Design & Formatting" style={{ background: "#1a1a1a" }}>Cover Design &amp; Formatting</option>
                                            <option value="Book Marketing" style={{ background: "#1a1a1a" }}>Book Marketing</option>
                                            <option value="Other" style={{ background: "#1a1a1a" }}>Other</option>
                                        </select>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <label className="qm-label">Tell Us About Your Book *</label>
                                        <textarea name="message" value={form.message} onChange={handle} required rows={3} disabled={status === "loading"} placeholder="Share your idea, genre, goals..." className="qm-input" style={{ resize: "none" }} />
                                    </div>

                                    {status === "error" && errorMsg && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                color: "#fca5a5", fontSize: 12, textAlign: "center",
                                                background: "rgba(239,68,68,0.12)",
                                                border: "1px solid rgba(239,68,68,0.25)",
                                                borderRadius: 8, padding: "10px 14px", margin: 0,
                                                fontFamily: "'Raleway', Arial, sans-serif",
                                            }}
                                        >
                                            {errorMsg}
                                        </motion.p>
                                    )}

                                    <button type="submit" disabled={status === "loading"} className="qm-submit">
                                        {status === "loading"
                                            ? <><Loader2 size={16} className="qm-spinner" /> Sending...</>
                                            : <>Claim 50% Off — Send Request <ArrowRight size={16} /></>
                                        }
                                    </button>

                                    <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, textAlign: "center", margin: 0, fontFamily: "'Raleway', Arial, sans-serif" }}>
                                        100% confidential &amp; NDA protected. No spam, ever.
                                    </p>

                                </form> */}

                                <ContactForm />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );

    if (!mounted) return null;
    return createPortal(modalContent, document.body);
}