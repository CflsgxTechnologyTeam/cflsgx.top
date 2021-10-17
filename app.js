const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const router = express.Router();
const ROUTES_LIST = require("./site.config").routes_list

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

ROUTES_LIST.forEach(({ path, view, ...attrs }) => {
	router.get(path, function (req, res, next) {
		res.type("html");
		res.render(view, { ...attrs });
	});
});

app.use("/", router);
app.use(express.static("public"));

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
