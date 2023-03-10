"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  AddressData,
  addShareAddress,
  AddShareAddressData,
  removeShareAddress,
  RemoveShareAddressData,
} from "@/services/addresses";
import styles from "@/styles/components/Address/AddressShareModal.module.scss";
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

type ShareAddressFormData = {
  email: string;
};

export default function AddressShareModal({
  t,
  address,
  setShareModalIsOpen,
  refetch,
}: {
  t: Messages["ProfilePage"]["address"]["shareModal"];
  address: AddressData;
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
  } = useForm<ShareAddressFormData>();

  const addShareAddressMutation = useMutation(
    (credentials: AddShareAddressData) => addShareAddress(credentials)
  );

  const removeShareAddressMutation = useMutation(
    (credentials: RemoveShareAddressData) => removeShareAddress(credentials)
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
    addShareAddressMutation.mutate(
      {
        token: authToken?.token || "",
        id: address.id,
        userEmail: data.email,
      },
      {
        onSuccess: () => {
          notify(t.sharedNotify);
          refetch();
        },
        onError: () => {
          notify(t.shareFailedNotify, true);
        },
      }
    );
  });

  return (
    <>
      <div className={styles.main}>
        <h1>{t.header}</h1>
        <form onSubmit={onSubmit}>
          <p>
            {t.userEmail} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="mail@mail.com"
            style={{
              outline: errors.email ? "3px solid red" : undefined,
            }}
            {...register("email", {
              required: t.userEmailRequired,
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                message: t.userEmailInvalid,
              },
            })}
          />
          {errors.email && (
            <p className={styles.main__error}>{errors.email?.message}</p>
          )}

          <button type="submit">{t.shareButton}</button>
        </form>
        <div className={styles.main__shareTable}>
          {address.sharedWithUsers.map((email) => (
            <>
              <p key={email}>{email}</p>
              <button
                onClick={() =>
                  removeShareAddressMutation.mutate(
                    {
                      token: authToken?.token || "",
                      id: address.id,
                      userEmail: email,
                    },
                    {
                      onSuccess: () => {
                        notify(t.userDeletedNotify);
                        refetch();
                      },
                      onError: () => {
                        notify(t.userDeleteFailedNotify, true);
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
        <button onClick={() => setShareModalIsOpen(false)}>
          {t.exitButton}
        </button>
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
