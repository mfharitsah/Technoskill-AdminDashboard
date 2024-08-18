const pool = require("../config/db_config.js")
// const { v4: uuidv4 } = require('uuid')

const getAllUser = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM user_info");

        res.status(200).send(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}


// Mendapatkan data user berdasarkan Id
const getUserInfoById = async(req, res) => {
    try {
        const { id_user } = req.params
        const response = await pool.query("SELECT * FROM user_info WHERE id_user = $1", [id_user])
        if(response.rows.length === 0){
            return res.status(400).json({message: "User tidak ditemukan"})
        }
        res.status(200).json(response.rows[0])
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

// Register User
const userRegister = async(req, res) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id_user = '';
    const length = 10;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id_user += characters[randomIndex];
    }

    try {
        // const id_user = uuidv4()
        const { name, email, password } = req.body
        await pool.query("INSERT INTO user_info (id_user, name, email, password) VALUES ($1, $2, $3, $4)", [id_user, name, email, password])
        res.status(200).send({message: "Registrasi berhasil. Selamat Bergabung!"})
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

// Edit Profile 
const editProfile = async (req, res) => {
    const {id_user} = req.params
    const {name, email, username, position, phoneNumber, fullAddress} = req.body

    try {
        console.log(id_user, name, email, username, position, phoneNumber, fullAddress);
        const response = await pool.query("UPDATE user_info SET name = $1, email = $2, username = $3, position = $4, phone_number = $5, address = $6 WHERE id_user = $7 RETURNING *",
            [name, email, username, position, phoneNumber, fullAddress, id_user])
        if(response.rowCount === 0){
            return res.status(400).json({message: "Gagal memperbarui profile"})
        }
        res.status(200).json({message: "Berhasil memperbarui status", body: response.rows[0]}) 
        // json({message: "Login berhasil", body: response.rows})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

// Email login
const loginEmail = async(req, res) => {
    try {
        const { username } = req.body
        const response = await pool.query("SELECT * FROM user_info WHERE (username = $1 OR email = $1)", [username])

        if (response.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(response.rows);
    }
    catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

// Password login
const loginPassword = async(req,res) => {
    try {
        const { username, password } = req.body
        const response = await pool.query("SELECT * FROM user_info WHERE (username = $1 OR email = $1) AND password = $2", [username, password])
        if(response.rows.length === 0){
            return res.status(400).json({ message: "Password yang anda masukkan salah, silahkan ulangi kembali" })
        }
        res.status(200).json({message: "Login berhasil", body: response.rows})
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

module.exports = { 
    getAllUser,
    getUserInfoById,
    userRegister,
    loginEmail,
    loginPassword,
    editProfile
}