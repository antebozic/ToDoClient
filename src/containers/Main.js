import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from './Homepage';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import './Main.css';

const Main = (props) => {
	const { currentUser } = props;
	return (
		<div className="container">
			<Switch>
				<Route exact path="/" render={(props) => <Homepage currentUser={currentUser} {...props} />} />
				<Route path="/*" render={(props) => <Homepage currentUser={currentUser} {...props} />} />
			</Switch>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
