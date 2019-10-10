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
                article TEXT,
                userid INT REFERENCES users(id)
            );
            CREATE TABLE IF NOT EXISTS comments(
                id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
                createdon DATE DEFAULT CURRENT_DATE,
                articleid VARCHAR(50) REFERENCES articles(id),
                comment TEXT
            );
            `;
            const answer = await pool.query(queryText);
            console.log("tables created successfully" +answer);
    }catch(e){
        return e.message;
    }
}
createTable();