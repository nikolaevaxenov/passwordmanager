"use client";

import EntitySwitcher from "@/components/EntitySwitcher";
import PasswordList from "@/components/PasswordList";
import { selectAuthToken } from "@/features/auth/authSlice";
import { selectSelectedEntity } from "@/features/profile/profileReducer";
import { useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/profile.module.scss";
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
      <PasswordList notify={notify} authToken={authToken} />
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
