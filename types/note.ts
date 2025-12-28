export interface Note {
  readonly id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

// export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
export type NoteTag = (typeof TAG_TYPES)[number];

export const TAG_TYPES = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;
