import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Search myFlix.."
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
  setFilter: PropTypes.func.isRequired,
};