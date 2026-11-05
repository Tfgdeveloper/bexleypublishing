"use client";
import { useEffect, useState } from "react";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PHONE_LABEL = "(279) 777-0380";
const PHONE_HREF = "tel:2797770380";
const EMAIL = "info@bexleypublishing.com";

export default function MarketingNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const linkClass = `group flex items-center gap-2.5 font-semibold text-white transition-colors duration-300 ${scrolled ? "hover:text-black/80" : "hover:text-[#e8391d]"
        }`;

    const iconClass = `w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${scrolled ? "bg-white/20 group-hover:bg-black/20" : "bg-[#e8391d]"
        }`;

    return (
        <header
            className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
            style={{
                background: scrolled ? "#e8391d" : "transparent",
                backdropFilter: scrolled ? "blur(14px)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
                fontFamily: "'Raleway', Arial, sans-serif",
            }}
        >
            <nav className="flex items-center justify-between gap-4 px-4 sm:px-8 h-[72px] lg:h-[88px]">
                <Link href="/" className="shrink-0 flex items-center h-full">
                    <Image
                        src={scrolled ? "/images/Bexley-Publishing-02.png" : "/images/Bexley-Publishing-03.png"}
                        alt="Bexley Publishing"
                        width={260}
                        height={44}
                        className="object-contain py-3 max-w-[150px] sm:max-w-[220px] lg:max-w-[300px]"
                        priority
                    />
                </Link>

                <div className="flex items-center gap-3 sm:gap-6 lg:gap-10">
                    <a href={PHONE_HREF} className={linkClass} aria-label={`Call us at ${PHONE_LABEL}`}>
                        <span className={iconClass}>
                            <Phone size={16} className="text-white" />
                        </span>
                        <span className="hidden sm:inline text-[15px] lg:text-[17px]">{PHONE_LABEL}</span>
                    </a>

                    <a href={`mailto:${EMAIL}`} className={linkClass} aria-label={`Email us at ${EMAIL}`}>
                        <span className={iconClass}>
                            <Mail size={16} className="text-white" />
                        </span>
                        <span className="hidden md:inline text-[15px] lg:text-[17px]">{EMAIL}</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}