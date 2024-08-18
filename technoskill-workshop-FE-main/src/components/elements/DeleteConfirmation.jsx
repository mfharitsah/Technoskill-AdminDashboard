import React from 'react'

import close from '../../assets/dashboard/close.svg'
import delete_forever from '../../assets/dashboard/delete_forever.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DeleteConfirmation = ({ onClose, userId, employeeId }) => {

    const navigate = useNavigate()

    // base UrL
    const baseUrl = "http://localhost:8463";

    const handleDeleteEmployee = async () => {
        const id_user_employee = userId
        const id_employee = employeeId
        console.log(id_user_employee, id_employee);
        try {
            const response = await axios.delete(`${baseUrl}/employee/deleteEmployee`, {
            data: { id_user_employee, id_employee }
        });

            if(response.status) {
                console.log(response.status);
                navigate("/dashboard")
            }
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div className='fixed z-10 left-20 inset-0 w-full min-h-screen flex justify-center items-center bg-dark bg-opacity-80'>
      <div className='bg-light min-w-[30rem] w-fit h-fit flex flex-col gap-3 p-8 rounded-2xl shadow-lg'>
        <div className='flex justify-between'>
            <h2 className='text-2xl text-dark-2 font-semibold'>Delete This Employee?</h2>
            <img onClick={onClose} src={close} className='scale-90 cursor-pointer' alt="" />
        </div>
        <div className='bg-grey-1 h-[0.1rem]'></div>
        <p className='font-semibold text-dark-2'>There’s no going back after this.
        <br />Note: this will delete the employee’s info</p>
        <div className='mt-6 flex justify-end gap-4'>
          <div onClick={handleDeleteEmployee} className='group flex py-2 px-4 gap-1 justify-center items-center bg-danger text-light rounded-2xl cursor-pointer'>
            <img src={delete_forever} className='scale-90 group-hover:scale-y-110 group-hover:-scale-x-100 duration-300' alt="" />
            <p className='text-xs font-semibold'>Delete Employee</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation
