const uuid = require('uuid');
const db = require('../lowdb.js');

module.exports.index = (req, res) => {
	const users = db.get('users').value();
	res.render('users/index', { users });
}

module.exports.search = (req, res) => {
	const users = db.get('users').value();
	const q = req.query.q;
	const matchedUsers = users.filter(user => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', { users: matchedUsers });
}

module.exports.create = (req, res) => {
	res.render('users/create');
}

module.exports.store = (req, res) => {
	const users = db.get('users').value();
	const newUser = {
		id: uuid.v4(),
		name: req.body.name
	};
	db.get('users')
		.push(newUser)
		.write();
	res.render('users/index', { users });
}

module.exports.show = (req, res) => {
	const id = req.params.id;
	const user = db.get('users').find({ id }).value();
	res.render('users/profile', { user });
}