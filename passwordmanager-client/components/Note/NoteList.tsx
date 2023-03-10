"use client";

import NoteAddModal from "@/components/Note/NoteAddModal";
import NoteCard from "@/components/Note/NoteCard";
import { AuthToken } from "@/features/auth/authSlice";
import { getAllNotes, NoteData } from "@/services/notes";
import styles from "@/styles/components/Note/NoteList.module.scss";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "react-modal";
import { useQuery } from "react-query";

type NoteListProps = {
  t: Messages["ProfilePage"]["note"];
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
};

export default function NoteList({ t, notify, authToken }: NoteListProps) {
  const { isSuccess, refetch, data } = useQuery(
    ["notes", authToken?.token],
    () => authToken?.token && getAllNotes(authToken.token)
  );

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  return (
    <>
      <div className={styles.main}>
        {isSuccess &&
          data &&
          data.map((note: NoteData) => (
            <NoteCard
              t={t}
              key={note.id}
              note={note}
              refetch={refetch}
              notify={notify}
              authToken={authToken}
            />
          ))}
        <div className={styles.main__addNoteButton}>
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
        <NoteAddModal
          t={t.addModal}
          setAddModalIsOpen={setAddModalIsOpen}
          notify={notify}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
