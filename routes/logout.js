const express = require("express");
const session = require("express-session");

const router = express.Router();

router.route("/").get(async (req, res) => {
	if (req.session.user) {
		try {
			req.session.destroy((err) => {
				if (err) throw err;
			});
			return res.status(200).json({ successful: true });
		} catch (e) {
			return res.status(500).json({ error: e });
		}
	} else {
		return res.status(400).json({ successful: false });
	}
});

module.exports = router;
