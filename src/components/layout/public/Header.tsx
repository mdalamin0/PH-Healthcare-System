"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Header = () => {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient()
  const router = useRouter()

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
        <div>PH Healthcare</div>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
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
