export type PasswordData = {
  id: number;
  title: string;
  url: string;
  username: string;
  password: string;
  note?: string;
  owner_email: string;
  sharedWithUsers: [string];
};

export type NewPasswordData = {
  token: string;
  title: string;
  url: string;
  username: string;
  password: string;
  note?: string;
};

export type EditPasswordData = {
  token: string;
  id: number;
  title?: string;
  url?: string;
  username?: string;
  password?: string;
  note?: string;
};

export type DeletePasswordData = {
  token: string;
  id: number;
};

export type AddSharePasswordData = {
  token: string;
  id: number;
  userEmail: string;
};

export type RemoveSharePasswordData = {
  token: string;
  id: number;
  userEmail: string;
};

export const getAllPasswords = async (token: string) => {
  const response = await fetch("http://localhost:8080/api/v1/savedpassword", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const addNewPassword = async (requestData: NewPasswordData) => {
  const response = await fetch("http://localhost:8080/api/v1/savedpassword", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${requestData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: requestData.title,
      url: requestData.url,
      username: requestData.username,
      password: requestData.password,
      note: requestData.note,
    }),
  });

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.json();
};

export const editPassword = async (requestData: EditPasswordData) => {
  const response = await fetch("http://localhost:8080/api/v1/savedpassword", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${requestData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: requestData.id,
      title: requestData.title,
      url: requestData.url,
      username: requestData.username,
      password: requestData.password,
      note: requestData.note,
    }),
  });

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.json();
};

export const deletePassword = async (requestData: DeletePasswordData) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/savedpassword/${requestData.id}`,
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

export const addSharePassword = async (requestData: AddSharePasswordData) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/savedpassword/shared/${requestData.id}`,
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

export const removeSharePasswordWithMe = async (
  requestData: DeletePasswordData
) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/savedpassword/shared/${requestData.id}`,
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

export const removeSharePassword = async (
  requestData: RemoveSharePasswordData
) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/savedpassword/shared/${requestData.id}`,
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
