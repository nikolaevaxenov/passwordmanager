"use client";

import AddressDeleteModal from "@/components/Address/AddressDeleteModal";
import AddressEditModal from "@/components/Address/AddressEditModal";
import AddressShareModal from "@/components/Address/AddressShareModal";
import { AuthToken } from "@/features/auth/authSlice";
import { AddressData } from "@/services/addresses";
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
  address,
  refetch,
  notify,
  authToken,
}: {
  address: AddressData;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
}) {
  console.log(address);
  const [showNote, setShowNote] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

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
                ? "(Sharing)"
                : `(Shared with you by ${address.owner_email})`}
            </div>
          ) : null}
        </div>
        <div className={styles.main__address}>
          <div>
            <h1>First name: </h1>
            <p>{address.firstName}</p>
          </div>
          <div>
            <h1>Middle name: </h1>
            <p>{address.middleName}</p>
          </div>
          <div>
            <h1>Last name: </h1>
            <p>{address.lastName}</p>
          </div>
          <div>
            <h1>Username: </h1>
            <p>{address.username}</p>
          </div>
          <div>
            <h1>Gender: </h1>
            <p>{address.gender}</p>
          </div>
          <div>
            <h1>Birth date: </h1>
            <p>{address.birthDate?.toLocaleString()}</p>
          </div>
          <div>
            <h1>Company: </h1>
            <p>{address.company}</p>
          </div>
          <div>
            <h1>Address 1: </h1>
            <p>{address.address1}</p>
          </div>
          <div>
            <h1>Address 2: </h1>
            <p>{address.address2}</p>
          </div>
          <div>
            <h1>Address 3: </h1>
            <p>{address.address3}</p>
          </div>
          <div>
            <h1>City: </h1>
            <p>{address.city}</p>
          </div>
          <div>
            <h1>County: </h1>
            <p>{address.county}</p>
          </div>
          <div>
            <h1>State: </h1>
            <p>{address.state}</p>
          </div>
          <div>
            <h1>Zip code: </h1>
            <p>{address.zipCode}</p>
          </div>
          <div>
            <h1>Country: </h1>
            <p>{address.country}</p>
          </div>
          <div>
            <h1>Email: </h1>
            <p>{address.email}</p>
          </div>
          <div>
            <h1>Phone: </h1>
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
              {showNote ? "Hide note" : "Show note"}
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
          address={address}
          setShareModalIsOpen={setShareModalIsOpen}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
