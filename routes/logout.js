const express = require("express");
const session = require("express-session");

const router = express.Router();

router.route("/").post(async (req, res) => {
	if (req.session.user) {
		try {
			req.session.destroy((err) => {
				if (err) throw err;
			});
			return res.status(200).json({ successful: true });
		} catch (e) {
			return res.status(500).json({ error: e });
		}
	}
});

module.exports = router;
