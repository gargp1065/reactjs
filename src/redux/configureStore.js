import { createStore, combineReducers, applyMiddleware} from 'redux'
import { Dishes }  from './dishes'
import { Comments }  from './comments'
import { Leaders }  from './leaders'
import { Promotions }  from './promotions'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {createForms} from 'react-redux-form'
import { InitialFeedback } from './forms'


export const ConfigureStore = () => {
    let enhancer = applyMiddleware(thunk, logger)
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(enhancer)
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions,
            ...createForms({
                feedback: InitialFeedback
            }),
        }),
        enhancer
    );

    return store;
}