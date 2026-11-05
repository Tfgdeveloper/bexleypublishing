"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stats = [
    { id: 1, percent: "500+", label: "Books Successfully Published", client: "Across All Genres", image: "/images/01.jpg" },
    { id: 2, percent: "98%", label: "5-Star Client Satisfaction Rate", client: "Verified Author Reviews", image: "/images/02.jpg" },
    { id: 3, percent: "30+", label: "Global Distribution Platforms", client: "Amazon, B&N, Kobo & More", image: "/images/03.jpg" },
    { id: 4, percent: "2,400+", label: "Copies Sold — Single Title", client: "Mystery Thriller Author", image: "/images/04.jpg" },
    { id: 5, percent: "3x", label: "Average Sales Increase", client: "After Our Marketing Plans", image: "/images/05.jpg" },
    { id: 6, percent: "12+", label: "Years of Publishing Excellence", client: "Est. 2012", image: "/images/06.jpg" },
    { id: 7, percent: "300+", label: "Happy Authors Served", client: "First-Time to Bestsellers", image: "/images/07.jpg" },
];

const headerMask: Variants = {
    hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 20 },
    visible: {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        y: 0,
        transition: { duration: 0.8, ease: smoothEase }
    },
};

const bigStatVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 40, filter: "blur(8px)" },
    visible: {
        opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.6, ease: smoothEase }
    },
    exit: {
        opacity: 0, scale: 0.95, y: -30, filter: "blur(4px)",
        transition: { duration: 0.4 }
    },
};

const cardStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

const cardItem: Variants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: smoothEase },
    },
};


export default function MarketingSection() {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        setProgress(0);
        if (progressRef.current) clearInterval(progressRef.current);

        progressRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + (100 / (4000 / 50)); 
            });
        }, 50);

        const t = setTimeout(() => setCurrent((p) => (p + 1) % stats.length), 4000);
        return () => {
            clearTimeout(t);
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [current]);

    const s = stats[current];

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen overflow-hidden"
            style={{ fontFamily: "'Raleway', Arial, sans-serif", background: "#0d0d0d" }}
        >
            <div className="absolute inset-0">
                <motion.div
                    animate={{ scale: 1.15 }}
                    transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    className="absolute inset-0 will-change-transform"
                >
                    <Image src="/images/Marketing-bg.webp" alt="" fill className="object-cover opacity-10" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d]/95 via-[#0d0d0d]/80 to-[#0d0d0d]/60" />
            </div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, ease: smoothEase }}
                className="absolute top-0 left-0 right-0 h-1 bg-[#e8391d] origin-left"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                <div className="flex flex-col justify-center px-12 lg:px-20 py-24 border-r border-white/5">

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{ duration: 0.5, ease: smoothEase }}
                        className="flex items-center gap-3 mb-10 overflow-hidden"
                    >
                        <span className="w-8 h-[2px] bg-[#e8391d]" />
                        <span className="text-[#e8391d] font-black uppercase tracking-[0.28em] text-[11px]">Our Results</span>
                    </motion.div>

                    <motion.h2
                        variants={headerMask}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="font-black text-white uppercase leading-[1.0] mb-14"
                        style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)" }}
                    >
                        REAL EFFORT.<br />
                        <span className="text-[#e8391d]">REAL NUMBERS.</span>
                    </motion.h2>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={s.id}
                            variants={bigStatVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="mb-10"
                        >
                            <div
                                className="font-black text-[#e8391d] leading-none mb-3"
                                style={{ fontSize: "clamp(4.5rem, 10vw, 9rem)" }}
                            >
                                {s.percent}
                            </div>
                            <p
                                className="font-black text-white uppercase leading-tight mb-2"
                                style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)" }}
                            >
                                {s.label}
                            </p>
                            <p className="text-white/35 text-[12px] uppercase tracking-widest font-bold">
                                — {s.client}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center gap-3 w-full max-w-[180px] mb-10">
                        <div className="relative flex items-center gap-2.5 flex-1">
                            {stats.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`rounded-full transition-all duration-300 relative ${i === current
                                        ? "bg-[#e8391d] w-7 h-2.5"
                                        : "bg-white/20 hover:bg-white/40 w-2.5 h-2.5"
                                        }`}
                                >
                                    {i === current && (
                                        <motion.div
                                            className="absolute inset-0 bg-[#e8391d] rounded-full"
                                            style={{ width: `${progress}%` }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.a
                        href="#"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        whileHover={{ backgroundColor: "#c0271a", gap: "14px" }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-3 bg-[#e8391d] text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl text-[12px] transition-all self-start cursor-pointer"
                    >
                        See Our Portfolio <ArrowRight size={15} />
                    </motion.a>
                </div>

                <motion.div
                    variants={cardStagger}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-2 gap-px bg-white/5 self-stretch"
                >
                    {stats.map((st, i) => (
                        <motion.button
                            key={st.id}
                            variants={cardItem}
                            onClick={() => setCurrent(i)}
                            whileHover={{ scale: 1.03, zIndex: 10 }} 
                            transition={{ duration: 0.2 }}
                            className={`relative flex flex-col justify-end p-7 text-left overflow-hidden transition-colors duration-300 ${i === current
                                ? "bg-[#e8391d]/15"
                                : "bg-[#111] hover:bg-white/[0.06]"
                                }`}
                            style={{ minHeight: "185px" }}
                        >
                            <div className="absolute inset-0 opacity-15">
                                <Image src={st.image} alt="" fill className="object-cover" />
                            </div>

                            {i === current && (
                                <motion.div
                                    layoutId="activeBar"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className="absolute top-0 left-0 right-0 h-[3px] bg-[#e8391d]"
                                />
                            )}

                            <div className={`relative z-10 mb-3 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${i === current ? "bg-[#e8391d]" : "bg-white/8"}`}>
                                <TrendingUp size={15} className={i === current ? "text-white" : "text-white/40"} />
                            </div>

                            <div className="relative z-10">
                                <p
                                    className="font-black leading-none mb-1 transition-colors duration-300"
                                    style={{
                                        fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                                        color: i === current ? "#e8391d" : "rgba(255,255,255,0.75)",
                                    }}
                                >
                                    {st.percent}
                                </p>
                                <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold leading-snug">
                                    {st.label}
                                </p>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}