import CompareTable from "./components/CompareTable";
import CompareForm from "./components/CompareForm";
import { useSelector } from "react-redux";
import PopularComparisons from "./components/PopularComparisons";
import { useEffect } from "react";
import { addRobot, deleteRobotById } from "../../app/redux/compareSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useLazyGetRobotByIdQuery } from "../../app/services/robotApiSlice";
import { getRobotIdsFromUrl } from "../../helpers/utils";

const Compare = () => {
  const dispatch = useDispatch();
  const { robots } = useSelector((state) => state.compare);
  const location = useLocation();
  const [triggerAdd] = useLazyGetRobotByIdQuery();

  useEffect(() => {
    const fetchRobots = async () => {
      const ids = getRobotIdsFromUrl(location.search);
      if (ids.length === 0) return;

      try {
        const currentRobotIds = robots.map((robot) => robot.id);
        const idsToAdd = ids.filter((id) => !currentRobotIds.includes(id));
        const robotPromises = idsToAdd.map((id) => triggerAdd({ id }).unwrap());

        const robotsData = await Promise.all(robotPromises);
        robotsData.forEach((robot) => {
          if (robot) dispatch(addRobot(robot));
        });

        const idsToRemove = currentRobotIds.filter((id) => !ids.includes(id));
        idsToRemove.forEach((id) => dispatch(deleteRobotById(id)));
      } catch (error) {
        console.error("Error fetching robots:", error);
      }
    };

    fetchRobots();
  }, [location.search, dispatch, triggerAdd, robots]);
  

  return (
    <div>
      {robots.length <= 1 ? (
        <div>
          <CompareForm />
          <PopularComparisons/>
        </div>
      ) : (
        <>
          <CompareTable />
        </>
      )}
    </div>
  );
};
export default Compare;
