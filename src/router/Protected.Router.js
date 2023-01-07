import { Navigate, Outlet } from "react-router-dom";
import { getAllCookies } from "../utils/Cookie";

function auth() {
  const cookies = getAllCookies();
  const user = { loggedIn: false };
  if (cookies._token && cookies.uid) {
    user.loggedIn = true;
  }
  return user && user.loggedIn;
}

function ProtectedRoutes() {
  const isAuth = auth();
  return isAuth ? <Outlet /> : <Navigate to={"/account/signin"} />;
}

export default ProtectedRoutes;
