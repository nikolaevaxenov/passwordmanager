"use client";

import {
  chooseAddresses,
  chooseNotes,
  choosePasswords,
  choosePaymentCards,
  ProfileEntities,
  selectSelectedEntity,
} from "@/features/profile/profileReducer";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/components/EntitySwitcher.module.scss";

export default function EntitySwitcher({
  t,
}: {
  t: Messages["ProfilePage"]["entitySwitcher"];
}) {
  const dispatch = useAppDispatch();
  const selectedEntity = useAppSelector(selectSelectedEntity);

  return (
    <div className={styles.main}>
      <button
        style={{
          background: `${
            selectedEntity === ProfileEntities.Passwords
              ? "#fcf6bd"
              : "rgba(252, 246, 189, 0.5)"
          }`,
        }}
        onClick={() => dispatch(choosePasswords())}
      >
        {t.password}
      </button>
      <button
        style={{
          background: `${
            selectedEntity === ProfileEntities.PaymentCards
              ? "#fcf6bd"
              : "rgba(252, 246, 189, 0.5)"
          }`,
        }}
        onClick={() => dispatch(choosePaymentCards())}
      >
        {t.paymentCard}
      </button>
      <button
        style={{
          background: `${
            selectedEntity === ProfileEntities.Addresses
              ? "#fcf6bd"
              : "rgba(252, 246, 189, 0.5)"
          }`,
        }}
        onClick={() => dispatch(chooseAddresses())}
      >
        {t.address}
      </button>
      <button
        style={{
          background: `${
            selectedEntity === ProfileEntities.Notes
              ? "#fcf6bd"
              : "rgba(252, 246, 189, 0.5)"
          }`,
        }}
        onClick={() => dispatch(chooseNotes())}
      >
        {t.note}
      </button>
    </div>
  );
}
