"use client";

import PaymentCardDeleteModal from "@/components/PaymentCard/PaymentCardDeleteModal";
import PaymentCardEditModal from "@/components/PaymentCard/PaymentCardEditModal";
import PaymentCardShareModal from "@/components/PaymentCard/PaymentCardShareModal";
import { AuthToken } from "@/features/auth/authSlice";
import { PaymentCardData } from "@/services/paymentCards";
import styles from "@/styles/components/PaymentCard/PaymentCardCard.module.scss";
import creditCardType from "credit-card-type";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillEdit, AiFillLock } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import {
  BsCalendarDateFill,
  BsFillCreditCard2FrontFill,
  BsFillEyeFill,
  BsLink45Deg,
} from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Modal from "react-modal";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentCardCard({
  t,
  paymentCard,
  refetch,
  notify,
  authToken,
}: {
  t: Messages["ProfilePage"]["paymentCard"];
  paymentCard: PaymentCardData;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
}) {
  const [showSecurityCode, setShowSecurityCode] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  const cardType = creditCardType(paymentCard.number.replaceAll(" ", ""))[0]
    ?.niceType;

  return (
    <>
      <div className={styles.main}>
        <div className={styles.main__title}>
          <div>
            <h1>{paymentCard.title}</h1>
          </div>
          {paymentCard.sharedWithUsers.length !== Number(0) ? (
            <div className={styles.main__title__shared}>
              <BsLink45Deg />
              {paymentCard.owner_email === authToken?.email
                ? t.card.sharing
                : `(${t.card.sharedWithYou} ${paymentCard.owner_email})`}
            </div>
          ) : null}
        </div>
        <div className={styles.main__credentials}>
          <div className={styles.icon}>
            <BsFillCreditCard2FrontFill />
          </div>
          <div>
            <div>
              <p>{paymentCard.number}</p>
            </div>
            <div>{cardType && <p>({cardType})</p>}</div>
          </div>
          <div className={styles.icon__button}>
            <CopyToClipboard
              text={paymentCard.number}
              onCopy={() => notify(t.card.cardNumberCopiedNotify)}
            >
              <BiCopy />
            </CopyToClipboard>
          </div>
          <div className={styles.icon}>
            <BsCalendarDateFill />
          </div>
          <div>
            <p>
              {paymentCard.expirationDate.split("-")[1]}/
              {paymentCard.expirationDate.split("-")[0].slice(2, 4)}
            </p>
          </div>
          <div>
            <div className={styles.icon__button}>
              <CopyToClipboard
                text={`${
                  paymentCard.expirationDate.split("-")[1]
                }/${paymentCard.expirationDate.split("-")[0].slice(2, 4)}`}
                onCopy={() => notify(t.card.expirationDateCopiedNotify)}
              >
                <BiCopy />
              </CopyToClipboard>
            </div>
          </div>
          <div className={styles.icon}>
            <AiFillLock />
          </div>
          <div>
            <p>{showSecurityCode ? paymentCard.securityCode : "•".repeat(3)}</p>
          </div>
          <div className={styles.icon__paymentCard}>
            <div
              className={styles.icon__button}
              onClick={() => setShowSecurityCode(!showSecurityCode)}
            >
              <BsFillEyeFill />
            </div>
            <div className={styles.icon__button}>
              <CopyToClipboard
                text={paymentCard.securityCode}
                onCopy={() => notify(t.card.securityCodeCopiedNotify)}
              >
                <BiCopy />
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div className={styles.main__buttons}>
          {paymentCard.note && (
            <button
              onClick={() => {
                setShowNote(!showNote);
              }}
            >
              {showNote ? t.card.hideNoteButton : t.card.showNoteButton}
            </button>
          )}
          {paymentCard.owner_email === authToken?.email && (
            <button
              onClick={() => setEditModalIsOpen(true)}
              style={{ backgroundColor: "#90e0ef" }}
            >
              <AiFillEdit />
            </button>
          )}
          {paymentCard.owner_email === authToken?.email && (
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
        {showNote && (
          <div className={styles.main__note}>
            <p>{paymentCard.note}</p>
          </div>
        )}
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
        <PaymentCardEditModal
          t={t.editModal}
          paymentCard={paymentCard}
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
        <PaymentCardDeleteModal
          t={t.deleteModal}
          paymentCardId={paymentCard.id}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          notify={notify}
          refetch={refetch}
          shared={paymentCard.owner_email !== authToken?.email}
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
        <PaymentCardShareModal
          t={t.shareModal}
          paymentCard={paymentCard}
          setShareModalIsOpen={setShareModalIsOpen}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
