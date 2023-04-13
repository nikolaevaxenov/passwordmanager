"use client";

import {
  createAuthToken,
  selectAuthToken,
  setAuthToken,
} from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  FetchError,
  ForgotPasswordData,
  forgotPasswordRequest,
  signIn,
  SignInCredentials,
} from "@/services/auth";
import styles from "@/styles/components/SignInForm.module.scss";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SignInFormData = {
  email: string;
  password: string;
};

type ForgotPasswordFormData = {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function SignInComponent({ t }: { t: Messages["SignInPage"] }) {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector(selectAuthToken);

  const pathname = usePathname();

  const [authError, setAuthError] = useState<number | null>(null);

  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState(false);

  const notify = (text: string) => {
    toast.success(text, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

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
          setAuthError(0);
        },
        onError: (error: FetchError | unknown) => {
          if (error instanceof FetchError) {
            setAuthError(error.res.status === 409 ? 1 : 2);
          }
        },
      }
    );
  });

  const {
    register: registerForgotPasswordForm,
    handleSubmit: handleSubmitForgotPasswordForm,
    watch,
    formState: { errors: errorsForgotPasswordForm },
  } = useForm<ForgotPasswordFormData>();

  const password1Value = watch(["newPassword"]);

  const mutationForgotPassword = useMutation(
    (credentials: ForgotPasswordData) => forgotPasswordRequest(credentials)
  );

  const onSubmitForgotPassword = handleSubmitForgotPasswordForm(
    (data: ForgotPasswordFormData) => {
      mutationForgotPassword.mutate(
        {
          email: data.email,
          newPassword: data.newPassword,
          locale: pathname
            ? ["en", "ru"].includes(pathname?.split("/")[1])
              ? pathname?.split("/")[1]
              : "ru"
            : "ru",
        },
        {
          onSuccess: () => {
            setForgotPassword(false);
            setForgotPasswordError(false);
            notify(t.forgotPasswordNotification);
          },
          onError: () => {
            setForgotPasswordError(true);
          },
        }
      );
    }
  );

  return (
    <div className={styles.main}>
      {forgotPassword ? (
        <div className={styles.signin}>
          <div className={styles.signin__header}>
            <h1>{t.forgotPasswordHeader}</h1>
          </div>
          <form
            className={styles.signin__form}
            onSubmit={onSubmitForgotPassword}
          >
            <div>
              <p>
                Email <span style={{ color: "red" }}>*</span>
              </p>
              <input
                placeholder="example@mail.com"
                style={{
                  outline: errorsForgotPasswordForm.email
                    ? "3px solid red"
                    : undefined,
                }}
                {...registerForgotPasswordForm("email", {
                  required: t.emailRequired,
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                    message: t.emailInvalid,
                  },
                })}
              />
              {errorsForgotPasswordForm.email && (
                <p className={styles.signin__form__error}>
                  {errorsForgotPasswordForm.email?.message}
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
                  outline: errorsForgotPasswordForm.newPassword
                    ? "3px solid red"
                    : undefined,
                }}
                {...registerForgotPasswordForm("newPassword", {
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
              {errorsForgotPasswordForm.newPassword && (
                <p className={styles.signin__form__error}>
                  {errorsForgotPasswordForm.newPassword?.message}
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
                  outline: errorsForgotPasswordForm.confirmNewPassword
                    ? "3px solid red"
                    : undefined,
                }}
                {...registerForgotPasswordForm("confirmNewPassword", {
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
              {errorsForgotPasswordForm.confirmNewPassword && (
                <p className={styles.signin__form__error}>
                  {errorsForgotPasswordForm.confirmNewPassword?.message}
                </p>
              )}
            </div>
            {forgotPasswordError && (
              <p className={styles.signin__form__error}>
                {t.forgotPasswordError}
              </p>
            )}
            <a href="#" onClick={() => setForgotPassword(false)}>
              {t.title}
            </a>
            <button type="submit">{t.forgotPasswordButton}</button>
          </form>
        </div>
      ) : (
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
              {authError &&
                (authError === 2 ? (
                  <p className={styles.signin__form__error}>
                    {t.wrongCredentials}
                  </p>
                ) : (
                  <p className={styles.signin__form__error}>
                    First you need to activate your account
                  </p>
                ))}
            </div>
            <a href="#" onClick={() => setForgotPassword(true)}>
              {t.forgotPasswordLink}
            </a>
            <button type="submit">{t.signInButton}</button>
          </form>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
