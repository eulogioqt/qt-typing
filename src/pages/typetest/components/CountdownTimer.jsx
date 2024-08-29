import React, { useEffect } from 'react';

import { TEST_STATES, useTypeTest } from '../../../contexts/TypeTestContext';

const CountdownTimer = () => {
	const { testState, duration, setTimeLeft, timeLeft, endTime, onFinish } = useTypeTest();

	useEffect(() => {
		let interval;

		if (testState === TEST_STATES.RUNNING) {
			interval = setInterval(() => {
				const remainingTime = Math.ceil((endTime - Date.now()) / 1000);
				setTimeLeft(remainingTime);

				if (remainingTime <= 0) {
					clearInterval(interval);

					onFinish(); // cuidado closure
				}
			}, 100); // Cada 100ms para mayor precisión
		}

		return () => clearInterval(interval);
	}, [endTime, testState]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
	};

	const TIME_DISPLAY = {
		[TEST_STATES.NOT_STARTED]: duration,
		[TEST_STATES.RUNNING]: timeLeft,
		[TEST_STATES.FINISHED]: 0
	};

	return (
		<span className="ms-2 bg-dark text-white p-2 rounded-2" style={{ fontSize: "1.5rem" }}>
			{formatTime(TIME_DISPLAY[testState])}
		</span>
	);
};

export default CountdownTimer;
