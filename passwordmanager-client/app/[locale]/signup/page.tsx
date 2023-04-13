import SignUpComponent from "@/components/SignUpComponent";
import { useTranslations } from "next-intl";

export default function SignUpForm() {
  const signUpLocalization = useTranslations("SignUpPage");

  const signUpT = {
    title: signUpLocalization("title"),
    header: signUpLocalization("header"),
    subHeader: signUpLocalization("subHeader"),
    subHeaderLink: signUpLocalization("subHeaderLink"),
    password: signUpLocalization("password"),
    passwordConfirm: signUpLocalization("passwordConfirm"),
    signUpButton: signUpLocalization("signUpButton"),
    emailRequired: signUpLocalization("emailRequired"),
    emailInvalid: signUpLocalization("emailInvalid"),
    emailAlreadyExists: signUpLocalization("emailAlreadyExists"),
    passwordRequired: signUpLocalization("passwordRequired"),
    passwordMinLength: signUpLocalization("passwordMinLength"),
    passwordMaxLength: signUpLocalization("passwordMaxLength"),
    passwordMustMatch: signUpLocalization("passwordMustMatch"),
    confirmEmail: {
      header: signUpLocalization("confirmEmail.header"),
      subtext: signUpLocalization("confirmEmail.subtext"),
      link: signUpLocalization("confirmEmail.link"),
    },
  };

  return <SignUpComponent t={signUpT} />;
}
