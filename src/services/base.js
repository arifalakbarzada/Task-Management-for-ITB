import axios from "axios";

const apiUrl = 'http://localhost:8000';

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
    addNewUser: async function (newUser) {
        try {
            await axios.post(`${apiUrl}/users`, newUser)
        } catch (error) {
            throw error
        }
    },
    removeUser: async function (id) {
        try {
            await axios.delete(`${apiUrl}/users/${id}`)
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
    }
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
    addNewTask: async function (task) {
        try {
            await axios.post(`${apiUrl}/tasks`, task)
        } catch (error) {
            throw error
        }
    },
    removeTask: async function (id) {
        try {
            await axios.delete(`${apiUrl}/tasks/${id}`)
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
            await axios.delete(`${apiUrl}/departments/${depId}`)
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