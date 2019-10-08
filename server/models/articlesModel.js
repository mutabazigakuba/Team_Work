import moment from 'moment';
import sortJsonArray from 'sort-json-array';
import userModel from '../models/userModel';

class ArticleModel {

    constructor() {
        this.articles = [];
        this.comments = [];
        this.new_comments = [];
    }

    addNewArticle(newid, data) {
        const id = this.articles.length + 1;
        const userinfo = userModel.findOne(newid)
        const userName = userinfo.first_name

        const newArticle = {
            id: id,
            createdOn: this.dateFunction(),
            title: data.body.title,
            article: data.body.article,
            username: userName
        };
        this.articles.push(newArticle);
        return newArticle;
    }

    findOne(id) {
        return this.articles.find(article => article.id === id);
    }

    dateFunction() {
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        var dateString = date + "-" + (month + 1) + "-" + year + ' ' + hours + ':' + minutes + ':' + seconds;

        return dateString;
    }

    editArticle(id, data) {
        const article = this.findOne(id);
        if (!article) {
            return {
                status: false,
                message: " Article Not Available"
            }
        }
        const index = this.articles.indexOf(article);
        this.articles[index].title = data.body.title;
        this.articles[index].article = data.body.article;
        this.articles[index].createdOn = this.dateFunction()

        return {
            status: true,
            data: this.articles[index]
        }
    }

    deleteArticle(id) {
        const article = this.findOne(id);
        if (!article) {
            return {
                status: false,
                message: "Article Not  Found"
            }
        }
        const index = this.articles.indexOf(article);
        this.articles.splice(index, 1);
        return {
            status: true,
            data: {
                message: "article successfully deleted",
            }
        };
    }

    commentOnArticle(id, data) {
        const article = this.findOne(id);
        if (!article) {
            return {
                status: false,
                message: " Article Not Available"
            }
        }
        const commentId = this.comments.length + 1;
        const newComment = {
            id: commentId,
            createdOn: this.dateFunction(),
            article_id: article.id,
            articleTitle: article.title,
            article: article.article,
            comment: data.body.comment,
            username: data.body.username,
            email: data.body.email,
        };
        this.comments.push(newComment);
        return {
            status: true,
            data: newComment
        };
    }

    findAll() {
        return sortJsonArray(this.articles, 'id', 'des');
    }

    findOneArticle(id) {
        const singleArticle = this.findOne(id);
        if (!singleArticle) {
            return {
                status: false,
                message: " Article Not Available"
            }
        }
        // const index = this.articles.indexOf(singleArticle);
        const comments = this.comments.find(comment => comment.id === id);
        if (!comments) {
            return {
                status: true,
                data: {
                    id: singleArticle.id,
                    createdOn: singleArticle.createdOn,
                    title: singleArticle.title,
                    article: singleArticle.article,
                    authorId: singleArticle.username,
                    comments: this.comments
                }
            }
        }
        
        for (let i = 0; i < this.comments.length; i ++){
            if (this.comments[i].article_id === id){
                this.new_comments.push(this.comments[i]);
            }
        }
        return {
            status: true,
            data: {
                id: singleArticle.id,
                createdOn: singleArticle.createdOn,
                title: singleArticle.title,
                article: singleArticle.article,
                authorId: singleArticle.username,
                comments: this.new_comments
            }
        }
    }
}

export default new ArticleModel;