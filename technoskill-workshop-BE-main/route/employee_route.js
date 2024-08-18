// Routing Employee
const { addEmployee, getAllEmployee, getEmployeeById, editEmployeeDetail, deleteEmployee, countDivByUserId } = require("../controller/employee_controller")
const express = require("express")
const router = express.Router()

// Mendapatkan seluruh data Employee dari seorang user
router.get("/getAllEmployeeByUserId/:id_user_employee", getAllEmployee)

// Mendapatkan detail Employee
router.get("/getEmployee/:id_employee", getEmployeeById)

// Mengedit detail employee
router.post("/editEmployeeDetail", editEmployeeDetail)

// Menambah employee
router.post("/addEmployee", addEmployee)

// Menghapus Employee
router.delete("/deleteEmployee", deleteEmployee)

// Menghitung jumlah divisi
router.get("/countDivision/:id_user_employee", countDivByUserId)

module.exports = router








