import axios from "axios";
import { getCookie } from "cookies-next";

export const ssFetchData = async (endpoint: string) => {
  let profile = null;
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${getCookie("user")}`,
      },
    })
    .then((res) => {
      profile = res.data;
    })
    .catch((err) => {
      throw err;
    });

  return profile;
};
