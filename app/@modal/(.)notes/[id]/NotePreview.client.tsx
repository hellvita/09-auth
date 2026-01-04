"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import Loading from "@/app/loading";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const handleClose = () => router.back();

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

  let errorMessage = "";
  let formattedDate = "";
  if (error || !note)
    errorMessage = error ? error.message : "Data was not loaded";
  else
    formattedDate = note.updatedAt
      ? `Updated at: ${note.updatedAt}`
      : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={handleClose}>
      {isLoading && <Loading />}
      {(error || !note) && !isLoading && (
        <p className={css.error}>
          Could not fetch note details: <i>{errorMessage}</i>
        </p>
      )}
      {note && (
        <div>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
              </div>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>{formattedDate}</p>
            </div>
          </div>
          <button onClick={handleClose} className={css.btn}>
            {"<< "} back
          </button>
        </div>
      )}
    </Modal>
  );
}
