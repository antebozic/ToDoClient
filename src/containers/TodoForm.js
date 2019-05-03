import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewTodo } from '../store/actions/todos';
import { logout } from '../store/actions/auth';
import './TodoForm.css';

class TodoForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todo: '',
			todoLength: 0,
			styleForm: {},
			styleBtn: {},
			styleLabel: {},
			styleMax: {},
			priority: 'medium'
		};
	}

	handleOptionChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	closeClick = (event) => {
		this.props.setIndexHigh();
		event.preventDefault();
		this.setState({
			todo: ''
		});
		this.props.clearStyle();
	};

	handleNewTodo = () => {
		this.props.setIndexHigh();
		this.props.postNewTodo(this.state.todo, this.state.priority);
		this.setState({
			todo: ''
		});
		this.props.clearStyle();
	};

	handleClick = (event) => {
		event.preventDefault();
	};

	render() {
		// let inputLength = 0;

		let style = {};
		if (window.innerWidth < 800) {
			style = { transform: 'scale(.5)' };
		} else {
			style = { transform: 'scale(.77)' };
		}

		return (
			<div className="all__wrap">
				{/* <Nav /> */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						this.handleNewTodo();
						this.props.clearBlur();
					}}
					className="form"
				>
					<textarea
						style={this.state.styleForm}
						id="todo-text"
						autoComplete="off"
						className="input_itself"
						placeholder="Todo..."
						maxLength="160"
						value={this.state.todo}
						onChange={(e) => {
							if (e.target.value.length === 160) {
								this.setState({
									styleLabel: {
										color: '#E34132'
									},
									styleMax: {
										display: 'inline'
									}
								});
							}
							if (e.target.value.length !== 160) {
								this.setState({
									styleLabel: {
										color: 'inherit'
									},
									styleMax: {
										display: 'none'
									}
								});
							}
							this.setState({
								todo: e.target.value,
								todoLength: e.target.value.length
							});
						}}
					/>
					<label htmlFor="todo-text" className="itself__label" style={this.state.styleForm}>
						<div style={this.state.styleLabel} className="countText">
							<span className="max" style={this.state.styleMax}>
								Max
							</span>{' '}
							160 / {this.state.todoLength} char
						</div>
					</label>
					<button type="submit" className="submitCross" style={this.state.styleBtn} />
				</form>

				<button
					className="closeCross"
					onClick={(e) => {
						this.closeClick(e);
						this.props.clearBlur();
					}}
				/>
				<div className="vertical-align">
					<div className="radio__group">
						<label htmlFor="opt1" className="label ">
							<input
								id="opt1"
								name="priority"
								type="radio"
								value="high"
								checked={this.state.priority === 'high'}
								onChange={this.handleOptionChange}
							/>
							<span className="btn first colorRed">Priority High</span>
						</label>

						<label htmlFor="opt2" className="label">
							<input
								id="opt2"
								name="priority"
								type="radio"
								value="medium"
								checked={this.state.priority === 'medium'}
								onChange={this.handleOptionChange}
							/>
							<span className="btn colorGreen">Priority Medium</span>
						</label>

						<label htmlFor="opt3" className="label">
							<input
								id="opt3"
								name="priority"
								type="radio"
								value="low"
								checked={this.state.priority === 'low'}
								onChange={this.handleOptionChange}
							/>
							<span className="btn last colorBlue">Priority Low</span>
						</label>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.errors,
		currentUser: state.currentUser.user.id,
		userName: state.currentUser.user.username
	};
}

export default connect(mapStateToProps, { postNewTodo, logout })(TodoForm);
