const express = require("express");
const data = require("../data");
const wrapsData = data.wraps;
const validators = require("../validators");

const router = express.Router();

router
	.route("/spotify")
	.get(async (req, res) => {})
	.post(async (req, res) => {});

router
	.route("/midjourney")
	.get(async (req, res) => {
		if (!req.session.user) return;
		try {
			const midJourneyWraps = await wrapsData.getMidjourneyWraps(req.session.user._id);
			return res.status(200).json(midJourneyWraps);
		} catch (e) {
			return res.status(e.status ? e.status : 500).json({ error: e.message ? e.message : e.toString() });
		}
	})
	.post(async (req, res) => {
		if (!req.session.user) return res.status(401).json({ error: "Must login to save wrap" });
		try {
			let image = null;
			if (req.files) image = req.files.thumbnailImage;
			let newWrap = await wrapsData.createMidjourneyWrap(
				req.session.user._id,
				req.body.topArtists,
				req.body.topKeywords,
				req.body.hoursUsed,
				req.body.imagesCreated,
				req.body.backgroundGradientStart,
				req.body.backgroundGradientEnd,
				image
			);
			return res.status(200).json({ wrap: newWrap });
		} catch (e) {
			return res.status(e.status ? e.status : 500).json({ error: e.message ? e.message : e.toString() });
		}
	});

// TODO: Research about fields needed for the stack overflow wrap
// router
// 	.route("/stackoverflow")
// 	.get(async (req, res) => {})
// 	.post(async (req, res) => {});

// TODO: Research about fields needed for the reddit wrap
// router
// 	.route("/reddit")
// 	.get(async (req, res) => {})
// 	.post(async (req, res) => {});

// TODO: Research about fields needed for the github wrap (suggestions: Top repos contributed to, Total commits/PRs. Code reviews, etc)
// router
// 	.route("/github")
// 	.get(async (req, res) => {})
// 	.post(async (req, res) => {});

module.exports = router;
