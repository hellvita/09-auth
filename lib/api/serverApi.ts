import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note, NoteTag } from "@/types/note";
import { User } from "@/types/user";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export const checkSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const fetchNotes = async ({
  search,
  page,
  perPage = 12,
  tag,
  sortBy,
}: NotesParams): Promise<NotesHttpResponse> => {
  const cookieStore = await cookies();

  const params: NotesParams = {
    search,
    page,
    perPage,
    tag,
    sortBy,
  };
  const { data } = await nextServer.get<NotesHttpResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
