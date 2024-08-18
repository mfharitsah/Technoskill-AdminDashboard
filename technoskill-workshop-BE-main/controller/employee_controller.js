const pool = require("../config/db_config.js")
const { v4: uuidv4 } = require('uuid')

// Menambah Karyawan
// Nambah 1 kolom, id_user_employee
const addEmployee = async (req, res) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id_employee = '';
    const length = 10;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id_employee += characters[randomIndex];
    }

    try {
        const { id_user_employee, name, division, position, salary, addressStr, phone_number, status } = req.body;
        const response = await pool.query("INSERT INTO employee (id_user_employee, id_employee, name, division, position, salary, address, phone_number, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
            [
                id_user_employee, 
                id_employee, 
                name, 
                division, 
                position, 
                salary, 
                addressStr, 
                phone_number, 
                status
            ])
        res.status(200).send(response.rows[0])
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

// Data seluruh karyawan
// WHERE id_user = id_user_employee
const getAllEmployee = async (req, res) => {
    const { id_user_employee } = req.params
    try {
        const response = await pool.query("SELECT * FROM employee WHERE id_user_employee = $1", [id_user_employee]);
        console.log(response);
        if(!response){
            return res.status(200).json(res.rows)
        }
        res.status(200).send(response.rows)
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

// Mengambil Data Karyawan berdasarkan Id
const getEmployeeById = async (req, res) => {
    try {
        const { id_employee } = req.params
        const response = await pool.query("SELECT * FROM employee WHERE id_employee = $1", [id_employee])

        if(response.rows.length === 0){
            return res.status(500).json({message: "Karyawan tidak ditemukan!"})
        }

        res.status(200).json({ body:response.rows[0] })
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

// Edit Profile 
const editEmployeeDetail = async (req, res) => {
    const {id_user_employee, id_employee, name, salary, division, phone_number, position, address, status} = req.body

    // UPDATE employee SET name = 'Davinn', salary = '5000', division = 'Akpro', phone_number = '+62 82134567890', position = 'Head Division', address = 'Indonesia,Depok,Jalan Antangkalang 3 Nomor 24,16453', status = 'Full Time' WHERE id_user_employee = 'drEFoFNxgz' AND id_employee = 'lpb3cGWeTj' RETURNING *;

    try {
        console.log(id_user_employee, id_employee, name, salary, division, phone_number, position, address, status);
        const response = await pool.query("UPDATE employee SET name = $1, salary = $2, division = $3, phone_number = $4, position = $5, address = $6, status = $7 WHERE id_user_employee = $8 AND id_employee = $9 RETURNING *;",
            [name, salary, division, phone_number, position, address, status, id_user_employee, id_employee])
        if(response.rowCount === 0){
            return res.status(500).json({message: "Gagal memperbarui employee", body: response})
        }
        res.status(200).json({message: "Berhasil memperbarui employee", body: response.rows[0]}) 
        // json({message: "Login berhasil", body: response.rows})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

// Menghapus Data Karyawan
const deleteEmployee = async (req, res) => {
    try {
        const { id_user_employee, id_employee  } = req.body
        await pool.query("DELETE FROM employee WHERE id_user_employee = $1 AND id_employee = $2", [id_user_employee, id_employee])
        res.status(200).json({message: "Berhasil menghapus karyawan"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

//Menghitung banyak divisi karyawan
const countDivByUserId = async (req, res) => {
    try {
        const { id_user_employee } = req.params;
        const response = await pool.query("SELECT COUNT(DISTINCT division) AS jumlah_divisi FROM employee WHERE id_user_employee = $1;", [id_user_employee]);
        res.status(200).send(response.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Tidak dapat mengambil jumlah divisi", error });
    }
};

module.exports = {
    addEmployee,
    getAllEmployee,
    getEmployeeById,
    editEmployeeDetail,
    deleteEmployee,
    countDivByUserId
}