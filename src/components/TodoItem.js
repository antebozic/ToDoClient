import React, { Component } from 'react';
import Moment from 'react-moment';
import './TodoItem.css';

class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			styleLeft: {},
			styleRigth: {},
			styleCheck: {},
			styleText: {},
			styleLarge: {},
			stretchColors: {}
		};
	}

	showLargeTodo = () => {
		this.setState({
			styleLarge: {
				visibility: 'visible',
				opacity: '1',
				transform: 'scale(1)'
			}
		});
	};

	closeLargeTodo = () => {
		this.setState({
			styleLarge: {
				visibility: 'hidden',
				opacity: '0'
			}
		});
	};

	leftStyle = () => {
		this.setState({
			styleLeft: {
				transform: 'translateX(-100%)',
				transition: 'all 1.3s .7s',
				opacity: '0'
			},
			styleCheck: {
				opacity: '0',
				transition: 'all .7s'
			}
		});
	};

	rightStyle = () => {
		this.setState({
			styleRight: {
				transform: 'translateX(100%)',
				transition: 'all 1s 1s',
				opacity: '0'
			}
		});
	};

	deleteStyle = () => {
		this.setState({
			styleLeft: {
				transform: 'scale(0)',
				transition: 'all .65s .35s'
			},
			styleRight: {
				transform: 'scale(0)',
				transition: 'all .65s .35s'
			},
			styleText: {
				filter: 'blur(4px)',
				WebkitFilter: 'blur(4px)',
				transform: 'scale(.8)',
				transition: 'all .5s'
			}
		});
	};
	stretchColors = () => {
		this.setState({
			stretchColors: {
				transform: 'scaleX(1)'
			}
		});
	};
	shrinkColors = () => {
		this.setState({
			stretchColors: {
				transform: 'scaleX(0)'
			}
		});
	};

	render() {
		const { date, text, removeTodo, updateTodo, completed, checked, update, priority } = this.props;

		var borderStyle = {};

		switch (priority) {
			case 'high':
				borderStyle = {
					backgroundColor: '#e34132'
				};
				break;
			case 'medium':
				borderStyle = {
					backgroundColor: '#78dae1'
				};
				break;
			case 'low':
				borderStyle = {
					backgroundColor: '#9BC53D'
				};
				break;
			default:
				return;
		}

		return (
			<div>
				{checked && (
					<div className="todo__wrap" style={this.state.styleLeft}>
						<a
							className="deleteTodo"
							onClick={() => {
								this.deleteStyle();
								removeTodo();
							}}
						/>
						<p className="text__deco" style={this.state.styleText}>
							{text}
						</p>
						<input
							type="checkbox"
							checked={completed}
							onClick={() => {
								this.leftStyle();
								updateTodo();
							}}
						/>
						<span className="checkmark" style={this.state.styleCheck} />
						<span className="cover" />
						<span className="timeStamp">
							Created: &nbsp;
							<Moment className="momentCreated" format="Do-MMM-YY HH:mm">
								{date}
							</Moment>
						</span>
						<span className="updateStamp" style={this.state.styleCheck}>
							<Moment className="momentUpdated" format="Do-MMM-YY HH:mm">
								{update}
							</Moment>
						</span>
					</div>
				)}
				{!checked && (
					<div className="todo__wrap" style={this.state.styleRight}>
						<div className="priority__color" style={borderStyle}>
							&nbsp;
						</div>
						<a
							className="deleteTodo"
							onClick={() => {
								removeTodo();
								this.deleteStyle();
							}}
						/>
						<p
							className="text__deco"
							style={this.state.styleText}
							onClick={() => {
								this.showLargeTodo();
							}}
						>
							{text}
						</p>
						<input
							type="checkbox"
							onClick={() => {
								this.rightStyle();
								updateTodo();
							}}
						/>
						<span className="checkmark" />
						<span className="line" />
						<span className="timeStamp">
							Created: &nbsp;
							<Moment className="momentCreated" format="Do-MMM-YY HH:mm">
								{date}
							</Moment>
						</span>
					</div>
				)}
			</div>
		);
	}
}

export default TodoItem;
