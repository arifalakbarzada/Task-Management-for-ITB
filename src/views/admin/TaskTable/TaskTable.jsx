import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewTask, editTask, removeTask } from "../../../toolkit/taskSlice";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";


const SprintTaskManagement = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const users = useSelector((state) => state.users.items);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", owner: "", deadline: "", status: "Pending", userId: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  const handleAddTask = () => {
    if (newTask.title && newTask.owner) {
      dispatch(addNewTask(newTask));
      setShowModal(false);
      setNewTask({ title: "", description: "", owner: "", deadline: "", status: "Pending", userId: "" });
    }
  };

  const handleEditTask = () => {
    if (editingTask) {
      dispatch(editTask(editingTask));
      setEditingTask(null);
      setShowModal(false);
    }
  };

  const handleRemoveTask = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This task will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeTask(id));
        Swal.fire('Deleted!', 'The task has been deleted.', 'success');
      }
    });
  };

  const handleStatusChange = (status, task) => {
    dispatch(editTask({ ...task, status: status }));
  };

  const threeDotButtonStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="container">
      <h2 className="my-4">Sprint Task Management</h2>
      <CButton color="primary" onClick={() => setShowModal(true)}>Add Task</CButton>
      <table className="table mt-3 text-center">
        <thead>
          <tr>
            <th><p className="p-2">Title</p></th>
            <th><p className="p-2">Assigned To</p></th>
            <th><p className="p-2">Deadline</p></th>
            <th><p className="p-2">Status</p></th>
            <th><p className="p-2">Actions</p></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td> <p className="p-2">{task.title}</p></td>
              <td> <p className="p-2">{task.owner}</p></td>
              <td> <p className="p-2">{task.deadline}</p></td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(e.target.value, task)}
                  className="border rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>
                <CDropdown>
                  <CDropdownToggle
                    className="p-0 border-0 bg-transparent"
                    style={{
                      position: "relative",
                    }}
                  >
                    <BsThreeDotsVertical style={threeDotButtonStyle} />
                    <style>
                      {`
      .dropdown-toggle::after {
        display: none !important;
      }
    `}
                    </style>
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => { setEditingTask(task); setShowModal(true); }}>Edit</CDropdownItem>
                    <CDropdownItem onClick={() => handleRemoveTask(task.id)}>Delete</CDropdownItem>
                    <CDropdownItem onClick={() => setViewingTask(task)}>View</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>{editingTask ? "Edit Task" : "Add Task"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <input type="text" placeholder="Title" className="form-control" value={editingTask ? editingTask.title : newTask.title} onChange={(e) => editingTask ? setEditingTask({ ...editingTask, title: e.target.value }) : setNewTask({ ...newTask, title: e.target.value })} />
          <textarea placeholder="Description" className="form-control mt-2" value={editingTask ? editingTask.description : newTask.description} onChange={(e) => editingTask ? setEditingTask({ ...editingTask, description: e.target.value }) : setNewTask({ ...newTask, description: e.target.value })}></textarea>
          <select className="form-control mt-2" value={editingTask ? editingTask.owner : newTask.owner} onChange=
            {
              (e) => {
                const selectedUser = users.find(user => `${user.name} ${user.surName}` === e.target.value);
                if (editingTask) {
                  setEditingTask({ ...editingTask, owner: e.target.value, userId: selectedUser?.id || "" });
                } else {
                  setNewTask({ ...newTask, owner: e.target.value, userId: selectedUser?.id || "" });
                }
              }
            }>
            <option value="">Select User</option>
            {users.map((user) =>
              user.role === 'user' && (
                <option key={user.id} value={`${user.name} ${user.surName}`}>{user.name} {user.surName}</option>
              )
            )}
          </select>
          <input type="date" className="form-control mt-2" value={editingTask ? editingTask.deadline : newTask.deadline} onChange={(e) => editingTask ? setEditingTask({ ...editingTask, deadline: e.target.value }) : setNewTask({ ...newTask, deadline: e.target.value })} />
        </CModalBody>
        <CModalFooter></CModalFooter>
        <CButton color="primary" onClick={editingTask ? handleEditTask : handleAddTask}>{editingTask ? "Save Changes" : "Add Task"}</CButton>
      </CModal>

      <CModal visible={!!viewingTask} onClose={() => setViewingTask(null)}>
        <CModalHeader>
          <CModalTitle>Task Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p><strong>Title:</strong> {viewingTask?.title}</p>
          <p><strong>Description:</strong> {viewingTask?.description}</p>
          <p><strong>Assigned To:</strong> {viewingTask?.owner}</p>
          <p><strong>Deadline:</strong> {viewingTask?.deadline}</p>
          <p><strong>Status:</strong> {viewingTask?.status}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setViewingTask(null)}>Close</CButton>
        </CModalFooter>
      </CModal>

    </div>

  );
}

export default SprintTaskManagement;