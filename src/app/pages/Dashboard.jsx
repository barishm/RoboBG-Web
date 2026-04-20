import ManageRobots from "src/features/cms-feature/components/ManageRobots";
import ManageUsers from "src/features/cms-feature/components/ManageUsers";
import ManageMostCompared from "src/features/cms-feature/components/ManageMostCompared";
import LatestQuestions from "src/features/cms-feature/components/LatestQuestions";
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
