import React from "react";

export const errorBox = ({ errorMessage }) => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex justify-end bg-red-600 px-2 py-1">close</div>
			<div className="w-1/4 h-1/4 mx-auto">
				<div>{errorMessage}</div>
			</div>
		</div>
	);
};
