const collections = require("../config/mongoCollections");
const users = collections.users;
const ObjectId = require("mongodb").ObjectId;
const validators = require("../validators");

const createMidjourneyWrap = async (
	userId,
	topArtists,
	topKeywords,
	hoursUsed,
	imagesCreated,
	backgroundGradientStart,
	backgroundGradientEnd,
	image
) => {
	let thumbnailImage = image ? `data:${image.mimetype};base64,${image.data.toString("base64")}` : process.env.PLACEHOLDER_IMAGE;
	topArtists = topArtists.split(",");
	let newArtistsList = [];
	for (let artist of topArtists) {
		if (newArtistsList.length === 5) break;
		artist = artist.trim();
		if (artist.length < 1) throw { status: 400, message: "A top artist cannot be empty" };
		if (artist.length > 20) throw { status: 400, message: "A top artist cannot be longer than 20 characters" };
		newArtistsList.push(artist);
	}
	topKeywords = topKeywords.split(",");
	let newKeywordsList = [];
	for (let keyword of topKeywords) {
		if (newKeywordsList.length === 5) break;
		keyword = keyword.trim();
		if (keyword.length < 1) throw { status: 400, message: "A top keyword cannot be empty" };
		if (keyword.length > 20) throw { status: 400, message: "A top keyword cannot be longer than 20 characters" };
		newKeywordsList.push(keyword);
	}
	hoursUsed = validators.validateFloatingNumber(hoursUsed, "hours used");
	imagesCreated = validators.validateIntegerNumber(imagesCreated, "images created");
	backgroundGradientStart = validators.validateHexColor(backgroundGradientStart, "background gradient start");
	backgroundGradientEnd = validators.validateHexColor(backgroundGradientEnd, "background gradient end");

	const usersCollection = await users();
	const user = await usersCollection.findOne({ _id: ObjectId(userId) });
	let wrap = {};
	if (user) {
		wrap = {
			_id: new ObjectId(),
			topArtists: newArtistsList,
			topKeywords: newKeywordsList,
			hoursUsed: hoursUsed,
			imagesCreated: imagesCreated,
			backgroundGradientStart: backgroundGradientStart,
			backgroundGradientEnd: backgroundGradientEnd,
			thumbnail: thumbnailImage,
		};
		await usersCollection.updateOne({ _id: ObjectId(userId) }, { $push: { midjourney: wrap } });
	} else {
		throw { status: 404, message: "User not found" };
	}
	return wrap;
};

const getMidjourneyWraps = async (userId) => {
	const usersCollection = await users();
	const user = await usersCollection.findOne({ _id: ObjectId(userId) });
	if (user) {
		return user.midjourney;
	} else {
		throw { status: 404, message: "User not found" };
	}
};

module.exports = {
	createMidjourneyWrap,
	getMidjourneyWraps,
};
