"use client";

import { logout, selectAuthToken } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  changeEmail,
  ChangeEmailData,
  changePassword,
  ChangePasswordData,
} from "@/services/auth";
import styles from "@/styles/components/Settings.module.scss";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PasswordChangeFormData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

type EmailChangeFormData = {
  currentPassword: string;
  newEmail: string;
};

export default function SettingsComponent({ t }: { t: Messages["Settings"] }) {
  const authToken = useAppSelector(selectAuthToken);
  const dispatch = useAppDispatch();
  const [changePasswordError, setChangePasswordError] = useState(false);
  const [changeEmailError, setChangeEmailError] = useState(false);
  const [changeEmailSuccess, setChangeEmailSuccess] = useState(false);

  useEffect(() => {
    if (authToken === null && changeEmailSuccess === false) {
      redirect("/");
    }
  }, [authToken, changeEmailSuccess]);

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

  const {
    register: registerPasswordForm,
    handleSubmit: handleSubmitPasswordForm,
    watch,
    formState: { errors: errorsPasswordForm },
  } = useForm<PasswordChangeFormData>();
  const newPasswordValue = watch(["newPassword"]);
  const changePasswordMutation = useMutation(
    (credentials: ChangePasswordData) => changePassword(credentials)
  );

  const {
    register: registerEmailForm,
    handleSubmit: handleSubmitEmailForm,
    formState: { errors: errorsEmailForm },
  } = useForm<EmailChangeFormData>();
  const changeEmailMutation = useMutation((credentials: ChangeEmailData) =>
    changeEmail(credentials)
  );

  const onSubmitPasswordForm = handleSubmitPasswordForm((data) => {
    if (authToken?.email) {
      changePasswordMutation.mutate(
        {
          loginRequest: {
            email: authToken?.email,
            password: data.currentPassword,
          },
          newPassword: data.newPassword,
        },
        {
          onSuccess: () => {
            notify(t.passwordSuccessNotification);
          },
          onError: () => setChangePasswordError(true),
        }
      );
    }
  });

  const onSubmitEmailForm = handleSubmitEmailForm((data) => {
    if (authToken?.email) {
      changeEmailMutation.mutate(
        {
          loginRequest: {
            email: authToken?.email,
            password: data.currentPassword,
          },
          newEmail: data.newEmail,
        },
        {
          onSuccess: () => {
            flushSync(() => {
              setChangeEmailSuccess(true);
            });
            dispatch(logout());
          },
          onError: () => setChangeEmailError(true),
        }
      );
    }
  });

  return (
    <div className={styles.main}>
      {changeEmailSuccess ? (
        <div className={styles.main__successEmailChange}>
          <h1>{t.successEmailChange.header}</h1>
          <p>{t.successEmailChange.subtext}</p>
          <Link href="/">{t.successEmailChange.link}</Link>
        </div>
      ) : (
        <>
          <div className={styles.main__passwordChange}>
            <h1>{t.passwordChange.header}</h1>
            <form onSubmit={onSubmitPasswordForm}>
              <div>
                <div>
                  <p>
                    {t.passwordChange.currentPassword}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </p>
                  <input
                    type="password"
                    style={{
                      outline: errorsPasswordForm.currentPassword
                        ? "3px solid red"
                        : undefined,
                    }}
                    {...registerPasswordForm("currentPassword", {
                      required: t.passwordChange.currentPasswordRequired,
                      minLength: {
                        value: 6,
                        message: t.passwordChange.currentPasswordMinLength,
                      },
                      maxLength: {
                        value: 32,
                        message: t.passwordChange.currentPasswordMaxLength,
                      },
                    })}
                  />
                  {errorsPasswordForm.currentPassword && (
                    <span className={styles.formError}>
                      {errorsPasswordForm.currentPassword?.message}
                    </span>
                  )}
                </div>

                <div>
                  <p>
                    {t.passwordChange.newPassword}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </p>
                  <input
                    type="password"
                    style={{
                      outline: errorsPasswordForm.newPassword
                        ? "3px solid red"
                        : undefined,
                    }}
                    {...registerPasswordForm("newPassword", {
                      required: t.passwordChange.newPasswordRequired,
                      minLength: {
                        value: 6,
                        message: t.passwordChange.newPasswordMinLength,
                      },
                      maxLength: {
                        value: 32,
                        message: t.passwordChange.newPasswordMaxLength,
                      },
                    })}
                  />
                  {errorsPasswordForm.newPassword && (
                    <span className={styles.formError}>
                      {errorsPasswordForm.newPassword?.message}
                    </span>
                  )}
                </div>

                <div>
                  <p>
                    {t.passwordChange.confirmPassword}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </p>
                  <input
                    type="password"
                    style={{
                      outline: errorsPasswordForm.confirmNewPassword
                        ? "3px solid red"
                        : undefined,
                    }}
                    {...registerPasswordForm("confirmNewPassword", {
                      required: t.passwordChange.confirmPasswordRequired,
                      minLength: {
                        value: 6,
                        message: t.passwordChange.confirmPasswordMinLength,
                      },
                      maxLength: {
                        value: 32,
                        message: t.passwordChange.confirmPasswordMaxLength,
                      },
                      validate: (pass) =>
                        pass === newPasswordValue[0] ||
                        t.passwordChange.confirmPasswordMustMatch,
                    })}
                  />
                  {errorsPasswordForm.confirmNewPassword && (
                    <span className={styles.formError}>
                      {errorsPasswordForm.confirmNewPassword?.message}
                    </span>
                  )}
                  {changePasswordError && (
                    <p className={styles.formError}>
                      {t.passwordChange.passwordIncorrect}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button type="submit">
                  {t.passwordChange.passwordChangeSave}
                </button>
              </div>
            </form>
          </div>
          <div className={styles.main__emailChange}>
            <h1>{t.emailChange.header}</h1>
            <p>
              {t.emailChange.currentEmail} {authToken?.email}
            </p>
            <form onSubmit={onSubmitEmailForm}>
              <div>
                <div>
                  <p>
                    {t.emailChange.currentPassword}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </p>
                  <input
                    type="password"
                    style={{
                      outline: errorsEmailForm.currentPassword
                        ? "3px solid red"
                        : undefined,
                    }}
                    {...registerEmailForm("currentPassword", {
                      required: t.emailChange.currentPasswordRequired,
                      minLength: {
                        value: 6,
                        message: t.emailChange.currentPasswordMinLength,
                      },
                      maxLength: {
                        value: 32,
                        message: t.emailChange.currentPasswordMaxLength,
                      },
                    })}
                  />
                  {errorsEmailForm.currentPassword && (
                    <span className={styles.formError}>
                      {errorsEmailForm.currentPassword?.message}
                    </span>
                  )}
                </div>

                <div>
                  <p>
                    {t.emailChange.newEmail}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </p>
                  <input
                    placeholder="user@mail.com"
                    style={{
                      outline: errorsEmailForm.newEmail
                        ? "3px solid red"
                        : undefined,
                    }}
                    {...registerEmailForm("newEmail", {
                      required: t.emailChange.newEmailRequired,
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                        message: t.emailChange.newEmailInvalid,
                      },
                    })}
                  />
                  {errorsEmailForm.newEmail && (
                    <span className={styles.formError}>
                      {errorsEmailForm.newEmail?.message}
                    </span>
                  )}
                  {changeEmailError && (
                    <p className={styles.formError}>
                      {t.emailChange.newEmailExists}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button type="submit">{t.emailChange.emailChangeSave}</button>
              </div>
            </form>
          </div>
        </>
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
