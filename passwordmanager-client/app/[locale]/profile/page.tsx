import ProfileComponent from "@/components/ProfileComponent";
import { useTranslations } from "next-intl";

export default function Profile() {
  const entitySwitcherLocalization = useTranslations(
    "ProfilePage.entitySwitcher"
  );
  const addressLocalization = useTranslations("ProfilePage.address");
  const noteLocalization = useTranslations("ProfilePage.note");
  const passwordLocalization = useTranslations("ProfilePage.password");
  const paymentCardLocalization = useTranslations("ProfilePage.paymentCard");

  const entitySwitcherT = {
    password: entitySwitcherLocalization("password"),
    paymentCard: entitySwitcherLocalization("paymentCard"),
    address: entitySwitcherLocalization("address"),
    note: entitySwitcherLocalization("note"),
  };

  const addressT = {
    addModal: {
      header: addressLocalization("addModal.header"),
      title: addressLocalization("addModal.title"),
      titlePlaceholder: addressLocalization("addModal.titlePlaceholder"),
      titleRequired: addressLocalization("addModal.titleRequired"),
      firstName: addressLocalization("addModal.firstName"),
      firstNameRequired: addressLocalization("addModal.firstNameRequired"),
      middleName: addressLocalization("addModal.middleName"),
      lastName: addressLocalization("addModal.lastName"),
      username: addressLocalization("addModal.username"),
      gender: {
        text: addressLocalization("addModal.gender.text"),
        male: addressLocalization("addModal.gender.male"),
        female: addressLocalization("addModal.gender.female"),
        other: addressLocalization("addModal.gender.other"),
      },
      birthdate: addressLocalization("addModal.birthdate"),
      birthdatePlaceholder: addressLocalization(
        "addModal.birthdatePlaceholder"
      ),
      company: addressLocalization("addModal.company"),
      address1: addressLocalization("addModal.address1"),
      address1Required: addressLocalization("addModal.address1Required"),
      address2: addressLocalization("addModal.address2"),
      address3: addressLocalization("addModal.address3"),
      city: addressLocalization("addModal.city"),
      cityRequired: addressLocalization("addModal.cityRequired"),
      county: addressLocalization("addModal.county"),
      countyRequired: addressLocalization("addModal.countyRequired"),
      state: addressLocalization("addModal.state"),
      stateRequired: addressLocalization("addModal.stateRequired"),
      zipCode: addressLocalization("addModal.zipCode"),
      zipCodeRequired: addressLocalization("addModal.zipCodeRequired"),
      country: addressLocalization("addModal.country"),
      countryRequired: addressLocalization("addModal.countryRequired"),
      phone: addressLocalization("addModal.phone"),
      note: addressLocalization("addModal.note"),
      addButton: addressLocalization("addModal.addButton"),
      cancelButton: addressLocalization("addModal.cancelButton"),
      addedNotify: addressLocalization("addModal.addedNotify"),
    },
    editModal: {
      header: addressLocalization("editModal.header"),
      title: addressLocalization("editModal.title"),
      titlePlaceholder: addressLocalization("editModal.titlePlaceholder"),
      titleRequired: addressLocalization("editModal.titleRequired"),
      firstName: addressLocalization("editModal.firstName"),
      firstNameRequired: addressLocalization("editModal.firstNameRequired"),
      middleName: addressLocalization("editModal.middleName"),
      lastName: addressLocalization("editModal.lastName"),
      username: addressLocalization("editModal.username"),
      gender: {
        text: addressLocalization("editModal.gender.text"),
        male: addressLocalization("editModal.gender.male"),
        female: addressLocalization("editModal.gender.female"),
        other: addressLocalization("editModal.gender.other"),
      },
      birthdate: addressLocalization("editModal.birthdate"),
      birthdatePlaceholder: addressLocalization(
        "editModal.birthdatePlaceholder"
      ),
      company: addressLocalization("editModal.company"),
      address1: addressLocalization("editModal.address1"),
      address1Required: addressLocalization("editModal.address1Required"),
      address2: addressLocalization("editModal.address2"),
      address3: addressLocalization("editModal.address3"),
      city: addressLocalization("editModal.city"),
      cityRequired: addressLocalization("editModal.cityRequired"),
      county: addressLocalization("editModal.county"),
      countyRequired: addressLocalization("editModal.countyRequired"),
      state: addressLocalization("editModal.state"),
      stateRequired: addressLocalization("editModal.stateRequired"),
      zipCode: addressLocalization("editModal.zipCode"),
      zipCodeRequired: addressLocalization("editModal.zipCodeRequired"),
      country: addressLocalization("editModal.country"),
      countryRequired: addressLocalization("editModal.countryRequired"),
      phone: addressLocalization("editModal.phone"),
      note: addressLocalization("editModal.note"),
      saveButton: addressLocalization("editModal.saveButton"),
      cancelButton: addressLocalization("editModal.cancelButton"),
      editedNotify: addressLocalization("editModal.editedNotify"),
      editFailedNotify: addressLocalization("editModal.editFailedNotify"),
    },
    deleteModal: {
      deleteText: addressLocalization("deleteModal.deleteText"),
      deleteSharingText: addressLocalization("deleteModal.deleteSharingText"),
      deleteButton: addressLocalization("deleteModal.deleteButton"),
      cancelButton: addressLocalization("deleteModal.cancelButton"),
      deleteSuccessfulNotify: addressLocalization(
        "deleteModal.deleteSuccessfulNotify"
      ),
      deleteFailedNotify: addressLocalization("deleteModal.deleteFailedNotify"),
    },
    shareModal: {
      header: addressLocalization("shareModal.header"),
      userEmail: addressLocalization("shareModal.userEmail"),
      userEmailRequired: addressLocalization("shareModal.userEmailRequired"),
      userEmailInvalid: addressLocalization("shareModal.userEmailInvalid"),
      shareButton: addressLocalization("shareModal.shareButton"),
      userDeletedNotify: addressLocalization("shareModal.userDeletedNotify"),
      userDeleteFailedNotify: addressLocalization(
        "shareModal.userDeleteFailedNotify"
      ),
      sharedNotify: addressLocalization("shareModal.sharedNotify"),
      shareFailedNotify: addressLocalization("shareModal.shareFailedNotify"),
      exitButton: addressLocalization("shareModal.exitButton"),
    },
    card: {
      sharing: addressLocalization("card.sharing"),
      sharedWithYou: addressLocalization("card.sharedWithYou"),
      firstName: addressLocalization("card.firstName"),
      middleName: addressLocalization("card.middleName"),
      lastName: addressLocalization("card.lastName"),
      username: addressLocalization("card.username"),
      gender: {
        text: addressLocalization("card.gender.text"),
        male: addressLocalization("card.gender.male"),
        female: addressLocalization("card.gender.female"),
        other: addressLocalization("card.gender.other"),
      },
      birthdate: addressLocalization("card.birthdate"),
      company: addressLocalization("card.company"),
      address1: addressLocalization("card.address1"),
      address2: addressLocalization("card.address2"),
      address3: addressLocalization("card.address3"),
      city: addressLocalization("card.city"),
      county: addressLocalization("card.county"),
      state: addressLocalization("card.state"),
      zipCode: addressLocalization("card.zipCode"),
      country: addressLocalization("card.country"),
      phone: addressLocalization("card.phone"),
      showNoteButton: addressLocalization("card.showNoteButton"),
      hideNoteButton: addressLocalization("card.hideNoteButton"),
      shareButton: addressLocalization("card.shareButton"),
    },
  };

  const noteT = {
    addModal: {
      header: noteLocalization("addModal.header"),
      title: noteLocalization("addModal.title"),
      titlePlaceholder: noteLocalization("addModal.titlePlaceholder"),
      titleRequired: noteLocalization("addModal.titleRequired"),
      text: noteLocalization("addModal.text"),
      textRequired: noteLocalization("addModal.textRequired"),
      addButton: noteLocalization("addModal.addButton"),
      cancelButton: noteLocalization("addModal.cancelButton"),
      addedNotify: noteLocalization("addModal.addedNotify"),
    },
    editModal: {
      header: noteLocalization("editModal.header"),
      title: noteLocalization("editModal.title"),
      titlePlaceholder: noteLocalization("editModal.titlePlaceholder"),
      titleRequired: noteLocalization("editModal.titleRequired"),
      text: noteLocalization("editModal.text"),
      textRequired: noteLocalization("editModal.textRequired"),
      saveButton: noteLocalization("editModal.saveButton"),
      cancelButton: noteLocalization("editModal.cancelButton"),
      editedNotify: noteLocalization("editModal.editedNotify"),
      editFailedNotify: noteLocalization("editModal.editFailedNotify"),
    },
    deleteModal: {
      deleteText: noteLocalization("deleteModal.deleteText"),
      deleteSharingText: noteLocalization("deleteModal.deleteSharingText"),
      deleteButton: noteLocalization("deleteModal.deleteButton"),
      cancelButton: noteLocalization("deleteModal.cancelButton"),
      deleteSuccessfulNotify: noteLocalization(
        "deleteModal.deleteSuccessfulNotify"
      ),
      deleteFailedNotify: noteLocalization("deleteModal.deleteFailedNotify"),
    },
    shareModal: {
      header: noteLocalization("shareModal.header"),
      userEmail: noteLocalization("shareModal.userEmail"),
      userEmailRequired: noteLocalization("shareModal.userEmailRequired"),
      userEmailInvalid: noteLocalization("shareModal.userEmailInvalid"),
      shareButton: noteLocalization("shareModal.shareButton"),
      userDeletedNotify: noteLocalization("shareModal.userDeletedNotify"),
      userDeleteFailedNotify: noteLocalization(
        "shareModal.userDeleteFailedNotify"
      ),
      sharedNotify: noteLocalization("shareModal.sharedNotify"),
      shareFailedNotify: noteLocalization("shareModal.shareFailedNotify"),
      exitButton: noteLocalization("shareModal.exitButton"),
    },
    card: {
      sharing: noteLocalization("card.sharing"),
      sharedWithYou: noteLocalization("card.sharedWithYou"),
      shareButton: noteLocalization("card.shareButton"),
    },
  };

  const passwordT = {
    addModal: {
      header: passwordLocalization("addModal.header"),
      title: passwordLocalization("addModal.title"),
      titlePlaceholder: passwordLocalization("addModal.titlePlaceholder"),
      titleRequired: passwordLocalization("addModal.titleRequired"),
      username: passwordLocalization("addModal.username"),
      usernameRequired: passwordLocalization("addModal.usernameRequired"),
      password: passwordLocalization("addModal.password"),
      passwordRequired: passwordLocalization("addModal.passwordRequired"),
      website: passwordLocalization("addModal.website"),
      websiteRequired: passwordLocalization("addModal.websiteRequired"),
      note: passwordLocalization("addModal.note"),
      addButton: passwordLocalization("addModal.addButton"),
      cancelButton: passwordLocalization("addModal.cancelButton"),
      addedNotify: passwordLocalization("addModal.addedNotify"),
    },
    editModal: {
      header: passwordLocalization("editModal.header"),
      title: passwordLocalization("editModal.title"),
      titlePlaceholder: passwordLocalization("editModal.titlePlaceholder"),
      titleRequired: passwordLocalization("editModal.titleRequired"),
      username: passwordLocalization("editModal.username"),
      usernameRequired: passwordLocalization("editModal.usernameRequired"),
      password: passwordLocalization("editModal.password"),
      passwordRequired: passwordLocalization("editModal.passwordRequired"),
      website: passwordLocalization("editModal.website"),
      websiteRequired: passwordLocalization("editModal.websiteRequired"),
      note: passwordLocalization("editModal.note"),
      saveButton: passwordLocalization("editModal.saveButton"),
      cancelButton: passwordLocalization("editModal.cancelButton"),
      editedNotify: passwordLocalization("editModal.editedNotify"),
      editFailedNotify: passwordLocalization("editModal.editFailedNotify"),
    },
    deleteModal: {
      deleteText: passwordLocalization("deleteModal.deleteText"),
      deleteSharingText: passwordLocalization("deleteModal.deleteSharingText"),
      deleteButton: passwordLocalization("deleteModal.deleteButton"),
      cancelButton: passwordLocalization("deleteModal.cancelButton"),
      deleteSuccessfulNotify: passwordLocalization(
        "deleteModal.deleteSuccessfulNotify"
      ),
      deleteFailedNotify: passwordLocalization(
        "deleteModal.deleteFailedNotify"
      ),
    },
    shareModal: {
      header: passwordLocalization("shareModal.header"),
      userEmail: passwordLocalization("shareModal.userEmail"),
      userEmailRequired: passwordLocalization("shareModal.userEmailRequired"),
      userEmailInvalid: passwordLocalization("shareModal.userEmailInvalid"),
      shareButton: passwordLocalization("shareModal.shareButton"),
      userDeletedNotify: passwordLocalization("shareModal.userDeletedNotify"),
      userDeleteFailedNotify: passwordLocalization(
        "shareModal.userDeleteFailedNotify"
      ),
      sharedNotify: passwordLocalization("shareModal.sharedNotify"),
      shareFailedNotify: passwordLocalization("shareModal.shareFailedNotify"),
      exitButton: passwordLocalization("shareModal.exitButton"),
    },
    card: {
      sharing: passwordLocalization("card.sharing"),
      sharedWithYou: passwordLocalization("card.sharedWithYou"),
      usernameCopiedNotify: passwordLocalization("card.usernameCopiedNotify"),
      passwordCopiedNotify: passwordLocalization("card.passwordCopiedNotify"),
      showNoteButton: passwordLocalization("card.showNoteButton"),
      hideNoteButton: passwordLocalization("card.hideNoteButton"),
      shareButton: passwordLocalization("card.shareButton"),
    },
    passwordGenerator: {
      passwordLength: passwordLocalization("passwordGenerator.passwordLength"),
      allowNumbers: passwordLocalization("passwordGenerator.allowNumbers"),
      allowUppercase: passwordLocalization("passwordGenerator.allowUppercase"),
      allowSymbols: passwordLocalization("passwordGenerator.allowSymbols"),
      generateButton: passwordLocalization("passwordGenerator.generateButton"),
      cancelButton: passwordLocalization("passwordGenerator.cancelButton"),
    },
  };

  const paymentCardT = {
    addModal: {
      header: paymentCardLocalization("addModal.header"),
      title: paymentCardLocalization("addModal.title"),
      titlePlaceholder: paymentCardLocalization("addModal.titlePlaceholder"),
      titleRequired: paymentCardLocalization("addModal.titleRequired"),
      cardNumber: paymentCardLocalization("addModal.cardNumber"),
      cardNumberRequired: paymentCardLocalization(
        "addModal.cardNumberRequired"
      ),
      cardNumberLength: paymentCardLocalization("addModal.cardNumberLength"),
      cardNumberDigits: paymentCardLocalization("addModal.cardNumberDigits"),
      expirationDate: paymentCardLocalization("addModal.expirationDate"),
      expirationDateRequired: paymentCardLocalization(
        "addModal.expirationDateRequired"
      ),
      expirationDatePlaceholder: paymentCardLocalization(
        "addModal.expirationDatePlaceholder"
      ),
      securityCode: paymentCardLocalization("addModal.securityCode"),
      securityCodeRequired: paymentCardLocalization(
        "addModal.securityCodeRequired"
      ),
      securityCodeLength: paymentCardLocalization(
        "addModal.securityCodeLength"
      ),
      securityCodeDigits: paymentCardLocalization(
        "addModal.securityCodeDigits"
      ),
      note: paymentCardLocalization("addModal.note"),
      addButton: paymentCardLocalization("addModal.addButton"),
      cancelButton: paymentCardLocalization("addModal.cancelButton"),
      addedNotify: paymentCardLocalization("addModal.addedNotify"),
    },
    editModal: {
      header: paymentCardLocalization("editModal.header"),
      title: paymentCardLocalization("editModal.title"),
      titlePlaceholder: paymentCardLocalization("editModal.titlePlaceholder"),
      titleRequired: paymentCardLocalization("editModal.titleRequired"),
      cardNumber: paymentCardLocalization("editModal.cardNumber"),
      cardNumberRequired: paymentCardLocalization(
        "editModal.cardNumberRequired"
      ),
      cardNumberLength: paymentCardLocalization("editModal.cardNumberLength"),
      cardNumberDigits: paymentCardLocalization("editModal.cardNumberDigits"),
      expirationDate: paymentCardLocalization("editModal.expirationDate"),
      expirationDateRequired: paymentCardLocalization(
        "editModal.expirationDateRequired"
      ),
      expirationDatePlaceholder: paymentCardLocalization(
        "editModal.expirationDatePlaceholder"
      ),
      securityCode: paymentCardLocalization("editModal.securityCode"),
      securityCodeRequired: paymentCardLocalization(
        "editModal.securityCodeRequired"
      ),
      securityCodeLength: paymentCardLocalization(
        "editModal.securityCodeLength"
      ),
      securityCodeDigits: paymentCardLocalization(
        "editModal.securityCodeDigits"
      ),
      note: paymentCardLocalization("editModal.note"),
      saveButton: paymentCardLocalization("editModal.saveButton"),
      cancelButton: paymentCardLocalization("editModal.cancelButton"),
      editedNotify: paymentCardLocalization("editModal.editedNotify"),
      editFailedNotify: paymentCardLocalization("editModal.editFailedNotify"),
    },
    deleteModal: {
      deleteText: paymentCardLocalization("deleteModal.deleteText"),
      deleteSharingText: paymentCardLocalization(
        "deleteModal.deleteSharingText"
      ),
      deleteButton: paymentCardLocalization("deleteModal.deleteButton"),
      cancelButton: paymentCardLocalization("deleteModal.cancelButton"),
      deleteSuccessfulNotify: paymentCardLocalization(
        "deleteModal.deleteSuccessfulNotify"
      ),
      deleteFailedNotify: paymentCardLocalization(
        "deleteModal.deleteFailedNotify"
      ),
    },
    shareModal: {
      header: paymentCardLocalization("shareModal.header"),
      userEmail: paymentCardLocalization("shareModal.userEmail"),
      userEmailRequired: paymentCardLocalization(
        "shareModal.userEmailRequired"
      ),
      userEmailInvalid: paymentCardLocalization("shareModal.userEmailInvalid"),
      shareButton: paymentCardLocalization("shareModal.shareButton"),
      userDeletedNotify: paymentCardLocalization(
        "shareModal.userDeletedNotify"
      ),
      userDeleteFailedNotify: paymentCardLocalization(
        "shareModal.userDeleteFailedNotify"
      ),
      sharedNotify: paymentCardLocalization("shareModal.sharedNotify"),
      shareFailedNotify: paymentCardLocalization(
        "shareModal.shareFailedNotify"
      ),
      exitButton: paymentCardLocalization("shareModal.exitButton"),
    },
    card: {
      sharing: paymentCardLocalization("card.sharing"),
      sharedWithYou: paymentCardLocalization("card.sharedWithYou"),
      cardNumberCopiedNotify: paymentCardLocalization(
        "card.cardNumberCopiedNotify"
      ),
      expirationDateCopiedNotify: paymentCardLocalization(
        "card.expirationDateCopiedNotify"
      ),
      securityCodeCopiedNotify: paymentCardLocalization(
        "card.securityCodeCopiedNotify"
      ),
      showNoteButton: paymentCardLocalization("card.showNoteButton"),
      hideNoteButton: paymentCardLocalization("card.hideNoteButton"),
      shareButton: paymentCardLocalization("card.shareButton"),
    },
  };

  return (
    <ProfileComponent
      entitySwitcherT={entitySwitcherT}
      addressT={addressT}
      noteT={noteT}
      passwordT={passwordT}
      paymentCardT={paymentCardT}
    />
  );
}
