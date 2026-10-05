"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth.loading";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;


  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
      return;
    }
  }, [user, isError, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading lavel="Redirecting..." />;
  }

  return <>{children}</>;
};

export default AuthGuard;
