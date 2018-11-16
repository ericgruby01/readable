import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { thunks as thunksPosts } from '../actions/posts';

// Components
import DeleteButton from './DeleteButton';

const DeletePostButton = props => <DeleteButton onConfirm={() => props.handleDeletePost(props.id)} />;

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...thunksPosts }, dispatch);

export default connect(null, mapDispatchToProps)(DeletePostButton)