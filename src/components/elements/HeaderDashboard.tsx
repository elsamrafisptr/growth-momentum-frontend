import { useEffect, useState } from "react";

const HeaderDashboard = () => {
  const [username, setUsername] = useState<string | null>(null);

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

  return (
    <header className="h-24 z-10 w-full bg-white fixed top-0 left-0 pl-64 flex items-center border-b border-b-gray-300">
      <nav>
        <h1 className="font-bold text-xl px-12">
          Welcome back, {username || "Guest"} 👋
        </h1>
      </nav>
    </header>
  );
};

export default HeaderDashboard;
