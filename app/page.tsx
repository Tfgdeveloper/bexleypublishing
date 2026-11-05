import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Bexley Publishing — Professional Book Publishing Services",
  description:
    "Bexley Publishing helps authors write, edit, design, publish, and market their books. From ghostwriting to global distribution — your story starts here.",
};

export default function Home() {
  return <HomeClient />;
}