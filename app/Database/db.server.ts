import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react_router',
});

export {pool};

export async function checkEmail(email: string) {
    const checkAvailability = `
        SELECT * FROM USERS WHERE EMAIL = ? LIMIT 1;
    `;  // To Limit einai perito edw, alla an 3erw gw 8es
        // na deis an uparxei toulaxiston ena to bazeis 
        // gia na mhn psaxeni olo to db
    const [rows] = await pool.query(checkAvailability, [email]);

    let flag: boolean;

    if ((rows as any[]).length > 0){
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

export async function userInsert(email: string, password: string) {
    
    const flag = await checkEmail(email);
    
    let status;

    if (!flag){
        let hasedPassword = await hashFunction(password);
        const VALUES = [email, hasedPassword];
        const insertNewUser = `
            INSERT INTO USERS (EMAIL, PASSWORD) VALUES (?, ?);
        `;
        await pool.query(insertNewUser, VALUES);
        status = 1;

        return status;
    }
    else{
        status = 2;

        return status;
    }
}

//BALE IF MALAKA AMA EINAI KAINO GIATI APO OTI FENETAI TO KAINO DEN EINAI NULL