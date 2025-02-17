import React, { useEffect, useState } from 'react';
import {
  MessageCircle,
  User,
  Edit,
  Trash,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { departmentApiRequests, taskApiRequests, userApiRequests } from '../../services/base';

const users = ['John Doe', 'Jane Smith', 'Mike Johnson'];

const initialTasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Detaylı task açıklaması buraya gelecek.',
    owner: 'John Doe',
    status: 'beklemede',
    deadline: new Date('2024-03-15'),
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'İkinci task için açıklama metni.',
    owner: 'Jane Smith',
    status: 'hazir',
    deadline: new Date('2024-02-20'),
  }
];


const SprintTaskManagement = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [usersArr, setUsersArr] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    owner: '',
    status: 'beklemede',
    deadline: new Date()
  });

  const formatDate = (date) => {
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'beklemede': 'bg-yellow-500 text-white',
      'hazir': 'bg-green-500 text-white',
      'hazir degil': 'bg-red-500 text-white'
    };
    return statusColors[status] || 'bg-gray-500 text-white';
  };

  const handleStatusChange = (newStatus) => {
    if (selectedTask) {
      const updatedTasks = tasks.map(task =>
        task.id === selectedTask.id
          ? { ...task, status: newStatus }
          : task
      );
      setTasks(updatedTasks);
      setIsStatusModalOpen(false);
    }
  };

  const handleAddTask = () => {
    const taskToAdd = {
      ...newTask,
      id: tasks.length + 1,
      deadline: new Date(newTask.deadline)
    };
    setTasks([...tasks, taskToAdd]);
    setIsAddTaskModalOpen(false);
    setNewTask({
      title: '',
      description: '',
      owner: '',
      status: 'beklemede',
      deadline: new Date()
    });
  };

  const handleEditTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === selectedTask.id ? selectedTask : task
    );
    setTasks(updatedTasks);
    setIsEditTaskModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  useEffect( () => {
    departmentApiRequests.getAllDepartments().then(res=>setUsersArr(res))
  }, [])
  console.log(usersArr)
  

  return tasks.length>0? (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Görev</th>
              <th className="p-2 text-left hidden md:table-cell">Owner</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left hidden md:table-cell">Deadline</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {tasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="p-2 flex items-center space-x-2">
                  <MessageCircle size={16} className="text-gray-400" />
                  {task.title}
                </td>
                <td className="p-2 hidden md:table-cell">
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-gray-400" />
                    {task.owner}
                  </div>
                </td>
                <td className="p-2">
                  <span
                    onClick={() => {
                      setSelectedTask(task);
                      setIsStatusModalOpen(true);
                    }}
                    className={`px-2 py-1 rounded text-xs cursor-pointer ${getStatusColor(task.status)}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-2 hidden md:table-cell">{formatDate(task.deadline)}</td>
                <td className="p-2 relative">
                  <button
                    onClick={() => setOpenActionMenuId(openActionMenuId === task.id ? null : task.id)}
                    className="hover:bg-gray-200 p-1 rounded"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  {openActionMenuId === task.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setIsViewTaskModalOpen(true);
                          setOpenActionMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <Eye size={16} className="mr-2" /> Görüntüle
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTask({ ...task });
                          setIsEditTaskModalOpen(true);
                          setOpenActionMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <Edit size={16} className="mr-2" /> Düzenle
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteTask(task.id);
                          setOpenActionMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-500"
                      >
                        <Trash size={16} className="mr-2" /> Sil
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-2 bg-gray-100 flex items-center">
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="text-blue-500 flex items-center"
          >
            + görev ekle
          </button>
        </div>
      </div>

      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-64">
            <h3 className="text-lg font-semibold mb-4">Durumu Değiştir</h3>
            <div className="space-y-2 m-[10px]">
              {['beklemede', 'hazir', 'hazir degil'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`w-full py-2 rounded ${getStatusColor(status)}`}
                >
                  {status}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="mt-4 w-full bg-gray-200 py-2 rounded"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Görev Ekle</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Görev Başlığı"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Görev Açıklaması"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full p-2 border rounded h-24"
              />
              <select
                value={newTask.owner}
                onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Kullanıcı Seçin</option>
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
              <input
                type="date"
                value={newTask.deadline.toISOString().split('T')[0]}
                onChange={(e) => setNewTask({ ...newTask, deadline: new Date(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsAddTaskModalOpen(false)}
                className="bg-gray-200 py-2 px-4 rounded"
              >
                İptal
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Task Modal */}
      {isViewTaskModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">{selectedTask.title}</h3>
            <p className="mb-4">{selectedTask.description}</p>
            <button
              onClick={() => setIsViewTaskModalOpen(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {isEditTaskModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Görevi Düzenle</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Görev Başlığı"
                value={selectedTask.title}
                onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Görev Açıklaması"
                value={selectedTask.description}
                onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                className="w-full p-2 border rounded h-24"
              />
              <select
                value={selectedTask.owner}
                onChange={(e) => setSelectedTask({ ...selectedTask, owner: e.target.value })}
                className="w-full p-2 border rounded"
              >
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
              <input
                type="date"
                value={selectedTask.deadline.toISOString().split('T')[0]}
                onChange={(e) => setSelectedTask({ ...selectedTask, deadline: new Date(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsEditTaskModalOpen(false)}
                className="bg-gray-200 py-2 px-4 rounded"
              >
                İptal
              </button>
              <button
                onClick={handleEditTask}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ):<>
  There is not any task
  <div className="p-2 bg-gray-100 flex items-center">
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="text-blue-500 flex items-center"
          >
            + görev ekle
          </button>  {isAddTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Görev Ekle</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Görev Başlığı"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Görev Açıklaması"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full p-2 border rounded h-24"
              />
              <select
                value={newTask.owner}
                onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Kullanıcı Seçin</option>
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
              <input
                type="date"
                value={newTask.deadline.toISOString().split('T')[0]}
                onChange={(e) => setNewTask({ ...newTask, deadline: new Date(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsAddTaskModalOpen(false)}
                className="bg-gray-200 py-2 px-4 rounded"
              >
                İptal
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
  </>;
};

export default SprintTaskManagement;