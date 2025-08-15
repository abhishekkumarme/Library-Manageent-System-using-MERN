import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import AddBook from './pages/AddBook';
import AllBooks from './pages/AllBooks';
import BookIssue from './pages/BookIssue';
import AllIssuedBook from './pages/AllIssuedBook';
import StudentIssuedBooks from './pages/StudentIssuedBooks';

const router = createBrowserRouter([
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <SignUp />},
  {path: '/', element: <HomePage/>},
  {path: '/add-book', element: <AddBook />},
  {path: '/all-books', element: <AllBooks />}, 
  {path: '/book-issue', element: <BookIssue />},
  {path: '/all-issued-books', element: <AllIssuedBook />},
  {path: '/studend-issued-books', element: <StudentIssuedBooks />}
]);

function App() {
  

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
