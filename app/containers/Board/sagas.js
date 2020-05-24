import { call, put, takeEvery } from 'redux-saga/effects';
import { createApiError } from '../../services/actions';
import { createUpdateBoard } from './actions';
import { CREATE_BOARD, RIGHT_CLICK_NODE, CLICK_NODE } from '../App/constants';
import Api from '../../services/boardApi';

const doCall = ({ tag, apiCall }) =>
  function*(action) {
    try {
      const board = yield call(apiCall, action);
      yield put(createUpdateBoard(board));
    } catch (e) {
      yield put(createApiError(e, tag));
    }
  };

function* mySaga() {
  yield takeEvery(
    CREATE_BOARD,
    doCall({ apiCall: Api.createBoard, tag: 'create' }),
  );
  yield takeEvery(
    RIGHT_CLICK_NODE,
    doCall({ apiCall: Api.toggleFlag, tag: 'flag' }),
  );
  yield takeEvery(CLICK_NODE, doCall({ apiCall: Api.reveal, tag: 'reveal' }));
}

export default mySaga;
