import { connect } from 'react-redux';

/**
 * @function LoggedUser
 * @description Conditional render. Will render "children" if loggedUser === user. 
 * @param {Object} props 
 */
const LoggedUser = ({ loggedUser, user, children }) => loggedUser === user ? children : null;

/**
 * @function mapStateToProps
 * @param {Object} State
 */
const mapStateToProps = ({ loggedUser }) => ({ loggedUser });

export default connect(mapStateToProps)(LoggedUser);