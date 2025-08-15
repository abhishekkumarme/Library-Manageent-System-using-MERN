import { loginUser, logoutUser, signupUser } from "../api's/user-api";

export const getUserToken =() =>{
    return localStorage.getItem("token");
}

export const setUser = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
}

export const getLocalUser = () => {
    return JSON.parse(localStorage.getItem("user"));      
}

export const logoutUserFunction = async () => {
    const response = await logoutUser();    
        localStorage.removeItem("token");
        localStorage.removeItem("user");
}

export const loginUserFunction = async ({email, password}) => {
    const data = await loginUser(email, password);
    setUser(data);
    return data.user;
}

export const signupUserFunction = async (userData) => {
    const data = await signupUser(userData);
    setUser(data);
    return data.user;
}