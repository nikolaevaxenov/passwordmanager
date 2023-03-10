"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import { editNote, EditNoteData, NoteData } from "@/services/notes";
import styles from "@/styles/components/Note/NoteEditModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

type NoteEditFormData = {
  title?: string;
  text?: string;
};

export default function NoteEditModal({
  t,
  note,
  setEditModalIsOpen,
  notify,
  refetch,
}: {
  t: Messages["ProfilePage"]["note"]["editModal"];
  note: NoteData;
  setEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
  notify: (text: string, error?: boolean) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) {
  const authToken = useAppSelector(selectAuthToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteEditFormData>({
    defaultValues: {
      title: note.title,
      text: note.text,
    },
  });

  const mutation = useMutation((credentials: EditNoteData) =>
    editNote(credentials)
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        token: authToken?.token || "",
        id: note.id,
        title: data.title,
        text: data.text,
      },
      {
        onSuccess: () => {
          setEditModalIsOpen(false);
          notify(t.editedNotify);
          refetch();
        },
        onError: () => {
          setEditModalIsOpen(false);
          notify(t.editFailedNotify, true);
        },
      }
    );
  });

  return (
    <div className={styles.main}>
      <h1>{t.header}</h1>
      <form className={styles.edit__form} onSubmit={onSubmit}>
        <div>
          <p>
            {t.header} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder={t.titlePlaceholder}
            style={{
              outline: errors.title ? "3px solid red" : undefined,
            }}
            {...register("title", {
              required: t.titleRequired,
            })}
          />
          {errors.title && (
            <p className={styles.edit__form__error}>{errors.title?.message}</p>
          )}
        </div>

        <div>
          <p>
            {t.text} <span style={{ color: "red" }}>*</span>
          </p>
          <textarea
            style={{
              outline: errors.text ? "3px solid red" : undefined,
            }}
            {...register("text", {
              required: t.textRequired,
            })}
          />
          {errors.text && (
            <p className={styles.edit__form__error}>{errors.text?.message}</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            background: "#60d394",
          }}
        >
          {t.saveButton}
        </button>
        <button
          className={styles.modalCancel}
          type="button"
          onClick={() => setEditModalIsOpen(false)}
          style={{
            background: "#ef233c",
          }}
        >
          {t.cancelButton}
        </button>
      </form>
    </div>
  );
}
