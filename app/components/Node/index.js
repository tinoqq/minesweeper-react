import React from 'react';
import PropTypes from 'prop-types';
import whiteFlagPng from '../../resources/white_flag.png';
import bombPng from '../../resources/bomb.png';
import explosionPng from '../../resources/boom.png';

function Node({
  x,
  y,
  onClick,
  onRightClick,
  explosion,
  mine,
  hint,
  flag,
}) {
  // useEffect(() => {
  //   document.getElementById(`node-${x}.${y}`)?.addEventListener('contextmenu', (event) => {
  //     if (event) event.preventDefault();
  //     onRightClick();
  //   });
  // }, [flag, onRightClick, x, y])

  const color = hint || hint === '0' || hint === 0 ? 'white' : 'grey';
  const flagImg = (<img src={whiteFlagPng} style={{ height: '40px' }} alt="T" />);
  const bombImg = (<img src={bombPng} style={{ height: '40px' }} alt="T" />);
  const explosionImg = (<img src={explosionPng} style={{ height: '40px' }} alt="T" />);
  let content;
  if (color === 'grey' && flag) {
    content = flagImg;
  }
  if (color === 'white' && hint > 0) {
    content = hint;
  }
  if (mine) {
    content = bombImg;
  }
  if (explosion) {
    content = explosionImg;
  }
  return (
    <div
      id={`node-${x}.${y}`}
      onClick={(i) => (i.altKey ? onRightClick() : onClick())}
      style={{
        height: '50px',
        width: '50px',
        borderStyle: 'solid',
        borderWidth: 'thin',
        background: color,
        margin: '1px',
        fontSize: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {content}
    </div>
  );
}

Node.defaultProps = {
  hint: null,
  flag: false,
  explosion: false,
  mine: false,
};


Node.propTypes = {
  onRightClick: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  hint: PropTypes.number,
  flag: PropTypes.bool,
  explosion: PropTypes.bool,
  mine: PropTypes.bool,
};

export default Node;
