import axios from "axios";
import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";

function UserAuth(gssp: any) {
  const NewComponent = async (context: any) => {
    const token = cookies()?.get("user")?.value;
    let profile: any = "";
    if (token) {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          profile = res.data;
        })
        .catch((err) => {
          profile = null;
          deleteCookie("user");
          throw err;
        });
    }

    const gsspData = await gssp(context);
    return {
      props: {
        ...gsspData.props,
        profile,
      },
    };
  };
  return NewComponent;
}

export default UserAuth;
