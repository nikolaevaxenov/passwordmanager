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
  note,
  setEditModalIsOpen,
  notify,
  refetch,
}: {
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
          notify("Note successfully edited!");
          refetch();
        },
        onError: () => {
          setEditModalIsOpen(false);
          notify("Note edit failed!", true);
        },
      }
    );
  });

  return (
    <div className={styles.main}>
      <h1>Editing note</h1>
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
          <textarea
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
          Save note
        </button>
        <button
          className={styles.modalCancel}
          type="button"
          onClick={() => setEditModalIsOpen(false)}
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
