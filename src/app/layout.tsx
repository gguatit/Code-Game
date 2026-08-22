import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar";

export function Layout() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
