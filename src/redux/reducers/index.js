import { combineReducers } from 'redux';
import guessesReducer from './guessesReducer';
import temperatureReducer from './temperatureReducer';


export default combineReducers({
    guesses: guessesReducer,
    temperature: temperatureReducer,
});
