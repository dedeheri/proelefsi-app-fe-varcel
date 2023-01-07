import { Route, Routes } from "react-router-dom";
import {
  Home,
  Topics,
  ArticleByTopics,
  Search,
  DetailArticle,
  ShortLink,
  User,
} from "../pages/main";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* topics */}
      <Route path="/topics" element={<Topics />} />
      <Route path="/topics/:topics" element={<ArticleByTopics />} />
      {/* short link */}
      <Route path="link/:id" element={<ShortLink />} />
      {/* username */}
      <Route path="/:username" element={<User />} />
      {/* detail article */}
      <Route path="/:username/:id/:slug" element={<DetailArticle />} />
      {/* search */}
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default Main;
