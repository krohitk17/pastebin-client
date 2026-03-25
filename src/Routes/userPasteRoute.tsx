import axios from "axios";
import { authenticatedRequest } from "./authRoute";

export interface UserPasteSummary {
  url: string;
  title: string;
  syntax: string;
  burnOnRead: boolean;
  isPasswordProtected: boolean;
  createdAt: string;
  expiresAt: string;
}

export interface UpdateUserPasteData {
  title?: string;
  body?: string;
  syntax?: string;
  password?: string;
  clearPassword?: boolean;
  expiresAt?: string;
}

export interface UserPasteDetail {
  title: string;
  body: string;
  syntax: string;
  createdAt: string;
  expiresAt: string;
}

const baseUrl = process.env.REACT_APP_BACKEND_URL || "";

export const getUserPastesHandler = async (accessToken: string) => {
  const res = await authenticatedRequest(async (token) => {
    const authToken = accessToken || token;
    return axios
      .get<UserPasteSummary[]>(baseUrl + "/users/pastes", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => {
        return (
          err.response || {
            status: 500,
            data: { message: "Unable to reach server" },
          }
        );
      });
  });

  return res;
};

export const deleteUserPasteHandler = async (
  accessToken: string,
  url: string
) => {
  const res = await authenticatedRequest(async (token) => {
    const authToken = accessToken || token;
    return axios
      .delete(baseUrl + `/users/pastes/${url}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => {
        return (
          err.response || {
            status: 500,
            data: { message: "Unable to reach server" },
          }
        );
      });
  });

  return res;
};

export const updateUserPasteHandler = async (
  accessToken: string,
  url: string,
  updateData: UpdateUserPasteData
) => {
  const res = await authenticatedRequest(async (token) => {
    const authToken = accessToken || token;
    return axios
      .patch(baseUrl + `/users/pastes/${url}`, updateData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => {
        return (
          err.response || {
            status: 500,
            data: { message: "Unable to reach server" },
          }
        );
      });
  });

  return res;
};

export const getUserPasteHandler = async (accessToken: string, url: string) => {
  const res = await authenticatedRequest(async (token) => {
    const authToken = accessToken || token;
    return axios
      .get<UserPasteDetail>(baseUrl + `/users/pastes/${url}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => {
        return (
          err.response || {
            status: 500,
            data: { message: "Unable to reach server" },
          }
        );
      });
  });

  return res;
};
