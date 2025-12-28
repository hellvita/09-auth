import css from "./NoResultMessage.module.css";

interface NoResultMessageProps {
  invalidQuery: string;
}

export default function NoResultMessage({
  invalidQuery,
}: NoResultMessageProps) {
  return (
    <p className={css.text}>
      No results found for <i>{invalidQuery}</i>
    </p>
  );
}
