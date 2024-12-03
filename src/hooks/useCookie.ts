import { useEffect, useState } from "react";

export default function useCookie(name: string) {
  const [cookieValue, setCookieValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
          setCookieValue(decodeURIComponent(cookieValue));
          break;
        }
      }
    }
  }, [name]);

  return cookieValue;
}
