"use client";
import css from "./Error.module.css";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <p className={css.text}>
        Sorry, there was an error loading your notes, please try again... <br />
        Details: <i>{error.message}</i>
      </p>
      <button onClick={reset} className={css.reset}>
        Reset
      </button>
    </div>
  );
}
