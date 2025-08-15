import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";

export default function () {
    return (       
           <>
      
        <h1>Welcome Back Student</h1>
        <div className="ui cards">
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
              <Link to={'/studend-issued-books'}><div className="header">View All Issued Books</div></Link> 
             
              <div className="description">
                 View all the issued books to students.
              </div>
            </div>
          </div>
        </div>
   


      <Sidebar />
    </>
    )   
};
