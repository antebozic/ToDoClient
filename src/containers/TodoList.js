import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodos, removeTodo, updateTodo } from '../store/actions/todos';
import { logout } from '../store/actions/auth';
import TodoItem from '../components/TodoItem';
import TodoForm from './TodoForm';
import './TodoList.css';
import Nav from './Nav';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ScrollUpButton from 'react-scroll-up-button';

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expand: false,
			indexStyle: {},
			formStyle: {},
			listStyle: {},
			btnStyle: {},
			priority: {
				all: true,
				high: false,
				medium: false,
				low: false
			},
			showLargeTodo: false,
			navBlur: false,
			expandSideNav: false,
			showHeader: true
		};
	}

	componentDidMount() {
		this.props.fetchTodos(this.props.currentUser);
		window.addEventListener('scroll', this.handleScroll);
	}

	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.handleScrol);
	// }

	resize__value = () => {
		this.setState({
			width: document.documentElement.clientWidth
		});
	};

	expandSideNav = () => {
		this.setState({
			expandSideNav: !this.state.expandSideNav
		});
	};
	handlePriorityChangeAll = (e) => {
		e.preventDefault();
		this.setState({
			priority: {
				all: true,
				high: false,
				medium: false,
				low: false
			}
		});
	};
	handlePriorityChangeHigh = (e) => {
		e.preventDefault();
		this.setState({
			priority: {
				all: false,
				high: true,
				medium: false,
				low: false
			}
		});
	};
	handlePriorityChangeMedium = (e) => {
		e.preventDefault();
		this.setState({
			priority: {
				all: false,
				high: false,
				medium: true,
				low: false
			}
		});
	};
	handlePriorityChangeLow = (e) => {
		e.preventDefault();
		this.setState({
			priority: {
				all: false,
				high: false,
				medium: false,
				low: true
			}
		});
	};

	onClick = (e) => {
		e.preventDefault();
		this.state.expand
			? this.setState({
					expand: false
				})
			: this.setState({ expand: true });
	};
	setIndexHigh = () => {
		this.setState({
			indexStyle: {
				zIndex: '1'
			}
		});
	};

	clearStyle = () => {
		this.setState({
			formStyle: {
				transform: 'scale(0)'
			},
			listStyle: {
				filter: 'blur(0)'
			},
			btnStyle: {
				display: 'block'
			}
		});
	};

	showLargeTodo = () => {
		this.setState({
			showLargeTodo: true,
			listStyle: {
				filter: 'blur(4px)'
			}
		});
	};

	closeLargeTodo = () => {
		this.setState({
			showLargeTodo: false,
			listStyle: {
				filter: 'blur(0)'
			}
		});
	};

	getLocal = (id) => {
		var oneTodo = this.props.todos.filter((t) => t._id === id);
		this.setState({
			oneTodo
		});
	};

	clearBlur = () => {
		this.setState({
			navBlur: false
		});
	};

	handleScroll = () => {
		if (window.pageYOffset > 5) {
			this.setState({
				showHeader: false
			});
		} else {
			this.setState({
				showHeader: true
			});
		}
	};

	render() {
		const { todos, removeTodo, updateTodo, currentUser } = this.props;
		// let someV = 'low';
		let incompleteTodoList = [];
		let completedTodoList = [];
		let styleExpandSide = {};
		if (this.state.expandSideNav) {
			styleExpandSide = {
				transform: 'rotate(180deg)'
			};
		} else {
			styleExpandSide = {
				transform: 'rotate(0)'
			};
		}
		todos.map((t) => {
			if (t.completed) {
				completedTodoList.push(
					<ReactCSSTransitionGroup
						transitionName="todo"
						transitionAppear={true}
						transitionAppearTimeout={500}
						transitionEnterTimeout={500}
						transitionLeaveTimeout={500}
						key={t._id}
					>
						<TodoItem
							checked={true}
							key={t._id}
							completed={t.completed}
							date={t.createdAt}
							update={t.updatedAt}
							text={t.text}
							priority={t.priority}
							username={t.user.username}
							removeTodo={removeTodo.bind(this, currentUser, t._id)}
							updateTodo={updateTodo.bind(this, currentUser, t._id, t.completed)}
						/>
					</ReactCSSTransitionGroup>
				);
			} else {
				if (this.state.priority.all) {
					incompleteTodoList.push(
						<ReactCSSTransitionGroup
							transitionName="todo"
							transitionAppear={true}
							transitionAppearTimeout={500}
							transitionEnterTimeout={500}
							transitionLeaveTimeout={500}
							key={t._id}
						>
							<TodoItem
								checked={false}
								key={t._id}
								completed={t.completed}
								date={t.createdAt}
								update={t.updatedAt}
								text={t.text}
								priority={t.priority}
								username={t.user.username}
								removeTodo={removeTodo.bind(this, currentUser, t._id)}
								updateTodo={updateTodo.bind(this, currentUser, t._id, t.completed)}
							/>
						</ReactCSSTransitionGroup>
					);
				}
				if (this.state.priority.high && t.priority === 'high') {
					incompleteTodoList.push(
						<ReactCSSTransitionGroup
							transitionName="todo"
							transitionAppear={true}
							transitionAppearTimeout={500}
							transitionEnterTimeout={500}
							transitionLeaveTimeout={500}
							key={t._id}
						>
							<TodoItem
								checked={false}
								key={t._id}
								completed={t.completed}
								date={t.createdAt}
								update={t.updatedAt}
								text={t.text}
								priority={t.priority}
								username={t.user.username}
								removeTodo={removeTodo.bind(this, currentUser, t._id)}
								updateTodo={updateTodo.bind(this, currentUser, t._id, t.completed)}
							/>
						</ReactCSSTransitionGroup>
					);
				}
				if (this.state.priority.medium && t.priority === 'medium') {
					incompleteTodoList.push(
						<ReactCSSTransitionGroup
							transitionName="todo"
							transitionAppear={true}
							transitionAppearTimeout={500}
							transitionEnterTimeout={500}
							transitionLeaveTimeout={500}
							key={t._id}
						>
							<TodoItem
								checked={false}
								key={t._id}
								completed={t.completed}
								date={t.createdAt}
								update={t.updatedAt}
								text={t.text}
								priority={t.priority}
								username={t.user.username}
								removeTodo={removeTodo.bind(this, currentUser, t._id)}
								updateTodo={updateTodo.bind(this, currentUser, t._id, t.completed)}
							/>
						</ReactCSSTransitionGroup>
					);
				}
				if (this.state.priority.low && t.priority === 'low') {
					incompleteTodoList.push(
						<ReactCSSTransitionGroup
							transitionName="todo"
							transitionAppear={true}
							transitionAppearTimeout={500}
							transitionEnterTimeout={500}
							transitionLeaveTimeout={500}
							key={t._id}
						>
							<TodoItem
								checked={false}
								key={t._id}
								completed={t.completed}
								date={t.createdAt}
								update={t.updatedAt}
								text={t.text}
								priority={t.priority}
								username={t.user.username}
								removeTodo={removeTodo.bind(this, currentUser, t._id)}
								updateTodo={updateTodo.bind(this, currentUser, t._id, t.completed)}
							/>
						</ReactCSSTransitionGroup>
					);
				}
			}
		});
		let nmbCompleted = completedTodoList.length;
		let nmbIncomplete = incompleteTodoList.length;
		let style = {};
		if (window.innerWidth < 800) {
			style = { transform: this.state.expand ? 'rotate(90deg) scale(.5)' : 'rotate(-90deg) scale(.5)' };
		} else {
			style = { transform: this.state.expand ? 'rotate(90deg) scale(.7)' : 'rotate(-90deg) scale(.7)' };
		}

		return (
			<div className="all__list" id="all__list">
				{this.state.showHeader && (
					<span className="user__todos">
						{nmbIncomplete} pending Todos<br />
						{nmbCompleted} completed Todos
					</span>
				)}

				<Nav
					toggleList={this.onClick}
					expand={this.state.expand}
					expandSideNav={this.state.expandSideNav}
					indexStyle={this.state.indexStyle}
					priorityLevelAll={this.state.priority.all}
					priorityLevelHigh={this.state.priority.high}
					priorityLevelMedium={this.state.priority.medium}
					priorityLevelLow={this.state.priority.low}
					navBlur={this.state.navBlur}
					handlePriorityChangeHigh={this.handlePriorityChangeHigh}
					handlePriorityChangeAll={this.handlePriorityChangeAll}
					handlePriorityChangeMedium={this.handlePriorityChangeMedium}
					handlePriorityChangeLow={this.handlePriorityChangeLow}
				/>
				{!this.state.expand && (
					<div className="list" style={this.state.listStyle}>
						{incompleteTodoList}
					</div>
				)}
				{this.state.expand && (
					<div className="list" style={this.state.listStyle}>
						{completedTodoList}
					</div>
				)}

				<button className="expandSideNav" onClick={this.expandSideNav} style={styleExpandSide} />
				<button
					className="addTodo"
					style={this.state.btnStyle}
					onClick={() =>
						this.setState({
							formStyle: {
								transform: 'scale(1)'
							},
							listStyle: {
								filter: 'blur(4px)'
							},
							indexStyle: {
								zIndex: '0'
							},
							btnStyle: {
								display: 'none'
							},
							navBlur: true
						})}
				/>

				<div className="form__popup" id="form__popup" style={this.state.formStyle}>
					<TodoForm
						clearStyle={this.clearStyle}
						clearBlur={this.clearBlur}
						setIndexHigh={this.setIndexHigh}
					/>
				</div>

				<ScrollUpButton
					EasingType="easeOutCubic"
					AnimationDuration={500}
					StopPosition={0}
					ShowAtPosition={100}
					style={{
						backgroundColor: '#6f6f6f',
						padding: '.5rem 0',
						height: '2.8rem',
						width: '2.8rem',
						bottom: '13rem',
						boxShadow: '0 1rem 2rem rgba(0,0,0, .15)',
						outline: 'none',
						zIndex: '1',
						transform: 'translateX(-1.5rem)'
					}}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		todos: state.todos,
		currentUser: state.currentUser.user.id,
		userName: state.currentUser.user.username
	};
}

export default connect(mapStateToProps, { fetchTodos, removeTodo, updateTodo, logout })(TodoList);
