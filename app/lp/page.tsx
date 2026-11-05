
import Newlp from "@/components/pages/landing/Newlp";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: { absolute: "Children's Book Publishing Services | Bexley Publishing" },
    description:
        "We edit, illustrate, and publish children's books: picture books, board books, early readers, chapter books, and middle grade. Keep your rights and 100% of your royalties.",
};

export default function ChildrensBookPublishingPage() {
    return (
        <div >
            <Newlp/>
        </div>
    );
}