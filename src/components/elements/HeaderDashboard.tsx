"uce client";

import useIsMobile from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
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
        },
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
    <header className="fixed left-0 top-0 z-10 flex h-20 w-full items-center border-b border-b-gray-300 bg-white md:h-24 md:pl-64">
      <div className="flex w-full items-center justify-between px-5 md:px-0">
        <h1 className="max-w-48 text-base font-bold md:max-w-full md:px-12 md:text-xl">
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
                className="h-6 w-6"
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
                <SheetTitle className="text-left italic underline">
                  Growth Momentum
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                <SheetClose asChild>
                  <Link href="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard/bookmark" className="hover:underline">
                    My Bookmark
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard/feedback" className="hover:underline">
                    Feedback
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard/profile" className="hover:underline">
                    Profile
                  </Link>
                </SheetClose>
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
