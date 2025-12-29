import axios from "axios";
import { Note, NoteTag, NewNote } from "@/types/note";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

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
