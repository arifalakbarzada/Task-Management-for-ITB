import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaUserTie, FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewUser } from '../../../toolkit/userSlice';
import { departmentApiRequests } from '../../../services/base';
import { setAllDepartments } from '../../../toolkit/departmentSlice';

const Register = () => {
  const departments = useSelector((state) => state.department.items)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    surName: '',
    fatherName: '',
    email: '',
    password: '',
    departmentName: '',
    position: '',
    role: 'user',
    isDeleted: false,
    departmentId: ''
  });
  useEffect(() => {
    departmentApiRequests.getAllDepartments().then(res => {
      dispatch(setAllDepartments(res))
    })
  }, [])

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    const selectedDepartmentObj = departments.find(dept => dept.name === selectedDepartment);
    setFormData({ ...formData, departmentName: selectedDepartment, departmentId: selectedDepartmentObj ? selectedDepartmentObj._id : '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', formData);

    toast.success('Qeydiyyat uğurla başa çatdı!')

    dispatch(addNewUser({...formData, departmentId: formData.departmentId}))
    setFormData({
      name: '',
      surName: '',
      fatherName: '',
      email: '',
      password: '',
      departmentName: '',
      position: '',
      role: 'user',
      isDeleted: false,
      departmentId: ''
    });
  };

  return (
    <div className=" flex justify-center relative">
      <div className="w-full max-w-4xl overflow-hidden">
        <div className=" p-6 text-center">
          <h2 className="text-3xl font-extrabold text-[#000] tracking-wider">Qeydiyyat Forması</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-indigo-500" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Adınızı daxil edin"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-indigo-500" />
              </div>
              <input
                type="text"
                name="surName"
                placeholder="Soyadınızı daxil edin"
                value={formData.surName}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-indigo-500" />
              </div>
              <input
                type="text"
                name="fatherName"
                placeholder="Ata adınızı daxil edin"
                value={formData.fatherName}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-indigo-500" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email ünvanınızı daxil edin"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-indigo-500" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Şifrənizi daxil edin"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBuilding className="text-indigo-500" />
              </div>
              <select
                name="department"
                value={formData.departmentName}
                onChange={handleDepartmentChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white appearance-none"
              >
                <option value="">Şöbə seçin</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          {formData.departmentName && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserTie className="text-indigo-500" />
              </div>
              <input
                type="text"
                name="position"
                placeholder="Vəzifəni daxil edin"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-[150px] bg-indigo-600 text-white py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 transform flex items-center justify-center space-x-2"
          >
            <span>Yadda saxla</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;