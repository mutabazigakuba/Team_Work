import express from 'express';
import routes from './routes/routes';
import body_parser from 'body-parser';

const app = express()

app.use(express.json())
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(routes);

app.use('*', (req, res) => {
  res.status(405).send({
      "status": 405,
      "error": "Method Not Allowed"
  });
});

app.listen(8080)
console.log('app running on port ', 3000);

export default app;