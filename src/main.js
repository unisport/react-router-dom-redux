/**
 *
 */
import React from 'react'
import {
    HashRouter as Router,
    Link,
    Route,
    Switch
} from 'react-router-dom'
import { connect } from 'react-redux'

import Tacos from './components/tacos'
import Order from './components/order'

const NoMatch = () => (
    <div>Uuuuppss</div>
)

const Main = ({ order }) => (
    <Router>
        <div>
            <header>
                <h2>The Taco Store</h2>
                <nav>
                    <Link to="/">Home</Link>
                    <span> | </span>
                    <Link to="/order">My Order <span>{ order.length}</span></Link>
                </nav>
            </header>
            <main>
                <Switch>
                    <Route exact path="/" component={ Tacos } />
                    <Route exact path="/order" component={ Order } />
                    <Route component={ NoMatch } />
                </Switch>
            </main>
        </div>
    </Router>
)

const mapStateToProps = (state) => (
    state
)

export default connect(mapStateToProps)(Main)
