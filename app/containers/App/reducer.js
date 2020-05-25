import { BOARD_UPDATE, BOARD_SAVED } from './constants';
import { API_ERROR } from '../../services/constants';

const DEFAULT_STATE = {
  createBoardErrorCounter: 0,
};

const app = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case API_ERROR:
      if (action.tag === 'create') {
        return {
          ...state,
          createBoardErrorCounter: state.createBoardErrorCounter + 1,
        };
      }
      if (action.tag === 'save') {
        alert('Failed to save board, try another name.');
      }
      return { ...state };
    case BOARD_UPDATE:
      return {
        ...state,
        board: action.board,
      };
    case BOARD_SAVED:
      alert('Board saved ok!');
      return { ...state };
    default:
      return state;
  }
};

export default app;
