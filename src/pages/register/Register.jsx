import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../../services/Auth'
import { Divider, message } from 'antd'
import "./Register.scss";
import { setAxiosInstanceToken } from '../../services/axiosInstance';

const Register = () => {
    const name = useRef()
    const surname = useRef()
    const email = useRef()
    const password = useRef()
    const navigate = useNavigate();

    const onFinish = async (event) => {
        event.preventDefault();
        try {
            const data = await Auth.register({
                name: name.current.value,
                surname: surname.current.value,
                email: email.current.value,
                password: password.current.value
            })
            message.success(data.message);
            localStorage.setItem('token', data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setAxiosInstanceToken(data.token)
            navigate("/");
        } catch (error) {
            message.error(error.response.data.message);
        }
    }
    return (
        <div className='register'>
            <form onSubmit={onFinish}>
                <h2>POST APP</h2>
                <input ref={name} type="text" placeholder='name' />
                <input ref={surname} type="text" placeholder='surname' />
                <input ref={email} type="email" placeholder='email' />
                <input ref={password} type="password" placeholder='password' />
                <button>Register</button>
                <Divider>Or</Divider>
            </form>
            <div className="sub-form">
                <p>Have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register