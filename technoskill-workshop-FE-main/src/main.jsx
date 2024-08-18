import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import AddEmployeePage from './components/AddEmployeePage.jsx'
import Authentication from './Authentication.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import EmployeeDetail from './components/EmployeeDetail.jsx'
import AccountInfo from './components/AccountInfo.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path:"/dashboard", 
        element: <HomePage />
      },
      {
        path:"/add-employee", 
        element: <AddEmployeePage />
      },
      {
        path:"/account-info", 
        element: <AccountInfo />
      },
      {
        path:"/dashboard/employee-detail", 
        element: <EmployeeDetail />
      }
    ]
  },
  {
    element: <Authentication />,
    children: [
      {
        path:"/authentication/login", 
        element: <Login />
      },
      {
        path:"/authentication/register", 
        element: <Register />
      },
    ]
  },
  {
    path: "/",
    element: <Navigate to="/login" />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
