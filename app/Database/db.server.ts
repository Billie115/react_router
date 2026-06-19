const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export {pool};

export async function checkEmail(email: string) {
    const checkAvailability = `
        SELECT * FROM USERS WHERE EMAIL = $1 LIMIT 1;
    `;  // To Limit einai perito edw, alla an 3erw gw 8es
        // na deis an uparxei toulaxiston ena to bazeis 
        // gia na mhn psaxeni olo to db
    const availability = await pool.query(checkAvailability, [email]);

    let flag: boolean;

    if (availability.row.length > 0){
        flag = true;
    }
    else{
        flag = false;
    }
    
    return flag;
}

export async function hashFunction(password: string) {
    
    let hasedPassword;
    const salt = bcrypt.genSaltSync(10);
    hasedPassword = bcrypt.hashSync(password, salt);

    return hasedPassword;
}

export async function userInsert(FormData: {email: string, password: string}) {
    
    const flag = await checkEmail(FormData.email);
    
    if (!flag){
        let hasedPassword = hashFunction(FormData.password);
        const VALUES = [FormData.email, hasedPassword];
        const insertNewUser = `
            INSERT INTO USERS (EMAIL, PASSWORD) VALUES ($1, $2) RETURNING *;
        `;
        pool.query(insertNewUser, VALUES);
    }
}