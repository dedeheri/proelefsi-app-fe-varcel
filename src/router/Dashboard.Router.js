import { Route, Routes } from "react-router-dom";
import {
  AddArticle,
  AddTopics,
  EditArticle,
  EditTopics,
  GetTopics,
  Home,
  GetArticle,
  Analysis,
  GetUser,
  DetailUser,
  Draft,
  NotFound,
  Setting,
  GetAllRole,
  AddRole,
  Me,
} from "../pages/dashboard";
import Published from "../pages/dashboard/users/Published";

import ProtectedRoutes from "./Protected.Router";

function DashboardRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} index />
        <Route path="/article" element={<GetArticle />} />
        <Route path="/article/:id/analysis" element={<Analysis />} />

        <Route path="/article/add" element={<AddArticle />} />
        <Route path="/article/edit/:id" element={<EditArticle />} />

        {/* category */}
        <Route path="/topics" element={<GetTopics />} />
        <Route path="/topics/add" element={<AddTopics />} />
        <Route path="/topics/edit/:id" element={<EditTopics />} />

        {/* users */}
        <Route path="/user" element={<GetUser />} />
        <Route path="/user/:id/:fullname" element={<DetailUser />}>
          <Route path="" element={<Published />} />
          <Route path="draft" element={<Draft />} />
        </Route>
        <Route path="/me" element={<Me />}>
          <Route path="" element={<Published />} />
          <Route path="draft" element={<Draft />} />
        </Route>

        {/* role */}
        <Route path="/role" element={<GetAllRole />} />
        <Route path="/role/add" element={<AddRole />} />

        {/* setting */}
        <Route path="/setting" element={<Setting />} />

        {/* notfound */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default DashboardRouter;
