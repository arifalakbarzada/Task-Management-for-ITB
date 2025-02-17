import axios from "axios";

const apiUrl = 'http://localhost:8000';

export const userApiRequests = {
    getAllUsers : async function ()  {
        try{
            const response =  axios.get(`${apiUrl}/users`)
            return (await response).data
        }
        catch(err){
            throw err;
        }
    }
}
export const taskApiRequests = {
    getAllTasks : async function () {
        try{
            const response =  axios.get(`${apiUrl}/tasks`)
            return (await response).data
        }
        catch (err){
            throw err
        }
    }
}

export const departmentApiRequests = {
    getAllDepartments : async function () {
        try{
            const response =  axios.get(`${apiUrl}/departments`)
            return (await response).data
        }
        catch (err){
            throw err
        }
    }
}