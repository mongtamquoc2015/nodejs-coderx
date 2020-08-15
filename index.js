const express = require('express');
const app = express();
const port = 3001;
const users = require('./users.js');

// Template engine
app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/users', (req,res) => {
	res.render('user/index', {users})
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server started on port ${port}`));