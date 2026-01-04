"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/api/clientApi";
import Image from "next/image";
import toast from "react-hot-toast";
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
  const [userName, setUserName] = useState(username);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserName(event.target.value);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await updateMe({ email, username: userName });

    if (res) {
      router.push("/profile");
    } else {
      toast("Could not update profile, please try again...");
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

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              required
              defaultValue={username}
              onChange={handleChange}
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
