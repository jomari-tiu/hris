import React from "react";
import axios from "axios";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";

const GoogleLoginButton = () => {
  const router = useRouter();
  const googleLoginHandler = async () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/login/google`);
  };
  return (
    <Button
      appearance={"default"}
      className=" w-full flex items-center justify-center"
      onClick={googleLoginHandler}
    >
      <div>
        <Image
          src="/images/logo/google-1.png"
          height={100}
          width={100}
          alt="google"
        />
      </div>
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;
