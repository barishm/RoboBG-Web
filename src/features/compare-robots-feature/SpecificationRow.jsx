import SpecsRenderer from 'src/components/SpecsRenderer';
import styles from './CompareTable.module.css';

const SpecificationRow = ({ textKey, field, unit, renderRow, renderStringRow }) => {
  return (
    <tr>
      <th scope="row">
        <span className={styles.stickySpecLabel}>
          {SpecsRenderer({ textKey })}{' '}
          <a
            tabIndex="0"
            data-bs-container="body"
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-placement="right"
            data-bs-content={SpecsRenderer({ textKey: `${textKey}Desc` })}
            style={{ color: '#000000', cursor: 'pointer' }}
          >
            <i className="fa-regular fa-circle-question fa-xs"></i>
          </a>
        </span>
      </th>
      {unit ? renderStringRow(field, unit) : renderRow(field)}
    </tr>
  );
};

export default SpecificationRow;
