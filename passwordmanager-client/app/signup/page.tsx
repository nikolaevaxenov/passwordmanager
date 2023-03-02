"use client";

import {
  createAuthToken,
  selectAuthToken,
  setAuthToken,
} from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { SignInCredentials, signUp } from "@/services/auth";
import styles from "@/styles/components/SignUpForm.module.scss";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type SignUpFormData = {
  email: string;
  password1: string;
  password2: string;
};

export default function SignUpForm() {
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
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password1Value = watch(["password1"]);

  const mutation = useMutation((credentials: SignInCredentials) =>
    signUp(credentials)
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      { email: data.email, password: data.password1 },
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
      <div className={styles.signup}>
        <div className={styles.signup__header}>
          <h1>Create an account</h1>
          <p>
            Already have an account? <Link href="/signin">Sign In</Link>
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
                required: "Email address is required!",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: "Invalid email address!",
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
              Password <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="password"
              style={{
                outline: errors.password1 ? "3px solid red" : undefined,
              }}
              {...register("password1", {
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
            {errors.password1 && (
              <p className={styles.signup__form__error}>
                {errors.password1?.message}
              </p>
            )}
          </div>

          <div>
            <p>
              Confirm your password <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="password"
              style={{
                outline: errors.password2 ? "3px solid red" : undefined,
              }}
              {...register("password2", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password must contain minimum 6 symbols!",
                },
                maxLength: {
                  value: 32,
                  message: "Password must contain maximum 32 symbols!",
                },
                validate: (pass) =>
                  pass === password1Value[0] || "Passwords must match!",
              })}
            />
            {errors.password2 && (
              <p className={styles.signup__form__error}>
                {errors.password2?.message}
              </p>
            )}
            {authError && (
              <p className={styles.signup__form__error}>
                Email is already registered!
              </p>
            )}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
