import express from 'express';
// import routes from './routes/routes';
import routesv2 from './routes/routesv2';
import body_parser from 'body-parser';

const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
// app.use(routes);
app.use(routesv2)

app.use('*', (req, res) => {
  res.status(405).send({
      "status": 405,
      "error": "Method Not Allowed"
  });
});

app.listen(PORT, () =>{ console.log(`Listening on port ${PORT}`)});


export default app;