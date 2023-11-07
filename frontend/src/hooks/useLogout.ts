import axios from "axios";
import toast from "react-hot-toast";
import { getUrl } from "../helpers/index";
import { useContext } from "react";
import { GlobalContext } from "../context/index";

export default function useLogout() {
  const { dispatch } = useContext(GlobalContext);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.post(
        `${getUrl()}/api/v1/logout`,
        {},
        { withCredentials: true },
      );

      toast.success(data?.message || "Logout successfully!");

      dispatch({ type: "USER_LOGOUT" });
    } catch (error) {
      console.log("error in logout: ", error);
      toast.error("Unknown error!");
    }
  };

  return logoutHandler;
}
