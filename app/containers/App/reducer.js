import { BOARD_UPDATE } from './constants';
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
      return { ...state };
    case BOARD_UPDATE:
      return {
        ...state,
        board: action.board,
      };
    default:
      return state;
  }
};

export default app;
