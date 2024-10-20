import { useNavigate } from 'react-router-dom';
import { useGetAllRobotsQuery } from '../../app/services/robotApiSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PopularComparisons from '../Compare/components/PopularComparisons';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Filters from './Filters';
import Pagination from '../../components/Pagination';

const Robots = () => {
  const [Page, setPage] = useState(0);
  const [Model, setModel] = useState('');
  const [Brands, setBrands] = useState([]);
  const [StartYear, setStartYear] = useState(0);
  const [EndYear, setEndYear] = useState(0);
  const [MinDustbinCapacity, setMinDustbinCapacity] = useState(0);
  const [MaxDustbinCapacity, setMaxDustbinCapacity] = useState(0);
  const [MinSuctionPower, setMinSuctionPower] = useState(0);
  const [MaxSuctionPower, setMaxSuctionPower] = useState(0);
  const queryParams = {
    fields: 'model,image,links',
    page: Page,
    model: Model,
    brands: Brands.join(','),
    startYear: StartYear,
    endYear: EndYear,
    minDustbinCapacity: MinDustbinCapacity,
    maxDustbinCapacity: MaxDustbinCapacity,
    minSuctionPower: MinSuctionPower,
    maxSuctionPower: MaxSuctionPower,
  };
  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllRobotsQuery(queryParams);
  const noImage = 'images/no-image.jpg';
  const isLast = data?.last;

  const details = (robotId) => {
    navigate('/robots/' + robotId);
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
            style={{ marginTop: '10px', textAlign: 'center' }}
          >
            {lang === 'en' ? 'All Robot Vacuum Cleaners' : 'Всички роботи'}
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
          ) : data.content ? (
            <div className="row mt-4">
              {data.content.map((item) => (
                <div
                  className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3"
                  key={item.id}
                >
                  <div className="card h-100 shadow-sm bg-body-tertiary rounded">
                    <img
                      className="rounded-top"
                      value={item.id}
                      style={{ cursor: 'pointer' }}
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
                          style={{ cursor: 'pointer' }}
                        >
                          {item.model}
                        </h5>
                      </div>
                    </div>
                    <div className="card-footer mb-2 border-top-0 bg-transparent d-flex justify-content-evenly">
                      <div className="btn-group text-center">
                        <button
                          type="button"
                          className="btn btn-warning btn-sm dropdown-toggle rounded-5 d-none d-md-inline-block"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {lang === 'en' ? 'Check price' : 'Провери цена'}
                        </button>

                        <button
                          type="button"
                          className="btn btn-warning btn-sm dropdown-toggle rounded-5 d-md-none"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {lang === 'en' ? 'Price' : 'Цена'}
                        </button>
                        <ul className="dropdown-menu">
                          {item.purchaseLinks.length > 0 &&
                            item.purchaseLinks.map((link) => (
                              <li key={link.id}>
                                <a className="dropdown-item" target='_blank' href={link.link}>
                                  {link.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="mt-1">
                        <i className="fa-regular fa-comments fa-sm"></i>{' '}
                        <span className="">0</span>
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
          style={{ marginTop: '48px', padding: '20px' }}
        >
          <Filters
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
          />
          <div className="d-none d-lg-block">{/* <PopularComparisons/> */}</div>
        </div>
      </div>
    </section>
  );
};
export default Robots;
