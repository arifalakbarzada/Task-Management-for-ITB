import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: []
}
const taskReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setAllTasks: (state, action) => {
            state.items = action.payload
        }
    }
})
export const { setAllTasks } = taskReducer.actions
export default taskReducer.reducer