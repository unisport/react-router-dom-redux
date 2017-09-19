/**
 *
 *
 */
import {
    createStore,
    compose,
    applyMiddleware
} from 'redux'

const enhancer = 
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    	}) : compose;

import rootReducer from './reducers'

const initialState = {
    tacos: [
        {name: 'Tacos al pastor/de adobada', price: 10},
        {name: 'Tacos de asador', price: 10},
        {name: 'Tacos de cabeza', price: 15},
        {name: 'Tacos de camarones', price: 5},
    ],
    order: []
}

export const store = createStore(rootReducer,
    initialState, compose(
    enhancer(applyMiddleware())
))
