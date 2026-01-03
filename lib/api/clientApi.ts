import { nextServer } from "./api";
import { Note, NoteTag, NewNote } from "@/types/note";
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

export interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (userData: RegisterRequest) => {
  const { data } = await nextServer.post<User>("/auth/register", userData);
  return data;
};

export const fetchNotes = async ({
  search,
  page,
  perPage = 12,
  tag,
  sortBy,
}: NotesParams): Promise<NotesHttpResponse> => {
  const params: NotesParams = {
    search,
    page,
    perPage,
    tag,
    sortBy,
  };
  const { data } = await nextServer.get<NotesHttpResponse>("/notes", {
    params,
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};
