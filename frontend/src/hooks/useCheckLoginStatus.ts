import { GlobalContext } from "../context/index";
import axios from "axios";
import { getUrl } from "../helpers";
import { useEffect, useState, useContext } from "react";

export default function useCheckLoginStatus() {
  const { state, dispatch } = useContext(GlobalContext);
  
  console.log("🚀 ~ file: useCheckLoginStatus.ts:8 ~ useCheckLoginStatus ~ state:")
  
  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        config.withCredentials = true;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      },
    );
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data } = await axios.get(`${getUrl()}/api/v1/isValidToken`, {
          withCredentials: true,
        });
        console.log("🚀 ~ file: useCheckLoginStatus.ts:29 ~ const{data}=awaitaxios.get ~ data:", data)

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
