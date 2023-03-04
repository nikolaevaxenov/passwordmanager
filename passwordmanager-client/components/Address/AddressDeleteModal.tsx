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
  addressId,
  setDeleteModalIsOpen,
  notify,
  refetch,
  shared = false,
}: {
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
      <h1>
        {shared
          ? "Are you sure want to stop sharing this address with you?"
          : "Are you sure want to delete this address?"}
      </h1>
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
                      notify("Address successfully deleted!");
                      refetch();
                    },
                    onError: () => {
                      setDeleteModalIsOpen(false);
                      notify("Address delete failed!", true);
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
                      notify("Address successfully deleted!");
                      refetch();
                    },
                    onError: () => {
                      setDeleteModalIsOpen(false);
                      notify("Address delete failed!", true);
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
