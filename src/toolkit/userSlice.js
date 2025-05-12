import { createSlice } from "@reduxjs/toolkit"
import { userApiRequests } from "../services/base"

const initialState = {
    items: [],
    user: JSON.parse(localStorage.getItem("user")) || null
}
const userReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            state.items = action.payload
        },
        loginUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        logoutUser: (state) => {
            state.user = null
            localStorage.removeItem("user")
        },
        setUser : (state, action) => {
            state.user = action.payload
        },
        addNewUser: (state, action) => {
            state.items.push(action.payload);
            userApiRequests.addNewUser(action.payload)
        },
        removeUser: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
            userApiRequests.removeUser(action.payload)
        },
        editUser: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id)
            state.items[index] = action.payload
            userApiRequests.editUser(action.payload.id, action.payload)
        }
    }
})
export const { setAllUsers, loginUser, logoutUser, addNewUser, removeUser, editUser,setUser } = userReducer.actions
export default userReducer.reducer