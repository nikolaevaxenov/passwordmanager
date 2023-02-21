"use client";

import { useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/profile.module.scss";

export default function Home() {
  const auth = useAppSelector((state) => state.auth);

  return (
    <main className={styles.main}>
      <h1>Hello, {auth.email}</h1>
    </main>
  );
}
