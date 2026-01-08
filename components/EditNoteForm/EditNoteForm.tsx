"use client";

import { useId } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { TAG_TYPES, UpdatedNote, NoteTag } from "@/types/note";
import { fetchNoteById, updateNoteById } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import css from "./EditNoteForm.module.css";

export default function EditNoteForm() {
  const fieldId = useId();
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  const router = useRouter();
  const toAllNotes = () => router.push("/notes/filter/all");
  const handleCancel = () => toAllNotes();

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

  const { mutate } = useMutation({
    mutationFn: updateNoteById,
    onSuccess: (updatedNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast(`The '${updatedNote.title}' note has been updated!`);
      toAllNotes();
    },
    onError: () =>
      toast("Could not save changes, please try again...", {
        style: {
          borderColor: "#d32f2f",
          textDecoration: "underline",
          textDecorationColor: "#d32f2f",
        },
      }),
  });

  const handleSubmit = async (formData: FormData) => {
    const rawValues = Object.fromEntries(formData);
    const values: UpdatedNote = {
      id,
      body: {
        title: String(rawValues.title),
        content: String(rawValues.content),
        tag: String(rawValues.tag) as NoteTag,
      },
    };
    mutate(values);
  };

  if (isLoading) return <Loading />;

  if (error || !note) throw error ? error : new Error("Data was not loaded");

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          type="text"
          name="title"
          id={`${fieldId}-title`}
          defaultValue={note.title}
          required
          minLength={3}
          maxLength={50}
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          name="content"
          id={`${fieldId}-content`}
          defaultValue={note.content}
          rows={8}
          maxLength={500}
          className={css.textarea}
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          name="tag"
          id={`${fieldId}-tag`}
          defaultValue={note.tag}
          className={css.select}
        >
          {TAG_TYPES.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Save
        </button>
      </div>
    </form>
  );
}
