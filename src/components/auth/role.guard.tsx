"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth.loading";
import { UserRole } from "@/types/user.type";
import AccessDenied from "./access-denied";

interface IProps {
  children: ReactNode;
  roles: UserRole[]
}

const RoleGuard = ({ children, roles }: IProps) => {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;
const isAuthorized = !!user && roles.includes(user?.role)

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

  if(!isAuthorized){
    return <AccessDenied/>
  }

  return <>{children}</>;
};

export default RoleGuard;
