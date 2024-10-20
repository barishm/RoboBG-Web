import CompareTable from "./components/CompareTable";
import CompareForm from "./components/CompareForm";
import { useSelector } from "react-redux";
import PopularComparisons from "./components/PopularComparisons";

const Compare = () => {
  const { robots } = useSelector((state) => state.compare);

  return (
    <div>
      {robots.length < 1 ? (
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
