"use client";
import css from "../filter/Error.module.css";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <p className={css.text}>
      Could not fetch note details: <i>{error.message}</i>
    </p>
  );
}
