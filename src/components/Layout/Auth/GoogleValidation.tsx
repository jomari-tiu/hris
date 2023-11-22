import React, { useEffect } from "react";
import { setCookie } from "cookies-next";

import { useRouter, useSearchParams } from "next/navigation";

import LoadingScreen from "../LoadingScreen";

const GoogleValidation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setCookie("user", token);
      router.push("/dashboard");
      router.refresh();
    }
  }, [token]);
  return <LoadingScreen isLoading={true} />;
};

export default GoogleValidation;
