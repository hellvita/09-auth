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

export interface LoginRequest {
  email: string;
  password: string;
}

interface CheckSessionRequest {
  success: boolean;
}

export interface UpdateRequest {
  username: string;
}

export const register = async (userData: RegisterRequest) => {
  const { data } = await nextServer.post<User>("/auth/register", userData);
  return data;
};

export const login = async (userData: LoginRequest) => {
  const { data } = await nextServer.post<User>("/auth/login", userData);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const update = async (userData: UpdateRequest) => {
  const { data } = await nextServer.patch<User>("/users/me", userData);
  return data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
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
