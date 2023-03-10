import styles from "@/styles/components/homePage.module.scss";
import Image from "next/image";
import passwordPic from "@/public/password.jpg";
import addressPic from "@/public/address.jpg";
import paymentCardPic from "@/public/paymentCard.jpg";
import notePic from "@/public/note.jpg";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("IndexPage");

  return (
    <main className={styles.main}>
      <h1>PassStorage</h1>
      <p>{t("description")}</p>
      <div className={styles.main__photos}>
        <div>
          <Image src={passwordPic} alt="Picture of lock" />
          <h1>{t("passwordCard")}</h1>
          <p>{t("passwordDescription")}</p>
        </div>
        <div>
          <Image src={addressPic} alt="Picture of house" />
          <h1>{t("addressCard")}</h1>
          <p>{t("addressDescription")}</p>
        </div>
        <div>
          <Image src={paymentCardPic} alt="Picture of credit card" />
          <h1>{t("paymentCardCard")}</h1>
          <p>{t("paymentCardDescription")}</p>
        </div>
        <div>
          <Image src={notePic} alt="Picture of notebook" />
          <h1>{t("noteCard")}</h1>
          <p>{t("noteDescription")}</p>
        </div>
      </div>
    </main>
  );
}
