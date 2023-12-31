const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');

const app = express();
const URL_API = 'http://api-r6fp.onrender.com';

app.use(express.json());
app.use(cors({credentials: true, origin: URL_API}));

app.use('/users', userRoutes)


app.use((req, res, next) => {
    res.status(404).json({ message: 'A página não foi localizada ou não existe!' });
  });
  

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

