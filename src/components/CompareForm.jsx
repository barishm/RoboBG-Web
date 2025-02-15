import { useState } from "react";
import {
  useGetAllRobotsQuery,
  useLazyGetRobotByIdQuery,
} from "../app/services/robotApiSlice";
import { compareMultipleRobots } from "../helpers/utils";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CompareForm = () => {
  const queryParams = {
    fields: "model"
  }

  const lang = useSelector((state) => state.language.lang);
  const { data: allModels, isLoading: allModelsLoading, isError } =
  useGetAllRobotsQuery(queryParams);
  const [triggerCompare1] = useLazyGetRobotByIdQuery();
  const [triggerComapre2] = useLazyGetRobotByIdQuery();
  const [Model1, setModel1] = useState("");
  const [Model2, setModel2] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  async function handleCompare() {
    const foundItem1 = allModels.content.find((item) => item.model === Model1);
    const foundItem2 = allModels.content.find((item) => item.model === Model2);

    if (!foundItem1 || !foundItem2) {
        console.error("Invalid selection. Please select valid robot models.");
        return;
    }

    if (foundItem1.id === foundItem2.id) {
        console.error("Please select two different robots for comparison.");
        return;
    }

    try {
        const [response1, response2] = await Promise.all([
            triggerCompare1({ id: foundItem1.id }).unwrap(),
            triggerComapre2({ id: foundItem2.id }).unwrap()
        ]);

        compareMultipleRobots([response1.id, response2.id], navigate);
    } catch (error) {
        console.error("Error during comparison:", error);
    } finally {
        setModel1("");
        setModel2("");
    }
}

  return (
    <div>
      {allModelsLoading ? (
        <>
          <Loading />
        </>
      ) : isError ? (
        <></>
      ) : allModels ? (
          <div className="d-flex flex-column justify-content-center align-items-center mt-4">
            <h4>{lang === "en" ? <>Robot vacuums to compare:</> : <>Роботи за сравнение:</>}</h4>
            <div className="d-flex flex-column align-items-center p-1 mb-3 w-100">
              <input
                className="form-control mb-2"
                style={{ maxWidth: "350px" }}
                value={Model1}
                name="Model1"
                list="datalistOptions1"
                id="Model1"
                placeholder={lang === "en" ? "Choose robot from the list" : "Изберете робот от списъка"}
                onChange={(e) => setModel1(e.target.value)}
              />
              <datalist id="datalistOptions1">
                {allModels.content.map((item) => (
                  <option key={item.id} value={item.model} />
                ))}
              </datalist>
              <span className="fw-bold mx-2 mb-2">VS.</span>
              <input
                className="form-control"
                style={{ maxWidth: "350px" }}
                value={Model2}
                name="Model2"
                list="datalistOptions2"
                id="Model2"
                placeholder={lang === "en" ? "Choose robot from the list" : "Изберете робот от списъка"}
                onChange={(e) => setModel2(e.target.value)}
              />
              <datalist id="datalistOptions2">
                {allModels.content.map((item) => (
                  <option key={item.id} value={item.model} />
                ))}
              </datalist>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleCompare}
                className="btn btn-dark text-center"
              >
                {lang === "en" ? <>Compare</> : <>Сравни</>}
              </button>
            </div>
          </div>
      ) : <></>}
    </div>
  );
};
export default CompareForm;
