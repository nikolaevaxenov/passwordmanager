"use client";

import styles from "@/styles/components/Footer.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.main}>
      <Link href="https://github.com/nikolaevaxenov">
        © 2023 Nikolaev-Axenov
      </Link>
    </div>
  );
}
