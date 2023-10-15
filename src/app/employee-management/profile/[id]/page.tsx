import React from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

import ProfileDetail from "@/components/page-components/Employee/Profile/EmployeeDetail";

const ProfileDetailPage = async ({ params }: any) => {
  let profile: any = null;
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/${params.id}`, {
      headers: {
        Authorization: `Bearer ${getCookie("user")}`,
      },
    })
    .then((res) => {
      profile = res.data.data;
    })
    .catch((err) => {
      throw err;
    });

  return (
    <ProfileDetail
      defaultValue={{
        id: profile?.id,
        birth_date: profile?.birth_date,
        department_id: profile?.department?.id,
        position_id: profile?.position?.id,
        department_name: profile?.department?.name,
        position_name: profile?.position?.name,
        birth_place: profile?.birth_place,
        citizenship: profile?.citizenship,
        civil_status: profile?.civil_status,
        date_hired: profile?.date_hired,
        email: profile?.email,
        employee_id: profile?.employee_id,
        name_ext: profile?.name_ext,
        first_name: profile?.first_name,
        middle_name: profile?.middle_name,
        mobile_no: profile?.mobile_no,
        sex: profile?.sex,
        last_name: profile?.last_name,
        tel_no: profile?.tel_no,

        educational_backgrounds: profile?.educational_backgrounds.map(
          (item: any) => {
            return {
              level: item?.level,
              school_name: item?.school_name,
              degree: item?.degree,
              period_from: item?.period_from,
              period_to: item?.period_to,
              units_earned: item?.units_earned,
              year_graduated: item?.year_graduated,
              academic_honors_received: item?.academic_honors_received,
            };
          }
        ),
        trainings: profile?.trainings.map((item: any) => {
          return {
            title: item?.title,
            conducted_by: item?.conducted_by,
            hours: item?.hours,
            type_of_ld: item?.type_of_ld,
            period_from: item?.period_from,
            period_to: item?.period_to,
            description: item?.description,
          };
        }),
      }}
    />
  );
};

export default ProfileDetailPage;
