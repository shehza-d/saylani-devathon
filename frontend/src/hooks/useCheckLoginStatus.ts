import { useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/index";
import { getUrl } from "../helpers";

export default function useCheckLoginStatus() {
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data } = await axios.get(`${getUrl()}/api/v1/profile`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        dispatch({ type: "USER_LOGIN", payload: data.userData });
      } catch (err) {
        console.log("🚀 ~ file: useCheckLoginStatus.ts:42 ~ err:", err);
        dispatch({ type: "USER_LOGOUT" });
      }
    };

    checkLoginStatus();
  }, []);

  return {};
}
