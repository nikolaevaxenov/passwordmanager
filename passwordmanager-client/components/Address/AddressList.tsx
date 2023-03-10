"use client";

import AddressAddModal from "@/components/Address/AddressAddModal";
import AddressCard from "@/components/Address/AddressCard";
import { AuthToken } from "@/features/auth/authSlice";
import { AddressData, getAllAddresses } from "@/services/addresses";
import styles from "@/styles/components/Address/AddressList.module.scss";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "react-modal";
import { useQuery } from "react-query";

type AddressListProps = {
  t: Messages["ProfilePage"]["address"];
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
};

export default function AddressList({
  t,
  notify,
  authToken,
}: AddressListProps) {
  const { isSuccess, refetch, data } = useQuery(
    ["addresses", authToken?.token],
    () => authToken?.token && getAllAddresses(authToken.token)
  );

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  return (
    <>
      <div className={styles.main}>
        {isSuccess &&
          data &&
          data.map((address: AddressData) => (
            <AddressCard
              key={address.id}
              t={t}
              address={address}
              refetch={refetch}
              notify={notify}
              authToken={authToken}
            />
          ))}
        <div className={styles.main__addAddressButton}>
          <button onClick={() => setAddModalIsOpen(true)}>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        ariaHideApp={false}
        className={styles.main__modal}
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <AddressAddModal
          t={t.addModal}
          setAddModalIsOpen={setAddModalIsOpen}
          notify={notify}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
