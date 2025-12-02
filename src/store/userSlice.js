import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    darkTheme: false,
    user: "",
    id: "",
    isLogin: false,
    myBaskets: [],
    userToken: "",
    totalPaymentPrice: 0,
    didTheNewWatchAdd: false
}


export const userSlice = createSlice({
    name: "userStatus",
    initialState,
    reducers: {
        setTheme: (state) => {
            state.darkTheme = !state.darkTheme;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        addToTheBasket: (state, action) => {
            const item = action.payload;
            const exist = state.myBaskets.find(el => el.id === item.id);
            if (exist) {
                exist.quantity += 1;
            } else {
                state.myBaskets.push({ ...item, quantity: 1, userId: localStorage.getItem("myUserId") });
            }
        },
        removeFromTheBasket: (state, action) => {
            const index = state.myBaskets.findIndex((item => item.id === action.payload));
            if (index !== -1) {
                state.myBaskets.splice(index, 1);
            }
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload;
        },
        setDidNewWatchAdd: (state, action) => {
            state.didTheNewWatchAdd = action.payload;
        },
        setTotalPaymentPrice: (state) => {
            let sum = 0;
            if (state.myBaskets.length) {
                for (let i = 0; i < state.myBaskets.length; i++) {
                  sum = sum + (state.myBaskets[i].price * state.myBaskets[i].quantity)
                }
                state.totalPaymentPrice = sum;
            }
        },
        setEmptyTheArray:(state) => {
            state.myBaskets = [];
        }
    }
})


export const { setId, setIsLogin, setTheme, setUser, setMyBaskets, setUserToken, setDidNewWatchAdd, addToTheBasket, removeFromTheBasket, setTotalPaymentPrice, setEmptyTheArray } = userSlice.actions;
export default userSlice.reducer;