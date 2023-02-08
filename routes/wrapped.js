const express = require("express");
const data = require("../data");
const usersData = data.users;
const wrapsData = data.wraps;
const validators = require("../validators");
const xss = require("xss");

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

module.exports = router;
