import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../../services/Auth';
import { Divider, message } from 'antd';
import "./Login.scss";
import { setAxiosInstanceToken } from '../../services/axiosInstance';

const Login = () => {
    const navigate = useNavigate();
    const email = useRef();
    const password = useRef();

    const onFinish = async (event) => {
        event.preventDefault();
        try {
            const data = await Auth.login({ email: email.current.value, password: password.current.value });
            message.success(data.message);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setAxiosInstanceToken(data.token)    
            navigate("/");
        } catch (error) {
            message.error(error.response.data.message);
        }
    }
    return (
        <div className='login'>
            <form onSubmit={onFinish}>
                <h2>POST APP</h2>
                <input type="email" ref={email} placeholder='email' />
                <input type="password" ref={password} placeholder='password' />
                <button>Log in</button>
                <Divider>Or</Divider>
                <Link>Forgot password?</Link>
            </form>
            <div className="sub-form">
                <p>Don't you have an account? <Link to="/signup">Register now.</Link></p>
            </div>
        </div>
    )
}

export default Login