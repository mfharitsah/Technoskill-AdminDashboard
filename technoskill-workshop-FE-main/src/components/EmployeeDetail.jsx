import React, { useEffect, useState } from 'react'

import pp from '../assets/profile/profile-photo.svg'
import delete_logo from '../assets/dashboard/delete_outline.svg'
import edit_logo from '../assets/dashboard/edit.svg'
import upload from '../assets/dashboard/open.svg'

import { useLocation, useNavigate } from 'react-router-dom'
import DeleteConfirmation from './elements/DeleteConfirmation'
import axios from 'axios'
import EditConfirmation from './elements/EditConfirmation'

const EmployeeDetail = () => {

    const storedUser = localStorage.getItem('user');
    const userId = JSON.parse(storedUser).id_user;

    // base UrL
    const baseUrl = "http://localhost:8463";

    const navigate = useNavigate()
    const location = useLocation()
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [division, setDivision] = useState("");
    const [salary, setSalary] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");
    const employeeId = location.state.id

    const [modalDeleteActivated, setModalDeleteActivated] = useState(false);
    const [editState, setEditState] = useState(false)
    const [modalEditActivated, setModalEditActivated] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleEmployeeDetail = async () => {
        try {
            const response = await axios.get(`${baseUrl}/employee/getEmployee/${location.state.id}`)

            if (response.status) {
                const resData = response.data.body;
                setName(resData.name);
                setSalary(resData.salary);
                setDivision(resData.division);
                setPhoneNumber(resData.phone_number);
                setPosition(resData.position);
                setAddress(resData.address);
                setStatus(resData.status);

                setEditState(false);
                setModalEditActivated(false);
            }
        } catch (error) {
            
        }
    }

    const handleEditEmployee = async () => {
        const id_user_employee = userId;
        const id_employee = location.state.id;
        try {
            const response = await axios.post(`${baseUrl}/employee/editEmployeeDetail`, {
                id_user_employee, 
                id_employee, 
                name, 
                salary, 
                division, 
                phone_number, 
                position, 
                address, 
                status
            });
            
            if (response.status) {
                handleEmployeeDetail();
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        handleEmployeeDetail();
    }, [employeeId])

    return (
        <div className={`min-h-screen w-full p-4 lg:p-8`}>
            {modalDeleteActivated && 
                <DeleteConfirmation 
                    onClose={() => setModalDeleteActivated(false)}
                    userId={userId}
                    employeeId={employeeId}
                />
            }

            {
                modalEditActivated &&
                <EditConfirmation
                    onClose={() => setModalEditActivated(false)}
                    handleEditEmployee={handleEditEmployee}
                />
            }
            <div id='page-info' className="w-full flex justify-between text-light">
                <div>
                    <div className='flex gap-2'>
                        <a href='/dashboard' className="hover:text-yellow duration-200 cursor-pointer">Pages / Dashboard</a>
                        <p>/ Detail</p>
                    </div>
                <p className="text-2xl lg:text-3xl font-semibold ">My Dashboard</p>
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

            <div className='mt-10 w-full h-fit flex flex-col gap-3 bg-light p-4 rounded-2xl'>
                <div className={`w-full h-28 rounded-xl relative 
                    ${
                        position == "Head Division" ? "bg-yellow"
                        : position == "Head Deputy Division" ? "bg-pink"
                        : position == "Content Creator" ? "bg-sky"
                        : position == "Relational" ? "bg-green"
                        : "bg-grey-1"
                    }
                    `}>
                    <div className={`absolute -bottom-1/2 left-6 border-4 border-light rounded-full w-28 p-2 
                        ${
                            position == "Head Division" ? "bg-yellow"
                            : position == "Head Deputy Division" ? "bg-pink"
                            : position == "Content Creator" ? "bg-sky"
                            : position == "Relational" ? "bg-green"
                            : "bg-grey-1"
                        }
                        `}>
                        <img src={pp} className="scale-90" alt="" />
                    </div>
                </div>

                <div className='w-full flex justify-end gap-2'>
                    {
                        editState ?
                        <div onClick={() => setModalEditActivated(true)} className='group flex gap-1 items-center justify-center rounded-3xl bg-light border-2 border-dark-2 py-0.5 px-2.5 font-semibold text-dark-2 text-xs cursor-pointer'>
                            <img src={upload} className='scale-110 group-hover:-scale-x-125 group-hover:scale-y-125 duration-300' alt="" />
                            <p>Upload Edit</p>
                        </div>
                        :
                        <div onClick={() => setEditState(true)} className='group flex gap-1 items-center justify-center rounded-3xl bg-dark py-0.5 px-2.5 font-semibold text-light text-xs cursor-pointer'>
                            <img src={edit_logo} className='scale-75 group-hover:-scale-x-100 group-hover:scale-y-105 duration-300' alt="" />
                            <p>Edit Employee</p>
                        </div>
                    }
                    
                    <div onClick={() => setModalDeleteActivated(true)} className='group flex items-center rounded-3xl border-2 border-danger text-danger py-0.5 px-2 font-semibold text-xs active:bg-grey-2 cursor-pointer'>
                        <img src={delete_logo} className='scale-75 group-hover:-scale-x-100 group-hover:scale-y-105 duration-300' alt="" />
                        <p className=' '>Delete Employee</p>
                    </div>
                </div>

                {
                    editState ?
                    <div className='grid grid-cols-2 gap-5 w-4/5 h-fit  mx-8 mb-5'>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Name</p>
                            <input 
                                type="text" 
                                placeholder="Employee's Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-[22rem] border border-dark-2 rounded-sm py-1.5 px-2 text-sm font-normal focus:ring-2 focus:ring-yellow focus:outline-none focus:border-none" 
                            />
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Salary</p>
                            <input 
                                type="text" 
                                placeholder="Employee's Salary" 
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="w-[22rem] border border-dark-2 rounded-sm py-1.5 px-2 text-sm font-normal focus:ring-2 focus:ring-yellow focus:outline-none focus:border-none" 
                            />
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Division</p>
                            <input 
                                type="text" 
                                placeholder="Employee's Division" 
                                value={division}
                                onChange={(e) => setDivision(e.target.value)}
                                className="w-[22rem] border border-dark-2 rounded-sm py-1.5 px-2 text-sm font-normal focus:ring-2 focus:ring-yellow focus:outline-none focus:border-none" 
                            />
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Phone Number</p>
                            <input 
                                type="text" 
                                placeholder="Employee's Phone Number" 
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-[22rem] border border-dark-2 rounded-sm py-1.5 px-2 text-sm font-normal focus:ring-2 focus:ring-yellow focus:outline-none focus:border-none" 
                            />
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Position</p>
                            <input 
                                type="text" 
                                placeholder="Employee's Position" 
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="w-[22rem] border border-dark-2 rounded-sm py-1.5 px-2 text-sm font-normal focus:ring-2 focus:ring-yellow focus:outline-none focus:border-none" 
                            />
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Address</p>
                            <input 
                                type="text" 
                                placeholder="Employee's Address" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-[22rem] border border-dark-2 rounded-sm py-1.5 px-2 text-sm font-normal focus:ring-2 focus:ring-yellow focus:outline-none focus:border-none" 
                            />
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Status</p>
                            <input 
                                type="text" 
                                placeholder="Employee's Status" 
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-[22rem] border border-dark-2 rounded-sm py-1.5 px-2 text-sm font-normal focus:ring-2 focus:ring-yellow focus:outline-none focus:border-none" 
                            />
                        </div>
                    </div>
                    :
                    <div className='grid grid-cols-2 gap-5 w-4/5 h-fit  mx-8 mb-5'>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Name</p>
                            <p className=''>{name}</p>
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Salary</p>
                            <p className=''>{salary}</p>
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Division</p>
                            <p className=''>{division}</p>
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Phone Number</p>
                            <p className=''>{phone_number}</p>
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Position</p>
                            <p className=''>{position}</p>
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Address</p>
                            <p className=''>{address}</p>
                        </div>
                        <div className='name font-semibold leading-6'>
                            <p className='text-grey'>Status</p>
                            <p className=''>{status}</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default EmployeeDetail
