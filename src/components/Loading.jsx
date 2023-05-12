import React from "react";
import dualRing from "../assets/Dual Ring-1s-181px.svg";

const Loading = () => {
	return (
		<div className="d-flex vh-100 justify-content-center align-items-center">
			<div className="m-50">
				<img
					src={dualRing}
					alt="Loading"
				/>
			</div>
		</div>
	);
};

export default Loading;
