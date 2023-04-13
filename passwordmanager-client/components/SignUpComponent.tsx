"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import { signUp, SignUpCredentials } from "@/services/auth";
import styles from "@/styles/components/SignUpForm.module.scss";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type SignUpFormData = {
  email: string;
  password1: string;
  password2: string;
};

export default function SignUpComponent({ t }: { t: Messages["SignUpPage"] }) {
  const authToken = useAppSelector(selectAuthToken);

  const [authError, setAuthError] = useState(false);

  const pathname = usePathname();
  console.log(
    pathname
      ? ["en", "ru"].includes(pathname?.split("/")[1])
        ? pathname?.split("/")[1]
        : "ru"
      : "ru"
  );

  useEffect(() => {
    if (authToken !== null) {
      redirect("/profile");
    }
  }, [authToken]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password1Value = watch(["password1"]);

  const mutation = useMutation((credentials: SignUpCredentials) =>
    signUp(credentials)
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        loginRequest: { email: data.email, password: data.password1 },
        locale: pathname
          ? ["en", "ru"].includes(pathname?.split("/")[1])
            ? pathname?.split("/")[1]
            : "ru"
          : "ru",
      },
      {
        onError: () => setAuthError(true),
      }
    );
  });

  return mutation.isSuccess ? (
    <div className={styles.confirmEmail}>
      <h1>{t.confirmEmail.header}</h1>
      <p>{t.confirmEmail.subtext}</p>
      <Link href="/signin">{t.confirmEmail.link}</Link>
    </div>
  ) : (
    <div className={styles.main}>
      <div className={styles.signup}>
        <div className={styles.signup__header}>
          <h1>{t.header}</h1>
          <p>
            {t.subHeader} <Link href="/signin">{t.subHeaderLink}</Link>
          </p>
        </div>
        <form className={styles.signup__form} onSubmit={onSubmit}>
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
              <p className={styles.signup__form__error}>
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
                outline: errors.password1 ? "3px solid red" : undefined,
              }}
              {...register("password1", {
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
            {errors.password1 && (
              <p className={styles.signup__form__error}>
                {errors.password1?.message}
              </p>
            )}
          </div>

          <div>
            <p>
              {t.passwordConfirm} <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="password"
              style={{
                outline: errors.password2 ? "3px solid red" : undefined,
              }}
              {...register("password2", {
                required: t.passwordRequired,
                minLength: {
                  value: 6,
                  message: t.passwordMinLength,
                },
                maxLength: {
                  value: 32,
                  message: t.passwordMaxLength,
                },
                validate: (pass) =>
                  pass === password1Value[0] || t.passwordMustMatch,
              })}
            />
            {errors.password2 && (
              <p className={styles.signup__form__error}>
                {errors.password2?.message}
              </p>
            )}
            {authError && (
              <p className={styles.signup__form__error}>
                {t.emailAlreadyExists}
              </p>
            )}
          </div>
          <button type="submit">{t.signUpButton}</button>
        </form>
      </div>
    </div>
  );
}
