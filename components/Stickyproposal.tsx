"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function StickyProposal() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-22 right-8 flex items-center gap-3 z-[999]"
            style={{ fontFamily: "'Raleway', Arial, sans-serif" }}
        >
            <motion.a
                href="#"
                whileHover={{ scale: 1.04, backgroundColor: "#e8391d" }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="bg-[#3a3a3a]/95 backdrop-blur-sm text-white font-bold uppercase tracking-widest px-6 py-3 shadow-xl transition-colors"
                style={{ fontSize: "0.72rem" }}
            >
                Request Proposal
            </motion.a>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-[#e8391d] flex items-center justify-center shadow-xl shadow-[#e8391d]/40 overflow-hidden hover:bg-[#d42f10] transition-colors"
            >
                <Image
                    src="/images/request-quote-icon.png"
                    alt="Request Quote"
                    width={180}
                    height={180}
                    className="object-contain"
                />
            </motion.button>
        </motion.div>
    );
}