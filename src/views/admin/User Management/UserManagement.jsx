import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCol,
  CRow
} from '@coreui/react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, removeUser, setAllUsers } from '../../../toolkit/userSlice';
import { removeTask } from '../../../toolkit/taskSlice';
import { departmentApiRequests, userApiRequests } from '../../../services/base';
import { setAllDepartments } from '../../../toolkit/departmentSlice';

const UserManagement = () => {
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  const handleViewClick = (user) => {
    setViewUser(user);
    setViewModalVisible(true);
  };
  const users = useSelector((state) => state.users.items)
  const departments = useSelector((state) => state.department.items)
  const tasks = useSelector((state) => state.tasks.items)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    userApiRequests.getAllUsers().then(res => {
      dispatch(setAllUsers(res))
    })
    departmentApiRequests.getAllDepartments().then(res => {
      dispatch(setAllDepartments(res))
    })
  }, [])
  

  const handleEditClick = (user) => {
    setCurrentUser({ ...user });
    setModalVisible(true);
  };

  const handleDeleteClick = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeUser(userId));
        Swal.fire(
          'Deleted!',
          'User has been deleted successfully.',
          'success'
        );
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(currentUser));
    setModalVisible(false);

    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'User information updated',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <CCard>
      <CCardHeader>
        <h4>User Management</h4>
      </CCardHeader>
      <CCardBody>
        <CTable responsive hover bordered>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="table-cell overflow-x-auto">Name</CTableHeaderCell>
              <CTableHeaderCell className="hidden xs1:table-cell overflow-x-auto">Surname</CTableHeaderCell>
              <CTableHeaderCell className="hidden xl:table-cell">Department</CTableHeaderCell>
              <CTableHeaderCell className="hidden md:table-cell">Email</CTableHeaderCell>
              <CTableHeaderCell className="hidden xl:table-cell">Position</CTableHeaderCell>
              <CTableHeaderCell className="table-cell">Actions</CTableHeaderCell>

            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => user.role === 'user' && (
              <CTableRow key={user.id}>
                <CTableDataCell className="table-cell max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap"><span>{user.name}</span></CTableDataCell>
                <CTableDataCell className="hidden xs1:table-cell"><span>{user.surName}</span></CTableDataCell>
                <CTableDataCell className="hidden xl:table-cell whitespace-nowrap"><span className='text-ellipsis'>{user.departmentName}</span></CTableDataCell>
                <CTableDataCell className="hidden md:table-cell whitespace-nowrap">{user.email}</CTableDataCell>
                <CTableDataCell className="hidden xl:table-cell whitespace-nowrap">{user.position}</CTableDataCell>

                <CTableDataCell className="table-cell whitespace-nowrap">
                  <CButton
                    color="info"
                    size="sm"
                    className="text-xs me-1 px-2 py-1"
                    onClick={() => handleEditClick(user)}
                  >
                    <FaEdit className="text-white max-[397px]:inline max-[397px]:me-0 hidden" />
                    <span className="max-[397px]:hidden">Edit</span>
                  </CButton>

                  <CButton
                    color="danger"
                    size="sm"
                    className="text-xs  me-1 px-2 py-1"
                    onClick={() => handleDeleteClick(user._id)}
                  >
                    <FaTrash className="max-[397px]:inline max-[397px]:me-0 text-white hidden" />
                    <span className="max-[397px]:hidden">Delete</span>
                  </CButton>

                  <CButton
                    color="warning"
                    size="sm"
                    className="inline-block xl:hidden text-xs px-2 py-1"
                    onClick={() => handleViewClick(user)}
                  >
                    <FaEye className="text-white max-[397px]:inline max-[397px]:me-0 hidden" />
                    <span className="max-[397px]:hidden">View</span>
                  </CButton>
                </CTableDataCell>


              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          backdrop="static"
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>Edit User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {currentUser && (
              <form onSubmit={handleFormSubmit}>
                <CRow className="mb-3">
                  <CCol md={6}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        value={currentUser.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surName">
                        Surname
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="surName"
                        name="surName"
                        type="text"
                        value={currentUser.surName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md={6}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fatherName">
                        Father's Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fatherName"
                        name="fatherName"
                        type="text"
                        value={currentUser.fatherName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departmentName">
                        Department
                      </label>
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="departmentName"
                        name="departmentName"
                        value={currentUser.departmentName}
                        onChange={handleInputChange}
                      >
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  </CCol>
                </CRow>


                <CRow className="mb-3">
                  <CCol md={6}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                        Position
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="position"
                        name="position"
                        type="position"
                        value={currentUser.position}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        value={currentUser.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md={6}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="text"
                        value={currentUser.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </CCol>
                </CRow>
              </form>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={handleFormSubmit}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={viewModalVisible} onClose={() => setViewModalVisible(false)} backdrop="static" size="lg">
          <CModalHeader closeButton>
            <CModalTitle>User Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {viewUser && (
              <div className="p-2">
                <p className='whitespace-nowrap font-semibold text-[12px]'>Name: {viewUser.name}</p>
                <p className='whitespace-nowrap font-semibold text-[12px]'>Surname: {viewUser.surName}</p>
                <p className='whitespace-nowrap font-semibold text-[12px]'>Father's Name: {viewUser.fatherName}</p>
                <p className='whitespace-nowrap font-semibold text-[12px]'>Department: {viewUser.departmentName}</p>
                <p className='whitespace-nowrap font-semibold text-[12px]'>Email: {viewUser.email}</p>
                <p className='whitespace-nowrap font-semibold text-[12px]'>Position: {viewUser.position}</p>
              </div>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setViewModalVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default UserManagement;