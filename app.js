const express = require("express");
const app = express();
const session = require("express-session");
const configRoutes = require("./routes");
const util = require("util");
let urlCounter = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", (req, res, next) => {
	let currentUrl = req.headers.host + req.originalUrl;
	if (urlCounter[currentUrl]) {
		urlCounter[currentUrl]++;
	} else {
		urlCounter[currentUrl] = 1;
	}
	let reqBodyLog = {};
	if (req.body) reqBodyLog = { ...req.body };
	if (reqBodyLog.password) reqBodyLog.password = "***";
	console.log(
		`HTTP verb: ${req.method} | url: ${currentUrl} | times requested: ${urlCounter[currentUrl]} | request body: ${util.inspect(reqBodyLog, {
			depth: null,
		})}`
	);
	next();
});

app.use(
	session({
		name: "Year Wrapped Creator",
		secret: "Super Secret String",
		saveUninitialized: false,
		resave: false,
	})
);

configRoutes(app);

app.listen(4000, () => {
	console.log("Server is running on port 4000");
});
