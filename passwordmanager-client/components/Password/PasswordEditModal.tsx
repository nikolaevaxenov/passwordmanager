"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  editPassword,
  EditPasswordData,
  PasswordData,
} from "@/services/passwords";
import styles from "@/styles/components/Password/PasswordEditModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

type PasswordEditFormData = {
  title?: string;
  username?: string;
  password?: string;
  url?: string;
  note?: string;
};

export default function PasswordEditModal({
  password,
  setEditModalIsOpen,
  notify,
  refetch,
}: {
  password: PasswordData;
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
  } = useForm<PasswordEditFormData>({
    defaultValues: {
      title: password.title,
      username: password.username,
      password: password.password,
      url: password.url,
      note: password.note,
    },
  });

  const mutation = useMutation((credentials: EditPasswordData) =>
    editPassword(credentials)
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        token: authToken?.token || "",
        id: password.id,
        title: data.title,
        url: data.url,
        username: data.username,
        password: data.password,
        note: data.note,
      },
      {
        onSuccess: () => {
          setEditModalIsOpen(false);
          notify("Password successfully edited!");
          refetch();
        },
        onError: () => {
          setEditModalIsOpen(false);
          notify("Password edit failed!", true);
        },
      }
    );
  });

  return (
    <div className={styles.main}>
      <h1>Editing password</h1>
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

        <button
          type="submit"
          style={{
            background: "#60d394",
          }}
        >
          Save password
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
