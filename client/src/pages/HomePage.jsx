import { useEffect } from "react";
import { useState } from "react";
import { getLocalUser, logoutUserFunction } from "../utils/LoginUtils";
import StudentDashboard from "./StudentDashboard";
import LibrarianDashboard from "./LibrarianDashboard";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    useEffect(() => {
       const user = getLocalUser();
       if (user) {
            setUserType(user.type);
        }
    }, [])
 
    if (!userType.length) {
        return <Login />; 
    }

    const getHomePageContent = () => {
        return userType === 'LIBRARIAN' ? (<LibrarianDashboard />) : ( <StudentDashboard />);
    }

   return (
    <section className="app-section">
    <button className="ui secondary button" onClick={async () =>{
        await logoutUserFunction();
        navigate('/login')
    }}>Logout</button>
      {getHomePageContent()}
      
      </section>
   )
    
};
