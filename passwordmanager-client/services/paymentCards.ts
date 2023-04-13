export type PaymentCardData = {
  id: number;
  title: string;
  number: string;
  securityCode: string;
  expirationDate: string;
  note?: string;
  owner_email: string;
  sharedWithUsers: [string];
};

export type NewPaymentCardData = {
  token: string;
  title: string;
  number: string;
  securityCode: string;
  expirationDate: string;
  note?: string;
};

export type EditPaymentCardData = {
  token: string;
  id: number;
  title?: string;
  number?: string;
  securityCode?: string;
  expirationDate?: string;
  note?: string;
};

export type DeletePaymentCardData = {
  token: string;
  id: number;
};

export type AddSharePaymentCardData = {
  token: string;
  id: number;
  userEmail: string;
};

export type RemoveSharePaymentCardData = {
  token: string;
  id: number;
  userEmail: string;
};

export const getAllPaymentCards = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/paymentcard`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

export const addNewPaymentCard = async (requestData: NewPaymentCardData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/paymentcard`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requestData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: requestData.title,
        number: requestData.number,
        securityCode: requestData.securityCode,
        expirationDate: requestData.expirationDate,
        note: requestData.note,
      }),
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.json();
};

export const editPaymentCard = async (requestData: EditPaymentCardData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/paymentcard`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${requestData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: requestData.id,
        title: requestData.title,
        number: requestData.number,
        securityCode: requestData.securityCode,
        expirationDate: requestData.expirationDate,
        note: requestData.note,
      }),
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.json();
};

export const deletePaymentCard = async (requestData: DeletePaymentCardData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/paymentcard/${requestData.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${requestData.token}`,
      },
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.status;
};

export const addSharePaymentCard = async (
  requestData: AddSharePaymentCardData
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/paymentcard/shared/${requestData.id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requestData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData.userEmail),
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.status;
};

export const removeSharePaymentCardWithMe = async (
  requestData: DeletePaymentCardData
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/paymentcard/shared/${requestData.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${requestData.token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.status;
};

export const removeSharePaymentCard = async (
  requestData: RemoveSharePaymentCardData
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/paymentcard/shared/${requestData.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${requestData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData.userEmail),
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.status;
};
