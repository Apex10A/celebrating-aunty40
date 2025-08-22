import { getUser } from "@/services/auth";
import { useEffect } from "react";

export function useProtected() {
  useEffect(function () {
    async function fetchUser() {
      const res = await getUser();
      if (!res?.userInfo?.id) window.location.href = "/admin/login";
    }

    fetchUser();
  }, []);
}
