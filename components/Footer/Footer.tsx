import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© 2025 NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Olha Sereda</p>
          <p>
            Contact us:&#160;
            <a href="mailto:olhasereda1443@gmail.com">
              olhasereda1443@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
