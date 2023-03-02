"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  deletePassword,
  DeletePasswordData,
  removeSharePasswordWithMe,
} from "@/services/passwords";
import styles from "@/styles/PasswordDeleteModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

export default function PasswordDeleteModal({
  passwordId,
  setDeleteModalIsOpen,
  notify,
  refetch,
  shared = false,
}: {
  passwordId: number;
  setDeleteModalIsOpen: Dispatch<SetStateAction<boolean>>;
  notify: (text: string, error?: boolean) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  shared: boolean;
}) {
  const authToken = useAppSelector(selectAuthToken);

  const deletePasswordMutation = useMutation(
    (credentials: DeletePasswordData) => deletePassword(credentials)
  );

  const removeSharePasswordWithMeMutation = useMutation(
    (credentials: DeletePasswordData) => removeSharePasswordWithMe(credentials)
  );

  return (
    <div className={styles.main}>
      <h1>
        {shared
          ? "Are you sure want to stop sharing this password with you?"
          : "Are you sure want to delete this password?"}
      </h1>
      <div>
        <button
          onClick={() => {
            shared
              ? removeSharePasswordWithMeMutation.mutate(
                  {
                    token: authToken?.token || "",
                    id: passwordId,
                  },
                  {
                    onSuccess: () => {
                      setDeleteModalIsOpen(false);
                      notify("Password successfully deleted!");
                      refetch();
                    },
                    onError: () => {
                      setDeleteModalIsOpen(false);
                      notify("Password delete failed!", true);
                    },
                  }
                )
              : deletePasswordMutation.mutate(
                  {
                    token: authToken?.token || "",
                    id: passwordId,
                  },
                  {
                    onSuccess: () => {
                      setDeleteModalIsOpen(false);
                      notify("Password successfully deleted!");
                      refetch();
                    },
                    onError: () => {
                      setDeleteModalIsOpen(false);
                      notify("Password delete failed!", true);
                    },
                  }
                );
          }}
        >
          Yes, delete
        </button>
        <button onClick={() => setDeleteModalIsOpen(false)}>
          No, I've changed my mind
        </button>
      </div>
    </div>
  );
}
