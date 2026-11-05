"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Menu, ChevronDown, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ── Services mega-menu data ───────────────────────────────────────────────────
const servicesMenu = [
    {
        label: "Writing Services",
        links: [
            "Book Writing",
            "Ghostwriting",
            "Children's Book Writing",
            "Sci-Fi Writing",
            "Memoir Writing",
            "Fiction Writing",
            "SEO Content Writing",
            "Mystery Writing",
            "Historical Writing",
            "Fantasy Writing",
            "Non-Fiction Writing",
            "Script Writing",
            "Horror Writing",
        ],
    },
    {
        label: "Editing & Publishing",
        links: [
            "Book Proofreading",
            "Book Editing",
            "Ebook Creation",
            "Audiobook Narration",
            "Book Formatting",
            "Children's Book Editing",
            "Book Publishing",
        ],
    },
    {
        label: "Design, Printing & Marketing",
        links: [
            "Book Cover Design",
            "Author Website Design",
            "Book Printing",
            "Book Marketing",
        ],
    },
];

const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Reviews", href: "/reviews" },
    { label: "Blogs", href: "/Blogs" },
    { label: "Contact", href: "/contact" },
];

const dropdownVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const subVariants = {
    hidden: { opacity: 0, x: -6 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.18, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -4, transition: { duration: 0.12 } },
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [activeService, setActiveService] = useState<string>(servicesMenu[0].label);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);

    const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleServicesEnter = () => {
        if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
        setServicesOpen(true);
    };

    const handleServicesLeave = () => {
        servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 100);
    };

    const navTextColor = scrolled ? "text-white" : "text-white";
    const navHoverColor = scrolled ? "hover:text-black/80" : "hover:text-[#e8391d]";
    const contactColor = scrolled ? "text-white/90" : "text-white";
    const chevronColor = scrolled ? "text-white/60" : "text-white/40";

    const activeLinks = servicesMenu.find((s) => s.label === activeService)?.links ?? [];

    return (
        <header
            className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
            style={{
                background: scrolled ? "#e8391d" : "transparent",
                backdropFilter: scrolled ? "blur(14px)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
            }}
        >
            {/* ── Top bar ── */}
            <div className="flex items-center justify-end gap-4 sm:gap-8 px-4 sm:px-8 h-[34px]">
                <a
                    href="tel:2797770380"
                    className={`flex items-center gap-1.5 text-[13px] ${contactColor} ${scrolled ? "hover:text-black/60" : "hover:text-[#e8391d]"} transition-colors group`}
                    style={{ fontFamily: "'Raleway', Arial, sans-serif" }}
                >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${scrolled ? "bg-white/20 group-hover:bg-black/20" : "bg-[#e8391d]"}`}>
                        <Phone size={9} className="text-white" />
                    </span>
                    <span className="hidden sm:inline">(279) 777-0380</span>
                </a>
                <a
                    href="mailto:info@bexleypublishing.com"
                    className={`flex items-center gap-1.5 text-[13px] ${contactColor} ${scrolled ? "hover:text-black/60" : "hover:text-[#e8391d]"} transition-colors group`}
                    style={{ fontFamily: "'Raleway', Arial, sans-serif" }}
                >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${scrolled ? "bg-white/20 group-hover:bg-black/20" : "bg-[#e8391d]"}`}>
                        <Mail size={9} className="text-white" />
                    </span>
                    <span className="hidden sm:inline">info@bexleypublishing.com</span>
                </a>
            </div>

            <nav className="flex items-center justify-between px-4 sm:px-8 h-[72px]">

                <a href="/" className="shrink-0 flex items-center h-full">
                    <Image
                        src="/images/Bexley-Publishing-02.png"
                        alt="Bexley Publications"
                        width={260}
                        height={44}
                        className="object-contain py-3 max-w-[180px] sm:max-w-[260px] lg:max-w-[320px]"
                        priority
                    />
                </a>

                <ul className="hidden lg:flex items-center">
                    {navItems.map((item) => {
                        if (item.label === "Services") {
                            return (
                                <li
                                    key="Services"
                                    className="relative"
                                    onMouseEnter={handleServicesEnter}
                                    onMouseLeave={handleServicesLeave}
                                >
                                    <a
                                        href="/services"
                                        className={`flex items-center gap-1 px-3 py-2 font-semibold transition-colors duration-300 ${navTextColor} ${navHoverColor}`}
                                        style={{ fontFamily: "'Raleway', Arial, sans-serif", fontSize: "16px" }}
                                    >
                                        Services
                                        <ChevronDown
                                            size={12}
                                            className={`transition-transform duration-200 ${chevronColor} ${servicesOpen ? "rotate-180" : ""}`}
                                        />
                                    </a>

                                    <AnimatePresence>
                                        {servicesOpen && (
                                            <motion.div
                                                variants={dropdownVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                onMouseEnter={handleServicesEnter}
                                                onMouseLeave={handleServicesLeave}
                                                className="absolute top-full right-0 z-50 origin-top flex"
                                                style={{
                                                    width: "680px",
                                                    background: "rgba(15, 15, 20, 0.95)",
                                                    backdropFilter: "blur(20px)",
                                                    WebkitBackdropFilter: "blur(20px)",
                                                    border: "1px solid rgba(255,255,255,0.08)",
                                                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                                                }}
                                            >
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-[#e8391d]" />

                                                <div className="w-[240px] shrink-0 pt-6 pb-4 border-r border-white/10">
                                                    {servicesMenu.map((srv) => (
                                                        <button
                                                            key={srv.label}
                                                            onMouseEnter={() => setActiveService(srv.label)}
                                                            className={`w-full flex items-center justify-between px-5 py-3 text-[13px] font-semibold transition-colors text-left
                                                                ${activeService === srv.label
                                                                    ? "bg-[#e8391d]/15 text-[#e8391d]"
                                                                    : "text-white/75 hover:text-white hover:bg-white/5"
                                                                }`}
                                                            style={{ fontFamily: "'Raleway', Arial, sans-serif" }}
                                                        >
                                                            {srv.label}
                                                            <ChevronRight size={13} className="opacity-50 shrink-0" />
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="flex-1 pt-6 pb-4 px-5">
                                                    <p
                                                        className="text-[10px] font-black uppercase tracking-widest text-[#e8391d] mb-4"
                                                        style={{ fontFamily: "'Raleway', Arial, sans-serif" }}
                                                    >
                                                        {activeService}
                                                    </p>
                                                    <AnimatePresence mode="wait">
                                                        <motion.ul
                                                            key={activeService}
                                                            variants={subVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            className="grid grid-cols-2 gap-x-4"
                                                        >
                                                            {activeLinks.map((link) => (
                                                                <li key={link}>
                                                                    <Link
                                                                        href={`/InnerServices/${slugify(link)}`}
                                                                        className="flex items-center gap-2 py-1.5 text-[13px] text-white/75 hover:text-[#e8391d] hover:bg-white/5 rounded px-2 transition-colors group"
                                                                        style={{ fontFamily: "'Raleway', Arial, sans-serif" }}
                                                                    >
                                                                        <span className="w-1 h-1 rounded-full bg-[#e8391d] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                                                        {link}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </motion.ul>
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            );
                        }

                        return (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className={`flex items-center px-3 py-2 font-semibold transition-colors duration-300 ${navTextColor} ${navHoverColor}`}
                                    style={{ fontFamily: "'Raleway', Arial, sans-serif", fontSize: "16px" }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <button
                    className="lg:hidden p-2 transition-colors text-white"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden overflow-hidden"
                        style={{
                            background: "rgba(15, 15, 20, 0.97)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                        }}
                    >
                        <ul className="px-6 py-4 flex flex-col gap-1">
                            {navItems.map((item) => {
                                if (item.label === "Services") {
                                    return (
                                        <li key="Services">
                                            <div className="flex items-center border-b border-white/5">
                                                <a
                                                    href="/services"
                                                    className="flex-1 text-left px-3 py-3 text-[14px] font-semibold text-white/85 hover:text-[#e8391d] transition-colors"
                                                    style={{ fontFamily: "'Raleway', Arial, sans-serif" }}
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    Services
                                                </a>
                                                <button
                                                    className="p-3 text-white/40 hover:text-[#e8391d] transition-colors"
                                                    onClick={() => setMobileServicesOpen((v) => !v)}
                                                    aria-label="Toggle services submenu"
                                                >
                                                    <ChevronDown size={14} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                                                </button>
                                            </div>

                                            <AnimatePresence>
                                                {mobileServicesOpen && (
                                                    <motion.ul
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="pl-2 overflow-hidden"
                                                    >
                                                        {servicesMenu.map((srv) => (
                                                            <li key={srv.label}>
                                                                <button
                                                                    className="w-full text-left px-3 py-2.5 text-[13px] font-semibold text-white/70 hover:text-[#e8391d] flex items-center justify-between border-b border-white/5 transition-colors"
                                                                    style={{ fontFamily: "'Raleway', Arial, sans-serif" }}
                                                                    onClick={() => setMobileSubOpen(mobileSubOpen === srv.label ? null : srv.label)}
                                                                >
                                                                    {srv.label}
                                                                    <ChevronDown size={12} className={`transition-transform ${mobileSubOpen === srv.label ? "rotate-180" : ""} text-white/30`} />
                                                                </button>
                                                                <AnimatePresence>
                                                                    {mobileSubOpen === srv.label && (
                                                                        <motion.ul
                                                                            initial={{ opacity: 0, height: 0 }}
                                                                            animate={{ opacity: 1, height: "auto" }}
                                                                            exit={{ opacity: 0, height: 0 }}
                                                                            className="pl-4 overflow-hidden"
                                                                        >
                                                                            {srv.links.map((link) => (
                                                                                <li key={link}>
                                                                                    <Link
                                                                                        href={`/InnerServices/${slugify(link)}`}
                                                                                        className="block px-3 py-2 text-[12px] text-white/50 hover:text-[#e8391d] transition-colors"
                                                                                        style={{ fontFamily: "'Raleway', Arial, sans-serif" }}
                                                                                        onClick={() => setMobileOpen(false)}
                                                                                    >
                                                                                        {link}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </motion.ul>
                                                                    )}
                                                                </AnimatePresence>
                                                            </li>
                                                        ))}
                                                    </motion.ul>
                                                )}
                                            </AnimatePresence>
                                        </li>
                                    );
                                }
                                return (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="block px-3 py-3 text-[14px] font-semibold text-white/85 hover:text-[#e8391d] border-b border-white/5 transition-colors"
                                            style={{ fontFamily: "'Raleway', Arial, sans-serif" }}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}