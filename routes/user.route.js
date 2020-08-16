const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const db = require('../lowdb.js');

// Get all user
router.get('/', (req, res) => {
	const users = db.get('users').value();
	res.render('users/index', { users });
});

// Search the users
router.get('/search', (req, res) => {
	const users = db.get('users').value();
	const q = req.query.q;
	const matchedUsers = users.filter(user => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', { users: matchedUsers });
});

// Create a user
router.get('/create', (req, res) => {
	res.render('users/create');
});

router.post('/create', (req, res) => {
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
router.get('/:id', (req, res) => {
	const id = req.params.id;
	const user = db.get('users').find({ id}).value();
	res.render('users/profile', { user });
});


module.exports = router;