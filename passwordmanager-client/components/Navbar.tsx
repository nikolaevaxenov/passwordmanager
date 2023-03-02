"use client";

import Link from "next/link";
import styles from "@/styles/Navbar.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { selectAuthToken, logout } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";
import { FaKey } from "react-icons/fa";

export default function Navbar() {
  const authToken = useAppSelector(selectAuthToken);
  const [navAuthState, setNavAuthState] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    authToken !== null ? setNavAuthState(true) : setNavAuthState(false);
  }, [authToken]);

  return (
    <div className={styles.navbar}>
      <Link href="/">
        <div className={styles.navbar__logo}>
          <FaKey />
          <p>PassStorage</p>
        </div>
      </Link>
      <div className={styles.navbar__links}>
        {navAuthState ? (
          <>
            <Link href="/profile">
              Profile (<>{authToken?.email}</>)
            </Link>
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
