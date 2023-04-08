import SettingsComponent from "@/components/SettingsComponent";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const settingsLocalization = useTranslations("Settings");

  const settingsT = {
    passwordSuccessNotification: settingsLocalization(
      "passwordSuccessNotification"
    ),
    successEmailChange: {
      header: settingsLocalization("successEmailChange.header"),
      subtext: settingsLocalization("successEmailChange.subtext"),
      link: settingsLocalization("successEmailChange.link"),
    },
    passwordChange: {
      header: settingsLocalization("passwordChange.header"),
      currentPassword: settingsLocalization("passwordChange.currentPassword"),
      currentPasswordRequired: settingsLocalization(
        "passwordChange.currentPasswordRequired"
      ),
      currentPasswordMinLength: settingsLocalization(
        "passwordChange.currentPasswordMinLength"
      ),
      currentPasswordMaxLength: settingsLocalization(
        "passwordChange.currentPasswordMaxLength"
      ),
      newPassword: settingsLocalization("passwordChange.newPassword"),
      newPasswordRequired: settingsLocalization(
        "passwordChange.newPasswordRequired"
      ),
      newPasswordMinLength: settingsLocalization(
        "passwordChange.newPasswordMinLength"
      ),
      newPasswordMaxLength: settingsLocalization(
        "passwordChange.newPasswordMaxLength"
      ),
      confirmPassword: settingsLocalization("passwordChange.confirmPassword"),
      confirmPasswordRequired: settingsLocalization(
        "passwordChange.confirmPasswordRequired"
      ),
      confirmPasswordMinLength: settingsLocalization(
        "passwordChange.confirmPasswordMinLength"
      ),
      confirmPasswordMaxLength: settingsLocalization(
        "passwordChange.confirmPasswordMaxLength"
      ),
      confirmPasswordMustMatch: settingsLocalization(
        "passwordChange.confirmPasswordMustMatch"
      ),
      passwordIncorrect: settingsLocalization(
        "passwordChange.passwordIncorrect"
      ),
      passwordChangeSave: settingsLocalization(
        "passwordChange.passwordChangeSave"
      ),
    },
    emailChange: {
      header: settingsLocalization("emailChange.header"),
      currentEmail: settingsLocalization("emailChange.currentEmail"),
      currentPassword: settingsLocalization("emailChange.currentPassword"),
      currentPasswordRequired: settingsLocalization(
        "emailChange.currentPasswordRequired"
      ),
      currentPasswordMinLength: settingsLocalization(
        "emailChange.currentPasswordMinLength"
      ),
      currentPasswordMaxLength: settingsLocalization(
        "emailChange.currentPasswordMaxLength"
      ),
      newEmail: settingsLocalization("emailChange.newEmail"),
      newEmailRequired: settingsLocalization("emailChange.newEmailRequired"),
      newEmailInvalid: settingsLocalization("emailChange.newEmailInvalid"),
      newEmailExists: settingsLocalization("emailChange.newEmailExists"),
      emailChangeSave: settingsLocalization("emailChange.emailChangeSave"),
    },
  };

  return <SettingsComponent t={settingsT} />;
}
