import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

const baseUrl = process.env.REACT_APP_BACKEND_URL || "";

const toErrorResponse = (err: any) => {
  return (
    err?.response || {
      status: 500,
      data: { message: "Unable to reach server" },
    }
  );
};

const getStoredAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const getStoredRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

const storeTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const clearStoredTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const isUnauthorized = (status?: number): boolean => {
  return status === 401;
};

export const getAuthErrorMessage = (
  response: any,
  fallback: string
): string => {
  const message = response?.data?.message;
  if (Array.isArray(message)) {
    return message.join(", ");
  }
  if (typeof message === "string" && message.trim().length > 0) {
    return message;
  }
  return fallback;
};

export const loginHandler = async (loginData: LoginData) => {
  const res = await axios
    .post<AuthResponse>(baseUrl + "/auth/login", loginData)
    .catch((err) => {
      return toErrorResponse(err);
    });

  return res;
};

export const registerHandler = async (registerData: RegisterData) => {
  const res = await axios
    .post<AuthResponse>(baseUrl + "/auth/register", registerData)
    .catch((err) => {
      return toErrorResponse(err);
    });

  return res;
};

export const refreshTokenHandler = async (refreshToken: string) => {
  const res = await axios
    .post<AuthResponse>(baseUrl + "/auth/refresh", { refreshToken })
    .catch((err) => {
      return toErrorResponse(err);
    });

  return res;
};

export const authenticatedRequest = async (
  requestHandler: (accessToken: string) => Promise<any>
) => {
  const currentAccessToken = getStoredAccessToken();
  if (!currentAccessToken) {
    return {
      status: 401,
      data: { message: "Missing access token" },
    };
  }

  let response = await requestHandler(currentAccessToken);

  if (!isUnauthorized(response?.status)) {
    return response;
  }

  const currentRefreshToken = getStoredRefreshToken();
  if (!currentRefreshToken) {
    clearStoredTokens();
    return response;
  }

  const refreshResponse = await refreshTokenHandler(currentRefreshToken);
  const newAccessToken = refreshResponse?.data?.accessToken;
  const newRefreshToken = refreshResponse?.data?.refreshToken;

  if (
    (refreshResponse?.status === 200 || refreshResponse?.status === 201) &&
    typeof newAccessToken === "string" &&
    typeof newRefreshToken === "string"
  ) {
    storeTokens(newAccessToken, newRefreshToken);
    response = await requestHandler(newAccessToken);
    return response;
  }

  clearStoredTokens();
  return response;
};

export const logoutHandler = async (accessToken?: string) => {
  const res = await authenticatedRequest(async (token) => {
    const authToken = accessToken || token;
    return axios
      .post(
        baseUrl + "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .catch((err) => {
        return toErrorResponse(err);
      });
  });

  return res;
};
