import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { requestGetArticleUserDraft } from "../../../action/user";
import {
  CardProfile,
  Message,
  Page,
  SkeletonCardProfile,
} from "../../../components";

function Draft() {
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
    requestGetArticleUserDraft(setArticle, id, search);
  }, [id, search, page]);

  console.log(article);

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

export default Draft;
