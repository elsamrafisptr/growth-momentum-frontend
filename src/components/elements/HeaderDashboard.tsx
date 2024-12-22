"uce client";

import useIsMobile from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

const HeaderDashboard = () => {
  const [username, setUsername] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoading(true);
    try {
      await axiosInstance.post(
        "/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchUsername = () => sessionStorage.getItem("username");

      setUsername(fetchUsername());

      const handleStorageChange = () => setUsername(fetchUsername());

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  if (pathname === "/auth/login" || pathname === "/auth/register") return null;

  return (
    <header className="h-20 md:h-24 z-10 w-full bg-white fixed top-0 left-0 md:pl-64 flex items-center border-b border-b-gray-300">
      <div className="w-full flex justify-between px-5 md:px-0 items-center">
        <h1 className="font-bold text-base md:text-xl max-w-48 md:max-w-full md:px-12">
          Welcome back, {username || "Guest"} 👋
        </h1>
        {isMobile && (
          <Sheet>
            <SheetTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                aria-label="Menu"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="my-6">
                <SheetTitle className="italic underline text-left">
                  Growth Momentum
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <Link href="/dashboard/bookmark" className="hover:underline">
                  My Bookmark
                </Link>
                <Link href="/dashboard/feedback" className="hover:underline">
                  Feedback
                </Link>
                <Link href="/dashboard/profile" className="hover:underline">
                  Profile
                </Link>
                <Button onClick={handleLogout} disabled={isLoading}>
                  {isLoading ? "Logging out..." : "Logout"}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default HeaderDashboard;
