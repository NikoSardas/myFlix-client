import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  const { visibilityFilter } = props;
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={visibilityFilter}
      placeholder="Search myFlix.."
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
