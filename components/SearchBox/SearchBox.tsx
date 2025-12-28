import css from "./SearchBox.module.css";

interface SearchBoxProps {
  query: string;
  onSearch: (query: string) => void;
}
export default function SearchBox({ query, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={query}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
