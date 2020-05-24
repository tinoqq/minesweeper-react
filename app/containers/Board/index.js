import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Node from '../../components/Node';
import { rightClickNodeAction, clickNodeAction } from './actions';
import range from '../../helpers/range';

const serializePosition = (x, y) => `${x}.${y}`;

const Board = ({ board, onClickNode, onRightClickNode }) => (
  <div>
    {range(board.rows).map(y => (
      <div key={`y${y}`} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
        {range(board.columns).map(x => (
          <Node
            x={x}
            y={y}
            key={`node-${x}.${y}`}
            hint={board.hints[serializePosition(x, y)]}
            flag={board.flags[serializePosition(x, y)]}
            explosion={serializePosition(x, y) === board.explosion_position}
            mine={board.mines && board.mines[serializePosition(x, y)]}
            size={30}
            onClick={() => onClickNode(x, y, board.id)}
            onRightClick={() => onRightClickNode(x, y, board.id)}
          />
        ))}
      </div>
    ))}
  </div>
);

const mapStateToProps = state => ({
  board: state && state.Home && state.Home.board,
});

const mapDispatchToProps = dispatch => ({
  onClickNode: (x, y, boardId) => dispatch(clickNodeAction(x, y, boardId)),
  onRightClickNode: (x, y, boardId) =>
    dispatch(rightClickNodeAction(x, y, boardId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

Board.defaultProps = {
  board: null,
};

Board.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.string,
    begin_epoch_ms: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    hints: PropTypes.shape(),
    flags: PropTypes.shape(),
    explosion_position: PropTypes.string,
    mines: PropTypes.shape({}),
  }),
  onRightClickNode: PropTypes.func.isRequired,
  onClickNode: PropTypes.func.isRequired,
};

export default withConnect(Board);
