const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');

const app = express();
const URL_API = 'http://localhost:3000';

app.use(express.json());
app.use(cors({credentials: true, origin: URL_API}));

app.use((req, res) => {
    res.status(404).json({ message: 'A página não foi localizada ou não existe' });
  });

app.use('/users', userRoutes)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

