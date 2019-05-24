const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const adminRoute = require('./routes/admin.route');
const loginRoute = require('./routes/login.route');
const hrRoute = require('./routes/hr.route');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect(config.db);
const app=express();

//COrs middleware
app.use(cors());

//Body parser Middleware
app.use(bodyParser.json());

app.use('/admin', adminRoute);
app.use('/hr', hrRoute);
app.use('/', loginRoute);

let portNumber = config.port;
let port = process.env.PORT || portNumber;
app.listen(port, () => {
    console.log(`Server started on port `+port);
});

// app.listen(port, () =>{
//     console.log('Server started on port '+port);
// });