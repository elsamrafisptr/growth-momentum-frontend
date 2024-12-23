"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Sidebar from "../elements/Sidebar";
import { usePathname } from "next/navigation";
import { TooltipProvider } from "../ui/tooltip";
import HeaderDashboard from "../elements/HeaderDashboard";
import useIsMobile from "@/hooks/useIsMobile";

const Layouts = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const ForbiddenDashboardRoute =
    pathname === "/" || pathname === "/register" || pathname === "/login";
  const isMobile = useIsMobile();

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className="flex flex-col justify-center overflow-x-hidden bg-gray-50 dark:bg-[#1E1E1E] lg:flex-row lg:gap-5"
        suppressHydrationWarning
      >
        {!ForbiddenDashboardRoute && (
          <>
            {isMobile ? <></> : <Sidebar />}
            <HeaderDashboard />
          </>
        )}
        <main
          className={cn(
            "no-scrollbar w-full scroll-smooth bg-gray-50 transition-all duration-300 dark:bg-[#1E1E1E] lg:h-screen",
            !ForbiddenDashboardRoute &&
              "md:py-24 md:pl-64 md:pr-24 lg:min-h-screen",
          )}
        >
          {children}
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Layouts;
