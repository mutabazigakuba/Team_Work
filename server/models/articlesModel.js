import moment from 'moment';

class ArticleModel {

    constructor (){
        this.articles = [];
    }

    addNewArticle(data){
        const id  = this.articles.length + 1;

        const newArticle = {
            id: id,
            createdOn: this.dateFunction(),
            title: data.body.title,
            article: data.body.article
        };
        this.articles.push(newArticle);
        return newArticle;
    }

    findOne(id) {
        return this.articles.find(article => article.id === id);
    }

    dateFunction(){
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); 
        var year = currentDate.getFullYear();
        var hours = currentDate.getHours();
        const minutes = currentDate.getMinutes(); 
        const seconds = currentDate.getSeconds();
        var dateString = date + "-" +(month + 1) + "-" + year + ' '+ hours+ ':'+minutes+':'+seconds;

        return dateString;
    }

    editArticle (id, data){
        const article = this.findOne(id);
        if (!article) {
            return {
                status: false,
                message: " Article Not Available"
            }
        }
        return {
            status: true,
            data: {
                id: article.id,
                created_on: this.dateFunction(),
                title: data.body.title,
                article: data.body.article
            }
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
                message: "article successfully edited",
            }
        };
    }
}

export default new ArticleModel;