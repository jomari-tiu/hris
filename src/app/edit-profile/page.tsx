import React from "react";

import UserAuth from "@/components/HOC/UserAuth";

import ProfileForm from "./_components/ProfileForm";

const EditProfilePage = ({ profile }: any) => {
  return (
    <div>
      <ProfileForm
        defaultValues={{
          // id: profile?.id,
          id: undefined,
          name: profile?.name,
          password: undefined,
          password_confirmation: undefined,
          current_password: undefined,
        }}
      />
    </div>
  );
};

export default UserAuth(EditProfilePage);
