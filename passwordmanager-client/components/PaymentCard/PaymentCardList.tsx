"use client";

import PaymentCardAddModal from "@/components/PaymentCard/PaymentCardAddModal";
import PaymentCardCard from "@/components/PaymentCard/PaymentCardCard";
import { AuthToken } from "@/features/auth/authSlice";
import { getAllPaymentCards, PaymentCardData } from "@/services/paymentCards";
import styles from "@/styles/components/PaymentCard/PaymentCardList.module.scss";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "react-modal";
import { useQuery } from "react-query";

type PaymentCardListProps = {
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
};

export default function PaymentCardList({
  notify,
  authToken,
}: PaymentCardListProps) {
  const { isSuccess, refetch, data } = useQuery(
    ["paymentCards", authToken?.token],
    () => authToken?.token && getAllPaymentCards(authToken.token)
  );

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  return (
    <>
      <div className={styles.main}>
        {isSuccess &&
          data &&
          data.map((paymentCard: PaymentCardData) => (
            <PaymentCardCard
              key={paymentCard.id}
              paymentCard={paymentCard}
              refetch={refetch}
              notify={notify}
              authToken={authToken}
            />
          ))}
        <div className={styles.main__addPaymentCardButton}>
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
        <PaymentCardAddModal
          setAddModalIsOpen={setAddModalIsOpen}
          notify={notify}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
