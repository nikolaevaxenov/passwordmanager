export interface SignInData {
  token?: string;
}

export interface GetEmailData {
  email?: string;
}

export type SignInCredentials = {
  email: string;
  password: string;
};

export type ChangePasswordData = {
  loginRequest: SignInCredentials;
  newPassword: string;
};

export type ChangeEmailData = {
  loginRequest: SignInCredentials;
  newEmail: string;
};

export type ForgotPasswordData = {
  email: string;
  newPassword: string;
};

export class FetchError extends Error {
  constructor(public res: Response, message?: string) {
    super(message);
  }
}

export const signIn = async (credentials: SignInCredentials) => {
  const response = await fetch(
    "http://localhost:8080/api/v1/authorization/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.email,
        password: credentials.password,
      }),
    }
  );

  if (response.status === 409)
    throw new FetchError(response, "Email is not confirmed");

  if (response.status >= 400 && response.status < 600)
    throw new FetchError(response, "Bad response from server");

  return response.text();
};

export const signUp = async (credentials: SignInCredentials) => {
  const response = await fetch(
    "http://localhost:8080/api/v1/authorization/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.email,
        password: credentials.password,
      }),
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.text();
};

export const getEmail = async (token: string) => {
  const response = await fetch(
    "http://localhost:8080/api/v1/authorization/signin",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.text();
};

export const changePassword = async (credentials: ChangePasswordData) => {
  const response = await fetch(
    "http://localhost:8080/api/v1/authorization/changepassword",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginRequest: {
          username: credentials.loginRequest.email,
          password: credentials.loginRequest.password,
        },
        newPassword: credentials.newPassword,
      }),
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.text();
};

export const changeEmail = async (credentials: ChangeEmailData) => {
  const response = await fetch(
    "http://localhost:8080/api/v1/authorization/changeemail",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginRequest: {
          username: credentials.loginRequest.email,
          password: credentials.loginRequest.password,
        },
        newEmail: credentials.newEmail,
      }),
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.text();
};

export const forgotPasswordRequest = async (
  credentials: ForgotPasswordData
) => {
  const response = await fetch(
    "http://localhost:8080/api/v1/authorization/forgotpassword",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        newPassword: credentials.newPassword,
      }),
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.text();
};
