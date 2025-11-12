import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    darkTheme: false,
    user: "",
    id:"",
    isLogin: false,
    myBaskets:[],
    userToken:""
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
        },
        setUserToken:(state, action) => {
            state.userToken = action.payload;
        }
    }
})


export const {setId, setIsLogin, setTheme, setUser, setMyBaskets, setUserToken} = userSlice.actions;
export default userSlice.reducer;