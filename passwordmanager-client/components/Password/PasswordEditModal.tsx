"use client";

import PasswordGenerator from "@/components/Password/PasswordGenerator";
import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  editPassword,
  EditPasswordData,
  PasswordData,
} from "@/services/passwords";
import styles from "@/styles/components/Password/PasswordEditModal.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FaDice } from "react-icons/fa";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

export type PasswordEditFormData = {
  title?: string;
  username?: string;
  password?: string;
  url?: string;
  note?: string;
};

export default function PasswordEditModal({
  t,
  password,
  setEditModalIsOpen,
  notify,
  refetch,
}: {
  t: Messages["ProfilePage"]["password"];
  password: PasswordData;
  setEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
  notify: (text: string, error?: boolean) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) {
  const authToken = useAppSelector(selectAuthToken);

  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    setValue,
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
          notify(t.editModal.editedNotify);
          refetch();
        },
        onError: () => {
          setEditModalIsOpen(false);
          notify(t.editModal.editFailedNotify, true);
        },
      }
    );
  });

  return (
    <div className={styles.main}>
      <h1>{t.editModal.header}</h1>
      <form className={styles.edit__form} onSubmit={onSubmit}>
        <div>
          <p>
            {t.editModal.title} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder={t.editModal.titlePlaceholder}
            style={{
              outline: errors.title ? "3px solid red" : undefined,
            }}
            {...register("title", {
              required: t.editModal.titleRequired,
            })}
          />
          {errors.title && (
            <p className={styles.edit__form__error}>{errors.title?.message}</p>
          )}
        </div>

        <div>
          <p>
            {t.editModal.username} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="username@mail.com"
            style={{
              outline: errors.username ? "3px solid red" : undefined,
            }}
            {...register("username", {
              required: t.editModal.usernameRequired,
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
            {t.editModal.password} <span style={{ color: "red" }}>*</span>
          </p>
          <div className={styles.edit__form__password}>
            <input
              placeholder="pass"
              type={showPassword ? "text" : "password"}
              style={{
                outline: errors.password ? "3px solid red" : undefined,
              }}
              {...register("password", {
                required: t.editModal.passwordRequired,
              })}
            />
            <div className={styles.icon_button}>
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </div>
              <div
                onClick={() => setShowPasswordGenerator(!showPasswordGenerator)}
              >
                <FaDice />
              </div>
            </div>
          </div>
          {errors.password && (
            <p className={styles.edit__form__error}>
              {errors.password?.message}
            </p>
          )}
        </div>

        <div>
          <p>
            {t.editModal.website} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="https://google.com/"
            style={{
              outline: errors.url ? "3px solid red" : undefined,
            }}
            {...register("url", {
              required: t.editModal.website,
            })}
          />
          {errors.url && (
            <p className={styles.edit__form__error}>{errors.url?.message}</p>
          )}
        </div>

        <div>
          <p>{t.editModal.note}</p>
          <textarea
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
          {t.editModal.saveButton}
        </button>
        <button
          className={styles.modalCancel}
          type="button"
          onClick={() => setEditModalIsOpen(false)}
          style={{
            background: "#ef233c",
          }}
        >
          {t.editModal.cancelButton}
        </button>
      </form>
      {showPasswordGenerator && (
        <PasswordGenerator
          t={t.passwordGenerator}
          setShowPasswordGenerator={setShowPasswordGenerator}
          setValue={setValue}
        />
      )}
    </div>
  );
}
