import { UPDATE_Cities } from '../actions/guessingGame';

export default (state = [], action) => {
    if (action.type === UPDATE_Cities) {
        return action.payload;
    } else {
        return state;
    }
};
