const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const router = express.Router();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const ROUTES_LIST = [
	{
		path: "/",
		view: "index",
		title: "CFLSGX团学会_成都外国语学校高新校区团学会",
		description: "",
	},
];

ROUTES_LIST.forEach(({ path, view, ...attrs }) => {
	router.get(path, function (req, res, next) {
		res.type("html");
		res.render(view, { ...attrs });
	});
});

app.use("/", router);
app.use(express.static("public"));

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
