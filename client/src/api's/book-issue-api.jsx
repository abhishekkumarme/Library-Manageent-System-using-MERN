import LibraryBackend from "./LibraryBackend";

export const addNewBookIssue = async (bookIssue) =>{
    const {data} = await LibraryBackend.post('/book-issue/add', bookIssue);
    return data;
}

export const getAllIssuedBooks = async (status = "ISSUED") => {
    const {data: issuedBooks} = await LibraryBackend.get('/book-issue/get-all',{
        params: {status}
    });
    return issuedBooks;
}

export const getStudentIssuedBooks = async () => {
    const {data: studentIssued} = await LibraryBackend.get('/book-issue/by-student');
    return studentIssued;
}