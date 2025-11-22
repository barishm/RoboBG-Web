import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../components/common/Loading";
import { useSelector } from "react-redux";
import { useGetConsumableByIdQuery } from "../app/services/consumableApiSlice";
import { PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { NO_IMAGE } from "../constants";

const Consumable = () => {
  const [Tab, setTab] = useState("Specs");
  const queryParams = {
    fields: "model",
  };
  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, isLoading, error } = useGetConsumableByIdQuery({ id });

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
                    : "col-12 p-sm-5 mb-5 mt-5"
                }
                style={{
                  maxWidth: "900px",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <div className="row">
                  <div className="col-8 col-md-4 mb-4">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-indicators">
                        {data.images?.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                          ></button>
                        ))}
                      </div>

                      <div className="carousel-inner rounded-3">
                        {data.images?.map((imageSrc, index) => (
                          <div
                            className={`carousel-item ${
                              index === 0 ? "active" : ""
                            }`}
                            key={index}
                          >
                            <div
                              style={{
                                position: "relative",
                                width: "100%",
                                paddingTop: "100%",
                              }}
                            >
                              <PhotoView key={index} src={imageSrc}>
                              <img
                                src={imageSrc || NO_IMAGE}
                                alt={`Slide ${index + 1}`}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              </PhotoView>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-md-8 mt-2 p-4">
                    <h3 className="fw-border mb-3">{data.title}</h3>
                    <h5 className="fw-light mb-3">{data.description}</h5>
                    <h5 className="fw-border mb-3 text-danger">{data.price} {lang === "en" ? "Leva" : "лв."}</h5>
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
                        {lang === "en" ? "Compatibility" : "Съвместимост"}
                      </a>
                    </li>
                  </ul>
                </div>
                {data.robots && data.robots.length > 0 ? (
                  <ul>
                    {data.robots.map((robot, index) => (
                      <li key={index}
                      onClick={() => navigate(`/robots/${robot.id}`)}
                      style={{ cursor: 'pointer', color: 'black', textDecoration: 'underline' }}
                      >{robot.model}</li>
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
