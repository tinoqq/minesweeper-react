import axios from 'axios';

import environment from '../environment';

const backend = axios.create({ baseURL: environment.MINESWEEPER_API_BASE_URL });

const createBoard = ({ dimensions, difficulty }) =>
  backend
    .post('/boards', { ...dimensions, difficulty })
    .then(({ data }) => data);

const clickNode = ({ coords, boardId, action }) =>
  backend
    .put(`/boards/${boardId}/${action}`, { row: coords.y, column: coords.x })
    .then(({ data }) => data);

const saveBoard = ({ boardId, name }) =>
  backend.put(`/boards/${boardId}/save/${name}`);

const retrieveBoard = ({ name }) =>
  backend.get(`/boards/${name}`).then(({ data }) => data);

export default { createBoard, saveBoard, retrieveBoard, clickNode };
