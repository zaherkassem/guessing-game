import { UPDATE_Temperature } from '../actions/guessingGame';

export default (state = 0, action) => {
    if (action.type === UPDATE_Temperature) {
        return action.payload;
    } else {
        return state;
    }
};
