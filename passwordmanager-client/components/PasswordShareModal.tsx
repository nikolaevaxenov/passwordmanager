"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  addSharePassword,
  AddSharePasswordData,
  PasswordData,
  removeSharePassword,
  RemoveSharePasswordData,
} from "@/services/passwords";
import styles from "@/styles/components/PasswordShareModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SharePasswordFormData = {
  email: string;
};

export default function PasswordShareModal({
  password,
  setShareModalIsOpen,
  refetch,
}: {
  password: PasswordData;
  setShareModalIsOpen: Dispatch<SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) {
  const authToken = useAppSelector(selectAuthToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SharePasswordFormData>();

  const addSharePasswordMutation = useMutation(
    (credentials: AddSharePasswordData) => addSharePassword(credentials)
  );

  const removeSharePasswordMutation = useMutation(
    (credentials: RemoveSharePasswordData) => removeSharePassword(credentials)
  );

  const notify = (text: string, error: boolean = false) => {
    !error
      ? toast.success(text, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      : toast.error(text, {
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

  const onSubmit = handleSubmit((data) => {
    addSharePasswordMutation.mutate(
      {
        token: authToken?.token || "",
        id: password.id,
        userEmail: data.email,
      },
      {
        onSuccess: () => {
          notify("Password successfully shared!");
          refetch();
        },
        onError: () => {
          notify("Share edit failed!", true);
        },
      }
    );
  });

  return (
    <>
      <div className={styles.main}>
        <h1>Share this password</h1>
        <form onSubmit={onSubmit}>
          <p>
            User's email <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="mail@mail.com"
            style={{
              outline: errors.email ? "3px solid red" : undefined,
            }}
            {...register("email", {
              required: "User's email is required!",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                message: "Invalid email address!",
              },
            })}
          />
          {errors.email && (
            <p className={styles.main__error}>{errors.email?.message}</p>
          )}

          <button type="submit">Share</button>
        </form>
        <div className={styles.main__shareTable}>
          {password.sharedWithUsers.map((email) => (
            <>
              <p key={email}>{email}</p>
              <button
                onClick={() =>
                  removeSharePasswordMutation.mutate(
                    {
                      token: authToken?.token || "",
                      id: password.id,
                      userEmail: email,
                    },
                    {
                      onSuccess: () => {
                        notify("User successfully deleted!");
                        refetch();
                      },
                      onError: () => {
                        notify("Share edit failed!", true);
                      },
                    }
                  )
                }
              >
                <RiDeleteBin2Fill />
              </button>
            </>
          ))}
        </div>
        <button onClick={() => setShareModalIsOpen(false)}>Exit</button>
      </div>
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
    </>
  );
}
