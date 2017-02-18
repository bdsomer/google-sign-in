var GoogleSignIn = require("google-sign-in");
var project = new GoogleSignIn.Project(["your-client-id.apps.googleusercontent.com"]);
project.verifyToken("token", function(err, data) {
	if (err) {
		console.log(err); // Logs { description: 'Invalid Value' }
	} else {
		console.log(data);
	}
});