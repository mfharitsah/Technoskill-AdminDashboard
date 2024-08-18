import { useEffect, useState } from "react";
import axios from 'axios';

import pp from '../assets/profile/profile-photo.svg'
import bg from '../assets/profile/background.svg'
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AddEmployeePage() {

  const storedUser = localStorage.getItem('user');
  const userId = JSON.parse(storedUser).id_user;

    // base UrL
    const baseUrl = "http://localhost:8463";

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("-");
  const [country, setCountry] = useState("");
  const [stateCity, setStateCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

  const personalInfoForm = [
    {
      name: "Name",
      placeholder: "Input Name",
      value: name,
      changeFunc: setName,
    },
    {
      name: "Division",
      placeholder: "Input Division",
      value: division,
      changeFunc: setDivision,
    },
    {
      name: "Phone Number",
      placeholder: "+XX XXXXXXXXXXXX",
      value: phoneNumber,
      changeFunc: setPhoneNumber,
    },
    {
      name: "Salary",
      placeholder: "$XXX (without period & comma)",
      value: salary,
      changeFunc: setSalary,
    },
  ];

  const personalAddressForm = [
    {
      name: "Country",
      placeholder: "Input Country",
      value: country,
      changeFunc: setCountry,
    },
    {
      name: "State City",
      placeholder: "Input State City",
      value: stateCity,
      changeFunc: setStateCity,
    },
    {
      name: "Address",
      placeholder: "Input Address",
      value: address,
      changeFunc: setAddress,
    },
    {
      name: "Zip Code",
      placeholder: "Input Zip Code",
      value: zipCode,
      changeFunc: setZipCode,
    },
  ];

  const handleAddEmployee = async () => {
    try {
      const addressStr = address + ", " + stateCity + ", " + country + ", " + zipCode;
      const id_user_employee = userId;
      const phone_number = phoneNumber;

      console.log(id_user_employee, 
        name, 
        division, 
        position, 
        salary, 
        addressStr, 
        phone_number, 
        status);

      const response = await axios.post(`${baseUrl}/employee/addEmployee`, {
        id_user_employee, 
        name, 
        division, 
        position, 
        salary, 
        addressStr, 
        phone_number, 
        status
      })

      if (response.status) {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log(error);
      alert("Gagal menambahkan karyawan")
    }
  };

  return (
    <div className='bg-[image:var(--image-url)] bg-cover relative min-h-screen w-full p-4 lg:p-8' style={{'--image-url': `url(${bg})`}}>
      <div className="w-full flex justify-between text-light">
        <div>
            <p className=" cursor-pointer">Pages / Add Employee</p>
            <p className="text-2xl lg:text-3xl font-semibold ">Add Employee</p>
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

      <div id="info-form" className="w-[85%] h-fit flex flex-col mt-5 bg-light rounded-3xl px-5 py-5">
        <p className="text-dark text-2xl text-center font-semibold">New Employee Details</p>
        <div id="personal-info" className="bg-grey-2 w-full h-fit p-5 mt-4 rounded-2xl text-dark">
          <p className="text-xl font-semibold">Personal Information</p>
          <div className="w-full grid grid-cols-2 place-content-end gap-2 mt-2">
            {
              personalInfoForm.map((menu, i) => (
              <div className="text-sm space-y-1 w-fit" key={i}>
                <p className="text-sm" >{menu.name}</p>
                <input 
                  type="text" 
                  placeholder={menu.placeholder} 
                  value={menu.value}
                  onChange={(e) => menu.changeFunc(e.target.value)}
                  className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                />
              </div>
              ))
            }
            <div className="text-sm space-y-1 w-fit">
              <p className="text-sm">Position</p>
              <select 
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none"
              >
                <option value="">Select Position</option>
                <option value="Head Division">Head Division</option>
                <option value="Head Deputy Division">Head Deputy Division</option>
                <option value="Staff">Staff</option>
                <option value="Content Creator">Content Creator</option>
                <option value="Relational">Relational</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
              </select>
            </div>
          </div>
        </div>
        <div id="personal-address" className="bg-grey-2 w-full h-fit p-5 mt-4 rounded-2xl text-dark">
          <p className="text-xl font-semibold">Personal Address</p>
          <div className="w-full grid grid-cols-2 place-content-end gap-2 mt-2">
            {
              personalAddressForm.map((menu, i) => (
              <div className="text-sm space-y-1 w-fit" key={i}>
                <p className="text-sm" >{menu.name}</p>
                <input 
                  type="text" 
                  placeholder={menu.placeholder} 
                  value={menu.value}
                  onChange={(e) => menu.changeFunc(e.target.value)}
                  className="w-[22rem] border border-grey rounded-sm py-1.5 px-2 text-xs focus:ring-2 focus:ring-yellow focus:outline-none" 
                />
              </div>
              ))
            }
          </div>
        </div>
        <button 
          className="bg-dark-2 hover:bg-yellow hover:text-dark shadow-lg duration-200 mx-auto py-1.5 px-6 text-light font-semibold rounded-3xl mt-5" 
          onClick={handleAddEmployee}
        >
          Add Employee
        </button>
      </div>
    </div>
  );
}
