import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <Suspense fallback={<p className="admin-muted">Loading…</p>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
