const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secretKey = 'your-secret-key';

const newsRouter = require('./routers/newsRouter');
const preferencesRouter = require('./routers/preferencesRouter');
const userRouter = require('./routers/userRouter');

app.use('/news', newsRouter);
app.use('/preferences', preferencesRouter);
app.use('/user', userRouter);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is running on http://localhost:${port}`);
});



module.exports = app;