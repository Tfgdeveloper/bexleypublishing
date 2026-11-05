import { Metadata } from "next";
import MarketingProposal from "@/components/pages/Marketing-Proposal";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/sections/Marketing-Footer";

export const metadata: Metadata = {
    title: "Book Marketing & Promotion | Bexley Publishing",
    description:
        "Get your book discovered with Bexley Publishing's marketing campaigns: email marketing, book signings, author branding, Times Square promotion, influencer marketing, and more.",
};

export default function MarketingProposalPage() {
    return (
        <>
            <MarketingNavbar />

            <MarketingProposal />

            <MarketingFooter />
        </>
    );
}