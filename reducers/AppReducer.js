import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import TimerReducer from './TimerReducer';
import ToDoReducer from './ToDoReducer';

const AppReducer = combineReducers({
  nav: NavReducer,
  toDo: ToDoReducer,
  timer: TimerReducer,
});

export default AppReducer;
