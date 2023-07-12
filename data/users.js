const collections = require("../config/mongoCollections");
const users = collections.users;
const ObjectId = require("mongodb").ObjectId;
const validators = require("../validators");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const createUser = async (username, password) => {
	username = validators.validateUsername(username);
	password = validators.validatePassword(password);
	const usersCollection = await users();
	const existingUser = await usersCollection.findOne({ username: username });
	if (existingUser) throw { status: 400, message: "Username already exists" };
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	const newUser = {
		username: username,
		password: hashedPassword,
		midjourney: [],
		reddit: [],
		spotify: [],
		stackoverflow: [],
		github: [],
	};
	const insertUser = await usersCollection.insertOne(newUser);
	return {
		id: insertUser.insertedId,
		username: username,
	};
};

const checkUserLogin = async (username, password) => {
	const usersCollection = await users();
	const existingUser = await usersCollection.findOne({ username: username });
	if (!existingUser) throw { status: 400, message: "Either username or password is invalid" };
	const isValidLogin = await bcrypt.compare(password, existingUser.password);
	if (!isValidLogin) throw { status: 400, message: "Either username or password is invalid" };
	let returnObject = {
		_id: existingUser._id,
		username: existingUser.username,
	};
	return returnObject;
};

module.exports = {
	createUser,
	checkUserLogin,
};
