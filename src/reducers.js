/**
 *
 *
 */
import {
    combineReducers
} from 'redux'

const taco = (state = [], action) => {
    return state
}

const order = (state = [], action) => {

    switch (action.type) {
        case 'ADD_TO_ORDER':
            return [
                ...state,
                Object.assign({}, {name: action.name, price: action.price})
            ]
        case 'REMOVE_FROM_ORDER':
            return state.filter((item, index) => action.index !== index)
        default:
            return state
    }
}

const rootReducer = combineReducers({
    tacos: taco,
    order
})

export default rootReducer
