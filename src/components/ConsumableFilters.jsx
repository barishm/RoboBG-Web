import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useGetAllConsumablesQuery } from '../app/services/consumableApiSlice';

const ConsumableFilters = ({ onFilterChange }) => {
  const lang = useSelector((state) => state.language.lang);
  const [selectedModel, setSelectedModel] = useState("");
  const { data = [], isLoading, isError } = useGetAllConsumablesQuery();

  const models = data
    .map(consumable => consumable.robots)
    .flat()
    .map(robot => robot.model);
  
  const uniqueModels = [...new Set(models)];

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);

    if (model === "") {
      onFilterChange([]);
    } else {
      onFilterChange([model]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading consumables</div>;
  }

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header"></div>
      </div>
      <div className="card d-none d-lg-block">
        <div className="card-header p-3">
          <h5 style={{ marginBottom: "0px" }}>
            <i className="fa-solid fa-filter fa-sm"></i> {lang === "en" ? "Filters" : "Филтри"}
          </h5>
        </div>
        <div className="card-body p-4 h-400" style={{ height: "150px" }}>
          <div className="form-group">
            <label htmlFor="exampleDataList" className="form-label">
              {lang === "en" ? "Select Model" : "Изберете модел"}
            </label>
            <input
              className="form-control"
              list="datalistOptions"
              id="exampleDataList"
              placeholder={lang === "en" ? "Type to search..." : "Търсете..."}
              value={selectedModel}
              onChange={handleModelChange}
            />
            <datalist id="datalistOptions">
              <option value=""></option>
              {uniqueModels.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </datalist>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsumableFilters;