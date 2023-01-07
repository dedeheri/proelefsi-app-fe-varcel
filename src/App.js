import { Route, Routes } from "react-router-dom";
import { AuthRouter, DashboardRouter, MainRouter } from "./router";

import ReactGA from "react-ga";
function App() {
  ReactGA.initialize("G-8LC5TLPD7N");
  ReactGA.pageview(window.location.pathname + window.location.search);
  // const host = window.location.host.split(".")[0];
  // console.log(host);
  // if (host === "writter") {
  //   return (
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //     </Routes>
  //   );
  // }

  return (
    <Routes>
      <Route path="/*" element={<MainRouter />} />
      <Route path="/account/*" element={<AuthRouter />} />
      <Route path="/dashboard/*" element={<DashboardRouter />} />
    </Routes>
  );
}

export default App;
