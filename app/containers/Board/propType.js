import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string,
  begin_epoch_ms: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  hints: PropTypes.shape(),
  flags: PropTypes.shape(),
  explosion_position: PropTypes.string,
  mines: PropTypes.shape({}),
});
