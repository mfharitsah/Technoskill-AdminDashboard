import React, { useContext, useEffect, useState } from 'react'

import pp from '../assets/profile/profile-photo.svg'
import bg from '../assets/profile/background.svg'
import { useUser } from '../context/UserContext'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

const AccountInfo = () => {

    const storedUser = localStorage.getItem('user');
    const userId = JSON.parse(storedUser).id_user;

    // base UrL
    const baseUrl = "http://localhost:8463";

    const [editState, setEditState] = useState(false)

    const [name, setName] = useState("-");
    const [username, setUsername] = useState("-");
    const [email, setEmail] = useState("-");
    const [phoneNumber, setPhoneNumber] = useState("-");
    const [position, setPosition] = useState("-");
    const [country, setCountry] = useState("-");
    const [stateCity, setStateCity] = useState("-");
    const [address, setAddress] = useState("-");
    const [zipCode, setZipCode] = useState("-");

    const handleGetAccountInfo = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/getUserById/${userId}`)

            if (response.status) {
                const loggedUser = response.data;

                setName(loggedUser.name)
                setUsername(loggedUser.username)
                setEmail(loggedUser.email)
                setPhoneNumber(loggedUser.phone_number)
                setPosition(loggedUser.position)
                
                if (loggedUser.address != null) {
                    const splitAddress = loggedUser.address.split(",");
                    setCountry(splitAddress[0])
                    setStateCity(splitAddress[1])
                    setAddress(splitAddress[2])
                    setZipCode(splitAddress[3])
                }

            }
        } catch (error) {
            console.log(error);
            alert("Failed to get user data");
        }
    }

    const handleEditDetails = async () => {
        const fullAddress = country + "," + stateCity + "," + address + "," + zipCode;
        console.log(fullAddress);
        try {
            const response = await axios.post(`${baseUrl}/user/editProfile/${userId}`, {
                name, 
                email, 
                username, 
                position, 
                phoneNumber, 
                fullAddress
            })

            if (response.status) {
                handleGetAccountInfo()
                // const editedProfile = response.data.body;

                // setName(editedProfile.name)
                // setUsername(editedProfile.username)
                // setEmail(editedProfile.email)
                // setPhoneNumber(editedProfile.phoneNumber)
                // setPosition(editedProfile.position)
                // setCountry(editedProfile.country)
                // setStateCity(editedProfile.stateCity)
                // setAddress(editedProfile.address)
                // setZipCode(editedProfile.zipCode)

                setEditState(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetAccountInfo();
    }, [userId])

  return (
    <div className='bg-[image:var(--image-url)] bg-cover relative flex flex-col min-h-screen w-full p-4 lg:p-8' style={{'--image-url': `url(${bg})`}}>
        <div className="w-full flex justify-between text-light">
            <div>
                <p className=" cursor-pointer">Pages / Account Info</p>
                <p className="text-2xl lg:text-3xl font-semibold ">My Account</p>
            </div>
            <div id="profile" className="group border border-light w-fit h-fit flex justify-center items-center gap-2 cursor-pointer p-2 px-3 rounded-xl bg-dark-2" onClick={() => navigate("/account-info")}>
                <div className="rounded-full bg-yellow w-12 h-12 p-1 group-hover:-scale-x-100 duration-200">
                    <img src={pp} className="scale-75" alt="" />
                </div>
                <div className="leading-4">
                    <p className="font-semibold">Muhammad Fahish</p>
                    <p className="text-xs">Head Admin</p>
                </div>
            </div>
        </div>

        <div id='general' className='group flex gap-5 items-center mt-10'>
            <div className='bg-yellow rounded-full p-4 group-hover:-scale-x-100 duration-200'>
                <img src={pp} className='w-18 h-16' alt="" />
            </div>
            {
                    editState ?
                    <div className='text-light leading-5'>
                        <p className='text-sm text-grey-1'>-</p>
                        <p className='font-semibold'>-</p>
                        <p className='italic text-grey'>-</p>
                    </div>
                    :
                    <div className='text-light leading-5'>
                        <p className='text-sm text-grey-1'>@{username}</p>
                        <p className='font-semibold'>{name}</p>
                        <p className='italic text-grey'>{country + ", " + stateCity}</p>
                    </div>   
                }
        </div>

        <div id='personal-info' className='w-[85%] mt-5'>
            <div className={`flex justify-between text-light font-semibold`}>
                <p className='text-2xl'>Personal Information</p>
                <button onClick={() => setEditState(curr => !curr)} className={`text-xs rounded-3xl p-0.5 px-4 bg-dark ${editState && "text-danger"}`}>
                    { editState ? "cancel edit" : "edit details"}
                </button>
            </div>
            {
                editState ?
                <div id='detail-info' className='bg-dark grid grid-cols-2 gap-5 w-full h-fit rounded-3xl mt-3 mb-5 p-5 px-7 py-8 text-dark text-sm'>
                    <div className="text-sm space-y-1 w-fit">
                        <p className="text-sm text-light" >Name</p>
                        <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                        />
                    </div>
                    <div className="text-sm space-y-1 w-fit">
                        <p className="text-sm text-light" >Username</p>
                        <input 
                        type="text" 
                        placeholder="Your Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                        />
                    </div>
                    <div className="text-sm space-y-1 w-fit">
                        <p className="text-sm text-light" >Email</p>
                        <input 
                        type="text" 
                        placeholder="Your Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                        />
                    </div>
                    <div className="text-sm space-y-1 w-fit">
                        <p className="text-sm text-light" >Position</p>
                        <input 
                        type="text" 
                        placeholder="Your Username" 
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                        />
                    </div>
                    <div className="text-sm space-y-1 w-fit">
                        <p className="text-sm text-light" >Phone</p>
                        <input 
                        type="text" 
                        placeholder="+XX XXXXX" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                        />
                    </div>
                </div>
                :
                <div id='detail-info' className='bg-dark grid grid-cols-2 gap-5 w-full h-fit rounded-3xl mt-3 mb-5 p-5 px-7 py-8 text-light text-sm'>
                    <div className='name font-semibold leading-5'>
                        <p className='text-grey-1'>Name</p>
                        <p className=''>{name}</p>
                    </div>
                    <div className='name font-semibold leading-5'>
                        <p className='text-grey-1'>Username</p>
                        <p className=''>@{username}</p>
                    </div>    
                    <div className='name font-semibold leading-5'>
                        <p className='text-grey-1'>Email</p>
                        <p className=''>{email}</p>
                    </div>
                    <div className='name font-semibold leading-5'>
                        <p className='text-grey-1'>Position</p>
                        <p className=''>{position}</p>
                    </div>
                    <div className='name font-semibold leading-5'>
                        <p className='text-grey-1'>Phone</p>
                        <p className=''>{phoneNumber}</p>
                    </div>
                </div>
            }

        </div>

        <div id='personal-address' className='w-[85%] mt-5'>
            <div className='flex justify-between text-light font-semibold'>
                <p className='text-2xl'>Personal Address</p>
            </div>
            {
                editState ?
                <div id='detail-address' className='bg-dark grid grid-cols-2 gap-5 w-full h-fit rounded-3xl mt-3 mb-5 p-5 px-7 py-8 text-dark text-sm'>
                    <div className="text-sm space-y-1 w-fit">
                        <p className="text-sm text-light" >Country</p>
                        <input 
                        type="text" 
                        placeholder="Your Country" 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                        />
                    </div>
                    <div className="text-sm space-y-1 w-fit">
                        <p className="text-sm text-light" >State City</p>
                        <input 
                        type="text" 
                        placeholder="Your State City" 
                        value={stateCity}
                        onChange={(e) => setStateCity(e.target.value)}
                        className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                        />
                    </div>
                    <div className="text-sm space-y-1 w-fit">
                        <p className="text-sm text-light" >Address</p>
                        <input 
                        type="text" 
                        placeholder="Your Address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                        />
                    </div>
                    <div className="text-sm space-y-1 w-fit">
                        <p className="text-sm text-light" >Zip Code</p>
                        <input 
                        type="text" 
                        placeholder="Your Zip Code" 
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                        />
                    </div>
                </div>
                :
                <div id='detail-info' className='bg-dark grid grid-cols-2 gap-5 w-full h-fit rounded-3xl mt-3 p-5 px-7 py-8 text-light'>
                    <div className='name font-semibold leading-5'>
                        <p className='text-grey-1'>Country</p>
                        <p className=''>{country}</p>
                    </div>
                    <div className='name font-semibold leading-5'>
                        <p className='text-grey-1'>State City</p>
                        <p className=''>{stateCity}</p>
                    </div>
                    <div className='name font-semibold leading-5'>
                        <p className='text-grey-1'>Address</p>
                        <p className=''>{address}</p>
                    </div>
                    <div className='name font-semibold leading-5'>
                        <p className='text-grey-1'>Zip Code</p>
                        <p className=''>{zipCode}</p>
                    </div>
                </div>
            }
        </div>
        {
            editState && 
            <div className='w-[85%] flex justify-end'>
                <button onClick={handleEditDetails} className='bg-blue hover:scale-90 duration-200 rounded-3xl py-1 px-5 font-semibold'>Update</button>
            </div>
        }
    </div>
  )
}

export default AccountInfo