import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Fab } from 'native-base';

const propTypes = {
  onPress: PropTypes.func.isRequired,
};

// renders the add todo floating button
const AddTodoButton = ({ onPress }) => (
  <Fab
    direction="up"
    containerStyle={{}}
    style={{ backgroundColor: '#fff' }}
    position="bottomRight"
    onPress={onPress}
  >
    <Icon name="add" />
  </Fab>
);

AddTodoButton.propTypes = propTypes;

export default AddTodoButton;
