const collections = require("../config/mongoCollections");
const ObjectId = require("mongodb").ObjectId;

const validateString = async (str, field) => {
	if (!str) throw { status: 400, message: `No string provided for ${field}` };
	if (typeof str !== "string") throw { status: 400, message: `Input for ${field} must be a string` };
	str = str.trim();
	if (str.length < 1) throw { status: 400, message: `${field} cannot be just empty spaces` };
	return str;
};

const validateId = async (id, field) => {};

const validateUsername = async (username) => {};

const validatePassword = async (password) => {};

module.exports = {
	validateString,
	validateId,
	validateUsername,
	validatePassword,
};
