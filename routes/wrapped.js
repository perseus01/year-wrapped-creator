const express = require("express");
const data = require("../data");
const validators = require("../validators");

const router = express.Router();

router
	.route("/spotify-wrapped")
	.get(async (req, res) => {})
	.post(async (req, res) => {});

router
	.route("/midjourney-wrapped")
	.get(async (req, res) => {})
	.post(async (req, res) => {});

// TODO: Research about fields needed for the stack overflow wrap
// router
// 	.route("/stackoverflow-wrapped")
// 	.get(async (req, res) => {})
// 	.post(async (req, res) => {});

// TODO: Research about fields needed for the reddit wrap
// router
// 	.route("/reddit-wrapped")
// 	.get(async (req, res) => {})
// 	.post(async (req, res) => {});

// TODO: Research about fields needed for the github wrap (suggestions: Top repos contributed to, Total commits/PRs. Code reviews, etc)
// router
// 	.route("/reddit-wrapped")
// 	.get(async (req, res) => {})
// 	.post(async (req, res) => {});

module.exports = router;
