import { Note } from "@/types/note";
import Link from "next/link";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import NoteHeader from "../NoteHeader/NoteHeader";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => deleteNote(id),
    onSuccess: (deletedNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast(`The '${deletedNote.title}' note has been deleted!`);
    },
    onError: () =>
      toast("Could not delete note, please try again...", {
        style: {
          borderColor: "#d32f2f",
        },
      }),
  });
  const handleDeleteNote = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <NoteHeader title={note.title} />
          <p className={css.content}>{note.content ?? ""}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
