import { useState } from "react"
import { loginUserFunction, signupUserFunction } from "../utils/LoginUtils";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        type: "STUDENT"
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSingupSubmit = async (e) => {
        e.preventDefault()
        console.log("Login submitted with userData:", userData);
        if (validateData()) {
            const user = await signupUserFunction(userData);
            navigate('/');
        }
    }

    const validateData = () => {
        return userData.firstName?.length && userData.lastName?.length && userData.email?.length && userData.password?.length;
    }
    return (
        <section className="app-section">
            <h1>SignUp</h1>
            <span>Already have a account? Login <Link to={"/login"}>here</Link></span>
            <form className="ui form" onSubmit={handleSingupSubmit}>
                <label>First Name</label>
                <div className="field">
                    <input type="text" name="firstName" placeholder="First Name"
                        required={true}
                        value={userData.firstName}
                        onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input type="text" name="lastName" placeholder="Last Name"
                        required={true}
                        value={userData.lastName}
                        onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email"
                        required={true}
                        value={userData.email}
                        onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password"
                        required={true}
                        value={userData.password}
                        onChange={handleChange} />
                </div>
                <div class="ui segment">
                    <div class="field">
                        <div class="ui toggle checkbox" onClick={() =>{
                            setUserData({
                                ...userData,
                                type: userData.type === "LIBRARIAN" ? "STUDENT" : "LIBRARIAN"
                            });
                        }}>
                            <input type="checkbox" name="gift" tabIndex="0" class="hidden"
                            checked = {userData.type === "LIBRARIAN"} />
                            <label>Are you a Librarian?</label>
                        </div>
                    </div>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </section>
    )
};
