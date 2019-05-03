import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_TODOS, LOAD_TODO, REMOVE_TODO, ADD_TODO, UPDATE_TODO } from '../actionTypes';

export const loadTodos = (todos) => ({
	type: LOAD_TODOS,
	todos
});

export const loadTodo = (todo) => ({
	type: LOAD_TODO,
	todo
});

export const addTodo = (todo) => ({
	type: ADD_TODO,
	todo
});

export const update = (todo) => ({
	type: UPDATE_TODO,
	todo
});

export const remove = (id) => ({
	type: REMOVE_TODO,
	id
});

export const removeTodo = (user_id, todo_id) => {
	return (dispatch) => {
		return apiCall('delete', `/api/users/${user_id}/todos/${todo_id}`)
			.then(() => {
				setTimeout(() => {
					dispatch(remove(todo_id));
				}, 1000);
			})
			.catch((err) => {
				addError(err.message);
			});
	};
};

export const updateTodo = (user_id, todo_id, completed) => {
	return (dispatch) => {
		return apiCall('put', `/api/users/${user_id}/todos/${todo_id}`, {
			completed: !completed
		})
			.then((res) => {
				setTimeout(() => {
					dispatch(update(res));
				}, 2000);
			})
			.catch((err) => {
				addError(err.message);
			});
	};
};

export const fetchTodos = (user_id) => {
	return (dispatch) => {
		return apiCall('get', `/api/users/${user_id}/todos`)
			.then((res) => {
				dispatch(loadTodos(res));
			})
			.catch((err) => {
				dispatch(addError(err));
			});
	};
};

export const fetchTodo = (user_id, todo_id) => {
	return (dispatch) => {
		return apiCall('get', `/api/users/${user_id}/todos/${todo_id}`)
			.then((res) => {
				dispatch(loadTodo(res));
			})
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};

export const postNewTodo = (text, priority) => (dispatch, getState) => {
	let { currentUser } = getState();
	const id = currentUser.user.id;
	return apiCall('post', `/api/users/${id}/todos`, { text, priority })
		.then((res) => {
			dispatch(addTodo(res));
		})
		.catch((err) => addError(err.message));
};
