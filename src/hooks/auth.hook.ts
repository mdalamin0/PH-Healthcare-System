import { getMe, googleOAuth, userLogin, userLogout, userRegistration, VerifyAccount } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useRegistration = () => {
  return useMutation({
    mutationFn: userRegistration
  })
}

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: VerifyAccount
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};

export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuth,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
};
