import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { getAllIssuedBooks } from "../api's/book-issue-api";

export default function AllIssuedBook() {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [selectedStatus, setSlectedStatus] = useState("ISSUED")

    const dateFormater = new Intl.DateTimeFormat("en-IN",{
        year: "numeric",
        month: "long",
        day: "numeric"
    })

   const formatDate = (date) => dateFormater.format(date);


    useEffect(() => {
        getAllIssuedBooks(selectedStatus).then((list) =>{
            setIssuedBooks(list)
        })
    },[selectedStatus]);

    return(
        <>
        <section className="app-section">
            <h1>All Issued Books</h1>
            <p>List of all issued books will be displayed here.</p>
                <table className="ui single line table">
                    <thead>
                        <tr>
                            <th>ISBN</th>
                            <th>Student Id</th>
                            <th>Issue Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issuedBooks.map((book) => (
                            <tr key={book._id}>
                                <td>{book.bookIsbn}</td>
                                <td>{book.issuedTo}</td>
                                <td>{formatDate(new Date(book.updatedAt))}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
        </section>
        <Sidebar />
        </>
    )
};
