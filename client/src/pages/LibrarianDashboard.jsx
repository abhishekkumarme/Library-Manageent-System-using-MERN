import Sidebar from "../component/Sidebar";
import { Link } from "react-router-dom";


export default function LibrarianDashboard() {


  return (
    <>
      
        <h1>Welcome Librarian</h1>
        <div className="ui cards">
          <div className="card">
            <div className="content">
              <Link to={'/add-book'}><div className="header">Add Book</div></Link>
              <div className="description">
                Add a new book in Library.
              </div>
            </div>
          </div>
          <div className="card">
            <div className="content">
             <Link to={'/all-books'}><div className="header">All Books</div></Link> 
              <div className="description">
                View all books of Library.
              </div>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <Link to={'/book-issue'}><div className="header">Issue Book</div></Link>
              <div className="description">
                Issue a new book to Student.
              </div>
            </div>
          </div>
           <div className="card">
            <div className="content">
              <Link to={'/all-issued-books'}><div className="header">View All Issued Books</div></Link> 
             
              <div className="description">
                 View all the issued books to students.
              </div>
            </div>
          </div>
        </div>
   


      <Sidebar />
    </>
  );
}
