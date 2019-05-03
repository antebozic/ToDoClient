import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import './Nav.css';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			styleLow: {},
			styleMedium: {},
			styleHigh: {},
			styleAll: {},
			displayTxt: 'All',
			checkBox: false,
			styleCursor: {},
			showHeader: true,
			width: document.documentElement.clientWidth
		};
	}

	resize__value = () => {
		this.setState({
			width: document.documentElement.clientWidth
		});
	};

	pullUp = () => {
		if (!this.props.expand) {
			this.setState({
				styleLow: {
					transform: 'translateY(-25px)',
					opacity: '0',
					transition: 'all .4s .1s'
				},
				styleMedium: {
					transform: 'translateY(-25px)',
					opacity: '0',
					transition: 'all .4s .5s'
				},
				styleHigh: {
					transform: 'translateY(-25px)',
					opacity: '0',
					transition: 'all .4s .9s'
				},
				styleAll: {
					transform: 'translateY(62px)',
					transition: 'all .4s 1.3s'
				},
				styleCursor: {
					cursor: 'inherit'
				}
			});
			setTimeout(() => {
				this.setState({
					displayTxt: 'Completed',
					checkBox: true
				});
			}, 1700);
		} else {
			this.setState({
				styleLow: {
					transform: 'translateY(0)',
					opacity: '1',
					transition: 'all .5s 2s'
				},
				styleMedium: {
					transform: 'translateY(0px)',
					opacity: '1',
					transition: 'all .5s 1.5s'
				},
				styleHigh: {
					transform: 'translateY(0px)',
					opacity: '1',
					transition: 'all .5s 1s'
				},
				styleAll: {
					transform: 'translateY(0)',
					transition: 'all  1s'
				},
				displayTxt: 'All',
				checkBox: false,
				styleCursor: {
					cursor: 'pointer'
				}
			});
		}
	};
	componentDidMount() {
		window.addEventListener('resize', this.resize__value);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScrol);
		window.removeEventListener('resize', this.resize__value);
	}

	render() {
		const {
			logout,
			todos,
			userName,
			toggleList,
			expand,
			indexStyle,
			priorityLevelAll,
			priorityLevelHigh,
			priorityLevelMedium,
			priorityLevelLow,
			handlePriorityChangeAll,
			handlePriorityChangeHigh,
			handlePriorityChangeMedium,
			handlePriorityChangeLow,
			expandSideNav,
			navBlur
		} = this.props;

		let navStyle,
			styleExpandSideNav = {};
		expandSideNav
			? (styleExpandSideNav = {
					transform: 'translateX(0)',
					width: '45vw'
				})
			: (styleExpandSideNav = {});

		if (this.state.width > 800) {
			styleExpandSideNav = {};
		}

		navBlur ? (navStyle = { filter: 'blur(7px)' }) : (navStyle = { filter: 'blur(0)' });

		let completedTodoList = [];
		let incompleteTodoList = [];

		todos.map((t) => {
			if (t.completed) {
				return completedTodoList.push(t);
			} else {
				return incompleteTodoList.push(t);
			}
		});

		return (
			<div className="nav__todos" style={{ ...indexStyle, ...navStyle, ...styleExpandSideNav }}>
				<div className="priorty__change">
					<label
						htmlFor="all"
						className="opt opt__all"
						style={{ ...this.state.styleAll, ...this.state.styleCursor }}
					>
						<input
							type="radio"
							id="all"
							name="priority[all]"
							value="true"
							checked={this.state.checkBox || priorityLevelAll === true}
							onChange={handlePriorityChangeAll}
						/>
						<span className="btnAll">{this.state.displayTxt}</span>
					</label>
					<label
						htmlFor="high"
						className="opt opt__high"
						style={{ ...this.state.styleHigh, ...this.state.styleCursor }}
					>
						<input
							type="radio"
							id="high"
							name="priority[high]"
							value="true"
							checked={priorityLevelHigh === true}
							onChange={handlePriorityChangeHigh}
						/>
						<span className="btnAll">High</span>
					</label>
					<label
						htmlFor="medium"
						className="opt opt__medium"
						style={{ ...this.state.styleMedium, ...this.state.styleCursor }}
					>
						<input
							type="radio"
							id="medium"
							name="priority[medium]"
							value="true"
							checked={priorityLevelMedium === true}
							onChange={handlePriorityChangeMedium}
						/>
						<span className="btnAll">Medium</span>
					</label>
					<label
						htmlFor="low"
						className="opt opt__low"
						style={{ ...this.state.styleLow, ...this.state.styleCursor }}
					>
						<input
							type="radio"
							id="low"
							name="priority[low]"
							value="true"
							checked={priorityLevelLow === true}
							onChange={handlePriorityChangeLow}
						/>
						<span className="btnAll">Low</span>
					</label>
				</div>

				<button onClick={logout} className="btn__logout">
					Log out {userName}
				</button>
				<button
					className="btn__toggle_todos"
					onClick={(e) => {
						toggleList(e);
						this.pullUp();
					}}
				>
					{!expand && <div>Completed ToDos</div>}
					{expand && <div>Pending ToDos</div>}
				</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		todos: state.todos,
		userName: state.currentUser.user.username
	};
}

export default connect(mapStateToProps, { logout })(Nav);
