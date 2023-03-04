export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export type AddressData = {
  id: number;
  title: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  gender?: Gender;
  birthDate?: Date;
  company?: string;
  address1: string;
  address2?: string;
  address3?: string;
  city: string;
  county: string;
  state: string;
  zipCode: string;
  country: string;
  email?: string;
  phone?: string;
  note?: string;
  owner_email: string;
  sharedWithUsers: [string];
};

export type NewAddressData = {
  token: string;
  title: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  gender?: Gender;
  birthDate?: Date;
  company?: string;
  address1: string;
  address2?: string;
  address3?: string;
  city: string;
  county: string;
  state: string;
  zipCode: string;
  country: string;
  email?: string;
  phone?: string;
  note?: string;
};

export type EditAddressData = {
  token: string;
  id: number;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  gender?: Gender;
  birthDate?: Date;
  company?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  county?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  email?: string;
  phone?: string;
  note?: string;
};

export type DeleteAddressData = {
  token: string;
  id: number;
};

export type AddShareAddressData = {
  token: string;
  id: number;
  userEmail: string;
};

export type RemoveShareAddressData = {
  token: string;
  id: number;
  userEmail: string;
};

export const getAllAddresses = async (token: string) => {
  const response = await fetch("http://localhost:8080/api/v1/address", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const addNewAddress = async (requestData: NewAddressData) => {
  const response = await fetch("http://localhost:8080/api/v1/address", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${requestData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: requestData.title,
      firstName: requestData.firstName,
      middleName: requestData.middleName,
      lastName: requestData.lastName,
      username: requestData.username,
      gender: requestData.gender,
      birthDate: requestData.birthDate,
      company: requestData.company,
      address1: requestData.address1,
      address2: requestData.address2,
      address3: requestData.address3,
      city: requestData.city,
      county: requestData.county,
      state: requestData.state,
      zipCode: requestData.zipCode,
      country: requestData.country,
      email: requestData.email,
      phone: requestData.phone,
      note: requestData.note,
    }),
  });

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.json();
};

export const editAddress = async (requestData: EditAddressData) => {
  const response = await fetch("http://localhost:8080/api/v1/address", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${requestData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: requestData.id,
      title: requestData.title,
      firstName: requestData.firstName,
      middleName: requestData.middleName,
      lastName: requestData.lastName,
      username: requestData.username,
      gender: requestData.gender,
      birthDate: requestData.birthDate,
      company: requestData.company,
      address1: requestData.address1,
      address2: requestData.address2,
      address3: requestData.address3,
      city: requestData.city,
      county: requestData.county,
      state: requestData.state,
      zipCode: requestData.zipCode,
      country: requestData.country,
      email: requestData.email,
      phone: requestData.phone,
      note: requestData.note,
    }),
  });

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.json();
};

export const deleteAddress = async (requestData: DeleteAddressData) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/address/${requestData.id}`,
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

export const addShareAddress = async (requestData: AddShareAddressData) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/address/shared/${requestData.id}`,
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

export const removeShareAddressWithMe = async (
  requestData: DeleteAddressData
) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/address/shared/${requestData.id}`,
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

export const removeShareAddress = async (
  requestData: RemoveShareAddressData
) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/address/shared/${requestData.id}`,
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
