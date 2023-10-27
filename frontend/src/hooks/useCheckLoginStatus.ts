import { GlobalContext } from "../context/index";
import axios from "axios";
import { getUrl } from "../helpers";
import { useEffect, useState, useContext } from "react";

export default function useCheckLoginStatus() {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data } = await axios.get(`${getUrl()}/api/v1/profile`, {
          withCredentials: true,
        });

        dispatch({ type: "USER_LOGIN", payload: data.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "USER_LOGOUT" });
      }
    };

    checkLoginStatus();
  }, []);

  return {};
}
