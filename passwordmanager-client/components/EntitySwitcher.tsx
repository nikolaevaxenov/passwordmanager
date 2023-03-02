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

export default function EntitySwitcher() {
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
        Passwords
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
        Payment Cards
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
        Addresses
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
        Notes
      </button>
    </div>
  );
}
