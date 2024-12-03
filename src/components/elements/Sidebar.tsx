"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button, buttonVariants } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAR_NAVIGATION } from "@/constant/content/components/sidebar";
import { useState } from "react";
import { Separator } from "../ui/separator";
import axiosInstance from "@/lib/axios";

const SidebarLink = ({ route, label, icon, isActive, isOpen }: any) => {
  return isOpen ? (
    <Link
      href={route}
      className={cn(
        "flex items-center gap-4 py-2.5 transition-all duration-300 hover:bg-green-800/10 rounded w-full px-4",
        isActive &&
          "bg-green-800/10 text-green-950 hover:bg-green-800/20 font-medium"
      )}
    >
      <div>{icon}</div>
      <span className="capitalize">{label}</span>
    </Link>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={route}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            "size-12 dark:hover:bg-gray-600",
            isActive &&
              "bg-blue-600 fill-white hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-300"
          )}
        >
          <div>{icon}</div>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(true);
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

  if (pathname === "/auth/login" || pathname === "/auth/register") return null;

  return (
    <div className="fixed top-0 left-0 h-screen border-r border-r-gray-300 z-50">
      <div
        className={cn(
          "transition-all duration-300 flex flex-col justify-between bg-white dark:bg-[#060606] h-full px-4 py-6",
          isOpen ? "w-64" : "w-20"
        )}
      >
        <div>
          <h1 className="p-6">jago binggow</h1>
          <nav className="flex flex-col items-center gap-2.5 mt-4">
            {SIDEBAR_NAVIGATION.map((item, index) => (
              <article key={index} className="w-full">
                <SidebarLink
                  key={index}
                  route={item.route}
                  label={item.label}
                  icon={item.icon}
                  isActive={pathname === item.route}
                  isOpen={isOpen}
                />
                {index === 1 && <Separator className="mt-2.5" />}
                {index === 4 && <Separator className="mt-2.5" />}
              </article>
            ))}
          </nav>
        </div>
        <Button onClick={handleLogout} disabled={isLoading}>
          {isLoading ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
