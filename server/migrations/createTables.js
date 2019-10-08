import pool from '../config/connectdb';
import '@babel/polyfill';

const createTable = async () => {
    try {
        const queryText =
            `CREATE TABLE IF NOT EXISTS users(
                id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
                firstname VARCHAR(50),
                lastname VARCHAR(50),
                email VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(50),
                gender VARCHAR(50),
                jobtitle VARCHAR(50),
                department VARCHAR(50),
                address VARCHAR(50)
            );
            CREATE TABLE IF NOT EXISTS articles(
                id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
                createdon DATE DEFAULT CURRENT_DATE,
                title VARCHAR(50),
                article TEXT
            );
            CREATE TABLE IF NOT EXISTS comments(
                id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
                createdon DATE DEFAULT CURRENT_DATE,
                articleid VARCHAR(50),
                articletitle VARCHAR(50),
                comment TEXT,
                username VARCHAR(50),
                email VARCHAR(50) UNIQUE NOT NULL
            );
            `;
            const answer = await pool.query(queryText);
            console.log("Tables created Successfully" +answer);
    }catch(e){
        return e;
    }
    
}

createTable();