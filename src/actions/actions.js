
import axios from 'axios';
import {ADD_TASK,DELETE_TASK,EDIT_TASK,UPDATE_TASK, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE} from './actionTypes';

export const addTask = (text) => ({
  type: ADD_TASK,
  payload: { text },
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: { id },
});

export const editTask = (id, newText) => ({
  type: EDIT_TASK,
  payload: { id, newText },
});

export const updateTask = (id, newText) => ({ 
  type: UPDATE_TASK,
  payload: { id, newText },
});

export const fetchTasksSuccess = (tasks) => {
  console.log('Tasks:', tasks);
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: { tasks },
  };
};

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: { error },
});

export const fetchTasks = () => {
  return (dispatch) => {
    return axios.get('/tasks.json')
      .then(response => {
        dispatch(fetchTasksSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchTasksFailure(error));
      });
  };
};
