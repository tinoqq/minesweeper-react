import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Node from '../../components/Node';
import { clickNodeAction } from './actions';
import range from '../../helpers/range';

const serializePosition = (x, y) => `${x}.${y}`;

const Board = ({
  tileSize,
  board,
  onFlagNode,
  onQuestionMarkNode,
  onRevealNode,
}) => (
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
            questionMark={board.questionMarks[serializePosition(x, y)]}
            explosion={serializePosition(x, y) === board.explosion_position}
            mine={board.mines && board.mines[serializePosition(x, y)]}
            size={tileSize}
            onFlagNode={() => onFlagNode(x, y, board.id)}
            onQuestionMarkNode={() => onQuestionMarkNode(x, y, board.id)}
            onRevealNode={() => onRevealNode(x, y, board.id)}
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
  onQuestionMarkNode: (x, y, boardId) =>
    dispatch(clickNodeAction(x, y, boardId, 'toggle_question')),
  onFlagNode: (x, y, boardId) =>
    dispatch(clickNodeAction(x, y, boardId, 'toggle_flag')),
  onRevealNode: (x, y, boardId) =>
    dispatch(clickNodeAction(x, y, boardId, 'reveal')),
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
  onRevealNode: PropTypes.func.isRequired,
  onQuestionMarkNode: PropTypes.func.isRequired,
  onFlagNode: PropTypes.func.isRequired,
  tileSize: PropTypes.number,
};

export default withConnect(Board);
