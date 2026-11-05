"use client";

import { useState, type ReactNode, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { darkTheme, type ContactFormTheme } from "./contactFormThemes";

const LEAD_URL = "https://crm.authorssale.com/api/lead/L6RQei7pdOcTUyOSaGLKvGjguhnurLb9";
const MAX_ATTEMPTS = 3;

type Status = "idle" | "loading" | "error";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function postWithRetry(url: string, body: unknown): Promise<Response> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(body),
            });
            if (res.status >= 500 && attempt < MAX_ATTEMPTS) {
                await wait(600 * attempt);
                continue;
            }
            return res;
        } catch (err) {
            lastError = err;
            if (attempt < MAX_ATTEMPTS) await wait(600 * attempt);
        }
    }
    throw lastError;
}

export interface ContactFormProps {
    theme?: ContactFormTheme;

    classNames?: Partial<ContactFormTheme>;

    formLocation?: string;

    submitLabel?: ReactNode;
    redirectTo?: string;
 
    labels?: Partial<Record<FieldName, string>>;
 
    placeholders?: Partial<Record<FieldName, string>>;
 
    autoFocus?: boolean;
}

type FieldName = "name" | "email" | "phone" | "message";

const DEFAULT_LABELS: Record<FieldName, string> = {
    name: "Name",
    email: "Email",
    phone: "Phone number",
    message: "Message",
};

const DEFAULT_PLACEHOLDERS: Record<FieldName, string> = {
    name: "Your full name",
    email: "you@example.com",
    phone: "+1 555 000 0000",
    message: "Tell us about your book or project",
};

const EMPTY = { name: "", email: "", phone: "", message: "" };

export default function ContactForm({
    theme = darkTheme,
    classNames,
    formLocation,
    submitLabel = "Send message",
    redirectTo = "/thank-you",
    labels,
    placeholders,
    autoFocus = false,
}: ContactFormProps) {
    const router = useRouter();
    const t = { ...theme, ...classNames };
    const L = { ...DEFAULT_LABELS, ...labels };
    const P = { ...DEFAULT_PLACEHOLDERS, ...placeholders };

    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (status === "error") setStatus("idle");
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");
 
        const source = formLocation
            ? `${window.location.href} (${formLocation})`
            : window.location.href;

        const payload = {
            name: form.name,
            email: form.email,
            phone_number: form.phone,
            message: `${form.message}\n\nSubmitted from: ${source}`,
        };

        try {
            const res = await postWithRetry(LEAD_URL, payload);
            if (!res.ok && res.status !== 409) throw new Error(`Status ${res.status}`);
            
            setForm(EMPTY);
            router.push(redirectTo);
        } catch (err) {
            console.error("[ContactForm] Submit failed:", err);
            setErrorMsg("Your message didn't send. Try again, or call us directly.");
            setStatus("error");
        }
    };

    const loading = status === "loading";

    return (
        <form onSubmit={submit} className={t.form}>
            <div className={t.row}>
                <label className={t.field}>
                    <input name="name" type="text" required autoComplete="name" autoFocus={autoFocus}
                        placeholder={P.name} value={form.name}
                        onChange={handle} disabled={loading} className={t.input} />
                    <span className={t.label}>{L.name}</span>
                </label>
                <label className={t.field}>
                    <input name="email" type="email" required autoComplete="email"
                        placeholder={P.email} value={form.email}
                        onChange={handle} disabled={loading} className={t.input} />
                    <span className={t.label}>{L.email}</span>
                </label>
            </div>

            <label className={t.phoneField ?? t.field}>
                <input name="phone" type="tel" required autoComplete="tel"
                    placeholder={P.phone} value={form.phone}
                    onChange={handle} disabled={loading} className={t.input} />
                <span className={t.label}>{L.phone}</span>
            </label>

            <label className={t.messageField ?? t.field}>
                <textarea name="message" required rows={4}
                    placeholder={P.message}
                    value={form.message} onChange={handle}
                    disabled={loading} className={t.textarea} />
                <span className={t.label}>{L.message}</span>
            </label>

            {status === "error" && <p role="alert" className={t.error}>{errorMsg}</p>}

            <button type="submit" disabled={loading} className={t.submit}>
                {loading ? (
                    <>
                        <svg className={t.spinner} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                            <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Sending...
                    </>
                ) : (
                    submitLabel
                )}
            </button>
        </form>
    );
}