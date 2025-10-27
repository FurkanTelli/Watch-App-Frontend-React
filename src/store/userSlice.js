import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    darkTheme: false,
    user: "",
    id:"",
    isLogin: false,
    myBaskets:[]
}


export const userSlice = createSlice({
    name:"userStatus",
    initialState,
    reducers:{
        setTheme:(state) => {
            state.darkTheme = !state.darkTheme;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        },
        setId:(state, action) => {
            state.id = action.payload;
        },
        setIsLogin:(state, action) => {
            state.isLogin = action.payload;
        },
        setMyBaskets:(state,action) => {
            state.myBaskets = action.payload;
        }
    }
})


export const {setId, setIsLogin, setTheme, setUser, setMyBaskets} = userSlice.actions;
export default userSlice.reducer;