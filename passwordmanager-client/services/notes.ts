export type NoteData = {
  id: number;
  title: string;
  text: string;
  owner_email: string;
  sharedWithUsers: [string];
};

export type NewNoteData = {
  token: string;
  title: string;
  text: string;
};

export type EditNoteData = {
  token: string;
  id: number;
  title?: string;
  text?: string;
};

export type DeleteNoteData = {
  token: string;
  id: number;
};

export type AddShareNoteData = {
  token: string;
  id: number;
  userEmail: string;
};

export type RemoveShareNoteData = {
  token: string;
  id: number;
  userEmail: string;
};

export const getAllNotes = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/note`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

export const addNewNote = async (requestData: NewNoteData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/note`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requestData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: requestData.title,
        text: requestData.text,
      }),
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.json();
};

export const editNote = async (requestData: EditNoteData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/note`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${requestData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: requestData.id,
        title: requestData.title,
        text: requestData.text,
      }),
    }
  );

  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");

  return response.json();
};

export const deleteNote = async (requestData: DeleteNoteData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/note/${requestData.id}`,
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

export const addShareNote = async (requestData: AddShareNoteData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/note/shared/${requestData.id}`,
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

export const removeShareNoteWithMe = async (requestData: DeleteNoteData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/note/shared/${requestData.id}`,
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

export const removeShareNote = async (requestData: RemoveShareNoteData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_LINK}api/v1/note/shared/${requestData.id}`,
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
