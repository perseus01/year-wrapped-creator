const mjRoutes = require("./mjwrapped");
const path = require("path");

const constructorMethod = (app) => {
  app.use("/", res.render("homepage", { title: "Home" }));
  app.use("/mj", mjRoutes);
  app.use("*", (req, res) =>
    res.sendFile(path.resolve("static/notfound.html"))
  );
};

module.exports = constructorMethod;
