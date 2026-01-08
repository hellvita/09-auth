import clsx from "clsx";
import EditIcon from "../EditIcon/EditIcon";
import css from "./NoteHeader.module.css";

interface NoteHeaderProps {
  title: string;
  styles?: string[];
  iconSize?: number;
}

export default function NoteHeader({
  styles,
  iconSize,
  title,
}: NoteHeaderProps) {
  let filteredStyles = [""];
  if (styles) filteredStyles = styles.map((name) => css[name]).filter(Boolean);

  return (
    <div className={css.titleContainer}>
      <h2 className={clsx(css.title, ...filteredStyles)}>{title}</h2>
      <EditIcon iconSize={iconSize} />
    </div>
  );
}
