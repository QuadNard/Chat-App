import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Applogo from "../assets/Applogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";


function Login() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate('/')
        }
    }, []);



    // data retrival of Sumbit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleVaildation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }

        }
    };
    //toastify error components
    const toastOptions = {
        position: "bottom-right",
        autoCloase: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const handleVaildation = () => {
        const { password, username } = values;
        if (password === "") {
            toast.error("The correct email and password is requird .", toastOptions);
            return false;
        } else if (username.length === "") {
            toast.error("The correct email and password is required", toastOptions);
            return false;
        }
        return true;

    };
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Applogo} alt="logo" />
                        <h1>QuadNard Chat</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                        min="3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete='on'
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Login In</button>

                    <span>
                        Don't have an account ? <Link to="/register">Register</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

//Css page

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #778899;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
    img {
        height: 5rem;
    }
    h1 {
       color: white;
       text-transform: uppercase; 
    }
 }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0%.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
          border: 0.1rem solid #977af0;
          outline: none;
      } 
    }  
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 04.rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0ms.2s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }  
    } 
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }  
  }
}
`;


export default Login