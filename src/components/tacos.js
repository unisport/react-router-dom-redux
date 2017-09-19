/**
 *
 */
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './../actions'
import Taco from './taco'

const Tacos = ({tacos, addToOrder, match}) => (
    <div>
        <ul>{ tacos.map((t, i) =>
                <li key={ i }>
                    <Taco taco={ t } />
                    <button type="button" onClick={ addToOrder.bind(null, tacos[i]) }>
                        Add
                    </button>
                </li>
            )}
        </ul>
    </div>
)

const mapDispatchToProps = (dispatch) => {
    return {
        addToOrder: (taco) => dispatch({
            type: 'ADD_TO_ORDER',
            ...taco
        })
    }
}

const mapStateToProps = (state) => (
    { tacos: state.tacos }
)

export default connect(mapStateToProps,
    mapDispatchToProps)(Tacos)
