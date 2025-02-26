require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });