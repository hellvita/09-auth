import { CiEdit } from "react-icons/ci";
import css from "./EditIcon.module.css";

interface EditIconProps {
  iconSize?: number;
}

export default function EditIcon({ iconSize = 16 }: EditIconProps) {
  return <CiEdit className={css.editIcon} size={iconSize} />;
}
