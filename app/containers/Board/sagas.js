import { call, put, takeLatest } from 'redux-saga/effects';
import { createApiError } from '../../services/actions';
import { createUpdateBoard, createSaveBoardSuccess } from './actions';
import {
  CREATE_BOARD,
  CLICK_NODE,
  SAVE_BOARD,
  RETRIEVE_BOARD,
} from '../App/constants';
import Api from '../../services/boardApi';

const doBoardCall = ({ tag, apiCall }) =>
  function*(action) {
    try {
      const board = yield call(apiCall, action);
      yield put(createUpdateBoard(board));
    } catch (e) {
      yield put(createApiError(e, tag));
    }
  };

function* saveBoard(action) {
  try {
    yield call(Api.saveBoard, action);
    yield put(createSaveBoardSuccess());
  } catch (e) {
    yield put(createApiError(e, 'save'));
  }
}

function* mySaga() {
  yield takeLatest(
    CREATE_BOARD,
    doBoardCall({ apiCall: Api.createBoard, tag: 'create' }),
  );
  yield takeLatest(
    CLICK_NODE,
    doBoardCall({ apiCall: Api.clickNode, tag: 'clickNode' }),
  );
  yield takeLatest(
    RETRIEVE_BOARD,
    doBoardCall({ apiCall: Api.retrieveBoard, tag: 'retrieve' }),
  );
  yield takeLatest(SAVE_BOARD, saveBoard);
}

export default mySaga;
