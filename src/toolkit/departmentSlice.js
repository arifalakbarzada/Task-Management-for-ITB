import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: []
}
const departmentReducer = createSlice({
    name: 'departments',
    initialState,
    reducers: {
        setAllDepartments: (state, action) => {
            state.items = action.payload
        }
    }
})
export const { setAllDepartments } = departmentReducer.actions
export default departmentReducer.reducer