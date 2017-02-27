/*
 * Copyright 2017 Bennett Somerville
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*jslint node: true*/
"use strict";

const https = require("https");

class Project {
	constructor() {
		this.clientIds = arguments.length === 1 ? arguments[0] : arguments
	}

	verifyToken(idToken) {

		// Declare the promise to return

		const promise = new Promise(function(resolve, reject) {

			// Construct a get request

			https.get({
				"hostname" : "www.googleapis.com",
				"path" : "/oauth2/v3/tokeninfo?id_token=" + idToken,
				"headers" : {
					"Accept" : "application/json"
				}
			}, (res) => { // Callback function

				// Set encoding

				res.setEncoding("utf8");

				// Get data

				var data = "";
				res.on("data", (chunk) => {
					data += chunk;
				});

				// Callback function

				res.on("end", () => {
					try { // Try-catch statement in case of JSON parse error

						// Parse data

						const jsonData = JSON.parse(data);
						if (jsonData.hasOwnProperty("error_description")) { // Check for an error returned by Gogle
							reject(new Error(jsonData.error_description));
						} else if (this.clientIds.indexOf(jsonData.aud) === -1) { // Verify that the token is for the correct project
							reject(new Error("The \"aud\" claim does not match a client ID."));
						} else if (new Date(jsonData.exp) < new Date()) { // Verify that the token is not expired
							reject(new Error("The \"exp\" claim has expired."));
						} else { // Resolve with data if all goes well
							resolve(jsonData);
						}
					} catch (err) {
						reject(err); // Reject in case of JSON parse error
					}
				});
			}).on("error", function(error) {
				reject(error); // Reject in case of request error
			});
		});

		return promise; // Return the promise
	}
}

module.exports = {
	"Project" : Project
};