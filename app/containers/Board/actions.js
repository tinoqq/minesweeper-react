import {
  CREATE_BOARD,
  BOARD_UPDATE,
  CLICK_NODE,
  SAVE_BOARD,
  RETRIEVE_BOARD,
  BOARD_SAVED,
} from '../App/constants';

export const createUpdateBoard = board => ({ type: BOARD_UPDATE, board });

export const createBoardAction = ({ columns, rows, difficulty } = {}) => ({
  type: CREATE_BOARD,
  dimensions: {
    columns,
    rows,
  },
  difficulty,
});

export const clickNodeAction = (x, y, boardId, action) => ({
  type: CLICK_NODE,
  boardId,
  action,
  coords: { x, y },
});

export const createSaveBoardAction = (name, boardId) => ({
  type: SAVE_BOARD,
  name,
  boardId,
});

export const createRetrieveBoardAction = name => ({
  type: RETRIEVE_BOARD,
  name,
});

export const createSaveBoardSuccess = () => ({ type: BOARD_SAVED });
