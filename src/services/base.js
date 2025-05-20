import axios from "axios";
import { logoutUser } from "../toolkit/userSlice";
const url = import.meta.env.VITE_BACKEND_URL;
const apiUrl = `${url}/api`;

export const userApiRequests = {
    getAllUsers: async function () {
        try {
            const response = axios.get(`${apiUrl}/users`)
            return (await response).data
        }
        catch (error) {
            throw error;
        }
    },
    getUserById: async function (id) {
        try {
            const response = axios.get(`${apiUrl}/users/${id}`)
            return (await response).data
        } catch (error) {
            throw error
        }
    }
    ,
    addNewUser: async function (newUser) {
        try {
            await axios.post(`${apiUrl}/register`, {email: newUser.email, password: newUser.password, user: newUser})
        } catch (error) {
            throw error
        }
    },
    removeUser: async function (id) {
        try {
            await axios.patch(`${apiUrl}/users/${id}`, { isDeleted: true })
        } catch (error) {
            throw error
        }
    },
    editUser: async function (id, changes) {
        try {
            await axios.patch(`${apiUrl}/users/${id}`, changes)
        } catch (error) {
            throw error
        }
    },
    logoutUser: async function () {
        try {
            const refreshToken = localStorage.getItem("refreshToken")
            await axios.post(`${apiUrl}/logout`, { refreshToken })
        } catch (error) {
            throw error
        }
    },
    
}
export const taskApiRequests = {
    getAllTasks: async function () {
        try {
            const response = axios.get(`${apiUrl}/tasks`)
            return (await response).data
        }
        catch (error) {
            throw error
        }
    },
    getTaskByUserId: async function (id) {
        if (!id) throw new Error("userId gerekli");
        try {
            const response = await axios.get(`${apiUrl}/tasks?userId=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    ,
    getTaskByDepartmentId: async function (id,userId,status) {
        try {
            const response = axios.get(`${apiUrl}/tasks?departmentId=${id}&owner=${userId}&status=${status}`)
            return (await response).data
        } catch (error) {
            throw error
        }
    },
    addNewTask: async function (task) {
        try {
            await axios.post(`${apiUrl}/tasks`, task)
        } catch (error) {
            throw error
        }
    },
    removeTask: async function (id) {
        try {
            await axios.patch(`${apiUrl}/tasks/${id}`, { isDeleted: true })
        } catch (error) {
            throw error
        }
    },
    editTask: async function (id, changes) {
        try {
            await axios.patch(`${apiUrl}/tasks/${id}`, changes)
        } catch (error) {
            throw error
        }
    }
}

export const departmentApiRequests = {
    getAllDepartments: async function () {
        try {
            const response = axios.get(`${apiUrl}/departments`)
            return (await response).data
        }
        catch (error) {
            throw error
        }
    },
    addNewDepartment: async function (newDepartment) {
        try {
            await axios.post(`${apiUrl}/departments`, newDepartment)
        }
        catch (error) {
            throw error
        }
    },
    deleteDepartment: async function (depId) {
        try {
            await axios.patch(`${apiUrl}/departments/${depId}`, { isDeleted: true })
        } catch (error) {
            throw error
        }

    },
    editDepartment: async function (depId, changes) {
        try {
            await axios.patch(`${apiUrl}/departments/${depId}`, changes)
        } catch (error) {
            throw error
        }
    }
}