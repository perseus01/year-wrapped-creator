const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const signupRoutes = require("./signup");
const wrappedRoutes = require("./wrapped");
const userRoutes = require("./users");

const constructorMethod = (app) => {
	app.use("/login", loginRoutes);
	app.use("/logout", logoutRoutes);
	app.use("/signup", signupRoutes);
	app.use("/wrapped", wrappedRoutes);
	app.use("/users", userRoutes);

	app.use("*", (req, res) => {
		res.status(404).json({ error: "Route not found" });
	});
};

module.exports = constructorMethod;
