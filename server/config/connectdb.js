import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const pool  = new Pool({
    connectionString: process.env.DB_URL
});

pool.on('connect', ()=>{
    console.log("connected to db")
})

export default pool;