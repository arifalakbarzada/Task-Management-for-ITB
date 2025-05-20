import { createSlice } from "@reduxjs/toolkit"
import { departmentApiRequests } from "../services/base"

const initialState = {
    items: []
}
const departmentReducer = createSlice({
    name: 'departments',
    initialState,
    reducers: {
        setAllDepartments: (state, action) => {
            state.items = action.payload
        },
        addNewDepartment: (state, action) => {
            state.items.push(action.payload)
            departmentApiRequests.addNewDepartment(action.payload)
        },
        deleteDepartment: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload)
            departmentApiRequests.deleteDepartment(action.payload)
        },
        changeDepartment: (state, action) => {
            const index = state.items.findIndex((item) => item._id === action.payload._id)
            state.items[index] = action.payload
            departmentApiRequests.editDepartment(action.payload.id, action.payload)
        }
    }
})
export const { setAllDepartments, addNewDepartment, deleteDepartment, changeDepartment } = departmentReducer.actions
export default departmentReducer.reducer