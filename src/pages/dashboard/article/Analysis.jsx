import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Container } from "../../../components";
import { analysisArticleAction } from "../../../constants/action/dashboard/index";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analysis() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    analysis: { data, loading, error, message, success },
  } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(analysisArticleAction(id));
  }, [dispatch, id]);

  const options = { maintainAspectRatio: false, responsive: true };

  const chartData = {
    labels: data?.view?.map((x) => x.timestamps),
    datasets: [
      {
        label: "View",
        data: data?.view?.map((x) => x.view),
        borderColor: "rgba(102, 255, 102, 1)",
        backgroundColor: "rgba(102, 255, 102, 0.5)",
      },
      {
        label: "Report",
        data: data?.view?.map((x) => x.report),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Container title={"Analysis"}>
      {/* header */}

      {loading ? (
        <h1>:loading</h1>
      ) : error ? (
        <h1>{message}</h1>
      ) : (
        <div className="md:flex md:space-x-7 ">
          <div className="pl-5 md:pl-7 pt-4 md:pt-6 lg:pt-8 ">
            {/* overview */}
            <div className="space-y-4">
              <h1 className="font-medium text-xl md:text-2xl lg:text-3xl  pb-3 md:pb-2 lg:pb-7">
                Analysis
              </h1>
              <div className="border  py-3 h-[22rem] w-full   rounded-md dark:border-[#353535]">
                <Line
                  data={chartData}
                  options={options}
                  width={1400}
                  height={900}
                />
              </div>
            </div>
          </div>
          <div className="border-l" />
          {/* report */}
          <div className="pt-4 md:pt-6 lg:pt-20 pb-3 md:pb-2 lg:pb-7 pr-5 md:pr-7">
            <div className="space-y-4">
              <div className="space-y-2">
                {data?.report?.map((result) => (
                  <div key={result._id} className="space-y-2">
                    <h1 className="text-md font-medium !leading-5">
                      {result.comments}
                    </h1>
                    <div className=" flex justify-start">
                      <h1 className="text-md font-medium bg-red-100 px-2 py-0.5  rounded-md">
                        {result.problem}
                      </h1>
                    </div>
                    <h1 className="text-sm dark:text-gray-400 text-gray-500  ">
                      {result.timestamp}
                    </h1>
                    <div className=" border-b" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Analysis;
