"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  deleteAddress,
  DeleteAddressData,
  removeShareAddressWithMe,
} from "@/services/addresses";
import styles from "@/styles/components/Address/AddressDeleteModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

export default function AddressDeleteModal({
  t,
  addressId,
  setDeleteModalIsOpen,
  notify,
  refetch,
  shared = false,
}: {
  t: Messages["ProfilePage"]["address"]["deleteModal"];
  addressId: number;
  setDeleteModalIsOpen: Dispatch<SetStateAction<boolean>>;
  notify: (text: string, error?: boolean) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  shared: boolean;
}) {
  const authToken = useAppSelector(selectAuthToken);

  const deleteAddressMutation = useMutation((credentials: DeleteAddressData) =>
    deleteAddress(credentials)
  );

  const removeShareAddressWithMeMutation = useMutation(
    (credentials: DeleteAddressData) => removeShareAddressWithMe(credentials)
  );

  return (
    <div className={styles.main}>
      <h1>{shared ? t.deleteSharingText : t.deleteText}</h1>
      <div>
        <button
          onClick={() => {
            shared
              ? removeShareAddressWithMeMutation.mutate(
                  {
                    token: authToken?.token || "",
                    id: addressId,
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
              : deleteAddressMutation.mutate(
                  {
                    token: authToken?.token || "",
                    id: addressId,
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
