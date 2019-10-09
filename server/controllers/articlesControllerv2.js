import '@babel/polyfill';
import db from '../config/savedb';
import Helper from '../helpers/helper';

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
            console.log(e)
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },
}

export default ArticleControllerv2;