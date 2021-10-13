import React from 'react';
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
