"use client";

import { AuthToken } from "@/features/auth/authSlice";

type PaymentCardListProps = {
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
};

export default function PaymentCardList({
  notify,
  authToken,
}: PaymentCardListProps) {
  return (
    <>
      <h1>Payment card list</h1>
    </>
  );
}
