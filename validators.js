const collections = require("./config/mongoCollections");
const ObjectId = require("mongodb").ObjectId;

const validateString = (str, field) => {
	if (!str) throw { status: 400, message: `No string provided for ${field}` };
	if (typeof str !== "string") throw { status: 400, message: `Input for ${field} must be a string` };
	str = str.trim();
	if (str.length < 1) throw { status: 400, message: `${field} cannot be just empty spaces` };
	return str;
};

const validateId = (id, field) => {
	id - validateString(id, field);
	if (!ObjectId.isValid(id)) throw { status: 400, message: `${field} is not a valid id` };
	return id;
};

const validateUsername = (username) => {
	username = validateString(username, "username");
	const specialCharacters = /[\!\@\#\$\%\^\&\*\/\\]{1,}/g;
	if (username.test(specialCharacters)) throw { status: 400, message: "Username cannot contain special characters" };
	if (username.length < 3) throw { status: 400, message: "Username must be at least 3 characters long" };
	return username;
};

const validatePassword = (password) => {
	password = validateString(password, "password");
	if (password.length < 8) throw { status: 400, message: "Password must be at least 8 characters long" };
	const uppercase = /[A-Z]{1,}/g;
	const lowercase = /[a-z]{1,}/g;
	const numbers = /[0-9]{1,}/g;
	const specialCharacters = /[\!\@\#\$\%\^\&\*]{1,}/g;
	if (!uppercase.test(password)) throw { status: 400, message: "Password must have at least 1 uppercase character" };
	if (!lowercase.test(password)) throw { status: 400, message: "Password must have at least 1 lowercase character" };
	if (!numbers.test(password)) throw { status: 400, message: "Password must have at least 1 number" };
	if (!specialCharacters.test(password)) throw { status: 400, message: "Password must have at least 1 special character" };

	return password;
};

module.exports = {
	validateString,
	validateId,
	validateUsername,
	validatePassword,
};
