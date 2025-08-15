import { useEffect, useState } from "react"; 
import Sidebar from "../component/Sidebar";
import { getStudentIssuedBooks } from "../api's/book-issue-api";

export default function StudentIssuedBooks() {
    const [issuedBooks, setIssuedBooks] = useState([]);

    const dateFormater = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const formatDate = (date) => dateFormater.format(date);

    useEffect(() => {
        getStudentIssuedBooks().then((list) => {
            setIssuedBooks(list);
        });
    }, []);

    return (
        <>
            <section className="app-section">
                <h1>All Issued Books</h1>
                <p>List of all issued books will be displayed here.</p>
                <table className="ui single line table">
                    <thead>
                        <tr>
                            <th>ISBN</th>
                            <th>Issue Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issuedBooks.map((book) => (
                            <tr key={book._id}>
                                <td>{book.bookIsbn}</td>
                                <td>{formatDate(new Date(book.updatedAt))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <Sidebar />
        </>
    );
}
