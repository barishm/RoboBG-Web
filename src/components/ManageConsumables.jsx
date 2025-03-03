import {
  useGetAllConsumablesQuery,
  useCreateConsumableMutation,
  useDeleteConsumableMutation,
  useUpdateConsumableMutation,
} from '../app/services/consumableApiSlice';
import CreateConsumables from './CreateConsumable';
import UpdateConsumables from './UpdateConsumable';
import Loading from './Loading';
import { useState, useEffect } from 'react';

const ManageConsumables = () => {
  const { data, isLoading } = useGetAllConsumablesQuery();

  const [filteredConsumables, setFilteredConsumables] = useState([]);
  const noImage = 'images/no-image.jpg';
  const [consumable, setConsumable] = useState('');
  const [selectedConsumableToUpdate, setSelectedConsumableToUpdate] = useState(null);

  function filterConsumables(searchText) {
    setConsumable(searchText);
    if (!searchText) {
      setFilteredConsumables(data);
    } else {
      setFilteredConsumables(
        data.filter((item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }

  useEffect(() => {
    if (!isLoading && Array.isArray(data)) {
      setFilteredConsumables([...data]);
      setSelectedConsumableToUpdate(data[0])
    }
  }, [data, isLoading]);


  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
          maxWidth: '500px',
        }}
      >
        <button
          type="button"
          className="btn btn-success btn-sm ml-2 me-1"
          data-bs-toggle="modal"
          data-bs-target="#create"
        >
          Create
        </button>
        <UpdateConsumables consumable={selectedConsumableToUpdate} />
        <CreateConsumables />
        <input
          className="form-control form-control-sm"
          value={consumable}
          onChange={(e) => filterConsumables(e.target.value)}
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
                <th scope="col">Consumable</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredConsumables &&
                filteredConsumables.map((consumable) => (
                  <tr key={consumable.id}>
                    <th scope="row">{consumable.id}</th>
                    <td>
                      <img
                        style={{ height: '50px' }}
                        src={consumable.image || noImage}
                        alt="..."
                      ></img>
                      <button
                        className="btn btn-light btn-sm ms-1 mt-1"
                        value={consumable.id}
                        onClick={(e) => {
                          setRobotId(e.currentTarget.value);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#uploadImage"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </td>
                    <td>{consumable.title}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm me-1 mt-1"
                        value={consumable.id}
                        onClick={() => setSelectedConsumableToUpdate(consumable)}
                        data-bs-toggle="modal"
                        data-bs-target="#update"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-1 mt-1"
                        value={consumable.id}
                        onClick={(e) => {
                          setRobotId(e.target.value);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#DeleteRobotModal"
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
export default ManageConsumables;
