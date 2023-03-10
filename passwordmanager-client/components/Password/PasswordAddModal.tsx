"use client";

import PasswordGenerator from "@/components/Password/PasswordGenerator";
import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import { addNewPassword, NewPasswordData } from "@/services/passwords";
import styles from "@/styles/components/Password/PasswordAddModal.module.scss";
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

export type PasswordAddFormData = {
  title: string;
  username: string;
  password: string;
  url: string;
  note?: string;
};

export default function PasswordAddModal({
  t,
  setAddModalIsOpen,
  notify,
  refetch,
}: {
  t: Messages["ProfilePage"]["password"];
  setAddModalIsOpen: Dispatch<SetStateAction<boolean>>;
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
          notify(t.addModal.addedNotify);
          refetch();
        },
      }
    );
  });

  return (
    <div className={styles.main}>
      <h1>{t.addModal.header}</h1>
      <form className={styles.edit__form} onSubmit={onSubmit}>
        <div>
          <p>
            {t.addModal.title} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder={t.addModal.titlePlaceholder}
            style={{
              outline: errors.title ? "3px solid red" : undefined,
            }}
            {...register("title", {
              required: t.addModal.titleRequired,
            })}
          />
          {errors.title && (
            <p className={styles.edit__form__error}>{errors.title?.message}</p>
          )}
        </div>

        <div>
          <p>
            {t.addModal.username} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="username@mail.com"
            style={{
              outline: errors.username ? "3px solid red" : undefined,
            }}
            {...register("username", {
              required: t.addModal.usernameRequired,
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
            {t.addModal.password} <span style={{ color: "red" }}>*</span>
          </p>
          <div className={styles.edit__form__password}>
            <input
              placeholder="pass"
              type={showPassword ? "text" : "password"}
              style={{
                outline: errors.password ? "3px solid red" : undefined,
              }}
              {...register("password", {
                required: t.addModal.passwordRequired,
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
            {t.addModal.website} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="https://google.com/"
            style={{
              outline: errors.url ? "3px solid red" : undefined,
            }}
            {...register("url", {
              required: t.addModal.website,
            })}
          />
          {errors.url && (
            <p className={styles.edit__form__error}>{errors.url?.message}</p>
          )}
        </div>

        <div>
          <p>{t.addModal.note}</p>
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
          {t.addModal.addButton}
        </button>
        <button
          className={styles.modalCancel}
          type="button"
          onClick={() => setAddModalIsOpen(false)}
          style={{
            background: "#ef233c",
          }}
        >
          {t.addModal.cancelButton}
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
