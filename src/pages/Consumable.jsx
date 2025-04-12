import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { useGetConsumableByIdQuery } from "../app/services/consumableApiSlice";

const Consumable = () => {
  const [Tab, setTab] = useState("Specs");
  const queryParams = {
    fields: "model",
  };
  const lang = useSelector((state) => state.language.lang);

  const { id } = useParams();
  const [Model, setModel] = useState("");
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetConsumableByIdQuery({ id });
  const noImage = "../../../public/images/no-image.jpg";

  const compare = (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    const foundItem = allModels.content.find((item) => item.model === newModel);

    if (foundItem && foundItem.id !== data.id) {
      let id = data.id;
      let id2 = foundItem.id;
      compareMultipleRobots([id, id2], navigate);
    }
    setModel("");
  };
  const changeTab = (tabName) => {
    setTab(tabName);
  };

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>
          <Loading />
        </>
      ) : data ? (
        <>
          <div
            className={screenSize > 575 ? "container mt-4" : "container"}
            style={screenSize > 575 ? {} : { backgroundColor: "white" }}
          >
            <div className="row">
              <div
                className={
                  screenSize > 575
                    ? "col-12 shadow-sm rounded card p-sm-5 mb-5"
                    : "col-12 p-sm-5 mb-5"
                }
                style={{
                  maxWidth: "900px",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <div className="row">
                  <div className="col-8 col-md-4 mb-4">
                    <img
                      className="mt-4 ms-4"
                      style={{ maxWidth: "200px", height: "auto" }}
                      src={data.image || noImage}
                    />
                  </div>
                  <div className="col-12 col-md-8 mt-2 p-4">
                    <h3 className="fw-border mb-3">{data.title}</h3>
                  </div>
                </div>
                <div className="row mt-5 p-2">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          Tab === "Specs" ? "active" : ""
                        }`}
                        style={{ color: "black" }}
                        onClick={() => changeTab("Specs")}
                        href="#"
                      >
                        Robots
                      </a>
                    </li>
                  </ul>
                </div>
                {data.robots && data.robots.length > 0 ? (
                  <ul>
                    {data.robots.map((robot, index) => (
                      <li key={index}>{robot.model}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No robots available.</p>
                )}
              </div>
              <div className="col-12"></div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Consumable;
