import { useNavigate } from 'react-router-dom';
import { useGetAllRobotsNewQuery } from '../app/services/robotApiSlice';
import { useSelector } from 'react-redux';
import { useState, useMemo } from 'react';

import PopularComparisons from '../components/PopularComparisons';
import Loading from '../components/Loading';
import Error from '../components/Error';
import RobotFilters from '../components/RobotFilters';
import Pagination from '../components/Pagination';

import { NO_IMAGE, DEFAULT_ENTITIES_PER_PAGE } from '../constants';
import usePagination from '../hooks/usePagination';
import useRobotFilters from '../hooks/useRobotFilters';

const Robots = () => {
  const [Model, setModel] = useState('');
  const [Brands, setBrands] = useState([]);
  const [StartYear, setStartYear] = useState(0);
  const [EndYear, setEndYear] = useState(0);
  const [MinDustbinCapacity, setMinDustbinCapacity] = useState(0);
  const [MaxDustbinCapacity, setMaxDustbinCapacity] = useState(0);
  const [MinSuctionPower, setMinSuctionPower] = useState(0);
  const [MaxSuctionPower, setMaxSuctionPower] = useState(0);

  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();

  const { data = [], isLoading, isError } = useGetAllRobotsNewQuery();

  const filterOptions = useMemo(() => ({
    Model,
    Brands,
    StartYear,
    EndYear,
    MinDustbinCapacity,
    MaxDustbinCapacity,
    MinSuctionPower,
    MaxSuctionPower,
  }), [
    Model,
    Brands,
    StartYear,
    EndYear,
    MinDustbinCapacity,
    MaxDustbinCapacity,
    MinSuctionPower,
    MaxSuctionPower,
  ]);

  const availableBrands = useMemo(() => {
  const brandMap = new Map();

  data.forEach((robot) => {
    const brand = robot.brand?.trim();
    if (!brand) return;
    brandMap.set(brand, (brandMap.get(brand) || 0) + 1);
  });

  return Array.from(brandMap.entries()).map(([brand, count], index) => ({
    id: index + 1,
    brand,
    count,
  }));
}, [data]);

  const filteredRobots = useRobotFilters(data, filterOptions, isLoading);
  const { page, setPage, paginatedData: paginatedRobots, isLast } = usePagination(filteredRobots, DEFAULT_ENTITIES_PER_PAGE);

  const details = (id) => navigate('/robots/' + id);

  if (isError) return <Error />;

  return (
    <section className="mt-4">
      <div className="container d-flex">
        <div className="col-12 col-md-12 col-lg-9">
          <h3 className="fw-bolder text-center mt-2">
            {lang === 'en' ? 'All Robot Vacuum Cleaners' : 'Всички роботи'}
            <br />
            <button
              className="btn btn-dark mt-3 d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <i className="fa-solid fa-filter fa-sm"></i>&nbsp; {lang === 'en' ? 'Filters' : 'Филтри'}
            </button>
          </h3>

          {isLoading ? (
            <Loading />
          ) : (
            <div className="row mt-4">
              {paginatedRobots.map((item) => (
                <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3" key={item.id}>
                  <div className="card shadow-sm bg-body-tertiary rounded">
                    <img
                      className="rounded-top"
                      style={{ cursor: 'pointer' }}
                      onClick={() => details(item.id)}
                      src={item.image || NO_IMAGE}
                      alt="robot"
                    />
                    <div className="card-body text-center">
                      <h5 className="fw-bolder" style={{ cursor: 'pointer' }} onClick={() => details(item.id)}>
                        {item.model}
                      </h5>
                    </div>
                    <div className="card-footer mb-2 border-top-0 bg-transparent d-flex justify-content-evenly">
                      <div className="btn-group text-center">
                        <button
                          type="button"
                          className="btn btn-warning btn-sm dropdown-toggle rounded-5 d-none d-md-inline-block"
                          data-bs-toggle="dropdown"
                        >
                          {lang === 'en' ? 'Check price' : 'Провери цена'}
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm dropdown-toggle rounded-5 d-md-none"
                          data-bs-toggle="dropdown"
                        >
                          {lang === 'en' ? 'Price' : 'Цена'}
                        </button>
                        <ul className="dropdown-menu">
                          {item.purchaseLinks.map((link) => (
                            <li key={link.id}>
                              <a className="dropdown-item" target="_blank" href={link.link} rel="noreferrer">
                                {link.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-1">
                        <i className="fa-regular fa-comments fa-sm"></i>{' '}
                        <span className="">{item.qnaCount ?? 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Pagination Page={page} setPage={setPage} isLast={isLast} />
        </div>

        <div className="col-12 col-md-12 col-lg-3" style={{ marginTop: '48px', padding: '20px' }}>
          <RobotFilters
            Model={Model}
            setPage={setPage}
            setModel={setModel}
            setBrands={setBrands}
            setStartYear={setStartYear}
            setEndYear={setEndYear}
            setMinDustbinCapacity={setMinDustbinCapacity}
            setMaxDustbinCapacity={setMaxDustbinCapacity}
            setMinSuctionPower={setMinSuctionPower}
            setMaxSuctionPower={setMaxSuctionPower}
            Brands={Brands}
            availableBrands={availableBrands}
          />
          <div className="d-none d-lg-block">
            <PopularComparisons />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Robots;
