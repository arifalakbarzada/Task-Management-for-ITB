import React, { useState } from 'react';
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
import { Eye, Pencil, Trash, Plus, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
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
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});
Input.displayName = "Input";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "IT Departamenti",
      positions: [
        {
          id: 11,
          name: "Software Developer"
        },
        {
          id: 12,
          name: "IT Support"
        },
        {
          id: 13,
          name: "Network Administrator"
        }
      ]
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [newPosition, setNewPosition] = useState('');
  const [newDepartment, setNewDepartment] = useState({ name: '', position: '' });
  const [errors, setErrors] = useState({});

  const handleAddPosition = (departmentId) => {
    if (!newPosition.trim()) {
      toast.error('Position name cannot be empty');
      return;
    }

    const department = departments.find(dept => dept.id === departmentId);
    if (department.positions.some(pos => pos.name.toLowerCase() === newPosition.trim().toLowerCase())) {
      toast.error('This position already exists');
      return;
    }

    const updatedDepartments = departments.map(dept => {
      if (dept.id === departmentId) {
        const newId = dept.positions.length > 0
          ? Math.max(...dept.positions.map(p => p.id)) + 1
          : 1;
        return {
          ...dept,
          positions: [...dept.positions, {
            id: newId,
            name: newPosition.trim()
          }]
        };
      }
      return dept;
    });

    setDepartments(updatedDepartments);
    setNewPosition('');
    toast.success('Position added successfully');
  };

  const handleAddDepartment = () => {
    const newErrors = {};
    if (!newDepartment.name.trim()) {
      newErrors.name = 'Department name cannot be empty';
    }
    if (!newDepartment.position.trim()) {
      newErrors.position = 'Initial position cannot be empty';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (departments.some(dept => dept.name.toLowerCase() === newDepartment.name.trim().toLowerCase())) {
      setErrors({ name: 'Department already exists' });
      return;
    }

    const newId = departments.length > 0
      ? Math.max(...departments.map(d => d.id)) + 1
      : 1;

    const newDept = {
      id: newId,
      name: newDepartment.name.trim(),
      positions: [{
        id: 1,
        name: newDepartment.position.trim()
      }]
    };

    setDepartments([...departments, newDept]);
    setNewDepartment({ name: '', position: '' });
    setIsAddDepartmentOpen(false);
    setErrors({});
    toast.success('Department added successfully');
  };

  const handleDeletePosition = async (departmentId, positionId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      setDepartments(prevDepartments =>
        prevDepartments.map(dept => {
          if (dept.id === departmentId) {
            return {
              ...dept,
              positions: dept.positions.filter(pos => pos.id !== positionId)
            };
          }
          return dept;
        })
      );
      toast.success('Position deleted successfully');
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    const result = await Swal.fire({
      title: 'Delete Department?',
      text: "This will delete all positions in this department!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      setDepartments(prevDepartments =>
        prevDepartments.filter(dept => dept.id !== departmentId)
      );
      toast.success('Department deleted successfully');
    }
  };

  const AddDepartmentModal = () => (
    <CModal
      visible={isAddDepartmentOpen}
      onClose={() => {
        setIsAddDepartmentOpen(false);
        setNewDepartment({ name: '', position: '' });
        setErrors({});
      }}
    >
      <CModalHeader>
        <CModalTitle>Add New Department</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="space-y-4">
          <Input
            label="Department Name"
            value={newDepartment.name}
            onChange={(e) => {
              setNewDepartment((prev) => ({ ...prev, name: e.target.value }));
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
            placeholder="Enter department name"
            error={errors.name}
          />

          <Input
            label="Initial Position"
            value={newDepartment.position}
            onChange={(e) => {
              setNewDepartment({ ...newDepartment, position: e.target.value });
              setErrors({ ...errors, position: '' });
            }}
            placeholder="Enter initial position"
            error={errors.position}
          />
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
  );

  const EditModal = ({ department }) => (
    <CModal
      visible={isEditOpen}
      onClose={() => {
        setIsEditOpen(false);
        setNewPosition('');
      }}
    >
      <CModalHeader>
        <CModalTitle>Edit Department: {department.name}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="flex gap-2 mb-4">
          <Input
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
            placeholder="New Position Name"
            className="flex-1"
          />
          <CButton
            color="primary"
            onClick={() => handleAddPosition(department.id)}
          >
            <Plus size={16} />
          </CButton>
        </div>
        <div className="space-y-2">
          {department.positions.map(position => (
            <div
              key={position.id}
              className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
            >
              <span>{position.name}</span>
              <CButton
                color="danger"
                variant="ghost"
                className="opacity-50 hover:opacity-100 transition-opacity"
                onClick={() => handleDeletePosition(department.id, position.id)}
              >
                <X size={16} />
              </CButton>
            </div>
          ))}
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setIsEditOpen(false)}>
          Done
        </CButton>
      </CModalFooter>
    </CModal>
  );

  const ViewModal = ({ department }) => (
    <CModal visible={isViewOpen} onClose={() => setIsViewOpen(false)}>
      <CModalHeader>
        <CModalTitle>View Positions: {department.name}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {department.positions.length === 0 ? (
          <div className="text-center text-gray-500">
            No positions found
          </div>
        ) : (
          <div className="space-y-2">
            {department.positions.map(position => (
              <div key={position.id} className="p-2 bg-gray-50 rounded">
                {position.name}
              </div>
            ))}
          </div>
        )}
      </CModalBody>
    </CModal>
  );

  return (
    <div className="m-4">
      <ToastContainer position="top-right" />
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Departments</h5>
          <CButton
            color="primary"
            onClick={() => setIsAddDepartmentOpen(true)}
          >
            <Plus size={16} className="me-2" />
            Add Department
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Department Name</CTableHeaderCell>
                <CTableHeaderCell>Position Count</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {departments.map(department => (
                <CTableRow key={department.id}>
                  <CTableDataCell>{department.name}</CTableDataCell>
                  <CTableDataCell>{department.positions.length}</CTableDataCell>
                  <CTableDataCell>
                    <div className="flex gap-2">
                      <CButton
                        color="info"
                        variant="outline"
                        onClick={() => {
                          setSelectedDepartment(department);
                          setIsViewOpen(true);
                        }}
                      >
                        <Eye size={16} />
                      </CButton>
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
          <EditModal department={selectedDepartment} />
          <ViewModal department={selectedDepartment} />
        </>
      )}
      <AddDepartmentModal />
    </div>
  );
};

export default DepartmentManagement;