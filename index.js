const express = require('express');
const app = express();
const port = 3001;
const users = require('./users.js');

// Template engine
app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/users', (req, res) => {
	res.render('users/index', { users });
});

app.get('/users/search', (req, res) => {
	const q = req.query.q;
	const matchedUsers = users.filter(user => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	})
	res.render('users/index', { users: matchedUsers });
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server started on port ${port}`));