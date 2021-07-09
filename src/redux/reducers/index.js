import { combineReducers } from 'redux';
import guessesReducer from './guessesReducer';
import temperatureReducer from './temperatureReducer';
import citiesReducer from "./citiesReducer";

export default combineReducers({
    guesses: guessesReducer,
    temperature: temperatureReducer,
    cities: citiesReducer,
});
