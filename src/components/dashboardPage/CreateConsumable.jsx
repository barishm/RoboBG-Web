import { useCreateConsumableMutation } from '../../app/services/consumableApiSlice';
import { useGetAllRobotsNewQuery } from '../../app/services/robotApiSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CreateConsumables = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [createConsumable] = useCreateConsumableMutation();
  const [robotsCount, setRobotsCount] = useState(1);
  const { data: robots = [], isLoading, isError } = useGetAllRobotsNewQuery();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [robotIds, setRobotIds] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const json = { title, description, price, robotIds };
    await createConsumable({ json, accessToken }).unwrap();

    setTitle('');
    setDescription('');
    setPrice('');
    setRobotIds([]);
    setRobotsCount(1);
  };

  return (
    <div
      className="modal fade"
      id="create"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Consumable
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
                <div className="mb-3">
                  <label className="form-label">Compatible with</label>
                  {Array.from({ length: robotsCount }).map((_, index) => (
                    <select
                      key={index}
                      className="form-control form-control-sm mb-2"
                      value={robotIds[index] || ''}
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
                        <option key={robot.id} value={robot.id}>
                          {robot.model}
                        </option>
                      ))}
                    </select>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  if (robotsCount > 1) {
                    setRobotsCount(robotsCount - 1);
                    setRobotIds((prev) => prev.slice(0, -1));
                  }
                }}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setRobotsCount(robotsCount + 1);
                  setRobotIds((prev) => [...prev, '']);
                }}
              >
                +
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setTitle('');
                  setDescription('');
                  setRobotIds([]);
                  setRobotsCount(1);
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateConsumables;
