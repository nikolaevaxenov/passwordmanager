"use client";

import {
  createAuthToken,
  selectAuthToken,
  setAuthToken,
} from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { signIn, SignInCredentials } from "@/services/auth";
import styles from "@/styles/components/signInForm.module.scss";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInComponent({ t }: { t: Messages["SignInPage"] }) {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector(selectAuthToken);

  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (authToken !== null) {
      redirect("/profile");
    }
  }, [authToken]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation((credentials: SignInCredentials) =>
    signIn(credentials)
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (data, variables) => {
          dispatch(setAuthToken(createAuthToken(variables.email, data)));
          setAuthError(false);
        },
        onError: () => setAuthError(true),
      }
    );
  });

  return (
    <div className={styles.main}>
      <div className={styles.signin}>
        <div className={styles.signin__header}>
          <h1>{t.header}</h1>
          <p>
            {t.subHeader} <Link href="/signup">{t.subHeaderLink}</Link>
          </p>
        </div>
        <form className={styles.signin__form} onSubmit={onSubmit}>
          <div>
            <p>
              Email <span style={{ color: "red" }}>*</span>
            </p>
            <input
              placeholder="example@mail.com"
              style={{
                outline: errors.email ? "3px solid red" : undefined,
              }}
              {...register("email", {
                required: t.emailRequired,
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: t.emailInvalid,
                },
              })}
            />
            {errors.email && (
              <p className={styles.signin__form__error}>
                {errors.email?.message}
              </p>
            )}
          </div>

          <div>
            <p>
              {t.password} <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="password"
              style={{
                outline: errors.password ? "3px solid red" : undefined,
              }}
              {...register("password", {
                required: t.passwordRequired,
                minLength: {
                  value: 6,
                  message: t.passwordMinLength,
                },
                maxLength: {
                  value: 32,
                  message: t.passwordMaxLength,
                },
              })}
            />
            {errors.password && (
              <p className={styles.signin__form__error}>
                {errors.password?.message}
              </p>
            )}
            {authError && (
              <p className={styles.signin__form__error}>{t.wrongCredentials}</p>
            )}
          </div>
          <button type="submit">{t.signInButton}</button>
        </form>
      </div>
    </div>
  );
}
