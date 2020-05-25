import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const controlRowStyle = {
  display: 'flex',
  alignItems: 'center',
  flexFlow: 'row nowrap',
  marginTop: '5px',
};

const controlLabelStyle = {
  width: '80px',
  marginLeft: '20px',
};

const controlInputStyle = { textAlign: 'center', width: '60px' };

export default function SimpleParameter({ max, value, tag, onChange }) {
  return (
    <div style={controlRowStyle}>
      <div style={controlLabelStyle}> {tag} </div>
      <input
        style={controlInputStyle}
        type="number"
        defaultValue={value}
        min={0}
        max={max}
        onChange={i => onChange(Number(i.target.value))}
      />
    </div>
  );
}

SimpleParameter.defaultProps = {
  value: 0,
};

SimpleParameter.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  tag: PropTypes.string,
  max: PropTypes.number,
};
