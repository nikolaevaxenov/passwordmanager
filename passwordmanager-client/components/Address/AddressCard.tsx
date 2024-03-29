"use client";

import AddressDeleteModal from "@/components/Address/AddressDeleteModal";
import AddressEditModal from "@/components/Address/AddressEditModal";
import AddressShareModal from "@/components/Address/AddressShareModal";
import { AuthToken } from "@/features/auth/authSlice";
import { AddressData, Gender } from "@/services/addresses";
import styles from "@/styles/components/Address/AddressCard.module.scss";
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

export default function AddressCard({
  t,
  address,
  refetch,
  notify,
  authToken,
}: {
  t: Messages["ProfilePage"]["address"];
  address: AddressData;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
}) {
  const [showNote, setShowNote] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  const getGender = () => {
    switch (address.gender) {
      case Gender.MALE.toUpperCase():
        return t.card.gender.male;
      case Gender.FEMALE.toUpperCase():
        return t.card.gender.female;
      case Gender.OTHER.toUpperCase():
        return t.card.gender.other;
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.main__title}>
          <div>
            <h1>{address.title}</h1>
          </div>
          {address.sharedWithUsers.length !== Number(0) ? (
            <div className={styles.main__title__shared}>
              <BsLink45Deg />
              {address.owner_email === authToken?.email
                ? t.card.sharing
                : `(${t.card.sharedWithYou} ${address.owner_email})`}
            </div>
          ) : null}
        </div>
        <div className={styles.main__address}>
          <div>
            <h1>{t.card.firstName}</h1>
            <p>{address.firstName}</p>
          </div>
          <div>
            <h1>{t.card.middleName}</h1>
            <p>{address.middleName}</p>
          </div>
          <div>
            <h1>{t.card.lastName}</h1>
            <p>{address.lastName}</p>
          </div>
          <div>
            <h1>{t.card.username}</h1>
            <p>{address.username}</p>
          </div>
          <div>
            <h1>{t.card.gender.text}</h1>
            <p>{getGender()}</p>
          </div>
          <div>
            <h1>{t.card.birthdate}</h1>
            <p>{address.birthdate?.toLocaleString()}</p>
          </div>
          <div>
            <h1>{t.card.company}</h1>
            <p>{address.company}</p>
          </div>
          <div>
            <h1>{t.card.address1}</h1>
            <p>{address.address1}</p>
          </div>
          <div>
            <h1>{t.card.address2}</h1>
            <p>{address.address2}</p>
          </div>
          <div>
            <h1>{t.card.address3}</h1>
            <p>{address.address3}</p>
          </div>
          <div>
            <h1>{t.card.city}</h1>
            <p>{address.city}</p>
          </div>
          <div>
            <h1>{t.card.county}</h1>
            <p>{address.county}</p>
          </div>
          <div>
            <h1>{t.card.state}</h1>
            <p>{address.state}</p>
          </div>
          <div>
            <h1>{t.card.zipCode}</h1>
            <p>{address.zipCode}</p>
          </div>
          <div>
            <h1>{t.card.country}</h1>
            <p>{address.country}</p>
          </div>
          <div>
            <h1>Email: </h1>
            <p>{address.email}</p>
          </div>
          <div>
            <h1>{t.card.phone}</h1>
            <p>{address.phone}</p>
          </div>
        </div>
        <div className={styles.main__buttons}>
          {address.note && (
            <button
              onClick={() => {
                setShowNote(!showNote);
              }}
            >
              {showNote ? t.card.hideNoteButton : t.card.showNoteButton}
            </button>
          )}
          {address.owner_email === authToken?.email && (
            <button
              onClick={() => setEditModalIsOpen(true)}
              style={{ backgroundColor: "#90e0ef" }}
            >
              <AiFillEdit />
            </button>
          )}
          {address.owner_email === authToken?.email && (
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
            <p>{address.note}</p>
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
        <AddressEditModal
          t={t.editModal}
          address={address}
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
        <AddressDeleteModal
          t={t.deleteModal}
          addressId={address.id}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          notify={notify}
          refetch={refetch}
          shared={address.owner_email !== authToken?.email}
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
        <AddressShareModal
          t={t.shareModal}
          address={address}
          setShareModalIsOpen={setShareModalIsOpen}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
