import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  MessageNotFound,
  TopicsLoading,
} from "../../components/main";

function Topics() {
  const { data, loading, message, error } = useSelector(
    (state) => state.topics
  );

  return (
    <Container>
      <div className="max-w-2xl mx-auto space-y-7">
        {loading ? (
          <TopicsLoading />
        ) : error ? (
          <MessageNotFound message={message} />
        ) : (
          <>
            <h1 className="font-medium text-2xl">Explore Topics </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {data.map((result, index) => (
                <Link
                  className="border px-6 py-2  rounded-full  flex justify-center hover:bg-blue-400 duration-500"
                  key={index}
                  to={result.topics}
                >
                  <button className="font-medium text-md">
                    {result.topics}
                  </button>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default Topics;
