import axios from 'axios';

import environment from '../environment';

const backend = axios.create({ baseURL: environment.MINESWEEPER_API_BASE_URL });

const createBoard = () => backend.post('/boards').then(({ data }) => data);

const createActionHandler = action => async ({ coords, boardId }) =>
  backend
    .put(`/boards/${boardId}/${action}`, { row: coords.y, column: coords.x })
    .then(({ data }) => data);

const reveal = createActionHandler('reveal');

const toggleFlag = createActionHandler('toggle_flag');

export default { createBoard, reveal, toggleFlag };
