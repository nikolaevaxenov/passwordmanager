"use client";

import PasswordDeleteModal from "@/components/Password/PasswordDeleteModal";
import PasswordEditModal from "@/components/Password/PasswordEditModal";
import PasswordShareModal from "@/components/Password/PasswordShareModal";
import { AuthToken } from "@/features/auth/authSlice";
import { PasswordData } from "@/services/passwords";
import styles from "@/styles/components/Password/PasswordCard.module.scss";
import Link from "next/link";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillEdit } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import {
  BsBoxArrowUpRight,
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsFillKeyFill,
  BsLink45Deg,
} from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Modal from "react-modal";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import "react-toastify/dist/ReactToastify.css";

export default function PasswordCard({
  t,
  password,
  refetch,
  notify,
  authToken,
}: {
  t: Messages["ProfilePage"]["password"];
  password: PasswordData;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.main__title}>
          <div>
            <h1>{password.title}</h1>
          </div>
          <div>
            <Link
              href={password.url}
              target="_blank"
              className={styles.icon__button}
            >
              <BsBoxArrowUpRight />
            </Link>
          </div>
          {password.sharedWithUsers.length !== Number(0) ? (
            <div className={styles.main__title__shared}>
              <BsLink45Deg />
              {password.owner_email === authToken?.email
                ? t.card.sharing
                : `(${t.card.sharedWithYou} ${password.owner_email})`}
            </div>
          ) : null}
        </div>
        <div className={styles.main__credentials}>
          <div className={styles.icon}>
            <FaUserAlt />
          </div>
          <div>
            <p>{password.username}</p>
          </div>
          <div className={styles.icon__button}>
            <CopyToClipboard
              text={password.username}
              onCopy={() => notify(t.card.usernameCopiedNotify)}
            >
              <BiCopy />
            </CopyToClipboard>
          </div>
          <div className={styles.icon}>
            <BsFillKeyFill />
          </div>
          <div>
            <p>{showPassword ? password.password : "•".repeat(32)}</p>
          </div>
          <div className={styles.icon__password}>
            <div
              className={styles.icon__button}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
            <div className={styles.icon__button}>
              <CopyToClipboard
                text={password.password}
                onCopy={() => notify(t.card.passwordCopiedNotify)}
              >
                <BiCopy />
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div className={styles.main__buttons}>
          {password.note && (
            <button
              onClick={() => {
                setShowNote(!showNote);
              }}
            >
              {showNote ? t.card.hideNoteButton : t.card.showNoteButton}
            </button>
          )}
          {password.owner_email === authToken?.email && (
            <button
              onClick={() => setEditModalIsOpen(true)}
              style={{ backgroundColor: "#90e0ef" }}
            >
              <AiFillEdit />
            </button>
          )}
          {password.owner_email === authToken?.email && (
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
        {showNote && <div className={styles.main__note}>{password.note}</div>}
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
        <PasswordEditModal
          t={t}
          password={password}
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
        <PasswordDeleteModal
          t={t.deleteModal}
          passwordId={password.id}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          notify={notify}
          refetch={refetch}
          shared={password.owner_email !== authToken?.email}
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
        <PasswordShareModal
          t={t.shareModal}
          password={password}
          setShareModalIsOpen={setShareModalIsOpen}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
