import { LOAD_TODOS, LOAD_TODO, REMOVE_TODO, ADD_TODO, UPDATE_TODO } from '../actionTypes';

const todo = (state = [], action) => {
	switch (action.type) {
		case LOAD_TODOS:
			return [ ...action.todos ];
		case LOAD_TODO:
			return [ ...action.todo ];
		case ADD_TODO:
			return [ ...state, action.todo ];
		case REMOVE_TODO:
			return state.filter((todo) => todo._id !== action.id);
		case UPDATE_TODO:
			return state.map(
				(todo) =>
					todo._id === action.todo._id
						? {
								...todo,
								completed: action.todo.completed
							}
						: todo
			);
		default:
			return state;
	}
};

export default todo;
