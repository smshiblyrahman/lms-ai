import { Suspense } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Providers } from "@/components/Providers";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Suspense fallback={<LoadingSpinner text="Loading admin..." />}>
        <AdminHeader />
        <main>{children}</main>
      </Suspense>
    </Providers>
  );
}

export default AdminLayout;
