/**
 *
 */
import React from 'react'
import { connect } from 'react-redux'

const Order = ({order, removeFromOrder}) => (
    <div>
    { order.map((o, i) => (
        <div key={ i }>
            <span>{ o.name }</span>
            <span>Price { o.price } Piratos</span>
            <button type="button"
                onClick={ removeFromOrder.bind(null, i) }>
                Remove
            </button>
        </div>
    )) }
        <div>
        <b>Order Total: { orderTotal(order) } Piratos</b>
        </div>
    </div>
)

const orderTotal = (order) => {
    let total = 0
    for (let o in order) {
        total = total + order[o].price
    }
    return total
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromOrder: (index) => dispatch({
            type: 'REMOVE_FROM_ORDER',
            index
        })
    }
}

const mapStateToProps = (state) => (
    {
        order: state.order
    }
)

export default connect(mapStateToProps,
    mapDispatchToProps)(Order)
