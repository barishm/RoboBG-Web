import {
  useGetAllRobotsQuery
} from "../../../app/services/robotApiSlice";
import {
  useDeleteLinkMutation,
} from "../../../app/services/linkApiSlice";
import Loading from "../../../components/Loading";
import CreateRobot from "./CreateRobot";
import { useSelector } from "react-redux";
import UpdateRobot from "./UpdateRobot";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../components/Pagination";
import UploadRobotImage from "./UploadRobotImage";
import CreateLink from "./CreateLink";
import DeleteRobot from "./DeleteRobot";

const ManageRobots = () => {
  const [Page, setPage] = useState(0);
  const [Model, setModel] = useState("");
  const queryParams = {
    fields: "model,image,links",
    page: Page,
    model: Model,
  };
  const { data: allRobots, isLoading: allRobotsLoading } =
    useGetAllRobotsQuery(queryParams);
  const [robotId, setRobotId] = useState(null);
  const [deleteLink] = useDeleteLinkMutation();
  const noImage = "images/no-image.jpg";
  const { accessToken } = useSelector((state) => state.auth);
  const isLast = allRobots?.last;

  const deleteLinkHandler = (e) => {
    const id = e.target.value;
    deleteLink({ id, accessToken });
  };

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
        <DeleteRobot id={robotId} />
        <CreateRobot />
        <UpdateRobot id={robotId} />
        <input
          className="form-control form-control-sm"
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

      {allRobotsLoading ? (
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
              {allRobots &&
                allRobots.content.map((robot) => (
                  <tr key={robot.id}>
                    <th scope="row">{robot.id}</th>
                    <td>
                      <img
                        style={{ height: "50px" }}
                        src={robot.image || noImage}
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
                        Update
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
      <Pagination Page={Page} setPage={setPage} isLast={isLast} />

      {/*add link modal*/}
      <CreateLink robotId={robotId} />

      {/* upload image modal */}
      <UploadRobotImage RobotId={robotId} />
    </div>
  );
};

export default ManageRobots;
