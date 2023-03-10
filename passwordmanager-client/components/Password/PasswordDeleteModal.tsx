"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  deletePassword,
  DeletePasswordData,
  removeSharePasswordWithMe,
} from "@/services/passwords";
import styles from "@/styles/components/Password/PasswordDeleteModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

export default function PasswordDeleteModal({
  t,
  passwordId,
  setDeleteModalIsOpen,
  notify,
  refetch,
  shared = false,
}: {
  t: Messages["ProfilePage"]["password"]["deleteModal"];
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
      <h1>{shared ? t.deleteSharingText : t.deleteText}</h1>
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
                      notify(t.deleteSuccessfulNotify);
                      refetch();
                    },
                    onError: () => {
                      setDeleteModalIsOpen(false);
                      notify(t.deleteFailedNotify, true);
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
                      notify(t.deleteSuccessfulNotify);
                      refetch();
                    },
                    onError: () => {
                      setDeleteModalIsOpen(false);
                      notify(t.deleteFailedNotify, true);
                    },
                  }
                );
          }}
        >
          {t.deleteButton}
        </button>
        <button onClick={() => setDeleteModalIsOpen(false)}>
          {t.cancelButton}
        </button>
      </div>
    </div>
  );
}
