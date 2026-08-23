import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl grow px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
