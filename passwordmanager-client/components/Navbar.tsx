"use client";

import Link from "next/link";
import styles from "@/styles/Navbar.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { selectEmail, logout } from "@/features/auth/authSlice";

export default function Navbar() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link href="/">PassStorage</Link>
      </div>
      <div className={styles.navbar__links}>
        {auth.email !== null ? (
          <>
            <Link href="/profile">Profile ({auth.email})</Link>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link href="/signin">Sign In</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}
