"use client";

import {
  createAuthToken,
  selectAuthToken,
  setAuthToken,
} from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { signIn, SignInCredentials } from "@/services/auth";
import styles from "@/styles/signInForm.module.scss";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
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
          <h1>Welcome back!</h1>
          <p>
            Don't have an account? <Link href="/signin">Sign Up</Link>
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
                required: "Email address is required!",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: "Invalid email address!",
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
              Password <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="password"
              style={{
                outline: errors.password ? "3px solid red" : undefined,
              }}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must contain minimum 6 symbols!",
                },
                maxLength: {
                  value: 32,
                  message: "Password must contain maximum 32 symbols!",
                },
              })}
            />
            {errors.password && (
              <p className={styles.signin__form__error}>
                {errors.password?.message}
              </p>
            )}
            {authError && (
              <p className={styles.signin__form__error}>
                Email or password is incorrect!
              </p>
            )}
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
