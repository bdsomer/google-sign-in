"use strict";

var https = require("https");

class Project {
	constructor(clientIds) {
		this.clientIds = clientIds;
	}

	verifyToken(idToken, callback) {
		var req = https.get({
			"hostname" : "www.googleapis.com",
			"path" : "/oauth2/v3/tokeninfo?id_token=" + idToken,
			"headers" : {
				"Accept" : "application/json"
			}
		}, (res) => {
			res.setEncoding("utf8");
			var data = "";
			res.on("data", (chunk) => {
				data += chunk;
			});
			res.on("end", () => {
				var jsonData = JSON.parse(data);
				if (jsonData.hasOwnProperty("error_description")) {
					callback({
						"description" : jsonData.error_description
					}, jsonData);
				} else if (this.clientIds.indexOf(jsonData.aud) === -1) {
					callback({
						"description" : "The \"aud\" claim does not match a client ID."
					}, jsonData);
				} else if (new Date(jsonData.exp) < new Date()) {
					callback({
						"description" : "The \"exp\" claim has expired."
					}, jsonData);
				} else {
					callback(null, jsonData);
				}
			});
		});
		req.on("error", (err) => {
			callback({
				"description" : err.message
			}, null);
		});
	}
}

module.exports = {
	"Project" : Project
};