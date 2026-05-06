import { type ReactNode } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { useLocation } from "react-router";

const noLayoutPaths = ["/login"];

export function AuthLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const showLayout = !noLayoutPaths.some((p) =>
    location.pathname.startsWith(p)
  );

  if (!showLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
