import { useSelector } from 'react-redux';
import Loading from 'src/components/Loading';
import {
  useLazyGetRobotByIdQuery,
  useGetAllRobotsQuery,
} from 'src/app/services/robotApiSlice';
import { useState } from 'react';
import ReleaseDateDisplay from 'src/components/ReleaseDateDisplay';
import SpecsRenderer from 'src/components/SpecsRenderer';
import { addIdToUrl, removeIdFromUrl } from 'src/utils/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './CompareTable.module.css';
import SpecificationRow from './SpecificationRow';
import SectionHeader from './SectionHeader';
import { specsConfig } from './specsConfig';

const CompareTable = () => {
  const queryParams = {
    fields: 'model',
  };
  const noImage = 'images/no-image.jpg';
  const lang = useSelector((state) => state.language.lang);
  const { robots } = useSelector((state) => state.compare);
  const { data: allModels = { content: [] }, isLoading } = useGetAllRobotsQuery(queryParams);
  const [Model, setModel] = useState('');
  const [triggerAdd] = useLazyGetRobotByIdQuery();
  const navigate = useNavigate();
  const location = useLocation();


  const deleteHandler = (e) => {
    const id = parseInt(e.target.dataset.id, 10);
    removeIdFromUrl(location.search, id, navigate);
  };

  function handleAdd() {
    const foundItem = allModels.content.find((item) => item.model === Model);
    if (foundItem) {
      const id = foundItem.id;
      triggerAdd({ id }).then((response) => {
        console.log('Response data:', response.data);
        addIdToUrl(location.search, id, navigate);
      });
    }
    setModel('');
  }

  const renderRow = (field) => {
    return robots.map((item) => {
      let value = field.includes('.')
        ? getFieldByPath(item, field)
        : item[field];
      return (
        <td
          key={item.id}
          style={{
            height: '80px',
            verticalAlign: 'bottom',
            textAlign: 'left',
            whiteSpace: 'normal',
          }}
          className="border"
        >
          {value === null ? (
            <span style={{ color: 'grey' }}>N/A</span>
          ) : value === true ? (
            <span style={{ color: 'green' }}>
              {lang === 'en' ? 'YES' : 'ДА'}
            </span>
          ) : value === false ? (
            <span style={{ color: 'red' }}>{lang === 'en' ? 'NO' : 'НЕ'}</span>
          ) : (
            value
          )}
        </td>
      );
    });
  };
  const renderStringRow = (field, addition) => {
    return robots.map((item) => {
      let value = field.includes('.')
        ? getFieldByPath(item, field)
        : item[field];
      return (
        <td
          key={item.id}
          style={{
            height: '80px',
            verticalAlign: 'bottom',
            textAlign: 'left',
            whiteSpace: 'normal',
          }}
          className="border"
        >
          {value === null ? (
            <span style={{ color: 'grey' }}>N/A</span>
          ) : (
            <>
              {value} {addition === 'm²' ? <>m&sup2;</> : addition}
            </>
          )}
        </td>
      );
    });
  };
  function getFieldByPath(obj, path) {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }
    return value;
  }

  return (
    <div
      className={styles.comparisonContainer}
      style={{
        overflowX: 'auto',
        marginBottom: '50px',
        maxWidth: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {robots ? (
        <div className={styles.responsiveWrapper}>
          <div
            style={{
              display: 'flex',
              maxWidth: '350px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            className="mb-1 mt-5"
          >
            <input
              className="form-control me-2"
              value={Model}
              name="Model"
              list="datalistOptions"
              id="Model"
              placeholder={
                lang === 'en'
                  ? 'Choose robot from the list'
                  : 'Изберете робот от списъка'
              }
              onChange={(e) => setModel(e.target.value)}
            />
            <button type="button" className="btn btn-dark" onClick={handleAdd}>
              {lang === 'en' ? 'Add' : 'Добави'}
            </button>
            <datalist id="datalistOptions">
              {allModels.content
                .slice()
                .sort((a, b) => a.model.localeCompare(b.model))
                .map((item) => (
                  <option key={item.id} value={item.model} />
                ))}
            </datalist>
          </div>
          <table
            className={`table ${styles.verticalComparisonTable}`}
            style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <thead></thead>
            <tbody>
              {/* Model name row */}
              <tr>
                <th scope="row"></th>
                {robots.map((item) => (
                  <td
                    key={item.id}
                    className="border"
                    style={{ backgroundColor: '#212529', color: '#F5F5F5' }}
                  >
                    {item.model}
                  </td>
                ))}
              </tr>

              {/* Image and delete button row */}
              <tr>
                <th scope="row"></th>
                {robots.map((item) => (
                  <td
                    key={item.id}
                    style={{
                      height: '90px',
                      verticalAlign: 'bottom',
                      textAlign: 'left',
                    }}
                    className="border"
                  >
                    <div className="image d-flex">
                      <img
                        src={item.image || noImage}
                        alt="..."
                        style={{ width: '70px', display: 'block' }}
                      ></img>
                      <div className="image-overlay ms-1">
                        <i
                          className="fa-solid fa-xmark"
                          style={{
                            color: '#D60000',
                            fontSize: '25px',
                            cursor: 'pointer',
                          }}
                          data-id={item.id}
                          onClick={deleteHandler}
                        ></i>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Specification rows */}
              {specsConfig.map((spec, index) => {
                if (spec.section) {
                  return (
                    <SectionHeader
                      key={`section-${index}`}
                      title={spec.section}
                      colSpan={robots.length}
                    />
                  );
                }

                if (spec.custom === 'releaseDate') {
                  return (
                    <tr key={`spec-${index}`}>
                      <th scope="row">
                        <span className={styles.stickySpecLabel}>
                          {SpecsRenderer({ textKey: spec.textKey })}{' '}
                          <a
                            tabIndex="0"
                            data-bs-container="body"
                            data-bs-toggle="popover"
                            data-bs-trigger="hover focus"
                            data-bs-placement="right"
                            data-bs-content={SpecsRenderer({
                              textKey: `${spec.textKey}Desc`,
                            })}
                            style={{ color: '#000000', cursor: 'pointer' }}
                          >
                            <i className="fa-regular fa-circle-question fa-xs"></i>
                          </a>
                        </span>
                      </th>
                      {robots.map((item) => (
                        <td
                          key={item.id}
                          style={{
                            height: '80px',
                            verticalAlign: 'bottom',
                            textAlign: 'left',
                            whiteSpace: 'normal',
                          }}
                          className="border"
                        >
                          <ReleaseDateDisplay
                            releaseDate={item.otherSpecifications.releaseDate}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                }

                return (
                  <SpecificationRow
                    key={`spec-${index}`}
                    textKey={spec.textKey}
                    field={spec.field}
                    unit={spec.unit}
                    renderRow={renderRow}
                    renderStringRow={renderStringRow}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default CompareTable;
