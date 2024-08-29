import React, { useEffect } from 'react';

import { TEST_STATES, useTypeTest } from '../../../contexts/TypeTestContext';

const CountdownTimer = () => {
  const { testState, setTestState, duration, setTimeLeft, timeLeft, endTime, onFinish } = useTypeTest();

  useEffect(() => {
    let interval;

    if (testState === TEST_STATES.RUNNING) {
      interval = setInterval(() => {
        const remainingTime = Math.ceil((endTime - Date.now()) / 1000);
        setTimeLeft(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(interval);

          onFinish();
          setTestState(TEST_STATES.FINISHED);
        }
      }, 100); // Revisa cada 100ms para mayor precisión
    }

    return () => clearInterval(interval);
  }, [endTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <span className="ms-2 bg-dark text-white p-2 rounded-2" style={{ fontSize: "1.5rem" }}>
      {formatTime(testState === TEST_STATES.RUNNING ? timeLeft : duration)}
    </span>
  );
};

export default CountdownTimer;
