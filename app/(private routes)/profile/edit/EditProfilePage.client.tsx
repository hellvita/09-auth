"use client";

import { useRouter } from "next/navigation";
import { update, UpdateRequest } from "@/lib/api/clientApi";
import Image from "next/image";
import css from "./EditProfilePage.module.css";

interface EditProfilePageProps {
  email: string;
  username: string;
  avatar: string;
}

export default function EditProfilePageClient({
  email,
  username,
  avatar,
}: EditProfilePageProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      //??
      console.log("formData: ", formData);

      const formValues = Object.fromEntries(
        formData
      ) as unknown as UpdateRequest;

      //??
      console.log("formValues: ", formValues);
      console.log("formValues.username: ", formValues.username);

      const res = await update(formValues);

      //??
      console.log("res: ", res);

      if (res) router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => router.push("/profile");

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              required
              defaultValue={username}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
