import { getMe } from "@/lib/api/serverApi";
import EditProfilePageClient from "./EditProfilePage.client";

export default async function EditProfilePage() {
  const user = await getMe();

  return (
    <EditProfilePageClient
      email={user.email}
      username={user.username}
      avatar={user.avatar}
    />
  );
}
