"use client";
import { fetchNotes } from "@/lib/api/api";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoResultMessage from "@/components/NoResultMessage/NoResultMessage";
import NoteList from "@/components/NoteList/NoteList";
import { notFound } from "next/navigation";
import Link from "next/link";
import { NoteTag, TAG_TYPES } from "@/types/note";
import css from "./Notes.module.css";

interface NotesClientProps {
  currentTag?: NoteTag;
}

export default function NotesClient({ currentTag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const isValidRoute = (route: string | undefined): boolean =>
    route ? (TAG_TYPES as readonly string[]).includes(route) : true;

  if (!isValidRoute(currentTag)) notFound();

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, searchQuery, currentTag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        search: searchQuery !== "" ? searchQuery : undefined,
        tag: currentTag,
      }),
    placeholderData: keepPreviousData,
    throwOnError: true,
    staleTime: 60 * 1000,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 1000);

  return (
    <div className={css.notes_page}>
      <header className={css.toolbar}>
        <SearchBox query={searchQuery} onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isSuccess && data.notes.length === 0 && searchQuery !== "" && (
        <NoResultMessage invalidQuery={searchQuery} />
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && data.notes.length === 0 && currentTag && searchQuery === "" && (
        <NoResultMessage invalidQuery={`the ${currentTag} tag`} />
      )}
    </div>
  );
}
