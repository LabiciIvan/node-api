const fs = require('fs');
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf8'));

exports.getAllUsers = (req, res) => {
	res.status(500).json({
		status: 'success',
		data: users
	});
}
exports.getUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		data: 'This route is not yet defined'
	});
}
exports.createUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		data: 'This route is not yet defined'
	});
}
exports.updateUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		data: 'This route is not yet defined'
	});
}
exports.deleteUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		data: 'This route is not yet defined'
	});
}