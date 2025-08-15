import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./Sidebar.css";
import { getLocalUser } from "../utils/LoginUtils";

export default function Sidebar() {
  const [visible, setVisible] = useState(false);
    const [user, setUser] = useState();
      const fetchBooks = async () => {
          const data = await getAllBooks();
          setBookList(data);
      }
  
      useEffect(() => {
          setUser(getLocalUser().type);
          fetchBooks().then().catch((err) => {
              console.error("Error fetching books:", err);
          })
      }, []);

  return (
    <div>
      {/* Toggle Button */}
      <button
        className="ui icon button"
        onClick={() => setVisible(!visible)}
        style={{
          margin: "10px",
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: "1100",
        }}
      >
        <i className="sidebar icon"></i>
      </button>

      
      <div
        className={`ui vertical inverted sidebar menu custom-sidebar ${
          visible ? "visible" : ""
        }`}
      >
      
        {user === "LIBRARIAN" && (
          <>
            <Link to="/" className="item" onClick={() => setVisible(false)}>
              <i className="home icon"></i> Dashboard
            </Link>
            <Link to="/add-book" className="item" onClick={() => setVisible(false)}>
              <i className="block layout icon"></i> Add Book
            </Link>
            <Link to="/all-books" className="item" onClick={() => setVisible(false)}>
              <i className="book icon"></i> All Books
            </Link>
             <Link to="/book-issue" className="item" onClick={() => setVisible(false)}>
              <i className="book icon"></i> Book Issue
            </Link>
              <Link to="/all-issued-books" className="item" onClick={() => setVisible(false)}>
              <i className="book icon"></i> All Issued Books
            </Link>
          </>
        )}

       
        {user === "STUDENT" && (
          <>
            <Link to="/" className="item" onClick={() => setVisible(false)}>
              <i className="home icon"></i> Dashboard
            </Link>
            <Link to="/all-books" className="item" onClick={() => setVisible(false)}>
              <i className="book icon"></i> All Books
            </Link>
            <Link to="/studend-issued-books" className="item" onClick={() => setVisible(false)}>
              <i className="book icon"></i> All Issued Books
            </Link>
          </>
        )}

        
        {!user && (
          <div className="item" style={{ opacity: 0.6 }}>
            Loading menu...
          </div>
        )}
      </div>
    </div>
  );
}
