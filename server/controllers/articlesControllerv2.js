import '@babel/polyfill';
import db from '../config/savedb';

const ArticleControllerv2 = {
    async createArticle(req, res) {
        const createQuery = `INSERT INTO
            articles(title, article)
            VALUES($1, $2)
            returning *`;
        const values = [
            req.body.title,
            req.body.article,
        ];
        try {
            const { rows } = await db.query(createQuery, values);
            return res.status(200).send({
                "status": 200,
                "message": "article successfully created",
                "data": rows
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
        const getQuery = `SELECT * FROM articles`;
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
            const deleteQuery = 'DELETE FROM articles WHERE id=$1 returning *';
            const { row } = await db.query(deleteQuery, [req.params.articleid]);
            return res.status(204).send({
                "status": 204,
                "message": "article successfully deleted"
            });
        } catch (e) {
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    }
}
export default ArticleControllerv2;