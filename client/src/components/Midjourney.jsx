import React, { useState, useEffect, useRef } from "react";
import { Loading } from "./reusables/Loading";
import axios from "axios";
import * as htmlToImage from "html-to-image";
import "../styles/midjourneyFont.css";
import "../styles/customGradient.css";
import download from "downloadjs";

export const Midjourney = () => {
	const [thumbnail, setThumbnail] = useState(null);
	const [topArtists, setTopArtists] = useState([]);
	const [topKeywords, setTopKeywords] = useState([]);
	const [hoursUsed, setHoursUsed] = useState(0);
	const [imagesCreated, setImagesCreated] = useState(0);
	const [backgroundGradientStart, setBackgroundGradientStart] = useState("#060522");
	const [backgroundGradientEnd, setBackgroundGradientEnd] = useState("#071731");
	const thumbnailRef = useRef(null);
	const topArtistsRef = useRef([]);
	const topKeywordsRef = useRef([]);
	const hoursUsedRef = useRef(0);
	const imagesCreatedRef = useRef(0);
	const backgroundGradientStartRef = useRef("#060522");
	const backgroundGradientEndRef = useRef("#071731");
	const [loading, setLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		fetchWraps();
	}, []);

	const fetchWraps = async () => {
		setLoading(true);
		const { data } = await axios.get("/login/check-login");
		if (data.loginStatus) {
			setIsLoggedIn(true);
			const { data } = await axios.get("/wrapped/midjourney");
			setThumbnail(data[data.length - 1].thumbnail);
			setTopArtists(data[data.length - 1].topArtists);
			setTopKeywords(data[data.length - 1].topKeywords);
			setHoursUsed(data[data.length - 1].hoursUsed);
			setImagesCreated(data[data.length - 1].imagesCreated);
			setBackgroundGradientStart(data[data.length - 1].backgroundGradientStart);
			setBackgroundGradientEnd(data[data.length - 1].backgroundGradientEnd);
			setLoading(false);
		}
		setLoading(false);
	};

	const handleArtists = (artists) => {
		return artists.map((artist, index) => {
			return (
				<li key={index} className="midjourney-font">
					<span>{index + 1} </span>
					{artist}
				</li>
			);
		});
	};

	const handleKeywords = (keywords) => {
		return keywords.map((keyword, index) => {
			return (
				<li key={keyword} className="midjourney-font">
					<span>{index + 1} </span>
					{keyword}
				</li>
			);
		});
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append("thumbnailImage", thumbnailRef);
		formData.append("topArtists", topArtistsRef);
		formData.append("hoursUsed", hoursUsedRef);
		formData.append("imagesCreated", imagesCreatedRef);
		formData.append("backgroundGradientStart", backgroundGradientStartRef);
		formData.append("backgroundGradientEnd", backgroundGradientEndRef);
		await axios.post("/wrapped/midjourney", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		setLoading(false);
	};

	const handleDownload = () => {
		htmlToImage.toPng(document.getElementById("midjourney-card")).then(function (dataUrl) {
			download(dataUrl, "midjourney-wrapped.png");
		});
	};

	const handleGenerate = () => {};

	if (loading) return <Loading />;
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
			<div id="midjourney-card" className="col-span-1 flex items-center justify-center">
				<div
					className="custom-gradient w-fit h-full mx-4 pb-0 rounded-xl"
					style={{ "--color-start": backgroundGradientStart, "--color-end": backgroundGradientEnd }}
				>
					<div className="h-fit px-4">
						{thumbnail ? (
							<img
								src={thumbnail}
								alt="thumbnail"
								className="flex items-center justify-center mx-auto my-8 w-56 h-56 border border-gray-700 bg-gray-800 rounded-sm object-cover"
							/>
						) : (
							<img
								src="https://cdn.midjourney.com/99226516-3d32-4317-8e91-3d1ba04ba77a/0_0_640_N.webp"
								alt="thumbnail"
								className="flex items-center justify-center mx-auto my-8 w-[320px] h-[320px] border border-gray-700 bg-gray-800 rounded-sm object-cover"
							/>
						)}
						<div className="h-fit mt-2">
							<div className="grid grid-cols-2 h-1/2">
								<div className="col-span-1 mx-4 mt-4">
									<div className="text-xl font-medium midjourney-font my-2">Top Artists</div>
									<ul>{handleArtists(topArtists)}</ul>
								</div>
								<div className="col-span-1 mx-4 mt-4">
									<div className="text-xl font-medium midjourney-font my-2">Top Keywords</div>
									<ul>{handleKeywords(topKeywords)}</ul>
								</div>
							</div>
							<div className="grid grid-cols-2 h-1/2">
								<div className="col-span-1 mx-4 mt-4">
									<div className="text-xl font-medium midjourney-font my-2">Hours Used</div>
									<ul className="text-2xl midjourney-font">{hoursUsed}</ul>
								</div>
								<div className="col-span-1 mx-4 mt-4">
									<div className="text-xl font-medium midjourney-font my-2">Images Created</div>
									<ul className="text-2xl midjourney-font">{imagesCreated}</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="midjourney-svg mt-8 mb-2">
						<img src="/midjourney-logo.png" className="w-20 my-auto mx-auto object-contain" alt="midjourney logo" />
					</div>
				</div>
			</div>

			<div className="col-span-1 h-full flex items-center justify-center">
				<div className="border border-indigo-300 p-8 rounded-xl">
					<div className="col-span-full">
						<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
							Wrap Thumbnail
						</label>
						<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-100/25 px-6 py-10">
							<div className="text-center">
								<svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path
										fillRule="evenodd"
										d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
										clipRule="evenodd"
									/>
								</svg>
								<div className="mt-4 flex text-sm leading-6 text-white">
									<label
										htmlFor="file-upload"
										className="relative py-0.5 px-1 mx-0.5 cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
									>
										<span>Upload a file</span>
										<input id="file-upload" name="file-upload" type="file" className="sr-only" ref={thumbnailRef} />
									</label>
								</div>
								<p className="m-1 text-xs leading-5 text-white">PNG, JPG or JPEG</p>
							</div>
						</div>
					</div>
					<div className="col-span-full mt-4">
						<label htmlFor="top-artists" className="block text-sm font-medium leading-6 text-white">
							Top Artists (separated by commas)
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="top-artists"
								id="top-artists"
								className="block w-full rounded-md border-0 p-1.5 text-black"
								ref={topArtistsRef}
							/>
						</div>
					</div>
					<div className="col-span-full mt-4">
						<label htmlFor="top-keywords" className="block text-sm font-medium leading-6 text-white">
							Top Keywords (separated by commas)
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="top-keywords"
								id="top-keywords"
								className="block w-full rounded-md border-0 p-1.5 text-black"
								ref={topKeywordsRef}
							/>
						</div>
					</div>
					<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="hours-used" className="block text-sm font-medium leading-6 text-white">
								Hours Used
							</label>
							<div className="mt-2">
								<input
									type="number"
									name="hours-used"
									id="hours-used"
									className="block w-full rounded-md border-0 p-1.5 text-black"
									ref={hoursUsedRef}
								/>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="images-created" className="block text-sm font-medium leading-6 text-white">
								Images Created
							</label>
							<div className="mt-2">
								<input
									type="number"
									name="images-created"
									id="images-created"
									className="block w-full rounded-md border-0 p-1.5 text-black"
									ref={imagesCreatedRef}
								/>
							</div>
						</div>
					</div>
					<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="gradient-start" className="block text-sm font-medium leading-6 text-white">
								Gradient top (hex value)
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="gradient-start"
									id="gradient-start"
									className="block w-full rounded-md border-0 p-1.5 text-black"
									ref={backgroundGradientStartRef}
								/>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="gradient-end" className="block text-sm font-medium leading-6 text-white">
								Gradient bottom (hex value)
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="gradient-end"
									id="gradient-end"
									className="block w-full rounded-md border-0 p-1.5 text-black"
									ref={backgroundGradientEndRef}
								/>
							</div>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="w-fit my-4 mr-2 py-2 px-4 rounded-lg bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-700  text-white"
							onClick={(e) => handleDownload()}
						>
							Download
						</button>
						<button
							type="submit"
							className="w-fit my-4 mx-2 py-2 px-4 rounded-lg bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-700  text-white"
							onClick={(e) => handleGenerate()}
						>
							Generate
						</button>
						{isLoggedIn && (
							<button
								type="submit"
								className="w-fit my-4 mx-2 py-2 px-4 rounded-lg bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-700  text-white"
								onClick={(e) => handleSave()}
							>
								Save
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
