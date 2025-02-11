import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaUserTie, FaCheckCircle } from 'react-icons/fa';

const Register = () => {
  const departments = [
    { id: 1, name: 'IT Departamenti' },
    { id: 2, name: 'Maliyyə Departamenti' },
    { id: 3, name: 'İnsan Resursları Departamenti' },
    { id: 4, name: 'Satış Departamenti' }
  ];

  const positionsByDepartment = {
    1: [
      { id: 1, name: 'Software Developer' },
      { id: 2, name: 'IT Support' },
      { id: 3, name: 'Network Administrator' }
    ],
    2: [
      { id: 4, name: 'Mühasib' },
      { id: 5, name: 'Maliyyə Direktoru' },
      { id: 6, name: 'Maliyyə Analitiki' }
    ],
    3: [
      { id: 7, name: 'HR Meneceri' },
      { id: 8, name: 'Təlim Koordinatoru' },
      { id: 9, name: 'İşə Qəbul Mütəxəssisi' }
    ],
    4: [
      { id: 10, name: 'Satış Meneceri' },
      { id: 11, name: 'Satış Nümayəndəsi' },
      { id: 12, name: 'Müştəri Dəstəyi' }
    ]
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    email: '',
    password: '',
    department: '',
    position: ''
  });

  const [positions, setPositions] = useState([]);
  const [notification, setNotification] = useState(null);

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setFormData(prev => ({
      ...prev, 
      department: selectedDepartment,
      position: ''
    }));
    setPositions(selectedDepartment ? positionsByDepartment[selectedDepartment] : []);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show notification
    setNotification({
      type: 'success',
      message: 'Qeydiyyat uğurla başa çatdı!'
    });

    // Reset form data
    setFormData({
      firstName: '',
      lastName: '',
      fatherName: '',
      email: '',
      password: '',
      department: '',
      position: ''
    });

    // Reset positions
    setPositions([]);

    // Auto-hide notification
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className=" flex justify-center relative">
      {/* Notification */}
      {notification && (
        <div className={`
          fixed top-4 right-4 z-50 
          bg-green-500 text-white 
          px-6 py-4 rounded-xl shadow-2xl 
          flex items-center space-x-3
          animate-bounce
        `}>
          <FaCheckCircle className="text-2xl" />
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      <div className="w-full max-w-4xl overflow-hidden">
        <div className=" p-6 text-center">
          <h2 className="text-3xl font-extrabold text-[#000] tracking-wider">Qeydiyyat Forması</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-indigo-500" />
              </div>
              <input 
                type="text" 
                name="firstName" 
                placeholder="Adınızı daxil edin" 
                value={formData.firstName} 
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white"
              />
            </div>
            {/* Last Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-indigo-500" />
              </div>
              <input 
                type="text" 
                name="lastName" 
                placeholder="Soyadınızı daxil edin" 
                value={formData.lastName} 
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Father Name */}
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
            {/* Email */}
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
            {/* Password */}
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
            {/* Department */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBuilding className="text-indigo-500" />
              </div>
              <select 
                name="department" 
                value={formData.department} 
                onChange={handleDepartmentChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white appearance-none"
              >
                <option value="">Şöbə seçin</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          {formData.department && (
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