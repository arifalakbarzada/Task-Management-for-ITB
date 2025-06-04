import { createSlice } from "@reduxjs/toolkit"
import { taskApiRequests } from "../services/base"

const initialState = {
    items: [],
    taskVisualization: []
}
const taskReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setAllTasks: (state, action) => {
            state.items = action.payload
        },
        editTask: (state, action) => {
            const index = state.items.findIndex((item) => item._id === action.payload._id)
            state.items[index] = action.payload
            taskApiRequests.editTask(action.payload._id, action.payload)
        },
        editTaskStatus: (state, action) => {
            const index = state.items.findIndex((item) => item._id === action.payload.id)
            state.items[index].status = action.payload.status
            taskApiRequests.editTask(action.payload._id, { status: action.payload.status })
        },
        addNewTask: (state, action) => {
            state.items.push(action.payload)
            taskApiRequests.addNewTask(action.payload)
        },
        removeTask: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload)
            taskApiRequests.removeTask(action.payload)
        }
    }
})
export const { setAllTasks, addNewTask, editTask, removeTask } = taskReducer.actions
export default taskReducer.reducer