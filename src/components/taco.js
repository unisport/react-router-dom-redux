/**
 *
 *
 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, Route } from 'react-router-dom'

const Taco = ({ taco }) => (
    <div>
        <b>{ taco.name }</b><br/>
        <span>Price: { taco.price } Piratos</span>
    </div>
)

export default connect()(Taco)
