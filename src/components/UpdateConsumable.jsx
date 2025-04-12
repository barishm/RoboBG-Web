import { useUpdateConsumableMutation } from "../app/services/consumableApiSlice";
import { useGetAllRobotsNewQuery } from "../app/services/robotApiSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const UpdateConsumables = ({ consumable }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const [updateConsumable] = useUpdateConsumableMutation();
  const { data: robots = [], isLoading, isError } = useGetAllRobotsNewQuery();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [robotIds, setRobotIds] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const json = { id: consumable.id, title, description, price, robotIds };
    await updateConsumable({ json, accessToken }).unwrap();

    setTitle("");
    setDescription("");
    setPrice("");
    setRobotIds([]);
  };

  useEffect(() => {
    if (consumable) {
      setTitle(consumable.title || "");
      setDescription(consumable.description || "");
      setPrice(consumable.price || "");
      const ids = consumable.robots?.map((r) => r.id) || [];
      setRobotIds(ids);
    }
  }, [consumable]);

  if (!consumable) {
    return <></>;
  }

  return (
    <div
      className="modal fade"
      id="update"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Consumable
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-inputs">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>
                {robotIds.length > 0 && (
                  <div className="mb-3">
                    <label className="form-label">Compatible with</label>
                    {robotIds.map((id, index) => (
                      <select
                        key={index}
                        className="form-control form-control-sm mb-2"
                        value={robotIds[index] || ""}
                        onChange={(e) => {
                          const updatedRobotIds = [...robotIds];
                          updatedRobotIds[index] = e.target.value;
                          setRobotIds(updatedRobotIds);
                        }}
                      >
                        <option value="" disabled>
                          Select a Robot
                        </option>
                        {robots.map((robot) => (
                          <option key={robot.id} value={String(robot.id)}>
                            {robot.model}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setRobotIds((prev) =>
                    prev.length > 1 ? prev.slice(0, -1) : prev
                  );
                }}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setRobotIds((prev) => [...prev, ""]);
                }}
              >
                +
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateConsumables;
