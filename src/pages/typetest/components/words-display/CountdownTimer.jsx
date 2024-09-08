import React, { useEffect } from 'react';

import { TEST_STATES, useTypeTest } from '../../../../contexts/TypeTestContext';
import { useIsLarge } from '../../../../hooks/useIsLarge';
import { useSettings } from '../../../../contexts/SettingsContext';

const CountdownTimer = () => {
	const { testState, setTimeLeft, timeLeft, endTime, onFinish } = useTypeTest();
	const { duration, hideTime, setHideTime } = useSettings();
	const isLarge = useIsLarge();

	const swapHideTime = () => setHideTime(value => !value);

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
		<button className="btn btn-black ms-2 p-2 rounded-3" onClick={swapHideTime}
			style={{ fontSize: isLarge ? "1.5rem" : "1.25rem", height: "2.25em" }}>
			<span style={{ fontFamily: "monospace", visibility: hideTime ? "hidden" : "visible" }}>{formatTime(TIME_DISPLAY[testState])}</span>
		</button>
	);
};

export default CountdownTimer;
