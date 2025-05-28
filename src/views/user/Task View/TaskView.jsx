import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTask } from "../../../toolkit/taskSlice";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,

} from "@coreui/react";
import { Eye } from "lucide-react";
import { taskApiRequests } from "../../../services/base";

const TaskView = () => {
  const [tasks, setTasks] = useState([]);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [viewingTask, setViewingTask] = useState(null);

  const [taskStatus, setTaskStatus] = useState({});

  useEffect(() => {
    taskApiRequests.getTaskByUserId(user._id)
      .then((response) => {
        setTasks(response);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [dispatch, user._id]);

  const handleStatusChange = (status, id) => {
    setTaskStatus(prev => ({
      ...prev,
      [id]: status
    }));
    dispatch(editTask({ status, _id: id }));
  };

  const getDeadlineColor = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "text-red-600";
    if (diffDays <= 7) return "text-yellow-600";
    return "text-gray-800";
  };

  const isDeadlinePassed = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < today;
  };

  return (
     <div className="container mx-auto px-4 py-6">
      <div className="overflow-x-auto">
        <CTable responsive hover className="align-middle text-sm">
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell scope="col">Title</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="hidden lg:table-cell">Deadline</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Details</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {tasks?.map((task) => {
              const deadlinePassed = isDeadlinePassed(task.deadline);
              return (
                <CTableRow key={task._id}>
                  <CTableDataCell className="whitespace-nowrap max-w-[50px] truncate">
                    {task.title}
                  </CTableDataCell>

                  <CTableDataCell className="hidden lg:table-cell">
                    <span className={`${getDeadlineColor(task.deadline)} p-1 rounded`}>
                      {task.deadline}
                    </span>
                  </CTableDataCell>

                  <CTableDataCell>
                    <select
                      value={taskStatus[task._id] || task.status}
                      onChange={(e) => {
                        if (!deadlinePassed) {
                          handleStatusChange(e.target.value, task._id);
                        }
                      }}
                      disabled={deadlinePassed}
                      className={`border rounded-md p-1 bg-white text-gray-700 focus:outline-none focus:ring-2 min-w-[90px] max-w-[100px] focus:ring-blue-500 w-full ${deadlinePassed ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </CTableDataCell>

                  <CTableDataCell>
                    <CButton
                      color="dark"
                      variant="ghost"
                      className="p-1 border-0 outline-0 hover:bg-white"
                      size="sm"
                      onClick={() => setViewingTask(task)}
                    >
                      <Eye size={18} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              );
            })}
          </CTableBody>
        </CTable>
      </div>

      <CModal visible={!!viewingTask} onClose={() => setViewingTask(null)}>
        <CModalHeader>
          <CModalTitle>Task Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p><strong>Title:</strong> {viewingTask?.title}</p>
          <p><strong>Description:</strong> {viewingTask?.description}</p>
          <p className={`${getDeadlineColor(viewingTask?.deadline)}`}><strong>Deadline:</strong> {viewingTask?.deadline}</p>
          <p><strong>Status:</strong> {viewingTask?.status}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setViewingTask(null)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default TaskView;
