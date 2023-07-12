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
	if (specialCharacters.test(username)) throw { status: 400, message: "Username cannot contain special characters" };
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

const validateIntegerNumber = (num, field) => {
	if (isNaN(num)) throw { status: 400, message: `${field} must be a positive integer` };
	if (num < 0) throw { status: 400, message: `${field} must be a positive integer` };
	num = parseInt(num);
	num = Number(num);
	return num;
};

const validateFloatingNumber = (num, field) => {
	if (isNaN(num) || parseFloat(num) < 0) throw { status: 400, message: `${field} must be a positive floating point number` };
	num = parseFloat(num).toFixed(2);
	num = Number(num);
	return num;
};

const validateHexColor = (color, field) => {
	color = validateString(color, field);
	const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
	if (!hexRegex.test(color)) throw { status: 400, message: `Invalid hex color for ${field}` };
	return color;
};

module.exports = {
	validateString,
	validateId,
	validateUsername,
	validatePassword,
	validateIntegerNumber,
	validateFloatingNumber,
	validateHexColor,
};
