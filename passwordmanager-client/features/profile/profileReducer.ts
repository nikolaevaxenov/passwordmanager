import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

enum ProfileEntities {
  Passwords,
  PaymentCards,
  Addresses,
  Notes,
}

interface ProfileState {
  selectedEntity: ProfileEntities;
}

const initialState: ProfileState = {
  selectedEntity: ProfileEntities.Passwords,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    choosePasswords: (state) => {
      state.selectedEntity = ProfileEntities.Passwords;
    },
    choosePaymentCards: (state) => {
      state.selectedEntity = ProfileEntities.PaymentCards;
    },
    chooseAddresses: (state) => {
      state.selectedEntity = ProfileEntities.Addresses;
    },
    chooseNotes: (state) => {
      state.selectedEntity = ProfileEntities.Notes;
    },
  },
});

export const {
  choosePasswords,
  choosePaymentCards,
  chooseAddresses,
  chooseNotes,
} = profileSlice.actions;

export const selectSelectedEntity = (state: RootState) =>
  state?.profile.selectedEntity;

export default profileSlice.reducer;
