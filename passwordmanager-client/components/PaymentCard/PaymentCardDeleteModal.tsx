"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  deletePaymentCard,
  DeletePaymentCardData,
  removeSharePaymentCardWithMe,
} from "@/services/paymentCards";
import styles from "@/styles/components/PaymentCard/PaymentCardDeleteModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

export default function PaymentCardDeleteModal({
  t,
  paymentCardId,
  setDeleteModalIsOpen,
  notify,
  refetch,
  shared = false,
}: {
  t: Messages["ProfilePage"]["paymentCard"]["deleteModal"];
  paymentCardId: number;
  setDeleteModalIsOpen: Dispatch<SetStateAction<boolean>>;
  notify: (text: string, error?: boolean) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  shared: boolean;
}) {
  const authToken = useAppSelector(selectAuthToken);

  const deletePaymentCardMutation = useMutation(
    (credentials: DeletePaymentCardData) => deletePaymentCard(credentials)
  );

  const removeSharePaymentCardWithMeMutation = useMutation(
    (credentials: DeletePaymentCardData) =>
      removeSharePaymentCardWithMe(credentials)
  );

  return (
    <div className={styles.main}>
      <h1>{shared ? t.deleteSharingText : t.deleteText}</h1>
      <div>
        <button
          onClick={() => {
            shared
              ? removeSharePaymentCardWithMeMutation.mutate(
                  {
                    token: authToken?.token || "",
                    id: paymentCardId,
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
              : deletePaymentCardMutation.mutate(
                  {
                    token: authToken?.token || "",
                    id: paymentCardId,
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
