import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

// const middleware = [thunk.withExtraArgument()];

export default (initialState) => {
    const guesses = [];
    const temperature = 0;


    // console.log({questions});
    return createStore(
        reducers,
        {
            guesses,
            temperature,
        },
        applyMiddleware(thunk),
    );
};
