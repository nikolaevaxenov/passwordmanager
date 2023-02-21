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

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

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

  console.log(response.status);
  console.log(response.text());

  return response.text();
};
