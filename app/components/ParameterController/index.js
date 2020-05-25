import React, { useState } from 'react';
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

export default function ParameterController({
  value: outsideValue,
  onSetParameter,
  tag,
}) {
  const [state, setState] = useState({ submitted: false, value: outsideValue });
  const { submitted, value } = state;
  if (submitted) {
    setState({ submitted: false, value: outsideValue });
  }

  const submit = val => {
    setState({ submitted: true });
    onSetParameter(val);
  };

  const handleSubmit = evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    submit(evt.target[0].value);
  };
  if (!value) return <div />;
  return (
    <div style={controlRowStyle}>
      <div style={controlLabelStyle}> {tag} </div>
      <form onSubmit={handleSubmit}>
        <input
          style={controlInputStyle}
          type="number"
          value={value || ''}
          onChange={i => {
            const num = Number.parseInt(i.target.value, 10);
            if (
              Number.isInteger(num) &&
              (num === outsideValue + 1 || num === outsideValue - 1)
              // incremental changes are ok.
            ) {
              submit(num);
            } else {
              setState({ ...state, value: i.target.value });
            }
          }}
        />
      </form>
    </div>
  );
}
ParameterController.propTypes = {
  value: PropTypes.number,
  onSetParameter: PropTypes.func,
  tag: PropTypes.string,
};
