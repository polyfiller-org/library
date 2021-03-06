module.exports = {
	...require("./packages/config/scaffold.config"),
	logo: {
		url: "https://raw.githubusercontent.com/polyfiller-org/library/master/documentation/asset/logo-color-text.png",
		height: 80
	},
	readme: {
		badges: {
			exclude: ["dependencies"]
		},
		sections: {
			exclude: ["usage", "features", "faq"]
		}
	},
};