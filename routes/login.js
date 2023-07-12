const express = require("express");
const data = require("../data");
const usersData = data.users;
const router = express.Router();

router.route("/").post(async (req, res) => {
	if (req.session.user)
		return res.status(400).json({ error: `You are already logged in as ${req.session.user.username}. Please logout to login as a different user` });

	let username = req.body.username;
	let password = req.body.password;

	try {
		if (!username || !password) return res.status(400).json({ error: "Must provide both username and password" });
		const isValidLogin = await usersData.checkUserLogin(username, password);

		if (isValidLogin) {
			req.session.user = { ...isValidLogin };
			console.log("logging session after logging in: ", req.session.user);
			return res.status(200).json(isValidLogin);
		}
	} catch (e) {
		return res.status(400).json({ error: e.toString() });
	}
});

router.route("/check-login").get(async (req, res) => {
	if (req.session.user) return res.status(200).json({ loginStatus: true });
	else return res.status(200).json({ loginStatus: false });
});

module.exports = router;
