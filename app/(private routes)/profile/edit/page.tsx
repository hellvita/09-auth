"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import Loading from "@/app/loading";
import Image from "next/image";
import toast from "react-hot-toast";
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [newUserData, setNewUserUser] = useState<User | null>(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();

        setNewUserUser(data);
        setUserName(data.username);
      } catch {
        toast("Could not load profile, please try again...");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserName(event.target.value);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await updateMe({
      email: newUserData?.email ? newUserData.email : "",
      username: userName,
    });

    if (res) {
      setUser(res);
      router.push("/profile");
    } else {
      toast("Could not update profile, please try again...");
    }
  };

  const handleCancel = () => router.push("/profile");

  if (!newUserData) return <Loading />;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={newUserData.avatar}
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
              defaultValue={newUserData.username}
              onChange={handleChange}
            />
          </div>

          <p>Email: {newUserData.email}</p>

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
