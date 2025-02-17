import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items : []
}
const userReducer = createSlice({
    name: 'users',
    initialState,
    reducers : {
        setAllUsers : (state , action) => {
            state.items = action.payload
        }
    }
})
export const {setAllUsers} = userReducer.actions
export default userReducer.reducer