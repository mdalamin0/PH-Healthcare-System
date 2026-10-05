"use client";

import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetMe, useLogout } from "@/hooks";
import { UserRole } from "@/types/user.type";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Header = () => {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

const dashboardRoute : Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  ADMIN: "/admin" ,
  DOCTOR: "/doctor" ,
  PATIENT: "/patient" ,
}

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient()
  const router = useRouter()

  const role: UserRole = !!data?.data && data?.data.role

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Log out successfull.");
        queryClient.removeQueries({queryKey: [ "user"]})
        router.push("/login")
      },
      onError: () => {
        toast.error("Log out failed")
      },
    });
  };

  return (
    <header className="w-full border border-b h-16">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <Logo/>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
          {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
        </nav>

        <div>
          {!isLoading && !data && (
            <Button
              variant={"outline"}
              render={<Link href={"/login"}>Login</Link>}
              nativeButton={false}
            >
              Login
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogout} variant={"destructive"}>Log out</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
