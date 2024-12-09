import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess, resetUser } from "../slices/authSlice";
import baseUrl from "~/utils/baseUrl";


export const loginUser = async (user, dispatch, navigate, callback) => {
    dispatch(loginStart())
    try{
        const res = await axios.post(baseUrl + "/api/auth/login", user)
        dispatch(loginSuccess(res.data))
        if(res?.data?.role==='Admin') navigate("/Admin")
        else callback(res)
    }   
    catch(err){
        callback(err)
        dispatch(loginFailed())
    }
}

export const registerUser = async (user, dispatch, navigate, callback) => {
    dispatch(registerStart())
    try{
        const res = await axios.post(baseUrl + '/api/auth/register', user)
        dispatch(registerSuccess())
        callback(res)
    }   
    catch(err){
        callback(err)
        dispatch(registerFailed())
    }
}

export const logoutUser = async (id, dispatch, accessToken, navigate) => {
    dispatch(logoutStart())
    try{
        navigate("/user")
        await axios.post(baseUrl + '/api/auth/logout',id , {
            headers: {token: "Bearer " + accessToken}
        })
        dispatch(logoutSuccess())
        navigate("/user")
    }   
    catch(err){
        console.log(err)
        dispatch(logoutFailed())
    }
}


export const resetUserInfo = async (dispatch) => {
    dispatch(resetUser())
}