"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUp, FileText, Mail, MapPin, Phone } from "lucide-react";
import { Raleway } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import QuoteModal from "../Quotemodal";

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], display: "swap" });

const GREEN = "#00a870";
const FOREST = "#07150f";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const columns = [
  {
    title: "Writing services",
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
    ].map((l) => ({ label: l, href: `/InnerServices/${slugify(l)}` })),
  },
  {
    title: "Editing & publishing",
    links: [
      "Book Proofreading",
      "Book Editing",
      "Ebook Creation",
      "Audiobook Narration",
      "Book Formatting",
      "Children's Book Editing",
      "Book Publishing",
    ].map((l) => ({ label: l, href: `/InnerServices/${slugify(l)}` })),
  },
  {
    title: "Design & marketing",
    links: ["Book Cover Design", "Author Website Design", "Book Printing", "Book Marketing"].map((l) => ({
      label: l,
      href: `/InnerServices/${slugify(l)}`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blogs & Insights", href: "/Blogs" },
      { label: "Pricing Plans", href: "/pricing" },
      { label: "Contact Us", href: "/contact" },
      { label: "Reviews", href: "/reviews" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/BexleyPublishing",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bexley_publishing/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
];

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const linkStagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.035 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};
const reveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1, ease: EASE, delay: 0.35 } },
};

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a870]";

const StarPath = () => <path d="M12 3.2l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 16.6l-5.3 2.9 1.1-5.9L3.4 9.5l6-.8L12 3.2z" />;

export default function ReviewFooter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [quoteOpen, setQuoteOpen] = useState(false);
  const state = inView ? "visible" : "hidden";

  return (
    <footer
      ref={ref}
      className={`${raleway.className} relative overflow-hidden text-white antialiased`}
      style={{ backgroundColor: FOREST }}
    >
      <div
        className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full"
        style={{ background: "rgba(0,168,112,0.2)", filter: "blur(140px)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full"
        style={{ background: "rgba(0,168,112,0.1)", filter: "blur(130px)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 20% 15%, black 15%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse at 20% 15%, black 15%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20 min-[1800px]:max-w-[1700px] min-[2400px]:max-w-[2200px]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur sm:p-12 min-[2400px]:p-20"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full"
            style={{ background: "rgba(0,168,112,0.35)", filter: "blur(90px)" }}
          />
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 right-10 hidden h-64 w-64 fill-white/[0.03] lg:block"
          >
            <StarPath />
          </svg>

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <motion.a
                href="#reviews"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm text-white/80 hover:border-white/30"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full" style={{ backgroundColor: GREEN }}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-white">
                    <StarPath />
                  </svg>
                </span>
                Publish with confidence
              </motion.a>
              <motion.h3
                variants={reveal}
                initial="hidden"
                animate={state}
                className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl min-[2400px]:text-7xl"
              >
                Grab the spotlight your story deserves.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
              >
                Join the authors above. Tell us about your book and get a clear plan for writing, publishing and marketing
                it.
              </motion.p>
            </div>

            <motion.button
              type="button"
              onClick={() => setQuoteOpen(true)}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex h-14 shrink-0 items-center justify-center gap-3 self-start rounded-full px-8 text-[15px] font-bold text-white shadow-[0_14px_34px_-12px_rgba(0,168,112,0.8)] lg:self-center min-[2400px]:h-20 min-[2400px]:px-12 min-[2400px]:text-xl ${FOCUS}`}
              style={{ backgroundColor: GREEN }}
            >
              <FileText size={18} />
              Get a free proposal
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={state}
          className="grid gap-12 py-16 lg:grid-cols-[280px_1fr] lg:gap-16 min-[1800px]:grid-cols-[340px_1fr] min-[2400px]:grid-cols-[420px_1fr] min-[2400px]:py-24"
        >
          <motion.div variants={stagger} className="flex flex-col">
            <motion.div variants={fadeUp}>
              <Link href="/" className={`inline-block rounded ${FOCUS}`}>
                <Image
                  src="/images/Bexley-Publishing-03.png"
                  alt="Bexley Publishing"
                  width={300}
                  height={80}
                  className="h-auto w-[220px] object-contain min-[2400px]:w-[320px]"
                />
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 max-w-sm text-sm leading-[1.85] text-white/55 min-[2400px]:text-lg">
              Bexley Publishing is a USA-based eBook services agency that helps authors publish confidently and
              professionally while connecting their books with the right readers.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-7 space-y-3.5">
              {[
                { icon: <Phone size={14} />, label: "(279) 777-0380", href: "tel:2797770380" },
                { icon: <Mail size={14} />, label: "info@bexleypublishing.com", href: "mailto:info@bexleypublishing.com" },
                { icon: <MapPin size={14} />, label: "2390 Fruitridge Rd, Sacramento, CA 95822" },
              ].map((c) => {
                const inner = (
                  <>
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors"
                      style={{ backgroundColor: "rgba(0,168,112,0.14)", color: GREEN }}
                    >
                      {c.icon}
                    </span>
                    <span className="pt-1.5">{c.label}</span>
                  </>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a
                        href={c.href}
                        className={`group flex items-start gap-3 rounded text-sm text-white/65 transition-colors hover:text-white min-[2400px]:text-lg ${FOCUS}`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <p className="flex items-start gap-3 text-sm text-white/65 min-[2400px]:text-lg">{inner}</p>
                    )}
                  </li>
                );
              })}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-7 flex items-center gap-2.5">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  className={`grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors hover:border-[#00a870] hover:bg-[#00a870] hover:text-white min-[2400px]:h-14 min-[2400px]:w-14 ${FOCUS}`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.nav
            variants={stagger}
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 min-[2400px]:gap-12"
          >
            {columns.map((col) => (
              <motion.div key={col.title} variants={fadeUp}>
                <p className="text-[15px] font-bold text-white min-[2400px]:text-xl">{col.title}</p>
                <span className="mt-3 block h-0.5 w-8 rounded-full" style={{ backgroundColor: GREEN }} />
                <motion.ul variants={linkStagger} className="mt-5 space-y-2.5">
                  {col.links.map((l) => (
                    <motion.li key={l.label} variants={fadeUp}>
                      <Link
                        href={l.href}
                        className={`group inline-flex items-center gap-2 rounded text-[13.5px] text-white/55 transition-colors hover:text-white min-[2400px]:text-lg ${FOCUS}`}
                      >
                        <span
                          className="h-1.5 w-0 rounded-full transition-all duration-300 group-hover:w-1.5"
                          style={{ backgroundColor: GREEN }}
                        />
                        {l.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative border-t border-white/10"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 min-[1800px]:max-w-[1700px] min-[2400px]:max-w-[2200px]">
          <p className="text-xs text-white/40 min-[2400px]:text-base">© 2026 Bexley Publishing LLC. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-5">
            {legal.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`rounded text-xs text-white/40 transition-colors hover:text-white min-[2400px]:text-base ${FOCUS}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        aria-label="Back to top"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-[70px] right-5 z-50 grid h-11 w-11 place-items-center rounded-full text-white shadow-[0_10px_28px_-6px_rgba(0,168,112,0.6)] sm:bottom-[90px] sm:right-10 min-[2400px]:h-16 min-[2400px]:w-16 ${FOCUS}`}
        style={{ backgroundColor: GREEN }}
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </motion.button>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </footer>
  );
}