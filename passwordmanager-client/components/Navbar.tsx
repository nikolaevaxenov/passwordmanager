"use client";

import { logout, selectAuthToken } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/components/Navbar.module.scss";
import { Link } from "next-intl";
import { usePathname } from "next-intl/client";
import { useEffect, useState } from "react";
import { FaKey } from "react-icons/fa";

export default function Navbar({ t }: { t: Messages["Navbar"] }) {
  const authToken = useAppSelector(selectAuthToken);
  const [navAuthState, setNavAuthState] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    authToken !== null ? setNavAuthState(true) : setNavAuthState(false);
  }, [authToken]);

  const pathname = usePathname();

  return (
    <div className={styles.navbar}>
      <Link href="/">
        <div className={styles.navbar__logo}>
          <FaKey />
          <p>PassStorage</p>
        </div>
      </Link>
      <div className={styles.navbar__links}>
        <div>
          <div>
            <Link href={pathname || "/"} locale="en">
              🇺🇸
            </Link>
          </div>
          <div>
            <Link href={pathname || "/"} locale="ru">
              🇷🇺
            </Link>
          </div>
        </div>
        {navAuthState ? (
          <>
            <Link href="/profile">
              {t.profile} (<>{authToken?.email}</>)
            </Link>
            <a href="#" onClick={() => dispatch(logout())}>
              {t.logout}
            </a>
          </>
        ) : (
          <>
            <Link href="/signin">{t.signIn}</Link>
            <Link href="/signup">{t.signUp}</Link>
          </>
        )}
      </div>
    </div>
  );
}
