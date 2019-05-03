import React, { Suspense, lazy } from 'react';
import TodoList from './TodoList';
import './Homepage.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';

const AuthForm = lazy(() => import('../components/AuthForm'));

const Homepage = (props) => {
	const { authUser, errors, removeError, currentUser } = props;

	if (!currentUser.isAuthenticated) {
		return (
			<div className="home" id="home">
				<nav className="nav__home">
					<input type="checkbox" className="check" id="check" />
					<label htmlFor="check" className="button">
						<span className="icon">&nbsp;</span>
					</label>
					<nav className="nav__small">
						<ul className="nav__list">
							<li className="nav__item">
								<a href="#popup__in" className="nav__link">
									Log In
								</a>
							</li>
							<li className="nav__item">
								<a href="#popup__up" className="nav__link">
									Sign Up
								</a>
							</li>
						</ul>
					</nav>
					<div className="btn__wrap">
						<a href="#popup__in" className="btn">
							Log In
						</a>
					</div>
					<div className="btn__wrap">
						<a href="#popup__up" className="btn">
							Sign Up
						</a>
					</div>
				</nav>
				<ReactCSSTransitionGroup
					transitionName="home"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					<main className="main">
						<div className="red">
							<div className="text__holder">
								<h2 className="landing__text-header">
									Organize your life
									<span className="color">Then go enjoy it...</span>
								</h2>
								<p className="landing__text">
									Unclutter your mind. Never worry about forgetting things again.
									<br />
									Let ToDo remember it all for you.
									<br />
								</p>
								<a href="#popup__up" className="landing__btn">
									Get Started
								</a>
								<div />
							</div>
						</div>
						<div className="blue">
							<div className="img__holder">&nbsp;</div>
						</div>
					</main>
				</ReactCSSTransitionGroup>
				<div className="popup" id="popup__in">
					<div className="popup__content">
						<Route
							render={(props) => {
								return (
									<Suspense fallback={<div>Loading...</div>}>
										<AuthForm
											removeError={removeError}
											errors={errors}
											onAuth={authUser}
											buttonText="Log in"
											heading="Welcome Back"
											{...props}
										/>
									</Suspense>
								);
							}}
						/>
					</div>
				</div>
				<div className="popup" id="popup__up">
					<div className="popup__content">
						<Route
							render={(props) => (
								<Suspense fallback={<div>Loading...</div>}>
									<AuthForm
										removeError={removeError}
										errors={errors}
										onAuth={authUser}
										signUp
										buttonText="Sign me up!"
										heading="Join Today"
										{...props}
									/>
								</Suspense>
							)}
						/>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="home">
			<TodoList username={currentUser.user.username} />
		</div>
	);
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Homepage));
