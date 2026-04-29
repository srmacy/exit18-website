import { Suspense } from "react";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[50vh] items-center justify-center px-5 py-24 text-exit-gray">
          Loading…
        </main>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
