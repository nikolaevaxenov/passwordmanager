"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import { addNewNote, NewNoteData } from "@/services/notes";
import styles from "@/styles/components/Note/NoteAddModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

type NoteAddFormData = {
  title: string;
  text: string;
};

export default function NoteAddModal({
  t,
  setAddModalIsOpen,
  notify,
  refetch,
}: {
  t: Messages["ProfilePage"]["note"]["addModal"];
  setAddModalIsOpen: Dispatch<SetStateAction<boolean>>;
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
  } = useForm<NoteAddFormData>();

  const mutation = useMutation((credentials: NewNoteData) =>
    addNewNote(credentials)
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        token: authToken?.token || "",
        title: data.title,
        text: data.text,
      },
      {
        onSuccess: () => {
          setAddModalIsOpen(false);
          notify(t.addedNotify);
          refetch();
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
            {t.title} <span style={{ color: "red" }}>*</span>
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
          {t.addButton}
        </button>
        <button
          className={styles.modalCancel}
          type="button"
          onClick={() => setAddModalIsOpen(false)}
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
