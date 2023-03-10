"use client";

import PasswordAddModal from "@/components/Password/PasswordAddModal";
import PasswordCard from "@/components/Password/PasswordCard";
import { AuthToken } from "@/features/auth/authSlice";
import { getAllPasswords, PasswordData } from "@/services/passwords";
import styles from "@/styles/components/Password/PasswordList.module.scss";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "react-modal";
import { useQuery } from "react-query";

type PasswordListProps = {
  t: Messages["ProfilePage"]["password"];
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
};

export default function PasswordList({
  t,
  notify,
  authToken,
}: PasswordListProps) {
  const { isSuccess, refetch, data } = useQuery(
    ["passwords", authToken?.token],
    () => authToken?.token && getAllPasswords(authToken.token)
  );

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  return (
    <>
      <div className={styles.main}>
        {isSuccess &&
          data &&
          data.map((password: PasswordData) => (
            <PasswordCard
              key={password.id}
              t={t}
              password={password}
              refetch={refetch}
              notify={notify}
              authToken={authToken}
            />
          ))}
        <div className={styles.main__addPasswordButton}>
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
        <PasswordAddModal
          t={t}
          setAddModalIsOpen={setAddModalIsOpen}
          notify={notify}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
