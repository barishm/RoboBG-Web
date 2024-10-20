import { useGetAllMostComparesQuery, useDeleteMostComparesMutation } from "../../../app/services/mostComparesApiSlice";
import Loading from "../../../components/Loading";
import CreateMostCompared from "./CreateMostCompared";
import { useSelector } from "react-redux";

const ManageMostCompared = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const { data: allCompares, isLoading: allComparesIsLoading } =
    useGetAllMostComparesQuery();
  const [deleteMC] = useDeleteMostComparesMutation();

  const deleteHandler = (e) => {
    const id = e.target.value;
    deleteMC({ id, accessToken });
  };


  return (
    <div>
      <button
        type="button"
        className="btn btn-success btn-sm mb-1 ml-2"
        data-bs-toggle="modal"
        data-bs-target="#create"
      >
        Create
      </button>
      <CreateMostCompared />


      {allComparesIsLoading ? (
        <Loading />
      ) : (
        <>
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order</th>
                <th scope="col">Models</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allCompares &&
                allCompares.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.order}</td>
                    <td>
                      {item.robot1?.model}
                      <br />
                      {item.robot2 ? (
                        <>
                          <hr />
                        </>
                      ) : (
                        <></>
                      )}
                      {item.robot2?.model}
                      <br />
                      {item.robot3 ? (
                        <>
                          <hr />
                        </>
                      ) : (
                        <></>
                      )}
                      {item.robot3?.model}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        value={item.id}
                        onClick={deleteHandler}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManageMostCompared;
