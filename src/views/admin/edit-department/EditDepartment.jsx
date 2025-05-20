import React, { useEffect, useState } from 'react';
import {
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
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';
import { Pencil, Plus, Trash } from 'lucide-react';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { departmentApiRequests } from '../../../services/base';
import { setAllDepartments, addNewDepartment, deleteDepartment, changeDepartment } from '../../../toolkit/departmentSlice';


const DepartmentManagement = () => {
  const departments = useSelector((state) => state.department.items)
  const dispatch = useDispatch()
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState('');
  const [departmentNewName, setDepartmentNewName] = useState('')

  useEffect(() => {
    departmentApiRequests.getAllDepartments().then(res => dispatch(setAllDepartments(res)))
  }, [dispatch])
  const handleAddDepartment = () => {
    if (!newDepartment.trim()) {
      toast.error('Department name can not be empty')
    }


    else if (departments.some(dept => dept.name.toLowerCase() === newDepartment.trim().toLowerCase())) {
      toast.error('Department already exists')
      return;
    }
    else {
      const newId = departments.length > 0
        ? Math.max(...departments.map(d => d.id)) + 1
        : 1;

      const newDept = {
        id: newId.toString(),
        name: newDepartment.trim(),
      };

      dispatch(addNewDepartment(newDept));
      setNewDepartment('');
      setIsAddDepartmentOpen(false);
      toast.success('Department added successfully');
    }

  };



  const handleDeleteDepartment = async (departmentId) => {
    const result = await Swal.fire({
      title: 'Delete Department?',
      text: "This will delete this department!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      dispatch(deleteDepartment(departmentId))
      Swal.fire({
        title: 'Department deleted successfully',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonColor: '#aaaaaa',
        cancelButtonText: 'OK',
        icon: 'success'
      })
    }
  };

  const handleEditDepartment = () => {
    if (departmentNewName === selectedDepartment.name) {
      toast.error("This name is current name for this department")

    }
    else if (departments.some(dept => dept.name.toLowerCase() === departmentNewName.trim().toLowerCase())) {
      toast.error('Department already exists')
      return;
    }
    else {
      dispatch(changeDepartment({ id: selectedDepartment.id, name: departmentNewName }))
      toast.success('Department name has changed successfully')
      setIsEditOpen(false)
    }
  }

  return (
    <div className="m-4">
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0 whitespace-nowrap">Departments</h5>
          <CButton
            color="primary"
            className="whitespace-nowrap max-w-[150px] overflow-hidden text-ellipsis px-2 py-1 text-sm sm:text-base"
            onClick={() => setIsAddDepartmentOpen(true)}
          >
            <span className=" hidden xs:inline">Add Department</span>
            <span className="inline xs:hidden">
              <Plus size={16} />
            </span>
          </CButton>

        </CCardHeader>
        <CCardBody className='py-0 px-1'>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className='whitespace-nowrap max-w-[150px]  overflow-hidden text-ellipsis'>Name</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {departments.map(department => (
                <CTableRow key={department.id}>
                  <CTableDataCell className="whitespace-nowrap max-w-[100px] overflow-hidden text-ellipsis">
                    <span className="">{department.name}</span>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="flex gap-1">
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={() => {
                          setSelectedDepartment(department);
                          setIsEditOpen(true);
                        }}
                      >
                        <Pencil size={16} />
                      </CButton>
                      <CButton
                        color="danger"
                        variant="outline"
                        onClick={() => handleDeleteDepartment(department.id)}
                      >
                        <Trash size={16} />
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {selectedDepartment && (
        <>
          <CModal visible={isEditOpen} onClose={() => setIsEditOpen(false)}>
            <CModalHeader>
              <CModalTitle>Current Name : {selectedDepartment.name}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <input
                className={`
          w-full px-3 py-2 
          border border-gray-300 
          rounded-md 
          shadow-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-blue-500 
        `}
                value={departmentNewName}
                onChange={(e) => {
                  setDepartmentNewName(e.target.value)
                }}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setIsEditOpen(false)}>
                Cancel
              </CButton>
              <CButton color="primary" onClick={() => {
                handleEditDepartment()
              }}>
                Save Changes
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      )}
      <CModal
        visible={isAddDepartmentOpen}
        onClose={() => {
          setIsAddDepartmentOpen(false);
          setNewDepartment('');
        }}
      >
        <CModalHeader>
          <CModalTitle>Add New Department</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                className={`
          w-full px-3 py-2 
          border border-gray-300 
          rounded-md 
          shadow-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-blue-500 
        `}
                value={newDepartment}
                onChange={(e) => {
                  setNewDepartment(e.target.value)
                }}

              />
            </div>

          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsAddDepartmentOpen(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleAddDepartment}>
            Add Department
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default DepartmentManagement;