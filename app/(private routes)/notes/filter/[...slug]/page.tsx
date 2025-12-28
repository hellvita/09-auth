import type { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/api";
import { NoteTag } from "@/types/note";

interface NotesProps {
  params: Promise<{ slug: ("all" | NoteTag)[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  const titleStr = `${tag === "all" ? "All" : tag}`;
  const descriptionStr = `${
    tag === "all" ? "List of the all notes" : "List of notes with tag " + tag
  }`;

  return {
    title: titleStr,
    description: descriptionStr,
    openGraph: {
      title: titleStr,
      description: descriptionStr,
      url: `https://08-zustand-omega-beige.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: titleStr,
        },
      ],
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes({ tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient currentTag={tag} />
    </HydrationBoundary>
  );
}
