import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConsumableTab = ({ robot }) => {

  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();

    return (
        <div className="mt-3">
          {robot?.consumables && robot.consumables.length > 0 ? (
            <ul>
              {robot.consumables.map((consumable, index) => (
                <li key={index}
                onClick={() => navigate(`/consumables/${consumable.id}`)}
                style={{ cursor: 'pointer', color: 'black', textDecoration: 'underline' }}
                >{consumable.title}</li>
              ))}
            </ul>
          ) : (
            <p>No consumables available.</p>
          )}
        </div>
      );
};

export default ConsumableTab;