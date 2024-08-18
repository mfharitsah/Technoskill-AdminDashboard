import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import pp from '../assets/profile/profile-photo.svg'
import employee_info from '../assets/dashboard/employee-info.svg'
import add_employee from '../assets/dashboard/add-employee.svg'
import search from '../assets/dashboard/search.svg'
import filter from '../assets/dashboard/filter.svg'
import open from '../assets/dashboard/open.svg'

export default function HomePage() {

  const storedUser = localStorage.getItem('user');
  const userId = JSON.parse(storedUser).id_user;

  const navigate = useNavigate();

  // base UrL
  const baseUrl = "http://localhost:8463";

  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [totalEmployee, setTotalEmployee] = useState("")
  const [totalDivision, setTotalDivision] = useState("-")

  const [searchText, setSearchText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [positionFilter, setPositionFilter] = useState("");

  const handleGetAllEmployee = async () => {
    try {
      const response = await axios.get(`${baseUrl}/employee/getAllEmployeeByUserId/${userId}`)

      if (response.status) {
        setTotalEmployee(response.data.length);
        setEmployees(response.data)
        setFilteredEmployees(response.data)
      }
    } catch (error) {
      console.log(error);
      alert('Failed to load employees data.');
    }
  }

  const handleCountDivision = async () => {
    try {
      const response = await axios.get(`${baseUrl}/employee/countDivision/${userId}`)

      if (response.status) {
        setTotalDivision(response.data.jumlah_divisi)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetAllEmployee();
    handleCountDivision();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterEmployees(e.target.value, positionFilter);
  };

  const handleFilterChange = (e) => {
    setPositionFilter(e.target.value);
    filterEmployees(searchText, e.target.value);
  };

  const filterEmployees = (text, position) => {
    let filtered = employees;
    if (text !== "") {
      filtered = filtered.filter((emp) =>
        emp.name.toLowerCase().includes(text.toLowerCase()) ||
        emp.position.toLowerCase().includes(text.toLowerCase()) ||
        emp.division.toLowerCase().includes(text.toLowerCase())
      );
    }
    if (position !== "") {
      filtered = filtered.filter((emp) =>
        emp.position.toLowerCase().includes(position.toLowerCase())
      );
    }
    setFilteredEmployees(filtered);
  };

  return (
    <div className="min-h-screen w-full p-4 lg:p-8">
      <div className="w-full flex justify-between text-light">
        <div>
          <p className=" cursor-pointer">Pages / Dashboard</p>
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

      <div className="mt-10 flex gap-5">
        <div className="w-fit h-fit p-2 px-5 flex justify-center items-center gap-2 cursor-pointer rounded-2xl bg-dark text-light">
          <img src={employee_info} alt="" />
          <div className="leading-4">
            <p className="font-semibold">Total Employees</p>
            <p className="font-bold text-lg">{totalEmployee}</p>
          </div>
        </div>
        <div className="w-fit h-fit p-2 px-5 flex justify-center items-center gap-2 cursor-pointer rounded-2xl bg-dark text-light">
          <img src={employee_info} alt="" />
          <div className="leading-4">
            <p className="font-semibold">Total Division</p>
            <p className="font-bold text-lg">{totalDivision}</p>
          </div>
        </div>
      </div>

      <div id="employees-data" className="h-fit w-full mt-10 flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <p className="text-2xl text-light font-semibold">Our Employees</p>
          <img src={add_employee} className="scale-90" alt="" />
        </div>

        <div className="w-full h-fit p-6 flex flex-col items-center bg-dark rounded-2xl gap-6">
          <div id="search-filter" className="w-full flex relative">
            <input 
              type="text" 
              placeholder="Search for employees"
              className="w-full p-2 px-5 border border-light bg-dark-2 outline-none rounded-l-3xl text-light"
              value={searchText}
              onChange={handleSearchChange}
            />
            <button className="p-2 px-4 border border-light bg-dark-2 outline-none rounded-r-3xl hover:bg-dark-1">
              <img src={search} alt="" />
            </button>
            <div id="filter" className="ml-5 p-2 px-5 rounded-lg bg-dark-2 border border-light flex items-center justify-center gap-2 hover:bg-dark-1 cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
              <img src={filter} alt="" />
              <p className="text-light">Filters</p>
            </div>
            {showFilter && (
              <div className="absolute z-20 right-0 mt-12 p-4 bg-dark-2 border border-light rounded-lg">
                <select className="p-2 rounded bg-dark-2 text-light" value={positionFilter} onChange={handleFilterChange}>
                  <option value="">All Positions</option>
                  <option value="Head Division">Head Division</option>
                  <option value="Head Deputy Division">Head Deputy Division</option>
                  <option value="Content Creator">Content Creator</option>
                  <option value="Relational">Relational</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            )}
          </div>

          <div id="employees" className="w-full lg:h-48 2xl:h-96 overflow-x-hidden grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-3">
            {
              filteredEmployees &&
              filteredEmployees.map((emp, i) => (
                <div className="bg-light p-3 rounded-2xl w-52 h-fit" key={i}>
                  <div className={`w-full h-16 rounded-md relative 
                    ${
                      emp.position === "Head Division" ? "bg-yellow"
                      : emp.position === "Head Deputy Division" ? "bg-pink"
                      : emp.position === "Content Creator" ? "bg-sky"
                      : emp.position === "Relational" ? "bg-green"
                      : "bg-grey-1"
                    } `}>
                    <div className={`absolute -bottom-1/2 left-0 right-0 mx-auto border-2 border-light rounded-full w-16 p-2 
                      ${
                        emp.position === "Head Division" ? "bg-yellow"
                        : emp.position === "Head Deputy Division" ? "bg-pink"
                        : emp.position === "Content Creator" ? "bg-sky"
                        : emp.position === "Relational" ? "bg-green"
                        : "bg-grey-1"
                      }
                      `}>
                      <img src={pp} className="scale-110" alt="" />
                    </div>
                  </div>
                  <div className="mt-10 w-full h-fit flex flex-col items-center">
                    <p className="text-base font-semibold leading-4">{emp.name}</p>
                    <p className="text-sm text-grey ">{emp.position}</p>
                    <div className="flex justify-center items-center gap-1 cursor-pointer border border-grey-1 p-0.5 px-3 rounded-3xl mt-2">
                      <div className="text-sm leading-4" 
                        onClick={() => navigate("/dashboard/employee-detail", {
                          state: {
                            id: emp.id_employee,
                          }
                        })}
                      >view profile</div>
                      <img src={open} alt="" />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
