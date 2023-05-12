import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Confetti = () => {
	console.log("run");
	return (
		<Player
			autoplay
			src="https://assets4.lottiefiles.com/packages/lf20_rovf9gzu.json"
			style={{ height: "100vh", width: "100vh" }}
			className="confetti position-fixed top-0 left-0 z-99"
		></Player>
	);
};

export default Confetti;
