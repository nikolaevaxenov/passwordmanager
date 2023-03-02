"use client";

import { AuthToken } from "@/features/auth/authSlice";

type AddressListProps = {
  notify: (text: string, error?: boolean) => void;
  authToken: AuthToken | null;
};

export default function AddressList({ notify, authToken }: AddressListProps) {
  return (
    <>
      <h1>Address list</h1>
    </>
  );
}
