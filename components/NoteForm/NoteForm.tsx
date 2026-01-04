"use client";

import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useId } from "react";
import { NewNote, TAG_TYPES, NoteTag } from "@/types/note";
import { createNote } from "@/lib/api/clientApi";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import toast from "react-hot-toast";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const fieldId = useId();

  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setDraft({ ...draft, [event.target.name]: event.target.value });

  const router = useRouter();
  const toAllNotes = () => router.push("/notes/filter/all");
  const handleCancel = () => toAllNotes();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast(`The '${newNote.title}' note has been added!`);
      clearDraft();
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

  const handleSubmit = (formData: FormData) => {
    const rawValues = Object.fromEntries(formData);
    const values: NewNote = {
      title: String(rawValues.title),
      content: String(rawValues.content),
      tag: String(rawValues.tag) as NoteTag,
    };
    mutate(values);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          type="text"
          name="title"
          id={`${fieldId}-title`}
          defaultValue={draft?.title}
          onChange={handleChange}
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
          defaultValue={draft?.content}
          onChange={handleChange}
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
          defaultValue={draft?.tag}
          onChange={handleChange}
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
          Create note
        </button>
      </div>
    </form>
  );
}
