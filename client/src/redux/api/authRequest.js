import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess, resetUser } from "../slices/authSlice";
import baseUrl from "~/utils/baseUrl";

//Dang nhap bang google
export const loginWithGoogle = async (googleToken, dispatch, navigate, callback) => {
    // Bắt đầu quá trình đăng nhập
    dispatch(loginStart());

    try {
        // Gửi yêu cầu đăng nhập tới API
        const res = await axios.post(baseUrl + "/api/auth/google/callback", { googleToken });

        if (res?.data) {
            // Nếu có dữ liệu trả về từ API
            dispatch(loginSuccess(res.data));

            // Điều hướng dựa trên vai trò của người dùng
            if (res.data.role === 'Admin') {
                navigate("/Admin");
            } else {
                callback(res); // Truyền phản hồi thành công qua callback
            }
        } else {
            // Trường hợp không nhận được dữ liệu hợp lệ
            callback(new Error("Dữ liệu không hợp lệ từ API"));
        }
    } catch (err) {
        // Xử lý lỗi từ API hoặc mạng
        const errorMessage = err.response ? err.response.data : err.message;
        callback(errorMessage); // Truyền lỗi qua callback
        dispatch(loginFailed()); // Cập nhật trạng thái thất bại
    }
};






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