import { Navigate, Route, Routes } from "react-router-dom";
import { Signin, Signup, Otp, Forget, Reset } from "../pages/auth";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} index />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/reset-password" element={<Reset />} />
      <Route path="/" element={<Navigate to="/account/signin" replace />} />
    </Routes>
  );
}

export default AuthRouter;
