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
    forgotPasswordNotification: signInLocalization(
      "forgotPasswordNotification"
    ),
    forgotPasswordHeader: signInLocalization("forgotPasswordHeader"),
    passwordConfirm: signInLocalization("passwordConfirm"),
    passwordMustMatch: signInLocalization("passwordMustMatch"),
    forgotPasswordError: signInLocalization("forgotPasswordError"),
    forgotPasswordButton: signInLocalization("forgotPasswordButton"),
    forgotPasswordLink: signInLocalization("forgotPasswordLink"),
  };

  return <SignInComponent t={signInT} />;
}
