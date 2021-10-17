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

SITE_CONFIG.routes_list.forEach((route) => {
	let template = fs.readFileSync(
		path.join(process.cwd(), `/views/${route.view}.ejs`),
		"utf8"
	);
	let target_dir = path.join(ROOT_PATH, EXPORT_PATH);
	let renderedPage = ejs.render(
		template,
		{
			title: route.title,
			seo: SITE_CONFIG.seo,
		},
		{
			views: [ROOT_PATH],
		}
	);
	if (!fs.existsSync(target_dir)) {
		fs.mkdirSync(target_dir);
	} else {
		fs.rmdirSync(target_dir, { recursive: true });
	}
	fs.writeFileSync(
		`${path.join(ROOT_PATH, EXPORT_PATH, route.path)}/${route.view}.html`,
		renderedPage
	);
});
