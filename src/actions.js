/**
 * actions.js
 */
export const ADD_TO_ORDER = 'ADD_TO_ORDER'
const addToOrder = (taco) => (
    {
        type: ADD_TO_ORDER,
        taco
    }
)

export const REMOVE_FROM_ORDER = 'REMOVE_FROM_ORDER'
const removeFromOrder = (index) => (
    {
        type: REMOVE_FROM_ORDER,
        index
    }
)
