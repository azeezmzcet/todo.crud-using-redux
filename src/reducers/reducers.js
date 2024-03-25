
import {ADD_TASK,DELETE_TASK,EDIT_TASK,UPDATE_TASK,FETCH_TASKS_SUCCESS,FETCH_TASKS_FAILURE} from '../actions/actionTypes';

const initialState = {
  tasks: [],
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: state.tasks.length + 1,
            text: action.payload.text,
          },
        ],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, isEditing: true } : task
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, text: action.payload.newText, isEditing: false } : task
        ),
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
        error: null,
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default taskReducer;
