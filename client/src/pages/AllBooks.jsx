import { useEffect, useState } from "react";
import { getAllBooks } from "../api's/book-api";
import Sidebar from "../component/Sidebar";
import { getLocalUser } from "../utils/LoginUtils";
import { useNavigate } from "react-router-dom";

const numberFormat = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const formatPrice = (price) => {
    return numberFormat.format(price);
};

export default function AllBooks() {
    const [bookList, setBookList] = useState([]);
    const [user, setUser] = useState();
    const fetchBooks = async () => {
        const data = await getAllBooks();
        setBookList(data);
    }

    const navigate = useNavigate();

    useEffect(() => {
        setUser(getLocalUser().type);
        fetchBooks().then().catch((err) => {
            console.error("Error fetching books:", err);
        })
    }, []);

    return (
        <>
            <section className="app-section">
                <h1>List of the books</h1>
                <table className="ui single line table">
                    <thead>
                        <tr>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Total Quantity</th>
                            <th>Issued Quantity</th>
                            {user === "LIBRARIAN" && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {bookList.map((book) => (
                            <tr key={book._id}>
                                <td>{book.isbn}</td>
                                <td>{book.tittle}</td>
                                <td>{book.author}</td>
                                <td>{formatPrice(book.price)}</td>
                                <td>{book.totalQuantity}</td>
                                <td>{book.issuedQuantity}</td>
                                {user === "LIBRARIAN" && <td>
                                    <button class="ui inverted green button" disabled={book.issuedQuantity >= book.totalQuantity}
                                        onClick={() => {
                                            navigate('/book-issue', {
                                                state: {
                                                    bookIsbn: book.isbn,
                                                }
                                            });
                                        }}
                                        >
                                        Issue Book
                                    </button>
                                </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <Sidebar />
        </>
    )
};
