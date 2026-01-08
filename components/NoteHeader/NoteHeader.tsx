import clsx from "clsx";
import EditIcon from "../EditIcon/EditIcon";
import css from "./NoteHeader.module.css";

interface NoteHeaderProps {
  title: string;
  noteId: string;
  styles?: string[];
  iconSize?: number;
  editAllowed?: boolean;
}

export default function NoteHeader({
  styles,
  iconSize,
  title,
  noteId,
  editAllowed = true,
}: NoteHeaderProps) {
  let filteredStyles = [""];
  if (styles) filteredStyles = styles.map((name) => css[name]).filter(Boolean);

  return (
    <div className={css.titleContainer}>
      <h2 className={clsx(css.title, ...filteredStyles)}>{title}</h2>
      {editAllowed && <EditIcon noteId={noteId} iconSize={iconSize} />}
    </div>
  );
}
