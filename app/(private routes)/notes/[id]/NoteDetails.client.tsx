"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import Loading from "@/app/loading";
import NoteHeader from "@/components/NoteHeader/NoteHeader";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    staleTime: 60 * 1000,
  });

  const handleBack = () => router.push("/notes/filter/all");

  if (isLoading) return <Loading />;

  if (error || !note) throw error ? error : new Error("Data was not loaded");

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.item}>
          <NoteHeader
            title={note.title}
            styles={["titlePreview"]}
            iconSize={20}
          />
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
      <button onClick={handleBack} className={css.btn}>
        {"<< "} back
      </button>
    </div>
  );
}
