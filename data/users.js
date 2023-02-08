const collections = require("../config/mongoCollections");
const users = collections.users;
const ObjectId = require("mongodb").ObjectId;
const validators = require("../validators");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const createUser = async (username, password) => {
	username = validators.validateUsername(username);
	password = validators.validatePassword(password);
};
