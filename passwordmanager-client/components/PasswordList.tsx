"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import { getAllPasswords, PasswordData } from "@/services/passwords";
import styles from "@/styles/PasswordList.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { useQuery } from "react-query";
import PasswordCard from "@/components/PasswordCard";
import Modal from "react-modal";
import { useState } from "react";
import PasswordAddModal from "@/components/PasswordAddModal";

export default function PasswordList({
  notify,
}: {
  notify: (text: string, error?: boolean) => void;
}) {
  const auth = useAppSelector(selectAuthToken);

  const { isSuccess, refetch, data } = useQuery(
    ["passwords", auth?.token],
    () => auth?.token && getAllPasswords(auth.token)
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
              password={password}
              refetch={refetch}
              notify={notify}
              authToken={auth}
            />
          ))}
        <button
          className={styles.main__addPasswordButton}
          onClick={() => setAddModalIsOpen(true)}
        >
          <AiOutlinePlus />
        </button>
      </div>
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
          content: {
            position: "absolute",
            top: "10rem",
            left: "20%",
            right: "20%",
            bottom: "10%",
            background: "#2E373D",
            border: "1px solid rgba(255, 255, 255, 0.54)",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <PasswordAddModal
          setAddModalIsOpen={setAddModalIsOpen}
          notify={notify}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}