import { useGetAllMostComparesQuery } from "src/app/services/mostComparesApiSlice";
import Loading from "src/components/common/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { compareMultipleRobots } from "src/helpers/utils";

const PopularComparisons = () => {
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language.lang);
  const {
    data,
    isLoading,
    isError,
  } = useGetAllMostComparesQuery();
  const handleComparisonClick = (id1, id2, id3) => {
    const ids = [id1, id2, id3].filter(Boolean);
    compareMultipleRobots(ids,navigate)
  };

  return (
    <div
      className="mx-3 mx-md-0"
      style={{
        marginTop: "40px",
        marginBottom: "50px",
        textAlign: "center",
      }}
    >
      <h4 className="mb-3">
        {lang === "en" ? <>Popular Comparisons</> : <>Популярни сравнения</>}
      </h4>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <></>
      ) : (
        <div>
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                handleComparisonClick(
                  item.robot1?.id,
                  item.robot2?.id,
                  item.robot3?.id
                )
              }
              className="card p-4 mt-3"
              style={{
                minHeight: "50px",
                maxWidth: "450px",
                marginRight: "auto",
                marginLeft: "auto",
                border: "none",
                cursor: "pointer",
              }}
            >
              <h6 className="card-title">
                {item.robot1?.model} <span style={{ color: "gray" }}>vs.</span>{" "}
                {item.robot2?.model}{" "}
                {item.robot3 && <span style={{ color: "gray" }}>vs.</span>}{" "}
                {item.robot3?.model}
              </h6>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularComparisons;
