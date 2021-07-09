import { UPDATE_GUESSES } from '../actions/guessingGame';

export default (state = [], action) => {
    if (action.type === UPDATE_GUESSES) {
        return action.payload;
    } else {
        return state;
    }
};
