"use client";

import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import css from "./EditIcon.module.css";

interface EditIconProps {
  noteId: string;
  iconSize?: number;
}

export default function EditIcon({ noteId, iconSize = 16 }: EditIconProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/notes/${noteId}/edit`);
  };
  return (
    <button onClick={handleClick} className={css.btn}>
      <CiEdit className={css.editIcon} size={iconSize} />
    </button>
  );
  return (
    <Link href={`/notes/${noteId}/edit`} className={css.link}>
      <CiEdit className={css.editIcon} size={iconSize} />
    </Link>
  );
}
