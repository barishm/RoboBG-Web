import { useDeleteRobotMutation } from '../../../app/services/robotApiSlice';
import { useSelector } from "react-redux";

const DeleteRobot = (props) => {
  const id = props.id;
  const [deleteRobot] = useDeleteRobotMutation();
  const { accessToken } = useSelector((state) => state.auth);

  const deleteRobotHandler = () => {
    deleteRobot({ id, accessToken });
  };



  return (
    <div
      class="modal fade"
      id="DeleteRobotModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            ARE YOU SURE YOU WANT TO DELETE THIS ROBOT?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button data-bs-dismiss="modal" type="button" class="btn btn-danger" onClick={deleteRobotHandler}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRobot;
