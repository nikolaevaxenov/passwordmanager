import SignInComponent from "@/components/SignInComponent";
import { useTranslations } from "next-intl";

export default function SignInForm() {
  const signInLocalization = useTranslations("SignInPage");

  const signInT = {
    title: signInLocalization("title"),
    header: signInLocalization("header"),
    subHeader: signInLocalization("subHeader"),
    subHeaderLink: signInLocalization("subHeaderLink"),
    password: signInLocalization("password"),
    signInButton: signInLocalization("signInButton"),
    emailRequired: signInLocalization("emailRequired"),
    emailInvalid: signInLocalization("emailInvalid"),
    passwordRequired: signInLocalization("passwordRequired"),
    passwordMinLength: signInLocalization("passwordMinLength"),
    passwordMaxLength: signInLocalization("passwordMaxLength"),
    wrongCredentials: signInLocalization("wrongCredentials"),
  };

  return <SignInComponent t={signInT} />;
}
