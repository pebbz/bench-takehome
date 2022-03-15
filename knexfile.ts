// Update with your config settings.
module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: process.env.PATH_DATABASE
		},
		useNullAsDefault: true
	}
};
