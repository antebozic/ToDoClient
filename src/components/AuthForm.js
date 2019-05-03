import React, { Component } from 'react';
import './AuthForm.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			password: ''
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const authType = this.props.signUp ? 'signup' : 'signin';
		this.props
			.onAuth(authType, this.state)
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {
				return;
			});
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { email, username, password } = this.state;
		const { signUp, heading, buttonText, errors, history, removeError } = this.props;

		history.listen(() => {
			removeError();
		});

		return (
			<div className="wrapper">
				<form onSubmit={this.handleSubmit} className="form">
					<h2 className="landing__text-header">{heading}</h2>
					<div className="error__wrapper">
						{errors.message && <div className="error">{errors.message}</div>}
					</div>
					{!signUp && (
						<ReactCSSTransitionGroup
							transitionName="form"
							transitionAppear={true}
							transitionAppearTimeout={500}
							transitionEnterTimeout={500}
							transitionLeaveTimeout={500}
						>
							<div className="form__group">
								<input
									className="form__input"
									autoComplete="off"
									id="email"
									name="email"
									onChange={this.handleChange}
									type="text"
									value={email}
									placeholder="E-mail"
								/>
								<label htmlFor="email" className="form__label">
									E-mail
								</label>
							</div>
							<div className="form__group">
								<input
									className="form__input"
									autoComplete="off"
									id="password"
									name="password"
									onChange={this.handleChange}
									type="password"
									value={password}
									placeholder="Password"
								/>
								<label htmlFor="password" className="form__label">
									Password
								</label>
							</div>
						</ReactCSSTransitionGroup>
					)}
					{signUp && (
						<ReactCSSTransitionGroup
							transitionName="form"
							transitionAppear={true}
							transitionAppearTimeout={500}
							transitionEnterTimeout={500}
							transitionLeaveTimeout={500}
						>
							<div className="form__group">
								<input
									className="form__input"
									autoComplete="off"
									id="email"
									name="email"
									onChange={this.handleChange}
									type="text"
									value={email}
									placeholder="E-mail"
								/>
								<label htmlFor="email" className="form__label">
									E-mail
								</label>
							</div>
							<div className="form__group">
								<input
									className="form__input"
									autoComplete="off"
									id="password"
									name="password"
									onChange={this.handleChange}
									type="password"
									value={password}
									placeholder="Password"
								/>
								<label htmlFor="password" className="form__label">
									Password
								</label>
							</div>
							<div className="form__group">
								<input
									className="form__input"
									autoComplete="off"
									id="username"
									name="username"
									onChange={this.handleChange}
									type="text"
									value={username}
									placeholder="Username"
								/>
								<label htmlFor="username" className="form__label">
									Username
								</label>
							</div>
						</ReactCSSTransitionGroup>
					)}
					<button type="submit" className="form__btn">
						{buttonText}
					</button>
				</form>
				{!signUp && (
					<a href="#popup__up" className="btn__simple">
						Sign up here
					</a>
				)}
				{signUp && (
					<a href="#popup__in" className="btn__simple">
						Sign in here
					</a>
				)}
				<a href="#home" className="closeBtn">
					X
				</a>
			</div>
		);
	}
}

export default AuthForm;
