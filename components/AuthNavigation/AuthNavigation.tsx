import Link from "next/link";
import css from "./AuthNavigation.module.css";

interface AuthNavigationProps {
  isAuthorized: boolean;
  userEmail: string;
}

export default function AuthNavigation({
  isAuthorized,
  userEmail,
}: AuthNavigationProps) {
  return (
    <>
      {isAuthorized && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{userEmail}</p>
            <button className={css.logoutButton}>Logout</button>
          </li>
        </>
      )}

      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}
