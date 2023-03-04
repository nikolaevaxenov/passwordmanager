import styles from "@/styles/components/homePage.module.scss";
import Image from "next/image";
import passwordPic from "@/public/password.jpg";
import addressPic from "@/public/address.jpg";
import paymentCardPic from "@/public/paymentCard.jpg";
import notePic from "@/public/note.jpg";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>PassStorage</h1>
      <p>Keep your passwords in a safe place</p>
      <div className={styles.main__photos}>
        <div>
          <Image src={passwordPic} alt="Picture of lock" />
          <h1>Passwords</h1>
          <p>Keep your websites url, usernames, passwords, notes.</p>
        </div>
        <div>
          <Image src={addressPic} alt="Picture of house" />
          <h1>Addresses</h1>
          <p>
            Add your first, middle, last name. Secure your addresses and company
            names.
          </p>
        </div>
        <div>
          <Image src={paymentCardPic} alt="Picture of credit card" />
          <h1>Payment cards</h1>
          <p>Store all your payment cards at one place.</p>
        </div>
        <div>
          <Image src={notePic} alt="Picture of notebook" />
          <h1>Notes</h1>
          <p>Write and store all your thoughts.</p>
        </div>
      </div>
    </main>
  );
}
