const express = require("express");
const data = require("../data");
const usersData = data.users;
const validators = require("../validators");

const router = express.Router();

router.route("/").post(async (req, res) => {
	if (req.session.user)
		return res.status(400).json({ error: `You are logged in as ${req.session.user.username}. Please logout to signup as a new user` });

	let username = req.body.username;
	let password = req.body.password;
	try {
		username = validators.validateUsername(username);
		password = validators.validatePassword(password);
	} catch (e) {
		return res.status(e.status).json({ error: e.message });
	}

	try {
		const newUser = await usersData.createUser(username, password);
		return res.status(200).json(newUser);
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
});

module.exports = router;
