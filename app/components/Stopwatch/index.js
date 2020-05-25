import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';

const epochToSeconds = epoch => Math.floor((Date.now() - epoch) / 1000);

const Stopwatch = ({ epoch, enabled }) => {
  const [seconds, setSeconds] = useState(epochToSeconds(epoch));
  useEffect(() => {
    if (enabled) {
      setTimeout(() => {
        setSeconds(epochToSeconds(epoch));
      }, 1000);
    }
  });
  return <div className="stopwatch">{`elapsed seconds: ${seconds}`}</div>;
};

Stopwatch.propTypes = {
  epoch: PropType.number.isRequired,
  enabled: PropType.bool.isRequired,
};

export default Stopwatch;
