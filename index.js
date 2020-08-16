const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const uuid = require('uuid');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Small JSON Database
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

// Set some default database
db.defaults({ users: [] })
	.write();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Template engine
app.set('view engine', 'pug');
app.set('views', 'views');

// Get all user
app.get('/users', (req, res) => {
	const users = db.get('users').value();
	res.render('users/index', { users });
});

// Search the users
app.get('/users/search', (req, res) => {
	const users = db.get('users').value();
	const q = req.query.q;
	const matchedUsers = users.filter(user => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', { users: matchedUsers });
});

// Create a user
app.get('/users/create', (req, res) => {
	res.render('users/create');
});

app.post('/users/create', (req, res) => {
	const users = db.get('users').value();
	const newUser = {
		id: uuid.v4(),
		name: req.body.name
	};
	db.get('users')
		.push(newUser)
		.write();
	res.render('users/index', { users });
});

// View a user
app.get('/users/:id', (req, res) => {
	const id = req.params.id;
	const user = db.get('users').find({ id}).value();
	res.render('users/profile', { user });
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server started on port ${port}`));