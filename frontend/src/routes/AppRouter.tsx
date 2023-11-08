import { useContext } from "react";
import { GlobalContext } from "../context";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage, DoctorList, BookProfile, UserProfile } from "../pages";
import NavBar from "../components/ui/NavBar";

export default function AppRouter() {
  const {
    state: { isLogin },
  } = useContext(GlobalContext);


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
          <Route path="/" element={<DoctorList />} />
          <Route path="/profiles" element={<UserProfile />} />
          <Route path="/profile/:id" element={<BookProfile />} />
          {/* <Route path="/change-password" element={<ChangePassword />} /> */}
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      )}

      {/* unauthenticated(not secure) routes */}
      {isLogin === false && (
        <Routes>
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/sign-up" element={<AuthPage type="signup" />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      )}
    </>
  );
}
