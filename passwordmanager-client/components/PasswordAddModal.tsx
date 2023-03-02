"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import { addNewPassword, NewPasswordData } from "@/services/passwords";
import styles from "@/styles/PasswordEditModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

type PasswordAddFormData = {
  title: string;
  username: string;
  password: string;
  url: string;
  note?: string;
};

export default function PasswordAddModal({
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
  } = useForm<PasswordAddFormData>();

  const mutation = useMutation((credentials: NewPasswordData) =>
    addNewPassword(credentials)
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        token: authToken?.token || "",
        title: data.title,
        url: data.url,
        username: data.username,
        password: data.password,
        note: data.note,
      },
      {
        onSuccess: () => {
          setAddModalIsOpen(false);
          notify("Password successfully added!");
          refetch();
        },
      }
    );
  });

  return (
    <div className={styles.main}>
      <h1>Add new password</h1>
      <form className={styles.edit__form} onSubmit={onSubmit}>
        <div>
          <p>
            Password's title <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="My password"
            style={{
              outline: errors.title ? "3px solid red" : undefined,
            }}
            {...register("title", {
              required: "Password title is required!",
            })}
          />
          {errors.title && (
            <p className={styles.edit__form__error}>{errors.title?.message}</p>
          )}
        </div>

        <div>
          <p>
            Username <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="username@mail.com"
            style={{
              outline: errors.username ? "3px solid red" : undefined,
            }}
            {...register("username", {
              required: "Username is required!",
            })}
          />
          {errors.username && (
            <p className={styles.edit__form__error}>
              {errors.username?.message}
            </p>
          )}
        </div>

        <div>
          <p>
            Password <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="pass"
            type="password"
            style={{
              outline: errors.password ? "3px solid red" : undefined,
            }}
            {...register("password", {
              required: "Password is required!",
            })}
          />
          {errors.password && (
            <p className={styles.edit__form__error}>
              {errors.password?.message}
            </p>
          )}
        </div>

        <div>
          <p>
            Website url <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="https://google.com/"
            style={{
              outline: errors.url ? "3px solid red" : undefined,
            }}
            {...register("url", {
              required: "Website url is required!",
            })}
          />
          {errors.url && (
            <p className={styles.edit__form__error}>{errors.url?.message}</p>
          )}
        </div>

        <div>
          <p>Note</p>
          <input
            style={{
              outline: errors.note ? "3px solid red" : undefined,
            }}
            {...register("note")}
          />
          {errors.note && (
            <p className={styles.edit__form__error}>{errors.note?.message}</p>
          )}
        </div>

        <button type="submit">Add password</button>
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
