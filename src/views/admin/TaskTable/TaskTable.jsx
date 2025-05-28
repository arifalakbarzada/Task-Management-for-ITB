import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewTask, editTask, removeTask, setAllTasks } from "../../../toolkit/taskSlice";
import {
  CButton,
  CCard,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CFormInput,
  CFormTextarea,
  CBadge,
  CPagination,
  CPaginationItem,

} from "@coreui/react";
import {
  BsPencil,
  BsTrash,
  BsEye,
  BsPlus,
  BsFilter,
} from "react-icons/bs";
import Swal from "sweetalert2";
import {
  departmentApiRequests,
  taskApiRequests,
  userApiRequests,
} from "../../../services/base";
import { setAllDepartments } from "../../../toolkit/departmentSlice";
import { setAllUsers } from "../../../toolkit/userSlice";

const statusColors = {
  Pending: "warning",
  "In Progress": "info",
  Completed: "success",
};

const TaskTable = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const users = useSelector((state) => state.users.items);
  const [currentPage, setCurrentPage] = useState(0)
  const paginateNumber = 5
  const user = useSelector((state) => state.users.user);
  const departments = useSelector((state) => state.department.items);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    owner: "",
    deadline: "",
    status: "Pending",
    userId: "",
    departmentId: "",
    isDeleted: false,
  });

  useEffect(() => {
    departmentApiRequests.getAllDepartments().then((res) => {
      dispatch(setAllDepartments(res));
    });
    userApiRequests.getAllUsers().then((res) => {
      dispatch(setAllUsers(res));
    });
    taskApiRequests.getAllTasks().then((res) => {
      dispatch(setAllTasks(res));
    });
  }, []);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([...tasks]);
  const [paginatedTasks, setPaginatedTasks] = useState([])

  useEffect(() => {
    if (selectedDepartment) {
      taskApiRequests.getTaskByDepartmentId(selectedDepartment, selectedUser, selectedStatus).then((res) => {
        setFilteredTasks(res.length === 0 ? [] : res);
      }).catch((err) => {
        console.error("Error fetching tasks by department:", err);
        setFilteredTasks([]);
      });
    }
    else if (selectedDepartment === '' && selectedUser === '' && selectedStatus === '') {
      taskApiRequests.getAllTasks().then((res) => {
        setFilteredTasks(res);
      });
    }
    else if (!selectedDepartment && !selectedUser && selectedStatus) {
      taskApiRequests.getTaskByDepartmentId(selectedDepartment, selectedUser, selectedStatus).then((res) => {
        setFilteredTasks(res.length === 0 ? [] : res);
      }).catch((err) => {
        console.error("Error fetching tasks by department:", err);
        setFilteredTasks([]);
      }
      );
    }
  }, [dispatch, selectedDepartment, selectedUser, selectedStatus]);
  useEffect(
    () =>{
      setPaginatedTasks(filteredTasks.slice(currentPage * paginateNumber, (currentPage + 1) * paginateNumber));
    },[currentPage , filteredTasks]
  )

  const availableUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.role === "user" &&
        (user.departmentId === selectedDepartment)
    );
  }, [users, selectedDepartment]);

  const openModal = (type, task = null) => {
    setModalType(type);
    setCurrentTask(
      task && (type === "edit" || type === "view")
        ? { ...task }
        : {
          title: "",
          description: "",
          owner: "",
          deadline: "",
          status: "Pending",
          userId: "",
          departmentId: "",
          isDeleted: false,
        }
    );
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!currentTask.title || !currentTask.owner) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields",
        icon: "warning",
      });
      return;
    }
    if (modalType === "edit") {
      dispatch(editTask(currentTask));
    } else {
      const newTask = {
        ...currentTask,
        creationDay: new Date().toISOString(),
        userId: currentTask.userId,
        departmentId: currentTask.departmentId,
        isDeleted: false,
        status: "Pending",
      }
      console.log(newTask)
      dispatch(addNewTask(newTask));

    }
    setShowModal(false);
    Swal.fire({
      title: "Success",
      text: `Task ${modalType === "edit" ? "updated" : "added"} successfully`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleRemoveTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeTask(id));
        Swal.fire({
          title: "Deleted!",
          text: "The task has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const resetFilters = () => {
    setSelectedDepartment("");
    setSelectedUser("");
    setSelectedStatus("");
  };
  const getPageNumbers = () => {
  const totalPages = Math.ceil(filteredTasks.length / paginateNumber);
  const maxVisible = 3;
  
  let start = Math.max(0, (currentPage + 1) - Math.floor(maxVisible / 2));
  let end = start + maxVisible;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(0, end - maxVisible);
  }

  return Array.from({ length: end - start }, (_, i) => start + i);
};


  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col  xs:flex-row justify-between gap-4 items-center">
        <h2 className="text-xl font-semibold whitespace-nowrap">Task Management</h2>
        <CButton color="primary" onClick={() => openModal("add")}> <span className="whitespace-nowrap"><BsPlus className="inline" /> Add Task</span></CButton>
      </div>

      <div className="text-left">
        <CButton
          color="light"
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <BsFilter className="inline" /> {showFilters ? "Hide Filters" : "Show Filters"}
        </CButton>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg">
          <div>
            <label className="block mb-1">Department</label>
            <CFormSelect
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedUser("");
              }}
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </CFormSelect>
          </div>

          <div>
            <label className="block mb-1">Assigned To</label>
            <CFormSelect
              value={selectedUser}
              disabled={!selectedDepartment}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">All Users</option>
              {availableUsers.map((u) => (
                <option key={u.id} value={u._id}>{u.name} {u.surName}</option>
              ))}
            </CFormSelect>
          </div>

          <div>
            <label className="block mb-1">Status</label>
            <CFormSelect
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </CFormSelect>
          </div>

          <div className="md:col-span-3">
            <CButton color="secondary" size="sm" onClick={resetFilters}>
              Clear Filters
            </CButton>
          </div>
        </div>
      )}

      <CCard className="shadow">
        {filteredTasks.length === 0 ? (
          <div className="text-center p-5">
            <p className="text-muted">No tasks found matching your filters</p>
          </div>
        ) : (
          <CTable hover responsive className="align-middle">
            <CTableHead className="bg-light">
              <CTableRow>
                <CTableHeaderCell className="max-w-[80px] whitespace-nowrap text-ellipsis">Title</CTableHeaderCell>
                <CTableHeaderCell className="hidden md:table-cell">Assigned To</CTableHeaderCell>
                <CTableHeaderCell className="hidden md:table-cell">Deadline</CTableHeaderCell>
                <CTableHeaderCell className="hidden sm:table-cell">Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedTasks.map((task) => (
                <CTableRow key={task._id}>
                  <CTableDataCell className="max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis "><span className="w-full">{task.title}</span></CTableDataCell>
                  <CTableDataCell className="hidden md:table-cell"><span className="w-full">{task.owner}</span></CTableDataCell>
                  <CTableDataCell className="hidden md:table-cell">
                    <span className="w-full">{new Date(task.deadline).toLocaleDateString()}</span>
                  </CTableDataCell>
                  <CTableDataCell className="hidden sm:table-cell">
                    <CBadge color={statusColors[task.status] || "secondary"}>
                      {task.status}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell className="space-x-1 whitespace-nowrap">
                    <CButton size="sm" color="info" variant="ghost" onClick={() => openModal("view", task)}><BsEye /></CButton>
                    <CButton size="sm" color="primary" variant="ghost" onClick={() => openModal("edit", task)}><BsPencil /></CButton>
                    <CButton size="sm" color="danger" variant="ghost" onClick={() => handleRemoveTask(task._id)}><BsTrash /></CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
        <CPagination className="flex justify-center" aria-label="Page navigation example">
          <CPaginationItem className="cursor-pointer" onClick={
            () => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
              }
            }
          } aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
  {filteredTasks.length > 0 &&
    getPageNumbers().map((page) => (
      <CPaginationItem
        key={page}
        className="cursor-pointer"
        active={page === currentPage}
        onClick={() => setCurrentPage(page)}
      >
        {page + 1}
      </CPaginationItem>
    ))}
          <CPaginationItem className="cursor-pointer" onClick={
            () => {
              if (currentPage < Math.ceil(filteredTasks.length / paginateNumber) - 1) {
                setCurrentPage(currentPage + 1);
              }
            }
          } aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
      </CCard>

      <CModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>
            {modalType === 'add' ? 'Add New Task' :
              modalType === 'edit' ? 'Edit Task' : 'Task Details'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {modalType === 'view' ? (
            <div className="task-details">
              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <h6>Title</h6>
                  <p>{currentTask.title}</p>
                </div>
                <div className="col-12 col-md-6">
                  <h6>Status</h6>
                  <CBadge color={statusColors[currentTask.status] || 'secondary'}>
                    {currentTask.status}
                  </CBadge>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <h6>Assigned To</h6>
                  <p>{currentTask.owner}</p>
                </div>
                <div className="col-12 col-md-6">
                  <h6>Deadline</h6>
                  <p>{currentTask.deadline}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <h6>Description</h6>
                  <p>{currentTask.description || 'No description provided'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="task-form">
              <div className="mb-3">
                <label className="form-label">Title *</label>
                <CFormInput
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <CFormTextarea
                  value={currentTask.description}
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                  placeholder="Enter task description"
                  rows={4}
                />
              </div>

              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Assigned To *</label>
                  <CFormSelect
                    value={currentTask.owner}
                    onChange={(e) => {
                      const selectedUser = users.find(user => `${user.name} ${user.surName}` === e.target.value);
                      setCurrentTask({
                        ...currentTask,
                        owner: e.target.value,
                        userId: selectedUser._id || "",
                        departmentId: selectedUser.departmentId || ""
                      });
                    }}
                    required
                  >
                    <option value="">Select User</option>
                    {users
                      .filter(user => user.role === 'user')
                      .map(user => (
                        <option key={user.id} value={`${user.name} ${user.surName}`}>
                          {user.name} {user.surName}
                        </option>
                      ))
                    }
                  </CFormSelect>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Deadline</label>
                  <CFormInput
                    type="date"
                    value={currentTask.deadline}
                    onChange={(e) => setCurrentTask({ ...currentTask, deadline: e.target.value })}
                  />
                </div>
              </div>

              {modalType === 'edit' && (
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <CFormSelect
                    value={currentTask.status}
                    onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </CFormSelect>
                </div>
              )}
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setShowModal(false)}
          >
            {modalType === 'view' ? 'Close' : 'Cancel'}
          </CButton>

          {modalType !== 'view' && (
            <CButton
              color="primary"
              onClick={handleSubmit}
            >
              {modalType === 'edit' ? 'Save Changes' : 'Add Task'}
            </CButton>
          )}

          {modalType === 'view' && (
            <CButton
              color="primary"
              onClick={() => {
                setModalType('edit');
              }}
            >
              Edit
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default TaskTable;
