import React, { useState, useEffect } from "react";

export const Midjourney = () => {
	const [thumbnail, setThumbnail] = useState(null);
	const [topArtists, setTopArtists] = useState([]);
	const [hoursUsed, setHoursUsed] = useState(0);
	const [imagesCreated, setImagesCreated] = useState(0);
	const [backgroundGradientStart, setBackgroundGradientStart] = useState("#060522");
	const [backgroundGradientEnd, setBackgroundGradientEnd] = useState("#071731");

	const handleArtists = (artists) => {
		return artists.map((artist) => {
			return <li key={artist}>{artist}</li>;
		});
	};

	const handleKeywords = (keywords) => {
		return keywords.map((keyword) => {
			return <li key={keyword}>{keyword}</li>;
		});
	};

	const placeholderArtists = ["Rembrandt", "Hokusai Katsushika", "Carel Fabritius", "Hayao Miyazaki", "Pokras Lampas"];
	const placeholderKeywords = ["Concept Art", "Neon Lights", "8k", "Highly Detailed", "Cinematic"];

	return (
		<div className="flex justify-evenly">
			<div className="flex items-center justify-center mx-4 p-8 rounded-lg bg-gradient-to-br from-midjourney1 to-midjourney2">
				<div>
					{thumbnail ? (
						<img
							src={thumbnail}
							alt="thumbnail"
							className="flex items-center justify-center mx-auto w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
						/>
					) : (
						<div className="flex items-center justify-center mx-auto w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"></div>
					)}
					<div className="flex">
						<div className="mx-4 mt-4">
							<div className="text-2xl font-medium my-2">Top Artists</div>
							<ul>{handleArtists(placeholderArtists)}</ul>
						</div>
						<div className="mx-4 mt-4">
							<div className="text-2xl font-medium my-2">Top Keywords</div>
							<ul>{handleKeywords(placeholderKeywords)}</ul>
						</div>
					</div>
					<div className="flex">
						<div className="mx-4 mt-4">
							<div className="text-2xl font-medium my-2">Hours Used</div>
							<ul className="text-3xl">{hoursUsed}</ul>
						</div>
						<div className="mx-4 mt-4">
							<div className="text-2xl font-medium my-2">Images Created</div>
							<ul className="text-3xl">{imagesCreated}</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-4">
				<div className="flex justify-center mt-12 text-2xl">Fill card information:</div>
				<div>
					<input
						type="color"
						id="gradient-start"
						name="gradient-start"
						onChange={(e) => setBackgroundGradientStart(e.target.value) && console.log("start color: " + e.target.value)}
					/>
					<label for="gradient-start" className="mx-2">
						Gradient Start
					</label>
				</div>

				<div>
					<input type="color" id="gradient-end" name="gradient-end" onChange={(e) => setBackgroundGradientEnd(e.target.value)} />
					<label for="gradient-end" className="mx-2">
						Gradient End
					</label>
				</div>
			</div>
		</div>
	);
};
