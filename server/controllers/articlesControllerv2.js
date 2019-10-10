import '@babel/polyfill';
import db from '../config/savedb';

const ArticleControllerv2 = {
    async createArticle(req, res) {
        const createQuery = `INSERT INTO
            articles(title, article, userid)
            VALUES($1, $2, $3)
            returning *`;
        const values = [
            req.body.title,
            req.body.article,
            req.user.rows[0].id
        ];
        try {
            const { rows } = await db.query(createQuery, values);
            return res.status(200).send({
                "status": 200,
                "message": "article successfully created",
                "data": {
                    "title": rows[0].title,
                    "article": rows[0].article 
                }
            })
        } catch (e) {
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },

    async updateArticle(req, res) {
        const findarticle = 'SELECT * FROM articles WHERE id=$1';
        try {
            const { rows } = await db.query(findarticle, [req.params.articleid]);
            if (!rows[0]) {
                return res.status(404).send({
                    "status": 404,
                    "error": "article not found"
                });
            }
            if(req.user.rows[0].id != rows[0].userid){
                return res.status(401).send({
                    "status": 401,
                    "error": " not authorized"
                });
            }
            const updatequery = `UPDATE articles SET title=$1, article=$2 WHERE id=$3 returning *`;
            const values = [
                req.body.title,
                req.body.article,
                req.params.articleid
            ];
            const data = await db.query(updatequery, values);
            return res.status(200).send({
                "status": 200,
                "data": data.rows[0]
            });
        } catch (e) {
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },
    async viewAll(req, res) {
        const getQuery = `SELECT * FROM articles ORDER BY id DESC `;
        try {
            const { rows } = await db.query(getQuery);
            if (!rows[0]) {
                return res.status(404).send({
                    "status": 404,
                    "error": "no articles found"
                });
            }
            return res.status(200).send({
                "status": 200,
                "message": "success",
                "data": rows
            })
        } catch (e) {
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },
    async deletedArticle(req, res) {
        const findarticle = 'SELECT * FROM articles WHERE id=$1';
        try {
            const { rows } = await db.query(findarticle, [req.params.articleid]);
            if (!rows[0]) {
                return res.status(404).send({
                    "status": 404,
                    "error": "article not found"
                });
            }
            if(req.user.rows[0].id != rows[0].userid){
                return res.status(401).send({
                    "status": 401,
                    "error": " not allowed"
                });
            }
            const deleteQuery = 'DELETE FROM articles WHERE id=$1 returning *';
            const { row } = await db.query(deleteQuery, [req.params.articleid]);
            return res.status(202).send({
                "status": 202,
                "message": "article successfully deleted"
            });
        } catch (e) {
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },

    async createComment(req, res) {
        const findarticle = 'SELECT * FROM articles WHERE id=$1';
        try {
            const { rows } = await db.query(findarticle, [req.params.articleid]);
            if (!rows[0]) {
                return res.status(404).send({
                    "status": 404,
                    "error": "article not found"
                });
            }
            const createQuerys = `INSERT INTO
            comments(articleid, comment)
            VALUES($1, $2)
            returning *`;
            const values = [
                rows[0].id,
                req.body.comment,
            ]

            const data = await db.query(createQuerys, values);
            return res.status(201).send({
                "status": 201,
                "message": "comment created successfully",
                "data": {
                    "comment": data.rows[0].comment
                }
            })
        } catch (error) {
            res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },

    async displayOne(req, res){
        try{
            const findarticle = 'SELECT * FROM articles WHERE id=$1';
            const { rows } = await db.query(findarticle, [req.params.articleid]);
            if (!rows[0]) {
                return res.status(404).send({
                    "status": 404,
                    "error": "article not found"
                });
            }
            const findcomments = 'SELECT * FROM comments WHERE articleid=$1';
            const data = await db.query(findcomments, [req.params.articleid]);
            return res.status(200).send({
                "status": 200,
                "message": "comment created successfully",
                "data": {
                    "comment": data.rows
                }
            })
        }catch(e){

        }
    }
}
export default ArticleControllerv2;