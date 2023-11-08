import { useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/index";

export default function useInterceptors() {
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    // Add a request interceptor (will run on every outgoing request)
    axios.interceptors.request.use(
      (config) => {
        // Do something before request is sent

        config.withCredentials = true;
        console.log(
          "🚀 ~ file: useInterceptors.ts:12 ~ useEffect ~ config:",
          config,
        );

        return config;
      },
      // Do something with request error
      (error) => Promise.reject(error),
    );

    // Add a response interceptor (will run on every incoming response)
    axios.interceptors.response.use(
      // Any status code that lie within the range of 2xx cause this function to trigger
      (response) => response,
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      (error) => {
        if (error.response.status === 401) dispatch({ type: "USER_LOGOUT" });

        return Promise.reject(error);
      },
    );
  }, []);
}
