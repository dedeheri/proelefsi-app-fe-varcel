import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { requestGetArticleUserPublished } from "../../../action/user";
import {
  CardProfile,
  Page,
  SkeletonCardProfile,
  Message,
} from "../../../components";

function Published() {
  const { id } = useParams();
  const { search } = useLocation();

  const [article, setArticle] = useState({
    loading: true,
    success: false,
    error: false,
    message: "",
    data: {},
  });

  const [page, setPerPage] = useState(10);

  useEffect(() => {
    requestGetArticleUserPublished(setArticle, id, search);
  }, [id, search, page]);

  return (
    <div className="space-y-10">
      {article.loading ? (
        <SkeletonCardProfile />
      ) : article.error ? (
        <Message message={article.message} />
      ) : (
        <>
          {article?.data?.article?.map((a, i) => (
            <CardProfile
              key={i}
              title={a.title}
              content={a.content}
              topics={a.topics}
              image_url={a.image_url}
            />
          ))}

          <Page
            page={article?.data?.page}
            cookieName={"ppd"}
            perPage={setPerPage}
          />
        </>
      )}
    </div>
  );
}

export default Published;
