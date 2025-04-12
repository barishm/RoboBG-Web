import { useSelector } from "react-redux";

const ConsumableTab = ({ robot }) => {


    return (
        <div>
          <h3 className="mt-3">Consumables</h3>
          {robot?.consumables && robot.consumables.length > 0 ? (
            <ul>
              {robot.consumables.map((consumable, index) => (
                <li key={index}>{consumable.title}</li>
              ))}
            </ul>
          ) : (
            <p>No consumables available.</p>
          )}
        </div>
      );
};

export default ConsumableTab;