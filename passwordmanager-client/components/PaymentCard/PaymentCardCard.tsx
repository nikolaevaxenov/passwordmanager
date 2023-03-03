"use client";

import PaymentCardDeleteModal from "@/components/PaymentCard/PaymentCardDeleteModal";
import PaymentCardEditModal from "@/components/PaymentCard/PaymentCardEditModal";
import PaymentCardShareModal from "@/components/PaymentCard/PaymentCardShareModal";
import { AuthToken } from "@/features/auth/authSlice";
import { PaymentCardData } from "@/services/paymentCards";
import styles from "@/styles/components/PaymentCard/PaymentCardCard.module.scss";
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
  paymentCard,
  refetch,
  notify,
  authToken,
}: {
  paymentCard: PaymentCardData;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
}) {
  console.log(paymentCard);
  const [showSecurityCode, setShowSecurityCode] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

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
                ? "(Sharing)"
                : `(Shared with you by ${paymentCard.owner_email})`}
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
            <div>
              <p>({paymentCard.cardBrand})</p>
            </div>
          </div>
          <div className={styles.icon__button}>
            <CopyToClipboard
              text={paymentCard.number}
              onCopy={() => notify("Card number copied to clipboard!")}
            >
              <BiCopy />
            </CopyToClipboard>
          </div>
          <div className={styles.icon}>
            <BsCalendarDateFill />
          </div>
          <div>
            <p>{paymentCard.expirationDate}</p>
          </div>
          <div>
            <div className={styles.icon__button}>
              <CopyToClipboard
                text={paymentCard.expirationDate}
                onCopy={() =>
                  notify("Card expiration date copied to clipboard!")
                }
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
                onCopy={() => notify("Card security code copied to clipboard!")}
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
              {showNote ? "Hide note" : "Show note"}
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
              <BsLink45Deg /> Share
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
          paymentCard={paymentCard}
          setShareModalIsOpen={setShareModalIsOpen}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
