[![Build Status](https://travis-ci.org/javacoolme/google-sign-in.svg?branch=master)](https://travis-ci.org/javacoolme/google-sign-in)
#google-sign-in
> node.js library for integrating with Google sign in

##Installation

    npm install google-sign-in
##Usage Example

	var GoogleSignIn = require("./index.js");
	var project = new GoogleSignIn.Project(["your-client-id.apps.googleusercontent.com"]);
	project.verifyToken("client-id-token", function(err, data) {
		if (err) {
			console.log(err); // Logs { description: 'Invalid Value' }
		} else {
			console.log(data);
		}
	});
##API
####`Project` - Class
- `constructor(clientIds)` - Creates a new `Project` with the specified `clientIds` - Function
  - `clientIds` - An array of valid client IDs from the Google Developers project - Array of String
- `verifyToken(idToken, callback)` - Verifies an ID token - Function
  - `idToken` - The ID token to verify - String
  - `callback(err, data)` - Calls back when an error occurs or when data is retrieved - Function
    - `err` - A JSON object describing the error that occured. `null` if no error occured. - JSON Object
      - `description` - A description of the error. - String
    - `data` - The JSON data returned by the Google API. `null` if no data was recieved. - JSON Object
      - Documentation on this object can be found [here](https://developers.google.com/identity/sign-in/web/backend-auth#calling-the-tokeninfo-endpoint "data object documentation").

#License (MIT)

Copyright (c) 2017 Bennett D. Somerville

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
