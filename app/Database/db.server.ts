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
    
    let flag: boolean; 

    if (!email || email.trim() === "") {
        return flag = true;
    }

    const checkAvailability = `
        SELECT * FROM USERS WHERE EMAIL = ? LIMIT 1;
    `;  // To Limit einai perito edw, alla an 3erw gw 8es
        // na deis an uparxei toulaxiston ena to bazeis 
        // gia na mhn psaxeni olo to db
    const [rows] = await pool.query(checkAvailability, [email]);

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

//Login Page

export async function loginCheck(email: string) {
    
    let flag: boolean; 

    if (!email || email.trim() === "") {
        return flag = false;
    }

    const checkExistance = `
        SELECT * FROM USERS WHERE EMAIL = ? LIMIT 1;
    `;  // To Limit einai perito edw, alla an 3erw gw 8es
        // na deis an uparxei toulaxiston ena to bazeis 
        // gia na mhn psaxeni olo to db
    const [rows] = await pool.query(checkExistance, [email]);

    if ((rows as any[]).length === 0){
        return flag = false;
    }
    else{
        return flag = true;
    }
}


export async function compareHash(email: string, password: string) {
    const getPassword = `
        SELECT * FROM USERS WHERE EMAIL = ? LIMIT 1;
    `
    const [mpampis] = await pool.query(getPassword, [email]);

    if ((mpampis as any[]).length === 0){
        return false;
    }
    
    const hasedPassword = (mpampis as any[])[0].PASSWORD;   //sthn ousia tou les o mpampis einai array, meta tou les apo afto to array pare to [0] dld ta data 
                                                            //kai meta tou les apo to [0] pare to PASSWORD giati sto db exei ID, EMAIL KAI PASSWORD
    return await bcrypt.compare(password, hasedPassword);
}

export async function login(email: string, password: string) {
    let flag1 = await loginCheck(email);
    let flag2;
    let status

    if (!flag1){
        return status = 2;
    }
    else{
        flag2 = await compareHash(email, password);

        if(!flag2){
            return status = 2;
        }
        else{
            return status = 1;
        }
    }
}