/*
 * Copyright 2017 Bennett Somerville
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict';

const https = require('https'),
zlib = require('zlib');

class Project {
	constructor(...clientIds) {
		this.clientIds = clientIds;
	}

	verifyToken(idToken) {

		// Declare the promise to return

		const promise = new Promise((resolve, reject) => {

			// Construct a get request

			https.get({
				'hostname' : 'www.googleapis.com',
				'path' : '/oauth2/v3/tokeninfo?id_token=' + idToken,
				'headers' : {
					'Accept' : 'application/json',
					'Accept-Encoding' : 'gzip, deflate'
				}
			}, (res) => { // Callback function

				// Get data

				var data = new Buffer('');
				res.on('data', (chunk) => {
					data = Buffer.concat([data, chunk]);
				});

				// Callback function

				res.on('end', () => {

					// Create a function to return the new data

					const returnData = (err, newData) => {
						
						// Check for an error

						if (err) {
							reject(err);
						} else {

							// Try - catch for a parse error

							try {

								// Parse data

								const jsonData = JSON.parse(newData);

								// Check for errors

								if (jsonData.hasOwnProperty('error_description')) { // Check for an error returned by Gogle
									reject(new Error(jsonData.error_description));
								} else if (this.clientIds.indexOf(jsonData.aud) === -1) { // Verify that the token is for the correct project
									reject(new Error('The \'aud\' claim does not match a client ID.'));
								} else if (new Date(jsonData.exp) < new Date()) { // Verify that the token is not expired
									reject(new Error('The \'exp\' claim has expired.'));
								} else { // Resolve with data if all goes well
									return jsonData;
								}

								// Resolve with the parsed object

								resolve(jsonData);
							} catch (parseError) {
								reject(parseError);
							}
						}
					};

					// Check the copression method used

					const compressionMethod = res.headers['content-encoding'];

					// Decompress the data

					if (compressionMethod === 'gzip') {
						zlib.gunzip(data, (err, compressedData) => {
							returnData(err, compressedData);
						});
					} else if (compressedMethod === 'deflate') {
						zlib.inflate(data, (err, compressedData) => {
							returnData(err, compressedData);
						});
					} else {

						// If the data was not compressed, return the data without error

						returnData(null, compressedData);
					}
					
				});
			}).on('error', (error) => {
				reject(error); // Reject in case of request error
			});
		});

		return promise; // Return the promise
	}
}

module.exports = { Project };