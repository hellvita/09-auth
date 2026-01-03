import Link from "next/link";
import { Toaster } from "react-hot-toast";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <Toaster
        toastOptions={{
          className: `${css.toast}`,
        }}
      />
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <AuthNavigation isAuthorized={true} userEmail="" />
        </ul>
      </nav>
    </header>
  );
}
