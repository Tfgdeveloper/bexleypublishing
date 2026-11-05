import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Live countdown hook: ticks every second                           */
/* ------------------------------------------------------------------ */
export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function getTimeLeft(target: Date): TimeLeft {
    const diff = Math.max(0, target.getTime() - Date.now());
    const total = Math.floor(diff / 1000);
    return {
        days: Math.floor(total / 86400),
        hours: Math.floor((total % 86400) / 3600),
        minutes: Math.floor((total % 3600) / 60),
        seconds: total % 60,
        done: diff === 0,
    };
}

export function useCountdown(target: Date, active = true): TimeLeft {
    const [left, setLeft] = useState(() => getTimeLeft(target));

    useEffect(() => {
        if (!active) return;
        // Recompute from the real clock on every tick so it never drifts.
        const tick = () => setLeft(getTimeLeft(target));
        tick();

        // Align ticks to the start of each real second.
        let interval: number | undefined;
        const timeout = window.setTimeout(() => {
            tick();
            interval = window.setInterval(tick, 1000);
        }, 1000 - (Date.now() % 1000));

        return () => {
            window.clearTimeout(timeout);
            if (interval) window.clearInterval(interval);
        };
    }, [target, active]);

    return left;
}

/* ------------------------------------------------------------------ */
/*  Countdown box                                                      */
/* ------------------------------------------------------------------ */
function TimeBox({ value, label }: { value: number; label: string }) {
    const reduce = useReducedMotion();
    const text = String(value).padStart(2, "0");

    return (
        <div className="flex w-[46px] flex-col items-center rounded-md bg-white pb-1 pt-1.5">
            <div className="relative h-[24px] overflow-hidden text-[18px] font-extrabold leading-[22px] text-[#1d1426] tabular-nums" aria-hidden="true">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                        key={text}
                        className="block"
                        initial={reduce ? false : { y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
                    >
                        {text}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="mt-0.5 text-[8px] font-extrabold uppercase tracking-[0.08em] text-[#6b5d77]">{label}</span>
        </div>
    );
}

const Sep = () => <span className="-mt-3 text-xl font-extrabold text-[#ff9a1f]">:</span>;

/* ------------------------------------------------------------------ */
/*  Countdown timer                                                    */
/* ------------------------------------------------------------------ */
type CountdownTimerProps = {
    /** Date and time the countdown ends */
    target: Date;
    /** Only tick while true (e.g. while a popup is open). Defaults to true. */
    active?: boolean;
    /** Extra classes, e.g. for positioning: "absolute top-2 right-2" */
    className?: string;
    title?: string;
    endedText?: string;
};

export default function CountdownTimer({
    target,
    active = true,
    className = "",
    title = "Offer ends in",
    endedText = "This offer has ended",
}: CountdownTimerProps) {
    const time = useCountdown(target, active);

    return (
        <div
            role="timer"
            aria-live="off"
            className={`shrink-0 rounded-[10px] text-center ${className}`}
        >
            {time.done ? (
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white">{endedText}</p>
            ) : (
                <>
                    <p className="mb-1.5 text-[14px] font-bold uppercase tracking-[0.16em] text-white">{title}</p>
                    <div className="flex items-center justify-center gap-1">
                        <TimeBox value={time.days} label="Days" />
                        <Sep />
                        <TimeBox value={time.hours} label="Hrs" />
                        <Sep />
                        <TimeBox value={time.minutes} label="Min" />
                        <Sep />
                        <TimeBox value={time.seconds} label="Sec" />
                    </div>
                    <span className="sr-only">
                        {time.days} days, {time.hours} hours, {time.minutes} minutes left
                    </span>
                </>
            )}
        </div>
    );
}