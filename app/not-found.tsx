import type { Metadata } from "next";
import Link from "next/link";
import css from "./not-found.module.css";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: "Page not found",
  description: "Unfortunately, the page at this address does not exist!",
  alternates: {
    canonical: "https://08-zustand-omega-beige.vercel.app/404",
  },
  openGraph: {
    title: "Page not found",
    description: "Unfortunately, the page at this address does not exist!",
    url: `${baseURL}/404`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className={css.btn}>
        Go to the main page
      </Link>
    </div>
  );
}
