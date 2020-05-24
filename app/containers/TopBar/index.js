import PropTypes from 'prop-types';
import React from 'react';

import './styles.css';

const TopBar = ({ message }) => (
  <div className="topBarContainer">
    <div className="message">
      {message}
    </div>
  </div>
);


TopBar.propTypes = {
  message: PropTypes.string.isRequired,
};

export default TopBar;
