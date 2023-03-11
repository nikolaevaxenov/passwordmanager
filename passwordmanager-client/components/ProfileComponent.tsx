"use client";

import AddressList from "@/components/Address/AddressList";
import EntitySwitcher from "@/components/EntitySwitcher";
import NoteList from "@/components/Note/NoteList";
import PasswordList from "@/components/Password/PasswordList";
import PaymentCardList from "@/components/PaymentCard/PaymentCardList";
import { selectAuthToken } from "@/features/auth/authSlice";
import {
  ProfileEntities, selectSelectedEntity
} from "@/features/profile/profileReducer";
import { useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/components/profile.module.scss";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ProfileComponent({
  entitySwitcherT,
  addressT,
  noteT,
  passwordT,
  paymentCardT,
}: {
  entitySwitcherT: Messages["ProfilePage"]["entitySwitcher"];
  addressT: Messages["ProfilePage"]["address"];
  noteT: Messages["ProfilePage"]["note"];
  passwordT: Messages["ProfilePage"]["password"];
  paymentCardT: Messages["ProfilePage"]["paymentCard"];
}) {
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
    <div className={styles.main}>
      <EntitySwitcher t={entitySwitcherT} />

      {selectedEntity === ProfileEntities.Passwords && (
        <PasswordList t={passwordT} notify={notify} authToken={authToken} />
      )}
      {selectedEntity === ProfileEntities.PaymentCards && (
        <PaymentCardList
          t={paymentCardT}
          notify={notify}
          authToken={authToken}
        />
      )}
      {selectedEntity === ProfileEntities.Addresses && (
        <AddressList t={addressT} notify={notify} authToken={authToken} />
      )}
      {selectedEntity === ProfileEntities.Notes && (
        <NoteList t={noteT} notify={notify} authToken={authToken} />
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
    </div>
  );
}
