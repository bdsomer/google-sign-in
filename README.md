# Deprecation Notice
This package is no longer maintained. Use the official [google-auth-library](https://www.npmjs.com/package/google-auth-library) instead.

# google-sign-in

> node.js library for integrating with Google sign in

[![google-sign-in on NPM](https://nodei.co/npm/google-sign-in.png)](https://www.npmjs.com/package/google-sign-in)

---

## Installation

```
npm install google-sign-in
```


## Example Usage

```javascript
// Initialize a project

var GoogleSignIn = require('google-sign-in');
var project = new GoogleSignIn.Project('your-client-id.apps.googleusercontent.com', 'your-other-client-id.apps.googleusercontent.com');

// Verify a token

project.verifyToken('token').then((jsonData) => {
	console.log(JSON.stringify(jsonData)); // Does not execute
}, (error) => {
	console.error(error.message); // Logs 'Invalid Value'
});
```

## Documentation

#### `Project` - Class
- `constructor(clientIds)` - *constructor* - Creates a new `Project` with the specified `clientIds`
  - `clientIds` - ***required*** *string...* - Valid client IDs from the Google Developers project seperated by commas or an array
- `verifyToken(idToken)` - *function* - Verifies an ID token
  - `idToken` - ***required*** *string* - The ID token to verify
  - **returns** a promise
    - Rejects with an error object if an error occurs
    - Resolves with a JSON object if everything goes well
      - Documentation on this object can be found [here](https://developers.google.com/identity/sign-in/web/backend-auth#calling-the-tokeninfo-endpoint "data object documentation").
- `clientIds` - *string[]* - List of client IDs

## Purpose

Making authenticating with Google sign-in easier.

## Contributions

To submit issues, use [the GitHub issue tracker](https://github.com/javacoolme/google-sign-in/issues).
To submit code, use a pull request, found [here](https://github.com/javacoolme/google-sign-in/pulls).
To issue a private vulnerability report, email a contributor.

[CII Best Practices](https://bestpractices.coreinfrastructure.org/), [bitHound](https://www.bithound.io/) standards, [Synk](https://snyk.io/), and [Jacks](https://jacks.codiscope.com/) standards *should* be met.

## License (MIT)

Copyright 2017 Bennett Somerville

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
