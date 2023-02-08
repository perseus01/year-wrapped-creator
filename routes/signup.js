const express = require("express");
const data = require("../data");
const usersData = data.users;
const validators = require("../validators");
const xss = require("xss");
const date = new Date();

const router = express.Router();

router
	.route("/")
	.get(async (req, res) => {
		if (req.session.user) return res.redirect("/homepage");

		try {
			return res.render("signup");
		} catch (e) {
			console.log(`${date.toLocaleDateString()} error: ${e}`);
			req.render("/something-went-wrong");
		}
	})
	.post(async (req, res) => {
		if (req.session.user) return res.status(400).json({ error: `You are already logged in as ${req.session.user.username}` });

		let username = xss(req.body.username);
		let password = xss(req.body.password);
		try {
			username = validators.validateUsername(username);
			password = validators.validatePassword(password);
		} catch (e) {
			return res.render("signup", {
				statusCode: e.status,
				error: e.message,
			});
		}

		try {
			const newUser = await usersData.createUser(username, password);
			req.session.user = {
				_id: newUser._id,
				username: newUser.username,
			};
			res.redirect("homepage");
		} catch (e) {
			res.render("signup", {
				statusCode: e.status,
				error: e.message,
			});
		}
	});

module.exports = router;
