const express = require("express");
const router = express.Router();
const path = require("path");

router.route("/").get(async (req, res) => {
	res.render("mj", {title: "Midjourney Wrapped"});
});