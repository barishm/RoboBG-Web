import { useGetAllConsumablesQuery } from "../app/services/consumableApiSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import PopularComparisons from "../components/PopularComparisons";
import ConsumableFilters from "../components/ConsumableFilters";
import { useNavigate } from 'react-router-dom';

const Consumables = () => {
  const lang = useSelector((state) => state.language.lang);
  const [Page, setPage] = useState(0);
  const [filterByModels, setFilterByModels] = useState([]);
  const { data = [], isLoading, isError } = useGetAllConsumablesQuery();
  const noImage = "images/no-image.jpg";
  const entitiesPerPage = 12;
  const [filteredConsumables, setFilteredConsumables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && Array.isArray(data)) {
      if (filterByModels.length === 0) {
        setFilteredConsumables(data);
      } else {
        const filtered = data.filter(consumable =>
          consumable.robots.some(robot => filterByModels.includes(robot.model))
        );
        setFilteredConsumables(filtered);
      }
    }
  }, [data, isLoading, filterByModels]);

  const paginatedEntities = filteredConsumables.slice(
    Page * entitiesPerPage,
    (Page + 1) * entitiesPerPage
  );
  const isLast = (Page + 1) * entitiesPerPage >= filteredConsumables.length;

  const details = (id) => {
    navigate('/consumables/' + id);
  };


  const handleFilterChange = (selectedModels) => {
    setFilterByModels(selectedModels);
  };

  if (isError) {
    return <Error />;
  }

  return (
    <section className="mt-4">
      <div className="container d-flex">
        <div className="col-12 col-md-12 col-lg-9">
          <h3
            className="fw-bolder"
            style={{ marginTop: "10px", textAlign: "center" }}
          >
            {lang === "en" ? "All consumables" : "Всички консумативи"}
            <br></br>
            <button
              className="btn btn-dark mt-3 d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <i className="fa-solid fa-filter fa-sm"></i>&nbsp; Filters
            </button>
          </h3>
          {isLoading ? (
            <>
              <Loading />
            </>
          ) : paginatedEntities ? (
            <div className="row mt-4">
              {paginatedEntities.map((item) => (
                <div
                  className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3"
                  key={item.id}
                >
                  <div className="card h-100 shadow-sm bg-body-tertiary rounded">
                    <img
                      className="rounded-top"
                      value={item.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => details(item.id)}
                      src={item.image || noImage}
                      alt="..."
                    />
                    <div className="card-body">
                      <div className="text-center">
                        <h5
                          className="fw-bolder"
                          onClick={() => details(item.id)}
                          value={item.id}
                          style={{ cursor: "pointer" }}
                        >
                          {item.title}
                        </h5>
                      </div>
                    </div>
                    <div className="card-footer mb-2 border-top-0 bg-transparent d-flex justify-content-evenly">
                      <div className="btn-group text-center">
                        <h5>
                        {lang === "en" ? "Price" : "Цена"}: {item.price}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <Pagination Page={Page} setPage={setPage} isLast={isLast} />
        </div>
        <div
          className="col-12 col-md-12 col-lg-3"
          style={{ marginTop: "48px", padding: "20px" }}
        >
          <ConsumableFilters onFilterChange={handleFilterChange} />
          <div className="d-none d-lg-block"><PopularComparisons/></div>
        </div>
      </div>
    </section>
  );
};
export default Consumables;
