
import ManageRobots from "../components/ManageRobots";
import ManageUsers from "../components/ManageUsers";
import ManageMostCompared from "../components/ManageMostCompared";
import LatestQuestions from "../components/LatestQuestions";
import { ToastContainer } from 'react-toastify';

const Dashboard = ({ dashboardsActiveComponent }) => {

  const renderActiveComponent = () => {
    switch (dashboardsActiveComponent) {
      case "Robots":
        return <ManageRobots />;
      case "Users":
        return <ManageUsers />;
      case "Most Compared":
        return <ManageMostCompared />;
      case "Latest Questions":
        return <LatestQuestions />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <ToastContainer/>
      <div className="row">
        <div className="col">{renderActiveComponent()}</div>
      </div>
    </div>
  );
};
export default Dashboard;
