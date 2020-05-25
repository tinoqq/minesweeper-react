import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  createBoardAction,
  createSaveBoardAction,
  createRetrieveBoardAction,
} from '../Board/actions';
import Board from '../Board';
import Stopwatch from '../../components/Stopwatch';
import TopBar from '../TopBar';
import boardPropType from '../Board/propType';
import SimpleParameter from '../../components/SimpleParameter';
import mySaga from '../Board/sagas';

import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import appReducer from './reducer';

const containerStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
};

const bodyStyle = {
  display: 'flex',
  flexFlow: 'row nowrap',
};

const sidebarStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
  width: '190px',
  height: '500px',
  marginLeft: '5px',
  borderRadius: '30px',
  borderStyle: 'solid',
  alignItems: 'start',
};

const boardStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
  marginLeft: '10px',
};

const App = ({
  createBoardErrorCounter,
  board = null,
  onNeedBoard,
  onClickCreateBoard,
  onClickSave,
  onClickRetrieve,
}) => {
  useInjectReducer({ key: 'Home', reducer: appReducer });
  useInjectSaga({ key: 'Home', saga: mySaga });
  const [tileSize, setTileSize] = useState(40);
  const [saveName, setSaveName] = useState();
  const [retrieveName, setRetrieveName] = useState();
  const [boardSize, setBoardSize] = useState({
    rows: 0,
    columns: 0,
    difficulty: 0,
  });

  const boardRows = board && board.rows;
  const boardColumns = board && board.columns;
  const boardDifficulty = board && board.difficulty;

  useEffect(() => {
    setBoardSize({
      rows: boardRows,
      columns: boardColumns,
      difficulty: boardDifficulty,
    });
  }, [boardRows, boardColumns, boardDifficulty]);

  if (createBoardErrorCounter > 5) {
    return <div> unexpected error... </div>;
  }
  if (!board) {
    onNeedBoard();
    return <div> Loading </div>;
  }
  return (
    <div style={containerStyle}>
      <TopBar message="- minesweeper -" />
      <div style={bodyStyle}>
        <div style={sidebarStyle}>
          <SimpleParameter
            tag="rows"
            value={boardSize.rows}
            onChange={i => setBoardSize({ ...boardSize, rows: i })}
          />
          <SimpleParameter
            tag="columns"
            value={boardSize.columns}
            onChange={i => setBoardSize({ ...boardSize, columns: i })}
          />

          <SimpleParameter
            tag="difficulty"
            value={boardSize.difficulty}
            min={0}
            max={100}
            onChange={i => setBoardSize({ ...boardSize, difficulty: i })}
          />

          <button
            style={{
              alignSelf: 'center',
              marginTop: '5px',
            }}
            type="button"
            onClick={() => onClickCreateBoard(boardSize)}
          >
            new board
          </button>

          <input
            style={{ marginLeft: '5px', marginTop: '10px', width: '95%' }}
            placeholder="name it"
            type="text"
            onChange={i => setSaveName(i.target.value)}
          />
          <button
            type="button"
            style={{ marginTop: '10px', alignSelf: 'center' }}
            onClick={() =>
              saveName && saveName.length && onClickSave(saveName, board.id)
            }
          >
            save it
          </button>
          <input
            style={{ marginLeft: '5px', marginTop: '10px', width: '95%' }}
            placeholder="remember it's name"
            type="text"
            onChange={i => setRetrieveName(i.target.value)}
          />
          <button
            type="button"
            style={{ marginTop: '10px', alignSelf: 'center' }}
            onClick={() =>
              retrieveName &&
              retrieveName.length &&
              onClickRetrieve(retrieveName)
            }
          >
            retrieve it
          </button>

          <div style={{ marginTop: '10px' }}>
            <SimpleParameter
              tag="tile size"
              value={tileSize}
              onChange={i => setTileSize(i)}
            />
          </div>
          <div
            style={{ marginTop: '30px', fontSize: '16px', alignSelf: 'center' }}
          >
            <Stopwatch epoch={board.begin_epoch_ms} enabled={!board.mines} />
          </div>
          <div
            style={{ marginTop: '40px', fontSize: '16px', alignSelf: 'center' }}
          >
            <div> right click to place flag </div>
          </div>
          <div
            style={{ marginTop: '5px', fontSize: '16px', alignSelf: 'center' }}
          >
            <div> hold Alt to place ? </div>
          </div>
        </div>
        <div style={boardStyle}>
          <Board board={board} tileSize={tileSize} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { board, createBoardErrorCounter } = state.Home || {};
  return {
    board,
    createBoardErrorCounter,
  };
};

const mapDispatchToProps = dispatch => ({
  onNeedBoard: () => dispatch(createBoardAction()),
  onClickCreateBoard: boardSize => dispatch(createBoardAction(boardSize)),
  onClickSave: (name, boardId) =>
    dispatch(createSaveBoardAction(name, boardId)),
  onClickRetrieve: name => dispatch(createRetrieveBoardAction(name)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

App.defaultProps = {
  board: null,
};

App.propTypes = {
  board: boardPropType,
  onNeedBoard: PropTypes.func.isRequired,
  createBoardErrorCounter: PropTypes.number,
  onClickCreateBoard: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickRetrieve: PropTypes.func.isRequired,
};

export default withConnect(App);
