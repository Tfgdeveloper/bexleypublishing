import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Star, X } from "lucide-react";
import ContactForm from "@/components/Contact-form";
import { darkIconTheme } from "@/components/contactFormThemes";
import CountdownTimer from "./Countdowntimer";

/* ------------------------------------------------------------------ */
/*  Settings                                                           */
/* ------------------------------------------------------------------ */
const DISCOUNT = "50%";
const SERVICES = ["Editing", "Cover Design", "Formatting", "Publishing", "Marketing"];

const POPUP_MIN_WIDTH = 1024;
const POPUP_EVENT = "pb:open-popup";
const POPUP_HEIGHT = "h-[580px]"; // fixed popup height — change here

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/*  Variants                                                           */
/*  Tailwind needs full class names, so every color class is written   */
/*  out in full here rather than built from a variable.                */
/* ------------------------------------------------------------------ */
type VariantKey = "halloween" | "veterans";

const VARIANTS = {
    halloween: {
        // Ends at midnight after Halloween (visitor's local time). Months are 0-based: 10 = November.
        endsAt: new Date(2026, 10, 1, 0, 0, 0),
        image: "/images/popup/popup6.png",
        title: `Claim ${DISCOUNT} off — sign up before the offer ends`,
        shell: "bg-[#140c08] ring-[#f04a14]/40",
        close: "bg-[#f04a14] hover:bg-[#ff5a22] shadow-[0_6px_16px_-4px_rgba(240,74,20,0.7)]",
        card: "border-[#f04a14]/30 bg-black/80",
        formTheme: darkIconTheme,
    },
    veterans: {
        // Ends at midnight after Veterans Day, November 11.
        endsAt: new Date(2026, 10, 12, 0, 0, 0),
        image: "/images/popup/image.png",
        title: "This Veterans Day, salute the power of every story",
        shell: "bg-[#0a1a33] ring-[#b22234]/50",
        close: "bg-[#b22234] hover:bg-[#c8283c] shadow-[0_6px_16px_-4px_rgba(178,34,52,0.7)]",
        card: "border-white/20 bg-[#071226]/75",
        formTheme: darkIconTheme,
    },
} as const;

// Picks Halloween until it ends, then Veterans Day.
function getActiveVariant(now = new Date()): VariantKey {
    return now < VARIANTS.halloween.endsAt ? "halloween" : "veterans";
}

/* ------------------------------------------------------------------ */
/*  Veterans Day overlay — sits on top of the flag photo so the        */
/*  headline and the form stay readable                                */
/* ------------------------------------------------------------------ */
function VeteransOverlay() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            {/* Navy wash: strong behind the headline, light over the flag, a little deeper behind the form */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,31,0.40)_0%,rgba(6,16,31,0.7)_35%,rgba(6,16,31,0.25)_58%,rgba(6,16,31,0.15)_66%,rgba(6,16,31,0.45)_100%)]" />
            {/* Soft bottom fade so the services line sits on a calm surface */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(6,16,31,0.7),transparent)]" />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Veterans Day artwork column                                        */
