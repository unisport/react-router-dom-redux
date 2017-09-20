# react-router-dom redux
Repo showing how react-router-dom and redux can be used together.

To demonstrate how react-router-dom and redux can work I created a small react application called "The Taco Shop". This is how the store front looks

![Index](https://github.com/unisport/react-router-dom-redux/blob/master/dist/images/index.png?raw=true)

**Adding a Taco**

By clicking the "Add" button you can add a Taco to your order, at the top of the page you can see the items in your order increse

![Adding](https://github.com/unisport/react-router-dom-redux/blob/master/dist/images/adding-taco.png?raw=true)

**Order View**

Clicking the "My Order" takes you to a list of Tacos ordered and you can see the order total

![Order](https://github.com/unisport/react-router-dom-redux/blob/master/dist/images/order.png?raw=true)

**Removing tacos**

From the order view you can remove tacos from your order

![Removing](https://github.com/unisport/react-router-dom-redux/blob/master/dist/images/removing-taco.png?raw=true)

## The main difference

The main difference between react-router and react-router-dom is that each route is now a component similar to the components you write, which means you can drop them almost wherever you like.

### React and Redux

To have your redux store available to you have to connect the individual containers/components, you can no longer simply do that with your store using the provider.

Here is how the index.js could look
```
import { render } from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'

import Main from './main'
import { store } from './store'

render(
    <Provider store={ store }>
        <Main />
    </Provider>, document.getElementById('app'))
```

### Router and Switch
Notice there is no history, only the Provider that takes your store, this is not required for react-router-dom to work, the Router component gives you access to the history object and using that you can create redirects programatically in your application.

```
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
```

Here I define the routes for my application and use main to connect my store, I'm not using bindActionCreators or mapDispatchToProps in this example, I only pass the state to the connect function which gives me access to the following inside my Main component when inspecting it using the Chrome React extension

![main console](https://github.com/unisport/react-router-dom-redux/blob/master/dist/images/main-console.png?raw=true)

If I wanted to use any of my redux actions at this point I could by simply calling "dispatch()", I use the bindActionCreators later in the application.

**Switch**

The Switch renders the first child <Route> or <Redirect> that matches the location. You can read more about it here
https://reacttraining.com/react-router/web/api/Switch

### Tacos Component
This component is part of the routing, it's tied to a route which gives it full access to the history object - notice that it's not required that you pass the history to your store or top level route with react-router-com, routes have access to history by default. You can see this in the console by inspecting the Tacos component using the React extension

![tacos console](https://github.com/unisport/react-router-dom-redux/blob/master/dist/images/tacos-console.png?raw=true)

The Tacos component also has access to state and actions but where Main can access redux using the dispatch function, Tacos only has access to that tacos state and the function addTacoToOrder().

```
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
```

### Taco Component

The last component in this example is the Taco component. I has access to dispatch() but no state which is done by not passing anything to the connect function. If I wanted to access the history object from within the Taco component I could accomplish this by using the withRouter function imported from react-router-dom

```
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
```

Inside the Taco component you can create new routes and using withRouter you get access to the match object which holds the current url that you then can pass dynamically into your route like this ${match.url} and build your route path and link using that only having to focus on the relative path.

### Order Component

The order component isn't that different from the other components, it has access to specific functions and only the order state since that's the only part it needs in this application

![order console](https://github.com/unisport/react-router-dom-redux/blob/master/dist/images/order-console.png?raw=true)

The component is similar to the others

```
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
```

The order component isn't that different from the other components, it has access to specific functions and only the order state since that's the only part it needs in this application
