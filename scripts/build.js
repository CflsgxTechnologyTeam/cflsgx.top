const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const SITE_CONFIG = require("../site.config.js");

/**
 * Ejs Static Page Generator
 * @author RiverTwilight
 */

const ROOT_PATH = process.cwd();
const EXPORT_PATH = "docs";

var target_dir = path.join(ROOT_PATH, EXPORT_PATH);

if (!fs.existsSync(target_dir)) {
	fs.mkdirSync(target_dir);
} else {
	fs.rmdirSync(target_dir, { recursive: true });
}

SITE_CONFIG.routes_list.forEach((route) => {
	let template = fs.readFileSync(
		path.join(process.cwd(), `/views/${route.view}.ejs`),
		"utf8"
	);
	let renderedPage = ejs.render(
		template,
		{
			title: route.title,
			seo: SITE_CONFIG.seo,
		},
		{
			views: [path.join(ROOT_PATH, "/views")],
		}
	);

	let writePath =
		route.path === "/"
			? path.join(ROOT_PATH, EXPORT_PATH, route.path, `index.html`)
			: path.join(ROOT_PATH, EXPORT_PATH, `${route.path}.html`);

	fs.writeFileSync(writePath, renderedPage);
});
