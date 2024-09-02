import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/userDB')
  .then(() => console.log('Database connected'))
  .catch((err) => console.error(err));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