/* ------------------------------------------------------------------ */
function VeteransOffer({ onSignUp }: { onSignUp: () => void }) {
    return (
        <div className="relative flex h-full min-h-0 flex-col justify-center px-10 py-10 text-white xl:px-14">
            <motion.div
                className="flex max-w-[34rem] flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: smoothEase, delay: 0.2 }}
            >
                <h2 id="hw-pop-title" className="flex flex-col">
                    <span className="text-lg font-semibold tracking-[0.18em] text-[#d9c27a]">
                        THIS VETERANS DAY,
                    </span>
                    <span className="mt-2 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight xl:text-5xl">
                        SALUTE THE POWER OF EVERY STORY.
                    </span>
                </h2>

                <div className="mt-7 flex items-end gap-4">
                    <span className="bg-[#b22234] px-4 py-1 text-6xl font-black leading-none tracking-tight shadow-[6px_6px_0_#06101f] xl:text-7xl">
                        {DISCOUNT} OFF
                    </span>
                    <span className="pb-1 text-lg font-semibold leading-tight text-white/90">
                        All Publishing
                        <br />
                        Services
                    </span>
                </div>

                <p className="mt-6 max-w-[28rem] text-base leading-relaxed text-white/85">
                    Make this Veterans Day the beginning of your publishing journey.
                </p>

                <button
                    type="button"
                    onClick={onSignUp}
                    className="mt-6 w-fit cursor-pointer rounded-full bg-white px-7 py-3 text-sm font-extrabold tracking-[0.14em] text-[#0a1a33] transition duration-200 hover:bg-[#d9c27a] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#d9c27a]"
                >
                    SIGN UP NOW
                </button>

                <div className="mt-8 border-t border-white/15 pt-5">
                    <p className="flex items-center gap-2 text-sm italic text-white/75">
                        <Star size={14} className="shrink-0 fill-[#d9c27a] text-[#d9c27a]" aria-hidden="true" />
                        Celebrate the power of stories and honor the legacy of those who served.
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                        {SERVICES.join(" • ")}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Popup                                                              */
/*  Opens on POPUP_EVENT. To force a variant:                          */
/*  window.dispatchEvent(new CustomEvent("pb:open-popup",              */
/*      { detail: { variant: "veterans" } }))                          */
/* ------------------------------------------------------------------ */
function GetStartedPopup({ variant: variantProp }: { variant?: VariantKey }) {
    const [open, setOpen] = useState(false);
    const [variantKey, setVariantKey] = useState<VariantKey>(variantProp ?? getActiveVariant());
    const formRef = useRef<HTMLDivElement>(null);
    const v = VARIANTS[variantKey];

    useEffect(() => {
        const onOpen = (e: Event) => {
            const requested = (e as CustomEvent<{ variant?: VariantKey }>).detail?.variant;
            setVariantKey(requested ?? variantProp ?? getActiveVariant());
            setOpen(true);
        };
        window.addEventListener(POPUP_EVENT, onOpen);
        return () => window.removeEventListener(POPUP_EVENT, onOpen);
    }, [variantProp]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        const mq = window.matchMedia(`(min-width: ${POPUP_MIN_WIDTH}px)`);
        const onMq = () => { if (!mq.matches) setOpen(false); };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onMq);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onMq);
        };
    }, [open]);

    // "SIGN UP NOW" moves the visitor straight into the form.
    const focusForm = () => {
        formRef.current?.querySelector<HTMLElement>("input, textarea")?.focus();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[1000] grid place-items-center bg-[rgba(12,7,4,0.7)] p-6 backdrop-blur-[4px]"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        role="dialog" aria-modal="true" aria-labelledby="hw-pop-title"
                        className={`relative isolate grid ${POPUP_HEIGHT} max-h-[calc(100vh-48px)] w-full max-w-[1200px] grid-cols-[65%_35%] overflow-hidden rounded-[22px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.75)] ring-1 ${v.shell}`}
                        initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.97 }}
                        transition={{ duration: 0.5, ease: smoothEase }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Background artwork */}
                        {v.image && (
                            <img
                                src={v.image}
                                alt=""
                                aria-hidden="true"
                                className={`absolute inset-0 -z-20 h-full w-full object-cover ${variantKey === "veterans" ? "object-[center_45%]" : ""}`}
                            />
                        )}
                        {variantKey === "veterans" && <VeteransOverlay />}

                        {/* Close */}
                        <button
                            type="button"
                            aria-label="Close"
                            onClick={() => setOpen(false)}
                            className={`absolute right-3 top-3 z-20 grid h-9 w-9 cursor-pointer place-items-center rounded-full text-white transition duration-200 hover:rotate-90 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#ffb27a] motion-reduce:hover:rotate-0 ${v.close}`}
                        >
                            <X size={18} strokeWidth={3} />
                        </button>

                        {/* Left column */}
                        {variantKey === "veterans" ? (
                            <VeteransOffer onSignUp={focusForm} />
                        ) : (
                            <div aria-hidden="true" />
                        )}

                        {/* Right: countdown card + form card */}
                        <motion.div
                            className="flex h-full min-h-0 flex-col gap-3 overflow-y-auto p-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: smoothEase, delay: 0.25 }}
                        >
                            {/* Accessible title for image variants (Veterans Day has a visible one) */}
                            {variantKey !== "veterans" && (
                                <h2 id="hw-pop-title" className="sr-only">{v.title}</h2>
                            )}

                            {/* Countdown card */}
                            <div className={`flex flex-col items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-md ${v.card}`}>
                                <CountdownTimer target={v.endsAt} active={open} />
                            </div>

                            {/* Form card */}
                            <div ref={formRef} className={`flex flex-1 flex-col rounded-2xl border p-5 backdrop-blur-md ${v.card}`}>
                                <ContactForm
                                    theme={v.formTheme}
                                    formLocation={`Get Started Popup - ${variantKey === "veterans" ? "Veterans Day" : "Halloween"}`}
                                    placeholders={{ name: "Full Name *", email: "Email Address *", phone: "Phone Number *", message: "Tell us about your project." }}
                                    labels={{ name: "Full Name", email: "Email Address", phone: "Phone Number", message: "Tell us about your project." }}
                                    submitLabel={<>Claim {DISCOUNT} Off <Send size={15} /></>}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default GetStartedPopup;