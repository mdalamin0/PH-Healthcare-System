"use client";

import { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google.auth.provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleAuthProvider>
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </GoogleAuthProvider>
  );
};

export default Providers;
