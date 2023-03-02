"use client";

import AddressList from "@/components/Address/AddressList";
import EntitySwitcher from "@/components/EntitySwitcher";
import NoteList from "@/components/Note/NoteList";
import PasswordList from "@/components/Password/PasswordList";
import PaymentCardList from "@/components/PaymentCard/PaymentCardList";
import { selectAuthToken } from "@/features/auth/authSlice";
import {
  selectSelectedEntity,
  ProfileEntities,
} from "@/features/profile/profileReducer";
import { useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/components/profile.module.scss";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const selectedEntity = useAppSelector(selectSelectedEntity);
  const authToken = useAppSelector(selectAuthToken);

  useEffect(() => {
    if (authToken === null) {
      redirect("/");
    }
  }, [authToken]);

  const notify = (text: string, error: boolean = false) => {
    !error
      ? toast.success(text, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      : toast.error(text, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
  };

  return (
    <main className={styles.main}>
      <EntitySwitcher />
      {selectedEntity === ProfileEntities.Passwords && (
        <PasswordList notify={notify} authToken={authToken} />
      )}
      {selectedEntity === ProfileEntities.PaymentCards && (
        <PaymentCardList notify={notify} authToken={authToken} />
      )}
      {selectedEntity === ProfileEntities.Addresses && (
        <AddressList notify={notify} authToken={authToken} />
      )}
      {selectedEntity === ProfileEntities.Notes && (
        <NoteList notify={notify} authToken={authToken} />
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
}
