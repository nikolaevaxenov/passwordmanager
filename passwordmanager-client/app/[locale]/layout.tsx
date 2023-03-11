import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.scss";
import { useLocale, useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { Providers } from "./providers";

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const selectedLocale = useLocale();

  if (locale !== selectedLocale) {
    notFound();
  }

  const navbarLocalization = useTranslations("Navbar");

  const navbarT = {
    profile: navbarLocalization("profile"),
    logout: navbarLocalization("logout"),
    signIn: navbarLocalization("signIn"),
    signUp: navbarLocalization("signUp"),
  };

  return (
    <html lang={selectedLocale}>
      <head />
      <body>
        <Providers>
          <div className="wrapper">
            <nav className="wrapper__header">
              <Navbar t={navbarT} />
            </nav>
            <main className="wrapper__content">{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
