import KidsPublishingLandingPage from "@/components/pages/landing/Kidspublishinglandingpage";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

/* Montserrat font for the headings on this page only */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
    title: { absolute: "Children's Book Publishing Services | Bexley Publishing" },
    description:
        "We edit, illustrate, and publish children's books: picture books, board books, early readers, chapter books, and middle grade. Keep your rights and 100% of your royalties.",
};

export default function ChildrensBookPublishingPage() {
    return (
        <div className={montserrat.variable}>
            <KidsPublishingLandingPage/>
        </div>
    );
}