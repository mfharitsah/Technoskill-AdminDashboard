import React from 'react'

import close from '../../assets/dashboard/close.svg'

const EditConfirmation = ({ onClose, handleEditEmployee }) => {
  return (
    <div className='fixed z-10 left-20 inset-0 w-full min-h-screen flex justify-center items-center bg-dark bg-opacity-80'>
      <div className='bg-light min-w-[30rem] h-fit flex flex-col gap-3 p-8 rounded-2xl shadow-lg'>
        <div className='flex justify-between'>
            <h2 className='text-2xl text-dark-2 font-semibold'>Edit employee's details?</h2>
            <img onClick={onClose} src={close} className='scale-90 cursor-pointer' alt="" />
        </div>
        <div className='bg-grey-1 h-[0.1rem]'></div>
        <p className='font-semibold text-dark-2'>There’s no going back after this.
        <br />Note: this will change the employee’s info</p>
        <div className='mt-6 flex justify-end gap-4'>
          <div onClick={handleEditEmployee} className='group flex py-2 px-4 gap-1 justify-center items-center bg-dark-2 text-light rounded-2xl cursor-pointer'>
            <p className='text-xs font-semibold'>Upload Details</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditConfirmation