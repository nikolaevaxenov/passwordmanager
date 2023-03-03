"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import { addNewNote, NewNoteData } from "@/services/notes";
import styles from "@/styles/components/Note/NoteEditModal.module.scss";
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
  setAddModalIsOpen,
  notify,
  refetch,
}: {
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
          notify("Note successfully added!");
          refetch();
        },
      }
    );
  });

  return (
    <div className={styles.main}>
      <h1>Add new note</h1>
      <form className={styles.edit__form} onSubmit={onSubmit}>
        <div>
          <p>
            Note's title <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="My Note"
            style={{
              outline: errors.title ? "3px solid red" : undefined,
            }}
            {...register("title", {
              required: "Note title is required!",
            })}
          />
          {errors.title && (
            <p className={styles.edit__form__error}>{errors.title?.message}</p>
          )}
        </div>

        <div>
          <p>
            Text <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.text ? "3px solid red" : undefined,
            }}
            {...register("text", {
              required: "Note text is required!",
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
          Add note
        </button>
        <button
          className={styles.modalCancel}
          type="button"
          onClick={() => setAddModalIsOpen(false)}
          style={{
            background: "#ef233c",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
