import ManageRobots from "src/components/dashboardPage/ManageRobots";
import ManageUsers from "src/components/dashboardPage/ManageUsers";
import ManageMostCompared from "src/components/dashboardPage/ManageMostCompared";
import LatestQuestions from "src/components/dashboardPage/LatestQuestions";
import ManageConsumables from "src/components/dashboardPage/ManageConsumables";
const Dashboard = ({ dashboardsActiveComponent }) => {

  const renderActiveComponent = () => {
    switch (dashboardsActiveComponent) {
      case "Manage Robots":
        return <ManageRobots />;
      case "Manage Users":
        return <ManageUsers />;
      case "Manage Most Compared":
        return <ManageMostCompared />;
      case "Latest Questions":
        return <LatestQuestions />;
      case "Manage Consumables":
          return <ManageConsumables />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">{renderActiveComponent()}</div>
      </div>
    </div>
  );
};
export default Dashboard;
