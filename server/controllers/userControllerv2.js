import '@babel/polyfill';
import db from '../config/savedb';
import Helper from '../helpers/helper'

const UserControllerv2 = {
    async createNewuser(req, res) {
        const queryText = 'SELECT * FROM users WHERE email=$1';
        const emailcheck = await db.query(queryText, [req.body.email]);
        if (!(emailcheck.rows.length === 0)) {
            return res.status(409).send({
                "status": 409,
                "message": "email already used",
            })
        }
        const createQuery = `INSERT INTO
            users(firstname, lastname, email, password, gender, jobtitle, department, address)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            returning *`;
        const values = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.password,
            req.body.gender,
            req.body.job_title,
            req.body.department,
            req.body.address
        ];
        try {
            const { rows } = await db.query(createQuery, values);
            const token = Helper.generateToken(rows[0].id);
            return res.status(201).send({
                "status": 201,
                "message": "user created successfully",
                "data": {
                    "token": token,
                    "firstname": rows[0].firstname,
                    "lastname": rows[0].lastname,
                    "email":  rows[0].email,
                    "gender": rows[0].gender,
                    "jobtitle": rows[0].jobtitle,
                    "department": rows[0].department,
                    "address":rows[0].address
                }
            })
        } catch (e) {
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },

    async login(req, res) {
        try {
            const queryText = 'SELECT * FROM users WHERE email=$1';
            const { rows } = await db.query(queryText, [req.body.email]);
            if (!rows[0]) {
                return res.status(406).send({
                    "status": 406,
                    "error": "credentials are wrong"
                });
            }
            if (!(rows[0].password === req.body.password)) {
                return res.status(406).send({
                    "status": 406,
                    "error": "password is invalid"
                });
            }
            const token = Helper.generateToken(rows[0].id);
            return res.status(202).send({
                "status": 202,
                "data": {
                    "token": token,
                    "firstname": rows[0].firstname,
                    "lastname": rows[0].lastname,
                    "email":  rows[0].email,
                    "gender": rows[0].gender,
                    "jobtitle": rows[0].jobtitle,
                    "department": rows[0].department,
                    "address":rows[0].address
                }
            });
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    }
}

export default UserControllerv2;