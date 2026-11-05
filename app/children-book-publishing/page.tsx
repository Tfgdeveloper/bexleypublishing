import type { Metadata } from "next";
import ChildLandingPage from "@/components/pages/landing/ChildLandingPage";

export const metadata: Metadata = {
    title: { absolute: "Children's Book Publishing Services | Bexley Publishing" },
    description:
        "Professional children's book publishing services with expert support, high-quality production and 100% ownership. Publish your children's book with Bexley Publishing.",
    openGraph: {
        title: "Children's Book Publishing Services | Bexley Publishing",
        description:
            "Professional children's book publishing services with expert guidance, quality production and 100% ownership.",
        type: "website",
    },
};

export default function ChildrensBookPage() {
    return <ChildLandingPage />;
}
