/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginFormData } from '../pages/LoginPage'
import axios from 'axios'
import { RegisterFormData } from '../pages/RegisterPage'


// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null


const initialState = {
    loading: false,
    userInfo: null, // for user the object
    userToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
    userID: null
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async (data: RegisterFormData, { rejectWithValue }) => {
        try {
            const responseData = {...data, userType: 'MEMBER'}
            await axios.post('http://localhost:2804/api/auth/register', responseData);

        }catch (error: any){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
 )
 
 



export const login = createAsyncThunk(
    
    'auth/login',
    async (body: LoginFormData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('http://localhost:2804/api/auth/login',
                body,
            )
            localStorage.setItem('userToken', data.jwt)
            localStorage.setItem('userEmail', body.email);
            const email = localStorage.getItem('userEmail')
            axios.get("http://localhost:2804/api/users/byemail", { params: {email} }).then(res1 => {
                console.log(res1.data)
                localStorage.setItem('userID', res1.data.id)
            })
            return data
        } catch (error: any) {

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    
     
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear() // deletes all data from local storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
            state.userID = null
        }
    },
    extraReducers: (builder) => {
        // Login user
        builder.addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(login.fulfilled, (state, action: any) => {
            state.loading = false
            state.userInfo = action.payload
            state.userToken = action.payload.jwt
        })
        builder.addCase(login.rejected, (state, action: any) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(registerUser.fulfilled, (state) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(registerUser.rejected, (state, action: any) => {
            state.loading = false
            state.error = action.payload
        })
    }
 
})

export const { logout } = authSlice.actions
export default authSlice.reducer
