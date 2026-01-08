import EditNoteForm from "@/components/EditNoteForm/EditNoteForm";
import css from "./EditNote.module.css";

export default function EditNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Edit note</h1>
        <EditNoteForm />
      </div>
    </main>
  );
}
