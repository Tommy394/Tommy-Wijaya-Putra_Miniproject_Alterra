import React, { useState, useEffect, useRef, useCallback } from "react";
import {
	MINUTE_IN_MILLISECONDS,
	MINUTE_IN_SECONDS,
	SECOND_IN_MILLISECONDS,
} from "../constants";
import { convertMillisecondsToMinutesAndSeconds } from "../utils/helpers";

const CountdownTimer = ({
	countdownTimeStampMs,
	handleShowModal,
	showModal,
}) => {
	const { minutes, seconds } =
		convertMillisecondsToMinutesAndSeconds(countdownTimeStampMs);
	const [remainingTime, setRemainingTime] = useState({
		minutes,
		seconds,
	});
	const timer = useRef(null);

	const updateRemainingTime = useCallback(() => {
		setRemainingTime((prevTime) => {
			if (prevTime.seconds === 0) {
				if (prevTime.minutes === 0) {
					clearInterval(timer.current);
					handleShowModal();
					return prevTime;
				} else {
					return {
						minutes: prevTime.minutes - 1,
						seconds: 59,
					};
				}
			} else {
				return {
					minutes: prevTime.minutes,
					seconds: prevTime.seconds - 1,
				};
			}
		});
	}, [handleShowModal]);

	useEffect(() => {
		if (!showModal) {
			timer.current = setInterval(() => {
				updateRemainingTime();
			}, 1000);
		}
		return () => {
			clearInterval(timer.current);
		};
	}, [showModal, updateRemainingTime]);

	return (
		<>
			<span>{remainingTime.minutes}</span>
			<span>Minutes</span>
			<span>{remainingTime.seconds}</span>
			<span>Seconds</span>
		</>
	);
};

export default CountdownTimer;
