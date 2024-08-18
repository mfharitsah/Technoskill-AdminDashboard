import React, { useContext, useState } from 'react';
import bg from '../assets/authentication/background.svg';
import error from '../assets/authentication/error_outline.svg';
import logo from '../assets/sidebar/logo.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUnameWrong, setIsUnameWrong] = useState(false);
    const [isPassWrong, setIsPassWrong] = useState(false);

    const [isUsernameCorrect, setIsUsernameCorrect] = useState(false);

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

    const checkPassword = async (e) => {
        e.preventDefault();
        // Logika untuk memeriksa password
        try {
            const response = await axios.post("http://localhost:8463/user/passwordLogin", {
                username,
                password
            })      
            
            if (response.status) {
                const userLogged = response.data.body[0];
                console.log(userLogged.id_user);
                localStorage.setItem('user', JSON.stringify(userLogged));

                setIsUsernameCorrect(false);
                setIsPassWrong(false);
                navigate(`/account-info`);
            } 
        } catch (error) {
            setIsPassWrong(true);
            setPassword("")
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

                <div className='w-full h-fit flex flex-col gap-2 items-center mt-8'>
                    {
                        isUsernameCorrect ?
                            <p className='text-3xl font-semibold text-light'>Enter your password</p>
                            :
                            <p className='text-3xl font-semibold text-light'>Welcome Back!</p>
                    }
                    <div className='flex gap-2 text-sm'>
                        <p className='text-light font-light'>You're new here?</p>
                        <a href="/authentication/register" className='text-blue'>Create an account</a>
                    </div>
                </div>

                <form id='form-login' onSubmit={(e) => e.preventDefault()} className='w-full h-fit flex flex-col gap-5 mt-5' action="">
                    <div className="w-full text-sm space-y-1">
                        <p className="text-sm text-light" >Email or Username</p>
                        <input
                            type="text"
                            placeholder="Input Email or Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none"
                        />
                        {
                            isUnameWrong &&
                            <div className='flex items-center gap-0.5'>
                                <img src={error} className='scale-75' alt="" />
                                <p className='text-danger text-xs'>Oops, that user does not exist.</p>
                            </div>
                        }

                    </div>
                    {
                        isUsernameCorrect &&
                        <div className="w-full text-sm space-y-1">
                            <p className="text-sm text-light" >Password</p>
                            <input
                                type="password"
                                placeholder="Input Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none"
                            />
                            {
                                isPassWrong &&
                                <div className='flex items-center gap-0.5'>
                                    <img src={error} className='scale-75' alt="" />
                                    <p className='text-danger text-xs'>It seems the password is incorrect. Try Again.</p>
                                </div>
                            }

                        </div>
                    }
                    <div className='w-full h-fit flex justify-center'>
                        {
                            isUsernameCorrect ?
                                <button onClick={checkPassword} className='bg-blue rounded-lg py-1.5 px-14 text-sm text-light'>Sign In</button>
                                :
                                <button onClick={checkEmail} className='bg-blue rounded-lg py-1.5 px-14 text-sm text-light'>Check Email</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
