module.exports = {
	...require("./packages/config/scaffold.config"),
	logo: {
		url: "https://raw.githubusercontent.com/wessberg/Polyfiller/master/documentation/asset/logo-color-text.png",
		height: 80
	},
	readme: {
		sections: {
			exclude: ["usage", "features"]
		}
	},
};