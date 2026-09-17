import apiClient from "@/lib/apiClient";
import {
  LoginPayload,
  RegistrationPayload,
  VerifyAccountPayload,
} from "@/types";

export const userLogin = (payload: LoginPayload) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};

export const userRegistration = (payload: RegistrationPayload) => {
  return apiClient("/auth/register", { method: "POST", body: payload });
};

export const VerifyAccount = (payload: VerifyAccountPayload) => {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
};

export const userLogout = () => {
  return apiClient("/auth/logout", { method: "POST" });
};

export const getMe = () => {
  return apiClient("/auth/me");
};

export const googleOAuth = (payload: { idToken: string }) => {
  return apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
};
