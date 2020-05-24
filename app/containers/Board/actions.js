import {
  CREATE_BOARD,
  BOARD_UPDATE,
  CLICK_NODE,
  RIGHT_CLICK_NODE,
} from '../App/constants';

export const createUpdateBoard = board => ({ type: BOARD_UPDATE, board });

export const createBoardAction = () => ({ type: CREATE_BOARD });

export const rightClickNodeAction = (x, y, boardId) => ({
  type: RIGHT_CLICK_NODE,
  boardId,
  coords: { x, y },
});

export const clickNodeAction = (x, y, boardId) => ({
  type: CLICK_NODE,
  boardId,
  coords: { x, y },
});
