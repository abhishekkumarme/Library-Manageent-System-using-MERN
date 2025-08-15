import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Select from 'react-select';
import { getAllStudents } from "../api's/user-api";
import { getAllBooks } from "../api's/book-api";
import { addNewBookIssue } from "../api's/book-issue-api";
import { useLocation } from "react-router-dom";

export default function BookIssue() {
  const [bookList, setBookList] = useState([]);
  const [studentOption, setStudentOption] = useState([]);
  const [issuedBook, setIssuedBook] = useState({
    bookIsbn: "",
    issuedTo: "",
  });
  const location = useLocation();

  useEffect(() => {
    getAllStudents().then((studentList) => {
      setStudentOption(
        studentList.map((student) => ({
          value: student._id,
          label: `${student.firstName} ${student.lastName}`,
        }))
      );
    });

    getAllBooks().then((bookOptions) => {
      setBookList(
        bookOptions.map((book) => ({
          value: book.isbn,
          label: `${book.tittle} by ${book.author}`,
        }))
      );
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNewBookIssue(issuedBook);
    alert("Book issued successfully");
    setIssuedBook({
      bookIsbn: "",
      issuedTo: "",
    });
  };

  return (
    <>
      <section className="app-section">
        <h1>Book Issue Page</h1>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Student</label>
            <Select
              options={studentOption}
              onChange={(selected) =>
                setIssuedBook({
                  ...issuedBook,
                  issuedTo: selected?.value || "",
                })
              }
            />
          </div>
          <div className="field">
            <label>Book</label>
            <Select
              options={bookList}
              onChange={(selected) =>
                setIssuedBook({
                  ...issuedBook,
                  bookIsbn: selected?.value || "",
                })
              }
              value={bookList.filter(
                (option) => option.value === location.state?.bookIsbn
              )}
            />
          </div>
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
      </section>
      <Sidebar />
    </>
  );
}
