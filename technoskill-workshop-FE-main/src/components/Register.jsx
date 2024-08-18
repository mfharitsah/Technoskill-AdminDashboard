import React, { useState } from 'react';
import bg from '../assets/authentication/background.svg';
import logo from '../assets/sidebar/logo.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8463/user/register", {
                name,
                email,
                password
            })      

            if (response.status) {
                navigate("/authentication/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkEmail = async (e) => {
        e.preventDefault();
        // Logika untuk memeriksa email atau username
        try {
            const response = await axios.post("http://localhost:8463/user/emailLogin", {
                username
            })      
            
            if (response.status) {
                setIsUsernameCorrect(true);
                setIsUnameWrong(false);
            }
        } catch (error) {
            setIsUnameWrong(true);
            setUsername("")
            console.error(error);
        }

    }

  return (
            <div id="login-page" className="min-h-screen w-full bg-[image:var(--image-url)] bg-cover bg-dark-2"
            style={{ '--image-url': `url(${bg})` }}
        >
            <div id='content' className='w-full lg:w-[55%] min-h-screen bg-dark flex flex-col justify-center items-center px-32 lg:px-52 scale-110'>
                <div className='w-full flex flex-col justify-center items-start'>
                    <div id='logo' className='flex gap-2'>
                        <img src={logo} alt="" />
                        <p className='text-center text-xl lg:text-2xl font-bold text-light'>Halfa<span className='text-xl lg:text-2xl text-grey'>Manage</span></p>
                    </div>
                </div>

                <div className='w-full h-fit flex flex-col items-center mt-8'>
                    <p className='text-sm text-light font-light'>Welcome to HalfaManage!</p>
                    <p className='text-3xl font-semibold text-light leading-5'>Create your Account!</p>
                </div>

                <form id='form-login' onSubmit={handleSubmit} className='w-full h-fit flex flex-col gap-3 mt-8' action="">
                    <div className="w-full text-sm space-y-1">
                        <p className="text-sm text-light" >Name</p>
                        <input
                            type="text"
                            placeholder="Input Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none"
                        />
                    </div>
                    <div className="w-full text-sm space-y-1">
                        <p className="text-sm text-light" >Email</p>
                        <input
                            type="text"
                            placeholder="Input Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none"
                        />
                    </div>
                    <div className="w-full text-sm space-y-1">
                        <p className="text-sm text-light" >Password</p>
                        <input
                            type="password"
                            placeholder="Input Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none"
                        />
                    </div>
                    <div className='flex gap-2 text-sm mx-auto'>
                        <p className='text-light font-light'>Already have an account?</p>
                        <a href="/authentication/register" className='text-blue'>Sign in</a>
                    </div>
                    <div className='w-full h-fit flex justify-center'>
                        <button type='submit' className='bg-blue rounded-lg py-1.5 px-14 text-sm text-light'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Register