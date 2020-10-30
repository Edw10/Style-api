'use strict';

const mongoose = require('mongoose');
const {app} = require('./app');
const {PORT, MONGO_URI, MONGO_TEST} = require('./config');

app.listen(PORT, () => {
    console.log(`API REST running on http://localhost:${PORT}`);
});

mongoose.connect(MONGO_URI,
    { useUnifiedTopology: true,
         useNewUrlParser: true, 
         useCreateIndex: true,
         useFindAndModify: false}, (err, res) => {
        if (err) {
            return console.log(`error to connect with database: ${err}`)
        } else {
            console.log(`connection database success`);
        }
    });