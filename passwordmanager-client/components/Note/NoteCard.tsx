"use client";

import NoteDeleteModal from "@/components/Note/NoteDeleteModal";
import NoteEditModal from "@/components/Note/NoteEditModal";
import NoteShareModal from "@/components/Note/NoteShareModal";
import { AuthToken } from "@/features/auth/authSlice";
import { NoteData } from "@/services/notes";
import styles from "@/styles/components/Note/NoteCard.module.scss";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Modal from "react-modal";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import "react-toastify/dist/ReactToastify.css";

export default function NoteCard({
  t,
  note,
  refetch,
  notify,
  authToken,
}: {
  t: Messages["ProfilePage"]["note"];
  note: NoteData;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
}) {
  console.log(note);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.main__title}>
          <div>
            <h1>{note.title}</h1>
          </div>
          {note.sharedWithUsers.length !== Number(0) ? (
            <div className={styles.main__title__shared}>
              <BsLink45Deg />
              {note.owner_email === authToken?.email
                ? t.card.sharing
                : `(${t.card.sharedWithYou} ${note.owner_email})`}
            </div>
          ) : null}
        </div>
        <div className={styles.main__note}>
          <p>{note.text}</p>
        </div>
        <div className={styles.main__buttons}>
          {note.owner_email === authToken?.email && (
            <button
              onClick={() => setEditModalIsOpen(true)}
              style={{ backgroundColor: "#90e0ef" }}
            >
              <AiFillEdit />
            </button>
          )}
          {note.owner_email === authToken?.email && (
            <button
              onClick={() => setShareModalIsOpen(true)}
              style={{ backgroundColor: "#90e0ef" }}
            >
              <BsLink45Deg /> {t.card.shareButton}
            </button>
          )}
          <button
            onClick={() => setDeleteModalIsOpen(true)}
            style={{ backgroundColor: "#ef233c" }}
          >
            <RiDeleteBin2Fill />
          </button>
        </div>
      </div>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        ariaHideApp={false}
        className={styles.main__modal}
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <NoteEditModal
          t={t.editModal}
          note={note}
          setEditModalIsOpen={setEditModalIsOpen}
          notify={notify}
          refetch={refetch}
        />
      </Modal>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        ariaHideApp={false}
        className={styles.main__modal}
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <NoteDeleteModal
          t={t.deleteModal}
          noteId={note.id}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          notify={notify}
          refetch={refetch}
          shared={note.owner_email !== authToken?.email}
        />
      </Modal>
      <Modal
        isOpen={shareModalIsOpen}
        onRequestClose={() => setShareModalIsOpen(false)}
        ariaHideApp={false}
        className={styles.main__modal}
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <NoteShareModal
          t={t.shareModal}
          note={note}
          setShareModalIsOpen={setShareModalIsOpen}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
