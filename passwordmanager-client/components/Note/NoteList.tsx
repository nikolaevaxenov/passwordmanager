"use client";

import { AuthToken } from "@/features/auth/authSlice";

type NoteListProps = {
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
};

export default function NoteList({ notify, authToken }: NoteListProps) {
  return (
    <>
      <h1>Note list</h1>
    </>
  );
}
