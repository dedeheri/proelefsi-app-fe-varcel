import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Detail,
  RecommendCardInDetail,
  CollapseAds,
  Container,
} from "../../components/main";
import { detailArticle } from "../../constants/action/main";
import domManipulation from "../../hooks/domManipulation";
import { getAllCookies } from "../../utils/Cookie";

function DetailArticle() {
  const cookie = getAllCookies();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, message, loading } = useSelector(
    (state) => state.detailArticle
  );

  useEffect(() => {
    dispatch(detailArticle(id));
  }, [dispatch, id]);

  useEffect(() => {
    domManipulation(data);
  }, [id, cookie]);

  return (
    <Container title={data.title}>
      <div className="space-y-12 dark:bg-black bg-white w-full">
        <Detail data={data} error={error} loading={loading} message={message} />
        <div className="border-t dark:border-[#353535]" />
        <RecommendCardInDetail />
      </div>

      <CollapseAds />
    </Container>
  );
}

export default DetailArticle;
