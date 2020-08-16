const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.route.js');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Template engine
app.set('view engine', 'pug');
app.set('views', 'views');

// Router
app.use('/users', userRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));