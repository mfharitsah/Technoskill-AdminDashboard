// Routing User
const express = require("express")
const router = express.Router()
const { userRegister, loginEmail, loginPassword, getAllUser, getUserInfoById, editProfile } = require("../controller/user_controller.js")

// Mendapatkan semua User
router.get("/getAllUser", getAllUser)

// Mendapatkan detail User
router.get("/getUserById/:id_user", getUserInfoById)

// Login dengan memasukkan email 
router.post("/emailLogin", loginEmail)

// Login dengan memasukkan password
router.post("/passwordLogin", loginPassword)

// User register
router.post("/register", userRegister)

// Mengedit profile
router.post("/editProfile/:id_user", editProfile)

module.exports = router
