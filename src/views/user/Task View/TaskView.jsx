// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { editTask } from "../../../toolkit/taskSlice";
// import {
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
//   CButton,
// } from "@coreui/react";
// import { Eye } from "lucide-react";
// import { taskApiRequests } from "../../../services/base";

// const TaskView = () => {
//   const [tasks, setTasks] = useState([])
//   const user = useSelector((state) => state.users.user);
//   const dispatch = useDispatch();
//   const [viewingTask, setViewingTask] = useState(null);
//   useEffect(() => {
//    taskApiRequests.getTaskByUserId(user._id)
//       .then((response) => {
//         setTasks(response);
//       })
//       .catch((error) => {
//         console.error("Error fetching tasks:", error);
//       });
//   }, [dispatch])

//   const handleStatusChange = (status, id) => {
//     dispatch(editTask({ status :status , _id: id }));
//   };

//   const getDeadlineColor = (deadline) => {
//     const today = new Date();
//     const deadlineDate = new Date(deadline);
//     const diffTime = deadlineDate - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays < 0) return "text-red-600"; // Geçmiş
//     if (diffDays <= 7) return "text-yellow-600"; // 7 gün veya daha az
//     return "text-gray-800"; // Normal
//   };

//   const isDeadlinePassed = (deadline) => {
//     const today = new Date();
//     const deadlineDate = new Date(deadline);
//     return deadlineDate < today;
//   };

//   return (
//     <div className="container">
//       <table className="table mt-3 w-full border-collapse">
//         <thead>
//           <tr>
//             <th><p className="p-2">Title</p></th>
//             <th className="hidden [@media(min-width:481px)]:table-cell">
//               <p className="p-2">Deadline</p>
//             </th>
//             <th><p className="p-2">Status</p></th>
//             <th><p className="p-2">Details</p></th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks?.map((task) => {
//             const deadlinePassed = isDeadlinePassed(task.deadline);
//             return (
//               <tr key={task._id} className="border-t">
//                 <td>
//                   <p className="p-2">{task.title}</p>
//                 </td>
//                 <td className="hidden [@media(min-width:481px)]:table-cell">
//                   <p className={`p-2 ${getDeadlineColor(task.deadline)}`}>
//                     {task.deadline}
//                   </p>
//                 </td>
//                 <td>
//                   <select
//                     value={task.status}
//                     defaultValue={task.status}
//                     onChange={(e) =>
//                       !deadlinePassed && handleStatusChange(e.target.value, task._id)
//                     }
//                     disabled={deadlinePassed}
//                     className={`border rounded-md p-2 bg-white text-gray-700 focus:outline-none outline-none focus:border-none focus:ring-2 focus:ring-blue-500 ${deadlinePassed ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                 </td>
//                 <td>
//                   <button className="p-2 border-0 outline-0" onClick={() => setViewingTask(task)}>
//                     <Eye />
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <CModal visible={!!viewingTask} onClose={() => setViewingTask(null)}>
//         <CModalHeader>
//           <CModalTitle>Task Details</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <p>
//             <strong>Title:</strong> {viewingTask?.title}
//           </p>
//           <p>
//             <strong>Description:</strong> {viewingTask?.description}
//           </p>
//           <p>
//             <strong>Deadline:</strong> {viewingTask?.deadline}
//           </p>
//           <p>
//             <strong>Status:</strong> {viewingTask?.status}
//           </p>
//         </CModalBody>
//         <CModalFooter>
//           <CButton color="secondary" onClick={() => setViewingTask(null)}>
//             Close
//           </CButton>
//         </CModalFooter>
//       </CModal>
//     </div>
//   );
// };

// export default TaskView;
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
} from "@coreui/react";
import { Eye } from "lucide-react";
import { taskApiRequests } from "../../../services/base";

const TaskView = () => {
  const [tasks, setTasks] = useState([]);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [viewingTask, setViewingTask] = useState(null);

  // Handle status change locally within state
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

    if (diffDays < 0) return "text-red-600"; // Geçmiş
    if (diffDays <= 7) return "text-yellow-600"; // 7 gün veya daha az
    return "text-gray-800"; // Normal
  };

  const isDeadlinePassed = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < today;
  };

  return (
    <div className="container">
      <table className="table mt-3 w-full border-collapse">
        <thead>
          <tr>
            <th><p className="p-2">Title</p></th>
            <th className="hidden [@media(min-width:481px)]:table-cell">
              <p className="p-2">Deadline</p>
            </th>
            <th><p className="p-2">Status</p></th>
            <th><p className="p-2">Details</p></th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => {
            const deadlinePassed = isDeadlinePassed(task.deadline);
            return (
              <tr key={task._id} className="border-t">
                <td>
                  <p className="p-2">{task.title}</p>
                </td>
                <td className="hidden [@media(min-width:481px)]:table-cell">
                  <p className={`p-2 ${getDeadlineColor(task.deadline)}`}>
                    {task.deadline}
                  </p>
                </td>
                <td>
                  <select
                    value={taskStatus[task._id] || task.status} 
                    onChange={(e) => {
                      if (!isDeadlinePassed(task.deadline)) {
                        handleStatusChange(e.target.value, task._id);
                      }
                    }}
                    disabled={deadlinePassed}
                    className={`border rounded-md p-2 bg-white text-gray-700 focus:outline-none outline-none focus:border-none focus:ring-2 focus:ring-blue-500 ${deadlinePassed ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <button className="p-2 border-0 outline-0" onClick={() => setViewingTask(task)}>
                    <Eye />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <CModal visible={!!viewingTask} onClose={() => setViewingTask(null)}>
        <CModalHeader>
          <CModalTitle>Task Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            <strong>Title:</strong> {viewingTask?.title}
          </p>
          <p>
            <strong>Description:</strong> {viewingTask?.description}
          </p>
          <p>
            <strong>Deadline:</strong> {viewingTask?.deadline}
          </p>
          <p>
            <strong>Status:</strong> {viewingTask?.status}
          </p>
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
