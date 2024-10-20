import { useGetAvailableBrandsQuery } from "../../app/services/availableBrandsApiSlice";
import Loading from "../../components/Loading";

const Filters = ({
  Model,
  setPage,
  setModel,
  setBrands,
  setStartYear,
  setEndYear,
  setMinDustbinCapacity,
  setMaxDustbinCapacity,
  setMinSuctionPower,
  setMaxSuctionPower,
  Brands,
}) => {
  const { data: availableBrands, isLoading: availableBrandsIsLoading } =
    useGetAvailableBrandsQuery();
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setBrands((prev) => [...prev, value]);
    } else {
      setBrands((prev) => prev.filter((brand) => brand !== value));
    }
    setPage(0);
    console.log(Brands);
  };
  function clearAllInputs() {
    ['startYearInput', 'endYearInput', 'minDustbinCapacityInput', 'maxDustbinCapacityInput', 'minSuctionPowerInput', 'maxSuctionPowerInput', 'startYearInputM', 'endYearInputM', 'minDustbinCapacityInputM', 'maxDustbinCapacityInputM', 'minSuctionPowerInputM', 'maxSuctionPowerInputM'].forEach(id => document.getElementById(id).value = '');
  }

  const handleGoButtonClick = () => {
    if (document.getElementById("startYearInput").value.length > 0) {
      const startYearValue = parseInt(
        document.getElementById("startYearInput").value
      );
      setStartYear(startYearValue);
    } else {
      setStartYear(0);
    }
    if (document.getElementById("endYearInput").value.length > 0) {
      const endYearValue = parseInt(
        document.getElementById("endYearInput").value
      );
      setEndYear(endYearValue);
    } else {
      setEndYear(0);
    }
    if (document.getElementById("minDustbinCapacityInput").value.length > 0) {
      const minDustbinCapacityValue = parseInt(
        document.getElementById("minDustbinCapacityInput").value
      );
      setMinDustbinCapacity(minDustbinCapacityValue);
    } else {
      setMinDustbinCapacity(0);
    }
    if (document.getElementById("maxDustbinCapacityInput").value.length > 0) {
      const maxDustbinCapacityValue = parseInt(
        document.getElementById("maxDustbinCapacityInput").value
      );
      setMaxDustbinCapacity(maxDustbinCapacityValue);
    } else {
      setMaxDustbinCapacity(0);
    }
    if (document.getElementById("minSuctionPowerInput").value.length > 0) {
      const minSuctionPowerValue = parseInt(
        document.getElementById("minSuctionPowerInput").value
      );
      setMinSuctionPower(minSuctionPowerValue);
    } else {
      setMinSuctionPower(0);
    }
    if (document.getElementById("maxSuctionPowerInput").value.length > 0) {
      const maxSuctionPowerValue = parseInt(
        document.getElementById("maxSuctionPowerInput").value
      );
      setMaxSuctionPower(maxSuctionPowerValue);
    } else {
      setMaxSuctionPower(0);
    }
    setPage(0);
    clearAllInputs();
  };

  const handleGoButtonClickM = () => {
    if (document.getElementById("startYearInputM").value.length > 0) {
      const startYearValue = parseInt(
        document.getElementById("startYearInputM").value
      );
      setStartYear(startYearValue);
    } else {
      setStartYear(0);
    }
    if (document.getElementById("endYearInputM").value.length > 0) {
      const endYearValue = parseInt(
        document.getElementById("endYearInputM").value
      );
      setEndYear(endYearValue);
    } else {
      setEndYear(0);
    }
    if (document.getElementById("minDustbinCapacityInputM").value.length > 0) {
      const minDustbinCapacityValue = parseInt(
        document.getElementById("minDustbinCapacityInputM").value
      );
      setMinDustbinCapacity(minDustbinCapacityValue);
    } else {
      setMinDustbinCapacity(0);
    }
    if (document.getElementById("maxDustbinCapacityInputM").value.length > 0) {
      const maxDustbinCapacityValue = parseInt(
        document.getElementById("maxDustbinCapacityInputM").value
      );
      setMaxDustbinCapacity(maxDustbinCapacityValue);
    } else {
      setMaxDustbinCapacity(0);
    }
    if (document.getElementById("minSuctionPowerInputM").value.length > 0) {
      const minSuctionPowerValue = parseInt(
        document.getElementById("minSuctionPowerInputM").value
      );
      setMinSuctionPower(minSuctionPowerValue);
    } else {
      setMinSuctionPower(0);
    }
    if (document.getElementById("maxSuctionPowerInputM").value.length > 0) {
      const maxSuctionPowerValue = parseInt(
        document.getElementById("maxSuctionPowerInputM").value
      );
      setMaxSuctionPower(maxSuctionPowerValue);
    } else {
      setMaxSuctionPower(0);
    }
    setPage(0);
    clearAllInputs();
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Filters
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form id="filters">
            <div>
              <label htmlFor="id_title" className="form-label">
                By model name
              </label>
              <input
                type="text"
                name="title"
                value={Model}
                onChange={(e) => {
                  setModel(e.target.value);
                  setPage(0);
                }}
                className="textinput textInput form-control"
                id="id_title"
              ></input>
            </div>
            <div className="mt-3">
              <label className="form-label">Brand Name</label>
              <div className="card p-2" style={{ maxHeight: "195px", overflowY: "auto" }}>
                {availableBrandsIsLoading ? (
                  <>
                    <Loading />
                  </>
                ) : availableBrands ? (
                  <>
                    {availableBrands.map((item) => (
                      <div className="form-check" key={item.id}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="brand_name"
                          checked={Brands.includes(item.brand)}
                          value={item.brand}
                          onChange={handleCheckboxChange}
                        ></input>
                        <label htmlFor="id_brand_name_0" className="form-check-label">
                          {item.brand}{" "}
                          <span style={{ color: "grey" }}>({item.count})</span>
                        </label>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Release Year</label>
              <div className="input-group input-group-sm">
                <input
                  id="startYearInputM"
                  type="number"
                  className="form-control"
                  placeholder="From"
                  aria-label="From"
                ></input>
                <span className="input-group-text">-</span>
                <input
                  id="endYearInputM"
                  type="number"
                  className="form-control"
                  placeholder="To"
                  aria-label="To"
                ></input>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={handleGoButtonClickM}
                >
                  Go
                </button>
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Dustbin Capacity (ml)</label>
              <div className="input-group input-group-sm">
                <input
                  id="minDustbinCapacityInputM"
                  type="number"
                  className="form-control"
                  placeholder="From"
                  aria-label="From"
                ></input>
                <span className="input-group-text">-</span>
                <input
                  id="maxDustbinCapacityInputM"
                  type="number"
                  className="form-control"
                  placeholder="To"
                  aria-label="To"
                ></input>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={handleGoButtonClickM}
                >
                  Go
                </button>
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Suction Power (Pa)</label>
              <div className="input-group input-group-sm">
                <input
                  id="minSuctionPowerInputM"
                  type="number"
                  className="form-control"
                  placeholder="From"
                  aria-label="From"
                ></input>
                <span className="input-group-text">-</span>
                <input
                  id="maxSuctionPowerInputM"
                  type="number"
                  className="form-control"
                  placeholder="To"
                  aria-label="To"
                ></input>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={handleGoButtonClickM}
                >
                  Go
                </button>
              </div>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-dark mt-3"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Apply
          </button>
        </div>
      </div>
      <div className="card d-none d-lg-block">
        <div className="card-header p-3">
          {" "}
          <h5 style={{ marginBottom: "0px" }}>
            {" "}
            <i className="fa-solid fa-filter fa-sm"></i> Filters
          </h5>
        </div>
        <div className="card-body p-4">
          <form id="filters">
            <div>
              <label htmlFor="id_title" className="form-label">
                By model name
              </label>
              <input
                type="text"
                name="title"
                value={Model}
                onChange={(e) => {
                  setModel(e.target.value);
                  setPage(0);
                }}
                className="textinput textInput form-control"
                id="id_title"
              ></input>
            </div>
            <div className="mt-3">
              <label className="form-label">Brand Name</label>
              <div className="card p-2" style={{ maxHeight: "195px", overflowY: "auto" }}>
                {availableBrandsIsLoading ? (
                  <>
                    <Loading />
                  </>
                ) : availableBrands ? (
                  <>
                    {availableBrands.map((item) => (
                      <div className="form-check" key={item.id}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="brand_name"
                          checked={Brands.includes(item.brand)}
                          value={item.brand}
                          onChange={handleCheckboxChange}
                        ></input>
                        <label htmlFor="id_brand_name_0" className="form-check-label">
                          {item.brand}{" "}
                          <span style={{ color: "grey" }}>({item.count})</span>
                        </label>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Release Year</label>
              <div className="input-group input-group-sm">
                <input
                  id="startYearInput"
                  type="number"
                  className="form-control"
                  placeholder="From"
                  aria-label="From"
                ></input>
                <span className="input-group-text">-</span>
                <input
                  id="endYearInput"
                  type="number"
                  className="form-control"
                  placeholder="To"
                  aria-label="To"
                ></input>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={handleGoButtonClick}
                >
                  Go
                </button>
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Dustbin Capacity (ml)</label>
              <div className="input-group input-group-sm">
                <input
                  id="minDustbinCapacityInput"
                  type="number"
                  className="form-control"
                  placeholder="From"
                  aria-label="From"
                ></input>
                <span className="input-group-text">-</span>
                <input
                  id="maxDustbinCapacityInput"
                  type="number"
                  className="form-control"
                  placeholder="To"
                  aria-label="To"
                ></input>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={handleGoButtonClick}
                >
                  Go
                </button>
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Suction Power (Pa)</label>
              <div className="input-group input-group-sm">
                <input
                  id="minSuctionPowerInput"
                  type="number"
                  className="form-control"
                  placeholder="From"
                  aria-label="From"
                ></input>
                <span className="input-group-text">-</span>
                <input
                  id="maxSuctionPowerInput"
                  type="number"
                  className="form-control"
                  placeholder="To"
                  aria-label="To"
                ></input>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={handleGoButtonClick}
                >
                  Go
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Filters;
