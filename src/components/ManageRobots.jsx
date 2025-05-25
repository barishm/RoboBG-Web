import {
  useGetAllRobotsNewQuery,
  useDeleteRobotMutation
} from "../app/services/robotApiSlice";
import {
  useDeleteLinkMutation,
} from "../app/services/linkApiSlice";
import Loading from "../components/Loading";
import CreateRobot from "./CreateRobot";
import { useSelector } from "react-redux";
import UpdateRobot from "./UpdateRobot";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../components/Pagination";
import UploadRobotImage from "./UploadRobotImage";
import CreateLink from "./CreateLink";
import DeletePopup from "./DeletePopup";
import usePagination from "../hooks/usePagination";

import { NO_IMAGE, DEFAULT_ENTITIES_PER_PAGE } from "../constants";

const ManageRobots = () => {
  const [Model, setModel] = useState("");

  const [filteredRobots, setFilteredRobots] = useState([]);
  const { data = [], isLoading, isError } =
  useGetAllRobotsNewQuery();
  const [robotId, setRobotId] = useState(null);
  const [deleteLink] = useDeleteLinkMutation();
  const { accessToken } = useSelector((state) => state.auth);

  const {
    page,
    setPage,
    paginatedData: paginatedEntities,
    isLast
  } = usePagination(filteredRobots, DEFAULT_ENTITIES_PER_PAGE);

  const deleteLinkHandler = (e) => {
    const id = e.target.value;
    deleteLink({ id, accessToken });
  };

    useEffect(() => {
      if (!isLoading && Array.isArray(data)) {
        setFilteredRobots([...data]);
      }
    }, [data, isLoading]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          maxWidth: "500px",
        }}
      >
        <DeletePopup id={robotId} deleteMutationHook={useDeleteRobotMutation} message={"ARE YOU SURE YOU WANT TO DELETE THIS ROBOT?"} modalId={"DeleteRobotModal"}/>
        <CreateRobot/>
        <UpdateRobot id={robotId} />
        <input
          className="form-control form-control-sm mt-3"
          value={Model}
          onChange={(e) => {
            setModel(e.target.value);
            setPage(0);
          }}
          type="text"
          placeholder="Search by model"
          aria-label=".form-control-sm example"
        ></input>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Model</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEntities &&
                paginatedEntities.map((robot) => (
                  <tr key={robot.id}>
                    <th scope="row">{robot.id}</th>
                    <td>
                      <img
                        style={{ height: "50px" }}
                        src={robot.image || NO_IMAGE}
                        alt="..."
                      ></img>
                      <button
                        className="btn btn-light btn-sm ms-1 mt-1"
                        value={robot.id}
                        onClick={(e) => {
                          setRobotId(e.currentTarget.value);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#uploadImage"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </td>
                    <td>{robot.model}</td>
                    <td>
                      <div
                        className="dropdown"
                        style={{ display: "inline" }}
                      >
                        <button
                          className="btn btn-secondary btn-sm dropdown-toggle mt-1 me-1"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Links
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              value={robot.id}
                              onClick={(e) => {
                                setRobotId(e.target.value);
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#addLinkk"
                            >
                              Add Link
                            </button>
                          </li>
                          {robot.purchaseLinks.length > 0 ? <li><hr className="dropdown-divider"></hr></li> : <></>}
                          {robot.purchaseLinks.map((link) => (
                            <li key={link.id}>
                              <span className="d-flex">
                                <a className="dropdown-item" href={link.link}>
                                  {link.name}
                                </a>
                                <button
                                  className="btn btn-light btn-sm me-1"
                                  value={link.id}
                                  onClick={deleteLinkHandler}
                                >
                                  DELETE
                                </button>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm me-1 mt-1"
                        value={robot.id}
                        onClick={(e) => {
                          setRobotId(e.target.value);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#update"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-1 mt-1"
                        value={robot.id}
                        onClick={(e) => {
                          setRobotId(e.target.value);
                        }}
                        data-bs-toggle="modal" data-bs-target="#DeleteRobotModal"
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
      <Pagination Page={page} setPage={setPage} isLast={isLast} />

      {/*add link modal*/}
      <CreateLink robotId={robotId} />

      {/* upload image modal */}
      <UploadRobotImage RobotId={robotId} />
    </div>
  );
};

export default ManageRobots;
