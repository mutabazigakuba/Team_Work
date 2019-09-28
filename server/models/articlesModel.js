import moment from 'moment';

class ArticleModel {

    constructor (){
        this.articles = [];
    }

    addNewArticle(data){
        const id  = this.articles.length + 1;
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); 
        var year = currentDate.getFullYear();
        var hours = currentDate.getHours();
        const minutes = currentDate.getMinutes(); 
        const seconds = currentDate.getSeconds();
        var dateString = date + "-" +(month + 1) + "-" + year + ' '+ hours+ ':'+minutes+':'+seconds;

        const newArticle = {
            id: id,
            createdOn: dateString,
            title: data.body.title,
            article: data.body.article
        };
        this.articles.push(newArticle);
        return newArticle;
    }
}

export default new ArticleModel;