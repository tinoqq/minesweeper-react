import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createBoardAction } from '../Board/actions';
import Board from '../Board';
import Stopwatch from '../../components/Stopwatch';
import TopBar from '../TopBar';
import boardPropType from '../Board/propType';
import './styles.css';

import mySaga from '../Board/sagas';

import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import appReducer from './reducer';

const App = ({ createBoardErrorCounter, board = null, onNeedBoard }) => {
  useInjectReducer({ key: 'Home', reducer: appReducer });
  useInjectSaga({ key: 'Home', saga: mySaga });

  if (createBoardErrorCounter > 5) {
    return (
      <div> {`check your ${process.env.MINESWEEPER_API_BASE_URL} stuff`} </div>
    );
  }
  if (!board) {
    onNeedBoard();
  }
  if (!board) {
    return <div> Loading </div>;
  }
  return (
    <div className="homeContainer">
      <TopBar message="minesweeper" />
      <Board board={board} />
      <Stopwatch epoch={board.begin_epoch_ms} enabled={!board.mines} />
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
  createBoardErrorCounter: PropTypes.number.isRequired,
};

export default withConnect(App);
