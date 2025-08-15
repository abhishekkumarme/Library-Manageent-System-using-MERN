import { useState } from "react"
import { loginUserFunction } from "../utils/LoginUtils";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        console.log("Login submitted with credentials:", credentials);
        if(validate()){
          const user = await  loginUserFunction(credentials);
        navigate('/');
        }
    }

    const validate = () => {
        return credentials.email?.length > 0 && credentials.password?.length;
    }
    return (
        <section className="app-section">
            <h1>Login</h1>
            <form className="ui form" onSubmit={handleLoginSubmit}>
                <div className="field">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email"
                        required={true}
                        value={credentials.email}
                        onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password"
                        required={true}
                        value={credentials.password}
                        onChange={handleChange} />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
            <br />
            <span>New User? SignUp <Link to={"/signup"}>here</Link></span>
        </section>
    )
};
