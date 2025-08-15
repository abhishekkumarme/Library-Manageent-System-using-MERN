import LibraryBackend from "./LibraryBackend";

export const loginUser = async (email,password) =>{
    const {data} = await LibraryBackend.post('/users/login', {
        email,
        password,
    });
    return data;
}

export const signupUser = async (userData) =>{
    const {data} = await LibraryBackend.post('/users/signup', userData);
    return data;
}

export const logoutUser = async () => {
    const response = await LibraryBackend.get('/users/logout');
    return response;
}

export const getAllStudents = async () => {
    const {data: studentList} = await LibraryBackend.get('/users/students');
    return studentList;
}