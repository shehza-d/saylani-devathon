import { useContext, useState } from "react";
import { GlobalContext } from "../context";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthPage, UserList, ChatScreen, UserProfile } from "../pages";
// import axios from "axios";
import NavBar from "../components/ui/NavBar";

export default function AppRouter() {
  // const { state, dispatch } = useContext(GlobalContext);
  // const [state, setTesting] = useState<any>({ isLogin: null });
  // const { isLogin } = state;
  let isLogin = true;
  // console.log("state", state);
  // setTimeout(() => {
  //   setTesting({ isLogin: false });
  // }, 3000);

  return (
    <>
      {/* initial state to show loading at first glance */}
      {isLogin === null && (
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      )}

      {isLogin && <NavBar />}

      {/* authenticated(secure) routes */}
      {isLogin && (
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/chat/:id" element={<ChatScreen />} />
          {/* <Route path="/change-password" element={<ChangePassword />} /> */}
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      )}

      {/* unauthenticated(not secure) routes */}
      {isLogin === false && (
        <Routes>
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/sign-up" element={<AuthPage type="signup" />} />
          {/* <Route path="/forget-password" element={<ForgetPassword />} /> */}
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      )}
    </>
  );
}
