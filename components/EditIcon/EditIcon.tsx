import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import css from "./EditIcon.module.css";

interface EditIconProps {
  noteId: string;
  iconSize?: number;
}

export default function EditIcon({ noteId, iconSize = 16 }: EditIconProps) {
  return (
    <Link href={`/notes/${noteId}/edit`} className={css.link}>
      <CiEdit className={css.editIcon} size={iconSize} />
    </Link>
  );
}
