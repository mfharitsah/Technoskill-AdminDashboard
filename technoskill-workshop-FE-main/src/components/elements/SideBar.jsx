import React, { useEffect, useState } from 'react'
import logo from '../../assets/sidebar/logo.svg'
import person from '../../assets/sidebar/person.svg'
import home from '../../assets/sidebar/home.svg'
import add_person from '../../assets/sidebar/add-person.svg'
import arrow from '../../assets/sidebar/arrow.svg'
import logout_icon from '../../assets/sidebar/logout.svg'
import { ChevronFirst, ChevronLast } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const SideBar = () => {

    const navigate = useNavigate()

    const menus = [
        {
            logo: person,
            name: "Account Info",
            url: `/account-info`
        },
        {
            logo: home,
            name: "Dashboard",
            url: `/dashboard`
        },
        {
            logo: add_person,
            name: "Add Employee",
            url: `/add-employee`
        },
    ]

    const movePage = (menuUrl) => {
        navigate(menuUrl, {
            // state: {
                
            // }
        })
    }

    const [expanded, setExpanded] = useState(true)

  return (
    <div 
        id='sidebar' 
        className={`min-h-screen fixed z-20 top-0 left-0 transition-all duration-300 lg:relative lg:flex lg:flex-col gap-10 space-y-8 lg:space-y-0 rounded-r-2xl lg:rounded-r-3xl bg-dark pt-10 ${expanded ? 'w-64' : 'w-12'}`}
    >
        
        <div id='logo' className={`w-full flex justify-center lg:px-4 ${expanded && "px-4 justify-between gap-5 lg:gap-10"} transition-all duration-300`}>
            <div className={`flex items-center lg:justify-center overflow-hidden duration-300 transition-all ${expanded ? "w-fit lg:w-52" : "w-0"}`}>
                <img src={logo} className='scale-75 lg:scale-90' alt="" />
                <p className='text-center text-xl lg:text-2xl font-bold text-light'>Halfa<span className='text-xl lg:text-2xl text-grey'>Manage</span></p>
            </div>
            <button onClick={() => setExpanded((curr) => !curr)} className='rounded-lg scale-90 bg-grey-1 p-1.5 lg:hidden'>
                { expanded ? <ChevronFirst /> : <ChevronLast/>}
            </button>
        </div>
        <div className='bg-light h-[0.05rem] w-full'></div>
        <div id='menus' className={`flex flex-col justify-between items-center gap-5 w-full h-full px-2 lg:px-4 ${expanded && "px-2"} transition-all duration-300`}>
            <div className='flex flex-col gap-5 w-full px-2 '>
                {
                menus.map((menu, i) => (
                    <div key={i} className='flex justify-between items-center duration-200 cursor-pointer opacity-50 hover:opacity-100' onClick={() => movePage(menu.url)}>
                        <div className='flex gap-2 transition-all duration-300'>
                            <img src={menu.logo} className='' alt="" />
                            <p className={`text-light text-base lg:text-lg transition-all duration-300 ${expanded ? "" : "hidden"}`}>{menu.name}</p>
                        </div>
                        {
                            expanded && <img src={arrow} className='transition-all duration-300' alt="" />
                        }
                    </div>
                ))
            }
            </div>
            <div onClick={() => navigate("/authentication/login")} className='flex justify-center items-center duration-300 cursor-pointer hover:bg-dark-2 mb-40 lg:mb-10'>
                <img src={logout_icon} className='scale-90 lg:scale-100' alt="" />
                <p className={`text-danger text-base lg:text-lg transition-all duration-300 ${!expanded && "hidden"}`}>Logout</p>
            </div>
            
        </div>
    </div>
  )
}

export default SideBar
