import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('running');
});

AppDataSource.initialize()
  .then(() => {
    console.log('연결 성공');
  })
  .catch((error) => {
    console.error(error);
  });

const port = 4000;
app.listen(port, () => {
  console.log('port:', port);
});
