"use client";

import { logout, selectAuthToken } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/components/Navbar.module.scss";
import { Link } from "next-intl";
import { usePathname } from "next-intl/client";
import { useEffect, useState } from "react";
import { BsFillGearFill, BsFillPersonFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
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
            <Link href={pathname || "/"} locale="en" title="English">
              🇺🇸
            </Link>
          </div>
          <div>
            <Link href={pathname || "/"} locale="ru" title="Russian">
              🇷🇺
            </Link>
          </div>
        </div>
        {navAuthState ? (
          <div className={styles.navbar__userlinks}>
            <Link href="/profile" title={t.profilePage}>
              <BsFillPersonFill />{" "}
              <p>
                (<>{authToken?.email}</>)
              </p>
            </Link>
            <Link href="/settings" title={t.accountSettings}>
              <BsFillGearFill />
            </Link>
            <a href="#" onClick={() => dispatch(logout())} title={t.logout}>
              <HiOutlineLogout />
            </a>
          </div>
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
