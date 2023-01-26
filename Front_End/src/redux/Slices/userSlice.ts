import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'
import { RootState } from "../store";

type fetchParams = Record<string, string>

export type UserData = {
    _id: string,
    email: string,
    password: string,
    fullname: string,
    avatar: string,
}

export type Data = {
    userData: UserData
}

export const fetchRegister = createAsyncThunk('user/fetchRegister', async (params: fetchParams) => {
    try {
        const data = await axios.post<Data, null>('/user/signup', params)
        console.log(data)
        return data;
        
    } catch (error: any) {
        return error.response.data
    }
});

export const fetchLogin = createAsyncThunk('user/fetchLogin', async (params: fetchParams) => {
    try {
        const data = await axios.post<Data, null>('/user/signin', params)
        // console.log(data)
        return data;
    } catch (error: any) {
        return error.response.data
    }
})


type AuthSlaiceState = {
    data: Data | null,
    status: 'loading' | 'succes' | 'error'
}

const initialState: AuthSlaiceState = {
    data: null,
    status: 'loading'
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchRegister.pending, (state) => {
            state.data = null;
            state.status = 'loading'
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            if (action.payload) {
                state.data = action.payload;
                state.status = 'succes'
            }
        });
        builder.addCase(fetchRegister.rejected, (state) => {
            state.data = null;
            state.status = 'error'
        });
        builder.addCase(fetchLogin.pending, (state) => {
            state.data = null;
            state.status = 'loading'
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            if (action.payload) {
                state.data = action.payload.data;
                state.status = 'succes'
            }
        });
        builder.addCase(fetchLogin.rejected, (state) => {
            state.data = null;
            state.status = 'error'
        });
    },
})

export const SelectAuth = (state: RootState) => state.userSlice


export default userSlice.reducer