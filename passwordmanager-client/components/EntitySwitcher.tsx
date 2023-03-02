"use client";

import {
  chooseAddresses,
  chooseNotes,
  choosePasswords,
  choosePaymentCards,
} from "@/features/profile/profileReducer";
import { useAppDispatch } from "@/hooks/hooks";
import styles from "@/styles/components/EntitySwitcher.module.scss";

export default function EntitySwitcher() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.navbar}>
      <button onClick={() => dispatch(choosePasswords())}>Passwords</button>
      <button onClick={() => dispatch(choosePaymentCards())}>
        Payment Cards
      </button>
      <button onClick={() => dispatch(chooseAddresses())}>Addresses</button>
      <button onClick={() => dispatch(chooseNotes())}>Notes</button>
    </div>
  );
}
