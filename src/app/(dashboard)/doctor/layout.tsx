import RoleGuard from "@/components/auth/role.guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["DOCTOR"]}>
      <DashboardShell role="DOCTOR">{children}</DashboardShell>
    </RoleGuard>
  );
};

export default layout;
