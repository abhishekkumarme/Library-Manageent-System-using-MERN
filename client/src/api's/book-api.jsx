import LibraryBackend from "./LibraryBackend"

export const addBook = async (book) => {
    const {data} = await LibraryBackend.post('/books/add', {
        ...book,
    });
    return data;
};

export const getAllBooks = async () => {
    const {data} = await LibraryBackend.get('/books/all');
    return data;
}