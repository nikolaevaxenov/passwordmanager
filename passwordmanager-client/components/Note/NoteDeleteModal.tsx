"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  deleteNote,
  DeleteNoteData,
  removeShareNoteWithMe,
} from "@/services/notes";
import styles from "@/styles/components/Note/NoteDeleteModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

export default function NoteDeleteModal({
  t,
  noteId,
  setDeleteModalIsOpen,
  notify,
  refetch,
  shared = false,
}: {
  t: Messages["ProfilePage"]["note"]["deleteModal"];
  noteId: number;
  setDeleteModalIsOpen: Dispatch<SetStateAction<boolean>>;
  notify: (text: string, error?: boolean) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  shared: boolean;
}) {
  const authToken = useAppSelector(selectAuthToken);

  const deleteNoteMutation = useMutation((credentials: DeleteNoteData) =>
    deleteNote(credentials)
  );

  const removeShareNoteWithMeMutation = useMutation(
    (credentials: DeleteNoteData) => removeShareNoteWithMe(credentials)
  );

  return (
    <div className={styles.main}>
      <h1>{shared ? t.deleteSharingText : t.deleteText}</h1>
      <div>
        <button
          onClick={() => {
            shared
              ? removeShareNoteWithMeMutation.mutate(
                  {
                    token: authToken?.token || "",
                    id: noteId,
                  },
                  {
                    onSuccess: () => {
                      setDeleteModalIsOpen(false);
                      notify(t.deleteSuccessfulNotify);
                      refetch();
                    },
                    onError: () => {
                      setDeleteModalIsOpen(false);
                      notify(t.deleteFailedNotify, true);
                    },
                  }
                )
              : deleteNoteMutation.mutate(
                  {
                    token: authToken?.token || "",
                    id: noteId,
                  },
                  {
                    onSuccess: () => {
                      setDeleteModalIsOpen(false);
                      notify(t.deleteSuccessfulNotify);
                      refetch();
                    },
                    onError: () => {
                      setDeleteModalIsOpen(false);
                      notify(t.deleteFailedNotify, true);
                    },
                  }
                );
          }}
        >
          {t.deleteButton}
        </button>
        <button onClick={() => setDeleteModalIsOpen(false)}>
          {t.cancelButton}
        </button>
      </div>
    </div>
  );
}
