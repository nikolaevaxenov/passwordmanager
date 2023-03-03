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
  paymentCardId,
  setDeleteModalIsOpen,
  notify,
  refetch,
  shared = false,
}: {
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
      <h1>
        {shared
          ? "Are you sure want to stop sharing this payment card with you?"
          : "Are you sure want to delete this payment card?"}
      </h1>
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
                      notify("Payment card successfully deleted!");
                      refetch();
                    },
                    onError: () => {
                      setDeleteModalIsOpen(false);
                      notify("Payment card delete failed!", true);
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
                      notify("Payment card successfully deleted!");
                      refetch();
                    },
                    onError: () => {
                      setDeleteModalIsOpen(false);
                      notify("Payment card delete failed!", true);
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
